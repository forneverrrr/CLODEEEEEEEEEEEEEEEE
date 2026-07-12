# Site outputs & anonymization (NEW module, v6)

Rules for anything published on nordindsigt.dk: anonymized eksempelrapporter and
comparison pages. Reference implementations: `eksempelrapport_1.html` (Algade 14 —
the approved standard), `eksempelrapport_ejerlejlighed.html`, `sammenligning_3_huse.*`.

## 1. Anonymization procedure (eksempelrapport)
1. **Fictional address**, plausible but non-existent (pattern: "Algade 14, Korsbæk" /
   "Kanalgade 9, Møllerup"), wrapped in `.d` blur on the cover.
2. **Blur classes** (copy verbatim from eksempelrapport_1.html):
   - `.d{filter:blur(5.5px)}` — inline numbers, dates, addresses; replace digits
     with `●` groups matching the magnitude (`●.●●●.●●● kr.`), or `[placeholder]`
     for names/dates left readable-but-generic.
   - `.kf-body{filter:blur(6.5px)}` — whole locked paragraphs, filled with `▓`
     blocks approximating real text rhythm (vary run lengths; include a few real
     connector words for realism).
3. **Locked nøglefund**: `.lockbadge` (🔒 Nøglefund — kun i den fulde rapport) +
   `.kf-teaser` one-line italic teaser + `.kf-body` blurred payload. 4–6 per report.
   Lock the genuinely valuable finds (same-building comp details, listing-history
   specifics, area statistics) — the teaser must make their value obvious.
4. **Remove entirely** (not blur): agent name/phone/email/office, portal case
   numbers, the Operator Appendix (never ships in any client/site artifact), school
   names (→ "distriktsskole"/"lokal landsbyskole"), CVR numbers.
5. **What stays sharp**: the asking price and headline facts MAY stay real-looking
   if numbers were shifted (see §3); brand blocks; methodology wording; disclaimer.

## 2. Leak & purity checks (mandatory before shipping)
```bash
# real-identity leak check — must return 0
grep -ci '<real street>\|<real city if small>\|<agent brand>\|<agent surname>\|<comp streets>' out.html
# script purity — no Cyrillic in DA/EN artifacts (real bug 2026-07-01)
python3 -c "import re,sys;t=open('out.html',encoding='utf-8').read();print(len(re.findall(r'[а-яА-ЯёЁ]',t)))"
# structure sanity
grep -c '<section' out.html ; grep -c '</section>' out.html
```
Also verify visually (render + screenshot) that blur regions actually cover the
sensitive spans and the page matches the approved example's look.

## 3. Number shifting (anonymized but internally consistent)
- Shift identifying figures slightly: price ±~100k (break collisions between
  objects that share a price), areas ±2 m², build year ±1–2, plot, liggetid, CAGR.
- **Recompute every derived value from the shifted bases** (kr/m², monthly totals,
  5-yr cost, ratios) — never keep old derived numbers next to new bases.
- **Rank-order stability check**: list every ranked/compared claim in the text
  (cheapest 5-yr, lowest kr/m², biggest plot...). After shifting, verify each still
  holds; if a shift flips one (real case: a price shift made Hus 3's kr/m² the
  highest), either adjust the shift or rewrite the claim honestly — never leave a
  claim contradicting the shown numbers.
- Keep the verdicts, rankings and all conclusions identical to the real analysis —
  the anonymization note on the page promises exactly that.

## 4. Comparison-page pattern (sammenligning)
Architecture: **JSON (source of truth) → Python renderer → HTML**; JSON + renderer
stay in project knowledge, only HTML ships. Required content blocks, in order:
1. Cover with explicit anonymization note.
2. Overblik cards (verdict badge + key data + samlet score).
3. **Fortælling** per object — narrative prose with the story arc (the "dry version"
   failure is a known real regression; narrative is not optional).
4. **Mægleren siger vs vi fandt** per object (cmp/cmp-claim/cmp-find markup from
   report-template).
5. Nøgletal table (best/worst highlighting optional).
6. 5-yr cost bars (formula per SKILL v6 §18; asterisk any object missing its
   renovation reserve).
7. **Anchored scorecard legend**: every axis shows its question, weight, and what
   100 / 50 / 0 / N/A mean — then per-object bars each with a one-line "why".
   N/A renders as hatched, never guessed.
8. Skjult fordel / skjult ulempe per object (one of each; each must invert a
   surface impression).
9. Samlet rangorden with per-place rationale.
10. CTA box → `meta.eksempelrapport_url` (single JSON parameter).
Brand tokens: navy #0F1E30, cream #E8DED1, rust #C4533F, gold #D4975A, ice #B0C9DA;
Geist/Geist Mono for comparison pages, Fraunces/Inter/IBM Plex Mono for reports.

## 5. Language
Site artifacts are Danish. Watch machine-habit slips: Cyrillic characters, Russian
quote styles, decimal points where Danish uses commas (write `2,30 mio.`,
`31.400 kr.`).
