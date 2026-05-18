---
name: DLS 2.0 Chips
description: Compact pill elements — unselected/selected/trailing/badge states for filters and selections
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, node `1861:38329`

## Structure
- Height: 32px | Padding: `8px 16px` | Radius: 64px (pill)
- Gap icon↔text: 4px
- Typography: buttonSmall — 14px medium, 20px lh

## States

### Unselected
- Background: #F6F9FC | Border: `1px solid rgba(0,0,0,0.05)` | Text: rgba(0,0,0,0.9)

### Selected
- Background: #FAE2FA | Border: `1px solid #D30AD7` | Text: #D30AD7

### Trailing
- Selected chip with 16px remove/cross icon

### Badge
- 20px circle, brand bg #D30AD7, inline before/after text

## Solid-fill pill (calibrated 2026-05-17)
For attention-grabbing tags **inside cards** (e.g. "₹0 FEE" on Explore Recharge & bills card), slice uses a **solid-fill pill** rather than the default subtle chip:

- Background: `#2B6ACF` (Info/Blue 500) — solid fill, not -50 subtle
- Text: `#FFFFFF`, **UPPERCASE**, Caption (12/16/0.24) medium tracking
- Padding: `4px 12px` | Radius: 64px (pill)
- No border, no icon

Use case rule: solid-fill = "feature highlight" (we want you to notice this). Subtle chip = "metadata / filter / state" (informational).

Variant suggestions for the same pattern:
- Positive (e.g. "FREE") → Green 500 solid
- Negative (e.g. "LIMITED") → Red 500 solid
- Brand (e.g. "NEW") → Valentino 500 solid

Source: cal:2026-05-17 — review-1104 reference ("₹0 FEE" blue solid pill on Explore card) ✅
