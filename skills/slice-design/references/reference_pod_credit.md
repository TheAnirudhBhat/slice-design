---
name: slice-design Credit pod
description: Per-pod aggregator — every rule, recipe, anti-pattern, and motion touching the Credit pod (CC L0 / Credit Card L1 limit dashboard / bill summary / rotary repayment dialer / utilisation / super card promo / autopay / surcharge). Load this for any Credit-pod task.
type: reference-aggregator
---

# Credit pod

slice's Credit pod is the home of the **slice credit card** — limit, spends, repayment, utilisation, statements, autopay, surcharge, and credit-limit-increase (CLI). The pod has **two distinct L1 surfaces** (limit dashboard vs bill summary) and **one novel input device** (the rotary repayment dialer) — disambiguation matters here more than in any other pod.

## In scope
- **Credit L0** — white L0 Large card (spends + 2 txn rows) + 4-color in-card callout taxonomy + Medium card super card promo
- **Credit Card L1** — limit dashboard (slice ··5732 + Display ₹2,50,000 + Available limit + Green-50 UPI activated callout + Learn more card). Distinct from Credit home.
- **Credit home / bill summary L1** — centred date-range hero + Display amount + V-500 "View unbilled spends" link + subtle callout. Distinct from Credit Card L1.
- **Rotary repayment dialer** — circular dialer with draggable notch, 3 chips (Min due / Total due / Full), cohort-encoded ring colour, drag mechanics, overdue variant
- **Credit utilisation card** — 2-segment horizontal bar + 3 amount rows + surplus variant
- **Product picker split layout** — X close + 2-card vertical chooser (Savings vs Credit)
- **Total due summary footer** (Button group 4th layout)
- **CC L0 4-color in-card callout taxonomy** (Blue-50 / V-50 / Green-50 / Slate-10)
- **`credit card` lowercase L1 surface descriptor** (per R19 pod-title clarification)
- **Autopay / Surcharge / CLI / Boost flows** — light touch, canonical specs pending

## Out of scope (see)
- Payments L0 / Pay flow → `reference_pod_payments.md`
- Banking pod (Savings, FD, monies, atom) → `reference_pod_banking.md`
- Hard rules (lowercase "slice", Rubik only, no emoji, palette, Indian number grouping, absolute bans) → `reference_pod_cross_cutting.md`
- Per-component anatomy specs → cite `reference_dls_<component>.md` inline

---

## Credit L0 — pod home

Credit L0 is a **white L0 Large card** with spends total + recent txn rows + an in-card callout, plus a Medium card promo (super card mascot illustration). It is **NOT** a chevron-back analytics screen with a centred hero — that pattern is the downstream Credit home / bill summary L1 (described below).

Source frame: node `885:20015` (DLS working copy `PNUz3Dr9KSlFJSnsXsC0nL`) — canonical L0 reference, cal:2026-05-28 R18 ✅

### Anatomy (top → bottom)

1. **App bar L0** — pod title `Credit` left (capitalized per R18 canonical reference) + **photo Avatar trailing only** (no eye icon, no leading icon, no chevron back, no utility icon).

2. **L0 card / Large — Spends summary** (white card, shadow elevation, 24px page padding, 24px internal padding, 312×auto):
   - Caption secondary: `Spends · 5 Jun - 4 Jul` (date range with bullet separator)
   - **Display amount** — `₹1,00,550` (Display/Small, ₹ matches digit weight)
   - **Two recent transaction rows** inline below amount (no section header, no card-internal divider):
     - Small coloured Avatar (Blue Bold for transport, Red Bold for retail, etc.) + caption `Paid ₹370 to Uber`
     - Same row pattern for second txn
   - **In-card callout row** at the bottom of the card (Radius L, no chevron, no CTA, whole-row tap target) — colour per the 4-color taxonomy (see Calibrated callouts below).
   - WHY 2-insight subvariant: Credit L0's job is "where my money is going". One amount + two most-recent txns gives the user the spend gestalt in a single glance. Distinct from Banking Savings card (single insight: green interest delta). Source: `reference_dls_cards.md` L0 Large 2-insight subvariant.

3. **L0 card / Medium — Super card promo**:
   - H3 title left `Meet your slice / super card`
   - Caption secondary `Discover the benefits`
   - Branded **blue-pink mascot illustration trailing** (~80px, bleeds to right edge — see `super_card_mascot` in `reference_dls_illustrations.md`)

