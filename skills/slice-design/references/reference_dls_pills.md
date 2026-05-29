---
name: DLS 2.0 Pills (segmented control)
description: Pill segmented control — slice's filter/state-toggle pattern, used instead of Tabs
type: reference
---

Slice doesn't use Tabs as a UI pattern. For filtered views, switch between modes, or "show me X vs Y" choices, slice uses **pills** (segmented control).

## Anatomy
- Container: slate-10 (`#F6F9FC`) bg, 1px outline-subtle border, Radius Circle (100px), 4px internal padding
- Active option: white bg, 1px subtle shadow (`0 1px 2px rgba(0,0,0,0.06)`), V-500 text, Rubik Medium
- Inactive options: transparent bg, secondary text colour
- Heights: 38px (regular), 32px (small)
- Internal padding per option: 8px vertical, 16–20px horizontal (depending on content width)

## When to use
- Filter a list (All / Sent / Received)
- Toggle a binary or ternary state (Cards / UPI / All)
- Pick a mode in a single surface (Day / Week / Month)

## When NOT to use
- Top-level navigation between pods → use Bottom nav
- Many options (5+) → use a Bottom sheet with selection list
- Mutually exclusive but rare states → use a Bottom sheet picker

## Anti-pattern
Using a **Tabs** component (underline-style top bar) in slice product surfaces. See `reference_anti_patterns.md`.

Source: cal:2026-05-17 — pair 504 reason "no tabs in slice, we only have pills" ✅

## R19 update (2026-05-28) — Tabs vs Pills terminology

**Naming reconciliation**: the canonical DLS file calls this molecule "Tabs" (page `486:2793`), but slice's skill calls it "Pills" — and the existing anti-pattern bans the iOS-style underlined tab bar. Both terms refer to the **same component family** (slate-10 track + white-thumb segmented control).

What this skill means by each term:
- **Pills** = the slice-canonical segmented control (slate-10 track + white-thumb on active, V-500 text on active). This is the DLS molecule named "Tabs" — terminology mismatch only, same component.
- **Tabs (banned)** = iOS-style underlined top-bar tabs (no track, just underlined labels with the active state on a coloured underline). slice does NOT use this pattern.

Treat "pills" and the DLS "Tabs" as the same thing. The ban is on the underlined-style only.

Cross-reference: `reference_dls_tabs.md` for the legacy tabs-component reference (screens that historically used the old Tabs molecule — now consolidated under Pills).

## Action Pills (R19 — new molecule for V-500 brand-immersive surface)

A distinct pill family used on the Payments L0 brand-immersive surface. **Not** segmented control.

Full anatomy + spec in `reference_dls_screen_layouts.md` § Payments L0 — Action Pills row. Summary:
- Translucent-white fill (~10-14% on V-500, ~22% highlighted)
- 36px tall, Circle radius (18)
- 3 width variants: compact 94, long 195, extra-long 214
- Leading logo / glyph (UPI wordmark, monies, fires, marketing icons)
- Inline text Rubik Medium 12pt, white
- Functions: identity anchor (UPI), product balance (monies, fires), campaign nudge (marketing)

Different from segmented-control pills:
- Action pills = inline information chips on a brand-immersive surface, not a filter selector
- Different visual language (translucent-white fills) and different role (informational + tap-to-act-on-content, not filter-state-toggle)
- Used ONLY on V-500 brand-immersive surface (Payments L0 dialer)

Source: cal:2026-05-28 R19 — Valentino file `J8xKGFeQ5JoDJZdaUXiLPz` node `8772:12216`
