---
name: DLS 2.0 Bottom Sheet
description: Modal overlay — 16px top radius, handle, overlay backdrop, content padding, button group footer
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, node `2001:41881`

Variants: Action, Payment, Action + Illustration, Multiple actions, Slot w/ header, Slot w/o header

## Structure (top to bottom)
1. **Overlay backdrop**: rgba(0,0,0,0.3)
2. **Container**: white bg, top corners 16px radius
3. **Header spacer**: 20px tall, rounded top
4. **Content**: padding `16px 24px`
5. **Button group footer**: padding-top 16px, padding-x 24px
6. **Gesture nav**: 8px + 4px bar + 8px

## Typography
- Title (Action): H2 — 24px medium, 32px lh, 0.48px tracking
- Title (Multiple actions): H3 — 20px medium, 24px lh, 0.4px tracking
- Subtext: Body Normal — 16px regular, 24px lh, color rgba(0,0,0,0.7)

## Optional Avatar
- 48px circle, brand bg (#D30AD7), white icon

## Primary Button
- Full width 312px, pill 100px radius
- Brand bg #D30AD7, white text, buttonNormal
- Padding: 12px 24px

## Handle and title style (calibration-confirmed)
- **No handle bar.** Slice bottom sheets do not show the slate-100 pill at the top — the title row alone communicates "sheet". Adding a handle reads as iOS Sheet styling.
- **Title: left-aligned**, sentence case, H3 (or H4 for compact sheets). Not centred.

Source: cal:2026-05-17 — pair 600 reason "no handle" (corrected pick) + pair 601 A "left aligned" ✅
