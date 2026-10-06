---
name: slice-design theming (light/dark) + theme-safe assets
description: Load for any light/dark theming work — asset theme-safety (icons vs illustrations), dark-mode token values, the CSS-variable theming mechanism, Figma MCP workflow for dark values, proto phone chrome, the theme-switch reveal motion, and the dark-mode component gotchas. Bottom-nav colours live in reference_dls_bottom_nav.md; Activity states/avatars in reference_pod_activity.md.
type: reference
---

# slice theming — light/dark + theme-safe assets

Distilled from the 2026-05-30 dark-mode build of the proto. Theming = CSS
variables: `tokens.js` exports `var(--x)`; `index.css` defines `:root` (light) +
`[data-theme="dark"]`; the toggle flips `data-theme` on the phone root. Centralising
colour into `tokens.js` first is what makes dark mode one var-set + routing instead
of a rewrite.

Two parts bite hardest, in this order:
1. **Asset theme-safety** (icons vs illustrations) — get it right when you ADD an asset.
2. Dark-mode token values + the theming mechanism + how to pull dark values from Figma.

> Bottom-nav colours (Valentino light + canonical dark) → `reference_dls_bottom_nav.md`.
> Activity list-item states + avatars → `reference_pod_activity.md`.

---

## 1. Asset theme-safety — ICONS vs ILLUSTRATIONS (read FIRST)

A surface only works in light AND dark if **every asset on it can adapt**. The
recurring failure: treating icons as fixed raster PNGs and shipping illustrations
with baked backgrounds — they look fine in light and become **white boxes /
wrong-colour glyphs in dark**.

### Icons → ALWAYS single-colour SVG with `currentColor`
- slice icons are **VECTORS** in Figma. Use them as **SVG inlined as a React
  component** with `fill="currentColor"` / `stroke="currentColor"`. The parent's
  `color` then themes them for free (slate in light, white in dark).
- **NEVER use a PNG for an icon.** A PNG can't recolour → it breaks in dark.
- `<img src="icon.svg">` does NOT recolour either — the SVG must be **inlined**
  so `currentColor` resolves. Inline it (or use a loader that inlines).
- **Can't inline? Use a CSS MASK (validated 2026-05-30).** DLS icon exports often
  fill `var(--fill-0, black)` — via `<img>` that falls back to **black** and
  vanishes on a dark page. Instead of inlining, render the icon as a **CSS mask**:
  a `<div>` with `mask-image: url(icon.svg)` (+ `-webkit-mask-image`, `mask-repeat:
  no-repeat`, `mask-size: contain`, `mask-position: center`) and
  `background-color: <themed token>`. The mask uses the official shape's alpha; the
  background paints it any theme colour (e.g. `var(--text-tertiary)` = slate→white-50%,
  `var(--text-primary)` = →white). Keeps the EXACT official geometry, recolours for
  free, no redraw. Used for Profile menu/close glyphs, App Settings row icons, and
  the Get-assured flame. This is the go-to when you have the official SVG file but
  don't want to hand-inline its paths.
- Before adding ANY icon: check the icon library first
  (`slice-design-suite/icons/<category>/`, proto `public/assets/icons/`), then
  pull the SVG from Figma (vectors export as SVG via a specific frame node-id).
  Do not reach for a PNG when an SVG exists.

### Illustrations → NO baked background (transparent)
- slice 3D/brand illustrations are multi-colour. They MUST be exported with a
  **transparent background**. An illustration with a white/light bg baked in
  shows as a **white box on a dark surface**.
- slice **splits assets light/dark in Figma** — there are distinct light/dark
  illustration variants. In dark mode use the dark variant (or a transparent
  export placed on a theme-token tile).
- If an illustration sits on a tinted tile, theme the **tile** (var token) and
  keep the illustration bg transparent.

### Rule of thumb
If an asset can't adapt to both themes, it's a **bug, not a detail**. Check
theme-safety when you ADD an asset — not after dark mode "looks broken."

---

## 2. Dark-mode tokens (Figma dark L0, node `2017:5795`)

| token | light | dark (✓ from Figma) |
|---|---|---|
| page bg (Background/Primary) | #FFFFFF | **#090B0C** |
| brand bg (Background/Brand — Pay/Valentino) | #D30AD7 | **#090B0C** |
| surface / card (Background/Card BG) | #FFFFFF | **rgba(255,255,255,0.05)** |
| text primary / secondary / tertiary | rgba(0,0,0,.9/.7/.5) | #FFFFFF / .70 / .50 |
| outline subtle | rgba(0,0,0,0.05) | rgba(255,255,255,0.05) |
| positive | #00A63E | #3DBB6C (Green/400) |
| negative | #CE1D26 | #DA535A (Red/400) |
| V-500 (buttons / accent) | #D30AD7 | #D30AD7 (unchanged) |

