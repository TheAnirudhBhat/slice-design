---
name: DLS 2.0 Dividers
description: Default divider (solid/dashed, full-bleed/inset/middle) and Big section divider (8px)
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, nodes `1952:26869`, `1910:19922`

## Default

### Extent
- **Full-bleed**: edge to edge
- **Inset**: left-indented (24px left padding, aligns with content after icons)
- **Middle**: indented both sides

### Style
- **Solid**: `1px solid rgba(0,0,0,0.05)`
- **Dashed**: `1px dashed rgba(0,0,0,0.05)`

## Big
- **Height**: 8px
- **Background**: #F6F9FC (Slate/10)
- **Width**: full-bleed
- Use for: major section breaks (e.g. between "View Your Wealth" and "Quick Actions")

## Dashed (calibrated 2026-05-17)
Slice uses **dashed full-bleed dividers** between rows in specific list contexts where the rhythm should feel softer than a solid hairline — notably **Spark FD details** (Accumulated Interest / Interest paid till date / Interest to be earned). The dash also signals "these rows belong to one continuous structured table" without the heaviness of a card border.

- Style: `1px dashed rgba(0,0,0,0.1)` (slightly heavier opacity than the solid 0.05, since dashes need it to read)
- Extent: full-bleed within the listing area
- Use when: vertical data table with title-on-left / value-on-right rows, no leading icon, no card chrome

Solid hairlines still cover the avatar-list inset case (transactions, accounts) and most other contexts.

Source: cal:2026-05-17 — review-1108 reference (Spark FD details) ✅