4. **Floating bottom dock** — rupee/credit icon active (white solid circle + V-500 glyph). Content scrolls UNDER the dock with gradient fade.

### Card stack rules
- **16px gap** between the Spends card and the super card promo. Cards never touch each other or the screen edge (24px page padding).
- Cards fill width: `360 − 48 = 312px`.

### What Credit L0 doesn't do

- ❌ **No coloured-card hero on Credit L0.** Credit L0 is a **white** L0 Large card with spends total + recent txn rows + in-card callout, plus a Medium card promo. The chevron-back + pie-chart-icon + centred-hero pattern is the downstream **Credit home / bill summary L1**, not L0. Treating that L1 as the L0 is an explicit banned pattern (SKILL.md L150).
- ❌ **No List or Bold section header between L0 cards** (e.g. `THIS MONTH` between Spends and super card). Cards themselves are the structure. Source: cal:2026-05-28 R18 ✅
- ❌ **No leading icon on App bar L0** — pod title left + trailing photo Avatar only. A leading icon reads as App bar Standard chrome, which is for L1+ back-nav flows.
- ❌ **No chevron `›` on the in-card callout row** — whole row is the tap target. Chevrons are reserved for back navigation, not row-end affordances.
- ❌ **No bottom-anchored Primary CTA on the L0 page** — Credit L0 has no Primary at this surface. Actions live deeper (Repay, View statement, Activate card) on the L1+ surfaces.

### Motion on Credit L0

- **Nav push** when tapping the Spends card or super card promo: translateX 0 → -25% + opacity 1 → 0.7 outgoing, translateX 100% → 0 incoming. 320ms `out` (gentle). See `reference_motion.md` Nav push.
- **Press feedback on the in-card callout row**: opacity 1 → 0.7 over 160ms `quick`, restore on release. NEVER scale.
- **Skeleton shimmer** during spends-amount load: 1200ms linear infinite on the amount line.

---

## Credit Card L1 — card + limit dashboard

**DISTINCT from Credit home / bill summary L1.** Credit Card L1 = "what I have available" (limit dashboard, post-activation hub). Credit home L1 = "where my money is going" (period spend + recent txns). Two different mental models; two separate L1 surfaces accessed from different L0 entry points.

Source frame: cal:2026-05-28 R19 — Credit Card 2026 `WhSZFVH6lt8cZpVgzencvK` ✅ page `45748:1462` ("Payment activation - Phase 2"), single canonical frame.

### Recipe

1. **App bar Standard** chevron back `‹` + `credit card` title (**lowercase** L1 surface descriptor — multi-word, describes the surface not the pod, per R19 pod-title clarification) + **trailing photo Avatar** (unusual for L1; matches the user-identity anchor pattern from L0 chrome).
2. **White card hero** (shadow elevation, 24px page padding, 24px internal padding):
   - Caption secondary: `slice ··5732` (product mark + masked last-4)
   - **Display amount** — `₹2,50,000` (Display/Small, ₹ matches digit weight)
   - Caption `Available limit` below the amount
3. **Green-50 callout row INSIDE the card** (positive-state variant of the 4-color taxonomy):
   - Green Bold lightning leading icon (40×40)
   - Title H4 `UPI credit card activated`
   - Subtitle caption `Get started with payments`
   - No chevron, whole-row tap target
4. **Separate white card** below the hero card: `Learn more about your card` H4 + slice **super_card_mascot** illustration trailing (~80px right-bleed — same mascot as the Credit L0 promo).
5. **Floating bottom dock** with 5 icons centered on V-500 currency-icon active (signature pod action).

### What Credit Card L1 doesn't do

- ❌ **No section header between the two cards.** They're sibling L1 cards stacked at 16px gap, not a list.
- ❌ **No capitalized `Credit Card` title** — per R19 clarification, L1 surface descriptors (multi-word, describing the surface like `credit card`, `add money`, `atom`) run **lowercase** per brand voice. The pod-title-capitalization rule applies only to App bar L0 chrome.
- ❌ **No chevron on the Green-50 activated callout** — whole row is the tap target.
- ❌ **No bottom-anchored Primary** — the surface is a hub, not a flow. Actions live on the rows.

