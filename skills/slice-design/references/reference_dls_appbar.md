---
name: DLS 2.0 App Bar
description: Standard app bar (L1+) and L0 app bar — layout, spacing, scroll shadow behavior
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, node `668:3876`

## Standard (L1 and deeper)

Types: **Button**, **Icon**, **Alt button** (trailing slot variants)

### Layout
- Total height: 108px (44px status bar + 64px bar)
- Bar padding: `8px 12px` (XS vertical, S horizontal)
- Background: white
- Scroll state: adds Below shadow `0px 6px 8px rgba(0,0,0,0.05)`

### Leading (nav icon)
- Touch target: 48x48 | Icon: 24x24 | Padding: 12px
- Default: back chevron, always left side

### Title
- Typography: H3 — 20px medium, 24px line-height, 0.4px tracking
- Color: rgba(0,0,0,0.9)
- Layout: flex-1, left-aligned (not centered), overflow ellipsis

### Trailing
- **Button**: brand color text, buttonSmall (14px medium), pill, `16px 8px` padding
- **Icon**: up to 2 icon buttons, 48x48 with 24px icons
- **Alt button**: pill with `1px solid rgba(0,0,0,0.05)` border, 16px icon + 14px text, `8px 12px` padding, 24px radius

## L0 (top-level pods)

Per-pod variants: Banking, Explore, Credit, Activity, Payments

### Layout
- Height: 64px (excluding 44px status bar)
- Padding: `8px` vertical, `24px` left, `20px` right
- Gap: 8px between title and trailing

### Title
- Typography: H2 — 24px medium, 32px line-height, 0.48px tracking
- Color: rgba(0,0,0,0.9), left-aligned

### Trailing
- Avatar (40px in 48px target) and/or icon buttons
- Scroll state: adds Below shadow

## L0 — Avatar required
The Avatar top-right slot on App bar/L0 is **not optional** — it's required on every pod-root surface (Banking, Explore, Payments, Credit, Activity). Identity belongs in the corner of every home.

Source: cal:2026-05-17 — pair 611 reason "avatar is necessary for the L0 app bar" ✅

## Standard — back icon = chevron, not arrow
Leading icon on App bar/Standard is a **chevron ‹** (slice icon set's back glyph), not a left arrow ←.
Source: cal:2026-05-17 — pair 604 reason "our back is a chevron not an arrow" ✅

## Standard — close (X) variant for terminal flows
On terminal screens with no "back" destination (payment success, full-screen pay flow, modal-style takeovers), the leading icon is an **X close** (not chevron back). No title in this variant — the screen content is the title.

Use cases:
- Payment confirmation success ("Paid ₹X,XXX")
- Brand-immersive pay-to-person screen (V-500 full-fill)
- Any "you're done, dismiss" terminal state

Source: cal:2026-05-17 — review-1102 reference (Paid ₹18,000 confirmation), review-1109 (Pay person brand-immersive)

## Standard — trailing utility icon
Standard app bars commonly carry a **single trailing utility icon** (24×24, neutral text color) — pattern-specific:
- Balance / Savings → **eye** (hide / show balance)
- Spark FD details → **chat** (help / support)
- Credit bill summary → **pie chart** (spend analytics)
- Pay screen → **card** (switch payment instrument)
- Action centre / Notifications → none, the entire screen IS the inbox

Trailing icons are not menus or overflow — each one is a direct action affordance for that surface.

Source: cal:2026-05-17 — review references 1101, 1108, 1111, 1112

## Standard — dynamic title with amount
When a flow has an active value (e.g. Pay screen with running amount), the App bar title can be **dynamic**: `Pay ₹2,000`. The amount lives in the title, not a separate hero row.

This applies to mid-flow surfaces where the amount is the primary context.

Source: cal:2026-05-17 — review-1112 reference (Pay ₹2,000 in title)

## L0 — trailing slice-currency pill
On Rewards / Fires surfaces, the L0 App bar trailing slot can be a **slice-currency pill** (white bg + outline-subtle border + valentino ₹-glyph avatar leading + amount value) — e.g. `₹43,230` with the slice ₹ icon. This replaces the photo Avatar in this specific pod.

Source: cal:2026-05-17 — review-1103 reference (Rewards L0)
