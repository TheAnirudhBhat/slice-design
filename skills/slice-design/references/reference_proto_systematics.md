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

Source: distilled 2026-05-29 from R23 calibration log + 7 fix-it rounds on `slice-app-proto`. Author: Claude (this conversation). For the round-by-round audit trail see `reference_calibration_log.md` R23 fix-it-2 cont 1–8.

---

## RULE (R24 cont-25): explorations never touch the skill proto

The skill proto (`~/.claude/skills/slice-design/proto/`) and its assets are the
**canonical reference app**, not a scratchpad. Do NOT create exploration screens,
test flows, one-off concept mocks, or their assets inside it — unless the user
**explicitly** asks to update the skill proto.

- New screen / flow / concept exploration → its own project under
  `~/claude/slice/projects/<name>/` (or wherever the user points). Self-contained.
- Reuse the design system by COPYING from `references/proto-snapshot/code/` +
  `proto-snapshot/assets/` into the exploration project (that snapshot exists
  exactly for "grab a component into another project"). Don't re-fetch Figma or
  re-hand-build StatusBar / AppBar / Avatar / phone shell / tokens — they're cached.
- The ONLY things that land in the skill proto are deliberate updates to the
  canonical app, made on explicit request.

Why: R24 cont-25 — built an insurance pitch exploration and leaked its assets
(`pdp_hero_3d.png`, `pdp_lock/tick/arrow.svg`) into the skill proto. User:
"no exploration should be created in the original proto unless explicitly asked
to update the skill proto." Assets removed; rule recorded.

---

## RULE (R24 cont-29): agentation on by default — every proto, including explorations

Every slice proto — the skill proto AND every standalone exploration — ships
with agentation wired by default. It's the click-to-annotate feedback layer;
without it the user can't point at elements and the iteration loop breaks.

Implication for HOW to scaffold a standalone/exploration proto:
- **Scaffold as a Vite app, copied from `references/proto-snapshot/`** (which
  already has `agentation@^3.0.2` in package.json + `<Agentation />` rendered as
  a sibling of `<App />` in `main.jsx`). Then drop the new screens in.
- **Do NOT default to a single-file CDN `index.html`.** Agentation ships only
  ESM/CJS (no UMD/global) and must share the app's React instance — a single-
  file CDN proto can't host it without fragile import-map/two-React hacks.
  Single-file CDN is only acceptable for a throwaway with the user's explicit OK
  that it won't have agentation.

Standard standalone-proto scaffold:
```
cp -R references/proto-snapshot/code  ~/claude/slice/projects/<name>/src-ish
# keep package.json (has agentation, vite, react), main.jsx (<App/> + <Agentation/>)
# replace pods/screens with the new work; npm install; npm run dev
```

Verify after scaffold: `package.json` lists `agentation`, `main.jsx` renders
`<Agentation />` as a sibling of `<App />`, and the toolbar shows bottom-right
in the browser.

Why: R24 cont-29 — built the insurance-flow exploration as a single-file CDN
proto for speed; it had no agentation, so the user couldn't annotate it. User:
"every proto should have agentation enabled on it by default."

---

## NEW SCREEN / FLOW PRE-FLIGHT CHECKLIST (R24 cont-30)

This is the single consolidated gate for building any NEW feature screen or
flow (in an exploration project OR as a skill-proto update). It bundles every
per-detail rule that, scattered, got missed one-at-a-time across R24 cont-25→29
and produced "kinda mid" first drafts. Run it as a TodoWrite list. Don't show
the user until every box is genuinely checked — that's the self-audit (SKILL.md
non-negotiable #2).