Bottom-nav dark colours are their own thing (active chip @60% + #090B0C glyph;
inactive chip @20% + WHITE glyph) — see `reference_dls_bottom_nav.md`. Don't
duplicate them here.

### Token mapping: Figma variable → DLS token, BY NAME (HARD, cal:2026-10-06)

`get_design_context` code reads `bg-[var(--core\/background\/primary,white)]`,
`text-[color:var(--core\/text\&icons\/secondary,rgba(0,0,0,0.7))]` … The part that
matters is the **variable path**; the hex after the comma is only that FILE's
resolved value in its current mode. Procedure, every colour, every build:

1. Read the variable path (`Core/Background/Primary`, `Core/Text&Icons/Secondary`,
   `Core/Main/Primary`, `Core/Outline/OutlineSubtle` …).
2. Map it by name to the DLS token — the kit's own first (`--page-bg`, `--surface`,
   `--text-primary/secondary/tertiary`, `--outline-subtle`, `--brand-bg`, tokens.js).
3. If the kit lacks it, RESOLVE it from the published library `ncGqxiE6wUOqgOURwHx6Hp`
   (`use_figma`: `getLocalVariablesAsync` → the Theme collection, follow the alias to
   the primitive, BOTH Light and Dark modes) and add it to a project tokens file
   with the variable path in a comment. Missing dark value? Resolve it — never guess.
4. NEVER copy the fallback hex, never keep a private palette of "Figma colours", never
   mark a value "(~)" and ship it.

Why: the birthday-spark build (2026-10-06) copied fallbacks into a private palette
and invented dark values; the Credit-card-2026 file's `Core/Main/Primary` resolves
`#9E2BCF`, but the DLS (and prod, sampled `#D307D6`) is Valentino/500 `#D30AD7` —
"the bottom sheet and card colours don't seem as per the DLS". Mapping by name
would have produced the DLS values first time. Brand/content colours (a merchant's
offer colour, a logo) are content, not tokens — say so in a comment where they live.

---

## 3. Figma references (shared — any slice teammate can open)

- DLS working copy: `PNUz3Dr9KSlFJSnsXsC0nL`
- Published library: `ncGqxiE6wUOqgOURwHx6Hp`
- Dark-mode L0 (dark token source): node `2017:5795`
- Variable-rich dark frame: node `2466:58841`
- List item (typography): node `3:41`

## 4. Figma MCP workflow (verified 2026-05-30)

- Official **remote** MCP (`mcp.figma.com`): `get_variable_defs` / `get_design_context`
  work **headless** given a **SPECIFIC FRAME node-id** (right-click → Copy link to selection).
- PAGE/FILE-ROOT node-ids (e.g. `0:1`) fail `"nothing selected"` — not a selection
  requirement; just pass a real frame node-id.
- `get_variable_defs` returns the frame's variables resolved for ITS mode → pass a
  **dark** frame to read dark values; `get_design_context` can be 200k+ (saves to file → parse with python).
- figma-console is unofficial — last resort only.

---

## 5. Proto phone chrome — make it REAL, not an image

- **Status bar is a real component**, never baked into an image. The time uses
  the SYSTEM font (`-apple-system`, SF Pro) — NOT Rubik. iOS dims: status-bar
  area 54pt / top safe-area 59pt on Dynamic Island iPhones. Canonical DLS Status
  Bar (node `6566:58784`): time inset **40px** from left, icons **30px** from right.
- **Status-bar content vertically centers on the Dynamic Island**, not the 54px
  band — center the time/icons row on the island's vertical center. Measured from
  the bezel PNG: the island spans screen-y ~14–50, **center ≈ 32** (NOT 20 — an
  earlier value left the icons ~12px too high). Implement as status-row height 64
  + `alignItems:center` so content lands at y≈32.
- **Device frame** = the iPhone 17 Pro Silver bezel PNG from Figma (file
  `cMITYopAqGfe4JC6gIkrIE`, node `8402:7`): 450×920 art with a TRANSPARENT screen
  cut-out (~402×874, inset ~24px L/R, ~23px T/B, measured from PNG alpha). Layer
  the bezel OVER the screen content (content behind, bezel on top,
  `pointer-events:none`); rim + Dynamic Island + side buttons are baked into the
  PNG. Float shadow via `filter: drop-shadow(...)` on the img (follows the alpha
  silhouette), not a rectangular box-shadow.
