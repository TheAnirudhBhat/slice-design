---
name: DLS 2.0 Chips
description: Compact pill elements — unselected/selected/trailing/badge states for filters and selections
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, node `1861:38329`

## Structure
- Height: 32px | Padding: `8px 16px` | Radius: 64px (pill)
- Gap icon↔text: 4px
- Typography: buttonSmall — 14px medium, 20px lh

## States

### Unselected
- Background: #F6F9FC | Border: `1px solid rgba(0,0,0,0.05)` | Text: rgba(0,0,0,0.9)

### Selected
- Background: #FAE2FA | Border: `1px solid #D30AD7` | Text: #D30AD7

### Trailing
- Selected chip with 16px remove/cross icon

### Badge
- 20px circle, brand bg #D30AD7, inline before/after text

## Solid-fill pill (calibrated 2026-05-17)
For attention-grabbing tags **inside cards** (e.g. "₹0 FEE" on Explore Recharge & bills card), slice uses a **solid-fill pill** rather than the default subtle chip:

- Background: `#D30AD7` (Brand/Valentino 500) — solid fill, not -50 subtle (cal:2026-10-06 user: was Info/Blue 500 `#2B6ACF`)
- Text: `#FFFFFF`, **UPPERCASE**, Caption (12/16/0.24) medium tracking
- Padding: `4px 12px` | Radius: 64px (pill)
- No border, no icon

Use case rule: solid-fill = "feature highlight" (we want you to notice this). Subtle chip = "metadata / filter / state" (informational).

Variant suggestions for the same pattern:
- Positive (e.g. "FREE") → Green 500 solid
- Negative (e.g. "LIMITED") → Red 500 solid
- Brand (e.g. "NEW") → Valentino 500 solid

Source: cal:2026-05-17 — review-1104 reference ("₹0 FEE" solid pill on Explore card) ✅; colour → Valentino 500 by cal:2026-10-06 (user: "Tag should be Valentino color and not this blue")

## Calibrated default config (tune lock 2026-05-21)

```json
{
  "variants": ["info-subtle", "brand-subtle", "positive", "negative", "neutral"],
  "radius": "S (8px)",
  "typography": "Caption 12/16 medium",
  "padding": "2px 8px"
}
```

Source: cal:2026-05-21 — tune-1302 lock. Reason (user): "look fine". Default chip = `info-subtle`; switch variant by intent (brand-subtle for slice fire / Spark, positive/negative for status, neutral for default tag).

## R19 update (2026-05-28) — Chip anatomy corrections

### Icon size: 20px (not 16px)
**Earlier doc (Trailing variant)**: "Selected chip with 16px remove/cross icon."

**Override (R19)**: the canonical DLS Chips page (`1861:38329`) anatomy panel explicitly states: **"20px icons are used inside the chips. They have 48px touch target."**

Use **20px** icon glyphs inside chips (both leading and trailing). The 48px touch target rule still applies — pad the chip's tap area to 48px minimum.

### Disabled state — add as emphasis axis
Earlier doc treated chip states as Unselected / Selected / Trailing / Badge. The canonical DLS adds a **Disabled emphasis axis** (Active / Disabled) crossed with each state.

Disabled chip:
- Opacity reduced (~40-50% of normal)
- No hover, no active, no pressed state
- Same fill colour family as Active but greyed out
- Tap is suppressed
- Used for: filter chips that can't apply in current context, chip pickers where some options are conditionally locked

### Badge with Trailing Icon — combo state
Documented as a separate variant in the canonical file: chip with **both** leading badge AND trailing close icon (e.g. `₹50K [2] ×`). Use when a filter chip carries an item count AND is dismissible.

Source: cal:2026-05-28 R19 — DLS molecules sweep, Chips page anatomy panel ✅
