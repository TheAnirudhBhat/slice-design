---
name: DLS 2.0 Button Group
description: Footer action container — 1 button, 2 vertical, or 2 horizontal layouts with optional header/footer
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, nodes `232:35139`, `1945:22644`

## Container
- Background: white
- Padding: `16px top, 24px horizontal`
- Width: full (360px)
- Scroll state: Above shadow `0px -6px 8px rgba(0,0,0,0.05)`

## Layouts

### 1 Button
- Single primary button, full width (312px)

### 2 Vertical
- Primary on top (312px) + Tertiary below (text only, brand color)
- Gap: 16px

### 2 Horizontal
- Secondary (outline) + Primary (filled), side by side
- Both flex: 1 (equal width)
- Gap: 16px

## Optional Header
- Trust builder: 16px green checkmark + Caption (12px, #00A63E)
- Padding top: 8px

## Optional Footer
- UPI logo row (48px) + gesture nav bar (128x4px)

## R19 update (2026-05-28) — Total due summary layout (4th variant)

The canonical DLS Button group page (`232:35139`) documents **4 layouts**, not 3. The skill previously documented 1 Button / 2 Vertical / 2 Horizontal — the **Total due summary** layout was missing.

### Layout 4: Total due summary + Button (NEW)
Used on bill-pay / payment-confirmation screens where the user reviews an amount before committing.

Anatomy:
- Footer is a **white card-like band** with shadow elevation (lifts off page)
- Leading 2-line text block: Label "Total due" (Caption secondary) + Amount (Body or Heading) with chevron `›` trailing the amount (tap chevron → opens breakdown sheet)
- Trailing: Primary brand pill ("Pay ₹35,000", "Repay")

Layout: `Total due › ₹35,000   [Pay ₹35,000]` — leading text + amount + chevron compact on left, Primary on right.

Used for:
- Bill payment confirmation
- Credit repayment (paired with the rotary dialer — see `reference_dls_screen_layouts.md` Credit Card 2026 recipes)
- Multi-product checkout

Distinct from the standard Primary-only footer (1 Button layout) because the Total due block functions as both a recap (label + amount) and a tap target (chevron → breakdown).

Source: cal:2026-05-28 R19 — DLS molecules sweep, Button group page ✅
