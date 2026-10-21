#!/usr/bin/env python3
"""Bygger alle bøger: books/<bog>/src/config.json + q/*.json -> books/<bog>/book.js, og shared/books.js (forsidens liste).
Ny bog: kopiér en eksisterende mappe, ret config.json, læg spørgsmål i src/q/, kør dette script."""
import json, os, random, sys
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bdir = os.path.join(root, "books")

def clean(r):
    return [x.replace(" (tekst) ", " ").replace("(tekst)", "").strip() if isinstance(x, str) else x for x in r]
def norm(q): return " ".join(q.split())
def load(p): return json.load(open(p, encoding="utf-8"))

def build(slug):
    d = os.path.join(bdir, slug); src = os.path.join(d, "src"); cfg = load(os.path.join(src, "config.json"))
    patch = cfg.get("patch", {})
    sheets, problems, seen = [], [], set()
    for sc in cfg["sheets"]:
        n = sc["n"]; rows = []
        for f in sc["files"]: rows += load(os.path.join(src, "q", f + ".json"))
        out = []
        for r in rows:
            key = next((k for k in patch if r[0].startswith(k)), None)
            if key and patch[key]: r = patch[key]
            r = clean(r)
            if len(r) < 5: problems.append((n, r[0], "for få felter")); continue
            q, right, wrongs, p = r[0], r[1], r[2:-1], r[-1]
            opts = [right] + wrongs
            if len(set(o.strip().lower() for o in opts)) != len(opts): problems.append((n, q, "dublet i svarmuligheder"))
            if len(wrongs) < 2: problems.append((n, q, "under 3 svarmuligheder"))
            if not isinstance(p, int): problems.append((n, q, "sidetal mangler"))
            k = norm(q) + "|" + right
            if k in seen: problems.append((n, q, "dublet-spørgsmål (droppet)")); continue
            seen.add(k); out.append(r)
        pages = sc.get("pages") or "%d–%d" % (min(r[-1] for r in out), max(r[-1] for r in out))
        sheets.append({"n": n, "title": sc["title"], "pages": pages, "q": out})
    by = {s["n"]: s for s in sheets}
    sc = cfg["sets"]; rng = random.Random(2026)
    pool = [s["n"] for s in sheets if s["n"] not in sc.get("excludeSheets", [])]
    queues = {}
    for n in pool:
        idx = list(range(len(by[n]["q"]))); rng.shuffle(idx); queues[n] = idx
    sets = []
    for k in range(sc["count"]):
        skip = {pool[(k * sc["skipPerSet"] + j) % len(pool)] for j in range(sc["skipPerSet"])}
        picks = []
        for n in pool:
            if n in skip: continue
            i = queues[n].pop(); r = by[n]["q"][i]
            picks.append({"id": "%d:%d" % (n, i), "s": n, "q": r[0], "right": r[1], "wrongs": rng.sample(r[2:-1], 2), "p": r[-1]})
        rng.shuffle(picks)
        sets.append({"name": "Prøve %d" % (k + 1), "kind": "set", "items": picks})
    if sc.get("official"):
        off = load(os.path.join(src, "q", sc["official"])); items = []
        for j, r in enumerate(off):
            items.append({"id": "off:%d" % j, "s": 0, "q": r[0], "right": r[1], "wrongs": r[2:-1], "p": r[-1], "nostat": True, "src": sc["officialSrc"].replace("{p}", str(r[-1]))})
        sets.insert(0, {"name": sc["officialName"], "kind": "official", "items": items})
    tl = load(os.path.join(src, "q", cfg["timeline"])) if cfg.get("timeline") else []
    for e in tl:
        if len(e) != 4: problems.append(("tl", e, "forkert længde"))
    total = sum(len(s["q"]) for s in sheets)
    meta = dict(cfg["meta"]); meta["setCount"] = sc["count"]
    data = {"meta": meta, "sheets": sheets, "sets": sets, "timeline": tl}
    js = "window.BOOK=" + json.dumps(data, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/") + ";\n"
    open(os.path.join(d, "book.js"), "w", encoding="utf-8").write(js)
    allids = [it["id"] for st in sets if st["kind"] == "set" for it in st["items"]]
    assert len(set(allids)) == len(allids), "spørgsmål gentages mellem prøver"
    with open(os.path.join(d, "RAPPORT.md"), "w", encoding="utf-8") as f:
        f.write("# Rapport: %s\n\n| Nr | Emne | Sider | Spørgsmål |\n|---|---|---|---|\n" % meta["title"])
        for s in sheets: f.write("| %d | %s | %s | %d |\n" % (s["n"], s["title"], s["pages"], len(s["q"])))
        f.write("| | **I alt** | | **%d** |\n" % total)
    print("%-16s spørgsmål %4d · tidslinje %3d · prøver %2d · %4d KB · problemer %d" % (slug, total, len(tl), len(sets), len(js.encode()) // 1024, len(problems)))
    for p in problems: print("   ", p)
    return {"slug": slug, "title": meta["title"], "sub": meta["sub"], "accent": meta["accent"], "icon": meta["icon"], "count": total, "order": meta.get("order", 99)}

entries = []
for slug in sorted(os.listdir(bdir)):
    if os.path.exists(os.path.join(bdir, slug, "src", "config.json")): entries.append(build(slug))
entries.sort(key=lambda e: e["order"])
open(os.path.join(root, "shared", "books.js"), "w", encoding="utf-8").write("window.BOOKS=" + json.dumps(entries, ensure_ascii=False, indent=1) + ";\n")
print("bøger:", [e["slug"] for e in entries])
