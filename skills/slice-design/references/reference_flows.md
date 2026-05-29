---
name: slice product flows — god view
description: How surfaces connect into product journeys. Every major flow documented end-to-end with entry point → decision branches → exit states + cross-pod handoffs. Load this when designing or judging a screen to understand what flow the screen is part of, not just its visual recipe.
type: reference
---

# slice flows — god view of the app

Pod files document surfaces. Component refs document anatomy. This file documents **how surfaces connect into journeys** — the connective tissue the user actually traverses.

A flow has:
- **Native entry point** — where the user typically starts
- **Secondary triggers** — other places the same flow can be entered
- **Decision branches** — where the path forks (saved payee vs new, PIN required vs not, success vs fail)
- **Exit states** — what success looks like + what failure looks like
- **Cross-pod handoffs** — when a flow crosses pod boundaries (Banking → Payments → Activity)

Notation: `Surface name` (pod) → `Next surface` (pod). Pod tags help see the cross-pod hops.

---

## Money flows

### Add money to Savings
Native entry: Banking L0 Savings card "Add money" Primary CTA.

```
Banking L0 (Banking)
  → [tap Add money on Savings hero]
  → Amount entry (Banking) — big centred Display amount + numpad
  → [enter amount, tap Continue]
  → Source selector bottom sheet (Banking) — Pay from picker (Payment cluster, handle YES)
  → [pick source account: HDFC / SBI / linked bank]
  → PIN entry (cross-pod, brand-immersive V-500) — App bar Standard, system keyboard
  → [enter PIN]
  → Loading interstitial (Banking) — pink-immersion if rewarded
  → Payment confirmation (Activity-style) — grainy gradient tick + "Added ₹X to Savings"
  → [Done] → back to Banking L0 (balance updated, value-change motion on Savings card)
  → [Share receipt] → share sheet
```

**Secondary triggers**:
- Atom setup form "Add money to atom" (Banking) — same flow but destination = atom, not Savings
- Payments L0 low-balance prompt (Payments → Banking) — when user tries to pay > balance
- Profile rare path (deprecated — no longer in Profile V3)

**Decision branches**:
- If source is slice's own account (intra-app transfer) → skips OTP, just PIN
- If source is external bank → may add OTP step after PIN
- If amount > daily transfer limit → block with "Limit exceeded" sheet (Action driven, red avatar) before continuing

**Exit states**:
- Success: confirmation tick screen, balance ticker animates on Banking L0 return
- Failed: red Avatar Bold X + "Adding ₹X to Savings failed" + Retry / Cancel
- Pending: amber ring + "Adding ₹X — Processing" with status-coloured caption

### Pay someone via UPI (the canonical Payments L0 flow)
Native entry: Payments L0 dialer.

```
Payments L0 (Payments) — V-500 brand-immersive dialer, Action Pills row, custom keypad
  → [enter amount via keypad]
  → "Enter amount to transfer" caption disappears, action pills row settles
  → [tap Transfer OR scan QR via floating dock]

  ── Branch A: scan QR ──
  → QR scanner (Payments) — full-screen camera with QR-detect overlay
  → [QR detected, payee resolved]
  → Pay person (Payments) — V-500 full-fill, X close, payee identity + amount + Add a note
  → [Pay button or scrim-confirm]
  → PIN entry (Payments) — App bar Standard "Pay ₹X to [payee]" dynamic title, system keyboard
  → [enter PIN]
  → Loading transition — pink-immersion if rewarded (FIRE/MONIES/SPARK+FIRE+MONIES)
  → Payment confirmation (Activity-style) — grainy tick + "Paid ₹X to [payee]"

  ── Branch B: Transfer pill ──
  → Recent payee list OR contacts picker bottom sheet (Payments cluster, handle YES)
  → [pick payee]
  → Pay person → PIN entry → ... (same as Branch A from here)

  ── Branch C: paste UPI ID ──
  → UPI ID input bottom sheet (Payments → Information cluster, handle YES)
  → [paste/type UPI ID, tap Continue]
  → Pay person → PIN entry → ...

  ── Exits ──
  → [Done] → back to Payments L0 (UPI ID pill survives, monies/fires pills tick)
  → [Share receipt] → share sheet
```

