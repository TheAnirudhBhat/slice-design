---
name: slice product model — the if-you've-never-seen-slice doc
description: Holistic product mental model. What slice is, who it's for, what each pod does + how pods relate, sub-product hierarchy, brand register, the slice way of doing things. Load this when designing or judging any slice surface to ground in product, not just visuals. Pairs with reference_flows.md (how surfaces connect) and reference_entry_points.md (where features live natively vs secondarily).
type: reference
---

# slice product model

If someone walked up cold and said "build slice", this is the file that answers "what is slice, what does it do, how do its pieces fit." It's product-first, not visual-first. The visual patterns in other references make sense only against this backdrop.

---

## What slice is

**slice** is a consumer fintech app for young India (18-35). It's where the user keeps money, moves money, borrows money, watches money, and earns rewards on money. The core thesis: financial life should feel friendly, transparent, and fast — not bureaucratic.

Three product lines:
1. **Banking** — savings account (partner-bank powered), fixed deposits, monies, goal-based savings (Atom)
2. **Credit** — the slice super card (credit card), repayments, autopay, credit-limit increase, bill summary
3. **Payments** — UPI as the everyday rails (send, receive, scan, request)

Plus three discovery / reward layers that cross-cut:
- **Spark** — gamified reward streaks (Fires)
- **Rewards** — cashback, leaderboards, "slice currency"
- **slice in 3** — split spends into 3-month EMI on credit

The user's mental model:
- **Banking** = where money sits
- **Payments** = where money moves
- **Credit** = borrowed money managed
- **Activity** = what happened (the receipt layer)
- **Explore** = discover + earn (the marketing + gamification layer)
- **Profile** = personal / admin / settings

These 6 = the bottom-nav pods. Sub-products (Atom, Spark, Fire, monies, slice in 3, FDs) live INSIDE the pods, not on the nav. Atom lives under Banking. Spark + Fire + monies live across Rewards (Explore) + Activity. slice in 3 lives under Credit.

---

## Who slice is for

Target: 18-35 year-old Indian users. Implications that show up in every screen:

- **Lowercase brand "slice"** — feels casual, not institutional. Banks shout (HDFC, ICICI); slice doesn't.
- **Hindi-comfortable English copy** — short sentences, verb-led actions ("Pay ₹500", "Add money", "Get card"), occasional emoji-tone-in-text (but never as UI primitives).
- **Indian number grouping** — `₹1,00,000` not `₹100,000`. Crores + lakhs are the unit users think in.
- **UPI-first payments** — UPI ID + scanner are primary, card number entry is rare.
- **Rewards are central, not a footer afterthought** — Spark Fires + monies + cashback are first-class surfaces, not "Loyalty" tucked away in settings.
- **Trust without bureaucracy** — payment-network logos (UPI, RuPay, Bharat Connect) appear at the bottom of payment flows to signal compliance; the rest of the UI stays warm + friendly.

---

## The pods — what each one is for

Each pod has ONE core job. Sub-products and surfaces flow from that job. When designing a new surface, first ask: "which pod's job does this serve?" That answers where it lives.

### Banking pod — where money sits

**Job**: show the user their money + grow it.

**Native L0 surfaces**:
- Savings hero (L0 Large card) — partner-bank savings account balance + interest CTA
- Fixed Deposits (L0 Medium) — FD balance + interest rate
- monies (L0 Medium) — slice's reward currency balance
- **Atom entry card (L0 Medium)** — new sub-product: goal-based savings

**Sub-products inside Banking**:
- **Atom** — goal-based / habit-based saving. Users create named "atoms" (Emergency fund, Vacation, Daily saver, Round-ups, Custom). Each atom has a contribution mechanic (one-shot, recurring, UPI round-up). Full FTUX + chooser + setup + returning-user L1.
- **Fixed deposits** — slice FDs at competitive rates (~8.5% p.a.)
- **monies** — slice's internal "reward currency" that accrues on transactions

**Decisions / plausible reasons**:
- Banking L0 hero IS the Savings card — not a dashboard summary. Why: balance is the question users open Banking to answer. Don't make them scroll past stats.
- Atom is a sub-product, not a new pod. Why: it's a *way of saving*, not a parallel product. Promoting it to pod-nav would dilute Banking's job.
- "Banking home" and "Balance L1" are the same screen. Why: there's no aggregate "all-accounts" view yet; the Savings card IS the home.

### Payments pod — where money moves

**Job**: send, receive, scan UPI as fast as possible.

