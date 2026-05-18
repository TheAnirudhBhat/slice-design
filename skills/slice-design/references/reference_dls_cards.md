---
name: DLS 2.0 Cards
description: L0 Large/Medium/Small, Explore cards (Large/Medium/Small), To-do v1/v2, Marketing, Cashback, Scratch, CC card, Spark card. Pod content patterns + sizes + HTML.
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, node `1563:54557`

## Card Surface (all cards share)
- Background: `#FFFFFF`
- Border: `1px solid rgba(0,0,0,0.05)` (outline-subtle)
- Border radius: `16px` (M)
- Shadow (Card elevation): `0px 2px 32px 0px rgba(0,0,0,0.05)`
- Internal padding: `24px` (L) on all sides
- Stack gap (between L0 cards in a column): `16px`

---

## L0 card / Large

Top card on an L0 screen. Highlights the most important content/action per pod.

**Component key:** `e5e0b7865245f3b535fcb8b9582a57003df82d07` | Gallery: `6422:2321`

### Specs
- Width: 312px (fills 360 − 48 page padding)
- Padding: 24px
- Internal gap: 32px between content block and footer block
- Heading: `buttonSmall` (14px Medium, 0.28px tracking), color `rgba(0,0,0,0.5)`
- Number: `Display/Small` — 48px Medium, 56px line-height, -0.48px tracking, color `rgba(0,0,0,0.9)`
- Insight row: 16px icon + `buttonSmall` text, gap 8px, positive `#00A63E` / brand `#D30AD7`
- Optional marketing sub-card inside: bg `#F6F9FC`, padding 16px, radius 16px, gap 12px

### Pod content patterns
- **Banking** — Savings balance + "Grow your savings" CTA → savings detail
- **Credit** — Total spends + "Paid ₹X to merchant" insights
- **Explore** — Bills/recharge shortcuts or featured offer
- **Payments** — UPI balance on **brand purple** background (text/icon switch to On-Color tokens)

### Example HTML

```html
<div style="
  padding: 24px;
  border-radius: 16px;
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 2px 32px rgba(0,0,0,0.05);
  display: flex; flex-direction: column; gap: 32px;
">
  <!-- Content -->
  <div style="display:flex; flex-direction:column; gap:24px;">
    <span style="font-family:Rubik; font-size:14px; font-weight:500;
                 color:rgba(0,0,0,0.5); letter-spacing:0.28px;">
      Savings ••••5732
    </span>
    <div style="display:flex; flex-direction:column; gap:16px;">
      <span style="font-family:Rubik; font-size:48px; font-weight:500;
                   line-height:56px; letter-spacing:-0.48px; color:rgba(0,0,0,0.9);">
        ₹45,800
      </span>
      <div style="display:flex; align-items:center; gap:8px;">
        <svg width="16" height="16" fill="#00A63E"><!-- up arrow --></svg>
        <span style="font-family:Rubik; font-size:14px; font-weight:500;
                     color:#00A63E; letter-spacing:0.28px;">
          Earn interest at 100% RBI repo rate
        </span>
      </div>
    </div>
  </div>
  <!-- Footer with divider -->
  <div>
    <hr style="border:none; border-top:1px solid rgba(0,0,0,0.05); margin:0;" />
    <div style="display:flex; align-items:flex-end; gap:8px; padding-top:16px;">
      <div style="flex:1;">
        <span style="font-family:Rubik; font-size:14px; font-weight:500;
                     color:#D30AD7; letter-spacing:0.28px; display:block;">
          Grow your savings
        </span>
        <span style="font-family:Rubik; font-size:12px;
                     color:rgba(0,0,0,0.7); letter-spacing:0.24px; display:block;
                     margin-top:4px;">
          Earn interest daily
        </span>
      </div>
      <button style="padding:8px 16px; background:#D30AD7; border:none;
                     border-radius:100px; font-family:Rubik; font-size:14px;
                     font-weight:500; color:white;">
        Add money
      </button>
    </div>
  </div>
</div>
```

---

## L0 card / Medium

Sits below the Large card. For campaigns, secondary products, marketing.

**Component key:** `7a9a4244b860ccc0515f79e1356fd8872c8f3df6` | Gallery: `6422:2448`

### Specs
- Min height: 176px | Padding: 24px | Internal gap: 24px
- Title: H3 (20px Medium, 24px lh, 0.4px tracking)
- Subtitle: Caption (12px Regular, 0.24px tracking), color `rgba(0,0,0,0.7)`
- CTA: Grey button (Small) — Slate/30 (`#F0F4F7`) bg, pill
- Optional decorative illustration: positioned absolute, right-aligned (~96×96)

### Pod content patterns
- **FD / Banking** — FD balance + interest rate insight
- **monies** — Rewards points + reward rate
- **Credit card** — Card image / benefit highlight

---

## L0 card / Small

Two Small cards side by side can replace one Medium.

**Component key:** `c7803539b4ee18360b00cae376179155bdd7d2c7`

### Specs
- ~148×172px (half content width minus 16px gap)
- Same surface (radius/shadow/border) | Compact content layout

---

## L0 card / CC Card

Credit card visual representation.

**Component key:** `a13e149392fb52e486c6cae88f5301b26e52c872`

## L0 / spark card

Spark prepaid card visual.

**Component key:** `8e31086a3f19302d6620b4fc0177dedce262f140`

---

## Explore Cards

Cards for the Explore pod — features, insights, promotions.

**Component key:** `3b9cfda0cec7da4b618c3f650b57a645149a7cdc`

