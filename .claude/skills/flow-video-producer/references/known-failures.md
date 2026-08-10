# Known failure patterns — checked against real generations, not guesses

Every concept below was actually generated and actually failed. Don't spend
credits re-testing these; either avoid the category or use the documented fix.

## Fine mechanical / precise motion — model can't animate it
- Hinged doors opening/closing (tried twice, both "хлам")
- A balance scale beam pivoting — replace with an avalanche/collapse instead
- A key snapping/breaking in a lock — replace with a bolt/deadbolt sliding
  shut (one coarse translation, not a fracture)
- Checkmarks being drawn/counted one by one — replace with a single color-wave
  sweep across the whole area at once, no counting

## Text and fine on-screen detail
- The model will invent garbled, nonsense text on any document, sign, or
  banknote it renders itself (confirmed repeatedly: fake stamps, wrong
  alphabets, wrong currency symbols)
- **Fix that actually works**: if real text must appear on screen (e.g. our
  own website), composite a REAL screenshot into the start image first (Nano
  Banana / image editor), then generate video from that image. The model
  preserves a real image reasonably well in frame one; it still may degrade
  small text slightly during motion, so keep on-screen text areas out of
  focus or off to the side, not the hero subject held in sharp focus for the
  whole clip.
- Never ask the model to invent money, price tags with numbers, or open books
  with paragraphs of visible text — use blurred/out-of-focus currency, or
  physical objects (coins, folded documents) without visible printing.

## Representation
- Don't let stock/generated footage default to non-Danish signage, non-Danish
  house styles (US ranch houses, "FOR SALE" yard signs in English), or a cast
  that isn't representative of the target market (Denmark). Check every stock
  pick's actual frame before using it — thumbnails and auto-generated titles
  on stock sites are frequently wrong or misleading.

## Camera moves that don't render as intended
- "Camera passes through a solid barrier" (through an intact roof, an intact
  wall) — reliably glitches. Only fly the camera through a barrier that has
  ALREADY been destroyed/opened earlier in the same or a chained segment —
  moving through empty space, not solid matter, is fine.
- A door already ajar with only the light widening (no hinge motion asked of
  the model at all) is a reliable substitute when a "door opening" beat is
  needed for a resolution/CTA shot.

## Stacked camera movements - suspected cause of recent low-quality generations
- Source: cross-checked against kdowswell/veo-tools' prompt-checklist.md
  (public, verified 2026-08-09) - this is a documented Veo failure pattern,
  not our own confirmed test yet, so treat it as a strong hypothesis to apply
  immediately, not a proven-in-our-pipeline fact like the entries above.
- Pattern: describing two movements at once in a single shot - "dolly while
  panning", "orbit and zoom", "push in with a slight tilt". Veo reportedly
  either favors one and drops the other, or produces jarring, unpredictable
  motion.
- Our current style.json `video_tail` line lists several movement types
  (push, whip-pan, rack-focus, drift, tilt, crash zoom) as things to "vary" -
  read carefully, this means pick ONE per shot and vary WHICH one across
  different shots/segments, never combine two of them inside the same 8s
  clip. If a prompt draft reads like "camera pushes in while panning right",
  split it: pick the single movement that best serves the beat.
- If a recent low-quality batch used stacked-movement prompts, that is the
  first thing to check and fix before blaming the model or the reference
  images.

## Generic descriptions - quality warning, not a hard failure
- Source: same external checklist as above.
- Vague nouns without material/texture detail ("metal surface", "water",
  "light") tend to produce generic, stock-footage-feeling output even when
  the shot technically succeeds. Add material specificity: not "metal
  surface" but "brushed titanium with fine scratches catching the key
  light" - matches our own palette/lighting language already used in
  style.json's image_tail, just push it further into the subject
  description itself, not only the lighting block.

## What reliably works, confirmed by multiple successful generations
- Large-scale weather change in one continuous shot (rain → snow → sun)
- A hard flash-cut between two states, described explicitly as instant, not a
  dissolve
- A wide establishing shot with a whole recognizable subject (a whole house,
  not a decontextualized macro fragment) as the opening frame of a hook —
  users need to recognize "this is a house" before the twist lands
