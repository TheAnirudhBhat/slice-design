---
name: Craft principles — what makes slice design feel slice
description: The implicit principles behind every calibrated rule. Read when reasoning about novel patterns or defending an existing rule.
type: reference
---

Calibrated rules in this skill are the surface — the principles below are why they exist. When a novel situation arises that no rule covers, fall back to these.

These principles are adapted from emil-design-eng's design engineering philosophy. They reframe slice's calibrated approach as an articulation of what good design feels like, not just what it does.

## Taste is trained, not innate

Good taste isn't personal preference. It's a trained instinct — the ability to see beyond the obvious and recognize what elevates. You develop it by:
- Surrounding yourself with great work (slice's calibrated reference frames + the broader fintech / consumer-design landscape)
- Thinking deeply about why something feels good (the WHY field on every calibrated rule)
- Practicing relentlessly (every screen, every flow, every audit)

For slice specifically: reverse-engineer the production app. Inspect the canonical L0/L1/L2 reference frames in the DLS file. Notice what's there AND what's missing. The empty-rewards screen has an asteroid + diamonds illustration AND no bottom CTA — both are calibrated decisions.

Don't just match the rule. Understand the principle.

## Unseen details compound

Most details users never consciously notice. That's the point. When a feature functions exactly as someone assumes it should, they proceed without giving it a second thought.

For slice:
- Indian number grouping (`₹1,00,000` not `₹100,000`) — users don't notice it's right, but they'd notice if it were wrong
- ₹ touching the digit — same principle
- Status caption rendered in status colour — users don't notice the green text, but they feel "this is OK" before they read the words
- Photo Avatar identity across pods — users don't notice it's the same photo, but the consistency creates trust

> "All those unseen details combine to produce something that's just stunning, like a thousand barely audible voices all singing in tune." — Paul Graham

Every calibrated decision in this skill exists because the aggregate of invisible correctness creates UIs people trust without knowing why.

## Beauty is leverage

People choose tools based on the overall experience, not just functionality. In fintech specifically, beauty is trust: a polished UI tells users "this company knows what they're doing with my money."

Good defaults and good animations are real differentiators. Slice's brand-purple gradient on Payments L0, the textured grainy gradient tick on payment success, the campaign-pill reveal motion — these are the visible "of course slice does it this way" moments that distinguish slice from generic banking apps.

Don't apologize for caring about polish. Don't dilute the brand in service of "shipping faster." Slice's design quality is part of the product.

## Review your work the next day

You see imperfections the next day that you missed during development. Timing issues invisible at full speed become obvious in slow motion. Misaligned spacing becomes obvious with fresh eyes.

For slice work:
- Build the screen, run the slice-slop test
- Sleep
- Look again the next morning. Often you'll catch:
  - Spacing values that drift from the 4px / 8px scale
  - Text colours that should be secondary but rendered primary (or vice versa)
  - Bottom-anchored CTAs that should be mid-screen (Atom L1 pattern)
  - Section headers that should be Bold but rendered List (or vice versa)

If you can't wait a day, at least step away for an hour and come back with fresh eyes. The screen you finished an hour ago is not the screen you'll see freshly.

## Test on real devices

For touch interactions (drawers, swipe gestures, drag-dial on repayment, action pill morphs), test on physical devices. The Xcode Simulator is an alternative but real hardware is better for gesture testing.

How: connect your phone via USB, visit your local dev server by IP address, use Safari's remote devtools.

Specifically for slice:
- The repayment dialer drag interaction needs touch + pointer-capture + damping testing
- The bottom sheet momentum-dismissal needs flick-velocity testing
- The campaign pill reveal needs haptic timing verification

Simulator catches layout bugs. Real device catches feel bugs.

## Slow motion testing

Play animations at reduced speed to spot issues invisible at full speed. Temporarily increase duration to 2-5× normal, or use browser DevTools animation inspector to slow playback.

Things to look for in slow motion:
- Do colours transition smoothly, or do you see two distinct states overlapping? (If so → blur crossfade per emil's technique)
- Does the easing feel right, or does it start/stop abruptly?
- Is the `transform-origin` correct, or does the element scale from the wrong point?
- Are multiple animated properties (opacity, transform, colour) in sync?

Frame-by-frame inspection in Chrome DevTools (Animations panel) reveals timing issues between coordinated properties.

## Cohesion matters more than novelty

Slice's motion vocabulary feels cohesive partly because every animation respects the brand's "deliberate fintech" tone. The named easings, durations, and choreographies fit the personality.

When choosing motion values for a new surface, consider the personality:
- A celebration moment (payment success, rewards reveal) can be slightly bouncier
- A professional dashboard (Banking L0 balance card) should be crisp and fast
- An exploration / FTUX surface (Atom intro) can have a slightly different feel — but still recognizably slice

Don't introduce a motion vocabulary that fights the brand. A 60Hz "playful" wobble doesn't fit slice. A deliberate `spring-soft` overshoot for a one-shot bling DOES fit.

## The opacity + height combination

When items enter and exit a list (Atom cards on the chooser, Action centre notifications), opacity and any height/translate change must work well together. There's no formula — adjust until it feels right.

Common patterns that work:
- New row: `opacity 0 + translateY(8px)` → `opacity 1 + translateY(0)`, 300ms `out`
- Removed row: `opacity 1 → 0`, 240ms `out-fast`, then collapse height

Get the opacity timing slightly ahead of the position settle. Position settles can finish 100ms after opacity reaches 1; the eye doesn't notice.

## Asymmetric press / release

Pressing should be slow when it needs to be deliberate (hold-to-confirm, hold-to-delete, drag-to-reorder). Release should always be snappy (200ms ease-out).

Slow where the user is deciding. Fast where the system is responding. This applies broadly:
- Repayment dialer drag (follows finger with damping) → snap-to-notch on release (fast)
- Hold-to-delete (2s linear fill) → snap-back on release (200ms ease-out)
- Bottom sheet drag-to-dismiss (follows finger) → snap to dismissed-position on release threshold

## Naming creates identity

For sub-products (Atom, Spark, Monies, Fire), the name carries the brand more than any UI element. "atom" feels more elegant than "Goal Saver"; "monies" feels more slice than "Rewards Cash".

When naming a new feature or sub-product, sacrifice discoverability for memorability when appropriate. The Banking L0 entry card calls the new product "slice atom" — not "Savings Goals" — and that naming is part of why it works.

## Handle edge cases invisibly

Users never notice edge-case handling, and that's exactly right. Pause toast timers when the tab is hidden. Fill gaps between stacked items with pseudo-elements to maintain hover state. Capture pointer events during drag. The UI just works.

For slice specifically:
- Action pill row: UPI ID re-expands to full width when alone. User doesn't notice; they just see "the pill looks right."
- Payment confirmation: pink-immersion intermediate only for rewarded txns. User doesn't notice it's conditional; they just see "successful payments with rewards feel celebratory."
- Bottom sheet: no handle bar. User doesn't notice it's missing; they just dismiss via scrim tap.

Aim for "invisible correctness" — the UI does the right thing without announcing it.

## Optically center, don't just mathematically center

The eye reads a shape's center from its visual MASS, not its bounding box. An
element with uneven weight — a rich/3D illustration, a ▶ play triangle, an icon
heavier on one side — placed at a pure `50%` / `translate(-50%)` looks slightly
OFF: top-heavy mass reads as sitting too low; side-heavy mass reads as shifted.

Nudge it a few px so it LOOKS centered:
- Top-heavy illustration in a card → `translateY(calc(-50% - 4px))` (up a touch).
- ▶ glyph in a round button → shift right ~1–2px (the triangle's mass is left-of-center).
- A glyph with a tail/descender → nudge against the tail.

Magnitude: ~1–3% of the element / a few px — enough to balance, not enough to look
misaligned. Squint test: the version that looks centered when blurred IS centered.
(cal:2026-05-30 R24 cont-31 — insurance entry-card shield illustration nudged up 4px;
user: "this is top heavy with the rich illustration, bias it slightly to the top.")