**Decision branches**:
- Rewarded txn (FIRE / MONIES / SPARK+FIRE+MONIES / FIRE+CASHBACK) → 3-stage envelope: brand-immersion pink → reveal (reward card art) → resolve (white tick)
- Un-rewarded txn → straight white tick (no pink intermediate)
- Failed → Transaction Failed (full screen, X close, red Avatar Bold X)
- Pending (NEFT) → "Payment initiated" with blue indicator + "Amount will be credited within 2 hours"

**Secondary triggers**:
- Activity row tap (Activity → Payments) — re-pay or new payment to same payee
- Bottom dock QR-scan from any pod (cross-pod → Payments)
- Atom contribution "Add money" → routes to internal transfer, not Payments L0

### Request money via UPI
Native entry: Payments L0 — `Request` Tertiary pill (bottom-anchored alongside Transfer).

```
Payments L0 (Payments)
  → [enter amount, tap Request]
  → Payee selector (Payments) — Recent/Contacts/Paste UPI ID picker
  → [pick payee]
  → Request review screen (Payments) — payee identity + amount + optional message
  → [Send request]
  → Confirmation: "Request sent to [payee]"
  → [back to Payments L0]
```

Note: incoming Requests surface in Action centre as a notification.

### Receive payment (passive)
Native entry: none — happens automatically when someone pays you.

```
[Background: incoming UPI credit]
  → Push notification (system-level)
  → If app open: Snackbar (slice — positive green, "Received ₹X from [sender]") at bottom
  → If app backgrounded: Action centre adds a row
  → Activity L0 prepends the new transaction row (sticky date header updates)
  → Banking L0 Savings card balance value-changes (animated ticker)
```

---

## Credit flows

### Repay credit card (rotary dialer flow)
Native entry: Credit L0 → Credit Card L1 → Repay CTA.

```
Credit L0 (Credit) — white L0 Large card with spends + recent txns + Blue-50 callout
  → [tap card hero OR Repay surface from callout]
  → Credit Card L1 (Credit) — limit dashboard with available limit + UPI activated callout
  → [tap Repay from somewhere — possibly from a Total due summary footer that appears when bill-due window opens]

  → Repayment dialer (Credit) — rotary input with 3 chips (Min due / Total due / Full)
  → [user picks chip via tap OR drags dialer to custom amount]
  → Ring color encodes cohort: orange (under-pay) / green (pay-total) / blue (over-pay / pay-next-month)
  → Caption above ring updates: "Paying minimum due" / "Paying less than total due" / "Paying total due" / "Paying more than total due" / "Paying early for next month"
  → [tap Repay Primary CTA]

  → Source account picker bottom sheet (Payment cluster, handle YES) — same component as Pay from
  → [pick source]
  → PIN entry → loading → confirmation tick
  → [Done] → back to Credit Card L1 (limit updates, recent txn row appears in Activity)
```

**Decision branches**:
- Overdue state → red `Overdue by N days` chip appears beneath dialer title (chip palette unchanged — drag-dial still functions)
- "Full" chip is BE-configurable — currently ships as Min + Total only; Full appears in experiments

**Secondary triggers**:
- Action centre notification "Your credit card bill is due in N days" — direct deep-link to Repayment dialer
- Push notification → Repayment dialer (same deep link)
- Autopay setup (Credit) — automates this flow

### View credit card limit / available balance
Native entry: Credit L0 → tap card hero (or callout).

```
Credit L0 → Credit Card L1 (limit dashboard) → [optionally] → Statements L2 OR Repayment dialer
```

### slice in 3 — split a purchase into 3 EMI
Native entry: Credit L0 → callout in card (V-50 brand variant) OR directly from a recent txn row.

```
Credit L0 / txn detail
  → [tap "Split with slice in 3" callout]
  → slice in 3 review (Credit) — 3-month EMI breakdown + interest disclosure
  → [Confirm split]
  → Confirmation
  → Activity reflects the txn as split (sub-rows for 3 EMI installments visible in txn detail)
```

### Apply for credit limit increase (CLI)
Native entry: Credit L0 callout "Get more limit" (Blue-50 informational) OR Action centre nudge.

```
Credit L0 → CLI eligibility check (Credit) → income docs upload → review → submitted state
```

---

## Banking flows

### Set up Atom (FTUX — first-time experience)
Native entry: Banking L0 Atom entry card OR Action centre nudge.

