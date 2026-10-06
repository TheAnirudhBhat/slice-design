---
name: slice-design Bills pod (sub-pod under Explore)
description: Per-pod aggregator — bill payment surfaces (auto-fetch onboarding via SMS, My bills L2, segmented tabs, biller rows, Manage sheet, FTUX). Sub-pod accessed via Explore L0's Recharge & bills card. Load this for any bill-pay task.
type: reference-aggregator
---

# Bills (sub-pod under Explore)

Bills is a destination feature with its own L1/L2/FTUX chain. Native entry = Explore L0's Recharge & bills card. From there: Recharge & bills L1 → All bills L2 (segmented Pending / All) → Manage sheet → per-biller pay flow.

This pod file focuses on **the Add-bills-via-SMS auto-fetch chain** + the My-bills L2. The per-biller pay-flow chain (biller-detail → fetch-bill → review → pay → confirm) likely lives in a separate file (R21 sweep scope was specifically auto-fetch onboarding). When that file is swept, fold it in here.

## In scope
- Recharge & bills L1 (with promo callout carousel)
- "All bills" pill in L1 App bar with red-dot indicator
- Auto fetch bills interstitial (FTUX permission opt-in)
- Auto-fetch loader chain (Finding your bills → Adding your bills → Bills added successfully)
- My bills L2 with segmented tabs (All / Pending)
- Bill row anatomy (biller-logo + name + due-meta + trailing slot)
- New bills found transient section header
- Manage bottom sheet (Add bill / Remove bill)
- Empty state (No bills found)
- FTUX tooltip pointing to "All bills" pill
- Bills-specific anti-patterns

## Out of scope (see)
- Explore L0 Recharge & bills card (the entry point) → `reference_pod_explore.md`
- Per-biller bill-pay flow → not yet swept; treat as TBD
- Total due summary footer for payment confirmation → `reference_dls_button_group.md`
- Footer payment-network logos (Bharat Connect / UPI) → `reference_dls_footer_header.md`
- Hard rules → `reference_pod_cross_cutting.md`

## Bills L1 — Recharge & bills landing

Entered from Explore L0 Recharge & bills card.

