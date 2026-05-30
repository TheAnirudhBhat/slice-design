---
name: slice-design Banking pod
description: Per-pod aggregator — every rule, recipe, anti-pattern, and motion touching the Banking pod (Savings / FD / monies / Atom sub-product). Load this for any Banking-pod task instead of multiple component refs.
type: reference-aggregator
---

# Banking pod

slice's Banking pod is the home of stored value — Savings (interest-bearing), Fixed Deposits, monies (prepaid wallet), and the Atom sub-product (goal-based / habit-based savings). Banking L0 is the only pod where balance, FD, monies and Atom coexist on one home — they share one trust surface.

## In scope
- Banking L0 (App bar L0 + Savings hero + FD card + monies card + Atom entry card)
- Balance L1 — dedicated "Total balance" surface
- Savings details + Add money form
- Fixed deposits — list, FD card, Spark FD details L1
- monies — visual treatment, where it appears
- Atom sub-product (full suite): Feature PDP pair, chooser picker, setup form shell, returning-user L1, Banking L0 entry card, how-it-works explainer
- Banking-relevant illustrations + Avatar background rules for Banking row contexts

## Out of scope (see)
- Payments L0 / Pay flow → `reference_pod_payments.md`
- Credit screens (Credit L0, Credit Card L1, repayment dialer) → `reference_pod_credit.md`
- Hard rules (lowercase "slice", Rubik only, no emoji, palette, Indian number grouping, absolute bans) → `reference_pod_cross_cutting.md`
- Per-component anatomy specs → cite `reference_dls_<component>.md` inline

---

## Banking L0 — pod home

Banking L0 = Balance home. They are the same screen. There is **no separate "Banking home" with quick-action grid + accounts list** — that's a banned pattern (see Anti-patterns below).

Source frame: node `885:19757` (DLS working copy `PNUz3Dr9KSlFJSnsXsC0nL`) — canonical L0 reference, cal:2026-05-28 R18 ✅

### Anatomy (top → bottom)

1. **App bar L0** — pod title `Banking` left + **eye icon (hide/show balance)** trailing + **photo Avatar** trailing. Two items in trailing slot, both icon-button-sized. Pod title is capitalized (`Banking`, not `banking`) per R18 canonical reference.

2. **L0 card / Large — Savings hero** (white card, shadow elevation, 24px page padding, 24px internal padding, 312×auto):
   - Caption secondary: `Savings ····5732` (account name + bullet separator + masked last-4)
   - **Display amount** — `₹45,800` (Display/Small, ₹ matches digit weight)
   - **Green delta row**: up-arrow icon + green caption `Earn interest at 100% RBI repo rate`
   - **Hairline full-bleed divider within card** (Divider/Default)
   - **In-card CTA row**: V-500 link `Grow your savings` H4 + caption secondary `Earn interest daily` left-stacked + **Primary Small "Add money" pill right-aligned on same row**
   - WHY in-card CTA (not bottom-anchored): CTA acts on same data the card displays (Add money → grows Savings shown above). Anchoring to bottom would disconnect the action from the data context. cal:2026-05-28 ✅

3. **L0 card / Medium — slice atom entry** (R19 addition — sits between Savings and FD):
   - Title H3 left `slice atom` + **green-fill `+ Live` status pill** top-right
   - Body secondary 1 line `Set money aside, watch it grow`
   - **Tertiary Small pill `Let's go`** — slate-10 fill, slate text, full pill radius
   - Trailing mascot illustration (~80px purple goo + green parcel) bleeds to right edge
   - WHY Tertiary slate-10 (not Primary V-500): entry card promotes a sub-product within Banking — needs to invite exploration without competing with Savings hero's `Add money` Primary above it. Source: cal:2026-05-28 R19 — Atom frame `9442:24842`

4. **L0 card / Medium — Fixed deposits**:
   - `Fixed deposits` H4 left + `₹0` Display/Small (or current FD total)
   - Green delta caption `Earn interest up to 7.75 p.a.` with up-arrow icon
   - Trailing illustration (graph-with-people / FD mascot, ~80-96px) bleeds to right edge

5. **L0 card / Medium — monies**:
   - Pod label `monies` H4 left (lowercase — product name, distinct from pod title casing rule)
   - Content / amount below
   - Trailing illustration (colored cluster, ~80px)
   - Card sits at the visual bottom of the scrollable column — partial visibility behind floating dock is acceptable.

