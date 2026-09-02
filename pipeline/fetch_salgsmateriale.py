"""Automate the agent-network "download salgsmateriale" email-gate.

Not MitID — that stays a hard, unbypassable gate for tilstandsrapport/elrapport on
boligejer.dk. This targets the *other* gate: the listing page's lead-capture form
(Nybolig/EDC/home.dk/Boligsiden "Download salgsmateriale" / "Se dokumenter" /
"Bestil salgsmateriale"), which only asks for name + email, no identity check.
Policy for this script's use lives in references/research-pipeline.md
("v7 policy change") — one listing at a time, operator-triggered, dedicated
operator mailbox, never a client's personal address.

Usage:
    python fetch_salgsmateriale.py <listing_url> --email you@operator-mailbox.dk \
        --name "Your Name" --out inbox/<address-slug>/

Exit codes (machine-readable outcome contract — never claim more than proven):
    0  = documents fetched AND validated as real PDFs
    2  = form accepted (confirmed by success message) but documents will arrive
         by email — check the operator mailbox
    3  = CAPTCHA / bot-wall detected — do NOT retry automatically; manual fallback
    4  = trigger or form not found on the page — selectors need extending
    5  = links downloaded but failed PDF validation (HTML-behind-.pdf etc.)
    1  = other failure (navigation, unexpected page state)

Every run writes `manifest.json` into --out: url, timestamp, outcome, and per-file
sha256/size/validation status. The manifest is the acquisition record the report's
evidence ledger points at (SKILL.md v7 §26–27) — a fetched PDF only enters the
document inventory after its manifest entry says "valid".

Each mægler network renders this form differently, so the locator logic below is a
best-effort chain of common patterns, not a guaranteed one-shot: it tries several
selector strategies, and if none match it dumps the page HTML + a screenshot into
--out for a human to look at and extend the hint tables below.
"""

from __future__ import annotations

import argparse
import glob
import hashlib
import json
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

from playwright.sync_api import Page, TimeoutError as PWTimeout, sync_playwright

# Text fragments (case-insensitive) that open the download/lead form on each network.
# Extend this as we hit new networks — one entry per phrase actually seen on a page.
TRIGGER_TEXT_HINTS = [
    "download salgsmateriale",
    "bestil salgsmateriale",
    "få materiale",
    "se dokumenter",
    "se salgsopstilling",
    "download dokumenter",
    "hent salgsopstilling",
]

NAME_FIELD_HINTS = ["navn", "fornavn", "name", "fulde navn"]
EMAIL_FIELD_HINTS = ["email", "e-mail", "mail"]
SUBMIT_TEXT_HINTS = ["bestil", "download", "send", "hent", "fortsæt", "bekræft"]

# Only links whose URL or anchor text names an actual sales document count —
# a page can carry unrelated PDFs (brochures, energy guides, cookie policies).
DOC_KEYWORDS = [
    "salgsopstilling", "tilstand", "elinstallation", "energim", "energimaerke",
    "salgsmateriale", "servitut", "købsaftale", "koebsaftale", "vedtægt",
    "regnskab", "nøgleoplysning", "noegleoplysning",
]

CAPTCHA_MARKERS = [
    "recaptcha", "hcaptcha", "cf-turnstile", "cf-challenge",
    "jeg er ikke en robot", "i'm not a robot", "verificer at du er et menneske",
]

SUCCESS_TEXT_HINTS = [
    "tak for din bestilling", "tak for din henvendelse", "vi sender",
    "du hører fra os", "materialet er på vej", "tjek din mail", "tjek din indbakke",
]

MIN_PDF_BYTES = 10 * 1024


def _preinstalled_chromium() -> str | None:
    """Pick up the sandbox's pre-installed Chromium instead of the pinned
    revision playwright's Python package expects (which this sandbox can't
    download) — same workaround pattern as the JS side (executablePath)."""
    candidates = sorted(glob.glob("/opt/pw-browsers/chromium-*/chrome-linux/chrome"))
    return candidates[-1] if candidates else None


def find_and_click_trigger(page: Page) -> bool:
    for phrase in TRIGGER_TEXT_HINTS:
        locator = page.get_by_text(re.compile(phrase, re.IGNORECASE))
        try:
            if locator.count() > 0:
                locator.first.click(timeout=5000)
                return True
        except PWTimeout:
            continue
    return False


