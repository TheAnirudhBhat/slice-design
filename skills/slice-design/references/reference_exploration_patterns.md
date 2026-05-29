---
name: Exploration patterns — novel techniques that respect slice hard rules
description: Use when in explore mode. Read for clip-path, blur, momentum, spring techniques + how to apply them within slice constraints.
type: reference
---

This file is for `explore` mode — when the user wants something new, novel, or distinctive while keeping slice's hard rules (brand voice, palette, Rubik, no emoji, anti-patterns) locked. The patterns below come from emil-design-eng and have been mapped to slice surfaces where applicable.

Don't reach for these in default `build` mode. Use the calibrated recipes for routine work. Reach here when the brief warrants a fresh treatment OR when an existing surface needs a distinctive moment that the standard recipe doesn't support.

## clip-path techniques

`clip-path` is one of the most powerful CSS animation tools. It animates the visible region of an element without re-rendering content — paint-only, GPU-friendly.

### Hold-to-delete / hold-to-confirm

Use `clip-path: inset(0 100% 0 0)` on a coloured overlay. On `:active`, transition to `inset(0 0 0 0)` over 2 seconds with linear timing. On release, snap back with 200ms ease-out. Add `scale(0.97)` on the button for press feedback.

```css
.delete-button {
  position: relative;
  transition: transform 160ms ease-out;
}

.delete-button:active {
  transform: scale(0.97);
}

.delete-button .overlay {
  position: absolute;
  inset: 0;
  background: var(--negative-red);
  clip-path: inset(0 100% 0 0); /* fully hidden from right */
  transition: clip-path 200ms ease-out; /* release snap */
}

.delete-button:active .overlay {
  clip-path: inset(0 0 0 0); /* fully revealed */
  transition: clip-path 2s linear; /* slow press */
}
```

Slice contexts where this could land:
- Confirming destructive actions where a dialog feels too heavy (delete saved card, deactivate UPI)
- Confirming high-value transfers (instead of PIN re-entry for amounts above a threshold)

WHY this works for slice: dialogs are heavy + interruptive. Hold-to-confirm is deliberate (slow, gives time to back out) + light (no modal). Pairs with slice's "no Cancel button on bottom sheets" rule — the user controls the action via gesture, not via competing CTAs.

### Image reveal on scroll

Start with `clip-path: inset(0 0 100% 0)` (hidden from bottom). Animate to `inset(0 0 0 0)` when the element enters the viewport.

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.clipPath = 'inset(0 0 0 0)';
    }
  });
}, { threshold: 0.1 });
```

Or with Framer Motion's `useInView` (`{ once: true, margin: "-100px" }`).

Slice contexts: marketing surfaces (rare), onboarding hero reveals, Atom intro illustration.

### Comparison slider

Overlay two images. Clip the top one with `clip-path: inset(0 50% 0 0)`. Adjust the right inset value based on drag position. No extra DOM elements, fully hardware-accelerated.

Slice contexts: rare, but useful for before/after explanatory surfaces (e.g. "your spends without Spark vs with Spark").

### Tabs with perfect colour transitions

Duplicate the tab list. Style the copy as "active" (different background, different text colour). Clip the copy so only the active tab is visible. Animate the clip on tab change. Seamless colour transition that timing individual colour transitions can never achieve.

Slice contexts: the Pills (segmented control). This technique could replace the current pill-thumb implementation for a smoother colour cross-fade. Currently the slate-10 track + white-thumb is fine; this is an exploration upgrade, not a required change.

## Blur to mask imperfect transitions

When a crossfade between two states feels off despite trying different easings and durations, add subtle `filter: blur(2px)` during the transition.

```css
.button-content {
  transition: filter 200ms ease, opacity 200ms ease;
}

