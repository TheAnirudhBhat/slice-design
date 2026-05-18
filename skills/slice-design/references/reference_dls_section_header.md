---
name: DLS 2.0 Section Header
description: Section header types — List, Bold, Bold+CTA, Pay with UPI
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, nodes `686:5876`, `1978:21002`

## List
- Background: #F6F9FC
- Padding: `8px 24px`
- Typography: Metadata — 10px regular, 12px lh, 0.4px tracking, UPPERCASE
- Color: rgba(0,0,0,0.5)

## Bold
- Background: transparent
- Padding: `24px 24px 12px`
- Typography: H4 — 16px medium, 20px lh, 0.32px tracking
- Color: rgba(0,0,0,0.9)
- Optional trailing chevron (20px, rotatable for collapse)

## Bold with CTA
- Same as Bold, min height 48px
- Padding: `0 24px`
- Trailing: text button, buttonSmall, brand color #D30AD7
- **Layout: header text and CTA flex to opposite ends; the middle space auto-flexes.** No fixed gap — `justify-content: space-between` (effectively).
- **Use text CTA, not a chevron** — chevron on section headers is anti-pattern (see reference_anti_patterns.md).
- Source: cal:2026-05-17 — pair 505 A ✅ + reason "space middle should auto flex"

## Pay with UPI
- Background: #F6F9FC
- Padding: `8px 24px`
- Text: Metadata UPPERCASE "PAY WITH" + UPI logo inline, gap 4px

## Onboarding Variant
- Same types but horizontal padding: 32px (XL) instead of 24px

## Settings groups use List headers
Settings screens group rows under **List section headers** (grey #F6F9FC bg, UPPERCASE Metadata), not Bold. The List header reads as a quiet group label; Bold would compete with the row content's hierarchy.

Source: cal:2026-05-17 — pair 617 A ✅