```
Banking L0 (Banking) — Atom entry card with green + Live pill + Tertiary "Let's go" pill
  → [tap "Let's go"]
  → Atom Feature PDP page 1 (Banking sub) — brand hero with 3D orb + "slice atom" 2-tone title + "Get started"
  → [tap Get started OR chevron-down peek]
  → Atom Feature PDP page 2 (Banking sub) — benefits list (4 V-500 line-icon rows) + "Get started"
  → [tap Get started]

  → Atom chooser picker (Banking sub) — outline-border card rows (Emergency fund / Daily saver / Round up / Create your own)
  → [tap a starter OR Create your own]

  ── Branch: starter atom selected ──
  → Atom setup form shell (Banking sub) — illustration tile + Metadata UPPERCASE product name + amount entry + preset chips + Adding from account selector
  → [enter amount, tap Continue]
  → PIN entry → loading → confirmation
  → Atom returning-user L1 (Banking sub) — Display amount hero + mid-screen Primary "Create atom" + active atoms list

  ── Branch: Create your own ──
  → Custom atom screen (Banking sub) — name + emoji/photo tile chooser + suggestion chips
  → [name atom, pick image]
  → Atom setup form shell (same as above)
  → ... (same as starter branch)
```

**Decision branches**:
- Recurring atom → setup form adds frequency + schedule + "Start from today" toggle
- Round-ups atom → setup form adds Round up multiplier (1× / 2×) + how-it-works explainer link

### Contribute to existing atom
Native entry: Atom returning-user L1 → tap an active atom row.

```
Atom L1 → tap atom row → atom detail (Banking sub) → Add money form (one-shot)
                                                  OR Modify recurring schedule
                                                  OR Pause / Withdraw
```

### Open a Fixed Deposit
Native entry: Banking L0 FD card "Invest now" Tertiary pill.

```
Banking L0 (Banking) — FD card with green "8.5% p.a." pill + Invest now Tertiary
  → [tap Invest now]
  → FD tenor selector (Banking sub) — plan picker bottom sheet (Payment cluster) with stroke-as-selected variant
  → [pick tenor]
  → FD amount entry → source picker → PIN → confirmation
  → Banking L0 FD card balance updates (value-change motion)
```

### Withdraw from FD (premature)
Native entry: Spark FD details L1 → "Withdraw" Tertiary CTA.

```
Spark FD details L1 (Banking sub) — FD details with tenor + maturity + interest accrued
  → [tap Withdraw]
  → Withdrawal review bottom sheet (Action driven cluster, no handle) — destructive confirm with penalty disclosure
  → [Confirm withdraw]
  → PIN → loading → confirmation
```

---

## Bill payment flows

### Add bills via SMS (auto-fetch FTUX)
Native entry: Explore L0 Recharge & bills card → All bills pill in L1.

```
Explore L0 (Explore) → tap Recharge & bills card
  → Recharge & bills L1 (Bills) — 4-up category grid + reward callout carousel + All bills pill trailing
  → [tap All bills pill (red dot if fresh bills available)]
  → Auto fetch bills interstitial (Bills) — FTUX permission opt-in with bullets + Continue Primary
  → [Continue]
  → Loader 1: Finding your bills (full-screen, purple magic-hat illustration)
  → [bills detected]
  → Add bills selector (Bills) — checkbox list of detected billers
  → [tap Add]
  → Loader 2: Adding your bills (confetti dot cloud)
  → Success state: green check + "Bills added successfully" → auto-progress
  → My bills L2 (Bills) — segmented All / Pending tabs
  → FTUX tooltip points at the All bills pill
```