6. **Floating bottom dock** — semi-transparent slate, ~3 icons visible (home active V-500 in white circle, generic-app, qr-scan). Content scrolls UNDER the dock with gradient fade. Active state = **white solid circle + V-500 glyph inside** (never V-500 fill bg).

### Card stack rules
- **16px gap** between L0 cards. NOT 0-gap (0-gap is for flat list components only). Source: anti-patterns L91 ✅
- 24px page padding horizontal — cards never touch the screen edge.
- Cards fill width: `360 − 48 = 312px`.

### What Banking L0 doesn't do

- ❌ **No "Banking home" with quick-action grid + accounts list** as a separate L0. Balance/Savings hero card IS the Banking L0. Treating Banking home and Balance L1 as different screens is an explicit banned pattern (SKILL.md L149).
- ❌ **No List or Bold section header between L0 cards** (e.g. `Your accounts` between Savings and FD). Cards themselves are the structure. Headers between cards introduce a list-mental-model where there isn't one. Source: cal:2026-05-28 R18 ✅
- ❌ **No leading icon on App bar L0** — pod title left + trailing utility/Avatar only. A leading icon reads as App bar Standard chrome, which is for L1+ back-nav flows.
- ❌ **No bottom-anchored Primary CTA on the Banking L0 page** — the Savings card's `Add money` CTA lives INSIDE the card. Anchoring would compete with the card's own action.
- ❌ **No quick-action grid (Send / Bills / Mobile / Recharge tiles) on Banking L0** — that's an Explore pattern. If you find yourself wanting one, you're probably building Explore.

### Motion on Banking L0

- **Nav push/pop** when entering Savings detail or Atom: translateX 0 → -25% + opacity 1 → 0.7 outgoing, translateX 100% → 0 incoming. 320ms `out` (gentle). See `reference_motion.md` Nav push.
- **Press feedback on Add money button**: opacity 1 → 0.7 over 160ms `quick`, restore on release. NEVER scale (no rubber-band).
- **Skeleton shimmer** during balance load: linear gradient on the amount line, 1200ms linear infinite — the only allowed loop.
- **Value change on Savings amount** (e.g. after Add money succeeds and user returns): new value translateY -100%→0 + opacity 0→1, old value translateY 0→100% + opacity 1→0 simultaneously, 240ms `out`.

---

## Balance L1 — dedicated balance screen

The L1 surface entered from the Savings hero's "Grow your savings" V-500 link OR from a dedicated balance entry point.

### Recipe

1. **App bar Standard** with chevron back `‹` + title (e.g. `Savings`) + trailing **eye icon** (hide/show balance).
2. **Centred hero** (NOT L0 card chrome — page-level Top header pattern):
   - `Total balance` caption (secondary)
   - **Display amount** centred — `₹76,039.49`. Decimals smaller / subscript treatment acceptable. ₹ matches digit weight (no subscript).
   - **Brand-purple caption** below — context-rich (`Earning interest at 100% RBI repo rate`), V-500 text, NOT secondary grey. WHY: brand-purple encodes "this is a slice-product moment" — secondary grey would dilute the signal.
3. **Two CTAs side-by-side bottom-anchored**:
   - Tertiary outline `Transfer` (white bg + V-500 text + V-500 outline)
   - Primary `Add money`
4. **NO "Recent transactions" list on this screen** — that's a separate L2 surface (txn detail or Activity).

### Hero alignment — L0 vs L1 (calibrated)
- **L0 top header inside the Savings card**: left-aligned. Caption above, amount + hide-toggle on baseline, delta below — all left-edge.
- **L1 dedicated balance screen**: centred. Display amount centred with caption above and brand-purple caption below.
- Source: cal:2026-05-17 — `balance_hero_alignment-100` pick B + R2 pair 202 "big number value always in center, only left in card in L0 screens". 3 signals ✅

