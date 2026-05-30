---
name: slice-app-proto patterns (R23)
description: Cross-cutting infrastructure patterns from the slice-app-proto build — phone shell, fit-scale, status bar overlay, page pager, scroll-to-select nav, page-reserve, image-drag protection. Use when scaffolding a new full-app proto or replicating these primitives in another surface.
type: reference
---

# slice-app-proto — proto-level patterns (R23)

Canonical source: `slice/projects/slice-app-proto/`. This doc captures the cross-cutting infrastructure patterns shared by every page in the proto. For per-pod recipes see `reference_pod_<pod>.md`.

These patterns supersede the per-pod "phone shell" / "scroll" notes that appeared in earlier rounds. Treat the proto code as the live spec; this doc captures the WHY + the contracts.

---

## PhoneFrame — iPhone 16 Pro Max logical

**Logical dimensions** (in `App.jsx`):

```js
const PHONE_OUTER_WIDTH  = 440;
const PHONE_OUTER_HEIGHT = 952;
const PHONE_WIDTH        = 425;  // visible screen width
const PHONE_HEIGHT       = 925;  // visible screen height
```

**Anatomy** (outer → inner):

1. **Outer chassis** (440 × 952) — relative wrapper, the bounding box for the device.
2. **Metallic bezel gradient layer** — absolute inset 0, `border-radius: 62`, `background: linear-gradient(135deg, #2A2D31 0%, #16181B 45%, #1F2125 100%)`, `padding: 6px`. The 6px padding becomes the visible bezel.
3. **Inner black ring** — `border-radius: 56`, `background: #000`, `padding: 4px`. The 4px becomes the inner mask.
4. **Screen** — 425 × 925, `border-radius: 52`, `overflow: hidden`, `position: relative`, `background: white`. This is where all pages render.
5. **Dynamic island** — separate fixed overlay at top center. NOT inside the screen div; rendered at PhoneFrame level so it sits as hardware chrome.
6. **Side hardware buttons** — 4 absolute-positioned `<div>` slivers (3px wide), styled with `linear-gradient(90deg, #0A0B0D 0%, #2A2D31 50%, #0A0B0D 100%)`:
   - Left silent switch: `top: 130, height: 32`
   - Left volume up: `top: 175, height: 56`
   - Left volume down: `top: 245, height: 56`
   - Right power: `top: 175, height: 96`
   Each: `[side]: -2` (sliver protrudes 2px from the chassis edge).

**Status bar is NOT in PhoneFrame.** It's a sibling overlay rendered INSIDE the 425×925 screen div, positioned `absolute top: 0`. See Status bar overlay.

---

## useFitScale hook — auto-fit phone to viewport

The phone is logical 440 × 952. The hook scales it down (max scale 1; never upscale) to fit the actual browser viewport while preserving aspect ratio AND centering.

**Implementation** (co-located in `App.jsx`):

```js
function useFitScale(targetWidth, targetHeight, padding = 24) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => {
      const w = Math.max(0, window.innerWidth - padding * 2);
      const h = Math.max(0, window.innerHeight - padding * 2);
      const s = Math.min(1, w / targetWidth, h / targetHeight);
      setScale(s > 0 ? s : 1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [targetWidth, targetHeight, padding]);
  return scale;
}
```

**Centering pattern (R23 fix-it — position:fixed + translate)**:

```jsx
const scaledW = PHONE_OUTER_WIDTH * fitScale;
const scaledH = PHONE_OUTER_HEIGHT * fitScale;

<div style={{
  position: 'fixed',  // pin to viewport — bypasses any html/body margin/flex weirdness
  inset: 0,
  background: '#000',
  overflow: 'hidden',
}}>
  {/* Anchor a SCALED-size box exactly at viewport center */}
  <div style={{
    position: 'absolute',
    top: '50%', left: '50%',
    width: scaledW, height: scaledH,
    transform: 'translate(-50%, -50%)',
  }}>
    {/* Inner scales the un-scaled chassis from top-left into the box above */}
    <div style={{
      transform: `scale(${fitScale})`,
      transformOrigin: 'top left',
      width: PHONE_OUTER_WIDTH,
      height: PHONE_OUTER_HEIGHT,
    }}>
      <PhoneFrame>{children}</PhoneFrame>
    </div>
  </div>
</div>
```

