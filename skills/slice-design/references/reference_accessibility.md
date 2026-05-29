---
name: Accessibility — slice motion + interaction patterns
description: Reduced motion handling, touch-vs-mouse gating, and the accessibility-correctness baked into slice motion choices.
type: reference
---

Accessibility in slice is not an afterthought — most of the calibrated motion rules already serve accessibility:
- No infinite parallax (saves battery, doesn't trigger motion sickness)
- No bounce-on-tap (predictable, less startle)
- No autoplay video (no surprise audio, no data forced on user)
- Generous tap targets (48px minimum)

This file documents the accessibility-specific runtime patterns slice should follow.

## `prefers-reduced-motion`

Some users have vestibular disorders, motion sensitivity, or migraine triggers. Their OS-level "reduce motion" setting should suppress slice's transform-based motion.

Important: reduced motion ≠ zero motion. Opacity and colour transitions usually stay — they aid comprehension without causing motion sickness. What goes away is **position / scale / rotation** animation.

```css
@media (prefers-reduced-motion: reduce) {
  .slide-in {
    /* Replace translate animations with opacity */
    animation: fade-in 0.2s ease;
    transition: opacity 0.2s ease;
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

```jsx
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();
const initialX = shouldReduceMotion ? 0 : '-100%';
```

Slice-specific fallbacks:
- **Sheet present** (translateY 100% → 0): reduced motion = opacity 0 → 1, no translate
- **Push/pop nav**: reduced motion = no slide, just opacity crossfade
- **Spark hero reveal**: reduced motion = no overshoot spring, no rotation; just opacity + content swap
- **Campaign pill reveal**: reduced motion = pills appear at full opacity in place, no horizontal-expand morph
- **Payment status transition envelope**: reduced motion = skip the brand-immersion intermediate; go straight to white-tick confirmation

Why opacity stays: opacity transitions don't trigger motion sickness. They still aid comprehension (something appearing means "look here") without the inner-ear effects of position/scale movement.

## Touch device hover gate

Touch devices trigger `:hover` on tap, which causes false positives — a tap-to-navigate flickers through hover state before activating.

```css
@media (hover: hover) and (pointer: fine) {
  .button:hover {
    transform: scale(1.02);
  }
}
```

Gate ALL hover styling behind this media query. Includes:
- Hover color changes
- Hover transforms (scale, lift)
- Hover background changes
- Hover shadow changes
- Hover text-decoration

Why both conditions? `hover: hover` says "this device supports real hover"; `pointer: fine` says "this device has precise pointer input (not finger)". Both together = mouse / trackpad / stylus — the contexts where hover is a real state, not a tap artifact.

## Tap target minimums

Every interactive element should have a tap target of at least **48×48 px** (CSS pixels). This is the WCAG and Material Design baseline; slice follows it.

Visual size can be smaller — chips can render at 28px, icon buttons at 24px — but the **tap target** (the area that responds to taps) must be 48×48. Use padding or a transparent overlay to expand the tap target without changing the visual.

```css
.icon-button {
  width: 24px;
  height: 24px;
  /* Expand tap target */
  position: relative;
}
.icon-button::after {
  content: '';
  position: absolute;
  inset: -12px; /* expands tap area by 12px on each side = 48×48 total */
}
```

## Focus indicators

Keyboard users need to see where focus is. Slice's calibrated rules don't strip focus rings (good). But on V-500 brand-immersive surfaces, the default browser focus ring (blue/black outline) doesn't read well.

For V-500 surfaces (Payments L0, Pay person screen): use white outline (`outline: 2px solid white; outline-offset: 2px`) on focused interactive elements.
For white page surfaces: default browser focus ring or `outline: 2px solid var(--brand-purple); outline-offset: 2px` is fine.

Never remove focus rings without a replacement. `outline: none` without an alternative breaks keyboard navigation.

## Contrast minimums

Body text against background: WCAG AA = 4.5:1 contrast. Slice's Rubik on white (text-primary `#0E0E12` on `#FFFFFF`) is 16.6:1 — comfortable.

Watch for:
- Caption secondary text (`text-secondary`) — verify contrast at small sizes (12px Caption may need text-primary if used on lower-contrast surfaces)
- V-500 brand text on V-50 subtle bg — at small sizes (12px Metadata), check contrast
- White text on V-500 brand-immersive — `#FFFFFF` on `#D30AD7` is 4.5:1, JUST passes AA for normal text. For 12px text, that's borderline; for Display sizes, fine.

When in doubt, run the colour pair through a contrast checker. Don't ship below 4.5:1 for body text or below 3:1 for large text.

## Animation on rapid-trigger actions (accessibility crossover)

Already in `reference_motion.md` as a perf rule, also an a11y rule: no animation on keyboard-initiated actions (command palette, filter toggles via keyboard, ⌘K). Why for a11y: keyboard users repeat these actions hundreds of times daily; animation makes the UI feel slow and disconnected, which is doubly painful when relying on keyboard for everything.

## Status / error not by colour alone

Slice's status palette (green/amber/red/blue) is meaningful. But colour-blind users (~8% of men, ~0.5% of women) may not distinguish green vs red.

Always pair colour with:
- **Icon** (green tick / amber !  / red X / blue info) — slice's transaction detail status indicators already do this
- **Text** ("Paid" / "Pending" / "Failed" / "Initiated") — colour reinforces, text confirms

Don't ship a UI where the only difference between "success" and "failure" is the green vs red of a dot.