### Component: Top header molecule
The L1 hero IS the canonical Top header molecule (see `reference_dls_top_header.md`). When building, use Top header — NOT a custom hero block. Single insight row (don't stack multiple), button group below, optional User Action Request callout lowest priority.

---

## Savings — Add money form (L2)

Recipe (per `reference_dls_screen_layouts.md` Add money — amount entry):

1. App bar Standard chevron back + `Add money` title
2. **Massive centred amount** `₹1,20,000` — ₹ matches digit weight and size (no subscript). cal:2026-05-17 pair 800 ✅
3. **No keypad** in this neutral variant (system keyboard available — NOT the slice custom dialer, which is Payments L0 only)
4. Bottom-anchored Primary continues the flow.

Contrast: Payments dialer uses slice custom keypad. Savings Add money uses system keyboard — different surfaces, different input mechanics.

---

## Fixed deposits

### FD card on Banking L0 (covered above)
L0 Medium with `Fixed deposits` H4 + `₹0` amount + green up-arrow caption (interest rate) + trailing illustration (graph-with-people, ~80-96px right-bleed).

### "FD at 8.5% p.a." compact card (alternate composition)
Distinct from generic L0 Medium — has explicit in-card CTA:
- Title H4 left (`Fixed deposits` or specific FD product name)
- Subtitle Caption secondary left (`8.5% p.a`, `1-year FD`)
- Body row: `Invest now` grey-pill (Tertiary Small)
- Trailing illustration ~96×96 (FD mascot / graph-with-people)
- Source: cal:2026-05-28 R19 — DLS Cards page

### Spark FD details (L1)

Source frame: review-1109 reference frame, cal:2026-05-17 + cal:2026-05-18 refinements ✅

1. App bar Standard chevron back + **no title** + trailing chat-help icon
2. **Left-aligned hero (no card chrome)**:
   - `Deposit amount` caption secondary
   - **`₹9,200`** H2 left-aligned
   - `Initial deposit · ₹10,000` caption secondary with bullet separator
3. **Listing area** (no card wrapper, no section header):
   - Row: `Accumulated Interest` → `₹40` (green for positive)
   - **Dashed full-bleed divider**
   - Row: `Interest paid till date` → `₹120`
   - Dashed divider
   - Row: `Interest to be earned` → `₹600`

### What Spark FD details doesn't do

- ❌ **No "+₹X today" green pill chip** below the subline. Hero stays clean: caption + amount + bulleted subline. Today-delta info belongs in the listing rows below. Source: cal:2026-05-18 review-1207 pick A ✅
- ❌ **No card chrome around the hero** — flush page-level placement only. Mirrors the txn detail status-header rule (header is page-level hero, NOT a card).
- ❌ **No "View history" or "Statement" CTA on the hero** — surfaces below carry the data.

---

## monies

monies is slice's prepaid wallet / rewards-balance product. On Banking L0 it appears as an L0 Medium card with the colored-cluster illustration. monies also appears as an **action pill on Payments L0** (`[₹ glyph] monies` empty state at 94×36, or `[₹ glyph] 3,224 monies` long pill at 195×36 when balance exists) — see Payments pod ref.

### monies card on Banking L0
- L0 Medium, white card with shadow
- `monies` H4 left (lowercase — product mark)
- Content below (current balance / nudge copy)
- Trailing illustration: colored cluster (~80px), bleeds to right edge
- Partial visibility under floating dock acceptable.

### monies in Rewards (cross-pod note)
Rewards L0 surfaces Spark + Fire + monies as the 3 unlocked-rewards categories. Invite & earn does NOT live in Rewards (it's a share affordance, footer territory). See cross-cutting anti-patterns ref.

---

## atom sub-product

slice atom = a goal-based / habit-based savings sub-product inside the Banking pod. Atoms = named savings goals (Emergency fund, Vacation, Daily saver, Round-ups, Custom). Contribution mechanisms: one-shot top-up, recurring schedule, UPI round-ups.

Source: cal:2026-05-28 R19 — Atom file `I6rQjCoyh38Fanjxwj1aA9`. Multiple frames cited per recipe below.

### Feature PDP pair (FTUX)

2-step product intro that precedes the chooser. Distinct from empty/confirmation/onboarding recipes — slice didn't document this pattern before R19.

**Page 1 — brand hero** (frame `7949:50755`):
1. App bar Standard, **no title** (page 1 has no back — first surface)
2. Centred **H1 title with V-500 product-name overlay** — `slice atom` (slice in text-primary black, atom in V-500)
3. 3D / illustrative hero (`atom_orb_3d` — radial-gradient atom orb, ~200-280px square) centred
4. Caption secondary body, centred, with **chevron-down peek** (inter-page affordance — "expand to learn more", not "next page")
5. Bottom-anchored Primary full-width `Get started`

**Page 2 — benefits detail** (frame `8017:59958`):
1. App bar Standard chevron back
2. Same caption + chevron-up (inverse of page 1)
3. **4-row benefits list**: V-500 line-icon leading (NO Avatar wrapper), H4 title, body-secondary subtitle, ~24px row gap. **No card wrapper.**
4. Bottom-anchored Primary `Get started`

WHY 2-tone title: V-500 on `atom` signals this is a slice sub-product with its own identity (not just a feature). The 2-tone is a sanctioned brand-mark treatment for sub-products — distinct from V-500-as-CTA-accent. **Flagged for calibration confirmation in next round** (R19 single-frame observation); treat as canonical for Atom FTUX only until confirmed.

### Chooser picker (frame `8042:61354`)

Picker surface listing pre-made starter atoms + "Create your own" affordance.

1. App bar Standard chevron back only
2. **Display/Small title `atoms to start with`** (left-aligned, lowercase — L1 surface descriptor per R19 clarification)
3. Caption secondary subtitle
4. Stack of **outline-border cards** (1px outline-subtle, radius L 16, NO shadow), 12px gap, full-width within 24px page padding
5. Each row: square thumbnail-illustration leading (~56px rounded, from `atom_stash_thumbnails` — corgi for Round-up, mountains for Vacation, cassette+coin for Daily saver, etc.), H4 title, caption secondary 1-2 line body
6. **"Create your own" row**: slate-10 filled square with `+` glyph instead of an image (no chevron — whole card is tap target)
7. **No section header**, no recommended/popular pills at this stage (those appear later on returning-user L1)

### Setup form shell (Add money / Recurring / Round ups)

Same shell used for all 3 contribution mechanisms. Frames `8017:60857` (Add money), `8695:2319` (Recurring), `9198:24728` (Round ups). Consistent across all 3 ✅

1. App bar Standard chevron back + **dynamic action-named title** (`Add money` / `Recurring` / `Round ups`)
2. **Centred identity block**: 80px rounded illustration tile (same thumbnail as chooser, scaled up) + **Metadata UPPERCASE product name below** (~12px tracking, secondary text colour, e.g. `EMERGENCY FUND`, `DAILY SAVER`)
3. Caption secondary `Contribution amount`
4. **Big centred Display amount** (₹ matches digit weight — consistent with existing Amount entry rule)
5. **Inline preset chips** directly under the amount: 3 horizontal outline-border pill chips (`₹1,000 / ₹5,000 / ₹25,000`), full pill radius, slate text
6. **Optional schedule meta rows** (Recurring only): hairline-separated label/value rows + green-fill toggle for `Start from today`
7. **"Adding from" account selector** at bottom: outline-border card with V-500 Avatar leading + 2-line `Adding From / Savings xx0226` + trailing `⋯` ellipsis icon
8. T&C disclaimer (caption secondary + V-500 inline links)
9. Bottom-anchored Primary full-width `Continue`

### Returning-user L1 (frame `8534:23336`)

L1 surface a user lands on after creating their first atom. Introduces a NEW CTA-anchoring pattern: full-width Primary **mid-screen**, not bottom-anchored.

1. App bar Standard chevron back + `atom` title (lowercase L1 surface descriptor, not pod title)
2. Centred caption + **Display amount** (current total value) + green positive delta
3. **Full-width Primary `Create atom`** mid-screen (NOT bottom-anchored — exception, parallel to Profile overlay)
4. **Active atoms list** — outline-border cards, 12px gap. Each card:
   - Square illustration tile leading (~56px)
   - Title H4 + amount right-aligned
   - `Target · ₹X` caption secondary
   - Inline V-500 progress bar + percentage value (V-500) right-aligned on a `Progress` row
   - Recurring atoms: sync-icon prefixed caption (e.g. `Set up recurring contribution sample`)
5. **`SUGGESTED FOR YOU`** UPPERCASE List section header (Metadata weight, slate-10 bg)
6. **Suggested atom cards** — same shell as active cards + **inline coloured pill tag above the title** (pink-fill `RECOMMENDED`, blue-fill `POPULAR`). Pink/blue tags are Metadata UPPERCASE on coloured-subtle pill fills.

WHY mid-screen CTA: third valid CTA-anchoring pattern alongside bottom-anchored (default L1+) and small-centred (under short empty states). Applies when the L1 hero shows actionable summary data AND the primary action operates on that data (Create atom → grows the total displayed above). Source: cal:2026-05-28 R19 ✅

### Full-screen how-it-works explainer (frame `9442:23914`)

NEW pattern, distinct from empty / confirmation / onboarding. Used for the Round-ups explainer; reusable for other sub-product explainers.

1. **X close top-left** (no app bar, no title, no chevron)
2. Centred **paired illustration** (~200px wide) — `round_ups_setup_pair`: beer mugs (spending) + piggy-bank (saving), separated by a tap-arrow. Beige + green accent, flat illustrated, white background — minimal spot style (NOT grainy).
3. H2 left-aligned title + body secondary 1-2 lines
4. **Numbered steps section**:
   - `How it works?` caption label (weight medium, left)
   - 3 numbered rows, each: ~24px slate-10 circle with digit + body text
5. **NO CTA** — passive explainer, dismissed via X close

### What atom doesn't do

- ❌ **No Primary CTA at bottom of Returning-user L1** — Primary lives mid-screen (see WHY above)
- ❌ **No CTA on the how-it-works explainer** — X close only, this is passive education
- ❌ **No chevron on chooser rows** — whole card is tap target
- ❌ **No card wrapper on the benefits list (PDP page 2)** — flat icon + text rows, V-500 line icon leading (NO Avatar wrapper)

---

## Banking-relevant illustrations

Catalogued in `reference_dls_illustrations.md`. Banking touchpoints:

| Illustration | Where | Size |
|---|---|---|
| `atom_orb_3d` (purple-pink gradient orb with orbiting capsules) | Atom FTUX page 1 hero | ~200-280px centred |
| `atom_stash_thumbnails` (corgi / mountains / cassette+coin / doctor / retail) | Atom chooser rows, active/suggested atom cards, Banking L0 stash entry | 48-56px in Avatar L-48 for rows; 80-120px for setup form identity block |
| `round_ups_setup_pair` (beer mugs + piggy-bank) | Round-ups how-it-works explainer | ~64px each, paired with tap-arrow |
| FD mascot / graph-with-people | Banking L0 FD card trailing-bleed | ~80-96px right-bleed |
| monies colored cluster | Banking L0 monies card trailing | ~80px right-bleed |
| atom Banking L0 entry mascot (purple goo + green parcel) | Banking L0 slice atom Medium card trailing | ~80px right-bleed |

### Anti-patterns (illustration-specific)
- ❌ Generic line-art illustrations in shipped Banking surfaces — slice ships real branded illustrations (atom orb, FD mascot, monies cluster). Generic SVG placeholders are prototyping only.
- ❌ Standalone illustration in list-leading position (no Avatar wrapper) for Atom chooser / active atom rows — wrap in Avatar / rounded-square thumbnail container.
- ❌ AI-generated / Claude-drawn substitute illustrations. When an asset isn't provided, **ask the user**. Never improvise a glyph.

---

## Avatar background rules in Banking contexts

The 6 Avatar background rules from `reference_dls_avatar.md` (cal:2026-05-28 R19) — Banking-relevant subset:

### Rule 4: Banking row leading (bank logo present)
- Avatar: **bank logo on WHITE circle** (NOT subtle V-50)
- Fallback: bank line icon on CardBG when no logo available
- Used for: account selection rows, transfer destination rows (`From: HDFC Savings ····5732`), the "Adding from" account selector on Atom setup form
- WHY white circle: banks are external entities with their own brand marks; subtle Avatar bg dilutes the bank's brand. White circle lets the bank logo read clearly.

### Rule 2: Saved beneficiary / contact list (Transfer screen)
- Avatar: **Subtle V-50 / V-25 + V-500 line icon** (or first-letter)
- Used for: contact / saved beneficiary list rows when initiating a Transfer from Balance L1.

### Rule 6: Transfer screen large-avatar exception
- Avatar: at S-72+ sizes (Transfer/Send screen recipient hero), subtle/CardBG bg disappears against white page. Use **V-500 Bold** or **merchant logo / photo** at full size.

### Standard Banking list rows (default)
- Subtle V-50 + V-500 glyph (default) OR White + outline-subtle + V-500 glyph — these two read as interchangeable defaults.
- Glyph weight: **Rubik Medium 500**. Glyph size: `avatarSize / 2` (M-40 → 20pt, L-48 → 24pt).
- **Never default to Bold across a list** — Bold is reserved for emphasis moments / status-coded categories.

### Atom stash rows (special case)
- Atom active / suggested atom cards use **photo-illustration in rounded-square Avatar L-48** (corgi, mountains, etc.) — richer alternative to icon-in-subtle-bg. Stash thumbnails are a hybrid photo+illustration in rounded-square containers.

### Quick-action tiles (if any appear in Banking — they shouldn't on L0)
- White + outline-subtle + V-500 line icon — NOT Avatar, NOT subtle bg. See cross-cutting anti-patterns.

---

## Cross-cutting reminders (cite, don't restate)

Hard rules that apply to every Banking surface — see `reference_pod_cross_cutting.md`:
- Lowercase "slice" always (Capital-S "Slice" banned)
- Rubik only, two weights (Regular 400, Medium 500)
- No emoji in shipped UI — slice line icons only inside Avatars and CTAs
- Indian number grouping (`₹45,800`, `₹1,20,000`, `₹76,039.49` — ₹ touches the digit)
- No `+` prefix on credit / received amounts (Positive Green colour does the work)
- No red-fill Primary buttons (destructive uses alert-dialog or Tertiary outline)
- Chevron `‹` for back, not arrow `←`
- White-on-white surfaces — slice doesn't do grey page backgrounds

---

## Calibrated history

Brief audit trail of major Banking-pod calibrations:

- **cal:2026-05-17 R11** — Balance L1 hero alignment rule (centred on L1, left in L0 card). Spark FD details L1 recipe (left-aligned hero, no chrome, dashed dividers between rows). Source: review-1109 reference frame + pair `balance_hero_alignment-100` pick B.
- **cal:2026-05-18 R12** — Spark FD details no today-delta chip. Confirmation tick stroke 8px (relevant to Add money success). Source: review-1207, review-1201.
- **cal:2026-05-21 R14** — Pod-title casing initially lowercase per single empty-Activity frame (later overridden).
- **cal:2026-05-28 R18** — Banking L0 sweep against canonical DLS reference (node `885:19757`). Promoted: Savings hero in-card CTA pattern, 16px stack gap between L0 cards, no section headers between L0 cards, floating dock active-state pattern (white circle + V-500 glyph, not V-500 fill bg). Reverification: pod titles CAPITALIZED on App bar L0, overriding R14 lowercase rule. Source: L0 canonical reference frames.
- **cal:2026-05-28 R19** — Atom suite added (Feature PDP pair, chooser, setup form shell, returning-user L1, Banking L0 entry card, full-screen explainer). NEW CTA-anchoring pattern: full-width Primary mid-screen. NEW illustration catalog entries: `atom_orb_3d`, `atom_stash_thumbnails`, `round_ups_setup_pair`. Flagged for next round: 2-tone product-mark title (`slice atom` in black + V-500), user-uploadable thumbnail with edit-pencil badge (custom atom). Source: Atom file `I6rQjCoyh38Fanjxwj1aA9` frames 7949:50755 / 8017:59958 / 8042:61354 / 8534:23336 / 9442:24842 / 9442:23914.

---

## Flows Banking participates in

See `reference_flows.md` for full step-by-step.

- **Add money to Savings** — native here (Banking L0 Savings card CTA). Cross-pod entry from Payments L0 low-balance prompt.
- **Open a Fixed Deposit** — native here (FD card Invest now). Internal — no cross-pod hops.
- **Create an Atom (FTUX)** — native here (Atom entry card → Feature PDP pair → chooser → setup → returning-user L1). Internal sub-product.
- **Contribute to existing atom** — native here (Atom returning-user L1 → atom detail → contribution form).
- **Withdraw from FD** — native here (Spark FD details L1 → Withdraw → review sheet → PIN → confirmation).
- **Source-account picker** — invoked here from every Banking flow that needs a source. Component lives cross-pod, recipe in Payment-cluster bottom sheet (handle YES). Same picker reused by Payments, Credit Repay, Atom.

Cross-pod handoffs:
- Banking → Payments (Add money confirm → balance updates → user returns to Banking L0)
- Payments → Banking (low-balance prompt deep-links into Add money)
- Banking → Activity (every Banking transaction creates an Activity row)
