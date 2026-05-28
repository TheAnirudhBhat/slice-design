---
name: DLS 2.0 Accordion
description: Collapsible/expandable sections — collapsed (56px) and expanded states, used for FAQs
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, nodes `1272:17393`, `1619:55578`

## Collapsed
- Height: 56px | Background: white
- Padding: `16px 16px 16px 24px`
- Layout: flex, items-center, gap 12px
- Heading: Body Normal — 16px regular, 24px lh, rgba(0,0,0,0.9)
- Chevron: 20px icon in 36px target (8px padding), pointing down

## Expanded
- Padding: `16px 16px 16px 24px` (same) | Background: white
- Layout: flex-col, items-start, gap 12px
- Heading row: flex, items-center, gap 10px, full width
- Chevron: rotated 180deg (pointing up) — **animated** (240ms `out` easing, not instant swap)
- Body: Body Normal — 16px regular, 24px lh, rgba(0,0,0,0.7)
- Body width: 320px (content width minus chevron space)

## Calibrated rules

### Chevron animation
Chevron **rotates** 180° on expand/collapse with `base` duration (240ms) `out` easing. Do NOT swap the icon between a down-arrow and an up-arrow — use a single chevron-down that rotates.
Source: cal:2026-05-27 — pair 1600 A ✅

### Divider between collapsed items
Use an **inset divider** between collapsed accordion rows — not full-bleed, not spacing-only. The divider separates tappable regions and aids scannability.
Source: cal:2026-05-27 — pair 1601 A + reason "inset divider" ✅
