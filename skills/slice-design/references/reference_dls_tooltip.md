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

### Arrow pointer — REVISED 2026-05-28 (R19)

**Earlier rule (R6, cal:2026-05-21): "slice tooltips do not have a triangle pointer/arrow."**

**Override (R19, cal:2026-05-28)**: the canonical DLS 2.0 Tooltip component (page `352:162`) shows tooltips with **white triangle pointers in 6 orientations** (top-left / top / top-right / bottom-left / bottom / bottom-right). The arrow IS canonical in DLS — see the file header description ("Black tooltip with pointer arrow — 6 orientations").

Why the R6 rule was wrong: it was probably calibrated against a specific in-product tooltip variant (info-icon tooltips inline with text where the pointer competed with the text baseline). Extrapolating that to ALL tooltips was over-correction.

**Use arrow pointers** when the tooltip needs to clearly point at its anchor (most cases). The 6 orientations let you position the pointer based on where the tooltip lands relative to the anchor.

Tooltip body anatomy still applies: 32px tall, black bg (Slate-900), white "Content" text, 8px radius. The pointer is a small triangle protruding from the body (12×6px, same colour as body, edge inset 12px from body edge).

Source: cal:2026-05-28 R19 — DLS molecules sweep, canonical Tooltip page `352:162` shows arrows in 6 orientations ✅

(R6 "no arrow" rule downgraded.)