### Sizes
| Variant | Dimensions |
|---------|------------|
| Large | 312 × 160 |
| Medium | 148 × 148 |
| Small | 148 × 66 |

Error state variant available.

---

## To-do card v1 / v2

Actionable task cards on L0 — "Complete KYC", "Set up UPI", "Add bank account". Dismissable, time-sensitive. Sit between or above L0 cards.

| Variant | Key | Gallery |
|---------|-----|---------|
| To-do card v1 | `d4ed94449314848e93d2a48ff2c56fd1e3eb0cce` | `6410:1777` |
| To-do card v2 | `780a640c111f4a080fefaedba7b81220214b0206` | — |

---

## Marketing card

Promotional card for campaigns and offers.

**Component key:** `20e48675dac5273c1580bb78c5ffd69437c265b9`

## 3 cards carousel

Horizontal scrolling carousel of 3 cards.

**Component key:** `011c2b186c494e8de57b4a54161fd4faf4cdabba`

---

## Cards / Card management family

Specialised cards for credit-card flows.

| Card | Key | Usage |
|------|-----|-------|
| Cards/Card | `b614d8f6998730a260321ea01f6679c4142a8a5d` | Generic card component |
| Cards/Card delivery | `08529197a2d50f64964766225ed1ed33fa3c9abe` | Physical card delivery tracking |
| Cards/Card status | `fe60afa67a8d2ee04bdfd9bb286c8ee00c4264d9` | Card activation status |
| Cards/Add money on card | `6375eaafb66a11646c5bba0dc75b1297f098c317` | Add money to prepaid |
| Cards/Book physical card | `cd2f9a21e1f7f9060e70947c8663e0237e42bbbf` | Order physical card CTA |

---

## Cashback / Scratch

| Card | Key | Usage |
|------|-----|-------|
| Card cashback | `e33574038f62dc738fe282e55fb05650f2062c68` | Cashback display |
| Card cashback reversed | `2d165a903d60fa46ca5732146ec512cdd5bee316` | Reversed cashback |
| Scratch card | `dc01290e40d14bee4ef82501b46623698d0d98f0` | Gamified scratch card |

## Credit card benefits

**Component key:** `c670e3883abdffcfa34583910aebb06f9aeb8290`

Display card benefit highlights.

---

## In-card Header (rule)

When a card carries its own internal header (title + optional CTA), follow these rules (source: explore-base 670dfc3, validated 2026-05-12):

- **No leading icon** on the title. The card's own framing already provides identity; an icon to the left of the title doubles the visual anchor.
- **No divider/hairline below the header.** The card's border already separates the heading from content; a second line below the title doubles the boundary.
- Header sits at the top of the card's internal padding. Spacing below the header → first content row is `16px`.
- Title uses `H4` (16px Medium, 0.32px tracking, `rgba(0,0,0,0.9)`).
- Optional CTA on the trailing edge uses `buttonSmall` (14px Medium) in Valentino `#D30AD7`.

### Layout
```
┌──────────────────────────────────────────┐
│  Title (H4)                       CTA    │  ← no icon, no divider below
│                                          │
│  ↕ 16px                                  │
│  Content starts here                     │
│                                          │
└──────────────────────────────────────────┘
```

## Common Card CSS

All L0 cards share this base:

```css
.card {
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 16px;
  box-shadow: 0 2px 32px rgba(0,0,0,0.05);
  padding: 24px;
  display: flex;
  flex-direction: column;
}
.card-label {
  font-family: Rubik;
  font-size: 14px; font-weight: 500;
  line-height: 20px; letter-spacing: 0.28px;
  color: rgba(0,0,0,0.5);
}
.card-amount {
  font-family: Rubik;
  font-size: 48px; font-weight: 500;
  line-height: 56px; letter-spacing: -0.48px;
  color: rgba(0,0,0,0.9);
}
.card-insight {
  display: flex; align-items: center; gap: 8px; min-height: 24px;
}
.card-insight-text {
  font-family: Rubik;
  font-size: 14px; font-weight: 500;
  letter-spacing: 0.28px;
}
```

## Outline-border card (Action centre / Notifications)

Calibrated 2026-05-17 — review-1113 reference frame.

Cards in the **Action centre** (slice's name for the notifications feed) use a **1px outline-subtle border** instead of the shadow elevation token. This subtle treatment de-emphasises individual items so the stack reads as a peaceful list of opportunities, not a dashboard of alerts.

### Anatomy
- Border: `1px solid rgba(0,0,0,0.05)` (outline-subtle)
- Radius: 24px (Radius/L) — larger than the standard 16
- No shadow / elevation token
- Padding: `20px 20px 24px` (L-bottom)
- Background: white on white page (slate-10 page bg also acceptable)

### Layout (single notification card)
- **Top row**: title (H3 left, 20/24 medium) + small avatar (S-32 or M-40) **top-right** corner — avatar size and emphasis subtle (V-50 bg, V-500 line glyph)
- **Body**: secondary-color body text on next line(s), max ~2 lines
- **CTA (optional)**: Primary pill **bottom-left inside the card** — never trailing the title, never below the card

### Stacking
- 12px gap between cards
- Page padding 16px sides (cards inset)

### When to use this variant
- Notifications / Action centre
- Promo / nudge cards that should feel calm (border-only is quieter than shadow)

### When NOT to use
- Hero / income / balance cards → these keep the shadow elevation chrome (read as "first-class surface")
- In-flow content cards → shadow
- Anywhere the card needs to "lift off" the page