**Before writing code:**
- [ ] **Scaffold BORN KIT-LINKED — one command.** Run `proto/scripts/new-proto.sh
      <name>` (NOT a hand copy). It clones the canonical app (project-owned:
      `App.jsx main.jsx pods/ public/assets/` + configs + `agentation@^3.0.2` +
      `<Agentation/>`) and SYMLINKS the design-system layer (`components/ icons/
      utils/ tokens.js index.css`) to the skill proto, with vite `server.fs.allow`
      set — so a skill fix propagates to every project automatically (cont-32). Add
      your feature pod under `src/pods/`; NEVER edit the linked kit locally and
      NEVER fork it by copying (that reintroduces drift). For an EXISTING project,
      `link-kit.sh link <project>`. See `reference_web_proto.md` "Shared kit".
- [ ] **Agentation present.** `package.json` lists `agentation`; `main.jsx`
      renders `<Agentation/>` as a sibling of `<App/>`. (cont-29)
- [ ] **Fonts will load AND inherit.** Rubik 400/500/600 linked in `index.html`;
      `index.css` has `button, input, select, textarea { font-family: inherit; }`
      — native `<button>`/`<input>` do NOT inherit font-family, so without this
      every CTA + field silently falls back to the UA font. (cont-27)
- [ ] **Images come FROM Figma, never redrawn.** Any illustration / hero / icon
      / success-state graphic is EXPORTED from the canonical Figma node and
      dropped in `public/assets/`. Never approximate with hand-SVG or a halo
      placeholder. The transaction success tick is the poster child — use the
      real `dls_success_tick.svg` (DLS node 884:16442), don't draw a ring.
      (cont-28)