- **Proto stage = white** (`#FFFFFF`) with the phone floating + a subtle drop
  shadow — reads as slice. Not a black stage.

## 6. Asset gotcha — Figma MCP asset shapes
- Icons exported via `get_design_context` come back as **SVG** (recolour via
  `currentColor` once inlined). Use them; don't hand-draw.
- Some logo assets are **sprite atlases** (the node crops a sub-region with
  negative offsets). Don't use the whole asset — crop one mark (PIL: find the
  colored column-cluster, crop its bbox). Example: BHIM-UPI mark from the
  Valentino file (`J8xKGFeQ5JoDJZdaUXiLPz`, node `9717:8442`).

## 7. Divider taxonomy (see also reference_dls_dividers.md)
- **Middle** divider: respects the card's L/R padding on BOTH sides (section
  breaks inside a card). **Inset**: extra LEFT margin so no line runs under a
  leading avatar (avatar lists). **Full-bleed**: edge to edge. Don't conflate
  "inset" with "middle" — inset is the avatar-list type.

## 8. ICONS — official-only, never invent (HARD, user-directed 2026-05-30)
The recurring, anger-inducing failure: **making up icons** (hand-drawing bill
glyphs, tracing the BHIM-UPI mark into polygons). The rule:
- **Use the official slice DLS icon, full stop.** Library = Figma DLS 2.0 Copy
  node **`582:257`**. **Most icons are ALREADY in the proto** (`public/assets/`,
  `public/assets/icons/`, plus `icons/NavIcons.jsx`) — check
  there first; you usually already have it.
- **Missing → DUMMY placeholder**, never an approximation. A neutral rounded-box
  placeholder + tell the user the file path to drop the real asset. Do NOT trace
  a logo, draw polygons to mimic a mark, or few-shot-generate a UI glyph.
- **Theming an official monochrome icon:** inline its EXACT Figma path, swap
  `fill`→`currentColor`. Same geometry = still official. Parent `color` themes it.
- **User-pasted inline images are NOT on disk.** The agent sees them visually but
  cannot read the bytes. To use a user's exact image it must be a repo file —
  point `<img>` at a path (e.g. `public/assets/upi_pill.png`) and have the user
  drop the file there. Never redraw it from the chat preview.

## 9. Figma SVG exports: `preserveAspectRatio="none"` STRETCHES
Figma `get_design_context` SVG assets come with `preserveAspectRatio="none"` and
`width/height:100%`. If you force them into a square box (e.g. `<img width=16
height=16>`) whose ratio ≠ the icon's viewBox, the glyph **stretches and looks
oversized/distorted** (this was the Credit "icons look much bigger than design"
bug). Fix: render at the icon's NATIVE viewBox size (the design insets a 13.3×12
glyph inside a 16px slot — it is NOT 16×16), centered in a fixed slot. Inline
React SVGs: keep the native `viewBox` + `xMidYMid meet`.

## 10. Cropped sprite assets can hide a baked WHITE sliver (breaks dark)
`bhim_upi_logo.png` (cropped from a sprite atlas) carried a small baked-white
triangle that was invisible on white but showed as a **white artifact on the
dark page** — the "weird box in dark". Lesson: a sprite crop is not theme-safe;
prefer the clean standalone official asset. (And per the icon rule above, don't
re-trace it — get the official file.)

## 11. Theme-switch reveal motion (light⇄dark) — CANONICAL (Figma "App visual fix" `4586:10407` + `3315:7279`)
A **TALL gradient overlay (3× screen) SLIDES top→bottom with a PAUSE**, matched to
the user's screen recording 2026-05-30. NOT a pure fade, NOT a fill-and-reveal
curtain — it is one continuous downward slide that holds in the middle.

- **The overlay rectangle** (EXACT canonical, Figma `4586:10407`; `linear-gradient(
  to top, …)`, height `300%`): leading (bottom) end = blue-violet Valentino
  **`#9341FF` at 0 opacity** → `rgba(98,31,255,0.4)` → **solid target middle**
  (`#090B0C` dark / `#FFFFFF` light, 30–70%) → **0-opacity target** at the trailing
  (top) end. **BOTH ends are 0 opacity** and the glow ramps GRADUALLY → NO hard edge.
  Do **NOT** use magenta/pink (`#FF55BA`) — it produced a hard pink band on screen
  (user-rejected). The glow is the blue-violet end of Valentino, never pink. Same
  gradient BOTH directions; only the base colour + icon differ (one direction).