**WHY this 3-layer pattern (R23 fix-it):**
- Earlier rounds used flex `align-items:center; justify-content:center` on a `100vw × 100vh` root, which sometimes drifted off-center depending on `html/body` margins, sandbox padding, or browser-specific flex quirks.
- `position:fixed; inset:0` pins to the actual viewport, regardless of document flow.
- Anchoring a SCALED-size box via `top:50% left:50% translate(-50%,-50%)` is the canonical CSS "always centered" trick and survives every viewport size.
- The inner `scale()` with `transform-origin: top left` fills the scaled box cleanly — no overflow ambiguity.

**Anti-pattern (do NOT use)**: a single transformed div with `transform-origin: center` for centering. The element's LAYOUT box stays at un-scaled size; flex containers center the layout box, not the visual box, and you can end up with the visual chassis offset and clipped asymmetrically.

---

## Status bar — fixed overlay (not per-page)

The status bar renders ONCE at the phone-shell level, inside the 425-wide screen div, as a fixed overlay. Pages slide UNDER it during swipes — the bar itself stays put.

**Component:** `src/components/StatusBar.jsx` (default export = `MotionStatusBar`, named export = `DynamicIsland`).

**Props:**
- `pagerX` — shared framer-motion motion value (the page pager's x translation). Each status-bar element reads this to compute its own color.
- `pages` — array of `{ pod, variant: 'light' | 'dark' }`.
- `pageWidth` — typically 425.
- `time` — display string (default `'9:41'`).

**Per-element color recolor:** `9:41` text reads the page under the LEFT side of the status bar; the signal/wifi/battery cluster reads the page under the RIGHT side. See `reference_motion.md` "Status bar text recolors PER-ELEMENT" for the math.

**Height: 54px.** Pages reserve this at the top via a 54px transparent placeholder (see Page reserve).

**Dynamic Island** is a SEPARATE component (`<DynamicIsland />`) rendered as hardware chrome at top center — `position: absolute, top: 11, left: 50%, transform: translateX(-50%), width: 126, height: 37, background: #000, borderRadius: 19, zIndex: 70`.

---

## Pager — framer-motion page swipe

**Component:** `src/components/Pager.jsx`. All pages laid out in a horizontal flex row of width `pageCount × pageWidth`. The row drags horizontally via framer-motion. Shared motion value (`externalX`) optional — pass through from App.jsx so other components can read drag position (StatusBar).

**Contract:**

```jsx
<Pager
  activeIndex={idx}            // committed page index
  pageCount={5}
  pageWidth={425}
  externalX={pagerX}           // optional shared motion value
  onIndexChange={(idx) => ...} // REAL-TIME during drag (and on commit)
  onCommit={(idx) => ...}      // post-release with snapped index
>
  {pages}
</Pager>
```

**Real-time `onIndexChange`:** fires whenever the nearest-to-center page changes mid-drag. The parent uses this to update the bottom nav's `visuallyActive` AND any cross-cutting visual state (status bar variant cascade is automatic since the motion value drives it directly).

**Bidirectional midpoint sensing:** uses `lastEmittedRef` (NOT `activeIndex`) for the comparison. See `reference_motion.md` "Bidirectional midpoint snap (lastEmittedRef pattern)".

**Commit on release (`onDragEnd`):** snaps to the nearest page, fires `onCommit(idx)`, animates `x` to the snapped target via spring `{ stiffness: 320, damping: 32, mass: 0.85 }`.

**Drag bounds:** `dragConstraints={{ left: -(pageCount-1)*pageWidth, right: 0 }}`, `dragElastic: 0.08`, `dragMomentum: false`.

**External `activeIndex` changes** (e.g. via nav tap when NOT dragging) animate `x` to the new target via the same spring.

---

## BottomNav scroll-to-select with shared visuallyActive state

The BottomNav and the Pager share the `visuallyActive` state owned by App.jsx. Either can drive the visual update.

**App.jsx ownership:**

```jsx
const [active, setActive] = useState('pay');
const [visuallyActive, setVisuallyActive] = useState('pay');
const pagerX = useMotionValue(-PODS.indexOf('pay') * PHONE_WIDTH);

// Page-pager drives both
const handlePageIndexChange = (idx) => {
  const newPod = PODS[idx];
  if (newPod !== visuallyActive) setVisuallyActive(newPod);
};
const handlePageCommit = (idx) => {
  const newPod = PODS[idx];
  setActive(newPod);
  setVisuallyActive(newPod);
};

// Nav-drag drives both
const handleNavChange = (pod) => { setActive(pod); setVisuallyActive(pod); };
const handleNavVisualChange = (pod) => { setVisuallyActive(pod); };
```

**BottomNav contract:** receives both `active` and `visuallyActive` plus their setters. When BottomNav is being dragged, its `useEffect` for external `visuallyActive` skips re-animating x (the drag itself is driving x). When the user releases nav drag and commits, `onChange(visuallyActive)` lifts up to parent which then propagates to Pager via `activeIndex` (which animates to the new target).

Two-way binding works because both components share the same React state at the parent. Neither has its own internal source of truth for `visuallyActive`.

---

## Page-reserve for status bar (54px)

Each page inside the Pager renders inside a flex column that starts with a 54px transparent placeholder:

```jsx
<div style={{
  width: '100%', height: '100%',
  background: PAGE_BG[pod],
  display: 'flex', flexDirection: 'column',
}}>
  <div style={{ height: 54, flexShrink: 0 }} /> {/* status bar reserve */}
  <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
    {pageContent}
  </div>
</div>
```

**WHY part of the page (not the shell):** the reserve slides WITH the page during swipes. The PAGE BG fills under the status bar during the swipe — so the bg color visible under the status bar tracks the page that's currently dominant at that x.

**54px matches** `MotionStatusBar` overlay height. Don't drift.

---

## Image-drag protection (global CSS)

Without this, clicking an `<img>` and dragging triggers the browser's drag-to-save behavior — defeats the framer-motion drag handler under it.

**In `index.css`:**

```css
img, svg {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  user-drag: none;
}
img {
  pointer-events: none; /* clicks/drags pass through to parent buttons/divs */
}
```

`pointer-events: none` on `img` means clicks land on the parent `<button>` or `<div>` (which is the intended tap target). If you need an `<img>` to be directly tappable, wrap it in a button instead of clicking it directly.

---

## Scrollbar hiding (global)

Slice native app never shows scrollbars. Global rule in `index.css`:

```css
* {
  scrollbar-width: none;       /* Firefox */
  -ms-overflow-style: none;    /* IE/Edge */
}
*::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}
```

---

## Page bg + status variant map (App.jsx)

**R23 fix-it-2 (RETRACTION, 2026-05-29):** the earlier fix-it pass introduced slate-10 (#F6F9FC) page bgs for card-stacked pods. **User overruled — slice has zero gray surfaces.** All non-immersive pods are pure WHITE. Below is the corrected canonical map:

```js
const PAGE_BG = {
  banking: '#FFFFFF',
  explore: '#FFFFFF',
  pay:     '#D30AD7',  // V-500 brand-immersive
  credit:  '#FFFFFF',
  activity:'#FFFFFF',
};

const STATUS_VARIANT = {
  banking: 'light',    // dark text on light
  explore: 'light',
  pay:     'dark',     // white text on V-500
  credit:  'light',
  activity:'light',
};
```

**L0 component contract:** the per-pod L0 component's outermost div SHOULD use `background: 'transparent'` (lets the App.jsx wrapper bg show through cleanly), but hardcoding `'#FFFFFF'` is functionally equivalent now that the wrapper bg matches. Don't mix slate / off-white tints on L0s — slice is white.

**On card drop-shadows being subtle:** the canonical `0px 2px 32px rgba(0,0,0,0.05)` shadow on white IS what gives cards the floating effect. If a screenshot looks flat, that's a fidelity issue with the screenshot rendering at low resolution / compression — not a design problem. Do not "fix" by graying the page.

---

## Component tree summary

```
App.jsx
└─ PhoneFrame (440×952 chassis, hardware chrome)
   └─ screen div (425×925, overflow hidden, the visible phone screen)
      ├─ Pager (absolute inset 0, z=10)
      │  └─ <horizontal row of 5 pages>
      │     └─ each page: [54px reserve] [pod L0 content]
      ├─ MotionStatusBar (absolute top 0, z=55, pointer-events none)
      ├─ DynamicIsland (absolute top center, z=70)
      └─ BottomNav (absolute bottom 0, z=100, transparent bg)
```

z-index ladder: Pager < StatusBar < DynamicIsland < BottomNav. Nothing else uses z above 100 except modal overlays (Profile V3 sits at z=200 when shown).

---

## When to use these patterns

Use this entire scaffold when building a **full-app proto** (multi-pod, swipe-between-pages, shared chrome). For a single-screen proto or web exploration, use the lighter shell pattern in `reference_dls_phone_shell.md` (380×800 outer, single-page).

Don't replicate piecemeal. The patterns above interlock:
- `useFitScale` requires the 2-div centering scaffold.
- Per-element status-bar color requires the shared `pagerX` motion value.
- Bidirectional midpoint requires `lastEmittedRef` in BOTH Pager and BottomNav.
- Clean-cut variant transition requires `visuallyActive` shared between Pager + BottomNav.
- Transparent bottom nav requires page bg to fill under it (via PAGE_BG map).

Source: cal:2026-05-29 R23 — proto built from scratch at `slice/projects/slice-app-proto/`. 117+ tasks completed. Canonical L0 reference frame: `885:19528` in `PNUz3Dr9KSlFJSnsXsC0nL`.

---

## R23 fix-it pass (2026-05-29) — new patterns + anti-patterns

The first R23 build had several pieces that "looked right" but failed user review. Captured below as cross-cutting rules.

### Pattern: BottomFade overlay (REQUIRED on every white scrolling pod)

Every L0 that scrolls content behind the floating bottom nav needs a transparent→page-bg gradient at the bottom so content fades cleanly instead of butting against the dock. This is a CANONICAL chrome element, not optional polish.

**Component** (`src/components/BottomFade.jsx`):

```jsx
export default function BottomFade({ color = '#FFFFFF', height = 140 }) {
  const transparent = colorWithAlpha(color, 0);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        height,
        background: `linear-gradient(to bottom, ${transparent} 0%, ${color} 60%)`,
        pointerEvents: 'none',
        zIndex: 5,
      }}
      aria-hidden="true"
    />
  );
}
function colorWithAlpha(hex, alpha) { /* parses #RRGGBB → rgba() */ }
```

**Where it goes**: SIBLING of the scroll container, INSIDE a `position:relative` page wrapper. NEVER inside the scroll container.

```jsx
return (
  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
    <div ref={scrollRef} style={{ width: '100%', height: '100%', overflowY: 'auto', ... }}>
      <AppBar ... />
      {/* page content scrolls here */}
    </div>
    <BottomFade color={pageBg} height={140} />
  </div>
);
```

**Apply to:** Banking, Explore, Credit (slate-10 bg), Activity (white bg). NOT Pay (V-500 immersive, no fade — content slides into nothing).

**ANTI-PATTERN (R23 fix-it):** placing the fade INSIDE the scroll container with `position:sticky; bottom:0; marginTop:-120; order:999` on a non-flex parent. `order` is a no-op outside flex; `position:sticky bottom:0` sticks only when the element scrolls into the bottom-of-viewport boundary. The gradient ended up appearing mid-list. See `reference_anti_patterns.md` "Sticky-fade-in-non-flex hack".

### Pattern: L0 page-wrapper (relative container + scroll child + absolute overlays)

The canonical L0 component shape, captured as a reusable scaffold:

```jsx
function PodL0() {
  const scrollRef = useRef(null);
  const scrolled = usePageScroll(scrollRef);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div
        ref={scrollRef}
        style={{
          width: '100%', height: '100%',
          background: 'transparent',  // let App.jsx page bg show
          overflowY: 'auto', overflowX: 'hidden',
          display: 'flex', flexDirection: 'column',
        }}
      >
        <AppBar scroll={scrolled} variant="l0" title={...} avatar={...} />
        {/* scrolling content */}
      </div>
      <BottomFade color={pageBg} height={140} />
    </div>
  );
}
```

**Three rules every L0 must follow:**
1. Outermost `position:relative; overflow:hidden` — provides positioning context for the BottomFade and clips any overflow.
2. Scroll container `background:'transparent'` — NEVER hardcode a page bg; the App.jsx wrapper owns it.
3. BottomFade as the LAST sibling — paints over the bottom of the scroll area, hiding content as it nears the dock.

### Pattern: Status bar element coloring uses CENTER-POINT sampling

(R23 fix-it-2 retraction of fix-it pass.)

Each status element's color is decided by **which page is under its center x-coordinate**, NOT by any overlap heuristic. Dark text/icons over white page; light text/icons over V-500 Valentino page. The hard cut happens exactly when the page boundary crosses the element's center.

**Algorithm** (in `StatusBar.jsx`):

```js
function variantUnderCenter(currentX, centerX, pages, pageWidth) {
  for (let i = 0; i < pages.length; i++) {
    const pageStart = i * pageWidth + currentX;
    const pageEnd = pageStart + pageWidth;
    if (centerX >= pageStart && centerX < pageEnd) return pages[i].variant;
  }
  return centerX < 0 ? pages[0].variant : pages[pages.length - 1].variant;
}
function colorForCenter(currentX, centerX, pages, pageWidth) {
  return variantUnderCenter(...) === 'dark' ? LIGHT : DARK;
}
```

For each element, define its `centerX` (e.g. time at `60`, icons cluster at `425 - 60 = 365` of the 425-wide screen). Look up which page's viewport span contains that x. Return that page's variant.

**Why not span-overlap (retracted):** the earlier "any overlap with dark → LIGHT" algorithm flipped the white-side icons to white the moment Valentino started entering, leaving them invisible against the still-visible white half. The correct behavior: icons on the white side stay dark; icons on the Valentino side become white; the flip happens at the boundary.

**ANTI-PATTERN:** span-overlap with "ANY dark overlap → LIGHT". Causes white-side icons to vanish prematurely during drag. See `reference_anti_patterns.md` "R23 fix-it-2 retractions".

### Anti-pattern: approximating a Figma asset with inline SVG (RETRACTED & inverted)

The first fix-it pass advised "if a Figma asset extraction looks broken, inline an SVG approximation". **User overruled** — Figma is the source of truth, never approximate.

**Corrected rule:** if an extracted Figma asset doesn't render (empty PNG, transparent, suspiciously small), the fix is **NOT** to inline an SVG. The fix is to **re-fetch with a different method**:

1. Try `get_screenshot` on the specific node (e.g. `886:24912` for the monies brand mark on Banking L0) — this produces a clean rendered PNG of just that node at the requested resolution.
2. The screenshot URL is in the response; `curl` it to `public/assets/<name>.png`.
3. Verify the resulting file with `file <path>` — should report a valid PNG with non-trivial dimensions (e.g. `21 x 37, 8-bit/color RGBA`).

This worked for the monies mark on the second pass: `get_screenshot` of node `886:24912` returned a 736-byte 21×37 RGBA PNG (canonical asset). The first-pass `get_design_context` asset URL had returned a smaller and apparently empty file.

**Rule:** brand marks, icons, and illustrations ALWAYS come from Figma. Inline SVG fallbacks are for proto scaffolding only (the line icons that AppBar uses internally before A5 line-icon extraction landed). For any glyph that has a canonical Figma representation, fetch it.

### Note (R23 fix-it-2 retraction): hardcoded white L0 bg is now fine

The earlier fix-it pass treated "hardcoded `background: '#FFFFFF'` on L0" as an anti-pattern (because the wrapper bg was slate-10). Now that App.jsx PAGE_BG is pure white everywhere, the L0 outer div being either `'transparent'` or `'#FFFFFF'` is equivalent. Prefer `'transparent'` for cleanliness (one bg owner) but either is acceptable.

### Anti-pattern: search-bar/action-bar removed from L0 during refactor

Activity L0 was shipped without its search row visible (the `<SearchBarRow />` was rendered but a `position:sticky; bottom:0; order:999` overlay above it was intercepting layout). User couldn't see search OR filter pill. **Rule:** when refactoring a page, screenshot the proto before and after and visually confirm every canonical chrome element is present. See "L0 page-wrapper" pattern for the safe structure.
