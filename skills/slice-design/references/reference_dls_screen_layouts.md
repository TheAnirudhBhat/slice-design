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
5. Surface is **WHITE / restrained — NOT a full-bleed V-500 celebration.** Reserve brand immersion (V-500) for the Pay home; the success screen is a calm white receipt. The tick is the canonical grainy-gradient asset (`dls_success_tick`), never a hand-drawn check. Source: cal:2026-06-02 R19 — `success_screen_immersion` pick B ("B is better") + the tick-asset-reuse reason. ✅

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

### Onboarding / welcome screen
Layout: **vertically centred** — illustration + title + body all centred in the screen, with a full-width Primary CTA bottom-anchored. Do NOT use a top-illustration layout with content below.
Source: cal:2026-05-27 — pair 1611 B ✅

### Sticky date group headers (Activity / transaction lists)
Date group headers (TODAY, YESTERDAY, etc.) are **sticky** — they pin to the top of the scroll container as the list scrolls. This maintains temporal context while scrolling long lists.
Source: cal:2026-05-27 — pair 1616 A ✅

### Settings screen — flat list with section headers
Settings screens use a **flat list with List section headers** (Metadata UPPERCASE on Slate-10 bg) on white background. Do NOT group into iOS-style rounded cards on grey bg — slice keeps settings flat.
Source: cal:2026-05-27 — pair 1619 B ✅

---

## L0 pod home recipes (calibrated 2026-05-28 from canonical DLS reference frames)

The DLS 2.0 working copy file (`PNUz3Dr9KSlFJSnsXsC0nL`) carries the canonical L0 home mockup for each of the 6 pods — Banking, Explore, Payments, Credit, Activity, Profile — in both Light and Dark. These recipes are extracted from the L0 page (node `885:19528`) and supersede any conflicting earlier recipe. Cross-pod patterns at the end.

### Banking L0 (= Balance home — they are the same screen)
1. **App bar L0** — pod title "Banking" left + **eye icon** (hide/show balance) trailing + photo Avatar trailing (2 items in trailing slot, both icon-button sized)
2. **L0 card / Large — Savings hero** (white card on white page, shadow elevation):
   - Caption secondary: `Savings ····5732` (account name + masked last-4 with bullet separator)
   - Display amount: `₹45,800` (Display/Small, ₹ matches digit weight)
   - Green delta row: up-arrow icon + green caption `Earn interest at 100% RBI repo rate`
   - **Hairline divider full-bleed within card** (Divider/Default)
   - In-card CTA row: V-500 link `Grow your savings` H4 + caption secondary `Earn interest daily` left-stacked + **Primary Small "Add money" pill right-aligned on the same row**
3. **L0 card / Medium — Fixed deposits**: `Fixed deposits` H4 left + `₹0` Display/Small + green delta `Earn interest up to 7.75 p.a.` with up-arrow icon. **Trailing illustration** (graph-with-people, ~80px) bleeds to right edge of card.
4. **L0 card / Medium — monies**: pod label `monies` H4 left + content below + trailing illustration (colored cluster, ~80px). Partial visibility at bottom (scrolls behind floating dock).
5. **Floating bottom dock** (semi-transparent slate, 3 icons visible: home active V-500 in white circle, generic-app, qr-scan)

### Explore L0
1. **App bar L0** — pod title "Explore" left + photo Avatar trailing only (no eye icon, no utility icon)
2. **White card — Recharge & bills** (page padding 24, card padding 20, shadow elevation):
   - Card header: H4 title `Recharge & bills` left + **solid Blue-500 "₹0 FEE" pill UPPERCASE** trailing (Metadata weight)
   - 4-up icon grid: subtle-outline white circles + **slate glyph inside** (NOT V-500), labels Caption secondary one-line. Tiles: `Card / Electricity / Prepaid / More`
   - **Dashed full-bleed divider** within card
   - Reward row trailing chevron `›` (whole row is tap target): Avatar slate-100 leading (line-icon, ~40px) + title H4 `Get assured ₹10` + caption secondary `Reward on 1st bill payment`
3. **2×2 small-card grid** (gap 12px, mixed content/decorative):
   - `PLAY & WIN / Rewards` H4 + Spark V-500 sparkle illustration bottom-right
   - `MAY SPENDS / ₹12,487` H4 + V-500→pink pie illustration bottom-right
   - `INVITE / Earn ₹150` H4 + pink hook-magnet illustration bottom-right
   - `CREDIT SCORE / 785` H4 (no illustration, value-only tile)
4. Variant: card can stack as `Big card + 2×2 grid` OR `2×2 grid only`. Banking-style hero card NOT used here.
5. **Floating bottom dock** (explore icon active)

### Payments L0 (brand-immersive dialer — NOT a form)
This is the canonical Payments L0. **It is NOT the "Pay screen" form** described elsewhere in this file — that's a downstream L1/L2 surface after picking a payee.

1. **Full-bleed Valentino-500 fill** (page bg = `#D30AD7`, chrome edge-to-edge, status bar text white). Light mode only — see Dark mode swap below.
2. **No standard App bar.** Instead:
   - Top-left: **"Check balance" pill** (transparent fill + 1px white-subtle outline + white text, Radius Circle, padding 10/16)
   - Top-right: voice/audio icon (white, in circle outline) + photo Avatar trailing
3. **Centred hero stack:**
   - Massive `₹0` Display/Large in white (₹ matches digit weight — NEVER subscript)
   - **UPI ID chip** below amount: transparent-white pill (radius circle) with `UPI ID: rajan@sliceaxis` + chevron-right, leading "UPI" coloured logo glyph
4. **Custom slice keypad** centred lower-half: 1-2-3 / 4-5-6 / 7-8-9 / . / 0 / ‹backspace. White numerals, 3-column grid, generous tap targets. (Contrast with PIN entry which uses system keyboard.)
5. **Two Tertiary pill buttons bottom-anchored side-by-side, gap 12px**: `Request` + `Transfer` (transparent-white fill, white text, white-subtle outline)
6. **Floating bottom dock** — central QR-scan icon prominent (large white circle + V-500 glyph) as the pod's signature action

### Credit L0 (= card-based bill summary — NOT a chevron-back analytics screen)
The earlier "Credit home" recipe in this file (App bar Standard chevron-back + pie-chart icon + centred hero) describes an L1/L2 analytics surface, NOT the pod L0. The canonical L0 is below.