- **Slide + pause** — `y: ['-100%','-33.333%','-33.333%','33.333%']`, `times
  [0,0.26,0.64,1]`, **~3.2s** easeInOut. `-100%`=fully above (glow edge at screen
  top), `-33.333%`=solid middle exactly covers the screen (the two equal keyframes =
  the **pause**), `+33.333%`=overlay top edge at screen bottom (fully exited). The
  geometry: a 300%-tall element, so screen = its middle third at `-33.333%`.
- **Pause = the moment**: solid colour covers the screen; the destination icon +
  caption are shown; `data-theme` flips behind it (`setTimeout ~1700ms`, inside the
  pause) so the exit slide reveals the already-flipped new theme. The glow is only
  seen sweeping IN (entry) and OUT (exit), never during the pause.
- **Destination icon** (switching TO): **moon → dark**, **sun → light** — held
  centred, **does NOT morph** (no sun↔moon crossfade; the recording shows only the
  destination). Official transparent SVGs → `proto/public/assets/theme_moon.svg`
  (purple crescent) + `theme_sun.svg` (orange sun). `<img>` (multi-colour, NOT
  currentColor); transparent-bg (no bg rect, `fill="none"`). Fix Figma's
  `preserveAspectRatio="none"` → `xMidYMid meet` (stretch gotcha, section 9), 80×80
  `objectFit:contain`. Icon+caption layer `opacity [0,0,1,1,0]`, `times
  [0,0.22,0.3,0.62,0.68]` (only visible during the pause).
- **Caption TYPES on** (typewriter, user-directed): `Switching to dark mode` /
  `Switching to light mode`. Letters reveal left→right via an opacity STAGGER (each
  char pre-occupies its space so the centred line never jitters) — `TypeCaption`
  with `delay` synced to the pause (~0.95s) + `staggerChildren 0.032`. Rubik Regular
  16/24, +0.32px tracking, centred, 24px under the icon. `rgba(255,255,255,0.95)` on
  →dark, `rgba(0,0,0,0.9)` on →light.
- Implemented in `App.jsx`: `REVEAL_SLIDE / REVEAL_ICON / REVEAL_LABEL / REVEAL_TEXT`
  + `TypeCaption(delay)` + the sliding AnimatePresence overlay; `handleThemeToggle`
  guards re-tap and schedules the mid-pause `data-theme` flip.
- ⚠️ History (don't resurrect): flat-cover slide → magenta-at-bottom fade →
  current→valentino→target colour-journey → curtain → plain opacity fade → a
  backdrop-blur phase. ALL rejected. Signed-off + user-validated ("looks beautiful",
  2026-05-30): THIS slide-with-pause, exact canonical gradient, blue-violet glow,
  both ends 0 opacity, NO blur. Match the live `App.jsx` REVEAL_SLIDE.

## 12. More dark-mode component gotchas (this session)
- **Card-corner illustrations** (Banking FD rocket, monies cluster): the Figma node
  bakes a **"Card Background"** rect behind the art → exporting the whole node =
  opaque white box in dark. Use the ILLUSTRATION layer ONLY (transparent): the
  `imgLayerN` SVG asset, or `get_screenshot` the illustration sub-node with
  `contentsOnly:true`. Render `objectFit:contain` at a small inset so it reads as a
  corner accent, not a full tile. Figma corner = a 96×96 box flush to the
  top-right with the art inset ~25–32%, so the art resolves to: **FD mascot ≈43×37
  @ top 30 / right 28**, **monies cluster ≈40×43 @ top 25 / right 27** from the
  card corner.
- **App-bar action glyphs** (eye / hide-balance): were 100%-opaque PNGs → white box
  in dark. Inline the official SVG with `currentColor`, and theme the WRAPPER
  (`ActionSlot { color: var(--text-tertiary) }`) — not a hardcoded `black` +
  `opacity:0.5` (that can't go light in dark).
- **BottomFade** takes a `bottom` offset prop (lift it ~12px off the screen edge on
  the white L0s per user direction). Credit L0 has no BottomFade.
- **Verifying themes (process):** toggling `data-theme` via DOM `setAttribute`
  re-themes CSS vars but does NOT recompute React-driven `data-slot-variant`
  (that needs the real toggle / state change). And `getComputedStyle` returns a
  LIVE object — read the value immediately; don't read it AFTER mutating the same
  node (it reflects the new state and gives a false reading). Verify BOTH themes
  separately before claiming done.