**Native L0 surface**: **brand-immersive V-500 dialer takeover.** Full-bleed Valentino-500 page fill (light mode) with custom keypad, "Check balance" pill top-left, **Action Pills row** below the App bar (UPI ID anchor + product pills + marketing pills), Request + Transfer Tertiary pills bottom, floating QR-scan as the signature action.

**Why brand-immersive on L0**: this is the single moment slice's identity is *most* visible. Other pods (Banking, Credit) are white-on-white; Payments is the brand statement. The V-500 isn't decoration — it's the visual hook that says "this is the payment moment, you're in slice now."

**Sub-flows**:
- **Pay person** — full V-500 fill (different shade), X close, payee identity + amount + Add a note pill
- **PIN entry** — App bar Standard + Display title + system keyboard (NOT slice custom keypad — security context, OS handles)
- **Payment confirmation** — green grainy gradient tick + verb+amount H2 ("Paid ₹X")
- **Transition envelope** — rewarded payments (FIRE / MONIES / SPARK+FIRE+MONIES) go through a pink brand-immersion frame before resolving to the white tick

**Decisions / plausible reasons**:
- Payments L0 dialer is the L0 — not a "Pay someone" form. Why: users open Payments knowing the amount, often. Numpad-first means zero taps to start typing.
- UPI ID pill is the identity anchor on Action Pills row — survives dismiss, always rightmost. Why: identity confusion at payment time is high-stakes. The pill says "you ARE this account" persistently.
- Brand colour FLATTENS to pure black in Payments L0 dark mode. Why: a "darker purple" would feel like a desaturated brand, not slice. Pure black preserves the OLED-friendly contrast slice's dark mode wants AND lets V-500 survive only on the active dock glyph + text accents.

### Credit pod — borrowed money managed

**Job**: show what's been spent on credit, what's due, what the limit is, and let the user repay.

**Native L0 surface**: white L0 Large card with spends total + recent transactions + 4-color in-card callout (Blue-50 informational / V-50 brand / Green-50 success / Slate-10 disabled).

**Two distinct L1 surfaces** (the disambiguation matters):
- **Credit Card L1** — limit dashboard. `slice ··5732` + `₹2,50,000 Available limit` + Green-50 "UPI credit card activated" callout. Answers: "what can I spend?"
- **Credit home L1 / bill summary** — date range + total spend + recent txn rows. Answers: "what have I spent?"

**Novel patterns**:
- **Rotary repayment dialer** — circular donut with draggable notch, 3 chips (Min due / Total due / Full BE-configurable). Ring color encodes cohort: orange under-pay, green pay-total, blue over-pay. Drag mechanics with damping at boundaries.
- **Credit utilisation card** — 2-segment bar + 3 amount rows (Billed / Unbilled / slice in 3 EMIs)
- **Total due summary footer** — bill-pay button group 4th layout (Total due › ₹X [Repay])

**Decisions / plausible reasons**:
- Credit L0 is a white card, not a coloured-card hero. Why: coloured-card-hero on L0 reads like a marketing promo. Spends data is operational, not promotional.
- Rotary dialer instead of numpad input. Why: repayment isn't free-form; it's a choice between Min / Total / Full / Custom-in-between. The dialer makes the *range* visible and the cohort (under/at/over total) instantly clear via ring color. Numpad would lose that.
- "credit card" L1 title is lowercase. Why: pod titles are capitalized (App bar L0), but L1 surface descriptors can run lowercase per brand voice — they're describing the surface, not naming the pod.

### Activity pod — what happened (the receipt layer)

**Job**: transparent timeline of every money movement.

**Native L0 surface**: App bar L0 + search bar + filter icon button (white outline + slate glyph) + flat transaction list. No day-group headers at L0 (Today/Yesterday is L2+), no week-summary hero block.

**Per-transaction L2 — txn detail page**: 4-state status header recipe (Success / Pending / Failed / Initiated). Status colour encoded in icon + caption. Section stack: Notes pill → Bold Divider → Details + Share → key-value rows → Spark Offer callout (when reward unlocked) → inline map (when location available) → Add notes → Contact us.

**Action Centre** — slice's name for notifications. Outline-border cards (24 radius, no shadow, H4 not H3 title, Avatar top-right).