1. **App bar L0** — pod title "Credit" left + photo Avatar trailing only (no leading icon, no chevron back, no utility icon)
2. **L0 card / Large — Spends summary** (white card, shadow elevation):
   - Caption secondary: `Spends · 5 Jun - 4 Jul` (date range with bullet separator)
   - Display amount: `₹1,00,550` (Display/Small)
   - **Two recent transaction rows** inline below amount (no section header, no card-internal divider):
     - Small coloured Avatar (Blue Bold for transport, Red Bold for retail) + caption `Paid ₹370 to Uber`
     - Same row pattern for second txn
   - **Subtle Blue-50 callout row INSIDE the card** (Radius L, no chevron, no CTA): Avatar V-500 Bold dot-burst-icon leading + `Invite a friend` H4 + caption secondary `You have the power`
3. **L0 card / Medium — Super card promo**: H3 title left `Meet your slice / super card` + caption secondary `Discover the benefits` + branded blue-pink mascot illustration trailing (~80px, bleeds to right edge)
4. **Floating bottom dock** (rupee/credit icon active)

### Activity L0 (reverified 2026-05-28)
1. App bar L0 — pod title "Activity" + photo Avatar trailing
2. **Search bar + filter icon button trailing.** Reverified anatomy:
   - Search bar: slate-10 pill, magnifying-glass leading, "Search" placeholder, full available width
   - Filter button: **white fill + outline-subtle border + slate glyph** (corrected from earlier R12 doc that said "slate-10 bg + V-500 line icon" — canonical reference shows white outline pattern)
3. Flat transaction list — Avatar leading + party-name H4 + relative-date caption + value right-aligned (green for credits, no `+` prefix; text-primary for debits)
4. NO section headers, NO day-grouping, NO week-summary
5. Floating bottom dock (filter/activity icon active)

Filter icon button anatomy override:
Source: cal:2026-05-28 — L0-canonical-reference frame Activity (node 885:20122) shows white outline + slate glyph, NOT slate-10 fill + V-500 glyph.

### Profile — SUPERSEDED by V3 (see Profile V3 recipe below)

The R18 Profile recipe (X close + centred photo Avatar + mid-screen Primary CTA + 6-row settings list) was **fundamentally restructured** in Profile V3. See the V3 recipe in the R21 section below. The R18 recipe is kept here only for historical reference — DO NOT build to it for new work.

~~1. X close top-left, bare X on white~~
~~2. Centred photo Avatar large (~120px)~~
~~3. Name + phone centred below avatar~~
~~4. Primary CTA mid-screen (`Invite & earn ₹150`)~~
~~5. Settings list — 6 rows: Action centre / UPI settings / Pricing / App Settings / Help & support / About~~
~~6. NO bottom nav~~

**Status**: superseded by R21 Profile V3 (2026-05-28).

### Profile V3 (R21 — supersedes R18 Profile recipe)

Profile V3 is a **fundamental restructure**, not a refinement. The R18 overlay (centred Avatar + mid-screen Primary `Invite & earn ₹150`) is gone. V3 leads with a **QR-as-identity hero card** containing the user's UPI QR with photo Avatar dead-centre + name + "Joined in..." + 3-column lifetime metrics strip (Cashback / Interest / Payments). Below the hero: **2-up action tile grid** replaces the mid-screen Primary CTA.

**Source**: cal:2026-05-28 R21 — file `PAykW7c42bZL3CAt2VW1v0` (Profile V3), canonical Profile Landing variants. Frame `522:6239` (lower node ID) was an earlier iteration; `813:9080`, `765:6819`, `767:7349`, `765:7200`, `786:1554`, `775:10827` (higher node IDs) are canonical V3 — **page-ID-as-recency heuristic applies**.

#### Header chrome (changed)
- **App bar Standard**: X close top-left + **bell/notification icon top-right** (NEW — replaces the `Help` pill from R18). Bell carries a **red badge dot** when nudges exist (Action centre signal).

#### Hero card (NEW — replaces R18 large centred Avatar)
- White card, shadow elevation, 24px page padding, ~288px tall
- **Dot-pattern QR (~224×224)** with **photo Avatar (~64px) overlaid dead-centre**, three corner finder squares
- Below QR: **Name H3 centred** + `Joined in Nov 2020` caption secondary (membership metadata replaces phone number — phone moves to Profile details L2)
- **Bold Divider** (8px slate-10 strip) splits QR block from metrics
- **3-column metric strip inside same card**:
  - `₹2,808 / Cashback`
  - `₹20K+ / Interest`
  - `5K+ / Payments`
  - Value Display-small + label caption secondary. **Each cell tappable** — opens "Lifetime with slice" bottomsheet (see below).

#### Action grid (NEW — replaces mid-screen full-width Primary CTA)
- 2-up grid, 12px gap, ~148×126 tiles each, ~16px corner radius
- **Left tile** (fixed): green-fill Avatar S-32 (invite icon) + `Get ₹150` H4 + `Invite friends` caption secondary
- **Right tile** (variable):
  - Default: V-50 fill Avatar S-32 (QR icon) + `View UPI` H4 + `Manage accounts` caption secondary
  - UPI not activated: Indian-flag Avatar + `Activate UPI` H4 + `Sample text refer` caption secondary

WHY 2-up tiles replace mid-screen Primary: the two actions (Invite + UPI) are co-equal. A single full-width Primary would have to pick one to dominate; tiles promote both as peers.

#### Settings list (slimmed 6 → 5)
- **`ACCOUNTS & SETTINGS`** UPPERCASE Metadata section header (slate-10 bg, standard List header)
- 5 rows (observed order): `Help & support / Profile details / App settings / Pricing / About`
- **`Action centre` removed** — promoted to bell icon with badge dot (top-right App bar trailing)
- **`UPI settings` removed** — promoted to `View UPI / Manage accounts` action tile
- **`Pricing`** row trails a **`TAG` Status pill** (V-50 fill, V-500 text, UPPERCASE Metadata, full-pill radius)
- **`Statements`** row appears conditionally (when ITR-eligible) — trails a **`DOWNLOAD ITR` action pill** (V-50 fill, UPPERCASE Metadata)
- **Settings rows in V3 use BARE line icons** (S-32, no Avatar wrapper). This is a regression from R18 outline-subtle Avatar wrappers. V3 canonical = bare icon.

#### Brand-illustration footer (NEW)
- **V-500 + pink temple illustration** bleeds bottom-right corner from outside the page
- Small shield Avatar S-32 + `Secured & RBI licensed` (caption) + `App version • 18.8.0` (caption secondary)
- Left-aligned with page padding

