---
name: DLS 2.0 Footer & Header
description: Footer (payment logos + gesture nav) and Header (trust builder, T&C) — companions to Button Group
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, nodes `893:33090`, `893:38265`, `893:33128`

## Footer
Sits below button group. Shows payment network logo + gesture nav.

### Structure
- Container: 360px wide, flex column
- Logo area: 48px height, centered, padding-x 24px
- Gesture nav: 128×4px pill, rounded 40px, rgba(0,0,0,0.3), 8px vertical padding

### Logo Variants
RuPay on CC, RuPay on CC onColor, BHIM UPI (97×24px), UPI (32×16px), UPI on color, UPI ATM (60×16px), UPI ATM on color, Billpay (60×20px), Autopay (99×24px), IMPS (46×8px), RTGS (44×8px), Placeholder (dashed box)

### Surface
- Default: white bg
- On Color: #d30ad7 bg (for onColor logo variants)

## Header
Sits above button group. Trust indicators or T&C.

### Trust Builder
- `General/Shield` 16×16px + green text, 4px gap
- Font: 12px regular, 16px lh, 0.24px tracking, color #00a63e
- Padding-top: 8px

### T&C
- Height: 24px, centered
- "By continuing, you accept **T&C** and **Privacy Policy**"
- Base: rgba(0,0,0,0.5) | Links: #d30ad7
- Font: 12px regular, 16px lh, 0.24px tracking

### T&C with Checkbox
- Row: Checkbox 48×48px target (24×24px checkbox) + text
- Links: #d30ad7

### Placeholder
- 312×48px dashed box, bg #f6f9fc, "Replace with local component"

## Calibrated rules

### Trust logos: horizontal row on white
Trust/compliance logos (RBI, PCI DSS, etc.) display as a horizontal row. Background is white, never grey. No "Secured by" title above — the logos speak for themselves.
Source: cal:2026-05-28 — `footer_trust_layout` A pick + reason "with logos, never grey, in white" ✅

### T&C link: inline caption with underline
Legal/T&C text below CTAs uses inline Caption text with an underlined brand-colour link ("By continuing, you agree to our T&C"). Not a standalone Text button.
Source: cal:2026-05-28 — `footer_tc_link_style` A pick ✅
