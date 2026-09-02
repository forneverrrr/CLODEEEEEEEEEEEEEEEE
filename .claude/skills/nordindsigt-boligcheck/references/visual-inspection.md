# Visual inspection — photos, floor plans, zoom discipline

The how-to behind `VIS-1` … `VIS-5` in `rules.md`. Everything tagged `photo` must
trace to an actual image-open tool call in the same session (`VIS-4` — fabrication
severity = inventing a comp).

## 0. Ingestion rules
- salgsopstilling / tilstandsrapport / elrapport / energimærke: convert to images
  (pdf2image / pdftoppm at ≥150 dpi) and VIEW the pages — the text layer loses
  photos and the RØD/GUL/GRÅ + brand/stød icon colours.
- Energy label class letter: confirm on the certificate cover VISUALLY (recurring
  salgsopstilling-vs-certificate mismatch — errors log 2026-06-29). Text-layer OCR
  of the label page can itself be wrong (Skomagerbakken "D" artifact vs visual "B") —
  the pixel image is the authority.

## 1. Zoom discipline
Before asserting any small detail (compass rose, label letter, window bars, roof
material, meter readings on a photo): **crop the region and upscale ≥3×** (PIL,
LANCZOS), then view the crop. If still ambiguous after zoom → `photo — unconfirmed`.
Never assert from a full-page thumbnail.

## 2. Floor-plan pass (mandatory when a plantegning exists — `VIS-2`)
1. **Compass rose**: crop + zoom it; state the north rotation vs the sheet's "up"
   (e.g. "N rotated ~25° clockwise"). Derive which compass direction each main
   window wall faces. This converts "orientation may vary" into a determination.
2. **Cross-checks**: view-photos out the windows (identifiable landmarks — a church
   spire, a known tower — confirm bearing); facade photos vs street direction;
   Boligsiden "Solens bane" widget as the final confirmation to recommend to the
   client.
3. **Areas**: sum the plan's room dimensions if printed; sanity-check vs BBR m² and
   tinglyst m² (a modest BBR-vs-tinglyst gap is a methodology difference, not fraud
   — say so; a large gap is a question).
4. **Layout risks**: gennemgangsværelser (walk-through rooms), rooms with a single
   small window (light), skråvægge (top floor — reduced usable height, confirm on
   the bedroom photos), bathroom without window (ventilation), kitchen work
   triangle if visible.
5. Output: a short "Sol & orientering"-type section with the practical meaning
   (which rooms get morning/evening sun, what the light in the photos corroborates),
   plus the recommendation to verify at a viewing at different times of day.

## 3. Room-by-room photo pass (`VIS-1`)
Floors, ceilings, walls, windows (glazing layers, corner condensation), doors,
kitchen, every wet zone, heating (radiators/underfloor), stairs + railings,
balcony/altan (structure below, wood), facade, fence/privacy, driveway. Tie every
overlap to the documented finding (RØD/GUL) — cite both, one cost, never two.
Net the cosmetic+functional total into one `assumption` range for negotiation.

## 4. Exterior / building forensics (apartments & shared buildings)
- **Ground-floor use**: commercial signage (bars, restaurants, shops) → triggers the
  mixed-use lens (`type-ejerlejlighed.md`).
- **Security features**: window bars, gitterport, dørtelefon — corroborates (or
  contradicts) area-safety signals; describe neutrally.
- **Courtyard vs street facade**: rate both; a polished street front with a tired
  courtyard is common in old karré blocks — set the buyer's expectations for the
  actual window views.
- **Roof material & state** (if visible): eternit ridges, moss load, skylights.
- **Neighbouring plots**: visible construction, dereliction, large trees shading
  south facades.

## 5. Honesty rules (unchanged, restated)
- Say what the photos do NOT show; point to the document that covers it.
- Correct the eyeball where documents disagree (gulvvarme case).
- Marketing prose is never a visual observation.
- Every 3c row must be traceable to a specific image view this session.
