---
name: flow-video-producer
description: |
  Automates generating chained, multi-segment NordIndsigt b-roll reels in Google
  Flow using MCP Playwright browser automation, in NordIndsigt's own visual
  style (brand palette, hard-contrast lighting, no faces/text/logos, proven
  camera/motion vocabulary). Use when the user asks to generate a reel, a chain
  of Flow clips, or automate Google Flow video production for NordIndsigt.
  Requires MCP Playwright and a logged-in Google Flow session in the browser
  this agent controls. Runs locally (Cowork/Claude Code with real browser
  access) — this skill does NOT work from a sandboxed/remote session with no
  real Google Flow login.
---

# NordIndsigt Flow Video Producer

Automates the manual workflow this project already validated by hand: write a
segment prompt → generate in Flow → grab the exact last frame → feed it as the
next segment's start image → repeat → concatenate into one seamless reel.

This skill does NOT know Google Flow's current DOM/selectors — it never
hardcodes button coordinates or CSS selectors. On every run, use
`browser_snapshot` first to find the actual prompt box / generate button /
download link on the page as it exists today, then act on what you see. Flow's
UI changes; a hardcoded selector is a guaranteed future failure.

## Mandatory phases (do not skip, checkpoint with the user after each one)

1. **Setup check** — confirm MCP Playwright is available and the browser is
   logged into Google Flow with credits available. Stop and tell the user if
   not.
2. **Read the brand rules** — load `references/style.json` and
   `references/known-failures.md` before writing a single prompt. Every prompt
   this skill writes must pass the checklist in `known-failures.md`.
3. **Scene breakdown** — turn the user's request into a numbered list of
   8-second segments, each with: one-line purpose, subject, and which of the 6
   narrative sections it belongs to (see `style.json`). Show this list to the
   user and get explicit approval before generating anything.
4. **Segment 1** — write the full prompt (image start description + tail from
   `style.json` + video motion beats with timestamps), generate it, wait for
   completion, download the result.
5. **Chain** — run `scripts/chain_frame.py` on the downloaded segment to
   extract its exact last frame. Use that frame as the literal starting image
   for the next segment's generation (do not describe it in words — upload the
   real extracted frame). Write the next segment's motion prompt as a
   continuation of the same story beat, not a new scene.
6. **Repeat step 5** for every remaining segment. Check with the user after
   each segment if the result doesn't match intent — do not silently keep
   generating past a bad result and hope the chain recovers.
7. **Concatenate** — once all segments are approved, run
   `scripts/concat_segments.py` to join them into one file, no transitions
   (segments already connect seamlessly because each starts from the previous
   one's real last frame).

## Prompt-writing rules (non-negotiable, learned the hard way on this project)

- English for the prompt text itself; discuss with the user in whatever
  language they use.
- Every prompt ends with the tail block from `style.json` — brand palette,
  "no text/logos/faces/house numbers", ambient-audio-only line.
- Every video prompt has explicit timestamps (`0.0–1.5s: ...`) and motion that
  begins decisively on frame one — no calm intro beat.
- **Every single video, chained or standalone, must contain at least one real
  state-change beat** — not just camera movement variety (push/pan/tilt alone
  is not enough and reads as boring/static even when the camera is moving).
  Pick one from `reliable_techniques` in `style.json`: a weather shift, a
  light/color wave, a hard flash-cut between two states, a collapse/avalanche,
  a material bursting open. If a segment's prompt draft has camera movement
  but no actual change of state in the scene, rewrite it before generating —
  don't spend credits on a "moving camera, static world" clip.
- Check every new concept against `references/known-failures.md` BEFORE
  generating. If a concept matches a known failure pattern, don't spend
  credits testing it again — either drop it or use the documented workaround.
- Never trust a generation result from its filename or your own prediction —
  always pull real frames (`scripts/chain_frame.py --preview`) and look at
  them before calling a segment "good."

## What this skill deliberately does NOT do

- Does not run unattended overnight batches. A human looks at every segment
  before the next one is chained from it — a bad segment poisons every segment
  chained after it.
- Does not manage payment, credits, or account switching. If credits run out
  mid-chain, stop and tell the user.
