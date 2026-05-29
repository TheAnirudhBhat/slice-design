---
name: slice entry points — feature → native location + secondary triggers
description: Per-feature surface map. Where each feature lives natively + every secondary trigger / shortcut that opens it. Helps Claude know "this feature's home is X, but it can also be entered from Y, Z, W with these UI treatments."
type: reference
---

# slice feature entry points

Every slice feature has ONE native home (where the recipe lives, where the full anatomy is) and possibly MULTIPLE secondary triggers (shortcuts from other contexts where a compact treatment points back to the native flow).

This file maps each feature to its native location + secondary triggers + the UI treatment used at each entry point.

WHY this file exists: when Claude is asked to "add a shortcut to feature X" or "what's the right way to surface Y in Z context," knowing the entry-point taxonomy prevents inventing redundant or competing entry treatments. The user's mental model is "this feature lives HERE, and I can shortcut to it from THERE."

---

## How to read this file

Each feature entry has:
- **Native home** — where the full recipe lives
- **Recipe treatment at native** — what the user sees on the canonical surface
- **Secondary triggers** — every other surface that opens this feature
- **Compact treatment per trigger** — what the user sees at each shortcut (different from native — smaller, more directive)
- **Cross-pod hops** — when a trigger crosses pod boundaries (e.g. Payments low-balance prompt → Banking Add money)

---

## Banking pod features

### Add money to Savings
- **Native home**: Banking L0 → Savings L0 Large card → `Add money` Primary Small CTA (inline in card footer)
- **Recipe treatment**: full Primary CTA with verb+context label, paired with `Grow your savings / Earn interest daily` caption stack
- **Secondary triggers**:
  - **Atom setup form** (Banking → Atom sub) — `Add money` form for one-shot atom contribution; same anatomy, but destination = atom
  - **Payments L0 low-balance prompt** (Payments → Banking hop) — when user tries to pay > balance, a snackbar or sheet prompts "Add money first" with deep-link to Add money form
  - **Action centre nudge** (Activity → Banking hop) — "Top up to earn interest" type nudges
  - ~~Profile (R18 — deprecated)~~ — was a path in R18; Profile V3 doesn't have it

### Open / manage a Fixed Deposit
- **Native home**: Banking L0 → FD L0 Medium card → `Invest now` Tertiary Small pill (grey)
- **Recipe treatment**: card with green "8.5% p.a." pill + green-text rate insight + grey Invest now CTA + trailing graph-with-people illustration
- **Secondary triggers**:
  - **Spark FD details L1** — for premature withdrawal or modifying an existing FD
  - **Atom recurring contribution** — sets up a recurring savings mechanic that may map to FD-like behaviour
  - **Banking L0 callout** (rare) — when slice ships a limited-time FD rate promo, may surface as a Blue-50 in-card callout pointing to FD list
- **Cross-pod hops**: none — FD is Banking-internal

### Create an Atom (goal-based savings)
- **Native home**: Banking L0 → `slice atom` L0 Medium entry card → `Let's go` Tertiary Small slate-10 pill → Atom Feature PDP pair
- **Recipe treatment**: dedicated 2-page FTUX (Feature PDP page 1 brand hero + Feature PDP page 2 benefits list) → chooser → setup form shell → returning-user L1
- **Secondary triggers**:
  - **Atom returning-user L1** → mid-screen Primary `Create atom` (skips FTUX, goes straight to chooser)
  - **Action centre nudge** "Set up your first atom" (Activity → Banking hop)
- **Cross-pod hops**: none — Atom is Banking sub-product
- **Decision**: the `Let's go` Tertiary slate-10 pill on Banking L0 is intentionally quiet (not Primary V-500). Why: it's an exploration prompt, not a financial action. Primary would over-emphasise vs the actual Banking actions (Add money, Invest now).

