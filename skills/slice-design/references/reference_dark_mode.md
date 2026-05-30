# reference_dark_mode.md — slice dark mode + theme-safe assets

Distilled from the 2026-05-30 dark-mode build of the proto. Two parts:
1. **Asset theme-safety** (icons vs illustrations) — the part that bites; get it right up front.
2. Dark-mode token values + the CSS-variable theming mechanism + Figma refs.

---

## 1. Asset theme-safety — ICONS vs ILLUSTRATIONS (read FIRST)

A surface only works in light AND dark if **every asset on it can adapt**. The
recurring failure (and a mistake made in the R-dark build): treating icons as
fixed raster PNGs and shipping illustrations with baked backgrounds — they look
fine in light and become **white boxes / wrong-colour glyphs in dark**.

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

Theming = CSS variables. `tokens.js` exports `var(--x)`; `index.css` defines
`:root` (light) + `[data-theme="dark"]`; toggle `data-theme` on the phone root.
Centralising colour into `tokens.js` first is what makes dark mode one var-set
+ routing instead of a rewrite.

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

Bottom nav dark (Figma): Primary nav bg `#ffffff33`, container gradient
`#00000000 → #090b0c`, Selected `#ffffff99`, **glyphs WHITE** (Text&Icons/On color/Primary = #fff).

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
The recurring, anger-inducing failure of this session: **making up icons**
(hand-drawing bill glyphs, tracing the BHIM-UPI mark into polygons). The rule:
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

## 11. Theme-switch reveal motion (light⇄dark)
Pattern the user signed off on: flip `data-theme` INSTANTLY, then slide a cover
of the PREVIOUS bg out — **up for →dark (dark fades in from the bottom)**, **down
for →light (light fades in from the top)**. Cover bg = the pre-flip page bg of
the active pod (Pay = V-500 light / #090B0C dark). A soft gradient leading edge
(`linear-gradient(... cover 78%, transparent)`) reads as a fade, not a hard
wipe. Timing: **~1.0s, gentle ease-out** — user: "make it calmer, right now it's
too fast, don't even have time to appreciate it." (Implemented in `App.jsx`.)

## 12. Activity list-item STATES (Figma node 6577:60247)
The status word goes on the **RIGHT, UNDER the amount** — NEVER as the left
subtitle (user: "we don't say pending here"). The left subtitle is ALWAYS
`<date> · UPI`. Per type:
| type | amount colour | status line (right, under amount) |
|---|---|---|
| sent | text-primary | — |
| received | positive (green), **no `+`** | — |
| failed | text-tertiary | **Failed** (negative red) |
| pending | text-tertiary | **Pending** (text-secondary) |
| requested | text-primary | **Requested** (blue-500) |
Amount = Body Normal 16/24 **Regular (400)**. Status = 12/16 Medium.

## 13. Activity list AVATARS (Figma node 6577:60417 / 6569:59190)
MIXED, on a **THEMED surface chip** (Avatar `tone="chip"`): bg `var(--surface)`
(white in light, **rgba(255,255,255,0.05) card-bg in dark** — do NOT hardcode
`#FFFFFF`, that ships a white-fill avatar bug in dark) + faint outline-subtle ring
+ a tertiary letter that themes (dark-grey light → light-grey dark). Income icons
use `var(--positive)` (themed green: #00A63E → #3DBB6C). Verified vs dark node
6591:60485 — the discs are subtle dark surfaces, NOT white.
- **Photo** (people) → real profile picture, **NO ring** (user: "we don't keep
  these with an outline ever"). Avatar `tone="plain"`.
- **Icon** (automated income) → official green glyph: **trend-up** = interest,
  **recurring** = "fires" (pulled from 6569:59190 → `icons/ActivityIcons.jsx`).
- **Monogram** (merchants) → grey letter (rgba(0,0,0,.5)), 20px Medium, -0.2px;
  brand colour for some (Zomato "Z" = red, via Avatar `fg` prop).
Show ALL variations in the proto — don't ship an all-monogram list.

## 14. Bottom-nav colours — Valentino (light) vs dark mode (user direction 2026-05-30)
Two DIFFERENT contexts that both resolve to `data-slot-variant='immersive'` (dark
theme sets every page variant='dark'), so they MUST be split by `data-theme`:
- **Valentino, LIGHT mode** (V-500 page): inactive medallion **#FFFFFF @ 20%**,
  glyph **V-500 (#D30AD7)** — the page-bg colour "punched out" of the white-alpha
  medallion (NOT white, NOT black). `[data-variant='immersive']` vars +
  `[data-slot-variant='immersive'] .slice-bnav-circle`.
- **DARK mode (CANONICAL — Figma `6591:60485`, get_variable_defs, 2026-05-30).**
  The medallion is light, the glyph contrasts it. Active and inactive differ by
  BOTH chip opacity AND glyph colour (NOT "one glyph colour for both"):
  - **Active (selected):** chip = `Component/Bottom nav/Selected` **#FFFFFF @ 60%**
    (`rgba(255,255,255,0.60)`), glyph = **#090B0C** (`Background/Primary`, punched
    out). The active ICON is #090B0C, NOT white.
  - **Deselected (inactive):** chip = `Component/Bottom nav/Primary nav bg`
    **#FFFFFF @ 20%** (`rgba(255,255,255,0.20)`), glyph = **#FFFFFF (white)**. The
    "page-bg punched out" logic does NOT carry to inactive in dark — a #090B0C glyph
    on the dark-grey 20% medallion is invisible. Inactive dark glyphs are white.
  - CSS: `[data-theme='dark'] .slice-bnav-slot .slice-bnav-circle` =
    `bg rgba(255,255,255,0.20); color #FFFFFF` (deselected);
    `[data-theme='dark'] …[data-state='active'] …` =
    `bg rgba(255,255,255,0.60); color #090B0C`.
- **LIGHT mode active** = white chip + dark-40% glyph (canonical). **Valentino
  (light) inactive** = #FFFFFF@20% + V-500 glyph (punched out). **White-page
  (standard) inactive** = black-10% chip + white glyph.
- **Pay scan glyph (PayCenter)** = `currentColor` via `.slice-bnav-pay-inner`
  color: **V-500 in light, #090B0C in dark**. White ring/inner unchanged.
- ⚠️ Churn history: this recurred ~10 rounds. Earlier drafts here WRONGLY recorded
  "all dark glyphs #090B0C, active chip solid #FFFFFF, deselected chip @30%" — that
  bad rule kept getting re-applied. The canonical Figma values above (active chip
  @60% + #090B0C glyph; inactive chip @20% + WHITE glyph) are the source of truth.
  Pull `get_variable_defs` on `6591:60485` if ever in doubt; don't eyeball.

## 15. Bottom-nav background MUST stay TRANSPARENT (pager-drag "sticking")
`.slice-bnav` is `position:absolute` and does NOT move during a horizontal pod
swipe — the Pager translates the PAGES under the fixed nav. So ANY fixed nav
background (solid OR gradient) **sticks**: it holds the prior pod's colour at the
bottom while the page slides to the next pod (reported live: V-500 retained over a
half-swiped white Credit). **Keep the nav background transparent.** Each page's own
bg (+ its `BottomFade`, which lives inside the page) sits behind the nav and moves
WITH the swipe, so the Valentino↔white change reads **end-to-end** and the gesture/
home-indicator area is "filled" by the page itself. Do NOT port Figma's per-screen
"container gradient" onto the live nav element — Figma's is static per frame; the
live pager needs the fill on the PAGE side, not the nav. (I added a nav gradient to
"fill the gesture area" → it stuck on drag → reverted. Don't repeat.)

## 16. More dark-mode component gotchas (this session)
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