#### Variant matrix (state machine on the same shell)
- **Default** (`813:9080`) — QR + 3 metrics + 2 action tiles + settings + footer
- **Numbers not available** (`765:6819`) — same shell, no 3-column metric strip (card collapses to QR + name + Joined date only)
- **To-do card** (`767:7349`) — inserts slate-10 outlined callout card BELOW the action grid (blue Avatar S-32 + H4 + caption — User Action Request banner-style)
- **With marketing card** (`765:7200`) — inserts slate-10 callout pill INSIDE the hero card under the Name/Joined row (in-hero marketing slot, not in-list)
- **UPI not activated** (`786:1554`) — QR block becomes plain centred photo Avatar (~120px); right action tile becomes `Activate UPI`
- **Action centre badge** (`775:10827`) — bell trailing icon carries red badge dot
- **Loading shimmer** (`775:9804`) — entire hero card is a single skeleton rectangle (no internal partitioning)

#### Sub-surfaces (Profile L2s)
1. **Profile details** (`770:9221`) — chevron-back + `Profile details` title + centred photo Avatar (~120px) with edit-pencil affordance + name H3 + 2 grouped sections (`Basic details`, `Address`) with H4 Bold section labels (NOT UPPERCASE Metadata) separated by 8px Bold Divider strips + caption-label-above-H4-value field rows. PAN/Aadhaar values bullet-mask middle digits. Email row carries trailing pencil-edit icon (inline edit).
2. **Statements** (`1148:26663`) — full L2 page with App bar Standard (`Statements` title) + `Current month` H3 with chevron-down period selector + Opening/Closing balance rows + Bold Divider + `Transactions` H4 + horizontal-scroll account filter Chips (Savings / atom) + transaction list rows + **bottom-anchored 2-button row**: Secondary `Email` (outlined V-500) + Primary `Download` (V-500 fill, 50/50 split).
3. **Lifetime with slice bottomsheet** (`770:8981`) — opens from metric strip tap. Scrim + sheet (16px top radius) + `Lifetime with slice` H2 + 3 rows (Cashback / Interest / Payments — H4 title + caption subtitle + H3 value right-aligned) + bottom-anchored Primary `Got it` full-width V-500 pill.

#### New patterns introduced by Profile V3
- **QR-as-identity-hero card** — reusable for any "share-my-payment-handle" surface
- **Metric strip inside hero card** with Bold Divider — tappable cells open value explainer bottomsheets
- **Action tile pair as Primary substitute** — 2-up 148×126 tiles replace mid-screen full-width Primary when two actions are co-equal
- **Inline status/action pill on settings row** (V-50 fill, UPPERCASE Metadata, trailing slot) — TAG / DOWNLOAD ITR
- **In-hero marketing callout slot** — slate-10 pill INSIDE hero card, not as separate card
- **Brand-illustration footer** — V-500 temple bleeds from page bg into footer corner with security + version text
- **Bell with badge dot as Action centre entry** in top-right utility slot (replaces `Help` pill iteration)

#### What Profile V3 doesn't do
- ❌ Avatar-as-page-hero (superseded — QR card is hero, Avatar is sub-component inside QR)
- ❌ Mid-screen full-width Primary on Profile (superseded — 2-up action tile grid)
- ❌ Outline-subtle Avatar wrappers around settings-row leading icons (V3 uses bare line icons)
- ❌ `Help` pill in App bar trailing slot (use bell icon with optional red badge dot)
- ❌ `Action centre` OR `UPI settings` as a List row in V3 settings (both promoted out of list)
- ❌ Phone number under name on Profile L0 (moves to Profile details L2)

---

## L0 cross-pod patterns (calibrated 2026-05-28)

These patterns hold across 3+ pod L0 frames. Use them as the L0 home invariants.

### Trailing photo Avatar in App bar L0 is the user identity affordance
Every pod L0 except Payments + Profile carries the **same photo Avatar in the App bar L0 trailing slot**. It's the user's identity, not a contextual element. Tapping it opens the Profile overlay. Don't put pod-specific actions in this slot.
- Banking, Explore, Credit, Activity → photo Avatar trailing
- Payments → photo Avatar trailing (alongside voice/audio icon)
- Profile → IS the destination (no Avatar in chrome)