def page_has_captcha(page: Page) -> bool:
    html = page.content().lower()
    return any(marker in html for marker in CAPTCHA_MARKERS)


def fill_lead_form(page: Page, name: str, email: str) -> bool:
    """Fill BOTH name and email; a half-filled form must not be submitted —
    partial submits either fail silently or file a broken lead with the agent."""
    filled_name = filled_email = False
    for hint in NAME_FIELD_HINTS:
        loc = page.locator(f"input[name*='{hint}' i], input[placeholder*='{hint}' i]")
        if loc.count() > 0:
            loc.first.fill(name)
            filled_name = loc.first.input_value() == name
            break
    for hint in EMAIL_FIELD_HINTS:
        loc = page.locator(
            f"input[type='email'], input[name*='{hint}' i], input[placeholder*='{hint}' i]"
        )
        if loc.count() > 0:
            loc.first.fill(email)
            filled_email = loc.first.input_value() == email
            break
    if not (filled_name and filled_email):
        return False
    for phrase in SUBMIT_TEXT_HINTS:
        loc = page.get_by_role("button", name=re.compile(phrase, re.IGNORECASE))
        if loc.count() > 0:
            loc.first.click()
            return True
    return False


def submission_acknowledged(page: Page) -> bool:
    html = page.content().lower()
    return any(hint in html for hint in SUCCESS_TEXT_HINTS)


def collect_document_links(page: Page) -> list[dict]:
    """Return only links that plausibly ARE sales documents, with the evidence
    of why each qualified (keyword hit in URL or anchor text)."""
    anchors = page.eval_on_selector_all(
        "a[href]", "els => els.map(e => ({href: e.href, text: e.textContent || ''}))"
    )
    picked, seen = [], set()
    for a in anchors:
        href, text = a["href"], a["text"].strip()
        blob = (href + " " + text).lower()
        if href in seen:
            continue
        is_pdf_url = href.lower().split("?")[0].endswith(".pdf")
        keyword = next((k for k in DOC_KEYWORDS if k in blob), None)
        if keyword and (is_pdf_url or "download" in blob or "dokument" in blob):
            picked.append({"url": href, "anchor_text": text, "matched_keyword": keyword})
            seen.add(href)
    return picked


def validate_pdf(body: bytes, content_type: str) -> tuple[bool, str]:
    if not body.startswith(b"%PDF"):
        return False, f"no %PDF magic (content-type: {content_type or 'unknown'})"
    if len(body) < MIN_PDF_BYTES:
        return False, f"suspiciously small ({len(body)} bytes < {MIN_PDF_BYTES})"
    if content_type and "pdf" not in content_type.lower() and "octet-stream" not in content_type.lower():
        return False, f"content-type mismatch: {content_type}"
    return True, "ok"


def slugify(url: str) -> str:
    host = urlparse(url).netloc.replace("www.", "")
    path = re.sub(r"[^a-z0-9]+", "-", urlparse(url).path.lower()).strip("-")
    return f"{host}-{path}"[:80]


def write_manifest(out_dir: Path, manifest: dict) -> None:
    manifest["written_at"] = datetime.now(timezone.utc).isoformat()
    (out_dir / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
    )


