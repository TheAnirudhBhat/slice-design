---
name: DLS 2.0 Tooltip
description: Black tooltip with pointer arrow — 6 orientations, caption text
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, nodes `352:162`, `1910:23240`

## Body
- Background: black | Height: 32px | Padding: 8px | Radius: 8px
- Text: Caption — 12px regular, 16px lh, 0.24px tracking, white, centered
- Shadow: Card elevation `0px 2px 32px rgba(0,0,0,0.05)`

## Pointer
- Size: 12x6px triangle, black
- Edge inset: 12px from body edge

## Orientations
Top left, Top, Top right, Bottom left, Bottom, Bottom right
(Top = pointer on top, body below. Bottom = pointer on bottom, body above.)

## Calibrated rules

### Background color
Tooltip uses a **dark background** (Slate-900 `#252A31` / black). Do NOT use light-bg tooltips with shadow — the inverted colour creates the necessary contrast separation from the white page surface.
Source: cal:2026-05-27 — pair 1610 A ✅

### No arrow pointer
slice tooltips do **not** have a triangle pointer/arrow. Just a rounded rectangle with no directional indicator.
Source: cal:2026-05-21 ✅ (R6 batch)
