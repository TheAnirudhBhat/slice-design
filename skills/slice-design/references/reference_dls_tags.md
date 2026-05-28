---
name: DLS 2.0 Tags
description: Status pill badges — Intent (Positive/Negative/Warning/Info/Brand/Neutral) x Emphasis (Subtle/Bold)
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, nodes `416:1142`, `1910:22980`

## Structure
- Padding: `4px 8px` | Radius: 100px (pill)
- Typography: Metadata — 10px regular, 12px lh, 0.4px tracking, UPPERCASE
- Layout: flex, items-center, justify-center

## Subtle (light bg, colored text)

| Intent | Background | Text |
|--------|-----------|------|
| Positive | #E0F4E8 | #00A63E |
| Warning | #FFF3E3 | #C27511 |
| Negative | #F9E4E5 | #CE1D26 |
| Brand | #FAE2FA | #D30AD7 |
| Info | #E6EDF9 | #2B6ACF |
| Neutral | #F6F9FC | #252A31 |

## Bold (dark bg, white text)

| Intent | Background | Text |
|--------|-----------|------|
| Positive | #00A63E | white |
| Warning | #FF9A17 | white |
| Negative | #DA535A | white |
| Brand | #D30AD7 | white |
| Info | #2B6ACF | white |
| Neutral | #252A31 | white |

## Calibrated rules

### Default emphasis: Subtle
Tags in list rows use **Subtle** emphasis (light bg + coloured text) by default. Bold is reserved for promotional surfaces and marketing cards.
Source: cal:2026-05-28 — `tag_emphasis_in_list` A pick ✅

### Tag placement on cards: inside, not floating
Tags sit inside the card content area (first element, above title). Never float above the card's top edge.
Source: cal:2026-05-28 — `tag_placement_on_card` A pick ✅

### Tag text: Caption size (12px) preferred, colour secondary/tertiary
When tags feel too small at Metadata 10px, use 12px Caption size. Tag text colour should lean secondary/tertiary, not full-intensity primary colour.
Source: cal:2026-05-28 — `tag_text_size` neither + reason "right is better but colour should be secondary/tertiary" ✅
