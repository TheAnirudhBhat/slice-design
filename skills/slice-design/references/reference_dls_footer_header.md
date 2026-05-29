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

## R19 update (2026-05-28) — Bharat Connect + trust-header icon

### Bharat Connect band — new payment logo variant
The canonical DLS Footer & header page documents **Bharat Connect** as a distinct payment-logo band — missing from the earlier Logo Variants list. Updated list of canonical bands:
1. RuPay + UPI inline (RuPay on CC)
2. UPI Autopay (full name)
3. **Bharat Connect** (new)
4. BHIM UPI (97×24px)
5. UPI / Powered by UPI (32×16px)
6. UPI ATM (60×16px) — and UPI ATM on color (brand-purple bg, white logo)
7. Billpay (60×20px)
8. IMPS / RTGS (separate 46×8 / 44×8 marks)
9. Placeholder

Use Bharat Connect band on bill-pay flows where the BBPS protocol applies. Sits at the same 48px-tall logo band height as the others.

Source: cal:2026-05-28 R19 — DLS molecules sweep, canonical Footer & header page ✅

### Trust header icon: green CHECKMARK, not shield
**Earlier doc (this file, Trust Builder section)**: leading icon = `General/Shield` 16×16.

**Override (R19)**: the canonical DLS shows the trust header with a **green checkmark** (`Status/Tick` 16×16), not a shield. Same copy ("Trusted by more than 3 million customers"), same green colour (`#00A63E`), different icon.

Why: a checkmark reads universally as "verified / trusted"; the shield was a different security-language motif that slice doesn't use here. Aligns the trust header with slice's status-tick conventions (used on Status/Tick across other surfaces).

Updated recipe:
- Leading: `Status/Tick` 16×16
- Copy: "Trusted by more than 3 million customers"
- Color: `#00A63E` green text
- Spacing: 4px between check and text (existing rule unchanged)

Source: cal:2026-05-28 R19 — DLS molecules sweep, Footer & header page shows tick not shield ✅