1. **App bar Standard** — chevron back + `Recharge & bills` title (or no title — verify) + **"All bills" pill trailing**
2. **"All bills" pill** (trailing in App bar):
   - Slate-10 rounded pill (~32px tall)
   - Leading 16px receipt/document line icon
   - Caption label `All bills`
   - 6×6 red dot at top-right corner (when fresh bills detected)
   - **Hides entirely when user has zero bills AND no auto-fetch yet** (anti-pattern: don't show 0-state disabled pill — noise)
3. **Recharge categories grid** (24px page padding):
   - 4-up tile grid of biller categories (Mobile / DTH / Gas / Water / Electricity / Broadband / etc.)
   - Each tile: subtle-circle Avatar + slate line glyph + category label below (no V-500 fill — content-grid tile pattern)
4. **Reward callout carousel** (NEW R21 finding — overrides earlier static-row description):
   - Slate-10 rounded callout (~64px height)
   - Leading 20px Fire icon (filled orange — slice fire glyph)
   - Title H4 `Get assured ₹10`
   - Subtitle caption secondary `Fire reward on 1st electricity bill` (L1 copy is more specific than the L0-card's `Reward on 1st bill payment`)
   - **3 dot indicators below** — it's a carousel, not a single static callout
   - **No chevron** on L1 reward callout (chevron is L0-card pattern only)

WHY carousel on L1 not L0: the L1 surface earns more attention budget — multiple promos can be queued. The L0 card has only one reward callout because L0 cards are space-constrained.

Source: cal:2026-05-28 R21 — Bill Payment file frames `16533:2705`, `16927:5222`, `16934:12428`

## Auto fetch bills — FTUX permission opt-in

Tapped from L1 "All bills" pill the first time (or from a system nudge):

1. **Full white sheet** (slides bottom-up — modal-from-bottom takeover)
2. **App bar Standard** — chevron back leading
3. **Empty illustration slot** (~96-128px gradient orb illustration top-right)
4. **Display title** `Auto fetch bills` (~28pt Display)
5. **Body secondary** copy (1-2 lines)
6. **Two bulleted rows** (~24px leading icon + H4 title + caption secondary subtitle):
   - "All bills in one place"
   - "Win rewards with bill payments"
7. **Sticky magenta Primary CTA** `Continue` at bottom (V-500 fill, full-width pill)

WHY: this is the canonical "explainer interstitial" — illustration + 2-3 bullets + 1 Primary CTA. Reusable pattern for any permission/feature opt-in.

Source: `16914:209388` Auto fetch bills interstitial ✅

## Loader chain — Finding → Adding → Success

Three distinct loader treatments — loader weight matches commitment level.

### Loader 1: Onboard discovery — "Finding your bills"
- Full-screen sheet (X close top-left)
- **Purple magic-hat illustration** centred (~140px)
- H2 title `Finding your bills`
- Body caption secondary
- No CTA — auto-progresses

### Loader 2: Final commit — "Adding your bills"
- Same scaffold but illustration is a **confetti dot cloud** (6-7 colored circles in loose constellation)
- H2 title `Adding your bills`
- Caption: `Please wait`
- No CTA

### Loader 3: Inline re-fetch (after Manage action)
- **4 magenta dots inline** (pulsing) — replaces list area only, sheet stays on screen
- Used after the Manage sheet closes → list refresh

WHY 3 weights: loader visual matches the moment. Onboarding discovery gets a branded magic-hat — first-impression delight. Final commit gets celebratory dots — "something is happening for you." Inline re-fetch gets minimal dots — don't over-decorate routine actions.

Source: `16533:1304` shows all three side-by-side in canonical strip ✅

## Success surface — Bills added successfully

After Loader 2 completes:
1. **Centred ~80px green circular check icon** (filled — solid green disc + white check, distinct from grainy-gradient-tick payment success)
2. **Display title** `Bills added successfully`
3. **Body caption secondary** `Never miss a due date`
4. **NO CTA** — auto-progresses to My bills L2 after a brief beat
5. **Right-to-left slide-in transition** into My bills L2

Source: `16533:1304` Success frame

## My bills L2 — segmented tabs

The bills inventory surface. Accessed via the "All bills" pill from L1 OR via the success-state auto-route.

1. **App bar Standard** — chevron back + `My bills` title + optional kebab trailing (for Manage sheet)
2. **Segmented tab pair** — pinned directly below the back-chevron (no title in between):
   - `All bills` tab (selected default)
   - `Pending bills` tab
   - White-fill thumb on active + slate-10 inactive track (matches slice's Pills component)
3. **Tab content**: flat row list (NO section headers within tabs)
4. **Bill row anatomy** (see below)
5. **Kebab → Manage sheet** for list-management actions

WHY 2 tabs not more: cognitive load. L2 has only two views — all bills vs the urgent subset (pending). More tabs would dilute the bill row's emphasis.

## Bill row anatomy (canonical across tabs)

| Slot | Element | Tokens |
|---|---|---|
| Leading | 32px circular biller logo, **brand-coloured** (Airtel red, BESCOM blue, credit-card brand colors) | Slate-10 backplate, brand fill inside circle |
| Title | Biller name, H4 (16/20 Medium) | text-primary |
| Subtitle | Caption secondary OR **orange `₹599 due in 2 days`** (warning when within ~7d) | secondary text OR amber/orange-600 |
| Trailing | Variable: `Pay` slate-fill pill (Pending tab) / vertical kebab (All bills tab) / `Add` pill (newly-detected biller) | — |

**Key rules**:
- **Biller logo carries the type** — no separate category icon needed. The biller's brand colour disambiguates electricity / telecom / DTH / gas.
- **Orange `due in N days` is the ONLY warning color** — never red (red is reserved for hard validation failures). Secondary text when no due.
- **`Pay` pill is slate-10 fill, NOT magenta** — magenta Primary is reserved for screen-level CTAs (Continue, Add manually). Row-level Pay pills are quiet — putting magenta on every row would create a fire hazard.

Source: `16533:2705`, `16540:1595`, `17042:9166`, `17042:9528` — 5+ frames, dark-mode parity ✅

## New bills found — transient section header

When auto-fetch detects new bills mid-list:

1. **Bold H4 section header** `New bills found` (NOT slate-10 List-style header, NOT UPPERCASE Metadata)
2. Newly-detected rows render **above** existing rows (list priority)
3. Header disappears after the user adds or dismisses the new bills

WHY transient: these bills are unconfirmed until the user taps Add. Distinct from the permanent `Pending bills` filter tab. Bold style (not List style) signals "this is temporary content sectioning, not a permanent group."

Source: `16540:1595` dev note: "List priority New bills found → added bills"

## Manage bottom sheet

Tapped from the kebab trailing on All bills tab rows.

- Standard bottom sheet (Action-driven cluster — no handle per R20)
- H4 title `Manage` left
- Slate-10 grabber NOT present (Action sheet, not Information sheet)
- 2 list items:
  - `+ Add bill` — leading + icon, body weight title, no destructive treatment
  - `🗑 Remove bill` — leading trash icon (NOT red — neutral row), body weight title

**Critical interaction rule**: Manage sheet close → **full-screen loader (Loader 3 inline pattern)** → updated list. **Never in-place list reshuffle while the sheet is still visible.** That feels janky.

Source: `16540:1595` ✅

## Empty state — No bills found

When My bills L2 is empty:
1. **Pink-purple calculator illustration** centred (~140-160px) — branded illustration, NOT generic
2. Title H2 `No bills found`
3. Body caption secondary `You have not added any bills yet`
4. **No CTA** (or a Tertiary text link "Add manually" — TBD verify) — the kebab/Manage sheet is the action path

Source: `18096:21025`

## FTUX tooltip

When the user first lands on My bills L2 (after success state), a tooltip points at the **"All bills" pill** with copy explaining the entry point.

- Tooltip body: dark Slate-900 bg, white caption text, 8px radius, **arrow pointer** (per R19 Tooltip refinement — arrows ARE canonical)
- Position: bottom-pointing arrow above the All bills pill (top-of-screen anchor)

## Bills-specific anti-patterns

### ❌ Red colour for "due in N days"
Even when overdue, use orange (warning), not red. Red is reserved for hard validation failures + money-failure receipts.

### ❌ Magenta Primary on row-level Pay buttons
`Pay` is slate-10 pill. Magenta is screen-CTA only. Magenta on every row creates a fire hazard.

### ❌ "Add bill" rendered as destructive in Manage sheet
Plus icon + standard text weight. NO green/positive treatment either — sheet stays neutral. Same row weight as Remove.

### ❌ "All bills" pill shown when user has zero bills and no auto-fetch yet
Hide entirely. Don't show a disabled "0 bills" state — noise.

### ❌ In-place list update after Manage sheet action
Close sheet → full-screen loader → instant list refresh. In-place reshuffle while sheet visible is the anti-pattern.

### ❌ "₹0 FEE" pill on Recharge L1
The V-500 solid `₹0 FEE` pill belongs ONLY on the Explore L0 entry card. Recharge L1 is already inside the flow; pill would be redundant.

### ❌ "History" CTA on Bills surfaces
Bill payments are forward action. History pulls users sideways into Activity, which has its own surface. Tapping the bill row shows past payment when relevant.

Source: cal:2026-05-28 R21 + existing R11 `explore-base a6808af` ✅

## Cross-frame invariants (R21 — Bills-specific patterns visible across 2+ frames)

1. **Biller logo = brand-colored circle, never V-500 tint, never grayscale.** 5+ frames.
2. **Orange `due in N days` is the ONLY warning metadata color** — 3+ frames.
3. **`Pay` pill is slate-10 fill / Body weight / Pill shape** — 4 frames.
4. **Bills surfaces use `<` back chevron, NOT X close** — except "Finding your bills" + "Add bills manually" (modal-from-bottom sheets use X). 6+ frames.
5. **Segmented tabs are pill-shaped, pair-only (2 tabs), pinned directly below back-chevron with no title** — 3 frames.
6. **Manage sheet → close → loader → list update sequence** — never in-place. Dev note + visual loader frame.
7. **Light/dark mode parity is total** — 7/7 dark mirror frames match light exactly via token swaps only. No color shifts.
8. **No Cancel/Confirm two-button block on any bill-action surface** — single Primary CTA + X/back-chevron only.

## Bills-relevant illustrations

| Asset | Use |
|---|---|
| Purple magic-hat | Loader 1 (Finding your bills) |
| Confetti dot cloud | Loader 2 (Adding your bills) |
| 80px green circular check | Success state (Bills added successfully) — distinct from grainy-gradient-tick |
| Pink-purple calculator | Empty state (No bills found) |
| Gradient orb | Auto fetch bills interstitial (placeholder — final illustration TBD) |
| Orange sphere | "Add bills manually" fallback screen |

## Calibrated history

- cal:2026-05-17 R11 — Explore L0 Recharge & bills card recipe (4-up grid + dashed divider + reward row) → entry point to Bills sub-pod
- cal:2026-05-17 R11 — Solid "₹0 FEE" pill rule → applies on L0 entry card only, NOT L1 (colour Blue → V-500 by cal:2026-10-06)
- cal:2026-05-17 R11 — No "History" CTA on Bills → still holds
- cal:2026-05-28 R21 — Add-bills-via-SMS auto-fetch chain, My bills L2 segmented tabs, Bill row anatomy with brand-coloured logos, orange-only `due in N days`, slate-10 Pay pill, Manage sheet, transient New bills found header, 3-weight loader hierarchy, reward callout carousel on L1 (override to static-row L0 pattern) ✅

## Open / next sweep

- Per-biller pay flow (biller-detail → fetch-bill → review → pay → confirmation) — not in R21 scope. Sweep when product ships those frames.
- "Linking in progress" frame — currently blank dev-spec; sweep when populated.
- New bill detected animation (`16540:5481`) — multi-state animation spec, needs dedicated motion sweep.

---

## Flows Bills participates in

See `reference_flows.md` for full step-by-step.

- **Add bills via SMS (auto-fetch FTUX)** — native here (Recharge & bills L1 → All bills pill → Auto fetch interstitial → loader chain → Add selector → success → My bills L2).
- **Pay a single bill** — Bills L2 → row Pay pill → biller pay flow (NOT YET SWEPT — separate Figma file).
- **Manage bills (Add / Remove)** — native here (Bills L2 → kebab → Manage sheet → loader → updated list).

Cross-pod handoffs:
- Explore → Bills (Recharge & bills card on Explore L0 is the entry point)
- Bills → Payments (pay step likely uses Payments rails — pending sweep confirmation)
- Action centre → Bills (due-bill notifications deep-link to Bills L2)
