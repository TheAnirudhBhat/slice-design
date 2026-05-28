---
name: DLS 2.0 Slider
description: Horizontal range slider — track + thumb, Min/Mid/Max states
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, nodes `1955:16555`, `1956:23186`

## Structure
- Container: 232×40px
- Track bg: full width, 4px height, rounded 56px, color #eaebed (background/disabled)
- Track filled: left-aligned, 4px height, rounded 56px, color #d30ad7 (main/primary)
- Thumb: 24×24px circle, #d30ad7, shadow `0px 6px 8px rgba(0,0,0,0.05)` (Below)

## States
- **Min**: thumb at left, filled ~21px
- **Mid**: thumb at ~34%, filled ~80px
- **Max**: thumb at right, filled ~95%

Drag thumb to change value. Filled track follows thumb position.

## Calibrated rules

### Value display
Do NOT add a tooltip bubble above the thumb or a highlighted value in the range labels row. The selected value is already displayed in the screen content above the slider (e.g. as the page heading or in a dedicated value label). The slider's own display is just the track + thumb.
Source: cal:2026-05-27 — pair 1602 neither + reason "value already under label up top" ✅
