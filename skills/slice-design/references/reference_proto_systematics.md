---
name: slice-proto systematics — meta-rules distilled from 7 rounds of fix-its
description: Up-front guidance for any slice proto build. Captures every recurring failure mode from the R23 build of slice-app-proto so that future protos can ship-ready in one round, not seven. If you're about to start a new proto or scaffold a new L0, READ THIS FIRST.
type: reference
---

# slice-proto systematics — distilled from R23

The R23 build of `slice-app-proto` went through **7 fix-it rounds** (A1–A6 canonical reconciliation + FX1–FX46 polish). Each round surfaced craft problems that the existing skill didn't catch. This file captures every recurring root cause + the PERMANENT RULE that prevents it.

**How to use this file**: read it once at the start of any new proto build, then run through the upfront checklist before writing code. The point: never go through these rounds again.

---

## Root cause #1: assumed canonical values from imagination instead of the Figma style dump

**Symptom**: type tokens drift (H4 vs H3 vs H2), bill avatar sizes wrong (40 vs 54), card padding off-by-4. Each surfaces visually 2-3 rounds in.

**Why it kept happening**: I'd carry over a `T` tokens object from a prior recipe / from `explore-base` without verifying values match the current canonical frame.

**PERMANENT RULE**:
> Before writing ANY L0 component, call `get_design_context` on the canonical Figma node and extract the `These styles are contained in the design` block VERBATIM into a typed tokens object. The block lists every text style (H2/H3/H4/Caption/etc) with exact `size / weight / lineHeight / letterSpacing`. Match values exactly. Token names like `T.h3` are meaningless if the value doesn't match canonical.

**Pre-build step**: paste the style dump into the file as a comment. Reference it while writing components.

---

## Root cause #2: approximated Figma assets with inline SVG instead of re-fetching

