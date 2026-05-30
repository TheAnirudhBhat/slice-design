# Motion — slice durations, easings, choreographies

Motion in slice is **functional first, expressive second**. Every animation serves a moment (entry, exit, state change, attention-grab) and then stops — no ambient loops except shimmer.

When `design-motion-principles` or any other skill suggests something that conflicts with slice's hard rules (no bounce-on-tap, no infinite ambient motion, no scaling page on sheet present), slice-design wins. For everything else — easings, springs, durations, sequencing — slice's motion vocabulary is **open**. The named curves below are common starter values, not the only valid options. Custom cubic-beziers, springs, asymmetric timing, and emil-design-eng techniques are first-class. See the "Motion decision framework" section below.

## Motion decision framework (from emil-design-eng)

Before writing any animation, answer these 4 questions in order. They scope decisions faster than picking from a curve menu.

### 1. Should this animate at all?

| Frequency | Decision |
|---|---|
| 100+ times/day (keyboard shortcuts, primary-action taps in the dialer, switch flips) | No animation. Ever. |
| Tens of times/day (hover effects, list navigation, filter pill taps) | Remove or drastically reduce |
| Occasional (modals, drawers, toasts, payment confirmations) | Standard animation |
| Rare / first-time (onboarding, feedback, celebration moments, Spark reveal) | Can add delight |

Why: animations on high-frequency actions make the UI feel slow. The numpad in Payments L0 should not animate digit entry. The bottom sheet rising on tap should animate (occasional, gives orientation).

### 2. What is the purpose?

Every animation needs a clear answer to "why does this animate?"

Valid purposes:
- **Spatial consistency** — sheet enters and exits from the same direction (swipe-to-dismiss feels intuitive)
- **State indication** — campaign pill morphs from glyph → full pill to signal "something changed"
- **Explanation** — Round-ups how-it-works animation shows the rounding mechanic
- **Feedback** — button opacity dim on press confirms the tap was registered
- **Preventing jarring changes** — payment confirmation tick wouldn't just pop; it grows + brand-immersion intermediate

If the purpose is "it looks cool" and the user will see it often, don't animate.

### 3. What easing should it use?

Decision tree:
- Is the element **entering or exiting** the viewport? → `ease-out` family (starts fast, feels responsive)
- Is it **moving / morphing on screen** with both ends visible? → `ease-in-out` family
- Is it a **hover / color change**? → plain `ease`
- Is it **constant motion** (marquee, progress bar)? → `linear`
- Default → `ease-out`

**Never use `ease-in` for UI animations.** It starts slow, delays the initial movement (the exact moment the user is watching most closely), and makes the interface feel sluggish. `ease-in` at 300ms feels slower than `ease-out` at the same 300ms.

### 4. How fast should it be?

| Element | Duration |
|---|---|
| Button press feedback | 100-160ms |
| Tooltips, small popovers | 125-200ms |
| Dropdowns, selects, action pill morphs | 150-250ms |
| Modals, drawers, bottom sheets | 200-500ms |
| Marketing / explanatory | Can be longer |

UI animations should stay under 300ms by default. A 180ms drop feels more responsive than a 400ms one. A faster-spinning skeleton makes the app feel faster even when the actual load time is identical.

## Common slice easing curves

These are starter values that have worked well in slice. Use them when they fit; reach for custom cubic-beziers or springs when the brief warrants.

| Token | Curve | Use for |
|---|---|---|
| `out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default. Push/pop, sheet, value change, title push-up. |
| `out-fast` | `cubic-bezier(0.16, 1, 0.3, 1)` | Pressed state release, quick lift |
| `in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | State change with both ends visible (toggle) |
| `spring-soft` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bling twitch — overshoot. One-shot attention only. |

