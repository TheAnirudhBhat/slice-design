# Source-of-truth order — local-first, Figma on a miss (R24 meta-rule, corrected R24 cont-25)

**The skill IS the source of truth.** The references + the proto are a *read-through cache* of Figma. Figma is the origin you sync from on a cache miss — NOT a place you round-trip to every time. The whole point of building this skill was so routine work doesn't need Figma.

**Lookup order (top wins):**

1. **Proto** (`proto/src`) — if the component is already built correctly, COPY it. Highest trust: real, calibrated, working code. (e.g. AppBar, Avatar, BottomNav, TxnRow, the L0 pods.)
2. **References** (`reference_dls_*.md`, this file's siblings) — if the spec/token/recipe is written down, USE it and trust it.
3. **Figma** (published library `ncGqxiE6wUOqgOURwHx6Hp`) — only on a cache miss (proto + refs don't have it) OR a specific reason to suspect drift (designer updated the component, the ref is marked stale/⚠️, or a value demonstrably looks wrong). **When you do fetch, WRITE IT BACK** into the refs (and proto if it's a component) so the next lookup is local. A fetch that isn't cached back is a wasted round-trip.

**The two real failure modes (both happened in R24 — neither is "didn't go to Figma"):**

- **Cache bypass** — guessing a value from memory without reading the proto OR the ref at all. This is the cardinal sin. (R24: amount-weight Medium-vs-Regular, chevron style, copy icon — all were guessable-wrong because I never checked the local cache.) Fix: always read tier 1→2 before writing a spec.
- **Cache miss** — the exact value genuinely isn't in the proto/refs yet. (R24: the precise Activity-row padding, the whole Feature PDP pitch recipe.) These legitimately need a Figma fetch — then a write-back so they become tier-2 hits forever after.

So: **never guess from memory; check the cache; fetch Figma only on a true miss; always write the fetch back.** As the cache fills (every sweep, every write-back), the share of tasks needing Figma trends toward zero. A mature skill almost never touches Figma.

---

## The flow

```
1. search_design_system({ query, fileKey })
   → returns list of components with componentKey + libraryKey

2. figma_get_library_component_by_key({
     componentKey,
     format: 'full',
     includeVisualSpecs: true,
   })
   → returns:
     • visualSpec.layout (paddingTop/Right/Bottom/Left, itemSpacing, counterAxisAlign)
     • visualSpec.fills, .strokes, .cornerRadius
     • properties (component property definitions)
     • variants[] (each with nodeId + key + per-variant visualSpec)

3. For each variant you care about, refetch by its variant key.
   The component_set's outer visualSpec is often section-level padding;
   the variant's visualSpec is the actual row/card/atom layout.
```

## Why a second fetch (per variant)

In R24 I fetched `List item/Transaction` component_set and got `paddingTop:60, paddingRight:60, paddingBottom:60, paddingLeft:60, itemSpacing:24, layoutMode: VERTICAL`. That's the section padding around the showcased variant in the DLS canvas, NOT the row's padding. The variant fetch returned what I actually needed: `paddingTop:16, paddingRight:24, paddingBottom:16, paddingLeft:24, itemSpacing:12, counterAxisAlign:CENTER, mode:HORIZONTAL`.

If a value seems wrong (e.g. 60px padding on a transaction row), it's because you read the section spec instead of the variant spec. Always drill down.

## When to use the slice DLS file vs published library

- **For component definitions**: published library (DLS 2.0, libraryKey `lk-94a7c674...`). Searchable via `search_design_system` with any fileKey as context.
- **For pod-level instances** (Activity L0, Banking L0, etc.): the working file containing those frames (`PNUz3Dr9KSlFJSnsXsC0nL`).
- **For screen-specific overrides** (AVC-2025 Txn Detail, Profile V3): the relevant working file (e.g. `KXA1BbYZvzygD1XUOTIwUa` for AVC-2025).

A component's published spec is the source of truth for that atom. The pod-level instance might override colors, sizes, or content but the layout/typography tokens come from the published variant.

## The PNG-vs-SVG trap

`get_design_context` and similar tools return asset URLs that may serve SVG content even when the original Figma node was a raster export. After downloading, ALWAYS check the actual content type:

```bash
file path/to/asset.png   # tells you "PNG image" or "SVG Scalable Vector Graphics image"
```

If you saved `.png` but the content is SVG, Vite serves it with `Content-Type: image/png` and browsers refuse to render it (MIME mismatch). Rename to `.svg` (or vice versa) so the extension matches the content.

## Anti-patterns this rule replaces

- "I checked the spec, it's 16/24 Medium" — without a fetch, this is a guess
- Writing inline SVG paths that "look like" a slice icon — pull the published asset (`General/Copy` was filled rectangles, not the stroked outline I wrote)
- "The padding matches canonical" — fetch the variant spec first
- Eyeballing pixel sizes from a Figma screenshot — the screenshot is 2× scale, easy to miscount
- Claiming a Figma node ID without referencing the file key — same node ID can exist across files

## Practical example (R24 cont-22)

User said the Activity row had "too much space" but I'd already iterated padding 20 → 12 → guess-bumped right to 28 — all wrong. The correct flow:

```
1. search_design_system({ query: 'List item Transaction', fileKey: 'PNUz3Dr9KSlFJSnsXsC0nL' })
   → componentKey 89e7507ea2bb40a9099f5fc9bac48f504da645a3 (DLS 2.0)

2. figma_get_library_component_by_key({ componentKey: '89e7507ea2bb40a9099f5fc9bac48f504da645a3' })
   → variants[0] = { name: 'Type=Transaction',
                      nodeId: '796:27298',
                      key: '57e2a21c6b1758903b732050281bfb146cc1a4fd' }

3. figma_get_library_component_by_key({ componentKey: '57e2a21c6b1758903b732050281bfb146cc1a4fd' })
   → visualSpec.layout = {
       mode: 'HORIZONTAL',
       paddingTop: 16, paddingRight: 24, paddingBottom: 16, paddingLeft: 24,
       itemSpacing: 12,
       counterAxisAlign: 'CENTER',
     }
   → bounds = { width: 360, height: 76 }
```

One canonical-fetch loop replaced three rounds of guessing.

## Same flow for icons

```
search_design_system({ query: 'copy', fileKey: '<any DLS-aware file>' })
  → 'General/Copy', componentKey ca9df31db18780946bee14da1d8e9e5fa900a59c

figma_get_library_component_by_key({ componentKey: 'ca9df31db18780946bee14da1d8e9e5fa900a59c' })
  → fileKey: 'ncGqxiE6wUOqgOURwHx6Hp', nodeId: '586:128', bounds: 24×24

figma_get_component_image({ nodeId: '586:128', fileUrl: ..., format: 'svg' })
  → SVG URL → curl → save → inline the path into the proto
```

Anti-pattern: writing your own `<svg>` of a copy icon. Canonical has specific corner radii, specific stroke vs fill choices, specific proportions. The hand-rolled version always looks "almost right but wrong".

---

Source: R24 cont-2 through cont-23, 2026-05-29.

---

## Images: EXPORT them from Figma, never redraw (R24 cont-28)

When you fetch a screen via `get_design_context`, every node is typed —
`data-name`/structure tells you whether it's an **IMAGE / illustration**, a
**COMPONENT**, or a **vector/text element**, and the response hands you asset
URLs (`const imgX = "https://www.figma.com/api/mcp/asset/…"`) for the raster /
illustration nodes.

Rule: for anything that's an image or illustration, **download the asset URL
(or `figma_get_component_image` the node) and use the real file.** Do NOT
hand-build an inline-SVG approximation, a CSS gradient, or a "close enough"
stand-in.

R24 cont-28 example — the success screen: I rendered a halo-tick from two
divs + a stroke check instead of exporting the canonical **Transaction status
/ Success** illustration (file `ncGqxiE6wUOqgOURwHx6Hp`, node `884:16442`, key
`bd790e976212e4ad272c97c6ad60f52a3dda8841`). It's a grainy-gradient
(`feTurbulence`) green circle — impossible to fake convincingly by hand. The
user had to supply the file. That whole round was avoidable: the Figma
response would have flagged it as an illustration, and exporting it would
have been one fetch.

Classification quick-guide from a `get_design_context` payload:
- node has an `imgXxx` asset URL + `data-name` like "Image"/an illustration
  name → **export the asset, use as `<img>`**.
- node resolves to a published COMPONENT (button, list item, app bar) →
  rebuild from the component spec / copy the proto component.
- node is a simple vector icon with a clean path (chevron, search) → the
  published icon SVG is fine to inline (still prefer the DLS icon export).

When in doubt: if it has gradients, grain, photographic content, or 3D — it's
an image, export it. If it's flat geometry you could redraw identically — it's
an icon, but still prefer the canonical export.