---

## Credit home — bill summary L1

**DISTINCT from Credit Card L1.** This is the centred-hero analytics surface that shows period spend (the "where my money is going" model). Calibrated as R11 reference (review-1108).

### Recipe

1. **App bar Standard** chevron back `‹` + **no title** + trailing pie-chart icon (analytics affordance).
2. **Centred hero** (page-level, NOT card chrome):
   - **Date range** caption secondary (`21 Jul - 20 Aug`) above the amount
   - **Display amount** centred (total spend in period, ₹ matches digit weight)
   - **Brand-purple text link** `View unbilled spends` below (V-500, no button chrome, no chevron — pure text link)
3. **Subtle callout row** below the hero (slate-10 bg, Radius L, no chevron, no CTA, whole-row tap target):
   - Avatar V-500 Bold leading + line icon
   - H4 title
   - Caption secondary subtitle

### What Credit home doesn't do

- ❌ **No card chrome around the hero** — flush page-level placement only. Mirrors the txn detail status-header rule (header is page-level hero, NOT a card). Source: cal:2026-05-28 R19 anti-pattern.
- ❌ **No bottom-anchored Primary** — the surface is analytical, not actionable. Repayment lives on the dialer surface (separate L1+).
- ❌ **No `+` prefix or arrow + sign together** on any inline txn delta. Positive Green colour does the work.

---

## Rotary repayment dialer

**ENTIRELY NEW pattern in slice** — no rotary input device documented elsewhere in DLS. Used for credit card repayment amount selection. The dialer makes the relationship between "what you pay" and "where you sit in the repayment range" the primary visual.

Source frame: cal:2026-05-28 R19 — Credit Card 2026 ✅ page `54499:44995` ("Repayment - Full, min, custom"), 10+ frames with explicit on-canvas behavior spec sticky ✅

### Anatomy (top → bottom)

1. **App bar Standard** chevron back + title (`Repayment` or contextual) + optional trailing utility icon.
2. **Circular dialer (donut/ring)** centred — large diameter (~280px), thick ring (~24-32px). Draggable notch sits on the ring perimeter.
3. **Centred amount inside the ring** — `₹10,125.41` H1/Display, ₹ matches digit weight. This is the live value of the repayment amount; it updates as the user drags or taps a chip.
4. **Caption above the ring** follows chip + dialer position. Caption options:
   - `Paying minimum due` (notch at Min due chip)
   - `Paying less than total due` (notch between Min due and Total due, no chip selected)
   - `Paying total due` (notch at Total due chip)
   - `Paying more than total due` (notch between Total due and Full)
   - `Paying early for next month` (notch past Full / future-month range)
5. **Up to 3 selectable chips below the ring**:
   - `Min due` (always present)
   - `Total due` (always present)
   - `Full` (optional, **BE-configurable** — current ship is 2 chips; Full is for future experiments)
   - Chips use standard outline-border pill chip, slate text default, V-500 fill or outline on selected (per chip cohort).
6. **Bottom**: `Repay` Primary CTA full-width + `View statement` buttonSmall V-500 text-link below (or **above** on overdue variant — see below).

### Ring colour encodes the chip cohort

The ring is **cohort-encoded** — its colour signals which payment band the user is in, not just the amount. This is the dialer's primary signal:

| Ring colour | Cohort | Meaning |
|---|---|---|
| **Orange** | Paying less than total due | Min-due range — user is at risk of carrying balance / interest |
| **Green** | Paying total due | Matched — user clears this month's bill |
| **Blue** | Paying more than total due | Over-payment / paying early for next month — surplus territory |

WHY cohort colour, not gradient: a gradient ring would make every point feel the same. Discrete colour bands make the user **feel** when they've crossed from "carrying balance" (orange) to "clear" (green) to "ahead" (blue) — the colour change is the affordance.

### Drag + interaction mechanics