### Bottom nav is a floating dock, not a bar
Every L0 (except Profile) shows the bottom nav as a **floating dock**: semi-transparent circular icon buttons hovering above the content with gradient fade. Active state = solid white circle with V-500 glyph. Inactive = semi-transparent slate fill with slate glyph.
- Content scrolls UNDER the dock
- Banking dock: 3 visible icons (home/app/scan)
- Payments dock: 5 icons centered on QR-scan (the pod's hero action)
- Other pods: 4-5 icons depending on pod prominence

### No section headers on L0
L0 home screens (Banking, Explore, Credit, Activity) carry **no List section headers** between content clusters. The cards (or list rows for Activity) are themselves the structure. Section headers are an L1+ pattern. See related anti-pattern in `reference_anti_patterns.md`.

### No leading icon on App bar L0
App bar L0 carries the **pod title only at the leading edge** — no chevron, no menu icon, no logo. The trailing slot is where utility (optional, max 2 items: utility icon + Avatar). Compare with App bar Standard which carries chevron back leading.

### Pod title capitalisation — CAPITALIZED in canonical reference
Reverification 2026-05-28: All 4 visible pod titles in the canonical L0 frames are **capitalized** — `Banking`, `Explore`, `Credit`, `Activity`. The R14 lowercase-pod-titles rule (cal:2026-05-21) was extrapolated from a single empty-Activity frame and is overridden by the canonical L0 set. See `reference_anti_patterns.md` for the downgrade note.

### Hero content per pod follows pod intent
| Pod | Hero treatment |
|---|---|
| Banking | L0 Large white card — balance + delta + in-card CTA |
| Explore | Recharge & bills white card + 2×2 small grid (no big hero) |
| Payments | Full-bleed V-500 dialer (brand takeover) |
| Credit | L0 Large white card — spends + recent txns + callout |
| Activity | No card — flat search + transaction list |
| Profile | Centred photo Avatar + name (overlay, no card) |

Hero is content-driven, not chrome-driven. Cards appear on pods that show calculated state (balance, spends). Pods that ARE the action (Payments, Activity) skip cards.

### In-card CTA pattern — primary action lives inside the hero card
Banking's Savings card is the canonical example: the `Add money` Primary Small button sits inside the card, right-aligned, paired with a left-stacked caption + link. This pattern is valid when:
- The CTA acts on the same data the card displays (Add money → grows Savings)
- The card is the L0 Large hero (not a Medium or Small card)

Don't anchor this CTA to the screen bottom — it'd disconnect from the data context.
Source: cal:2026-05-28 — Banking L0 reference frame (node 885:19757) ✅

---

## Dark mode token swap (calibrated 2026-05-28)

Reference frames in the L0 · Dark section (node `2017:5795`) show the canonical dark-mode mappings. Key rules:

### Page background → pure black, not inverted slate
Light-mode `#FFFFFF` page bg flips to **`#000000` pure black** in dark mode, not slate-950 or any inverted neutral. This is a HARDER black than most design systems — slice commits to true black for OLED-friendly contrast.

### Card surface → very dark slate with no shadow
L0 cards in dark mode use a **very dark slate fill** (~`#0E0E12` / slate-950 equivalent) with **no shadow elevation**. The contrast with the pure-black page is the chrome. Outline is optional (subtle if present).

### Brand colour stays brand colour
Valentino-500 (V-500 `#D30AD7`) text, buttons, and link colours stay V-500 in dark mode. Green for positive (credits, gains) stays green. Brand colours are stable across modes — only neutrals shift.

### Brand-immersive surface FLATTENS to black in dark mode
**Critical:** the Payments L0 V-500 full-bleed in light mode does **NOT** invert or shift to a darker purple in dark mode. The entire surface flips to **pure black** with white text + outline-subtle pills + V-500 only on the active dock-icon glyph.

Rule: when a surface is brand-immersive (full-bleed brand colour) in light mode, dark mode renders it as **pure black with the brand colour reduced to text + active glyph accents only**. The brand fill does NOT carry into dark mode.

Source: cal:2026-05-28 — Payments L0 dark frame (node 1967:18266) vs Light (885:19901) ✅

### Photo Avatars stay photo
Photo Avatars (identity) render the same image in both modes. No tinting, no greyscale, no opacity reduction.

### Money colour
Positive amounts (credits) stay green in both modes. The green tint is the same — no inversion. Debits stay text-primary, which flips from `#0E0E12` (light) to `#FFFFFF` (dark).

### Brand-tinted callouts use deep brand fill (scoping clarification)

Earlier R18 rule said brand-immersive surfaces flatten to pure black in dark mode. **Scope clarification**: that rule applies only to **full-bleed brand surfaces** (the entire page filled brand colour, like Payments L0). For **smaller brand-tinted callouts** (e.g. Spark Offer pill, Claim reward callout, V-50 in-card callout rows), dark mode renders them as **deep Valentino-700/950 fill** — NOT pure black, NOT slate-950.

Why: a brand callout's purpose is to read as a brand moment within the surrounding chrome. Flattening to black loses the brand signal; carrying the same V-50 light fill makes it invisible on dark page bg. Deep V-700/950 keeps the brand identity while reading correctly against dark page chrome.

Source: cal:2026-05-28 R19 — AVC Spark Offer pill light (2410:40749) vs dark (2410:125949), 2 paired observations ✅

---

## R19 batch — active product file recipes (2026-05-28)

These recipes come from sweeping 5 product files: AVC 2025 (transaction details), Atom/Stash (new savings sub-product), Valentino (Payments L0 update), Payment OS 26 (transition states), Credit Card 2026 (✅-marked canonical pages). Confidence levels marked per finding. WHY fields marked `TBD — capture at next calibrate` where the subagent didn't extract reasoning.

### Payments L0 — UPDATED (V-500 dialer with Action Pills row)

Major revision to the R18 Payments L0 recipe. The UPI ID pill is **NOT below the amount** — it lives in a new **Action Pills row** between the App bar and the hero. The R18 recipe placed it wrong.

1. **Full-bleed Valentino-500 fill** (`#D30AD7`), edge-to-edge, status bar text white (light mode only — dark mode flattens to pure black per the brand-immersive rule).
2. **App bar** at y=0–108:
   - Top-left: **"Check balance" pill** (transparent fill + chevron-down + white-subtle outline + white text, Radius Circle)
   - Top-right: voice/audio icon (white, in circle outline) + photo Avatar trailing
3. **Action Pills row** at y=108–172 (64px tall band, 16px vertical padding, pills 36px tall) — **NEW**:
   - **Default state (app open, pre-BE response)**: NO action pills row visible
   - **Return state (post-BE response)**: ONE pill centred — `[UPI logo] anushamahesh21@slc` (195×36)
   - **Expanded states** (after delay or campaign-trigger event): horizontally-scrolling row of 1–3 pills with 8–12px inter-pill gap. Left-aligned starting at x=24, OR centred when only one pill fits. Row can clip the right edge — pills overflow under the trailing Avatar, no fade mask observed.
   - **Pill order (left → right)**: marketing pill → product pills (Fire, Monies) → UPI ID pill (always rightmost — identity anchor)
   - **Pill catalogue**:
     - `[UPI logo] <upi_id>` — always present, identity anchor. Truncates to icon-only when >14 chars; tap opens My QR directly
     - `[₹ glyph] monies` (compact 94×36) when monies balance is 0 — empty state
     - `[₹ glyph] 3,224 monies` (long 195×36) when monies balance exists — ticker-animates as value grows
     - `[fire icon] 8 fires left` — Spark fires balance
     - `[bolt icon] New spark live` — marketing pill (yellow bolt accent, only marketing-pill icon with a brand-coloured fill vs the otherwise-white pill content)
   - **Limits**: max 1 marketing pill emphasized at a time. With 2 marketing pills, only highest-priority gets "highlighted" fill (~22% white opacity); others stay at default fill (~10–14% white opacity).
4. **Centred hero stack** at y=172+:
   - Massive `₹0` Display/Large in white (₹ matches digit weight — NEVER subscript)
   - **"Enter amount to transfer" caption** — appears between Display and keypad ONLY when action pills are present AND keypad is awaiting input (nudge state). Removes when user starts typing.
5. **Custom slice keypad** centred lower-half (unchanged) — 1-2-3 / 4-5-6 / 7-8-9 / . / 0 / ‹backspace.
6. **Request / Transfer Tertiary pill buttons** bottom-anchored side-by-side, 12px gap (transparent fill + white-subtle outline + white text). They dim to ~30% opacity during the scrim/expansion-plus-dismiss state when `₹0` is unentered. Restore to full opacity once the action pill row settles.
7. **Floating bottom dock** — central QR-scan icon prominent (large white circle + V-500 glyph) as the pod's signature action.

**Action pill anatomy** (exact specs):

| Property | Value |
|---|---|
| Width — long | 195 × 36 |
| Width — extra-long | 214 × 36 (for "New spark live", longer UPI IDs) |
| Width — compact | 94 × 36 (for `monies` empty) |
| Radius | Circle (18 / fully-pill) |
| Fill — default | translucent-white ~10–14% on V-500 |
| Fill — highlighted | translucent-white ~22% (one emphasized pill at a time) |
| Stroke | none — relies on translucent fill against V-500 page bg |
| Padding | 16px left, 16px right, 10px top/bottom |
| Internal gap | 4px between logo/glyph and text |
| Logo zone | 31×16 for UPI wordmark, 16×16 for icon glyphs |
| Text | Rubik Medium 12pt, white default / white-secondary (~70%) on dimmed/scrim |

**Interaction rules**:
- **UPI ID pill is identity anchor** — survives dismiss. Product/marketing pills can dismiss; UPI pill cannot. When all secondary pills dismiss, UPI re-expands to full 195 width and centres in the row (DEFAULT state).
- **Ticker animation**: when monies value increases significantly (thousands → 10,000), the monies pill expands slightly to fit new digit count. Two simultaneous tickers (fire + monies) run **sequentially**, never in parallel — second ticker waits for first to complete.
- **On tap of campaign/marketing pill**: page dims to scrim, bottom sheet rises with copy + "Got it" Primary CTA (cashback / FYI rewards = bottom sheet pattern; fire / monies = redirect with page transition).

Why this surface design: brand-immersion V-500 establishes "you are in the payments moment". Action pills layer brand-coherent secondary info (identity, balances, campaigns) without breaking the V-500 surface — translucent fills tint the brand colour instead of competing with it. The identity anchor (UPI pill) gives users a permanent "this is your account" signal during the often-confusing payment-entry moment.

Source: cal:2026-05-28 R19 — Valentino file `J8xKGFeQ5JoDJZdaUXiLPz` node `8772:12216`, 30+ instances across Default / Expansion / Dismiss / Highlight / Ticker variants ✅

---

### Transaction detail page (L2) — 4-state status header recipe

Entirely new pattern — txn detail page was barely covered in R18 / earlier rounds. The recipe applies to Success / Pending / Failed / Initiated states with the same scaffold, only colour and copy varying.

**Status header** (sits flush on page bg, no card chrome — page-level hero):
1. App bar Standard — chevron-back left only, no title, no trailing
2. **Status title block** (24px horizontal padding):
   - Left column: H2 title (Rubik Medium ~26/30), 1-3 lines depending on state copy
   - Right column: **circular status indicator Avatar** ~48-56px, colour per state (see table below)
3. **Optional status caption** directly under title — 1-2 line caption rendered in **the status colour** (not secondary grey). Success has no caption — title alone is the receipt.
4. **Optional payee + datetime row**: `To <Name>` H4 + `25 Aug '22, 11:58 pm` Caption secondary on next line
5. **Optional Notes pill**: slate-10 bg pill with italic-prefix `Notes:` label + body, full-width within page padding

**Status colour palette**:

| State | Indicator | Caption | Title example |
|---|---|---|---|
| Success / Paid | Green grainy gradient tick (small 32-40px Avatar, white check inside) | none (no caption row) | `Paid ₹330` |
| Pending / Processing | Amber/Warning ring (~40px, white ! inside) | Amber-700 text (1-2 lines, e.g. "Please wait for 3-5 minutes. Full refund in case of payment failure") | `Processing request of payment of ₹10,000 pending` |
| Failed | Red Avatar Bold (~40px solid red, white X inside, no grain) | Red-600 text (e.g. "Refund will be processed within 4-5 days. Please reach out to us if not reflected") | `Payment of ₹10,000 failed` |
| Initiated | Blue Avatar Bold (~40px, white info/arrow glyph inside) | Blue-600 text (e.g. "Amount will be credited to beneficiary within 2 hours") | `Payment of ₹6,10,000 initiated` |

Why status-coloured captions: the colour IS the affordance — it tells the user instantly whether the screen is OK / waiting / broken without reading the words. Greying out the caption (secondary text) decouples explanation from status and is an anti-pattern (see `reference_anti_patterns.md`).

**Section stack below the status header** — invariant across all 4 states:
1. (optional Notes pill if user attached a note)
2. **Bold Divider** (8px slate-10 strip) — section grouper. List section header is NOT used here; Bold Divider does the work.
3. **Section title row**: `Details` H4 left + `Share` V-500 link trailing (no UPPERCASE metadata header)
4. **2-column key-value rows** — label H4 left + caption secondary value below OR right-aligned. `Transaction ID` rows carry a copy icon trailing.
5. **Optional Spark Offer callout** (see anatomy below)
6. **Optional inline map block** (when txn has location — see anatomy below)
7. **Footer row**: `Add extra notes` placeholder (slate-10 pill-style, full-width, becomes input when tapped)
8. **`Contact us` V-500 text link** centered, no button chrome — last row before gesture nav

**Spark Offer callout anatomy** (when a successful txn unlocks a reward):
- Full-width pill, radius L, light-mode bg = Valentino-50 `#FAE2FA`, dark-mode bg = deep V-700/950 (~`#3D0540`)
- Leading: V-500 Bold circle (~40px) with white line-icon (gamepad / joystick glyph)
- Title H4 `Claim reward` + caption secondary `Play and win upto ₹1,000`
- Trailing chevron `›` — whole row tappable (valid chevron use per R11 refinement: chevron OK on tap-row callouts)

**Inline map block anatomy** (for UPI merchant txns with registered location):
- Full-width rounded rect, radius M (~12), ~120-140px tall
- Light mode: light-grey street raster bg with pastel category pins (orange diamond = food, green leaf = retail, red drop-pin = location, blue square = other)
- Dark mode: same iconography on slate-900 / dark-grey base
- Bottom-left: small white "Open maps" pill (Radius Circle, padding 8/12) — same affordance both modes
- Map preview is **non-interactive** (decorative). Tap target = "Open maps" pill which escapes to system Maps.

**Status indicator stays-coloured in dark mode**: all 4 indicator colours (green / amber / red / blue) keep their hue in dark mode. White glyph inside stays white. The coloured circle pops against pure-black page bg.

WHY (status-as-page-hero, not card): the status header is page-level hero content, not a card. Wrapping it in card chrome introduces a second container layer that competes with the Details card-section below. Flush page-level placement + Bold Divider section break is the cleanest read.

Source: cal:2026-05-28 R19 — AVC `KXA1BbYZvzygD1XUOTIwUa` canvas `2410:22541` ("✅ Txn details page in Dark mode"), 12 detail frames across 4 states × Light/Dark + Spark callout variants ✅

---

### Product detail pages — Core PDP vs Feature PDP

slice has TWO canonical product-intro templates (DLS 2.0 file `ncGqxiE6wUOqgOURwHx6Hp`). Pick by product weight:

**Core PDP** — for CORE bank products (insurance, savings, flagship onboarding). Component set node `2061:86829` (variants Type=Default `2061:86696`, Type=Big title `2061:86830`).
- App bar Standard, chevron-back only (no title)
- CENTERED column (32px padding, gap 24): 256px illustration → **gradient heading** (Valentino→Blue, H2 24/32/0.48, bg-clip-text) → subtitle (Body 16/24 tertiary, centered) → **Dot indicator** (it's a swipe CAROUSEL)
- **FAB** bottom-right (56px V-500 circle + white right-arrow) advances the carousel / proceeds
- White bg, radius 16

**Feature PDP** — for FEATURES / sub-products (Atom). Standalone COMPONENT node `2063:87946`.
- App bar Standard chevron-back
- LEFT-aligned: illustration (top-right) → green "Feature highlight" eyebrow (lock glyph) → bold product name → subtitle (tertiary) → 3 feature rows (green Status/Tick `2063:87912` + H4 title + caption subtitle)
- FAB bottom-right

WHY two: Core PDP's centered + gradient + carousel treatment signals a flagship product worth swiping through; Feature PDP's left-aligned feature list suits a single sub-product explainer. **Insurance = Core PDP** (a core bank product), NOT Feature PDP.

Source: cal:2026-05-30 R24 cont-31 — Core PDP found via figma-console `figma_get_library_components`; official `search_design_system` missed it. ✅

---

### Atom recipe suite (new sub-product inside Banking)

`slice atom` is a new goal-based / habit-based savings sub-product living inside the Banking pod. Atoms = named savings goals (Emergency fund, Vacation, Daily saver, Round-ups, Custom). Contribution mechanisms: one-shot top-up, recurring schedule, UPI round-ups.

#### Feature PDP pair (paired product-intro)
2-step product intro that precedes the chooser. Distinct from empty/confirmation/onboarding recipes — slice didn't previously document this pattern.

**Page 1 — brand hero:**
1. App bar Standard, no title (chevron back only on page 2)
2. Centred H1 title with V-500 product-name colour overlay — `slice atom` (slice in black, atom in V-500)
3. 3D / illustrative hero (radial-gradient atom orb, ~200-280px square) centred
4. Caption secondary body, centred, with chevron-down peek (inter-page affordance — "expand to learn more", not "next page")
5. Bottom-anchored Primary full-width `Get started`

**Page 2 — benefits detail:**
1. App bar Standard chevron back
2. Same caption + chevron-up (inverse of page 1)
3. 4-row benefits list: V-500 line-icon leading (NO Avatar wrapper), H4 title, body-secondary subtitle, ~24px row gap. **No card wrapper.**
4. Bottom-anchored Primary `Get started`

WHY 2-tone title: the V-500 on "atom" signals this is a slice sub-product with its own identity (not just a feature). The 2-tone is a sanctioned brand-mark treatment for sub-products — distinct from V-500-as-CTA-accent. **This is a new sanctioned exception** (flagged for calibration confirmation).

Source: cal:2026-05-28 R19 — Atom `I6rQjCoyh38Fanjxwj1aA9` frames `7949:50755` + `8017:59958`, paired flow ✅

#### Chooser picker (mixed-content list)

Picker surface listing pre-made starter atoms + "Create your own" affordance.

1. App bar Standard chevron back only
2. Display/Small title `atoms to start with` (left-aligned, lowercase) + secondary subtitle
3. Stack of **outline-border cards** (1px outline-subtle, radius L, no shadow), 12px gap, full-width within 24px page padding
4. Each row: square thumbnail-illustration leading (~56px rounded), H4 title, caption secondary 1-2 line body
5. "Create your own" row: slate-10 filled square with `+` glyph instead of an image
6. **No chevron** on any row — whole card is tap target. No section header, no recommended/popular pills at this stage (those appear later on the returning-user L1).

Source: cal:2026-05-28 R19 — Atom frame `8042:61354`. Single frame but explicitly the chooser surface in a labelled flow.

#### Setup form shell (shared across contribution mechanisms)

Same shell used for Add money (one-shot) / Recurring / Round ups.

1. App bar Standard chevron back + dynamic action-named title (`Add money` / `Recurring` / `Round ups`)
2. **Centred identity block**: 80px rounded illustration tile (same thumbnail as chooser, scaled up) + Metadata UPPERCASE product name below (~12px tracking, secondary text colour, e.g. `EMERGENCY FUND`, `DAILY SAVER`)
3. Caption secondary `Contribution amount`
4. **Big centred Display amount** (₹ matches digit weight — consistent with existing Amount entry rule)
5. **Inline preset chips** directly under the amount: 3 horizontal outline-border pill chips (`₹1,000 / ₹5,000 / ₹25,000`), full pill radius, slate text. Chips appear DIRECTLY beneath the amount.
6. Optional schedule meta rows (Recurring only): hairline-separated label/value rows + green-fill toggle for `Start from today`
7. **"Adding from" account selector** at bottom: outline-border card with V-500 Avatar leading + 2-line `Adding From / Savings xx0226` + trailing `⋯` ellipsis icon
8. T&C disclaimer (caption secondary + V-500 inline links)
9. Bottom-anchored Primary full-width `Continue`

Source: cal:2026-05-28 R19 — Atom frames `8017:60857` (Add money), `8695:2319` (Recurring), `9198:24728` (Round ups). Consistent across 3 contribution mechanisms ✅

#### Returning-user L1 (post-FTUX home)

The L1 surface a user lands on after creating their first atom. New CTA-anchoring pattern: full-width Primary **mid-screen**, not bottom-anchored.

1. App bar Standard chevron back + `atom` title (lowercase — L1 surface descriptor, not pod title)
2. Centred caption + Display amount (current total value) + green positive delta
3. **Full-width Primary `Create atom`** mid-screen (NOT bottom-anchored — exception, parallel to Profile overlay)
4. **Active atoms list** — outline-border cards, 12px gap. Each card:
   - Square illustration tile leading (~56px)
   - Title H4 + amount right-aligned
   - `Target · ₹X` caption secondary
   - Inline V-500 progress bar + percentage value (V-500) right-aligned on a `Progress` row
   - Recurring atoms: sync-icon prefixed caption (e.g. `Set up recurring contribution sample`)
5. **`SUGGESTED FOR YOU`** UPPERCASE List section header (Metadata weight, slate-10 bg)
6. Suggested atom cards — same shell as active cards + **inline coloured pill tag above the title** (pink-fill `RECOMMENDED`, blue-fill `POPULAR`). Pink/blue tag pills are Metadata UPPERCASE on coloured-subtle pill fills.

WHY mid-screen CTA: this is a third valid CTA-anchoring pattern alongside bottom-anchored (default L1+) and small-centred (centred under short empty states). It applies when the L1 hero shows actionable summary data AND the primary action operates on that data (Create atom → grows the total displayed above). Updating the empty-state CTA-anchoring rule to acknowledge this third pattern.

Source: cal:2026-05-28 R19 — Atom frame `8534:23336` (returning-user labelled frame) ✅

#### Banking L0 entry card (additive to existing Banking L0)

A NEW Medium card slot in Banking L0, sitting between Savings hero and Fixed deposits.

- L0 card Medium, white card with shadow
- Title H3 left `slice atom` + **green-fill `+ Live` status pill** top-right
- Body secondary 1 line `Set money aside, watch it grow`
- **Tertiary Small pill `Let's go`** — slate-10 fill, slate text, full pill radius (NOT Primary, NOT V-500 outline)
- Trailing mascot illustration (~80px, purple goo + green parcel) bleeds to right edge

WHY Tertiary slate-10 (not Primary V-500): the entry card promotes a sub-product within Banking — needs to invite exploration without competing with the Savings hero's `Add money` Primary above it. Tertiary slate-10 reads as "tap to enter" without screaming for action.

Source: cal:2026-05-28 R19 — Atom frame `9442:24842` (Banking L0 + new entry card)

#### Full-screen explainer (how-it-works)

NEW pattern, distinct from empty/confirmation. Used for the Round ups explainer; likely reusable for other sub-product explainers.

1. **X close top-left** (no app bar, no title, no chevron)
2. Centred **paired illustration** (~200px wide) — e.g. beer mugs (spending) + piggy-bank (saving) for Round ups
3. H2 left-aligned title + body secondary 1-2 lines
4. **Numbered steps section**:
   - `How it works?` caption label (weight medium, left)
   - 3 numbered rows, each: ~24px slate-10 circle with digit + body text
5. **NO CTA** — passive explainer, dismissed via X close

Source: cal:2026-05-28 R19 — Atom frame `9442:23914`. Single frame, but distinctive pattern with no analog in current skill.

---

### Credit Card 2026 recipe suite

From the ✅-marked canonical pages in the Credit Card 2026 file. Adds 4 new patterns.

#### Credit L0 in-card callout — 4-color taxonomy (updates R18)

The R18 Credit L0 recipe said the in-card callout is Blue-50 with V-500 Bold dot-burst icon. **Correction**: the callout uses a **4-color taxonomy**, not always Blue-50.

| Bg | Avatar Bold colour | Use for | Example |
|---|---|---|---|
| Blue-50 | Blue-500 line icon | Informational / payments-feature | `Pay bills with credit card`, `Set up autopay`, `Pay fire, win cashback` |
| Valentino-50 | V-500 line icon | Slice-product / brand-tier | `Split spends with slice in 3`, `Scan and pay with slice` |
| Green-50 | Green-500 line icon | Success / positive-state | `UPI payments on one tap`, `UPI credit card activated` |
| Slate-10 | V-500 line icon (greyed) | Disabled / defaulted-to-card edge case | `Copy` (disabled variant with `why?` red label) |

Anatomy stays the same: full-width Radius L, leading Avatar Bold colored circle (40×40) with white line-icon, title H4, subtitle caption secondary 1 line, no chevron, whole-row tap target.

Source: cal:2026-05-28 R19 — Credit Card 2026 `WhSZFVH6lt8cZpVgzencvK` ✅ page `61557:19457` ("CC L0- Todo cards"), 12 callout variants across 4 colour families ✅

#### Credit Card L1 (limit dashboard — separate from Credit Home)

Distinct from "Credit home" (the bill/spend summary L1 documented in R11). Credit Card L1 = the card+limit detail surface.

1. App bar Standard chevron back + `credit card` title (lowercase L1 surface descriptor) + trailing photo Avatar (unusual for L1; matches the user-identity anchor pattern)
2. **White card hero**: caption secondary `slice ··5732` + Display amount `₹2,50,000` + caption `Available limit`
3. **Green-50 callout row inside the card**: green lightning leading icon + `UPI credit card activated` H4 + caption `Get started with payments`
4. **Separate white card** below: `Learn more about your card` + slice mascot illustration trailing
5. Bottom nav (floating dock with 5 icons centered on V-500 currency-icon active)

WHY separate from Credit home: Credit home is "where my money is going" (period spend + recent txns); Credit Card L1 is "what I have available" (limit dashboard). Two different mental models; two separate L1 surfaces accessed from different L0 entry points.

Source: cal:2026-05-28 R19 — Credit Card 2026 ✅ page `45748:1462` ("Payment activation - Phase 2"), single canonical frame

#### Rotary repayment dialer

ENTIRELY NEW pattern in slice — no rotary input device documented elsewhere. Used for credit card repayment amount selection.

1. **Circular dialer (donut/ring)** with draggable notch
2. **Centred amount in the ring**: `₹10,125.41` H1/Display
3. **Up to 3 selectable chips below the ring**:
   - `Min due` (always)
   - `Total due` (always)
   - `Full` (optional, BE-configurable — current ship is 2 chips; Full is for future experiments)
4. **Ring colour encodes the chip cohort**:
   - Orange ring = Paying less than total due (min-due range)
   - Green ring = Paying total due (matched)
   - Blue ring = Paying more than total due (over-payment) / Paying early for next month
5. **Caption above the ring** follows chip + position:
   - "Paying minimum due" / "Paying less than total due" / "Paying total due" / "Paying more than total due" / "Paying early for next month"
6. **Chip → notch animation**: tapping a chip animates the dialer notch smoothly to that chip's notch position
7. **Drag → intermediate state**: dragging between notches does NOT select a chip — caption updates to the intermediate label, no chip is highlighted
8. **Bottom**: `Repay` Primary CTA + `View statement` buttonSmall V-500 text-link below (or above on overdue variant)
9. **Overdue state**: same dialer + **red `Overdue by 1 day` chip** beneath the title. Chip palette unchanged.

WHY rotary input: traditional amount entry (numeric input + chips) doesn't communicate the relationship between "what you pay" and "where you sit in the repayment range" — the ring + colour-coded cohort makes that relationship the primary visual. Drag interaction lets users feel the range continuously, not just pick a discrete chip value.

Motion notes: chip-tap → notch animation should use `gentle` (320ms `out`). Drag → notch follows pointer with damping at boundaries (per Emil's damping technique — see `reference_motion.md`). Pointer capture during drag (so user can drag off the ring without losing the gesture).

Source: cal:2026-05-28 R19 — Credit Card 2026 ✅ page `54499:44995` ("Repayment - Full, min, custom"), 10+ frames with explicit on-canvas behavior spec sticky ✅

#### Credit utilisation card

White outline-subtle card with 2-segment horizontal bar showing utilised vs available limit + 3 amount rows.

1. Card title `Credit utilisation` H4 top-left
2. **Row 1**: `₹63,000` (utilised) left + `₹37,000` (available) right; below each: `Utilised limit` (V-500 caption) + `Available limit` (secondary caption)
3. **Horizontal bar full-width** below: V-500 (utilised portion) + slate-10 track (remaining)
4. **Row stack below the bar**: `Billed spends ₹50,000` · `Unbilled spends ₹10,000` · `slice in 3 EMIs ₹3,000`
5. **Surplus variant**: utilised = ₹0, available shown alone with full V-500 bar at 0% (or alternative treatment). `Surplus` row in green with subtitle "Surplus is the excess balance on your credit card adjusted against spends or refunded to savings account within 5-7 working days"

Source: cal:2026-05-28 R19 — Credit Card 2026 ✅ page `43643:14498`, 2 utilisation card variants (normal + surplus)

#### Product picker split layout

2-card vertical stack for choosing between activated products (Savings vs Credit). Distinct from chooser-list (Atom-style) and L0 cards.

1. **X close top-left** (no chevron, no title)
2. Header inset 32px from top: H2 `Choose a product` + caption secondary `You can activate other products later`
3. **2 white-shadow cards** (Radius L, padding 24), 24px gap
4. Each card: title H3 left + 2-line caption secondary + ~96px decorative pink-purple gradient illustration trailing
5. Cards tappable as a whole — no CTA inside, no chevron
6. **No bottom-anchored Primary** — tap target = whole card

Source: cal:2026-05-28 R19 — Credit Card 2026 ✅ page `43975:747`, standalone canonical frame

---

### Payment OS — Transition envelope (rewarded vs un-rewarded)

Confidence: medium-low (subagent couldn't drill into individual frames; durations inferred from existing slice motion conventions). Marked here as canonical but should be calibrated against per-frame node samples before relying on durations.

**3-stage success transition envelope** for payment-completion:

| Stage | Un-rewarded (NO_REWARDS) | Rewarded (FIRE / MONIES / SPARK+FIRE+MONIES / CASHBACK) |
|---|---|---|
| 1. Brand-immersion | (skipped) | Pink full-bleed brand background (~brand pink `#E14ED7` family) — held briefly |
| 2. Reveal | (skipped) | Reward / state visual on the pink immersion (fire-mode card art, monies green-motif, cashback amount, etc.) |
| 3. Resolve | White screen with green grainy gradient tick (~120px) + `Paid ₹X` H2 | Same white-tick resolve frame as un-rewarded |

WHY pink immersion for rewarded txns: rewards are a brand moment — slice celebrates the user-unlocked event before resolving to the canonical confirmation. The pink immersion acts as a brand-celebratory beat. Un-rewarded txns skip directly to the confirmation because there's no celebration to land.

Scenario variants observed (12+ rows in the canonical file):
`NO_REWARDS` · `FIRE` · `FIRE+MONIES` · `FIRE+INSTANT_CASHBACK` · `POST_FIRE+CARD_CHANGE` · `MONIES` · `SPARK+FIRE+MONIES` · `SPARK+FIRE+MONIES+CASHBACK` · `NPS` · `FAILURE` · `PENDING` · `LOW_NET_LOADING` · `PRESS_FOR_CARD_OPENING`

Motion choreography is documented in `reference_motion.md` (campaign-pill reveal sequence is the highest-confidence finding; payment-status envelope durations are TBD pending per-frame calibration).

Source: cal:2026-05-28 R19 — Payment OS 26 `xIc12scqCFBSJ5Kgyd6Krh` canvas `30:18423` Txn status page. Per-frame node IDs not extracted (metadata timeouts). WHY captured at canvas level; durations TBD.

---

## R19 reverifications (existing rules updated)

### CTA anchoring — 3 valid patterns (not 2)

Existing rule (R11): two valid CTA-anchoring patterns — bottom-anchored Primary (default) + small centred CTA.

**Update (R21 revision)**: pattern 3 ("full-width Primary mid-screen") emerged from R19 from Atom returning-user L1 + Profile overlay. **R21 Profile V3 supersedes Profile's half** — Profile no longer uses mid-screen Primary (it uses the 2-up action tile grid instead). **Only Atom returning-user L1 still validates this pattern.** Revised condition:
- The hero shows actionable summary data, AND
- The Primary action operates on that data (Create atom → grows the total above; Invite & earn → user-initiated action on profile data)
- The surface isn't a real flow (Atom L1 doesn't progress to a next-step; Profile is overlay-style)

All three patterns valid:
1. **Bottom-anchored full-width Primary** — default for L1+ flows
2. **Small centred CTA** (Small 36px Secondary) — under short empty states
3. **Mid-screen full-width Primary** — for hero-with-actionable-data surfaces (Atom L1, Profile overlay)

Source: cal:2026-05-28 R19 — Atom `8534:23336` + Profile (R18 `2486:75064`) ✅

### Pod-title capitalisation (clarification)

Existing rule (R18): pod titles are CAPITALIZED on App bar L0 (Banking / Explore / Credit / Activity), overriding the R14 lowercase rule.

**Clarification**: pod titles on App bar L0 = CAPITALIZED. L1 surface descriptors (multi-word, describing the surface not the pod, like `credit card`, `add money`, `atom`) can run lowercase per brand voice. The capitalization rule applies specifically to pod-level chrome.

Source: cal:2026-05-28 R19 — Credit Card 2026 `45748:1462` shows `credit card` lowercase on Credit Card L1 ✅
