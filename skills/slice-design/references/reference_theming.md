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
  `public/assets/icons/`, plus `icons/NavIcons.jsx` / `SliceIcons.jsx`) — check
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

## 11. Theme-switch reveal motion (light⇄dark) — CANONICAL (Figma "App visual fix" node `3309:13267`)
A full-screen **gradient overlay FADES in** (opacity), the **destination icon +
caption sit CENTRED**, then it **FADES out** — it does **NOT slide**. Verified
against the user's screen recording 2026-05-30 (`ScreenRecording_…19-00-46`).

- **The gradient = canonical (Figma `3311:7095`)**: `linear-gradient(to top,
  rgba(147,65,255,0) 0%, rgba(98,31,255,0.34) 53%, #FF55BA 101%)` layered over the
  target base (`#090B0C` dark / `#FFFFFF` light). The **FIRST stop is 0% opacity**
  (transparent) — user-directed, this is the soft edge; the magenta glow sits at the
  TOP. Same gradient orientation BOTH directions (one direction); only the base
  colour + icon differ.
- **Opacity fade** — one overlay `opacity [0,1,1,0]`, `times [0,0.16,0.78,1]`,
  **~2.2s** easeInOut (short fade-in, LONG hold so it reads, fade-out). `data-theme`
  flips mid-hold (`setTimeout ~1000ms`) so the transparent lower band of the gradient
  reveals the already-flipped target-colour page underneath (no flash, seamless fill).
- **Destination icon** (switching TO): **moon → dark**, **sun → light** — held
  centred the whole time (NOT a sun→moon morph; the video shows only the destination).
  Official transparent SVGs → `proto/public/assets/theme_moon.svg` (purple crescent) +
  `theme_sun.svg` (orange sun). Multi-colour brand illustrations → `<img>` (NOT
  currentColor); transparent-bg (no bg rect, `fill="none"` root). Fix Figma's
  `preserveAspectRatio="none"` → `xMidYMid meet` (stretch gotcha, section 9), 80×80
  `objectFit:contain`. Icon layer `opacity [0,1,1,0]`, `times [0,0.2,0.76,0.98]`.
- **Caption** TYPES on (typewriter, user-directed): `Switching to dark mode` /
  `Switching to light mode`. Letters reveal left→right via an opacity STAGGER (each
  char pre-occupies its space so the centred line never jitters) — `delayChildren 0.4`
  (waits for the overlay to cover), `staggerChildren 0.035`. Component `TypeCaption`
  in `App.jsx`. Rubik Regular 16/24, +0.32px tracking, centred, 24px under the icon.
  `rgba(255,255,255,0.95)` on →dark, `rgba(0,0,0,0.9)` on →light (over the target fill).
- **Icon does NOT morph** — the destination glyph is shown for the whole transition
  (no sun↔moon crossfade), confirmed against the recording.
- Implemented in `App.jsx`: `REVEAL_GLOW / REVEAL_CURTAIN / REVEAL_ICON / REVEAL_LABEL
  / REVEAL_TEXT` + the 2-layer AnimatePresence overlay; `handleThemeToggle` guards re-tap.
- ⚠️ History (don't resurrect): a flat-cover SLIDE → a magenta-at-bottom fade → a
  current→valentino→target colour-journey → a fill-and-reveal curtain. ALL rejected.
  The signed-off behaviour is THIS: a plain opacity fade of the canonical transparent-
  first-stop gradient, destination icon centred. Match the live `App.jsx` REVEAL_*.

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