**Decisions / plausible reasons**:
- Status colour applies to caption text (not secondary grey). Why: the colour IS the affordance — green/amber/red/blue tells the user "this is OK / waiting / broken / informational" before they read words. Greying the caption decouples explanation from status.
- Connection Lost has no Retry CTA. Why: slice auto-retries in background; showing a Retry button puts work on the user the system handles itself. Better to be honest with no-button.
- Activity has CTA on empty state ("Add money"). Why: empty Activity = no money in. The CTA addresses the cause, not the symptom.
- Action Centre has NO CTA on empty ("All caught up"). Why: there's nothing to act on; notifications are read-only / status-only. A button would invent work.

### Explore pod — discover + earn (the marketing + gamification layer)

**Job**: surface earnable rewards, in-product features, and partner content.

**Native L0 surface**: Recharge & bills white card + 2×2 small-card grid (PLAY & WIN / MAY SPENDS / INVITE / CREDIT SCORE / AUTOPAY). **No single hero** — the structure IS the grid.

**Sub-products in Explore**:
- **Spark** — gamified reward streaks (Fires earned for daily activity)
- **Rewards** — cashback leaderboard, slice currency pill
- **Invite & earn** — referral program
- **May Spends** — spends visualisation (spends-only sparkline + avg pill, no cashback/interest mixing)

**Brand-hot colour rule**: slice fire is **Valentino purple**, never orange/yellow. Why: orange/yellow as "hot" is generic conventional UI. Slice owns Valentino as the brand-hot signal — using orange would make the screen read as generic AI-slop fintech.

**Decisions / plausible reasons**:
- Explore L0 has no big hero card. Why: Explore is discovery — users come to browse, not to answer a single question. The grid invites scanning, not single-decision.
- Recharge & bills is the FIRST card. Why: bills are the highest-frequency in-app action that *isn't* UPI. Putting them at the top of Explore means one-tap access without burying them in a sub-menu.
- "₹0 FEE" is a solid-blue Metadata pill (not subtle). Why: this is a feature highlight, not a filter or metadata. Solid fill says "we want you to notice this." Subtle would understate it.

### Profile (overlay-style — technically cross-pod, accessed via trailing Avatar)

**Job**: personal identity + settings + support.

**Surface**: X close top-left (no App bar), centred photo Avatar large (~120px), name H3 + phone, **mid-screen Primary CTA "Invite & earn ₹150"** (NOT bottom-anchored — exception, parallel to Atom L1 pattern), flat settings list (Action centre / UPI settings / Pricing / App Settings / Help & support / About), **no bottom nav**.

**Decisions / plausible reasons**:
- Profile is overlay-style with X close. Why: it's not a flow, it's a personal page that overlays whatever pod the user was in. X exits back to the underlying pod. Chevron-back would imply a navigational hierarchy that doesn't exist.
- No bottom nav. Why: Profile is *above* the pod system, not part of it. Bottom nav would suggest "this is a 7th pod" — which it isn't.
- Primary CTA mid-screen, not bottom-anchored. Why: the centred photo + name + CTA stack is the hero. Bottom-anchoring would separate the action from the identity it acts on.

---

## How pods relate — the connective tissue

Pods aren't silos. Money + features flow across them:

- **Banking → Payments**: user has balance, taps Pay → Payments L0. Or low-balance prompt in Payments → Add money flow → Banking.
- **Credit → Payments**: UPI on credit card. User pays via UPI; the credit card is the source instrument.
- **Payments → Activity**: every transaction creates an Activity row + a txn detail L2 page.
- **Activity → Banking / Credit**: tapping a txn row reveals which account it came from / went to.
- **Explore → Banking**: Spark Fires + monies accrue on Banking transactions, surfaced in Explore.
- **Explore → Credit**: cashback on credit card txns, "slice in 3" promoted from Explore.
- **Explore → Profile**: Invite & earn lives in Explore L0 tile, also on Profile as Primary CTA.

**The slice principle for cross-pod surfaces**: a feature has ONE native pod (its primary home) and possibly secondary triggers in other pods. The native home owns the recipe; secondary triggers use a more compact treatment that points back to the native flow.

See `reference_entry_points.md` for the full feature → surface map.

---

## Sub-product hierarchy

| Pod | Sub-products |
|---|---|
| Banking | Savings · Fixed Deposits · monies · **Atom** (goal-based savings) |
| Credit | slice super card · slice in 3 · Repayment · Autopay · Bill summary · CLI · Surcharge |
| Payments | UPI send · UPI receive · QR scan · Pay person · Action Pills (UPI ID / monies / fires / marketing) |
| Activity | Transaction feed · Action Centre · Search · Transaction detail L2 (4 states) |
| Explore | **Spark** · **Fire / Fires** · **Rewards leaderboard** · slice currency · Invite & earn · Recharge & bills · May Spends · Credit score · Autopay |
| Profile | Action centre (cross-link) · UPI settings · Pricing · App Settings · Help & support · About · Invite & earn |

