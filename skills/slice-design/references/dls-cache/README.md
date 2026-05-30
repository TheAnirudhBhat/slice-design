# DLS 2.0 cache

Local cache of the slice **DLS 2.0** published Figma library so component lookups don't require a round-trip to Figma every time.

- **fileKey:** `ncGqxiE6wUOqgOURwHx6Hp`
- **calibrated:** 2026-05-30
- **scope:** 380 top-level components (115 component sets + 265 standalone)

## Three-tier model

The cache is deliberately layered so you read the cheapest source that answers the question.

**Tier 1 — `COMPONENT_INDEX.md` (this dir).**
The master index. Lists *every* one of the 380 components with its `type`, `nodeId`, `key`, and (for sets) variant names. Grouped by category (screen templates, app chrome, buttons, cards, list items, inputs, status, overlays, footers, iconography, illustrations). This is the source of truth for *what exists* and *how to address it*. It does not carry full specs (padding, colors, typography, tokens).
Raw API payloads are in `raw/components_offset_{0,100,200,300}.json` (the four pages the index was built from).

**Tier 2 — `reference_dls_*.md` (in the skill root, not this dir).**
Full specs — layout, tokens, states, do/don't — for the common, high-traffic components: app bar, buttons, cards, list items, inputs, status, tags, sheets, nav, PDP. These are hand-curated and already cached. If the component you need is one of these, read the matching `reference_dls_*.md` and stop.

**Tier 3 — fetch-on-miss from Figma.**
For any component *not* covered by a Tier 2 file, pull it live from Figma using the `nodeId`/`key` recorded in Tier 1, then **write the spec back** into the appropriate `reference_dls_*.md` so the next lookup is a Tier 2 hit. The cache improves as it's used.

## Lookup workflow

1. **Grep `COMPONENT_INDEX.md`** for the component name (or category section). Read off its `nodeId` and `key`.
2. **Is it a common component** (app bar, button, card, list item, input, status, tag, sheet, nav, PDP)? → open the matching **`reference_dls_*.md`** (Tier 2) for the full spec. Done.
3. **Otherwise (Tier 3 miss):** fetch the spec from Figma with that `nodeId` —
   - official MCP `get_design_context` (code + screenshot), or
   - figma-console `figma_get_node` + official `get_screenshot`.
   Then **write the spec back** into the right `reference_dls_*.md` (promoting it to Tier 2), and capture any screenshot under `screenshots/`.

## On-demand artifacts

`screenshots/` and `components/` (per-component spec dumps) are **not** pre-populated — they're added the first time a component is fetched in Tier 3. The repo ships with only the index + raw pages; everything else grows on miss.

## Refresh / recalibration

Re-run the four `figma_get_library_components` pages (`limit=100, offset=0/100/200/300`, `includeVariants=false`) against fileKey `ncGqxiE6wUOqgOURwHx6Hp`, overwrite the `raw/*.json` files, and regenerate `COMPONENT_INDEX.md`. Confirm the last page returns `hasMore=false` and `pagination.total` stays 380 (counts drift when the library publishes new components — update the header if so).

> Note: call the library pages with `includeVariants=false`. Passing `true` injects standalone VARIANT rows and reports an inflated `pagination.total` (~1250); the clean call returns the 380 top-level records with nested variant arrays intact.
