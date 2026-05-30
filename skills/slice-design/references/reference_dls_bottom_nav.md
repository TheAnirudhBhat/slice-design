---
name: DLS 2.0 Bottom Nav
description: Pod-based app navigation — center-anchored active item, full-row translation, scroll-or-tap interaction, two variants (white-gradient + V-500 brand-immersive Valentino).
type: reference
---

Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, nodes `451:1116` (component), `1827:655` (5-state strip).
Canonical proto: `slice-app-proto/src/components/BottomNav.{jsx,css}` — the live spec.

## Pod order (NEVER reorder)

Banking · Explore · Pay · Credit · Activity

This natural order is preserved at all times. The active item is not moved relative to the others; instead the **whole row translates** so the active lands at the viewport center.

## Geometry

- **Phone width**: 390px (iPhone 15)
- **Nav row width**: 390px (5 × 78px slot)
- **Slot width**: 78px per item (5 × 78 = 390)
- **Active circle**: 64×64, white bg, V-500 (#D30AD7) glyph, shadow `0 6px 20px rgba(0,0,0,0.16)`
- **Inactive circle**: 44×44, slate-10 (`rgba(0,0,0,0.1)`) bg, slate-60 glyph
- **Glyph sizes**: 32×32 inside active, 24×24 inside inactive
- **Active item is bigger AND in the center.** Both behaviors apply, never one without the other.
- **NO vertical lift** — the active item grows IN PLACE at the row baseline; circle bottom-edges align across active + inactive.

## Translation model

`translateX = containerCenter − activeSlotCenter`, where `activeSlotCenter = (activeIndex + 0.5) × slotWidth`.

| Active pod | activeIndex | Row translateX | Items visible |
|---|---|---|---|
| Banking | 0 | +156 (right) | Banking · Explore · Pay (Credit + Activity off-screen right) |
| Explore | 1 | +78 | Banking · Explore · Pay · Credit (Activity off-screen) |
| Pay (Valentino home, default) | 2 | 0 | All 5 visible (Pay naturally at center) |
| Credit | 3 | −78 | Explore · Pay · Credit · Activity (Banking off-screen) |
| Activity | 4 | −156 (left) | Pay · Credit · Activity (Banking + Explore off-screen) |

Items beyond the viewport edge **clip naturally** via `overflow-x: clip` on the viewport. Container has `overflow-y: visible` so the active item never gets vertically clipped.

## Pay-active special (Valentino home)

- Pay-active is NOT a 64px white circle. It's a composed visual:
  - 72×72 outer ring (4px white stroke, no fill)
  - 56×56 white rounded-square (border-radius 28 → perfect circle) inside
  - 36×36 dark scanner glyph inside the white inner
- The Pay slot's standard 40px circle is hidden when active; the special overlay shows.

## Banking-inactive special

- Banking-inactive does NOT show the bank glyph. It renders the user's **balance pill** — `₹3K` text-only.
- Text color: slate-60 on white-gradient variant; **V-500** on V-500 brand-immersive variant.
- Font: Rubik Bold 13px.

## Two visual variants

### Standard (white-gradient)
- Pods: Banking · Explore · Credit · Activity active
- Container bg: `linear-gradient(to bottom, transparent 0%, white 34%)`
- Inactive circles: slate-10 bg, slate-60 glyph
- Labels: slate-60 (regular), slate-90 + medium weight under active
- Gesture-nav bar: `rgba(0,0,0,0.3)` 128×4

### Brand-immersive (V-500 / Valentino)
- Pod: Pay active (the Valentino home)
- Container bg: solid `#D30AD7` (full overlay; no gradient visible)
- Inactive circles: `rgba(255,255,255,0.3)` bg, `rgba(255,255,255,0.7)` glyph
- Pay-active: 72px white ring (see Pay special)
- Labels: HIDDEN entirely (immersive mode)
- Gesture-nav bar: `rgba(255,255,255,0.6)` 128×4

### Variant-switch behavior (anti-pattern → solved)
- **DO NOT crossfade between standard gradient + V-500 solid.** They produce a visible "white-fade flash" mid-transition. Caught in R23.
- **DO**: keep the standard gradient layer always at opacity 1 underneath. Layer the V-500 solid on top with opacity 0/1 swap. No transition on opacity (instant). Page bg also swaps instantly. Both change in the same React render → no perceptible glitch.

## Labels — onboarding only

- Labels appear under each item for the **first ~10 sessions** of a new slice user.
- After that, labels disappear (post-onboarding mode).
- In the proto, labels are an opt-in `showLabels` prop, defaulting to `false`.

## Interaction (R23 canonical)

Two ways to switch pods, both must work:

1. **Tap** any visible inactive item → it becomes active, row animates to bring it to center, page commits.
2. **Scroll/swipe** the nav horizontally → row translates as you drag. Whichever item is closest to center becomes the *visually-active* item (just visual, not yet committed). On release, the page commits to the centered pod.

Items off-screen are not tappable (realistic — you can't tap what you can't see). To reach an edge item, swipe the nav OR step through adjacent items.

## Motion spec

- **Row translate**: `spring(stiffness: 320, damping: 30, mass: 0.85)`
- **Per-item grow (40 → 64 circle)**: spring or 320ms `cubic-bezier(0.34, 1.4, 0.64, 1)` (subtle overshoot)
- **Glyph crossfade (inactive ↔ active layer)**: 220ms ease-out
- **Background variant swap**: instant (NO transition)

## Activity glyph rotation

The raw SVG for the Activity glyph is 3 vertical bars (bar chart). At render time, apply `transform: rotate(90deg)` so it reads as 3 horizontal bars (canonical "ledger lines" look in nav).

## Anti-patterns

- ❌ Reorder items based on which is active. They stay in natural order; the row translates.
- ❌ Lift the active item vertically (-y translateY). It grows IN PLACE.
- ❌ Use a default browser focus outline. Set `outline: none !important` on slots (keep `:focus-visible` accessibility hook for keyboard users via filter or subtle ring).
- ❌ Render the Pay-active overlay when Pay is inactive. The overlay's white inner bleeds through and shows a stray white shape. Conditionally render based on `isActive`.
- ❌ Crossfade between standard gradient and V-500 solid (gradient → solid CSS interpolation glitches). Two stacked layers, immersive overlay opacity swaps instantly.
- ❌ Reduce inactive items below 44×44 — they get cramped.
- ❌ Apply default browser focus ring to keypad-style keys without override.

## R23 calibrated rules (operational must-do, appended 2026-05-29)

Live spec source: `slice/projects/slice-app-proto/src/components/BottomNav.{jsx,css}`. Use this proto component verbatim; don't re-implement.

### Nav bg is TRANSPARENT (no chrome layer)
- The bottom nav has **no opaque bg layer**. Page bg cascades through. CSS: `.slice-bnav-bg { display: none }` — kept for backward compat only.
- WHY: in earlier rounds a white-gradient OR V-500 solid was painted behind the icons. This created visible "Valentino sticking" during page swipes (the V-500 nav bg failed to repaint instantly as you moved between pages). Removing the bg layer entirely fixes this — icons + circles now use translucent tints that work on ANY page bg (white AND V-500).

### Inactive glyphs — variant-aware
- **Standard variant (white pages):** inactive glyphs render `rgba(0,0,0,0.4)` ("slate-dark"), reading against the white bg.
- **Immersive variant (V-500 / Pay):** inactive glyphs render `rgba(255,255,255,0.7)` (white-alpha-70), reading against the Valentino purple.
- The single `<glyph>` is repainted via `currentColor` — the icon's `stroke` / `fill` references `currentColor`, the parent `.slice-bnav-circle` sets `color: var(--inactive-fg)` which is theme-token-driven.

### Inactive circle bg — variant-aware
- **Standard variant:** circle bg = `rgba(0,0,0,0.06)` — barely-there shade against white.
- **Immersive variant:** circle bg = `rgba(255,255,255,0.18)` — translucent white pill on V-500.

### Variant follows visuallyActive (real-time, not committed)
- `data-variant` on `.slice-bnav` is driven by `visuallyActive === 'pay'` (the in-drag visual state), NOT by `active` (the committed state).
- WHY: during a page swipe between Banking/Explore/Pay/Credit/Activity, the variant boundary must move WITH the page edge as it crosses the viewport center. User direction R23: "the whole of it should change at the moment the edge crosses center — clean cut through the screen."
- Equivalent: status bar text color, page bg, AND nav variant all flip in the same React render when visuallyActive flips. No mid-tween gray.

### ₹3K balance pill — variant-aware text color
- **Standard:** `color: rgba(0,0,0,0.55)` — slate-55 against white.
- **Immersive:** `color: #D30AD7` — V-500 on V-500-tinted circle bg (the brand reads through). NOT white, NOT slate.

### bg/color swap is INSTANT (no transition)
- The size morph (40 → 64) TWEENS via `transition: width/height 320ms cubic-bezier(0.34,1.4,0.64,1)` — keeps the grow smooth.
- The `background` and `color` properties have NO transition — they swap in a single render. WHY: a mid-tween color shows gray (between inactive-bg and white) which looks broken on a finger-down interaction. Snap to final color, tween only the shape.
- Glyph crossfade (inactive ↔ active layer) DOES transition: 220ms `cubic-bezier(0.25,0.1,0.25,1)`.

### Scroll-to-select (drag nav row, bidirectional midpoint)
- Pattern: `framer-motion drag="x"` on `.slice-bnav-row` with `dragConstraints={{ left: minX, right: maxX }}` (derived from `targetXFor('banking')` and `targetXFor('activity')`), `dragElastic: 0.08`, `dragMomentum: false`.
- During drag: `useMotionValueEvent(x, 'change', ...)` computes nearest slot to viewport center.
- **`lastEmittedRef`** tracks the last-emitted pod to enable BIDIRECTIONAL midpoint detection — going forward past midpoint AND coming BACK past it both re-fire `setVisuallyActive`. Without this ref, comparing against the committed `active` means returning past midpoint silently fails.
- On drag end: `onChange(visuallyActive)` commits. If no change, animate back to current target.

### Component contract (props)

```js
<BottomNav
  active={pod}                  // committed pod (drives circle scale + Pay 72px ring)
  visuallyActive={pod}          // in-drag visual pod (drives variant + bg + status bar)
  onChange={fn(pod)}            // commit handler
  onVisualChange={fn(pod)}      // real-time visual update
  balance="₹3K"                 // Banking-inactive pill text
  showLabels={false}            // labels under each slot (onboarding only)
/>
```

Both `visuallyActive` and `onVisualChange` are required when the parent owns a shared motion value (e.g. the page Pager).

Source: cal:2026-05-29 R23 — proto build at `slice/projects/slice-app-proto`. User directions captured: "the whole of it should change at the moment the edge crosses center"; "should be the Valentino color, not black; on other screens, white-ish"; "₹3K should be Valentino on the brand-immersive page".

---

## Dark-mode colours — CANONICAL (Figma `6591:60485`, get_variable_defs, 2026-05-30)

The hardest-won rule of the dark build: this **recurred ~10 rounds**. Valentino-light
and dark mode BOTH resolve to `data-slot-variant='immersive'` (dark theme sets every
page variant='dark'), so they MUST be split by `data-theme`. The medallion is light;
the glyph contrasts it. **Active and inactive differ by BOTH chip opacity AND glyph
colour — NOT "one glyph colour for both".**

| State | Chip (medallion) | Glyph |
|---|---|---|
| **Active (selected)** | `Component/Bottom nav/Selected` = **#FFFFFF @ 60%** (`rgba(255,255,255,0.60)`) | **#090B0C** (`Background/Primary`, punched out) — the active icon is dark, NOT white |
| **Deselected (inactive)** | `Component/Bottom nav/Primary nav bg` = **#FFFFFF @ 20%** (`rgba(255,255,255,0.20)`) | **#FFFFFF (white)** |

- The "page-bg punched out" logic (Valentino light) does **NOT** carry to inactive
  in dark — a #090B0C glyph on the dark-grey 20% medallion is invisible. **Inactive
  dark glyphs are white.**
- CSS: `[data-theme='dark'] .slice-bnav-slot .slice-bnav-circle` →
  `bg rgba(255,255,255,0.20); color #FFFFFF` (deselected);
  `[data-theme='dark'] …[data-state='active'] …` →
  `bg rgba(255,255,255,0.60); color #090B0C`.
- **Pay scan glyph (PayCenter)** = `currentColor` via `.slice-bnav-pay-inner` color:
  **V-500 in light, #090B0C in dark**. White ring/inner unchanged.

Glyph colour by context, all four resolved:
- **Light, white page (standard) inactive** = black-10% chip + slate-40% glyph.
- **Light, white page active** = white chip + dark-40% glyph.
- **Valentino (light) inactive** = #FFFFFF@20% chip + V-500 glyph (page-bg punched out).
- **Dark (either)** = the table above.

⚠️ Churn history: earlier drafts WRONGLY recorded "all dark glyphs #090B0C, active
chip solid #FFFFFF, deselected chip @30%" — that bad rule kept getting re-applied
and re-broke the screen. The canonical Figma values above (active chip @60% +
#090B0C glyph; inactive chip @20% + WHITE glyph) are the source of truth. Pull
`get_variable_defs` on `6591:60485` if ever in doubt; don't eyeball.

> Nav bg stays TRANSPARENT in every theme (the "Valentino sticking" fix) — see
> "Nav bg is TRANSPARENT" above. These colours ride on translucent chips over the
> page bg, so they work on white AND #090B0C without a nav chrome layer.

---

## Calibration history

- cal:2026-05-30 — **dark-mode colours canonical** (Figma `6591:60485` get_variable_defs). Active chip #FFFFFF@60% + #090B0C glyph; inactive chip #FFFFFF@20% + WHITE glyph; Pay scan glyph V-500 light / #090B0C dark. Corrected a bad earlier draft that kept getting re-applied (~10 rounds of churn). Folded in from the retired reference_dark_mode.md section 14.
- cal:2026-05-29 R23 — append-only R23 rules above. Transparent nav bg, variant-aware glyph/circle, ₹3K balance pill V-500 on immersive, instant bg swap with size-only tween, bidirectional midpoint via `lastEmittedRef`.
- cal:2026-05-28 R23 — full anatomy rewrite based on building the canonical React component (`slice-app-proto/src/components/BottomNav.jsx`). Replaced R22's sparse spec.
- cal:2026-05-28 — `nav_active_indicator_style` A pick + reason "pattern is more slice" (active = filled glyph in white circle).
- Earlier rounds: R11-R22 documented in `reference_calibration_log.md`.