**Decision branches**:
- No bills detected → "Add bills manually" screen (orange-sphere illustration + Add manually Primary)
- All Bills pill HIDES when user has zero bills AND no auto-fetch (don't show 0-state)

### Pay a single bill
Native entry: My bills L2 (Pending tab) → row Pay pill.

```
My bills L2 (Bills) → Pending tab → [tap Pay slate-pill on a row]
  → [Not yet swept — per-biller pay flow in separate Figma file. TBD]
  → Eventually: biller detail → review amount → Continue → source picker → PIN → confirmation
```

### Manage bills (Add / Remove)
Native entry: My bills L2 → kebab trailing → Manage sheet.

```
My bills L2 (Bills) → [tap kebab]
  → Manage bottom sheet (Action driven cluster, no handle) — Add bill / Remove bill rows
  → [tap action]
  → Sheet closes → Loader 3 (inline magenta dots) → list refreshes
```

**Critical interaction rule**: never in-place list reshuffle while sheet visible. Sheet must close before list updates.

---

## Activity flows

### Review a transaction
Native entry: Activity L0 → tap any txn row.

```
Activity L0 (Activity) — App bar L0 + search bar + filter icon + flat txn list
  → [tap a txn row]
  → Transaction detail L2 (Activity) — 4-state status header (Success / Pending / Failed / Initiated)
  → status-coloured indicator + status-coloured caption + section stack
  → [optionally] tap Spark Offer callout → Reward claim bottom sheet
  → [optionally] tap inline map "Open maps" pill → system Maps
  → [optionally] tap Contact us → support chat
```

### Search transactions
Native entry: Activity L0 → tap search bar.

```
Activity L0 → Search input (full-bar Search variant of App bar)
  → [type query]
  → Filtered txn list (live filter)
  → [tap result] → Transaction detail L2
  → OR [tap clear-X] → returns to Activity L0
  → OR [chevron back] → returns to Activity L0
```

### Filter transactions
Native entry: Activity L0 → tap filter icon button.

```
Activity L0 → tap filter button (white + outline-subtle + slate glyph per R19)
  → Filter bottom sheet (Action driven cluster, no handle) — chip picker for category / date range / type
  → [apply filters]
  → Activity L0 with filtered list
```

### Triage Action centre
Native entry: any L0 → tap bell (Profile V3) OR Action centre row in Activity-adjacent surface.

```
Action Centre (Activity) — outline-border cards stacked, H4 title, Avatar top-right, Primary bottom-left in card
  → [tap card body OR Primary inside card]
  → Routes to relevant flow (Repayment dialer / Add money / KYC / etc.)
```

---

## Explore / Rewards flows

### Earn fires (Spark gamified streak)
Native entry: any payment action that qualifies.

```
[Background: user makes a qualifying payment]
  → Pink-immersion intermediate frame (Payments) — payment status transition envelope
  → Spark hero reveal motion: anchor → bling twitch → title push-up → rotate-out into brand pills
  → Payment confirmation tick + "fires earned: +1" surfaced
  → Explore L0 PLAY & WIN tile updates fires count
  → Banking L0 monies card may also tick if cashback hit
```

### Claim a reward (Spark Offer)
Native entry: Transaction detail L2 → Spark Offer callout.

```
Transaction detail L2 (Activity) → tap Spark Offer callout pill
  → Reward claim bottom sheet (Action driven, brand avatar) — "Claim reward" + "Play and win up to ₹1,000"
  → [Got it / Claim]
  → Routes to Spark game OR settles directly into monies
```

### Invite & earn referral
Native entry: Profile V3 → 2-up action grid → `Get ₹150 Invite friends` tile.

```
Profile V3 (Profile) → tap Get ₹150 tile
  → Invite share sheet — system share with referral link
```

**Secondary triggers**:
- Explore L0 2×2 grid → INVITE tile
- Payment OS Invite & earn nudge column
- Banking L0 callout in Savings card

---

## Settings / Profile flows

### View profile / share UPI QR
Native entry: any L0 → trailing photo Avatar tap → Profile V3.

```
Any L0 → tap trailing photo Avatar
  → Profile V3 (Profile) — QR-as-identity hero card + 2-up action grid + settings list + footer
  → [tap QR area] → QR detail / share UPI
  → [tap metric strip cell] → Lifetime with slice bottomsheet
  → [tap action tile] → Get ₹150 OR View UPI flow
```

### Edit profile details
Native entry: Profile V3 → Profile details row.

```
Profile V3 → tap Profile details row
  → Profile details L2 (Profile sub) — chevron-back + centred photo Avatar with edit pencil + Basic details + Address sections
  → [tap pencil on email row] → inline edit OR full edit form
```

### Download statement
Native entry: Profile V3 → Statements row (when conditionally present).

```
Profile V3 → tap Statements row
  → Statements L2 (Profile sub) — current month + Opening/Closing balance + Transactions + Email/Download buttons
  → [Download] → file save dialog
  → [Email] → email composer pre-populated
```

### Action centre
Native entry: Profile V3 → bell top-right (red badge dot when nudges exist).

```
Profile V3 → tap bell
  → Action Centre (Activity surface) — outline-border cards
  → [tap card] → routes to relevant flow
```

---

## Cross-pod handoff patterns

These are the recurring "I'm in pod A and need to do something that lives in pod B" patterns:

| From | To | Trigger | Returns |
|---|---|---|---|
| Banking | Payments | "Pay" from Savings card | After confirmation, returns to Banking L0 (balance updated) |
| Payments | Banking | "Low balance — add money" prompt | After add-money flow, returns to Payments L0 (continue pay) |
| Activity | Payments | Tap a txn row → re-pay same payee | Returns to Activity L0 |
| Credit | Payments | Repay flow → source picker | Returns to Credit Card L1 |
| Explore | Bills | Recharge & bills card tap | Bills L2 keeps user in Bills; back chevron returns to Explore L0 |
| Any pod | Profile | Trailing photo Avatar tap | X close returns to the underlying pod |
| Profile | Activity | Bell → Action centre | Back chevron returns to Profile |
| Payments | Activity | Confirmation tick → "Done" | Returns to Payments L0 |

WHY cross-pod handoffs matter: the user thinks in goals ("pay my electricity bill"), not pods. Slice's job is to route them through whichever pods own each step without exposing the pod structure as a navigation burden. The bottom nav stays anchored as the "I want to switch context entirely" affordance; in-flow cross-pod hops happen invisibly via push nav.

---

## Decision principles for flow design

When designing a new flow OR judging an existing one:

1. **One native entry, multiple secondary triggers** — each feature should have one canonical home (where the recipe lives) and any number of secondary entry points (shortcuts from other contexts). The native treatment is the full recipe; secondary triggers are compact pointers.

2. **Don't fork the flow at decision branches — converge** — if a flow has multiple entry paths (QR scan vs Transfer vs Paste UPI ID for Payments), they should converge to the same Pay person → PIN → confirmation chain. Forks force the user to know which path they're on.

3. **Confirmation surface follows the action's stakes** — money actions get full-screen confirmation (Payment confirmation tick recipe). Settings changes get a snackbar. Read-only triage (Action centre) gets no confirmation — the tap IS the act.

4. **Loading screens are part of the flow, not interstitials** — show a contextual loading state (purple magic-hat for "Finding your bills") that signals what's happening, not a generic spinner. Loading is a moment the user lives in; respect it.

5. **Error states preserve recovery context** — full-screen errors keep whatever chrome the user needs to recover (App bar L0 + dock = switch pods; chevron only = back out; no chrome = wait). Never strip all chrome on a recoverable error — that traps the user.

6. **Cross-pod hops don't change the visual register** — going from Banking L0 (white) → Payments L0 (V-500 brand-immersive) is a recognized hop, expected when going from "where money sits" to "where money moves." But going from Banking L0 → Settings shouldn't suddenly feel like a different app.

7. **Page transitions communicate flow direction**:
   - **Right slide-in** (translateX 100% → 0) = pushing forward into a flow step
   - **Left slide-in** (translateX -25% → 0) = popping back
   - **Bottom slide-up** (translateY 100% → 0) = modal / bottom sheet / takeover that's NOT a flow step (passes the screen the user is on)
   - **Fade** = state change in place
   - **Instant / no transition** = high-frequency action where animation would feel slow (filter pill tap, keyboard digit press)

   See `reference_interaction_layer.md` for the full transition taxonomy.

---

## How to use this file

Load this when:
- Designing a NEW flow — find the closest existing flow, copy its skeleton, document deviations
- Judging an existing flow — verify entry points, branches, exits match the rules above
- Tracing where a feature lives — search for the feature name to find its native + secondary entry points
- Understanding a cross-pod hop — verify the pattern matches one of the documented handoffs

Don't load this for:
- Single-surface anatomy → pod file or component ref
- Hard rules → `reference_pod_cross_cutting.md`
- Specific motion timings → `reference_motion.md`
- Specific interaction primitives → `reference_interaction_layer.md`
- Entry-point map per feature → `reference_entry_points.md`

This file is the connective tissue. The pod files + component refs are the body; this file is the nervous system that wires them together.

---

## Calibration status

Calibrated through R21 (2026-05-28). Flows are derived from R11-R21 surface recipes — when a recipe updates, this file should update too.

**Currently undocumented flows** (sweep when product files become available):
- Per-biller bill pay (biller-detail → fetch bill → review → pay → confirmation) — separate Figma file, not yet swept
- Onboarding / KYC flow — early app journey
- Card delivery + activation flow
- Spark game (the actual gamified mechanic, not just the reveal motion)
- Boost / CLI flow (full chain)
- Surcharge disclosure flow
- Account closure / deactivation flow

The above are flagged for future sweep — when frames are shipped, add to this file as new flow sections.