**Symptom**: monies brand mark invisible (PNG was empty); BHIM UPI logo "wrong" (inline SVG was crude); eye icons "not from slice" (inline SVG didn't match DLS).

**Why it kept happening**: when `get_design_context`'s asset URL returned a broken/empty PNG, I'd fall back to inline SVG. But inline SVG approximations of canonical DLS assets are NOTICEABLY OFF — the user can tell.

**PERMANENT RULE**:
> Every glyph, icon, illustration, and brand mark COMES FROM FIGMA. If `get_design_context`'s asset URL returns a broken/empty file (size < 2KB for a non-trivial glyph), the fix is **NOT** to inline SVG — it's to **re-fetch via `get_screenshot`** on the specific node ID. That returns a clean rendered PNG at any requested resolution. NEVER approximate canonical assets with hand-drawn SVG.

**Pattern that works**:
```bash
# First attempt (often works):
curl -sSL "<asset URL from get_design_context>" -o public/assets/icon.png
file public/assets/icon.png   # verify size + dimensions

# If broken, re-fetch via screenshot:
# (call get_screenshot on the node ID, get a fresh URL)
curl -sSL "<screenshot URL>" -o public/assets/icon.png
```

---

## Root cause #3: tried to find ONE rule for chrome elements that span multiple pages

**Symptom**: status bar color flipping wrong during drag; bottom nav icons invisible during drag; per-pod variant rules kept failing under mid-drag half-and-half state.

**Why it kept happening**: chrome elements that span the full viewport width (status bar, bottom nav) cover MULTIPLE PAGES during a horizontal swipe. A single "global" variant value can never satisfy all elements simultaneously when the underlying page is half-and-half.

**PERMANENT RULE**:
> Any chrome element that spans multiple pages during drag computes its variant **PER-ELEMENT** from the page that's under THAT specific element's center x-coordinate. Use `useMotionValueEvent` on `pagerX` (and `navX` if the nav itself drags) to compute each element's viewport x and look up which page is under it. Write the result to a `data-variant` or `data-slot-variant` attribute on the element's DOM ref. CSS keys off the attribute.

**Concrete applications**:
- `MotionStatusBar` — time element (center x≈60) and icons cluster (center x≈365) each compute their own variant via `colorForCenter(currentX, centerX, pages, pageWidth)`.
- `BottomNav` Slot — each of 5 slots computes its own variant via `getLayout(...)` + `navX.get()` + `pagerX.get()`.

**Anti-rule**: do NOT use `visuallyActive === 'pay'` (or any single global variable) to determine a multi-element chrome's variant. That always fails in transit.

---

## Root cause #4: "responsive" vs "don't scale" oscillation on the phone shell

**Symptom**: 7+ rounds touched phone centering — different scaffolds each time.

**Why it kept happening**: I'd pick ONE constraint at a time (responsive OR centered, scaled OR native) instead of seeing the through-line.

**PERMANENT RULE**:
> Phone shell is **always centered AND always responsive**. Combine both:
> - `useFitScale(targetW, targetH, padding=8)` returns the scale factor needed to fit
> - Outer wrapper: `position: fixed; inset: 0; display: flex; justify-content: center; align-items: center; overflow: hidden`
> - Middle wrapper: sized to scaled dimensions (`width: targetW * scale, height: targetH * scale`)
> - Inner: un-scaled chassis with `transform: scale(fitScale); transform-origin: top left; position: absolute; top: 0; left: 0`
>
> Belt-and-suspenders: explicit flex (`justify-content` + `align-items`), not just `place-items: center`. Some browsers / agentation overlays interfere with grid centering; flex centering is more reliable.

`useFitScale` listens to BOTH window.resize AND ResizeObserver(document.documentElement), debounced via requestAnimationFrame, initial state read inline from window dims to avoid flash-of-unscaled.

---

## Root cause #5: docks/menus with different active/inactive item sizes used uniform SLOT_WIDTH

**Symptom**: bottom nav spacing felt asymmetric — gaps between two deselected tabs > gap between active and its neighbors. Math: with SLOT_WIDTH=81, active=64, inactive=44, edge-to-edge for inactive-inactive = 37, for active-inactive = 27. Always asymmetric with uniform slots.

**Why it kept happening**: I modeled the nav as an Apple Dock with uniform slots. The Apple Dock works because all items are SAME SIZE; only lift/scale-via-magnification differ. slice DLS has size-grow as part of active (44 → 64), incompatible with uniform slots.

**PERMANENT RULE**:
> Docks/menus with items of different sizes use `display: flex; gap: <value>`. NEVER uniform SLOT_WIDTH grid with different item sizes. The `gap` IS the constant edge-to-edge distance — symmetric by definition. Items are their natural sizes (44 inactive, 64 active, 72 pay-special).
>
> Layout helper: write a `getLayout(visualActive, committedActive)` function that returns `{ items: [{pod, left, width, center}], totalWidth }`. All positioning math (target row x, per-slot variant detection, drag bounds) derives from this single function.

For slice: GAP = 24px (canonical Banking dock gap). 5 items × (44 inactive) + 4 × 24 gap = 220 + 96 = 316 wide when all inactive. With one active (64): 64 + 4×44 + 4×24 = 64 + 176 + 96 = 336 wide.

---

## Root cause #6: slate-10 vs pure white surface confusion

**Symptom**: shipped slate-10 page bg in one round because "card shadows weren't visible on white". User overruled — slice has zero gray surfaces.

**Why it kept happening**: at scaled-down browser viewports, canonical 0.05-alpha card shadows are nearly invisible. I "fixed" by graying the page bg. Wrong.

**PERMANENT RULE**:
> slice has ZERO gray surfaces. All non-immersive page bgs are pure white `#FFFFFF`. Period. If shadows seem invisible at proto scale, the fix is to bump the SHADOW spec, NOT the page bg. Canonical 0.05/32px → proto-calibrated `0px 4px 24px 0px rgba(0,0,0,0.08)`. The 8% alpha + tighter blur reads at proto scale while staying brand-aligned.

**Anti-rule**: do NOT use slate-10 / #FAFAFA / off-white "to make shadows pop". Any drift from pure white is off-brand.

---

## Root cause #7: card-stacked pods need a bottom fade; flat-list pods need a different chrome

**Symptom**: Activity L0 missing search bar (refactor obscured it); bottom fade gradient placed inside scroll container with `order: 999` on non-flex parent → invisible.

**PERMANENT RULES**:
1. Every white-page L0 with cards above the floating dock uses a `<BottomFade color={pageBg} height={140} />` component as a SIBLING of the scroll container, inside a `position: relative` page wrapper.
2. The bottom fade is `position: absolute; left: 0; right: 0; bottom: 0; height: 140; pointer-events: none; zIndex: 5`. NEVER inside the scroll. NEVER `position: sticky` with negative margin.
3. Per-pod chrome (Activity = search bar below app bar; Banking = nothing; Explore = nothing; Credit = nothing) must be present and visible after every refactor. Walk the canonical chrome list element-by-element post-build.

---

## Root cause #8: AppBar bg hardcoded white instead of per-pod

**Symptom**: Activity's app bar looked wrong when transparent (because the sticky search bar below interrupted the transparency cascade); Banking/Explore looked wrong when solid white (hard horizontal cut at the top).

**PERMANENT RULE**:
> Shared AppBar component takes a `background` prop (default `'transparent'`). Each pod passes what canonical requires:
> - Banking/Explore/Credit → `'transparent'` (default)
> - Activity → `'#FFFFFF'` (solid white because of the sticky search row below)
> - Pay/Valentino → has its own inline app bar with the immersive variant (white-alpha pills on V-500)

---

## Root cause #9: payment-state badges as full avatar replacements

**Symptom**: failed txns rendered as solid red circles with white X; pending as amber-ring-only avatars. Jarring; doesn't match canonical DLS.

**PERMANENT RULE**:
> Payment state badges (failed/pending) are 16×16 CORNER OVERLAYS on the regular avatar (photo/monogram/icon) with a 2px page-bg ring to make them pop. NEVER replace the entire avatar with the state badge. The state is signaled twice — corner badge + subtitle in status color (red for failed, amber for pending).

---

## Root cause #10: bento layout column heights didn't match

**Symptom**: Explore second row INVITE card (148h) paired with stacked CREDIT SCORE + AUTOPAY (70+16+70 = 156) → columns mismatched, cards "overextending".

**PERMANENT RULE**:
> In a bento grid where one cell is a single tall card paired with a stacked column of N short cards + (N-1) gaps:
>
> `short_height = (tall_height - (N-1) × gap) / N`
>
> For slice Explore: `short = (148 - 16) / 2 = 66`. Don't drift from this. If the tall card height changes, the short height MUST be recomputed.

---

## Root cause #11: Valentino avatar had ring but standard avatar shouldn't

**Symptom**: I removed the avatar ring globally, then user clarified canonical Valentino DOES have a ring. Reverted Valentino-only.

**PERMANENT RULE**:
> Avatar ring rules per variant:
> - Standard pods (Banking, Explore, Credit, Activity) → photo avatar is pure 40×40 with `border-radius: 9999`, NO border, NO outer container ring.
> - Immersive pods (Pay/Valentino) → 40×40 photo with 1px `rgba(255,255,255,0.30)` ring (per canonical Figma).

---

## Root cause #12: keypad gutters not respecting page padding

**Symptom**: keypad rows centered with fixed 72px column gap → didn't align with Request|Transfer buttons below.

**PERMANENT RULE**:
> Payment screens with a keypad above an action-buttons row: keypad rows use `padding: 0 32px` (canonical page gutter 24 + 8px breathing room) and `justify-content: space-between`. The 3-key row spans the same horizontal extent as the 2-button row below.

---

## Root cause #13: card drop-shadow invisible at proto scale

**Symptom**: canonical `0px 2px 32px rgba(0,0,0,0.05)` invisible at scaled-down browser viewports.

**PERMANENT RULE**:
> Use proto-calibrated card shadow: `0px 4px 24px 0px rgba(0,0,0,0.08)`. 8% alpha + 24px blur. Subtle but visible. Apply uniformly across Banking/Explore/Credit. The canonical 0.05/32 is for native iOS scale; proto needs the bump.

---

## Root cause #14: list-style pods shipped with too few entries

**Symptom**: Activity initially shipped with 10 transactions; user said "add more".

**PERMANENT RULE**:
> List-style L0s (Activity, transaction history, etc.) ship with 15-25 entries by default. Cover all states (sent, received, failed, pending) and a realistic spread of dates. The user shouldn't have to ask for "more populated".

---

## Root cause #15: agentation kept being forgotten / under-verified

**Symptom**: agentation install missing initially; later user couldn't see the toolbar.

**PERMANENT RULE**:
> Every slice proto's setup includes:
> 1. `npm install agentation@^3.0.2` (in `dependencies`, not devDeps).
> 2. `src/main.jsx` imports `{ Agentation }` from 'agentation' and renders it as a sibling of `<App />` with `onAnnotationAdd` + `onSubmit` callbacks (default to console.log).
> 3. Verify the toolbar appears bottom-right in dev. If covered by app's full-viewport stage, check z-index — agentation popup uses 100001.

---

## Root cause #16: meta — user oscillation between two constraints

**Symptom**: phone "don't scale" vs "be responsive"; nav variant "stay grey" vs "match canonical aesthetic"; surface "more shadow contrast" vs "no gray".

**PERMANENT RULE**:
> When the user oscillates between two constraints, the through-line is usually a third one they care about MORE. Resolve by combining both ORIGINAL constraints rather than picking one. Examples:
> - Phone: combine `useFitScale` (responsive) + grid/flex center (always centered) — third constraint was "always centered".
> - Nav: per-slot variant (matches canonical Valentino aesthetic AND stays legible on white half during drag) — third constraint was "always legible".
> - Surface: pure white + bumped shadow alpha (canonical bg + shadows readable at proto scale) — third constraint was "stay on-brand".
>
> When in doubt, ask "what does the user care about that they keep coming back to?". Usually it's the through-line. Solve for that.

---

## Pre-build checklist (run before writing ANY L0 component)

1. ☐ `get_design_context` on the canonical Figma node. Save the response.
2. ☐ Extract the `These styles are contained in the design` block VERBATIM into a `T` tokens object at the top of the file.
3. ☐ List every visible chrome element from the canonical screenshot (app bar layout, search/filter rows, cards, list rows, bottom fade, illustrations). This is the post-build verification list.
4. ☐ Identify any assets needed (icons, glyphs, illustrations). Map each to a Figma node ID. Plan the fetch.
5. ☐ Determine the page bg from `PAGE_BG[pod]` in App.jsx — outermost L0 div uses `background: 'transparent'`.
6. ☐ Determine if the pod needs `<BottomFade />`. All white-page card-stacked pods do; flat-list pods do too (Activity); only the V-500 immersive Pay pod doesn't.
7. ☐ Determine if the pod needs a solid AppBar bg (Activity does; others use default transparent).
8. ☐ If the pod uses a dock/menu with different-sized active/inactive items → flex+gap layout, NEVER uniform slot grid.
9. ☐ If the pod is a list with multiple states → at least 15-25 entries, all states covered.

## Post-build verification (run before claiming done)

1. ☐ Visual check against the canonical Figma screenshot. Walk the chrome list from pre-build step 3 and confirm each element is visible and positioned correctly.
2. ☐ Drag from this pod to every neighbor pod (left + right). Verify the status bar + nav variants flip correctly mid-drag. No invisible elements.
3. ☐ Resize the browser. Verify the phone shell remains centered AND fits.
4. ☐ Open agentation toolbar (bottom-right). Verify it renders and accepts clicks.
5. ☐ For every PNG asset referenced in the L0: `file <path>` shows a valid PNG with non-trivial dimensions (not 0×0 or 1.6KB transparent).

If any check fails → fix before claiming done, AND surface why the skill didn't catch it earlier (add a new line to this file).

---

## Component contracts (always pass-through)

### App.jsx → BottomNav
```jsx
<BottomNav
  active={active}                  // committed
  visuallyActive={visuallyActive}  // mid-drag
  onChange={handleNavChange}        // commit
  onVisualChange={handleNavVisualChange}  // mid-drag
  balance="₹3K"
  pagerX={pagerX}                  // shared motion value for per-slot variant
  pages={PAGES_META}               // [{pod, variant}, ...]
/>
```

### App.jsx → MotionStatusBar
```jsx
<MotionStatusBar
  pagerX={pagerX}
  pages={PAGES_META}
  pageWidth={PHONE_WIDTH}
/>
```

### App.jsx → Pager
```jsx
<Pager
  activeIndex={activeIndex}
  pageCount={PODS.length}
  pageWidth={PHONE_WIDTH}
  externalX={pagerX}                // shared with status bar + nav
  onIndexChange={...}               // mid-drag (real-time visuallyActive updates)
  onCommit={...}                    // post-release commits
>
```

### Per-pod L0 wrapper
```jsx
<div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
  <div ref={scrollRef} style={{
    width: '100%', height: '100%',
    background: 'transparent',
    overflowY: 'auto', overflowX: 'hidden',
    display: 'flex', flexDirection: 'column',
  }}>
    <AppBar
      scroll={scrolled}
      variant="l0"
      title={...}
      background={isActivityLikePod ? '#FFFFFF' : 'transparent'}
      actions={[...]}
      avatar={<img src="..." />}
    />
    {/* per-pod content */}
  </div>
  <BottomFade color={pageBg} height={140} />
</div>
```

---

Source: distilled 2026-05-29 from R23 calibration log + 7 fix-it rounds on `slice-app-proto`. Author: Claude (this conversation). For the round-by-round audit trail see `reference_calibration_log.md` § R23 fix-it-2 cont 1–8.
