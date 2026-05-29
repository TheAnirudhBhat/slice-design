---
name: slice-design Activity pod
description: Per-pod aggregator — every rule, recipe, anti-pattern, and motion touching the Activity pod (transaction list / txn detail L2 with 4 states / Action Centre / search / empty states / network error). Load this for any Activity-pod task.
type: reference-aggregator
---

# Activity pod

## The Activity identity

Activity is slice's **transparency layer** — it shows everything that has happened to your money. Where Payments is brand-immersive (the moment of doing) and Banking is hero-card (the moment of seeing balance), Activity is a flat list. The visual restraint is intentional: status colour communicates state instantly, debits stay calm, credits get green relief, no animation on routine taps, no fanfare. The list IS the screen.

Two surfaces carry most of the pod's weight:
- **Activity L0** — search + flat transaction list, no day-grouping, no week-summary.
- **Transaction detail L2** — 4-state status header (Success / Pending / Failed / Initiated) flush on page bg, no card chrome.

The Action Centre is technically the Notifications feed (not in bottom nav — opens from Profile overlay), but lives in this pod's conceptual neighbourhood because it consumes the same outline-card-on-list pattern and shares "no CTA on empty" semantics with Activity-adjacent states.

## In scope
- Activity L0 (transaction list, search, filter, identity)
- Transaction list item anatomy + Avatar background rules in txn context
- Transaction detail L2 — 4-state status header recipe + section stack
- Spark Offer callout, inline map block, status indicator dark-mode rule
- Action Centre cards + Action Centre empty state
- Empty Activity, Empty Search Results, Connection Lost
- Sticky date group headers, value change motion, no-animation rules for filter taps
- Activity-relevant illustrations

## Out of scope (see)
- Other pod L0s → `reference_pod_payments.md`, `reference_pod_banking.md`, `reference_pod_explore.md`, `reference_pod_credit.md`
- Hard cross-cutting rules (lowercase slice, no emoji, palette) → `reference_pod_cross_cutting.md`
- Building in Figma (gallery IDs, scripts) → `reference_figma_build.md`
- Full DLS component specs → `reference_dls_<component>.md`

---

## Activity L0 — pod home

Canonical reference: DLS working copy `PNUz3Dr9KSlFJSnsXsC0nL` node `885:20122` (cal:2026-05-28 R18 reverification).

### Recipe (top → bottom, build order)
1. **App bar L0** — pod title `Activity` (capitalised on canonical L0; lowercase valid on empty/illustrative states) at leading edge, **photo Avatar trailing** (user identity, tap opens Profile overlay)
2. **Search bar + filter icon button trailing** — 8px tight gap below App bar (cal:2026-05-18 review-1203: "too much space above the search bar, pull them closer")
3. **Flat transaction list** — Avatar leading + title H4 + relative-date caption + value right-aligned
4. **Floating bottom dock** (filter/activity icon active = white solid circle + V-500 glyph)

### Search bar anatomy
- Slate-10 pill, magnifying-glass leading, "Search" placeholder, full available width
- Pill radius 100px, padding `8px 24px`
- Border: `rgba(0,0,0,0.05)` default → `#D30AD7` focused/typing → `rgba(0,0,0,0.2)` filled
- Default state: search icon left + left-aligned placeholder (do NOT centre placeholder, do NOT omit icon — cal:2026-05-27 pair 1614)

### Filter icon button anatomy (R19 correction — canonical override)
**Canonical (cal:2026-05-28 R18)**: white fill + outline-subtle border + **slate glyph** + 48×48 circle.

Earlier R12 doc (2026-05-18) said slate-10 bg + V-500 line icon — that was drift from an iteration variant. The canonical Activity L0 reference frame `885:20122` shows the white-outline pattern. Use it.

| Layer | Spec |
|---|---|
| Container | 48×48 circle |
| Fill | White `#FFFFFF` |
| Border | 1px `rgba(0,0,0,0.05)` (outline-subtle); Filled state → `rgba(0,0,0,0.2)` |
| Glyph | Slate line icon (~20px), centred |

Source: cal:2026-05-28 — L0-canonical-reference Activity (node `885:20122`) ✅

### Transaction list item anatomy
- Sub-type: **List item / Transaction** (76px height per `reference_dls_list_items.md`)
- Avatar (M-40) leading — see Avatar background rules below
- **Title H4** — party name (e.g. `Aman Saxena`, `Uber`, `HDFC Bank`)
- **Subtitle = relative date** — `24 Jan '26` format, NOT time-of-day (cal:2026-05-17 R1 reason `txn_date_in_subtitle`)
- **Value right-aligned**:
  - **Credits → Positive Green `#00A63E`**, **no `+` prefix** (HARD rule, calibrated bans)
  - **Debits → text-primary `rgba(0,0,0,0.9)`** (never negative red — red reads as bank-app punishment)
