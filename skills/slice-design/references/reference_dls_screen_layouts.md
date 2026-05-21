---
name: DLS 2.0 Screen Layouts
description: Screen recipes — L0 (home), L1 (list/balance), L2 (form/confirmation), Activity. Composition rules + HTML scaffold.
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`

## Screen Frame (every screen)

```css
.screen {
  width: 360px;
  min-height: 720px;       /* extends with content */
  border-radius: 16px;
  background: #FFFFFF;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.screen > * { flex-shrink: 0; }
```

## Screen Hierarchy

| Level | Name | App Bar | Footer | Example |
|-------|------|---------|--------|---------|
| L0 | Home / Root | App bar/L0 (108px) | Bottom nav (~120px) | Banking, Explore, Payments, Credit, Activity |
| L1 | List / Balance | App bar/Standard (108px) | Gesture nav (20px) | Transaction history, FD list |
| L2 | Sub-detail / Form | App bar/Standard (108px) | Button group + Gesture nav | Transaction detail, payment form |
| Modal | Bottom sheet | Sheet handle | Sheet footer | Payment confirmation, options |

## Composition rules (calibration-confirmed)

### List section header must not directly follow App bar
A List section header (grey `#F6F9FC` bg, Metadata UPPERCASE) cannot be the first content row beneath the App bar — its grey bg touching the App bar reads as a malformed second nav. Always have a content row between them.

Correct: `App bar → Top header / Balance / At-a-glance → [Divider/Big] → List header → rows`
Wrong:   `App bar → List header → rows`

If there's genuinely no top content, switch to a **Bold** section header (transparent bg, H4) — Bold sits on white and doesn't double-up on the nav.
Source: cal:2026-05-17 ✅

### Top header alignment by surface
- **In the App bar zone** (top of L0, beside or below the pod title): **left-aligned**. Caption above, amount/value left-flush.
- **In an L0 card / hero card** (the big-number-on-card pattern): **right-aligned** (or left-aligned with the amount as the dominant element, depending on card layout).
- The general principle: app-bar level reads as page chrome (left), in-card hero numbers belong on the right side of the card as the "headline".
Source: cal:2026-05-17 — pair 506 reason "for app bar left, for in-card L0 big number right" ✅

### Empty / confirmation / success screen — CTA anchoring
Two valid patterns for an empty state or confirmation screen:
- **Bottom-anchored CTA** (default): illustration + title + body in a centred stack, with the **Primary button anchored to the bottom** of the screen above the gesture nav. Use Button Group for the bottom dock.
- **Centred small CTA**: if the screen is short and the CTA needs to feel inline with the body, use a **smaller button** (Small 36px, Secondary) centred under the body text — not a full-width Primary.

Don't centre a full-width Primary button in the middle of the screen — it competes with the title for visual weight.
Source: cal:2026-05-17 — pair 512 reason "normally we anchor the CTA to the bottom in such cases, or use a smaller CTA if we want it centered" ✅

### Quick-action icon grid · uniform label rhythm
In a 4-up (or N-up) icon grid where each tile carries a label below the avatar:
- **All labels wrap to the same number of lines.** If "View more" sits on one line, every label sits on one line. If "Credit card" wraps to two, every label wraps to two.
- **Never truncate.** No ellipsis on icon-grid labels.
- If labels naturally fall on different line counts, either shorten the long ones or pad the short ones — visual rhythm wins over copy precision.

Why: the icon row is read as a coordinated unit; mismatched line counts break the grid and pull the eye to the taller tile.
Source: cal:2026-05-17 — pair 403 reason "if label of one circular item is in 2 lines all of them should be in 2 lines or else all 1 line, can't truncate" ✅

### Balance hero amount — alignment by surface
- **L0 top header inside the card** (Banking pod home, balance shown alongside other L0 surfaces): **left-aligned**. Caption above, amount + hide-toggle on baseline, delta below — all left-edge.
- **L1 dedicated balance screen** (App bar/Standard "Balance" + Top header): **centred**. Display/Small amount centred with caption above and delta below.

Don't centre on L0 — it competes with the L0 cards stacked beneath.
Source: cal:2026-05-17 — `balance_hero_alignment-100` pick B + 2 confirming reasons ("left is to be used inside card on L1", and on R2 pair 202: "big number value always in center, only left in card in L0 screens"). 3 signals. ✅

---

## L0 Screen (home / pod root)

```
┌─────────────────────────────┐
│ Status Bar (44px)           │
│ App bar/L0 (64px)           │  pod title + avatar
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ L0 card/Large           │ │  primary content
│ │ (24px padding)          │ │
│ └─────────────────────────┘ │
│ 16px gap                     │
│ ┌─────────────────────────┐ │
│ │ L0 card/Medium          │ │  secondary
│ └─────────────────────────┘ │
│ 16px gap                     │
│ ┌──────────┐  ┌──────────┐  │
│ │ Small    │  │ Small    │  │  paired smalls
│ └──────────┘  └──────────┘  │
│                              │
│ Section content              │  list items / explore cards
│                              │
│ ─ ─ gradient fade ─ ─        │
│ Bottom nav (~120px)          │  floating dock (overlays)
└─────────────────────────────┘
```

**Recipe:** `App bar/L0 → L0 card/Large → L0 card/Medium → [optional Small + Small] → Section content → Bottom nav`

**Key rules**
- Page padding: 24px horizontal for cards area
- **Card stack gap: 16px** between L0 cards (cards are NOT 0-gap; that rule applies to flat list components)
- Cards fill width: `360 − 48 = 312px` content width
- Bottom nav overlays content with gradient fade — content scrolls behind it

---

## L1 Screen — Balance

```
┌─────────────────────────────┐
│ App bar/Standard (108px)    │  back + title + actions
│ Top header                   │  amount/balance display
├─────────────────────────────┤
│ Divider/Big (8px)            │
│ Section header (Bold)        │
│ List items…                  │
│   Divider/Inset              │
│ List items…                  │
├─────────────────────────────┤
│ Divider/Big (8px)            │
│ Section header (Bold)        │
│ List items…                  │
├─────────────────────────────┤
│ Button group (optional)      │
│ Gesture nav (20px)           │
└─────────────────────────────┘
```

**Recipe:** `App bar/Standard → Top header → [Divider/Big → Section header → List items]* → Button group / Gesture nav`

## L1 Screen — List (no header)

```
App bar/Standard
─ Divider/Big → Section header → List items
─ Divider/Big → Section header → List items
Gesture nav
```

**Recipe:** `App bar/Standard → [Divider/Big → Section header → List items]* → Gesture nav`

---

## L2 Screen — Form

```
App bar/Standard
24px padding
Underlined input
16px gap
Underlined input
…
(flex spacer)
Button group   ← "Continue" / "Pay now"
Gesture nav
```

**Recipe:** `App bar/Standard → Underlined inputs (stacked) → Button group → Gesture nav`

## L2 Screen — Confirmation

```
App bar/Standard
[Illustration centered, ~64px above title]
Title (H2, centered)
Body (centered)
Button group
Gesture nav
```

**Recipe:** `App bar/Standard → Illustration → Title + Body → Button group → Gesture nav`

---

## Activity Screen (search + tabs)

```
App bar/L0 (108px)             "Activity" + avatar
Search (64px)                  search bar + filter icon
Tabs (44px)                    "All" / "UPI" / etc.
─ Section header (List)        date grouping
  Transaction item
   Divider/Inset
  Transaction item
─ Section header (List)
  Transaction items…
Bottom nav (~120px)
```

---

## Composition Rules

1. **Components stack with `gap: 0`.** Spacing is internal to each component. Exception: L0 cards have a 16px stack gap.
2. **Section grouping:** `Divider/Big → Section header (Bold) → List items` *or* `Section header (List) → List items`. Pick one type per screen.
3. **Never mix Bold and List headers** on the same screen.
4. **Inset dividers** between list items **with avatars**. **Full-bleed dividers** between items **without avatars** (or pure-text rows). Don't mix variants within a single list.
5. **Button group** sticks to bottom when it contains a primary CTA.
6. **Gesture nav** is the very last element on L1+ screens.
7. **Bottom nav** is the last element on L0 screens.
8. Content area scrolls — App bar (with `Below` shadow on scroll) and footer stay fixed.
9. **List headers stand alone** — they have a grey `#F6F9FC` background built in. No `Divider/Big` before them.
10. **Bold headers need `Divider/Big`** before them for visual separation.

---

## HTML Scaffold

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=360, initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Rubik', sans-serif; background: #F6F9FC; display: flex; justify-content: center; padding: 24px; }
    .screen {
      width: 360px; min-height: 720px;
      background: #FFFFFF; border-radius: 16px;
      overflow: hidden; display: flex; flex-direction: column;
      box-shadow: 0 4px 24px rgba(0,0,0,0.1);
    }
    .screen > * { flex-shrink: 0; }
  </style>
</head>
<body>
  <div class="screen">
    <!-- App bar -->
    <!-- Content -->
    <!-- Footer (Bottom nav for L0, Gesture nav for L1+) -->
  </div>
</body>
</html>
```

### Day-group divider — hairline, not Big
When a single list groups by day (Today / Yesterday) using **List section headers** between groups, separate them with a **hairline (1px Divider/Default, full-bleed)** — not a Big divider (8px slate-10 strip).

Why: the List header already carries its own grey bg, which provides the visual break between day groups. A Big divider on top doubles up the separation and creates an unnecessary 8px gap.

Use a Big divider only when the grouping is across **different surface types** (e.g. a card-cluster section above a list-of-rows section) — where the surfaces themselves don't carry their own visual break.

Source: cal:2026-05-17 — pair 603 pick B (hairline over Big strip for day-grouped activity) ✅

### Amount entry — big centred Display
Payment / transfer amount entry uses a **big centred Display number** (~64px), with the **₹ symbol at the same font size** as the main value (matched, not smaller). Caption "Enter amount" above.

Do NOT scale the ₹ symbol down or render it as a tiny prefix — it reads as broken alignment.

Source: cal:2026-05-17 — pair 800 A + reason "rupee symbol not aligned properly, it should be the same size as the main value font" ✅

### Toast position
Toasts (and Snackbars) anchor to the **bottom** of the screen — above the gesture nav with 12–16px breathing room. Not top.

Source: cal:2026-05-17 — pair 806 B ✅

## Screen recipes (calibrated 2026-05-17 from production references)

These recipes consolidate the per-screen patterns confirmed during R11 review with attached reference SVGs. Each names the surface, the chrome (App bar shape), the hero treatment, and the actions zone — in build order top→bottom.

### Activity L0
1. App bar L0 — pod title "Activity" + photo Avatar trailing
2. Search bar (full-width pill, slate-10 bg) with filter icon button trailing — *required content row between App bar and any List header*
3. Flat transaction list:
   - Avatar (photo OR letter) leading
   - Title (party name)
   - Subtitle = **relative date** (`24 Jan '26`), not time
   - Value right-aligned; credits in Positive Green, no `+` prefix; debits in text-primary
4. NO day-group section headers ("Today" / "Yesterday") at L0. Group surfaces are L2/L3 detail views.
5. NO week-summary hero block at L0.

### Balance L1 (= "Banking home" — they are the same screen)
1. App bar Standard with chevron back + title (e.g. "Savings") + trailing eye-icon (hide / show balance)
2. Centred hero:
   - "Total balance" caption (secondary)
   - **Display amount** — `₹76,039.49` — decimals smaller / subscript treatment
   - **Brand-purple caption** below — context-rich ("Earning interest at 100% RBI repo rate"), NOT secondary-grey
3. Two CTAs side-by-side bottom-anchored:
   - Tertiary outline "Transfer" (white bg + V-500 text + V-500 outline)
   - Primary "Add money"
4. NO "Recent transactions" list on this screen — that's a separate L2 surface.

### Payment confirmation (success)
1. App bar Standard with **X close** top-left (no chevron, no title)
2. Centred:
   - **Textured grainy gradient tick** illustration (~120px green-blue noisy gradient + white check)
   - "**Paid ₹X,XXX**" H2 (verb + amount, never "Payment sent")
3. NO body explanation paragraph — the title is the receipt
4. CTAs bottom-anchored: Primary "Done" + Text "Share receipt"

### Empty Rewards (with leaderboard)
1. App bar Standard with chevron back + "Rewards" + trailing utility (bulb / tip icon) + **trailing slice currency pill** showing accumulated balance
2. **Pink → coral 2-stop brand-rewards gradient hero card** (full-width, radius L): "Leading this week: <name>" + amount + leader photo Avatar trailing
3. Section header "Fires (0)" (H4 weight, left-aligned, no CTA)
4. **Real slice illustration** (asteroid + diamonds) centred below — NOT a generic line icon
5. NO bottom CTA — the leaderboard banner IS the call to action

### Explore card — Recharge & bills
1. White card on slate-10 page bg (page padding 24, card padding 20)
2. Card header row: H4 title left + **solid blue "₹0 FEE" pill UPPERCASE** trailing
3. 4-up icon grid: subtle-outline circles + **slate glyph inside** (not V-500), labels Caption secondary
4. Dashed divider full-bleed within card
5. Reward-row trailing chevron `›` (whole row is the tap target): Avatar (slate-100 bg + line icon) leading + title H4 + caption secondary

### PIN entry
1. App bar Standard chevron back, no title
2. Top-left aligned title (Display/Small ~48px): "Enter slice PIN"
3. Context subtitle (body, secondary): "Paying ₹1,000 to Aman" — always carries transaction context mid-flow
4. PIN slot row, left-aligned, 12px gap, ~64px circles, brief digit-visibility before mask
5. Text-link "Forgot PIN?" V-500 buttonSmall (optional, left-aligned)
6. **System keyboard** opens from below (not slice custom keypad)

### Bottom sheet — confirm payment
1. Sheet handle: NONE
2. Title H3 left-aligned, no caption
3. Row stack: 2-column "label / value" rows (label = body secondary, value = body primary, NEVER bolded)
4. **Single Primary CTA** "Pay ₹500" — verb + amount
5. NO Cancel button — sheet dismisses on scrim tap

### Spark FD details
1. App bar Standard chevron back + no title + trailing chat-help icon
2. Left-aligned hero (no card chrome):
   - "Deposit amount" caption secondary
   - **₹9,200** H2 left-aligned
   - "Initial deposit · ₹10,000" caption secondary with bullet separator
3. Listing area (no card wrapper, no section header):
   - Row: "Accumulated Interest" → "₹40" (green for positive)
   - **Dashed full-bleed divider**
   - Row: "Interest paid till date" → "₹120"
   - Dashed divider
   - Row: "Interest to be earned" → "₹600"

### Add money — amount entry
1. App bar Standard chevron back + "Add money" title
2. Massive centred amount `₹1,20,000` — **₹ matches digit weight and size** (no subscript)
3. No keypad in this neutral variant (system keyboard available)

### Pay person — brand-immersive
1. **Full-page Valentino-500 background** (V-500 fill, edge to edge — chrome too)
2. **X close** top-left in white
3. Centred:
   - Payee name H3 white
   - UPI ID caption white-secondary
   - Massive amount `₹90` Display in white, ₹ matches digit weight
4. "**Add a note**" pill bottom-anchored: transparent-white bg, white text + note-icon leading
5. Used only for sending to a known UPI ID / saved payee

### Credit home (= bill summary, NOT limit dashboard)
1. App bar Standard chevron back + no title + trailing pie-chart icon (analytics)
2. Centred hero:
   - **Date range** caption ("21 Jul - 20 Aug") above the amount
   - Display amount (total spend in period)
   - **Brand-purple text link** "View unbilled spends" (no button, no chevron)
3. **Subtle callout row** (slate-10 bg, radius L, no chevron, no CTA): Avatar V-500-bold + line icon + H4 title + caption secondary

### Pay screen
1. App bar Standard chevron back + **dynamic title** `Pay ₹2,000` + trailing instrument-card icon
2. Form rows (no card wrappers, hairline between):
   - "From: Savings · ₹2,00,000" + slate-10 circle pill chevron-down (selectable)
   - "Mode: UPI" + chevron-down pill
   - "To: <Name, phone, UPI ID>" — input
3. "QUICK PAY" list section header (UPPERCASE metadata on slate-10 bg)
4. 3-up grid of **large bold COLOURED circle category icons** (~88px) — Orange / Blue / Green Avatar Bold + white line icon inside

### Action centre (= Notifications feed)
1. App bar Standard chevron back + "Action centre" title (H3 weight)
2. Stack of **outline-border cards** (1px outline-subtle border, radius 24, no shadow), 12px gap:
   - Title H3 left
   - Body secondary
   - Avatar (S-32 / M-40) **top-right** corner
   - Primary CTA bottom-left **inside** the card (optional)
3. White or slate-10 page bg both valid

Source: cal:2026-05-17 — review-1100 / 1101 / 1102 / 1103 / 1104 / 1105 / 1106 / 1108 / 1109 / 1110 / 1111 / 1112 / 1113 reference frames ✅

## Recipe refinements (2026-05-18 batch)

### Activity L0 — App-bar-to-search-bar gap
Tight 8px gap between App bar L0 bottom edge and the search bar. Calibrated: user noted "too much space above the search bar, and below the app bar" — pull them closer.

Source: cal:2026-05-18 — review-1203 reason "too much space above the seach bar, and below the app bar".

### Confirm success — tick stroke
The textured grainy gradient tick (~120px green-blue) uses an **8px stroke** on the white check, not 6. The noisy gradient field eats thinner strokes; 8 keeps the symbol legible.

Source: cal:2026-05-18 — review-1201 reason "tick stroke should be thicker".

### Spark FD details — no today-delta chip
Hero stays clean: caption + amount + bulleted subline. **Do not add** a small "+₹X today" green pill chip below the subline — it clutters the hero with information that belongs in the listing rows below.

Source: cal:2026-05-18 — review-1207 pick A (the no-chip variant).

### Bottom sheet — interior padding
Sheet inner padding-top = **24px**. Goes directly into the H3 title (no handle, no top breathing space beyond 24).

Source: cal:2026-05-18 — review-1206 reason "top margin should be 24 in the bottomsheet".

## Empty / error state recipes (calibrated 2026-05-21)

### Empty Activity L0
1. App bar L0 ("activity" — see brand-voice rule on lowercase pod titles)
2. Centred stack: real branded illustration (~120px) + H2 title + 2-line body (secondary text)
3. Bottom-anchored Primary CTA ("Add money") — Activity-empty DOES carry a CTA because the txn feed is empty by design (no transactions = no money in)

Source: cal:2026-05-21 — r14-empty-1400 pick B. User contrasted Activity (txn feed, CTA OK) vs Action centre (notifications, no CTA).

### Empty Action centre / Notifications
1. App bar Standard chevron back + "Action centre" title (H3)
2. Centred full-screen stack: illustration + H2 title ("All caught up") + 1–2 line body (secondary)
3. **NO bottom CTA.** Action centre is read-only / status-only — no nudge needed. Anything that would be a CTA belongs on the surface the notification points to.

Source: cal:2026-05-21 — r14-empty-1401 pick A + r14-empty-1400 reason "activity center is for notifications, doesn't have a CTA".

### Empty Search Results (Activity search)
1. App bar L0 ("activity") + photo Avatar trailing
2. Search bar (search-state preserved: shows the failed query as a value, ✕ icon inline to clear) + filter icon button trailing — full pattern from the Activity L0 recipe stays
3. Centred illustration below (small, ~100px) — real branded illustration (e.g. searching-mascot), not generic line-art
4. No bottom CTA. The clear-search affordance is in the input itself.

Source: cal:2026-05-21 — r14-empty-1402 pick A + reference frame.

### Connection Lost
1. **Full-screen takeover** — no app bar, no nav chrome
2. Centred real branded illustration (sad mascot, large ~160px)
3. H2 title ("Connection lost" or warmer slice copy)
4. Body (secondary): 1 line on what's happening
5. **NO retry button.** Slice auto-retries in the background; the user shouldn't have to act. When connection returns, the takeover dismisses automatically.

Source: cal:2026-05-21 — r14-empty-1403 pick A + reason "we block the user and keep trying, no retry CTA".

### Transaction Failed
1. App bar Standard with **X close** top-left (no chevron, no title)
2. Centred Avatar Bold red (~120px) with white X glyph inside — mirrors the success grainy-tick architecture but inverted (solid red, no grain, X instead of check)
3. H2 title "Payment of ₹X,XX,XXX failed" (verb + amount + state, parallel to "Paid ₹X,XXX" success copy)
4. Body (secondary, optional) — 1 line on next step
5. Bottom-anchored CTAs: Primary "Retry payment" + Text "Cancel"

Source: cal:2026-05-21 — r14-empty-1404 pick A + reference frame.

### Validation Error (form input)
1. Field renders with no helper text by default
2. On error: bottom border turns red, label turns red, caption appears below the field in red ("Invalid UPI ID")
3. Helper text (caption, tertiary) is **NOT always-on** — only appears when there's an error
4. On valid input or focus, the error caption disappears

Source: cal:2026-05-21 — r14-empty-1405 pick A.