1. **Chip → notch animation**: tapping a chip animates the dialer notch smoothly from its current position to the chip's notch position. Caption updates en route.
2. **Drag → intermediate state**: dragging the notch between chip positions does **NOT** select a chip. Caption updates to the intermediate label (`Paying less than total due` / `Paying more than total due`). No chip is highlighted.
3. **Pointer capture during drag**: once drag starts, set the dialer to capture all pointer events so the user can drag off the ring without losing the gesture. Critical — the ring is the input, not just a visual. Source: `reference_motion.md` Pointer capture during drag.
4. **Damping at boundaries**: dragging past the Full chip (or before Min due) applies damping — the notch slows as the user pushes past the natural boundary. Things in real life slow down before stopping; a hard wall feels broken. Source: `reference_motion.md` Damping at boundaries.
5. **Release**: notch snaps to the nearest valid position (chip notch OR releases at the user's intermediate drag point — depending on the design intent of that frame). Snap uses 240ms `out` (base) or 320ms `out` (gentle).
6. **Repay CTA label** updates with the live amount: `Repay ₹10,125.41`. Verb + value pattern (no leading icon per `reference_anti_patterns.md` L297).

### Overdue variant

Same dialer + **red `Overdue by 1 day` chip beneath the title** (chip palette unchanged — it's the standard pill chip in red-50 fill / red text). The dialer body is identical; only the chip and copy shift. On overdue, `View statement` text-link can move ABOVE the Repay CTA for parity with the urgency hierarchy.

### Motion

- **Chip-tap → notch animation**: 320ms `gentle` (`out` easing). The animation should feel deliberate — too fast loses the "ring tells the story" signal.
- **Drag → notch follow**: notch follows the pointer with damping at the boundaries (per Emil's damping technique — see `reference_motion.md`). The ring colour transitions smoothly as the notch crosses cohort boundaries (orange → green → blue) using a 240ms `base` colour interpolation.
- **Caption swap**: as the cohort changes, the caption above the ring crossfades — translateY -100%→0 + opacity 0→1 new caption, simultaneously translateY 0→100% + opacity 1→0 old caption. 240ms `out`. Optional: add subtle `filter: blur(2px)` during the swap if the eye sees two distinct words instead of one smooth transition (per `reference_motion.md` Blur crossfade).
- **Press feedback on Repay**: opacity 1 → 0.7 over 160ms `quick`, restore on release. NEVER scale.

### What the dialer doesn't do

- ❌ **No numeric input field as the primary entry** — the dialer IS the input. Numeric entry would defeat the cohort signal.
- ❌ **No gradient ring** — discrete cohort colours only.
- ❌ **No `+` prefix on the amount** or arrow+sign together. Positive value is the default state.
- ❌ **No leading icon on the Repay Primary** — verb + value text only (`Repay ₹10,125.41`).
- ❌ **No bounce / spring overshoot on the notch snap** — `out` or `gentle` easing only. Overshoot would make the cohort signal feel toy-like.
- ❌ **No animation on keyboard-initiated state changes** (if a keyboard repay-confirm path exists — repeated power-user actions skip animation per `reference_anti_patterns.md` R19 motion section).

---

## Credit utilisation card

White outline-subtle card with 2-segment horizontal bar showing utilised vs available limit + 3 amount rows. Used on the Credit Card L1 / utilisation L1 surface.

Source frame: cal:2026-05-28 R19 — Credit Card 2026 ✅ page `43643:14498`, 2 utilisation card variants (normal + surplus).

### Anatomy (top → bottom)

1. Card title `Credit utilisation` H4 top-left.
2. **Row 1 (paired amounts)**: `₹63,000` left (utilised) + `₹37,000` right (available). Below each, caption labels: `Utilised limit` (V-500 caption) + `Available limit` (secondary caption).
3. **Horizontal bar full-width** below the paired amounts:
   - V-500 segment (utilised portion) + slate-10 track (remaining)
   - Single bar split into 2 segments — NOT a stacked bar with multiple categories.
4. **Row stack below the bar** (3 breakdown rows):
   - `Billed spends ₹50,000`
   - `Unbilled spends ₹10,000`
   - `slice in 3 EMIs ₹3,000`
   - Each row: label left + amount right, hairline divider between rows.

### Surplus variant

When the user has overpaid (utilised = ₹0, available > limit):
- Utilised amount shows `₹0`, available shown alone
- Bar: full V-500 (or alternative treatment — confidence medium on exact bar state)
- **`Surplus` row in green** with subtitle: `Surplus is the excess balance on your credit card adjusted against spends or refunded to savings account within 5-7 working days`

WHY a green Surplus row (not amber/red): surplus is a positive state — the user has overpaid and the system is handling it. Green codes "this is OK" without celebrating it (which would over-index the moment).

---

## Product picker split layout

2-card vertical stack for choosing between **activated** products (e.g. Savings vs Credit). Distinct from chooser-list (Atom-style) and L0 cards.

Source frame: cal:2026-05-28 R19 — Credit Card 2026 ✅ page `43975:747`, standalone canonical frame.

### Recipe

1. **X close top-left** (no chevron, no title — modal-feel, even though it's full-screen).
2. **Header inset 32px from top**: H2 `Choose a product` + caption secondary `You can activate other products later`.
3. **2 white-shadow cards** stacked vertically (Radius L, 24px padding, shadow elevation), **24px gap** between them.
4. Each card:
   - Title H3 left
   - 2-line caption secondary below the title
   - ~96px decorative **pink-purple gradient illustration** trailing (right-bleed)
   - Cards tappable as a whole — no CTA inside, no chevron
5. **No bottom-anchored Primary** — tap target = whole card.

### What product picker doesn't do

- ❌ **No chevron `›` on the cards** — whole card is the tap target.
- ❌ **No Primary CTA at bottom** — picker = selection, not flow commit.
- ❌ **No App bar Standard with chevron back** — X close only, modal exit pattern.

---

## Total due summary footer

Button group **4th layout** (per `reference_dls_button_group.md` R19 update — the canonical DLS Button group page documents 4 layouts, not 3). Used on bill-pay / payment-confirmation surfaces where the user reviews an amount before committing — frequently paired with the rotary dialer above it.

### Anatomy

- Footer is a **white card-like band** with shadow elevation (lifts off page).
- **Leading 2-line text block**: Label `Total due` (Caption secondary) + Amount (Body or Heading) with **chevron `›` trailing the amount** (tap chevron → opens breakdown sheet).
- **Trailing Primary brand pill** (`Pay ₹35,000`, `Repay`).
- Layout: `Total due › ₹35,000   [Pay ₹35,000]` — leading text + amount + chevron compact on left, Primary on right.

### When to use

- Bill payment confirmation
- Credit repayment (paired with the rotary dialer)
- Multi-product checkout

Distinct from the standard Primary-only footer (1 Button layout) because the Total due block functions as both a recap (label + amount) and a tap target (chevron → breakdown). The chevron here is **valid** — it's the row-end affordance for "expand the breakdown", consistent with the calibrated chevron rule (chevron-as-disclosure on rows that genuinely disclose more, not chevron-as-noise on rows that already have a CTA).

Source: cal:2026-05-28 R19 — DLS molecules sweep, Button group page ✅

---

## Calibrated callouts inside cards (4-color taxonomy)

The R18 Credit L0 recipe said the in-card callout is **always** Blue-50 with V-500 Bold dot-burst icon. **R19 correction**: the in-card callout uses a **4-color taxonomy**, picked by intent — not a single colour.

Source frame: cal:2026-05-28 R19 — Credit Card 2026 `WhSZFVH6lt8cZpVgzencvK` ✅ page `61557:19457` ("CC L0- Todo cards"), 12 callout variants across 4 colour families ✅

### Taxonomy

| Bg | Avatar Bold colour | Use for | Example copy |
|---|---|---|---|
| **Blue-50** | Blue-500 line icon | Informational / payments-feature | `Pay bills with credit card`, `Set up autopay`, `Pay fire, win cashback` |
| **Valentino-50** | V-500 line icon | Slice-product / brand-tier | `Split spends with slice in 3`, `Scan and pay with slice` |
| **Green-50** | Green-500 line icon | Success / positive-state | `UPI payments on one tap`, `UPI credit card activated` |
| **Slate-10** | V-500 line icon (greyed) | Disabled / defaulted-to-card edge case | `Copy` (disabled variant with `why?` red label) |

### Shared anatomy (all 4 colours)

- Full-width row INSIDE a parent card, Radius L (16)
- **Leading Avatar Bold colored circle** (40×40) with white line-icon — colour matches bg family (Blue-50 → Blue Bold; Green-50 → Green Bold; etc.)
- Title H4 (16/20 Medium)
- Subtitle caption secondary, 1 line
- **No chevron** — whole-row tap target
- 12px gap between Avatar and text block, 4px between title and subtitle

### Picking the right colour

The colour tells the user the **intent** before they read the words:
- **Blue-50** = neutral informational nudge ("here's a feature you might use"). Default for "Pay bills", "Set up autopay" — actions the user takes when ready.
- **V-50** = slice-product feature ("this uses a slice-tier benefit"). slice in 3, slice-branded utilities. Reads as "this is a slice-only thing".
- **Green-50** = positive state already achieved or just unlocked ("activated", "available now"). Don't use for actions that are pending — green codes done.
- **Slate-10** = disabled or out-of-context edge case. Greyed-out V-500 glyph signals "this would be active but isn't right now".

### Disambiguation: in-card callout vs User Action Request banner

| Surface | Use which? |
|---|---|
| Callout INSIDE a parent card (Credit L0 spends card, Credit Card L1 hero card) | **In-card callout 4-color taxonomy** (this) |
| Standalone full-width prompt for user action (not inside a card) | **User Action Request banner** — 8 colorways, see `reference_dls_user_action_banners.md` |
| Persistent data card | Card (not callout) |
| Transient confirmation | Snackbar |

The cleanest cue: **callout is a row inside a card**. Banner is a **standalone** full-width pill. They share colour grammar but apply to different surface depths.

---

## Credit-relevant illustrations

Catalogued in `reference_dls_illustrations.md`. Credit touchpoints:

| Illustration | Where | Size |
|---|---|---|
| `super_card_mascot` (blue + pink mascot characters — friendly branded) | Credit L0 super card promo (Medium card trailing), Credit Card L1 "Learn more about your card" trailing | ~80px right-bleed within card |
| Pink-purple gradient illustrations (decorative trailing on product picker cards) | Product picker 2-card chooser | ~96px right-bleed within card |
| Subtle V-500 / Blue-500 / Green-500 line icons in-card callout Avatars | Credit L0 callout, Credit Card L1 Green-50 activated callout | 40×40 Avatar Bold + white line glyph |

### Anti-patterns (illustration-specific to Credit)

- ❌ **Generic line-art illustrations** as the super card promo — slice ships the branded blue-pink mascot. Generic SVG placeholders are prototyping only.
- ❌ **Standalone illustration in list-leading position** (no Avatar wrapper) on Credit Card L1 rows. Wrap in Avatar.
- ❌ **AI-generated / Claude-drawn substitute illustrations**. When an asset isn't provided, **ask the user**. Never improvise a mascot.

---

## Other Credit surfaces (light touch)

The following surfaces exist in the Credit pod but their canonical specs aren't yet fully promoted into the skill. Treat the below as orientation, not authoritative recipes — confirm against current Figma frames before building.

### Autopay
- Setup surface for recurring repayment from a linked account.
- Recipe likely follows the **setup form shell** pattern (App bar Standard chevron back + dynamic title + form rows + bottom-anchored Primary `Continue`). Similar shell to the Atom setup form (see `reference_pod_banking.md` Atom setup form shell).
- The CC L0 in-card callout copy `Set up autopay` (Blue-50 informational) is the entry point.

### Surcharge
- Disclosure / settings surface explaining merchant surcharge on credit card transactions.
- Likely flat list with section headers (settings pattern — see `reference_dls_screen_layouts.md` Settings screen) OR an explainer-style surface with a full-screen how-it-works recipe (X close + paired illustration + H2 + numbered steps + no CTA — mirroring the Atom Round-ups explainer).

### CLI (Credit Limit Increase)
- Flow that surfaces an offer to increase the user's credit limit.
- Likely combines: an Action Centre card nudge (outline-border card, H3 title, body, Primary CTA inside the card) → a CLI offer L1 (centred hero with new limit Display + accept Primary) → confirmation success (textured grainy gradient tick + `Limit increased to ₹X` H2).

### Boost (Choose a product)
- Activation chooser for unlocked products / boosts the user can claim.
- Likely uses the **Product picker split layout** (documented above) OR the Atom-style chooser-list pattern, depending on whether the choice is binary (2 products) or multi (>2 options).

**WHY light touch**: these surfaces appeared in scope but the canvases reviewed in the R19 sweep didn't carry definitive on-canvas specs. The next calibration round should sweep these explicitly. Until then, default to the closest sibling recipe (setup form / settings / chooser) and verify against the canonical Figma frame before shipping.

---

## Cross-cutting reminders (cite, don't restate)

Hard rules that apply to every Credit surface — see `reference_pod_cross_cutting.md`:
- Lowercase "slice" always (Capital-S "Slice" banned)
- Rubik only, two weights (Regular 400, Medium 500)
- No emoji in shipped UI — slice line icons only inside Avatars and CTAs
- Indian number grouping (`₹2,50,000`, `₹10,125.41`, `₹1,00,550` — ₹ touches the digit, no space)
- **No `+` prefix** on credit / received amounts (Positive Green colour does the work)
- **No arrow + sign together** on trend deltas (`↑ +12%`) — pick one, arrow alone preferred
- No red-fill Primary buttons (destructive uses alert-dialog or Tertiary outline)
- Chevron `‹` for back, not arrow `←`
- Chevron `›` reserved for disclosure rows (Total due summary chevron is valid — discloses breakdown). Not for rows that already have a CTA / switch / Primary affordance.
- White-on-white surfaces — slice doesn't do grey page backgrounds
- **Pod title `Credit` CAPITALIZED on App bar L0**; **L1 surface descriptor `credit card` lowercase**

---

## Calibrated history

Brief audit trail of major Credit-pod calibrations:

- **cal:2026-05-17 R11** — Credit home / bill summary L1 recipe calibrated: App bar Standard chevron back + no title + trailing pie-chart icon, centred date-range hero + Display amount + V-500 `View unbilled spends` link, subtle slate-10 callout row. Source: review-1108 reference frame.
- **cal:2026-05-28 R18** — Credit L0 correction. The earlier "Credit home" recipe was clarified as a downstream L1 analytics surface, NOT the pod L0. Canonical L0 (`885:20015`) is a **white L0 Large card** with spends + 2 txn rows + in-card callout, plus a Medium super card promo. **Coloured-card hero on Credit L0 banned**. Floating dock active state = white circle + V-500 glyph. Source: L0 canonical reference frames.
- **cal:2026-05-28 R19** — Credit Card 2026 sweep added 4 new patterns:
  - **Credit Card L1 limit dashboard** (separate from Credit home — slice ··5732 + ₹2,50,000 + Available limit + Green-50 UPI activated callout + Learn more card). Source: `45748:1462`.
  - **Rotary repayment dialer** (entirely new pattern — circular dialer with cohort-encoded ring colour, drag mechanics, chip-to-notch animation, overdue variant). Source: `54499:44995`.
  - **Credit utilisation card** (2-segment bar + 3 breakdown rows + surplus variant). Source: `43643:14498`.
  - **Product picker split layout** (X close + 2 white-shadow vertical cards). Source: `43975:747`.
  - **CC L0 in-card callout 4-color taxonomy** (corrected R18's "always Blue-50" finding). Source: `61557:19457`, 12 callout variants.
  - **`credit card` lowercase L1 surface descriptor** clarification (pod titles CAPITALIZED on App bar L0, multi-word L1 descriptors lowercase). Source: `45748:1462`.
  - **Button group 4th layout (Total due summary)** added — frequently paired with the dialer. Source: DLS Button group page.
  - **L0 Large 2-insight subvariant** + **Label+Title+Repay footer card** added to `reference_dls_cards.md`. Source: Credit L0 reference + DLS Cards page.

---

## Flows Credit participates in

See `reference_flows.md` for full step-by-step.

- **Repay credit card bill** — native here (Credit L0 → Credit Card L1 → Repayment rotary dialer → source picker → PIN → confirmation). Novel rotary input pattern.
- **View credit limit / available balance** — native here (Credit L0 → Credit Card L1 limit dashboard, distinct from bill summary L1).
- **Split a purchase with slice in 3** — native here (per-txn opt-in via Credit L0 callout OR txn detail L2 row).
- **Apply for CLI (credit limit increase)** — native here (Credit L0 callout → CLI flow).
- **Set up Autopay** — entry from Credit L0 callout OR Explore AUTOPAY tile.

Cross-pod handoffs:
- Credit → Payments (Repay source picker is the same Payment-cluster bottom sheet pattern; UPI-on-credit-card uses Payments rails)
- Credit → Activity (every credit txn creates Activity row; txn detail L2 may show slice-in-3 split sub-rows)
- Action centre → Credit (bill-due notifications deep-link to Repayment dialer)