**Naming convention**: sub-products use the slice voice convention — lowercase, evocative, one-or-two-word names. `atom`, `spark`, `fire`, `monies`, `slice in 3`. Avoid corporate names ("Goal Saver", "Loyalty Cashback").

---

## The slice way — recurring design principles

These aren't anti-patterns and they aren't recipes. They're the *attitude* that shows up across slice surfaces. When you're about to make a design choice and the calibrated rules don't cover it, fall back to these.

### 1. Restraint over fanfare
Slice screens are calmer than typical consumer apps. No bouncing CTAs, no glow effects on amounts, no auto-playing animations. Motion serves moments (entry, exit, state change) then stops. The ambition is restraint, plus one or two delight moments per flow (Spark reveal, payment success grainy tick).

### 2. Transparency over performance
Status is shown via colour (green/amber/red/blue) + clear copy ("Paid ₹X", "Processing request of payment of ₹X pending") — never via abstract icons or generic loading spinners. The user always knows what state they're in.

### 3. Identity is persistent
Photo Avatar trailing on every App bar L0 (Banking / Explore / Credit / Activity / Payments) is the SAME user. UPI ID pill in Payments is the SAME account. This persistent identity reduces "wait, which account am I in?" anxiety at payment moments.

### 4. Hard rules > soft rules > exploration
Hard rules (brand voice, V-500, Rubik, no emoji, anti-pattern bans) never bend, even in exploration. Soft rules (recipes, motion choices) are defaults that bend with reason. Exploration is actively encouraged when there's a reason.

### 5. Pod identity is content-driven, not chrome-driven
Each pod has its own visual character because its CONTENT is different — not because the chrome differs. Banking is white because balance is reassuring. Payments is V-500 because the brand moment lives there. Credit is white-with-blue-callouts because spends are operational. Activity is white-list because transparency is the job.

### 6. Brand is colour + voice + typography, not decoration
V-500 + Rubik + lowercase "slice" is the brand. Custom illustrations are the brand. Generic line-art and bevels and shadows are NOT the brand. When in doubt, strip decoration.

### 7. Indian context first
₹1,00,000 not ₹100,000. UPI-first (not Visa/Mastercard-first). Hindi-comfortable English copy. Rewards in monies + cashback, not "Points." This isn't localisation — it's product fit.

### 8. Auto-handle invisible work
Things like auto-retry on Connection Lost, ticker animations on monies balance changes, sticky date headers in Activity, sequential (not parallel) tickers on action pills — slice handles the work so the user doesn't have to think about it.

### 9. Verb + value over generic CTAs
"Pay ₹500" beats "Pay Now". "Add money" beats "Add Funds". "Create atom" beats "Get Started". The CTA tells the user what's about to happen with specifics, not category-only.

### 10. The mascot does emotional work
Sad mascot for Connection Lost. Friendly waving mascot for API failure. Broom mascot for Maintenance. Atom orb for Atom intro. Super card mascots for Credit promo. Mascots aren't decorative — they communicate emotional state before the user reads.

---

## How to use this file

Load this when:
- The task is "design a new slice screen" and you need to ground in product, not just visuals
- The task is "judge if this is slice" at the philosophical level (does it FEEL like slice?)
- The user is exploring a new pattern and needs to weigh it against the slice way
- A new pod / sub-product is being scoped and you need to place it in the product hierarchy
- Someone with no slice context needs to be brought up to speed

Don't load this for:
- Specific component anatomy → load `reference_dls_<component>.md`
- Specific recipe → load the pod file
- Cross-cutting hard rules → load `reference_pod_cross_cutting.md`

This file is the WHY layer under everything else. The other files tell you WHAT to do; this one tells you why slice is slice.

---

## Calibrated through

This model reflects the calibration state as of R20 (2026-05-28). It will be refined over time as the calibrated digest grows. Plausible reasons (marked with WHY) are working hypotheses, not user-validated calibrations — those convert to calibrated rules through `/calibrate` sessions.

The next iteration will tighten:
- Cross-pod handoff rules (when does a flow exit one pod to enter another?)
- Sub-product promotion criteria (when does a feature graduate from "tile in Explore" to "sub-product in Banking" to "pod on the nav"?)
- Decision boundaries between similar surfaces (when is something a card vs a banner vs a section?)

Until then, this file documents the model as it stands.