**While building (copy these exact specs, don't invent):**
- [ ] **Primary button = canonical.** `width:100%; padding:12px 24px;
      border-radius:100px; background:#D30AD7; color:#fff; Rubik 16/24 Medium;
      letter-spacing:0.32px`. The 12/24 padding yields the canonical 48px height
      — do NOT set an explicit `height:52` (that was the recurring button bug).
- [ ] **CTA labels are Capital-first.** "Confirm", "Proceed", "Done", "Add
      money" — NOT "confirm"/"continue". This is the ONE exception to the
      lowercase-slice voice: brand + body copy stay lowercase, CTAs capitalize
      the first letter. Prefer "Proceed"/"Confirm" over "Continue". (cont-27)
- [ ] **No double-header.** A titled app bar already names the screen. Do NOT
      add a second left-aligned heading right under it, and do NOT repeat the
      same idea twice (title "choose your cover" + helper "how much cover do you
      want?" = redundant). slice voice = the top app bar copy carries it, clean
      and straightforward. Avoid stacking left-aligned text directly beneath the
      app bar. (cont-26)
- [ ] **A label + value pair is a LIST ITEM.** "You pay … ₹X" type rows are a
      DLS list item (leading label, trailing value, center-aligned), not two
      free-floating `<div>`s you align by hand. Reach for the list-item
      component from the snapshot. (cont-26)

**Layout & composition gates (R24 cont-31 — each one was a separate correction this round):**
- [ ] **DATA IS NOT IN A BOX.** Transaction / payment / summary / confirmation
      detail is FLUSH rows separated by hairlines — never wrapped in a card or
      outline box. Two row shapes: (a) a single total = label-left tertiary /
      value-right primary on a top hairline (anchors it so it doesn't "hang"
      above the CTA); (b) a multi-field block = stacked rows, label-on-top
      (Caption 12/16 tertiary) / value-below (Body 16/24 primary), left-aligned,
      hairline between each, NO surrounding box. Canonical: Payment OS 26 node
      6910:49952. "data inside a box is a really rare pattern." A box is for an
      INTERACTIVE choice (a tappable plan/option card), not for read-only data.
- [ ] **Icons come from the DLS, never hand-drawn.** Back chevron = filled DLS
      Chevron-left (node 582:580), NOT a 2px stroke `<path>`. Close = the SAME
      `profile_close.svg` the Profile app bar uses, NOT a hand-drawn X. If you're
      about to write `<path d="M…"/>` for a glyph, STOP and pull the real asset
      (cache → Figma export). Hand-drawn glyphs read thin/wrong every time and
      the user has flagged this 3×.
- [ ] **PDP type matches product class.** A CORE bank product (insurance,
      savings, deposits, cards) uses **Core PDP** (centered, gradient
      Valentino→Blue H2, 256px illustration, tertiary subtitle, FAB bottom-right
      — node 2061:86696). A sub-product / feature (Atom, Spark) uses **Feature
      PDP** (left-aligned feature list — node 2063:87946). Pick deliberately;
      don't default to the feature layout for a core product.
- [ ] **Copy caps: lowercase is for NAMES only.** Headings, questions, CTAs are
      sentence-case (capital first letter). Lowercase is reserved for brand +
      product names (slice, spark, monies, slice super card). Drop the "slice"
      prefix on in-app GENERIC features — it's already in the slice app, so
      "Health cover" not "slice health cover". Keep the mark only on named
      sub-products ("slice atom", "slice super card").
- [ ] **No grey, ever. The slice card = white + the canonical drop shadow.** Page
      bg = pure white (#FFFFFF) on every non-immersive surface. The default slice
      card — content AND selection/chooser cards alike — is white + `0px 2px 32px
      0px rgba(0,0,0,0.05)` (the Explore L0 "white-on-white floating" aesthetic).
      A SELECTION card adds a 2px V-500 border when active (reserve `2px solid
      transparent` when inactive so there's no layout shift) + a filled radio, and
      KEEPS the shadow. Do NOT make selection cards outline-only / shadow-less —
      that was a cont-31 over-correction the user reversed: "the white-on-white
      drop-shadow aesthetic is not coming out, [it] is the aesthetic on the explore
      cards." The ONLY shadow ban is the heavier `0.08/24px` — that one reads as a
      grey wash. Right shadow, not no shadow.
- [ ] **Never LEAD a data/detail block with a divider.** Hairlines go BETWEEN
      rows only. Separate a flush detail block from the hero/content above it with
      WHITESPACE, not a top rule. "we don't start this component with a divider
      ever." (A footer total above a CTA is the one exception — its single top
      hairline is a region separator between scroll content and the fixed footer,
      not a leading divider on a list.)
- [ ] **Optically center top-heavy blocks PROACTIVELY.** A success / empty /
      confirmation block (big tick/illustration → headline → detail) is top-heavy,
      so a geometric center reads LOW / bottom-biased. Either anchor it near the
      TOP (canonical for status screens: hero in the upper portion, detail rows
      below, CTA pinned bottom) or, if truly centered, lift the mass-center up
      (~tens of px). Apply without being told — the user has flagged "not
      optically centered" repeatedly. See `reference_craft_principles.md`.

**Before showing the user (the self-audit — SKILL.md #2):**
- [ ] `npm run build` is clean (0 errors).
- [ ] Screenshot your own output and diff it against the canonical Figma frame
      (or the snapshot spec) side-by-side. Fix every diff you can see.
- [ ] If the browser is unavailable, SAY SO and do a careful manual spec diff
      instead — never silently ship the unaudited first build.

Why this exists: R24 cont-25→31 shipped an insurance flow that took ~15 separate
correction rounds. Root cause was never one big miss — it was a long tail of small
ones (button height, lowercase CTA, double header, font not inheriting, hand-drawn
tick + chevron + cross, boxed data, grey-wash shadow, bottom-biased success block),
each individually corrected by the user. EVERY single one was either already solved
in the cache (compose-from-cache would've prevented it), specified in a reference
file, or visible in a 10-second self-screenshot (self-audit would've caught it).
The deepest meta-root-cause: I shipped first drafts WITHOUT running this checklist,
then treated each round of feedback as a one-off fix instead of a checklist gate.
The fix is discipline, not more rules — run the whole list before showing, every
time. This is the durable gate so the next new-screen build ships right the first
time.

---

## RULE (R24 cont-31): when a reported visual bug contradicts the code, suspect a STALE SERVER / CACHE

When the user reports a visual problem (wrong font, grey background, old layout)
and your code + computed styles say it's already correct, DO NOT keep "fixing"
code that is already right. The likely cause is a stale artifact, not a stale
rule. Checklist:
- **Stale dev server.** A long-running `vite`/`http.server` may be serving an old
  bundle, or you edited a different copy than the one being served. Kill it and
  start a FRESH server on a NEW port.
- **Browser cache.** The user's tab may be holding old JS/CSS/fonts. A new port =
  a fresh cache key; also hard-reload (the proto's own reload won't always bust
  font caches).
- **Verify with computed style, not vibes.** Read the live value
  (`getComputedStyle(el).fontFamily` / `.background`) on the running page before
  concluding. If the DOM says `Rubik` / `#FFFFFF` and the user still sees wrong,
  it's 100% a cache/server-staleness problem — say so and reserve a fresh port.
- **Two "still wrong" reports in a row on the same property = stop editing code.**
  That pattern is the tell. The second report means the first fix WAS right and
  never reached the user's tab.

Why: R24 cont-27→28 — "the fonts are still wrong" fired twice after the font fix
was already correct in code. The real cause was stale dev servers + a cached tab;
the resolution was killing servers and serving fresh on a new port, not another
font edit. Wasted two rounds editing already-correct code. Same shape recurred on
"the cover page is not white" (DOM computed pure white; the culprit was a heavy
shadow reading as grey — a real fix — but the FIRST instinct should still be to
rule out staleness before re-editing).

---

## RULE (R24 cont-31): tap-vs-drag guard for ANY tappable element on the pager

Every tappable element that lives INSIDE the swipe Pager (L0 cards, list rows,
entry cards) MUST guard against a drag firing a tap. When the user drags to swipe
pages but releases before the snap midpoint, the synthetic click at release opens
an L1 under their finger.

Use the shared hook `proto/src/utils/useTapGuard.js`:
```jsx
import useTapGuard from '../../utils/useTapGuard.js';
const tap = useTapGuard(() => push('insurance'));
<button {...tap}> … </button>   // NOT onClick={…}
```
It tracks pointer-move distance between pointerdown and click and cancels the
click if the pointer moved ≥ 10px (keyboard + programmatic clicks still work).
Activity TxnRow has the original inline version; NEW cards/rows use the hook.
Why: R24 cont-31 — the insurance entry card opened the flow on a page-swipe drag,
the exact bug already fixed on Activity. Codified as a hook so it isn't re-derived
per card.

---

## PLANNED (R24 cont-31): multi-device mockup support

Designers want to preview a proto across multiple device frames to catch scaling
issues (e.g. the 393-screen-overflows-chassis bug) before they ship. Today the
proto renders ONE shell (iPhone 16 Pro: 393×852 screen / 405×864 chassis).

Planned capability — a device picker that swaps the shell + screen dims while
keeping the SAME app content, so the designer sees how the layout reflows:
- **iPhone**: SE (375×667), 14/15/16 (393×852), 16 Pro Max (440×956)
- **Android (top)**: Pixel 8 (412×915), Galaxy S24 (360×780), S24 Ultra (384×824)
Approach: parametrize the shell — `PHONE_WIDTH/HEIGHT` per device + chassis derived
as screen + 2×bezel (per the cont-31 bezel fix); pager `pageWidth` + StatusBar
element centers read from the active device. Render ONE shell at a time (a
dropdown switches device), NOT a wall of phones. Precondition: pods must be
width-fluid (`width:100%`, NO hardcoded 393) for reflow to be real.
Status: deferred per user ("for now keep only 1 phone shell"); build when the
multi-device review workflow is prioritized.

---

# Operational rules (moved from SKILL.md, 2026-05-30 slim)

The root causes above explain WHY each rule exists; this section is the
operational WHAT — the workspace layout, the inherit model, the two process
non-negotiables, and the pre-ship craft checklist. SKILL.md now points here
instead of inlining all of it.

## Projects INHERIT the skill proto; the skill proto is upstream + READ-ONLY during project work (R24 cont-35/36)

The skill proto (`~/.claude/skills/slice-design/proto/`) is the **single upstream source of truth — the "main".** Every project is a thin wrapper that **inherits the whole proto by default and builds on top of it**, staying live-linked so skill-proto improvements flow down automatically (see `reference_web_proto.md` "Shared kit + extension seam"). Non-negotiables:

1. **Default = inherit everything, build on top.** A new project (`proto/scripts/new-proto.sh`) is born as `App.jsx` (thin wrapper) + `AppBase.jsx` (symlink → skill `App.jsx`) + linked kit + its feature pod(s). Shell, theme, status bar, nav, all base pods, Explore — all inherited live. The project adds its feature via the seam (`extraL1` / `exploreExtraCards` / `initialPod`), never by forking.
2. **NEVER edit the skill proto to satisfy a project.** While building/exploring a project, the skill proto is **read-only**. A project-specific change goes in the PROJECT. To diverge a shared component, **UNLINK just that component into the project** — `link-kit.sh materialize <project> src/<path>` (e.g. `src/components` or `src/AppBase.jsx`) — copies the skill's current file in so the project owns its copy. The skill proto is untouched; every other project keeps inheriting the original.
3. **The skill proto changes ONLY via deliberate skill maintenance** — a universal DLS truth (canonical token, fixed chrome bug, motion-pacing rule) promoted on purpose, with a `reference_calibration_log.md` entry. SEPARATE from building a project, never an incidental side-effect. When in doubt whether a change is universal or project-specific: assume project-specific (edit the project), promote to the skill proto only when it's clearly a slice-wide rule the user has confirmed.

Why: a project's copied files silently drift from the evolving skill app → the "legacy view" (cont-35). Inherit-by-default + unlink-only-to-explore keeps every project current and the design system consistent, while protecting the upstream from project churn.

## Two non-negotiables before you write any proto code

Skipping these produces "kinda mid" output that then takes 20 correction rounds to fix (root cause of R24 cont-25→29). Do these every time:

1. **Compose from cache — don't rebuild chrome.** The proto + `references/proto-snapshot/` are a read-through cache of the canonical app. For ANY new screen/flow, COPY the StatusBar / AppBar / Avatar / phone shell / tokens / Primary button from `proto-snapshot/code/` and `proto-snapshot/assets/`. Don't re-hand-build them from memory — that's how you reintroduce already-fixed bugs (cropped wifi, wrong chevron, 52px button, lowercase CTA). If you catch yourself typing `<svg>` for a glyph or `borderRadius` for a button that already exists in the snapshot, STOP and copy.
2. **Self-audit before you show.** The loop is: fetch canonical → build → **screenshot your own output → compare against canonical side-by-side → fix the diffs → THEN show the user.** The most expensive failures are all things a 10-second self-screenshot catches (font not inheriting, double header, off button height). Never hand the user the first build as if it's done. If the browser is genuinely unavailable, say so and fall back to `npm run build` + a careful manual diff against the snapshot spec — don't silently skip the audit.

When you skip these, you outsource QA to the user one screenshot at a time — the "death by a thousand corrections" anti-pattern. The new-screen pre-flight checklist (cont-30, above) operationalizes both.

## LIVE proto + snapshot — workspace, run, refresh

The slice-app-proto LIVES INSIDE the skill:

```
~/.claude/skills/slice-design/
  ├── proto/                    ← LIVE working proto (R23 cont-23)
  │   ├── src/                    (App, components, icons, pods)
  │   ├── public/assets/          (canonical PNGs + SVGs from Figma)
  │   ├── package.json, vite.config.js, etc.
  │   └── ARCHITECTURE.md
  └── references/
      └── proto-snapshot/       ← FROZEN snapshot at R23 cont-22
          ├── code/, assets/, manifests/, INDEX.md, README.md
```

**Run the live proto:**
```bash
cd ~/.claude/skills/slice-design/proto
npm install --cache "$TMPDIR/npm-cache-slice-app-proto"   # first time
npm run dev                                                # default vite port
```
Boots to the working R23 state: all 5 pods (Banking, Explore, Pay/Valentino, Credit, Activity), full bottom nav + status bar + page pager, agentation wired (toolbar bottom-right).

**When to use which:**
- **Editing / iterating** → work in `proto/` (live source; changes are immediate).
- **Recreating one component elsewhere** → check `references/proto-snapshot/INDEX.md` first (curated catalog with Figma node IDs + calibration-history per item); copy from `proto-snapshot/code/` for the R23 cont-22 known-good baseline.
- **Researching WHY a line is the way it is** → this file (meta-rules) + `reference_calibration_log.md` (round-by-round audit).

**Refresh cadence:** snapshot is frozen at R23 cont-22 (2026-05-29). Re-snapshot the live proto into `references/proto-snapshot/` when: a major round lands and the user calls the proto "in a decent state"; a new pod / cross-cutting component is added; the asset library grows by 10+ items. Re-snapshot script: re-run the file-copy commands in `meta/INTEGRATION_PLAN.md`.

## Asset reuse — copy first; generate a flagged placeholder only when truly missing

- **Before generating any icon/image/illustration**, check `/Users/anirudhbhat/claude/slice/projects/explore-base/public/assets/` (87 canonical assets: spark / fire / monies / invite-magnet / bill tiles / brand logos / category icons / 3D illustrations / rewards cards). Copy directly (`cp explore-base/public/assets/<file> <proto>/public/assets/`). Never inline-SVG-generate a glyph if a real one exists locally.
- **ICONS — official ONLY; missing → DUMMY placeholder. NEVER hand-draw / trace / generate an icon.** Official library = Figma DLS 2.0 Copy node `582:257`; most are already in the proto `public/assets/` + `public/assets/icons/`. Theme a monochrome official icon by inlining its EXACT Figma path + `fill:currentColor` (same geometry = still official). (HARD rule — see SKILL.md "Absolute bans".)
- **ILLUSTRATIONS genuinely missing everywhere** → auto-generate a high-fidelity, slice-accurate, FLAGGED placeholder per `reference_slice_asset_generation.md` (Gemini/Nano-Banana). Flag (`gen_` prefix + `GENERATED_ASSETS.md` entry) mandatory; project-owned, never the linked kit. Generation is for illustrations, NOT icons.
- Canonical L0 pages reference: file `PNUz3Dr9KSlFJSnsXsC0nL` node `885:19528` (Banking, Explore, Credit, Activity, Profile L0s in one frame).

## Internal nomenclature

- **"Valentino home"** = the Payments L0 brand-immersive screen (#D30AD7 V-500 page with the custom keypad dialer). Internally, the payment screen is the canonical *home* — not Banking. "Valentino home" and "Payments L0" are interchangeable; the former is preferred because it captures both surface identity (V-500) and role (home).
- **Pay is HOME.** When wiring routing defaults / first-launch flows: Pay is the initial active state, not Banking.

## Cross-cutting craft checklist (run BEFORE marking any L0 done)

Per-component recipes alone don't catch cross-cutting failures. Every L0 build / refactor MUST pass this before claiming done:

1. **Page bg from App.jsx** — outermost L0 div is `background:'transparent'`. `App.jsx PAGE_BG` sets pure WHITE for every non-immersive pod, V-500 for Pay. (Anti-pattern: gray / slate-10 / off-white page bg — slice has zero gray surfaces.)
2. **L0 wrapper structure** — `<div style={{position:'relative', overflow:'hidden'}}>` → scroll container → BottomFade sibling. Three layers. (Anti-pattern: BottomFade inside scroll container, `order:999` on non-flex parent.)
3. **BottomFade present on white pages** — Banking / Explore / Credit / Activity all have `<BottomFade color="#FFFFFF" />` (or the pod's bg). Pay does NOT.
4. **Type tokens from canonical Figma response** — copy the `These styles are contained in the design` block verbatim BEFORE writing components. A token name "h4" is meaningless if its value doesn't match the canonical frame.
5. **Asset fetched from Figma, not approximated** — every glyph/icon/illustration in JSX fetched from the canonical node (`get_design_context` asset URL or `get_screenshot`). If a fetched asset doesn't render (empty/transparent PNG), re-fetch via `get_screenshot` of the node. (Anti-pattern: shipping an inline SVG approximation because the asset "looked broken".)
6. **AppBar profile avatar 40×40 with NO outline/ring** — pure 40×40 photo, `border-radius:9999`, no border/wrapper/stroke. Tap-target is the avatar itself. (Valentino is the exception — it keeps a white-30 ring per canonical.)
7. **Status bar variant + page bg in sync** — every pod in `PAGE_BG` has a matching `STATUS_VARIANT`. Dark variant only on V-500-immersive pods.
8. **Status bar color logic = CENTER-POINT sampling** — each element's color = the variant of the page whose viewport span contains the element's center x. Hard cut at the page boundary. (Anti-pattern: span-overlap "any dark overlap → LIGHT" — flips white-side icons invisible too early.)
9. **Phone centering uses 3-layer position:fixed + 50/50 + translate** (or `display:grid; place-items:center` + `useFitScale`). NOT flex-center with transform-scale.
10. **Failed/pending txn states use corner-badge avatar** (monogram + 16×16 status badge bottom-right). NOT solid-red-circle or amber-ring as the WHOLE avatar.
11. **Side-by-side canonical Figma check** — list every chrome element from the canonical frame, walk down after build, confirm each visible. Refactors must not silently remove canonical chrome.
12. **Bottom nav per-slot variant** — each slot tracks the page under ITS viewport center via `useMotionValueEvent` on navX + pagerX, writes `data-slot-variant="immersive"|"standard"`, CSS keys off it. Mid-drag the row is heterogeneous. NEVER a single global nav variant.
13. **Keypad respects page-padding gutters** — `padding: 0 32px` + `justify-content: space-between` (cont-5 bump from 24px), aligning the keypad cluster.
14. **Agentation installed + wired** — `package.json` has `agentation@^3.0.2`; `main.jsx` renders `<Agentation />` as a sibling of `<App />`.
15. **AppBar background prop** — default `transparent` (page bg cascades through). Pods needing a solid bg (e.g. Activity, sticky search below) pass `background="#FFFFFF"` explicitly.
16. **Explore bento column heights match** — ExploreSmall height = 66 so 2×66 + 16 gap = 148, equal to INVITE card height.
17. **Phone fit-scale uses ResizeObserver + window resize together** — padding 8, init state inline to avoid flash-of-full-size, rAF-debounced.
18. **Card drop-shadow visibility** — `0px 4px 24px 0px rgba(0,0,0,0.08)` (was `0 2px 32px rgba(0,0,0,0.05)`, invisible on pure white).
19. **Bottom nav layout = `display:flex; gap:20px`** (cont-7). NO uniform SLOT_WIDTH grid — it can't give symmetric edge-to-edge with different circle sizes (44 / 64 / 72).
20. **Phone shell centering uses `display:grid; place-items:center`** + responsive `useFitScale`; scales down below 440×952, native otherwise, always centered.
21. **Slice DLS icons fetched from canonical nodes**, not approximated. Eye open `586:138`, eye closed `586:132`.
22. **Valentino app bar canonical (cont-6, node `885:19901`)**: row padding `8px 20px 8px 16px`. LEFT = "Check balance" pill (1px white-20 border, `8/16` padding, 14/20R white). RIGHT cluster (gap 8): audio button (48 hit → 40 circle + 1px white-30 border → 20×20 glyph) + avatar button (48 hit → 40 photo + 1px white-30 border). The Valentino avatar KEEPS its white-30 ring (differs from the no-ring standard rule because canonical shows it).

If any item fails → fix before claiming done, AND surface why the skill didn't catch it earlier (so this checklist gets a new line). See `reference_anti_patterns.md` "R23 fix-it" + `reference_proto_patterns.md` "R23 fix-it" for the failure modes + patterns.

---

# Running the proto on a real iPhone (cont-38, 2026-05-30)

## The `100vh` bottom-cutoff (fix it before anything else)
On iOS Safari `100vh` is the **larger, toolbar-hidden** height, so a stage sized
`height:100vh` is TALLER than the visible viewport → the phone's bottom (nav + home
indicator) gets pushed behind the Safari toolbar and looks **cut off**. Fix: size the
stage `height:100dvh` (dynamic viewport height) and make `useFitScale` read
`window.visualViewport` (the truly-visible area, which tracks the toolbar) rather than
`window.innerHeight`. `index.html` viewport meta already needs `viewport-fit=cover`.

## "Device mode" — full-bleed for on-phone (IMPLEMENTED cont-38, shared)
The shared App auto-enters device mode on a phone-sized viewport OR an installed PWA:
`useIsMobile()` = `matchMedia('(max-width:600px), (display-mode:standalone)')`. In
device mode it renders **bezel-less, full-bleed**: `PhoneFrame bare` drops the bezel +
inset, the 402×874 screen is **scaled to COVER** the viewport (`useFitScale(…, cover=
true)` = `max(vw/w, vh/h)`; the aspect is ~0.46 both ways so the scale is ~0.97 —
imperceptible), and the **custom StatusBar is hidden** so the real OS status bar shows
over the screen's top reserve. Desktop keeps the bezel + contain-fit.
- **Decision (2026-05-30): PWA, not Expo.** A react-native-webview wrapper buys nothing
  over a PWA for a proto (both render the same web app); true-native is an RN rewrite.
- **PWA bits** (so "Add to Home Screen" launches chrome-less): `public/manifest.webmanifest`
  (`display:standalone`) + `<meta apple-mobile-web-app-capable>` + `viewport-fit=cover`.
- **Deploy:** Vercel → Root Directory `skills/slice-design/proto`, framework preset Vite.
- **iOS reality:** plain mobile Safari can't be made chrome-less — true edge-to-edge needs
  "Add to Home Screen" (standalone). `100dvh` keeps Safari from clipping the bottom regardless.
- **Option A vs B:** this is option A (scale-to-cover) — low risk, keeps all internal 402
  logic. A future option B threads a dynamic screen width through Pager + BottomNav for
  pixel-true responsive reflow (like explore-base, whose content is CSS-fluid).

## App Settings screen + theme toggle wiring (cont-38)
- **App Settings L1** (canonical Figma "App visual fix" `4594:10703`; built at
  `pods/profile/AppSettingsL1.jsx`): App bar Standard ("App settings" + chevron-back) +
  a flat list of List item/Control + List item/Standard rows — Touch ID/Face ID (Active,
  switch on), Change slice PIN, **Dark mode** (switch), Notification preferences, Logout.
  Each leading glyph is the official DLS icon on a **themed card-bg chip** (40px,
  `var(--surface)` + outline-subtle ring) recoloured via **CSS mask** (see
  `reference_theming.md` §1). Opened from Profile → "App Settings" via `useL1().push`.
  (The canonical frame's Android status bar + theme bottom-sheet are ignored — the proto
  uses iOS chrome and the toggle fires the transition directly.)
- **ThemeContext pattern** (`src/theme-context.js`): App.jsx provides `{ theme,
  toggleTheme }` around the L1Stack so any L1 screen (the App Settings "Dark mode"
  switch) can fire the SAME canonical theme-switch transition the dev toggle uses —
  don't thread theme state through props.
- **Switch** (DLS): track 40×24 rounded-100, handle 16 white; ON = `var(--positive)`
  track + handle right (left:20), OFF = `#CFCFCF` track + handle left (left:4). Make the
  ROW the tap target and the Switch a visual-only child (never nest buttons).