### View Banking balance / Total balance
- **Native home**: Banking L0 — Savings L0 Large card shows balance + interest insight
- **Secondary triggers**:
  - Dedicated **Balance L1** screen — centred Display amount via Top header, accessed by tapping the Savings card (or balance area)
  - Profile V3 metric strip — Cashback / Interest / Payments aggregates (NOT balance, but related)

---

## Payments pod features

### Pay someone via UPI (universal payment flow)
- **Native home**: Payments L0 dialer (brand-immersive V-500 takeover)
- **Recipe treatment**: full-bleed V-500 page + custom keypad + Action Pills row + Request / Transfer Tertiary pills + floating QR-scan dock
- **Secondary triggers**:
  - **Floating bottom dock QR-scan** from ANY pod (cross-pod) — drops user into QR scanner, which routes to Pay person on QR detect
  - **Activity row tap re-pay** (Activity → Payments) — tap a recent txn row, get an action sheet with "Pay again" option that pre-fills payee + amount
  - **Contacts widget** — system-level shortcut (if exposed) deep-links into Pay flow
  - **Push notification** "Request from [payee]" → Pay flow with payee pre-filled
- **Cross-pod hops**: Activity → Payments, any pod's bottom dock → Payments

### Receive money (passive — UPI credit)
- **Native home**: there's no "Receive" surface — it's a passive event
- **Surface treatments**:
  - Push notification (system-level)
  - Positive Green snackbar (in-app, if app is foregrounded)
  - Action centre row (if app is backgrounded)
  - Activity L0 row prepends with sticky date header update
  - Banking L0 Savings card balance value-changes
- **Decision**: slice deliberately doesn't have a "Show my receive QR" Primary CTA — users share QR via Profile V3's hero card. Why: Receive isn't a recurring action; it's incidental. Don't waste Payments L0 chrome on it.

### Request money
- **Native home**: Payments L0 → `Request` Tertiary pill (bottom-anchored alongside Transfer)
- **Recipe treatment**: Tertiary white-outline pill on V-500 surface, paired with Transfer at equal weight
- **Secondary triggers**:
  - **Group expense splitting** (TBD — if shipped) — would route through Request mechanism
- **Decision**: Request is a Tertiary pill, not a Primary. Why: send-money is the primary intent on Payments L0; Request is secondary. Equal-weight pill placement (alongside Transfer) signals "either path is valid" without making one dominate.

### Scan QR
- **Native home**: Payments L0 floating bottom dock — central scan icon (large white circle + V-500 glyph, prominent)
- **Recipe treatment**: the dock's signature action — visually largest icon, central position, only icon with full white-circle bg
- **Secondary triggers**:
  - **Bottom dock from any pod** — same dock icon visible from Banking / Explore / Credit / Activity / Payments
  - **System share** — if a QR code is shared via OS share sheet, slice's share-handler routes to scan
- **Cross-pod hops**: every L0 has access to scan via dock — by design, no pod gatekeeps scan
- **Decision**: scan being on the dock (not a tab) means it's always one tap away, regardless of context. Why: QR payment is the most-used slice action; gatekeeping it inside Payments pod would add a step.

### View / share my UPI QR
- **Native home**: Profile V3 hero card (QR-as-identity hero)
- **Recipe treatment**: dot-pattern QR (~224×224) with photo Avatar overlaid centre — inside the white hero card on Profile V3
- **Secondary triggers**:
  - **Profile V3 2-up action grid** → `View UPI / Manage accounts` right tile (when UPI activated) routes to a dedicated QR view OR account management
- **Decision**: QR-as-identity-hero is a Profile V3 invention. Why: Profile is the user's identity surface; the QR IS the user's payment handle, so making it the visual centre of Profile lands product-meaning + screen-real-estate correctly.

---

## Credit pod features

### Repay credit card bill
- **Native home**: Credit L0 → Credit Card L1 → Repay CTA (likely via Total due summary footer when bill is due) → Repayment rotary dialer
- **Recipe treatment**: rotary dialer with 3 chips (Min due / Total due / Full BE-config) + cohort-encoded ring color (orange/green/blue)
- **Secondary triggers**:
  - **Action centre notification** "Your credit card bill is due in N days" → direct deep-link to Repayment dialer
  - **Push notification** → same deep-link
  - **Credit L0 in-card Blue-50 callout** "Pay bills with credit card" — though this is more about UPI-on-credit-card than bill repay
  - **Autopay surface** — automates this flow (set-and-forget)