- Source: cal:2026-05-17 — pairs 001 + 304 + 401, 3/3 100% ✅

### Avatar background rules in Activity context
Subset of the 6 R19 Payment OS rules (`reference_dls_avatar.md` § Avatar background rules):

| Row context | Avatar treatment |
|---|---|
| **Merchant with logo** (Uber, Blinkit) | Filled merchant logo in **white circle** (merchant's actual brand colour) |
| **Merchant fallback (no logo)** | CardBG fill + first-letter slate text |
| **Contact / payee** | Photo Avatar (when available) OR Subtle V-50 / V-25 + first-letter glyph |
| **System / generated txn** (e.g. "Dec savings interest") | CardBG fill + line icon (slate or V-500) |
| **Bank** (e.g. "HDFC NEFT credit") | **White circle** + bank logo (NOT subtle — banks are external brands; subtle dilutes their mark). Fallback: bank line icon on CardBG. |

### What Activity L0 doesn't do
- ❌ Tabs as filter pattern — slice uses pills, never tabs (cal:2026-05-17 pair 504)
- ❌ Pills row directly under the search bar — not a slice pattern today (cal:2026-05-18 review-1203 "we don't have pills under search till now")
- ❌ Day-group section headers (`TODAY` / `YESTERDAY`) at L0 — group surfaces are L2/L3
- ❌ Week-summary hero block at L0 — that's a downstream analytics surface
- ❌ Filter button as slate-10 fill + V-500 glyph — R19 override; canonical is white + outline-subtle + slate glyph
- ❌ List section header directly under App bar — grey List-header bg touching App bar reads as malformed second nav (cal:2026-05-17 R3 pair 300, "this header never comes directly after the app bar"). The search bar IS the required content row between App bar and list.
- ❌ Inset divider between consecutive avatar-leading txn rows — the Avatar itself + 12px row gap is enough separation (cal:2026-05-18 tune-1303)
- ❌ Leading icon on App bar L0 — pod title only at leading edge (cal:2026-05-28 R18, 5 pods confirmed)

---

## Transaction detail page (L2) — 4-state status header recipe

**Entirely new pattern from R19** — txn detail page was barely covered in earlier rounds. Same scaffold applies to Success / Pending / Failed / Initiated; only colour and copy vary.

Canonical reference: AVC `KXA1BbYZvzygD1XUOTIwUa` canvas `2410:22541` ("✅ Txn details page in Dark mode"), 12 detail frames × 4 states × Light/Dark.

### Status header anatomy
**Sits flush on page bg, no card chrome — page-level hero content.**

1. App bar Standard — **chevron-back left only**, no title, no trailing
2. **Status title block** (24px horizontal padding):
   - Left column: H2 title (Rubik Medium ~26/30), 1–3 lines depending on state copy
   - Right column: **circular status indicator Avatar ~48–56px**, colour per state (see table)
3. **Optional status caption** directly under title — 1–2 lines, **rendered in the status colour** (NOT secondary grey)
4. Optional `To <Name>` H4 + `25 Aug '22, 11:58 pm` Caption secondary
5. Optional Notes pill (slate-10 bg, italic-prefix `Notes:`)

### 4-state status colour palette

| State | Indicator | Caption | Title pattern |
|---|---|---|---|
| **Success / Paid** | **Green grainy gradient tick** (small 32–40px Avatar, white check inside, 8px stroke) | none (no caption row — title is the receipt) | `Paid ₹330` |
| **Pending / Processing** | **Amber ring** (~40px, white `!` glyph) | **Amber-700** text (1–2 lines, e.g. "Please wait for 3–5 minutes. Full refund in case of payment failure") | `Processing request of payment of ₹10,000 pending` |
| **Failed** | **Red Avatar Bold** (~40px solid red, white X, NO grain) | **Red-600** text (e.g. "Refund will be processed within 4–5 days. Please reach out to us if not reflected") | `Payment of ₹10,000 failed` |
| **Initiated** | **Blue Avatar Bold** (~40px, white info/arrow glyph) | **Blue-600** text (e.g. "Amount will be credited to beneficiary within 2 hours") | `Payment of ₹6,10,000 initiated` |

### Status-coloured caption rule + WHY

Caption text **inherits the status colour** (amber-700 / red-600 / blue-600). Success carries no caption — the H2 title is the receipt.

❌ Anti-pattern: rendering Pending/Failed/Initiated captions in `text-secondary` slate grey to "calm it down".

Why: the status colour IS the affordance — it tells the user instantly whether the screen is OK / waiting / broken without reading the words. Greying the caption decouples explanation from status; the user has to read the text to figure out what state they're in. Colour communicates state instantly; the caption explains the state. Both should be the same colour.

Source: cal:2026-05-28 R19 — AVC `2410:22541` 6 frames (3 states × Light/Dark) all use status-coloured captions ✅

### Card chrome on status header is anti-pattern

❌ Wrapping the status title + indicator in a white card with shadow elevation.

Why: the status header is **page-level hero content**, not a card. Card chrome introduces a second container layer that competes with the Details card-section below — the eye gets confused about which surface is the "thing". Flush page-level placement + Bold Divider section break (below) is the cleanest read.

Source: cal:2026-05-28 R19 — AVC `2410:22541`, all 12 detail frames show flush page-level status header ✅

### Section stack below the status header (invariant across all 4 states)

1. (Optional Notes pill if user attached a note)
2. **Bold Divider** (8px slate-10 strip) — section grouper. **List section header is NOT used here**; Bold Divider does the work.
3. **Section title row**: `Details` H4 left + `Share` V-500 text link trailing (NOT UPPERCASE Metadata header)
4. **2-column key-value rows** — label H4 left + caption secondary value below OR right-aligned. `Transaction ID` rows carry a **copy icon trailing**.
5. **Optional Spark Offer callout** (when a successful txn unlocks a reward — see anatomy below)
6. **Optional inline map block** (when txn has location — see anatomy below)
7. **Footer row**: `Add extra notes` placeholder (slate-10 pill-style, full-width, becomes input when tapped)
8. **`Contact us` V-500 text link** centred, no button chrome — last row before gesture nav

### Spark Offer callout

Full-width pill, radius L, used when a successful txn unlocks a Spark reward.

| Property | Light mode | Dark mode |
|---|---|---|
| Fill | Valentino-50 `#FAE2FA` | Deep V-700/950 (~`#3D0540`) |
| Leading | V-500 Bold circle (~40px) + white line-icon (gamepad / joystick glyph) | Same |
| Title | H4 `Claim reward` | Same |
| Subtitle | Caption secondary `Play and win upto ₹1,000` | Same |
| Trailing | Chevron `›` — **whole row tappable** (valid chevron use per R11 — chevron OK on tap-row callouts) | Same |

**Dark-mode scoping**: brand-tinted callouts do **NOT flatten to black** in dark mode. That rule (R18) applies only to **full-bleed brand surfaces** (the entire page filled brand colour, like Payments L0). Smaller brand callouts like the Spark Offer pill flip to **deep Valentino-700/950**. Why: a brand callout's purpose is to read as a brand moment within surrounding chrome — flattening loses the signal; V-50 fill is invisible against dark page bg. Deep V-700/950 keeps brand identity readable.

Source: cal:2026-05-28 R19 — AVC Spark Offer pill light (`2410:40749`) vs dark (`2410:125949`) ✅

### Inline map block

For UPI merchant txns with registered location.

- Full-width rounded rect, radius M (~12), ~120–140px tall
- **Light mode**: light-grey street raster bg with pastel category pins (orange diamond = food, green leaf = retail, red drop-pin = location, blue square = other)
- **Dark mode**: same iconography on slate-900 / dark-grey base
- **Pin colors are iconographic, NOT status** — orange for food doesn't imply "warning"; they categorise the merchant.
- Bottom-left: small white "Open maps" pill (Radius Circle, padding 8/12) — same affordance both modes
- Map preview is **non-interactive** (decorative). Tap target = "Open maps" pill which escapes to system Maps.

### Status indicator stays coloured in dark mode

All 4 indicator colours (green / amber / red / blue) **keep their hue** in dark mode. White glyph inside stays white. The coloured circle pops against pure-black page bg. (Unlike full-bleed brand surfaces, which flatten — but small status indicators are accent elements, not page fills.)

---

## Action Centre / Notifications

Action Centre = slice's name for the notifications feed. Opens from the Profile overlay (Settings list item `Action centre`), NOT from the bottom nav.

### Recipe (top → bottom)
1. **App bar Standard** chevron-back + title `Action centre` (H3 weight on page header, NOT card titles)
2. Stack of **outline-border cards** — 12px gap between cards, 16px page padding
3. White or slate-10 page bg both valid

### Outline-border card anatomy

Calibrated 2026-05-17 review-1113. Cards use **outline-subtle border instead of shadow** — the subtle treatment de-emphasises individual items so the stack reads as a peaceful list of opportunities, not a dashboard of alerts.

| Property | Value |
|---|---|
| Border | `1px solid rgba(0,0,0,0.05)` (outline-subtle) |
| Radius | **24px (Radius/L)** — larger than the standard 16 |
| Fill | White (slate-10 page bg also acceptable) |
| Shadow | **None** — outline IS the chrome |
| Padding | `20px 20px 24px` (L-bottom) |

### Single-card layout
- **Top row**: card title **H4 (16/20 Medium)** left + small Avatar (S-32 or M-40) **top-right** corner
  - Avatar emphasis: Subtle (V-50 bg, V-500 line glyph) or CardBG (system/notification context)
- **Body**: secondary-color body text on next line(s), max ~2 lines
- **CTA (optional)**: Primary pill **bottom-left INSIDE the card** — never trailing the title, never below the card

### What Action Centre doesn't do

- ❌ **H3 title inside the card** — cards are list items in disguise; the page header is the H3 hero. Card title = **H4** (cal:2026-05-18 review-1205 "the card heading is too big")
- ❌ **Grey-fill card on white page** — outline-border or shadow elevation only, never `var(--slate-10)` fill (cal:2026-05-18 review-1205 "we don't do grey backgrounds, white on white with shadow")
- ❌ **White card on white without chrome** — bare white never works; pick outline OR shadow
- ❌ **Chevron** on the card — whole card is the tap target; no trailing affordance
- ❌ **Retry button** on Connection Lost takeover (see Empty states)
- ❌ **CTA on empty state** — see Empty states

---

## Empty states

### Empty Activity (no transactions)
1. App bar L0 — `activity` (lowercase valid on empty/illustrative states per cal:2026-05-21 r14-empty-1402) + photo Avatar trailing
2. Centred stack: real branded illustration (~120px) + H2 title + 2-line body (secondary text)
3. **Bottom-anchored Primary CTA** (e.g. "Add money")

**WHY a CTA on this empty state**: an empty Activity feed means **no money has come in or gone out yet** — the user needs a forward action. Contrast with Action Centre (read-only notifications) where empty = "all caught up", no nudge needed.

Source: cal:2026-05-21 — r14-empty-1400 pick B + user contrast reasoning ✅

### Empty Action Centre
1. App bar Standard chevron-back + `Action centre` title (H3 on page chrome)
2. Centred full-screen stack: illustration + H2 `All caught up` + 1–2 line body (secondary)
3. **NO bottom CTA.** Action centre is read-only / status-only — no nudge needed. Anything that would be a CTA belongs on the surface the notification points to.

Source: cal:2026-05-21 — r14-empty-1401 pick A + r14-empty-1400 reason ✅

### Empty Search Results (Activity search)
1. App bar L0 (`activity`) + photo Avatar trailing
2. **Search bar with search-state preserved** — shows the failed query as a value with ✕ icon inline to clear + filter icon button trailing (full L0 pattern stays)
3. Centred illustration below (small, ~100px) — real branded illustration (e.g. searching-mascot), NOT generic line-art
4. **No bottom CTA.** The clear-search affordance is in the input itself.

Source: cal:2026-05-21 — r14-empty-1402 pick A ✅

### Connection Lost
1. **Full-screen takeover** — no app bar, no nav chrome
2. Centred **sad_mascot_connection_lost** illustration (large ~160px)
3. H2 title (`Connection lost` or warmer slice copy)
4. Body (secondary): 1 line on what's happening
5. **NO retry button.** Slice auto-retries in the background; the user shouldn't have to act. When connection returns, the takeover dismisses automatically.

❌ Anti-pattern: explicit "Retry" CTA. Puts work on the user that the system handles itself.

Source: cal:2026-05-21 — r14-empty-1403 pick A + reason "we block the user and keep trying, no retry CTA" ✅

---

## Motion in Activity

### Sticky date group headers
Date group headers (`TODAY`, `YESTERDAY`, etc.) on transaction lists are **sticky** — they pin to the top of the scroll container as the list scrolls. This maintains temporal context while scrolling long lists. (Note: sticky headers are used on **detail / grouped** transaction views, NOT on Activity L0 itself, which is flat with relative-date subtitles per row.)

Source: cal:2026-05-27 — pair 1616 A ✅

### Value change (when balance updates above a list, or amount tickers)
- New value: translateY -100% → 0 + opacity 0 → 1, **240ms `out`** easing
- Old value: translateY 0 → 100% + opacity 1 → 0, 240ms `out` (same time, mask edges)

Source: `reference_motion.md` § Value change

### NO animation on filter pill taps / list navigation (high-frequency action)
Filter pills, list rows, search-result interactions are **tens-of-times-per-day** actions for power users. Any animation makes them feel slow, delayed, and disconnected from the keystroke / tap. Frequency rule: remove or drastically reduce animation on hover effects, list navigation, filter pill taps.

Source: `reference_motion.md` frequency rule (cal:2026-05-28 R19, Emil-design-eng) ✅

### Press feedback on transaction rows
160ms ease-out opacity dim (0.7 alpha) — the slice "press" feedback. **NEVER scale** the row on press (no rubber-band, no iOS bounce).

---

## Activity-relevant illustrations

From `reference_dls_illustrations.md` (R19 sweep):

| Illustration | Surface | Size |
|---|---|---|
| **grainy_gradient_tick_status_indicator** | Txn detail Success header | ~32–40px (small variant of the 120px hero) |
| **red_avatar_bold_x** (small variant) | Txn detail Failed header | ~32–40px (solid red, no grain, white X 6–8px stroke) |
| **amber_processing_ring** | Txn detail Pending header | ~32–40px (amber ring + white `!`) |
| **blue_info_initiated_ring** | Txn detail Initiated header | ~32–40px (blue fill + white info/arrow glyph) |
| **spark_lifetime_cashback_avatar** | Spark Offer callout leading | 36–40px Avatar (V-50 / cream subtle bg + spark glyph) |
| **category_dashed_placeholder_avatar** | "Add category" empty affordance on txn detail | M-40 (2px dashed stroke, transparent fill — tap-to-fill affordance) |
| **sad_mascot_connection_lost** | Connection Lost takeover | ~160px centred |

Style consistency: real branded illustrations only. Generic line-art is prototyping only. Always wrap status indicators in Avatar containers — never standalone illustration in list-leading or row-trailing positions.

---

## Calibrated history

| Round | Date | Activity-pod contribution |
|---|---|---|
| R1 | 2026-05-17 | `txn_debit_neutral_vs_red` 001 → debits text-primary (not red); `txn_date_in_subtitle` reason |
| R3 | 2026-05-17 | `compound-activity-list-header-r3-300` → list section header never after App bar (full Activity feed mockup) |
| R11 | 2026-05-17 | Activity L0 recipe canonical (App bar L0 + search + filter trailing + flat list); Action centre outline-border card; chevron OK on tap-row callouts |
| R12 | 2026-05-18 | Activity L0 8px tight gap above search; ❌ pills row under search (review-1203); Action centre card title downgrade H3→H4 (review-1205) |
| R14 | 2026-05-21 | Empty Activity has CTA / Empty Action centre no CTA / Empty Search Results no CTA / Connection Lost no retry (`r14-empty-1400` through `1403`) |
| R15 | 2026-05-21 | Avatar glyph size = size/2; unread marker = V-500 8×8 dot trailing |
| R17 | 2026-05-27 | Sticky date group headers (pair 1616); search bar resting-state (pair 1614 — icon left + left-aligned placeholder) |
| R18 | 2026-05-28 | Activity L0 reverified (canonical frame `885:20122`) — **filter button correction: white + outline-subtle + slate glyph** (NOT slate-10 + V-500); pod title capitalisation both forms valid |
| R19 | 2026-05-28 | **Transaction detail L2 4-state status header recipe** (AVC `2410:22541` 12 frames); Spark Offer callout dark-mode V-700/950 scope; status-coloured caption rule; ❌ card chrome on status header; Avatar background rules in txn context (Payment OS `1115:6700`); status indicators (4 small Avatar variants) cataloged in illustrations |

---

## Flows Activity participates in

See `reference_flows.md` for full step-by-step.

- **Search transactions** — native here (Activity L0 search bar always-visible).
- **Filter transactions** — native here (filter icon button → Action driven bottom sheet with chip picker).
- **Review a transaction** — native here (Activity L0 → tap row → Transaction detail L2 4-state status header recipe).
- **Triage notifications** (Action centre) — native here (Action centre is technically an Activity-pod surface, surfaced through Profile V3 bell).
- **Claim a reward** — Spark Offer callout in txn detail L2 → claim bottom sheet (callout pattern documented; reward claim flow lives in Explore pod).

Cross-pod handoffs:
- Activity → Payments (tap a txn row → "Pay again" option pre-fills payee + amount)
- Activity → Credit (tap a credit txn → "Split with slice in 3" option from txn detail L2)
- Profile bell → Activity Action centre (bell tap from Profile V3 routes here)
- Any pod → Activity (every transaction creates an Activity row)