.button-content.transitioning {
  filter: blur(2px);
  opacity: 0.7;
}
```

Slice contexts:
- Action pill state morphs (default fill → highlighted fill on V-500 surface)
- Card content swap on filter change
- Amount value changes where the standard translateY pattern doesn't fit (e.g. credit utilisation bar value updating)

Keep blur under 20px. Heavy blur is expensive (especially Safari).

## Spring-based mouse interactions (web protos only)

Tying visual changes directly to mouse position feels artificial because it lacks momentum. Use `useSpring` from Motion (Framer Motion) to interpolate values with spring-like behavior.

```jsx
import { useSpring } from 'framer-motion';

// Without spring: instant, artificial
const rotation = mouseX * 0.1;

// With spring: natural, momentum
const springRotation = useSpring(mouseX * 0.1, {
  stiffness: 100,
  damping: 10,
});
```

This works because the animation is **decorative** — it doesn't serve a function. If this were a functional graph in slice's banking app, no animation would be better.

Slice contexts:
- Web proto landing pages (slice.com style marketing)
- Animated brand-mark decorations on FTUX hero screens
- NOT in production app UI (functional surfaces — keep mouse interactions instant)

## Momentum-based dismissal (gestures)

Already covered in `reference_motion.md`. Reproduced here for explore-mode reach.

```js
const timeTaken = new Date().getTime() - dragStartTime.current.getTime();
const velocity = Math.abs(swipeAmount) / timeTaken;

if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
  dismiss();
}
```

Slice contexts:
- Bottom sheet dismiss (existing behavior — codify with velocity threshold)
- Toast dismiss (swipe-to-dismiss)
- Card archival in Action centre (swipe-to-archive)

## Damping at boundaries

When a user drags past a natural boundary (drawer at top of scroll, dialer past the Full chip, action pill past edge), apply damping. The more they drag past, the less the element moves.

Math: `displacement = boundary + (rawDrag - boundary) * dampingFactor`, where dampingFactor is around 0.3–0.5.

Slice contexts:
- Repayment dialer drag at boundaries (orange-min vs blue-max ends)
- Pull-to-refresh in lists (if slice adds this — not currently)
- Card stack drag in Action centre

## 3D transforms for depth

`rotateX()`, `rotateY()` with `transform-style: preserve-3d` create real 3D effects in CSS. Card flips, depth on hover, orbiting elements.

```css
.wrapper {
  transform-style: preserve-3d;
}

@keyframes orbit {
  from {
    transform: translate(-50%, -50%) rotateY(0deg) translateZ(72px) rotateY(360deg);
  }
  to {
    transform: translate(-50%, -50%) rotateY(360deg) translateZ(72px) rotateY(0deg);
  }
}
```

Slice contexts:
- Atom orb 3D intro illustration (rendered in 3D, but the wrapper animation can use CSS rotateY for parallax)
- Super card flip on Credit L1 (front of card → back of card with details)
- Rare; for surface moments only

Don't add depth where it doesn't serve the moment. Slice's brand isn't 3D-heavy; reserve for specific celebration / showcase contexts.

## How to propose explorations

In `explore` mode, the workflow is:
1. **Hard rules**: confirm what stays locked (brand voice, palette, Rubik, no emoji, calibrated bans for the surface)
2. **Soft rules in question**: which calibrated default is being remixed and why? (e.g. "the default L1 recipe doesn't support hero-with-actionable-data; proposing mid-screen Primary like Atom L1")
3. **Technique applied**: pick from this file + emil-design-eng. Cite the technique and what it accomplishes.
4. **Output**: show the user 2-3 alternatives, not one. Lead with your recommendation + reasoning. They pick.

Pattern: "Hard rules locked. Default recipe X doesn't support the brief because Y. Proposing technique Z (from `reference_exploration_patterns.md`). Alternatives: A (this approach), B (more conservative), C (more ambitious). Recommendation: A because…"

Why this approach: keeps the brand grounded while opening room for novel patterns. The user gets to see the spectrum, not just one prescription.