- **Decision**: Repayment dialer is novel — slice doesn't use it elsewhere. Why: repayment is a constrained choice (Min / Total / Full / Custom-in-between), not free-form. The dialer visualises the range AND the cohort instantly. Numpad input would lose the cohort signal.

### View credit limit / available balance
- **Native home**: Credit L0 → tap card hero → **Credit Card L1** (limit dashboard)
- **Recipe treatment**: white card hero with `slice ··5732` + Display amount `₹2,50,000` + `Available limit` caption + Green-50 UPI activated callout
- **Secondary triggers**:
  - **Credit L0 in-card callout** (when limit changes / is increased via CLI)
  - **Action centre** "Your limit was increased" notification
- **Note**: Credit Card L1 is DISTINCT from Credit home / bill summary L1 (which is about spends, not limit). See `reference_pod_credit.md` for the disambiguation.

### Set up Autopay
- **Native home**: Explore L0 → AUTOPAY tile in 2×2 grid (also accessible from Credit pod)
- **Recipe treatment**: tile with "1 active" or count indicator → routes to autopay management
- **Secondary triggers**:
  - **Credit Card L1 callout** prompting "Never miss a bill — set up autopay"
  - **Action centre nudge** post-first-bill-payment

### Split a purchase with slice in 3
- **Native home**: Credit L0 in-card V-50 callout "Split spends with slice in 3" OR from a recent txn row that's eligible
- **Recipe treatment**: V-50 brand callout → tap → slice in 3 review screen with 3-month EMI breakdown
- **Secondary triggers**:
  - **Transaction detail L2** for an eligible txn → "Split with slice in 3" option
  - **Action centre** nudge after a high-value purchase
- **Decision**: slice in 3 is opt-in per-transaction, not a default mode. Why: splitting adds debt; defaulting it on would be predatory. Always user-triggered.

### Apply for credit limit increase (CLI)
- **Native home**: Credit L0 in-card Blue-50 informational callout "Get more limit" → CLI flow
- **Secondary triggers**:
  - **Action centre eligibility nudge** when system detects user is eligible
  - **Credit Card L1 callout** alongside the Available limit display

---

## Activity pod features

### Search transactions
- **Native home**: Activity L0 → tap search bar (always-visible component below App bar L0)
- **Recipe treatment**: search bar opens into Search-type App bar (full-bar search variant), live-filtered txn list below
- **Secondary triggers**:
  - **System spotlight / app shortcuts** (if exposed) → deep-link to search
- **Decision**: search bar is always-visible on Activity L0 (not behind a search icon). Why: search is high-intent — users come to Activity to find a specific txn. Hiding it behind an icon adds a tap.

### Filter transactions
- **Native home**: Activity L0 → filter icon button trailing the search bar (white + outline-subtle + slate glyph per R19)
- **Recipe treatment**: filter button opens Action driven bottom sheet (no handle) with chip picker for category / date range / amount range / type
- **Secondary triggers**:
  - **Activity L2 (within a txn category)** — drilling into a category may pre-filter the list

### Review a transaction
- **Native home**: Activity L0 → tap any txn row → Transaction detail L2 (R19 4-state status header recipe)
- **Recipe treatment**: full-screen detail with status indicator + section stack
- **Secondary triggers**:
  - **Push notification** for important state changes → deep-link to txn detail L2

### Triage notifications (Action centre)
- **Native home**: Profile V3 → bell icon top-right (red badge dot when nudges exist)
- **Recipe treatment**: bell tap → Action centre L2 (outline-border cards with H4 title + Avatar top-right + optional Primary CTA bottom-left inside card)
- **Secondary triggers**:
  - **Activity-adjacent surface** — Action centre is technically an Activity pod surface, surfaced through Profile bell
  - **Push notification tap** → direct to Action centre row