def run(listing_url: str, name: str, email: str, out_dir: Path) -> int:
    out_dir.mkdir(parents=True, exist_ok=True)
    manifest: dict = {
        "listing_url": listing_url,
        "network": urlparse(listing_url).netloc,
        "operator_email": email,
        "outcome": None,
        "files": [],
    }
    with sync_playwright() as p:
        exe = _preinstalled_chromium()
        launch_kwargs = {"headless": True}
        if exe:
            launch_kwargs["executable_path"] = exe
        browser = p.chromium.launch(**launch_kwargs)
        page = browser.new_page()
        try:
            page.goto(listing_url, wait_until="domcontentloaded", timeout=30000)
            page.wait_for_timeout(1500)
        except Exception as e:
            manifest["outcome"] = f"navigation-failed: {e}"
            write_manifest(out_dir, manifest)
            print("Navigation failed:", e, file=sys.stderr)
            browser.close()
            return 1

        if page_has_captcha(page):
            _dump_debug(page, out_dir, "captcha")
            manifest["outcome"] = "captcha-detected"
            write_manifest(out_dir, manifest)
            print("CAPTCHA/bot-wall detected — falling back to manual.", file=sys.stderr)
            browser.close()
            return 3

        if not find_and_click_trigger(page):
            _dump_debug(page, out_dir, "no-trigger-found")
            manifest["outcome"] = "trigger-not-found"
            write_manifest(out_dir, manifest)
            print("Could not find a download/lead trigger. Debug dump in", out_dir, file=sys.stderr)
            browser.close()
            return 4

        page.wait_for_timeout(1000)
        if page_has_captcha(page):
            _dump_debug(page, out_dir, "captcha-in-form")
            manifest["outcome"] = "captcha-detected-in-form"
            write_manifest(out_dir, manifest)
            print("CAPTCHA inside the form — falling back to manual.", file=sys.stderr)
            browser.close()
            return 3

        if not fill_lead_form(page, name, email):
            _dump_debug(page, out_dir, "form-not-found")
            manifest["outcome"] = "form-not-filled"
            write_manifest(out_dir, manifest)
            print("Could not fill BOTH name and email (or no submit button). "
                  "Debug dump in", out_dir, file=sys.stderr)
            browser.close()
            return 4

        page.wait_for_timeout(3000)
        acknowledged = submission_acknowledged(page)
        doc_links = collect_document_links(page)

        if not doc_links:
            _dump_debug(page, out_dir, "post-submit-no-docs")
            if acknowledged:
                manifest["outcome"] = "accepted-docs-by-email"
                write_manifest(out_dir, manifest)
                print("Form accepted (success message shown); no on-page documents — "
                      "they will arrive by email. Check the operator mailbox.", file=sys.stderr)
                browser.close()
                return 2
            manifest["outcome"] = "submitted-unconfirmed"
            write_manifest(out_dir, manifest)
            print("Submit clicked but NO success confirmation and no documents — "
                  "treat as failed, do not assume the lead was filed. "
                  "Debug dump in", out_dir, file=sys.stderr)
            browser.close()
            return 1

        all_valid = True
        for link in doc_links:
            entry = dict(link)
            try:
                resp = page.request.get(link["url"])
                body = resp.body()
                ctype = resp.headers.get("content-type", "")
                valid, reason = validate_pdf(body, ctype)
                filename = Path(urlparse(link["url"]).path).name or f"document-{int(time.time())}.pdf"
                entry.update({
                    "filename": filename,
                    "http_status": resp.status,
                    "content_type": ctype,
                    "size_bytes": len(body),
                    "sha256": hashlib.sha256(body).hexdigest(),
                    "valid_pdf": valid,
                    "validation_note": reason,
                })
                if valid:
                    (out_dir / filename).write_bytes(body)
                else:
                    (out_dir / (filename + ".rejected")).write_bytes(body)
                    all_valid = False
            except Exception as e:
                entry.update({"error": str(e), "valid_pdf": False})
                all_valid = False
            manifest["files"].append(entry)

        valid_count = sum(1 for f in manifest["files"] if f.get("valid_pdf"))
        if valid_count and all_valid:
            manifest["outcome"] = "fetched-validated"
            code, msg = 0, f"Fetched {valid_count} validated PDF(s) into {out_dir}"
        elif valid_count:
            manifest["outcome"] = "fetched-partially-valid"
            code, msg = 5, (f"{valid_count}/{len(manifest['files'])} files passed PDF "
                            f"validation; rejects kept as *.rejected in {out_dir}")
        else:
            manifest["outcome"] = "all-downloads-invalid"
            code, msg = 5, ("Every downloaded link failed PDF validation "
                            "(HTML behind .pdf?). Manual fallback needed.")
        write_manifest(out_dir, manifest)
        print(msg)
        browser.close()
        return code


def _dump_debug(page: Page, out_dir: Path, tag: str) -> None:
    (out_dir / f"debug-{tag}.html").write_text(page.content(), encoding="utf-8")
    try:
        page.screenshot(path=str(out_dir / f"debug-{tag}.png"), full_page=True)
    except Exception:
        pass


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("listing_url")
    parser.add_argument("--email", required=True,
                        help="dedicated operator mailbox — never a client's own email")
    parser.add_argument("--name", required=True)
    parser.add_argument("--out", type=Path, default=None)
    args = parser.parse_args()

    out = args.out or Path("inbox") / slugify(args.listing_url)
    sys.exit(run(args.listing_url, args.name, args.email, out))
