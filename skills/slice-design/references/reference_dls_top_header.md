---
name: DLS 2.0 Top header
description: Top header molecule — caption + Display amount + insight row + optional buttons + optional callout. Used as L1 balance hero (Banking), atom L1 totals, FD list summary, and other "value + insight" surfaces.
type: reference
---
Figma source: `PNUz3Dr9KSlFJSnsXsC0nL` page `2327:21619` ("Top header")

The Top header is a **centered-stack hero block** for L1+ surfaces that need to show a value (balance, total, available limit) with optional insight + actions. Distinct from L0 cards (which are full card surfaces with chrome) and from in-card hero patterns (which sit inside a Card component).

## Anatomy (vertical stack, all elements centered)

```
┌─────────────────────────────────────┐
│ Caption (Body / Caption tertiary)   │  ← "Total balance" / "Available limit" / "Total saved"
│ ₹76,039.49                          │  ← Display amount (Display/Small ~48-64px, primary text)
│ ↗ Earn at RBI repo rate 6.25% p.a   │  ← Insight row (icon + brand-purple OR green text)
│                                     │
│ [ Primary button full-width ]       │  ← Optional — 1 button or 2 side-by-side
│ OR                                  │
│ [ Tertiary outline ]  [ Primary ]   │  ← 2 buttons variant
│                                     │
│ ┌─ Avatar │ Title  Subtitle ─┐      │  ← Optional User Action Request callout
│ └─────────────────────────────┘     │
└─────────────────────────────────────┘
```

## Token specs (from DLS canonical)

- **Region size**: 360 × ~384px (within page; height varies by content)
- **Padding**: 24px horizontal
- **Vertical rhythm**: 16px between caption ↔ amount, 8px between amount ↔ insight, 24px between insight ↔ button (or callout), 24px between button ↔ callout

### Caption (above amount)
- Body / Caption tertiary, ~14px Rubik Regular
- Color: `rgba(0,0,0,0.5)` (text-tertiary) light mode / `rgba(255,255,255,0.5)` dark mode
- Examples: "Total balance", "Available limit", "Total saved in atom"

### Amount (the hero)
- Display/Medium ~48-64px Rubik Medium
- Color: text-primary (`#0E0E12` light / `#FFFFFF` dark)
- ₹ symbol matches digit weight + size (NEVER subscript)
- Indian number grouping (`₹1,00,000` not `₹100,000`)

### Insight row (below amount, optional)
- Caption / Body small ~12-14px Rubik Regular
- Leading icon (↗ / ↘ / sparkle / fire icon) — sized to text line height
- **Color encodes meaning**:
  - **Brand purple V-500** for product-context insights (e.g. "Earn at RBI repo rate 6.25% p.a", "Earning at 100% RBI repo rate")
  - **Positive Green `#00A63E`** for delta-positive (gains, interest earned)
  - **Red** for delta-negative (losses) — rare on this surface

### Button group (below insight, optional)
Two variants observed:

**Type=Default (single button)**:
- Full-width Primary pill V-500
- Verb + value text label ("Add money", "Invest now", "Transfer")

**Type=Two buttons (2 grey side-by-side)**:
- Two equal-width pills, 12px gap
- Both can be Secondary (slate-10 fill, slate text) for balanced choices OR Tertiary outline + Primary for asymmetric choices

### User Action Request callout (below buttons, optional)
- Full-width Radius L (16) pill / banner
- Positive Green subtle bg (or other status colour per intent)
- V-500 Bold Avatar leading (~32-40px circle with white line icon)
- Title H4 + Subtitle caption secondary
- Optional trailing CTA pill
- See `reference_dls_user_action_banners.md` for the full 8-colorway taxonomy.

## Dark mode

| Element | Light | Dark |
|---|---|---|
| Page surface | `#FFFFFF` | `#000000` |
| Caption | `rgba(0,0,0,0.5)` | `rgba(255,255,255,0.5)` |
| Amount | `#0E0E12` | `#FFFFFF` |
| Brand-purple insight | V-500 `#D30AD7` | V-500 (unchanged) |
| Green insight | `#00A63E` | `#00A63E` (unchanged) |
| Primary button | V-500 fill, white text | V-500 fill, white text (unchanged) |

## When to use Top header vs L0 card vs in-card hero

| Surface | Pattern |
|---|---|
| L0 pod home with balance (Banking) | **L0 Large card** with balance inside the card. Top header NOT used at pod L0. |
| L1 deep-dive on balance (e.g. dedicated "Total balance" screen from L0 entry) | **Top header** centered on white page bg. |
| L1 sub-product (Atom returning-user L1) | **Top header** with mid-screen Primary CTA (per Atom recipe). |
| L1 credit card limit dashboard (Credit Card L1) | White card hero (not Top header) — has identity + limit + status callout combined. |
| FD list summary | **Top header** with "Total saved" / total amount + button stack. |

WHY the distinction: L0 cards establish the pod's home identity (Savings, Spends, Activity). Top header is for L1+ surfaces where the value IS the focus and there's no surrounding L0 chrome competing. In-card hero patterns belong to specific composite cards (Credit Card L1's limit-and-status card).

## Composition rules

1. **Always centered.** Caption + amount + insight + button(s) all centre-aligned. Left-aligned amounts belong inside L0 cards (Banking Savings hero), not Top header.
2. **Single insight row.** Don't stack multiple insight rows below the amount — one signal is enough. If multiple insights matter, use a separate Card section below.
3. **Button group is optional.** Top header without buttons is valid on surfaces where actions live elsewhere (e.g. FD list — the cards below ARE the actions).
4. **User Action Request callout is the lowest-priority element.** It's a nudge, not the main affordance. If the screen needs to push a CTA, use the button group; if it needs to inform, use the callout.

## Confidence

This molecule was **entirely undocumented** in the slice-design skill prior to R19. Anatomy extracted from canonical DLS file page `2327:21619`. High confidence on structure; specific token values (rgba, exact px) verified against design context where possible.

Source: cal:2026-05-28 R19 — DLS molecules sweep ✅
