# Finished-example clips — real shipped output, not aspirational style notes

Fill in one entry per chosen video below before the next Flow generation
session. The agent reads this file at Phase 3 of every run — an empty or
stale entry means it has nothing concrete to ground new prompts in beyond
`style.json`'s prose descriptions.

Keep 2-4 entries active at a time. More than that dilutes the signal — the
agent starts blending unrelated patterns instead of following one clear
example per narrative section/technique.

## Entry template

```
### [video name/number] — [path or link to the finished file]
Narrative section: [1-6 from style.json]
Reliable technique demonstrated: [name from style.json reliable_techniques, or "none/mood-only"]
Real timing that worked: [e.g. "state-change beat lands at 4.0s, not 1.5s like
  the style.json example — the slower build reads better for this content type"]
QC note: [anything worth flagging — a segment that was weak/borderline and
  should NOT be repeated, or a segment that was unusually strong and worth
  copying closely]
```

## Active entries

User-picked as the 4 strongest by execution (2026-08-09). No file path on
disk yet — described from the real montageplan/shot breakdown text. Add the
actual file path/link here once it's placed somewhere the agent can open it;
until then treat the notes below as the authoritative reference content.

### 01 — Fundet på hjemmesiden — [PATH TBD]
Chain: Person's_hand_slides_paper → Hand_holding_house_photo →
  House_facade_rot_examination → Rotten_beam_in_raking_light
Narrative section: 2 (Skjult under overfladen) — framed as a discovery hook
Reliable technique demonstrated: none of the named reliable_techniques —
  this is a close-up state-reveal (rotten beam in raking light) rather than a
  burst/collapse/weather-shift. Worth treating as its own working pattern:
  a slow build across 3 calm establishing shots, then a hard reveal on the
  4th, text matching each image beat almost word-for-word before the twist.
Real timing that worked: text on the first 3 clips sits early (0.0-2.5s) and
  stays calm/matches the image at face value; the reveal line lands at
  4.0-7.0s on the close-up, not on cut — let the punch line sit on an already-
  held shot, don't put it on the cut itself.
QC note: strong — the word-for-word match between screen text and what the
  image literally shows (before the twist) is the reusable trick, use it
  again for any "annonce lyver ikke, den udelader" style hook.

### 04 — Nedbrydning II — [PATH TBD]
Chain: Ceiling_bursting_open_with_water → Wallpaper_peels_revealing_crumbling
  → Water_pouring_down_brick_wall → Camera_rising_showing_house_roof
Narrative section: 5 (Разрушение)
Reliable technique demonstrated: material bursting/tearing open (ceiling) +
  camera rising to reveal full scope (roof/moss from above)
Real timing that worked: the burst happens in the first 1.0s of clip 1 (no
  calm intro), then clip 3 (water pouring) gets the longest hold (2.0-6.0s)
  because it's a continuous, readable motion, not a sudden state-change —
  give continuous-motion clips more text-hold time than burst clips.
QC note: strongest chaining example we have — 4 linked segments, each a
  distinct beat (effect → cause → source → full scope from the air). Use
  this exact structure (symptom → cause → source → scale) as the template
  for any future 4-segment "hidden damage" chain.

### 06 — Dansk vejr — [PATH TBD]
Chain: Rain_to_snow_to_sun → Cloud_shadow_sweeps_across_rooftops →
  Fog_rolls_into_street → Frost_crystals_race_across_window
Narrative section: mood/connector (no finding) — sits between heavier rils,
  not one of the 6 numbered sections
Reliable technique demonstrated: large-scale weather transformation — the
  cleanest confirmed example of this technique in the whole catalog
Real timing that worked: only 2 of 4 clips carry text (clip 1 and clip 4) —
  clips 2 and 3 run as pure mood with zero on-screen text. The one question
  line ("Er din bolig klar til det?") sits on the longest hold in the whole
  set, 1.5-8.0s (6.5 sec), placed on the thaw/resolve of the frost, not on
  the storm peak.
QC note: strong — proves mood-only segments (no text) are fine and even
  necessary as breathing room between text-heavy rils; don't force text onto
  every single segment just because other rils do.

### 10 — Loftet — [PATH TBD]
Chain: Flashlight_beam_reveals_rotten_rafters → Camera_retreats_from_attic →
  Camera_descends_into_room (single continuous POV, no hard cuts)
Narrative section: 2 (Skjult under overfladen)
Reliable technique demonstrated: none of the named reliable_techniques —
  this is a single unbroken POV move (flashlight search → retreat → descend
  into a warm room), not a burst/collapse. Reference this one specifically
  when a segment needs to feel like ONE continuous shot instead of a chain of
  distinct bursts.
Real timing that worked: the "punch" (rotten rafters) lands at 3.5s, inside
  the first clip, while the flashlight beam is still visibly searching — text
  ("Loftet er det, ingen tjekker") sits before the find, not after it. Final
  clip ends on a warm, calm room with the attic hatch already closed —
  matches the known-failures.md workaround of using an already-closed/ajar
  opening instead of animating a hinge.
QC note: strong — good reference for any CTA-adjacent resolution shot that
  needs warmth/calm without needing a literal door-opening animation.