- **Decision**: Action centre was a row in R18 Profile settings list. R21 promoted it to a bell badge. Why: notifications are time-sensitive — a row in a settings list buries them. Bell with badge dot is the universal app convention for "you have unread."

---

## Explore pod features

### Recharge & pay bills
- **Native home**: Explore L0 → Recharge & bills L0 Large white card (top of Explore L0)
- **Recipe treatment**: card with H4 title + Blue-500 "₹0 FEE" pill + 4-up icon grid + dashed divider + reward row carousel
- **Secondary triggers**:
  - **Bills L1 "All bills" pill** (Bills sub-pod) — once user has bills, the pill provides a shortcut from Recharge L1
  - **Action centre nudge** for due bills
  - **Push notification** for due bills
- **Cross-pod hops**: Explore → Bills sub-pod; Bills payment may hop to Payments for the final pay step (TBD pending per-biller flow sweep)

### Invite & earn
- **Native home**: Profile V3 → 2-up action grid → `Get ₹150 Invite friends` left tile (always green-Avatar leading)
- **Recipe treatment**: 148×126 action tile with green-fill Avatar S-32 + H4 title + caption subtitle
- **Secondary triggers**:
  - **Explore L0 INVITE tile** in 2×2 grid (pink-fill avatar + "Earn ₹150")
  - **Banking L0 Savings card callout** (rare, marketing-time)
  - **Payment OS post-payment nudge column** (the invite_earn_hook_magnet illustration)
- **Decision**: Invite has multiple entry points because referral is high-value. Different surfaces use different visual treatments (Avatar fill colour differs) but all route to the same share flow.

### Earn fires (Spark gamified streak)
- **Native home**: not user-initiated — happens automatically on qualifying payments
- **Surfacing treatments**:
  - **Payment confirmation** — pink-immersion intermediate + Spark hero reveal motion + "fires earned" displayed
  - **Explore L0 PLAY & WIN tile** shows current fires count
  - **Banking L0 monies card** shows monies balance (related but distinct from fires)
- **Trigger**: any qualifying payment fires this

### Claim a reward
- **Native home**: Transaction detail L2 → Spark Offer callout → Reward claim bottom sheet
- **Recipe treatment**: full-width V-50 (light) / V-700 (dark) callout pill with V-500 Bold Avatar leading + H4 + caption + chevron — whole-row tap target
- **Secondary triggers**:
  - **Push notification** "Your reward is waiting" → direct to claim
  - **Activity row tap on a rewarded txn** → txn detail → callout

### Check credit score
- **Native home**: Explore L0 → CREDIT SCORE tile in 2×2 grid
- **Recipe treatment**: tile shows current score (e.g. `785`) with H4 label
- **Secondary triggers**:
  - **Credit pod callout** (rare, when score changes)

---

## Profile / settings features

### Edit profile details
- **Native home**: Profile V3 → Profile details row → Profile details L2
- **Recipe treatment**: Standard list-row in settings list (Pricing / About cluster) with leading bare line icon
- **Secondary triggers**:
  - **Onboarding/KYC flow** during account creation (different first-time entry)
  - **Action centre nudge** when document is expiring

### Manage UPI accounts
- **Native home**: Profile V3 → 2-up action grid → `View UPI / Manage accounts` right tile (when UPI activated)
- **Secondary triggers**:
  - **Pay flow's source picker** — picks among linked accounts but doesn't allow add/remove from there

### Download statements / ITR
- **Native home**: Profile V3 → Statements row (appears conditionally when user is ITR-eligible) → Statements L2
- **Recipe treatment**: row has trailing `DOWNLOAD ITR` action pill (V-50 fill, UPPERCASE Metadata)
- **Secondary triggers**: none documented

