---
name: DLS 2.0 Elevation
description: Three shadow types — Card (ambient), Above (bottom-fixed), Below (top-fixed)
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, node `115:551`

Shadow color: `rgba(0,0,0,0.05)`

## Card
- `0px 2px 32px 0px rgba(0,0,0,0.05)`
- Diffuse ambient shadow
- Use for: product cards, goal cards, any floating card

## Above
- `0px -6px 8px 0px rgba(0,0,0,0.05)`
- Shadow cast upward
- Use for: fixed bottom elements (footer, button group, chat input)

## Below
- `0px 6px 8px 0px rgba(0,0,0,0.05)`
- Shadow cast downward
- Use for: fixed top elements (app bar on scroll, top navigation)

## Calibrated rules

### Fixed bottom CTA bar: shadow (elevation.above), not hairline
Bottom CTA bars use shadow separation, not a 1px hairline border. But only when there's scrollable content beneath — if the CTA is at the natural end of the page, no separation needed. Note: the default elevation.above shadow may feel "too loud" — use as-is from DLS but be aware.
Source: cal:2026-05-28 — `bottom_bar_elevation_style` A pick + reason "only where scroll, shadow too loud" ✅