**Custom curves are valid** when:
- The named curves don't quite fit the moment's character (e.g. a new product launch like Atom that wants a slightly different motion identity)
- A specific component needs more punch than the standard `out` (use stronger ease-out per emil's `cubic-bezier(0.23, 1, 0.32, 1)` for UI interactions)
- An iOS-like drawer / sheet feel needs `cubic-bezier(0.32, 0.72, 0, 1)` (Ionic Framework's drawer curve)

Don't invent curves from scratch — pull from [easing.dev](https://easing.dev/) or [easings.co](https://easings.co/) for vetted strong variants. Document the curve choice in the screen recipe so it's reproducible.

## Spring animations (when to use)

Springs feel more natural than duration-based animations because they simulate physics. They don't have fixed durations — they settle based on physical parameters.

**Valid contexts for slice:**
- Drag interactions with momentum (bottom sheet drag-to-dismiss, repayment dialer drag-between-notches)
- Elements that should feel "alive" (small celebration moments — atom-orb intro, rewards reveal)
- Gestures that can be interrupted mid-animation (springs maintain velocity on interrupt; CSS animations restart from zero)
- Decorative mouse-tracking interactions in web protos

**Spring configuration** (Apple's approach — easier to reason about):

```js
{ type: "spring", duration: 0.5, bounce: 0.2 }
```

Or traditional physics for more control:
```js
{ type: "spring", mass: 1, stiffness: 100, damping: 10 }
```

Keep bounce subtle (0.1–0.3) when used. Avoid bounce in most UI contexts — reserve for drag-to-dismiss and playful interactions (rewards reveal). The Spark hero reveal is a one-shot spring-soft overshoot already; don't add a second bounce in the same flow.

## Asymmetric enter/exit timing

Pressing should be **deliberate** when the action requires intent (hold-to-confirm, hold-to-delete). Release should always be **snappy** (system responds fast).

```css
/* Release: fast */
.overlay { transition: clip-path 200ms ease-out; }

/* Press: slow and deliberate */
.button:active .overlay { transition: clip-path 2s linear; }
```

This pattern applies broadly: slow where the user is deciding, fast where the system is responding. Useful for the repayment-dialer drag (slow follow with damping) → snap-to-notch on release (fast settle).

## Stagger animations

When multiple elements enter together (list rows, action pills appearing post-BE-response, atom cards on the chooser), stagger their appearance by 30–80ms per item. Creates cascading reveal that feels natural.

```css
.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 50ms; }
.item:nth-child(3) { animation-delay: 100ms; }
```

Keep stagger delays short (30–80ms). Long delays make the interface feel slow. **Stagger > 80ms per item is an anti-pattern** (list feels broken).

## CSS transitions vs keyframes (interruptibility)

For rapidly-triggered UI (toasts, action pills, snackbars, drag interactions), use **CSS transitions** — they can be interrupted and retargeted mid-animation. Keyframes restart from zero.

```css
/* Interruptible — good for UI */
.toast { transition: transform 400ms ease; }

/* Not interruptible — avoid for dynamic UI */
@keyframes slideIn { from { transform: translateY(100%); } to { transform: translateY(0); } }
```

Use keyframes only for deterministic animations that won't be interrupted (skeleton shimmer, brand-mark animations).

## `@starting-style` for entry

Modern CSS pattern that replaces the `useEffect(() => setMounted(true), [])` + `data-mounted` dance:

```css
.toast {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 400ms ease, transform 400ms ease;

  @starting-style {
    opacity: 0;
    transform: translateY(100%);
  }
}
```

The browser uses the `@starting-style` values as the implicit starting point, then transitions to the declared values. Use when browser support allows; fall back to the `data-mounted` attribute pattern for older browsers.

## Blur to mask imperfect crossfades

When a crossfade between two states feels off despite trying different easings and durations, add subtle `filter: blur(2px)` during the transition. Why: without blur, the eye sees two distinct objects overlapping (the old state and the new). Blur blends them, tricking perception into seeing a single smooth transformation.

Useful for:
- Card content swap on filter change
- Action pill state morphs (default → highlighted)
- Amount value changes that don't fit the cleaner translateY pattern

Keep blur under 20px. Heavy blur is expensive (especially in Safari).

## Momentum-based dismissal (bottom sheets)

Don't require dragging past a threshold to dismiss. Calculate velocity = `Math.abs(dragDistance) / elapsedTime`. If velocity exceeds ~0.11, dismiss regardless of how far the user dragged. A quick flick should be enough.

```js
const timeTaken = new Date().getTime() - dragStartTime.current.getTime();
const velocity = Math.abs(swipeAmount) / timeTaken;

if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
  dismiss();
}
```

Why: matches how things move in the real world — momentum should carry the action through, not require deliberate dragging past a hidden line.

## Damping at boundaries

When a user drags past a natural boundary (e.g. drawer at top of scroll, dialer past the Full chip), apply damping. The more they drag past the boundary, the less the element moves. Things in real life slow down before stopping; an invisible wall feels broken.

## Pointer capture during drag

Once dragging starts, set the element to capture all pointer events. This ensures dragging continues even when the pointer leaves the element bounds (critical for the repayment dialer where the user might drag off the ring).

## Tooltip skip-delay on subsequent hovers

Tooltips delay before appearing to prevent accidental activation on initial hover. But once one tooltip is open, hovering adjacent tooltips should open them instantly (no delay + no animation). The toolbar feels faster without defeating the purpose of the initial delay.

```css
.tooltip { transition: transform 125ms ease-out, opacity 125ms ease-out; }
.tooltip[data-instant] { transition-duration: 0ms; }
```

## Performance — only animate transform and opacity

Only `transform` and `opacity` skip layout + paint and run on the GPU. Animating `padding`, `margin`, `height`, `width`, `top`, `left` triggers all three rendering steps and drops frames.

Replace:
- `height: 0 → auto` → `transform: scaleY(0) → scaleY(1)` with `transform-origin: top`
- `width animation` → `clip-path: inset(...)` (see exploration patterns)
- `top / left` → `transform: translate()`

## Never animate from scale(0)

Nothing in the real world disappears and reappears completely. `scale(0)` looks like the element materializes out of nowhere.

Start from `scale(0.95)` (or higher) combined with `opacity: 0`. Even a barely-visible initial scale makes the entrance feel more natural.

```css
/* Bad */
.entering { transform: scale(0); }

/* Good */
.entering { transform: scale(0.95); opacity: 0; }
```

---

## Named durations

| Token | ms | Use for |
|---|---|---|
| `instant` | 80 | Toggle dot moves, switch flips |
| `quick` | 160 | Press feedback (opacity dim), state colour swap, hover (web) |
| `base` | 240 | Sheet header morph, inline value change |
| `gentle` | 320 | Push/pop nav, screen-level transitions |
| `linger` | 520 | Title push-up cross-fade (see Spark choreography) |
| `bling` | 640 | Attention twitch on highlight icon (one-shot only) |
| `shimmer` | 1200 | Skeleton loading shimmer (linear infinite — the only allowed loop) |

## Named easings

| Token | curve | Use for |
|---|---|---|
| `out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default. Push/pop, sheet, value change, title push-up. |
| `out-fast` | `cubic-bezier(0.16, 1, 0.3, 1)` | Pressed state release, quick lift |
| `in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | State change with both ends visible (toggle) |
| `spring-soft` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bling twitch — overshoot. **Only** for one-shot attention. |

Do not invent custom curves. If a moment doesn't fit one of these four, ask before adding.

## Choreographies — reusable patterns

### Nav push / L1 open (screen → screen, slide in from right)
- Incoming screen: translateX 100% → 0, **400ms, iOS-natural `cubic-bezier(0.32, 0.72, 0, 1)`** (the iOS push/sheet decelerate curve)
- Outgoing screen: translateX 0 → -25%, opacity 1 → 0.7, same 400ms curve (parallax)
- Bottom nav: stays put, no transition
- **Pace it iOS-natural — ~400ms, NOT a snappy ~280ms.** A too-short push reads abrupt; the user calibrated this as "too fast" (cal:2026-05-30 cont-32). The proto's `L1Stack` slide uses exactly this; match it for any new push/slide-in. (The bottom-sheet present is a touch longer still, ~450ms.)

### Nav pop (back)
- Incoming screen: translateX -25% → 0, opacity 0.7 → 1, 320ms `out`
- Outgoing screen: translateX 0 → 100%, 320ms `out`

### Sheet present (bottom sheet, modal)
- Sheet: translateY 100% → 0, 280ms `out`
- Backdrop: opacity 0 → 0.3 (`overlay` token), 280ms `out`
- Page underneath: stays put (no scaling)

### Sheet dismiss
- Sheet: translateY 0 → 100%, 240ms `out-fast`
- Backdrop: opacity 0.3 → 0, 240ms `out-fast`

### Press feedback (tappable surface)
- Opacity 1 → 0.7 over 160ms `quick`, then back to 1 over 160ms `out-fast` on release
- **NEVER scale** the surface on press (no rubber-band). See anti-patterns.

### Value change (amount, counter)
- New value: translateY -100% → 0 + opacity 0 → 1, 240ms `out`
- Old value: translateY 0 → 100% + opacity 1 → 0, 240ms `out` (same time, mask edges)

### Skeleton shimmer
- Linear gradient (`#F6F9FC` → `#EAEBED` → `#F6F9FC`) translateX -100% → 100%
- 1200ms `linear` infinite
- Only allowed infinite loop in the app

### Spark hero reveal (anchor → reveal)

Validated 2026-05-17 in explore-base. Use when a card has a quiet anchor state that should resolve into a richer state (savings hook → live drops, balance hook → reward unlock).

- **t=0** — initial state visible (static icon + anchor copy)
- **t≈1.6s** — icon does a short bling twitch (scale + wiggle, 640ms `spring-soft`)
- **t≈1.8s** — title pushes from below into new copy (translateY 100%→0%, 520ms `out`, edges masked top/bottom 22%/78% for fade-on-cross)
- **t≈2.1s** — icon rotates 360° + scales to 0 + opacity fades; brand pills cascade in from the same anchor with right→left stagger

Do not apply for routine state changes or filter toggles — too much choreography for a casual interaction.

Source: mem:feedback_spark_reveal_choreography ✅

## What we do NOT animate

- Card hover (web protos): no lift, no shadow swap, no scale. Cards on slice are tap targets, not hover surfaces.
- Header titles: stay still. Movement is in the body content.
- Bottom nav: never animates between screens (anchored layer).
- Avatars: do not pulse / glow / breathe. If you must signal "live", use a small Valentino dot, not motion.
- Buttons: no shimmer through the label. No gradient sweep.

## What we never use (anti-motion)

| Pattern | Why not |
|---|---|
| Infinite parallax | Battery + attention cost; signals "playful" not "trustworthy" — wrong for fintech |
| Spinning logos / icons | Reads as "loading" even when not loading; confuses users |
| Bounce on tap | iOS-y / consumer-toy aesthetic; slice is calm fintech |
| Page-level scaling on sheet present | iOS-Maps look; doesn't fit a 360-width phone-first design |
| Stagger > 80ms per item in a list | List feels broken / slow |
| Auto-playing video in cards | Battery, data, accessibility — never |

## Cross-skill notes

- **design-motion-principles** is a great audit lens but platform-neutral.
- **emil-design-eng** is a first-class toolkit extension for slice motion. Its animation decision framework, spring techniques, clip-path patterns, blur crossfade, momentum dismissal, asymmetric timing, and `@starting-style` entry are all valid for slice. See `reference_exploration_patterns.md` for technique-by-technique scaffolding. Hard rules (no bounce-on-tap, no infinite ambient motion, no scaling page on sheet present) still win on conflict.
- **frontend-design** suggests "ambitious visual effects" — for slice, the ambition is restraint plus a few moments of delight (Spark reveal, payment success brand-immersion, atom-orb intro).

## R19 motion choreographies (calibrated 2026-05-28)

### campaign_pill_reveal (Payments L0)

9-step sequence — how the "Win up to ₹100" / marketing pill enters the Payments L0 screen post-BE response.

1. **Opening state (no BE response yet)**: numpad + ₹0 + scanner FAB, no Action Pills row visible
2. **Return state (post-BE response)**: UPI ID pill appears centred in the Action Pills row
3. **Transition state 1**: tiny inline ↻ refresh glyph appears centred under the amount (UPI pill briefly hidden) — `bling` (640ms `spring-soft`) + haptic
4. **Transition state 2**: "Win up to ₹100" pill begins to appear collapsed to the right of the glyph
5. **Transition state 3**: "Win up to ₹100" pill at full width, glyph leading inside the pill on left
6. **Transition state 4**: "Win up to ₹100" pill + UPI ID pill together (2 pills horizontal)
7. **Transition end state 2**: "Win up to ₹100" pill + UPI ID compressed (icon-only when char > 15)
8. **Transition end state 1**: both pills open (char ≤ 15)
9. **On tap of campaign pill**: page dims to scrim → bottom sheet rises with copy + "Got it" Primary CTA. Annotation: "Cashback / FYI rewards open bottom-sheet. Fire / monies redirect with page transition."
10. **Holding state**: post-animation steady state. Run-once gated — does NOT loop after first trigger.

**Motion choreography** (confidence MEDIUM — durations inferred from existing slice conventions, not extracted from file):
- Step 2 → 3 (return-state → small glyph): glyph fade-in + `bling` (640ms `spring-soft`); haptic on attention twitch
- Step 3 → 4 → 5 (glyph → pill collapse → pill full): pill grows horizontally from glyph anchor. `gentle` (320ms `out`) horizontal expand
- Step 5 → 6 (pill alone → pill + UPI ID): UPI-ID pill returns with opacity 0→1 + translateX (direction uncertain from frames)
- Step 8 → 9 (on tap): backdrop opacity 0→0.3, sheet `translateY 100%→0` over 280ms `out` (matches existing Sheet present choreography)
- Step 9 → 10: no animation; run-once gate (designer annotation: "after campaign pill animation has been triggered once")

**WHY run-once gate**: reinforces the no-infinite-loop rule. Attention-grab animation that loops becomes noise. Source: cal:2026-05-28 R19 — Payment OS `xIc12scqCFBSJ5Kgyd6Krh` frames `168:32546` (light) + `168:35440` (dark), 9 designer-labeled states ✅

### payment_status_transition (rewarded vs un-rewarded)

3-stage envelope for payment-completion transitions. See `reference_dls_screen_layouts.md` § "Payment OS — Transition envelope" for the rewarded/un-rewarded matrix.

**Motion specifics** (confidence LOW-MEDIUM — durations inferred):
- **Stage 1 (brand-immersion, rewarded only)**: pink full-bleed fades in. Duration uncertain (likely `linger` 520ms `out`).
- **Stage 2 (reveal, rewarded only)**: reward visual fades in over the pink. Stagger 80–120ms between reward-card elements (per slice stagger rule).
- **Stage 3 (resolve)**: white screen + green grainy gradient tick. Tick may have a one-shot `spring-soft` overshoot (typical for "tick" reveal moments). H2 `Paid ₹X` title slides up `translateY 100%→0` + opacity per slice's existing value-change rule.

WHY: TBD — capture at next calibrate. The 3-stage envelope is observable from the canonical canvas; per-frame durations and easings should be confirmed by sampling individual frame nodes in a follow-up sweep.

Source: cal:2026-05-28 R19 — Payment OS `xIc12scqCFBSJ5Kgyd6Krh` canvas `30:18423` (Txn status page) ✅ (envelope structure) / TBD (durations)

## R23 motion choreographies (calibrated 2026-05-29)

Sourced from the proto build at `slice/projects/slice-app-proto/`. All shared motion values flow through framer-motion + a single `pagerX` motion value owned by `App.jsx`.

### Clean-cut variant transition during swipe

When the user drags between Banking/Explore/Pay/Credit/Activity, the variant boundary (light page ↔ V-500 immersive page) moves WITH the page edge as it crosses the viewport center — no separate fade or chrome animation. The whole screen "cuts" at the boundary instant.

**What flips together in the same render:**
- Page bg (white ↔ V-500) — naturally tied to the page itself sliding into view.
- Status bar text color (dark ↔ white) — per-element, see below.
- Bottom nav variant (`data-variant="standard"` ↔ `data-variant="immersive"`) — driven by `visuallyActive`.

**Why "clean cut" works:** all three flip on the SAME React render (the moment `visuallyActive` updates because the nearest-to-center page changed). No mid-tween gray, no scrim crossfade. User direction R23: "the whole of it should change at the moment the edge crosses center — clean cut through the screen."

### Status bar text recolors PER-ELEMENT

The status bar is a fixed overlay at the top of the phone shell. Its text (`9:41`) and icons (signal/wifi/battery) STAY in place during page swipes — only their COLOR changes, computed independently for each element based on which page is currently under it.

**Implementation:**

```jsx
// Each element computes its own color via useTransform reading pagerX motion value.
const timeColor = useTransform(pagerX, (x) =>
  colorAtX(x, TIME_VIEWPORT_X /* ~72 */, pages, pageWidth)
);
const iconColor = useTransform(pagerX, (x) =>
  colorAtX(x, ICONS_VIEWPORT_X /* phoneWidth - 72 */, pages, pageWidth)
);

function colorAtX(currentX, viewportX, pages, pageWidth) {
  const idx = Math.round((viewportX - currentX) / pageWidth - 0.5);
  const clamped = Math.max(0, Math.min(pages.length - 1, idx));
  return pages[clamped].variant === 'dark' ? '#FFFFFF' : 'rgba(0,0,0,0.85)';
}
```

Each page meta carries a `variant: 'light' | 'dark'`. The time text (left) and icon cluster (right) check the page UNDER THEM and tint accordingly. When the Pay page is sliding in from the right and only its left edge has crossed the time-text-X position, the time has already gone WHITE while the icons (still over a white page on the right) stay DARK. Mid-swipe state.

### Bidirectional midpoint snap (lastEmittedRef pattern)

Used in both `Pager.jsx` and `BottomNav.jsx`. When the user drags past the midpoint, `onIndexChange` (Pager) / `setVisuallyActive` (BottomNav) fires. If the user then drags BACK past the midpoint, it must re-fire in the opposite direction — otherwise the visual state silently stays incorrect.

**Pattern:**

```js
const lastEmittedRef = useRef(activeIndex);

useMotionValueEvent(x, 'change', (currentX) => {
  if (!isDraggingRef.current) return;
  // ... compute bestIdx (nearest to center) ...
  if (bestIdx !== lastEmittedRef.current) {  // NOT compared to `activeIndex`
    lastEmittedRef.current = bestIdx;
    onIndexChange(bestIdx);
  }
});
```

The KEY: compare against the LAST EMITTED value, not against the committed `active`/`activeIndex`. Comparing against committed means a "drag forward past midpoint then drag back to original" would fire forward but never fire back (because the new value equals committed). The ref tracks emission lineage independent of commits.

Reset `lastEmittedRef.current = activeIndex` on `onDragStart`, and again when external `activeIndex` changes via `useEffect`.

### Bottom gradient fade on scrollable white pages

On scrollable white-page L0s (Banking, Explore, Credit, Activity), the bottom of the scrollable area carries a vertical gradient fade — content visually dissolves into white as it nears the floating bottom nav. Prevents the abrupt "content sliced by an invisible line" feel.

**Implementation:** a fixed `pointer-events: none` div anchored above the bottom nav, with `background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, #FFFFFF 100%)` and a height ≈ 64-96px.

**NOT present on the V-500 brand-immersive Pay page.** WHY: brand-immersive surfaces have no fade — the V-500 fill cascades behind the nav directly (which is itself transparent). A V-500-to-V-500 fade would do nothing visible AND would mute the brand. The fade is a chrome-on-white affordance only.

### Page reserve for status bar overlay

Each page renders inside a column that starts with a 54px transparent "reserve" — `<div style={{ height: 54, flexShrink: 0 }} />` — so the visible page content starts BELOW the status bar overlay. The reserve is part of the page (slides with it during swipes), not part of the phone shell.

The 54px matches the global `MotionStatusBar` overlay height (also 54). If you change one, change the other.

Source: cal:2026-05-29 R23 — proto build at `slice/projects/slice-app-proto/`. Components: `App.jsx`, `Pager.jsx`, `BottomNav.jsx`, `StatusBar.jsx`. All motion shares a single `pagerX = useMotionValue(...)` owned by App.jsx and threaded into Pager (drives drag), StatusBar (drives per-element color), and indirectly BottomNav (via visuallyActive state).