### Help & support
- **Native home**: Profile V3 → Help & support row (top of settings list, intentionally first)
- **Secondary triggers**:
  - **Transaction detail L2** → `Contact us` V-500 text link at bottom of stack
  - **Error states** → Maintenance + critical errors may surface a "Contact us" link

### App settings (notifications / preferences)
- **Native home**: Profile V3 → App settings row
- **Secondary triggers**: none — settings are intentionally siloed

---

## Cross-cutting features (no single native home)

### Pricing transparency
- **Native home**: Profile V3 → Pricing row (with `TAG` Status pill trailing — likely indicates user's tier)
- **Secondary triggers**:
  - **Transaction detail L2** may show per-txn fee breakdown
  - **Footer disclosure** on payment flows

### Bank account selection / source picker
- **Native home**: no single home — appears as a Payment-cluster bottom sheet (with handle) inside every flow that needs a source account (Add money / Pay / Repay / Atom contribution / FD purchase)
- **Recipe treatment**: bottom sheet with H3 + icon rows + green-check disc on selected + "Add another account" tertiary row + "Powered by UPI" monogram footer
- **Decision**: source picker is a SHEET, not a screen. Why: it's a quick decision-point in a larger flow — interrupting with a full screen would lose flow context. Sheet preserves the underlying surface.

### PIN entry
- **Native home**: no single home — appears in every money-action flow (Pay / Add money / Repay / Atom contribution / FD)
- **Recipe treatment**: App bar Standard with dynamic title (`Pay ₹X to [payee]`) + Display title + **system keyboard** (NOT slice custom keypad)
- **Decision**: PIN uses system keyboard. Why: security context — OS-managed keyboard prevents potential overlay attacks slice's custom keypad couldn't.

---

## Decision principles for entry-point design

When designing how a new feature will be surfaced:

1. **Pick ONE native home — don't spread the recipe** — the canonical anatomy lives in one place. Secondary triggers point back.

2. **Native treatment is full; secondary treatment is compact** — the native shows the full recipe (Banking Savings card with all sub-elements). Secondary shortcuts use smaller / more directive UI (callout, tile, snackbar, push) and inherit the same flow on tap.

3. **Don't double up the visual register at multiple entry points** — if the native Add money CTA is V-500 Primary, a secondary trigger should NOT also be V-500 Primary. Use Tertiary or callout treatment to differentiate.

4. **Cross-pod hops should preserve flow integrity** — when Payments → Banking for Add money, the Add money flow doesn't restart from Banking L0; it deep-links into the Add money form, completes, returns to Payments.

5. **Don't add an entry point without removing visual debt elsewhere** — every new entry point is screen real estate. If you add a "Quick action" tile in Payments for Set up autopay, evaluate if the Explore tile or the Credit Card L1 callout becomes redundant.

6. **Push notifications + Action centre + Snackbar share the same trigger** — when a backend event happens (bill due, payment received, KYC pending), it surfaces in 3 places synchronously: push (out-of-app), Action centre (in-app, durable), snackbar (in-app, transient). Don't pick one — they serve different visibility tiers.

7. **Native home owns the anti-patterns** — a recipe's "what it doesn't do" list lives at the native home. Secondary triggers inherit those bans (you don't get to violate them just because you're a shortcut).

---

## How to use this file

Load this when:
- Designing a new feature — pick its native home + decide on secondary triggers
- Reviewing an existing feature — verify entry points are consistent + non-redundant
- Routing a flow — figuring out which surface owns step N of a flow
- Tracing cross-pod connections — see which pods hand off to which

Don't load this for:
- Full anatomy of a single surface → pod file or `reference_dls_screen_layouts.md`
- Flow connectivity (step-by-step) → `reference_flows.md`
- Hard rules → `reference_pod_cross_cutting.md`

---

## Calibrated through

R21 (2026-05-28). Entry points derived from R11-R21 surface recipes + R20-R21 flow sweeps. As new features ship, add entry-point entries here.

Open / pending:
- Per-biller bill pay flow entry points
- Onboarding / KYC entry points
- Surcharge disclosure entry points
- Card delivery / activation entry points
