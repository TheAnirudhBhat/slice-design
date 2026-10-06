---
name: slice-design Explore pod
description: Per-pod aggregator — every rule, recipe, anti-pattern, and motion touching the Explore pod (Recharge & bills card / 2×2 small-card grid / Rewards leaderboard / Spark / Invite & earn / May Spends). Load this for any Explore-pod task.
type: reference-aggregator
---

# Explore pod

## The Explore identity

Explore is slice's discovery + earning surface. **It does not have a single hero card.** The structure IS the grid: a Recharge & bills white card up top + a 2×2 small-card grid below. That's the L0. The pod's job is to surface earning hooks (Rewards / Spark / Invite) and utility shortcuts (Recharge, Credit score, Autopay) — not to push one product.

Visual signature: card-grid heavy, mixed-content tiles, pink + V-500 brand accents (Rewards leaderboard pink gradient, slice-fire V-500), playful illustrations bleeding off card edges. No big balance. No section headers. No flat lists.

## In scope
- Explore L0 anatomy (App bar L0 + Recharge & bills card + 2×2 mixed-content grid)
- Recharge & bills card (header + V-500 ₹0 FEE pill + 4-up icon grid + dashed divider + reward row)
- 2×2 small-card grid (PLAY & WIN / MAY SPENDS / INVITE / CREDIT SCORE / AUTOPAY mix)
- Rewards leaderboard pink → coral gradient + Empty Rewards recipe
- Spark hero reveal motion choreography
- slice fire — Valentino purple identity (not orange/yellow)
- Invite & earn surface treatment
- May Spends stats viz patterns
- Reward-row whole-row tap-target pattern

## Out of scope (see)
- Banking pod (Savings card / FD / Atom) → `reference_pod_banking.md`
- Payments dialer / brand-immersive V-500 → `reference_pod_payments.md`
- Credit pod (spends summary / super card) → `reference_pod_credit.md`
- Activity pod (search + transaction list) → `reference_pod_activity.md`
- Hard rules (palette / typography / brand voice) → `reference_pod_cross_cutting.md`

---

## Explore L0 — pod home

```
App bar L0 — "Explore" left + photo Avatar trailing
│
├── White card — Recharge & bills (page padding 24, card padding 20)
│     ├── Header: H4 "Recharge & bills" + solid V-500 "₹0 FEE" pill UPPERCASE
│     ├── 4-up icon grid (Card / Electricity / Prepaid / More)
│     ├── Dashed full-bleed divider
│     └── Reward row — Avatar slate-100 + "Get assured ₹10" H4 + caption + chevron ›
│
├── 2×2 small-card grid (gap 12px, mixed content):
│     ├── PLAY & WIN / Rewards     │ MAY SPENDS / ₹12,487
│     │  + V-500 sparkle           │ + V-500→pink pie illus.
│     ├── INVITE / Earn ₹150       │ CREDIT SCORE / 785
│        + pink hook-magnet        │ (value-only, no illus.)
│
└── Floating bottom dock (Explore icon active)
```

### App bar L0
- Pod title "Explore" left (capitalized — R18 canonical)
- Photo Avatar trailing only (no eye icon, no utility icon — Explore has no balance to hide)
- NO leading icon (anti-pattern: that's App bar Standard chrome for L1+)

### Hero — Recharge & bills white card
See "Recharge & bills card" below for full anatomy. Sits as the first content row beneath the App bar — it IS the content between App bar and the 2×2 grid (no list section header allowed in that gap, anti-pattern).

### 2×2 small-card grid (mixed content)
Four tiles in a 2×2 grid, 12px gap. Each tile is roughly square. Each carries an UPPERCASE Metadata category label + H4 value + (optional) trailing-bleed illustration.

| Tile | Content | Illustration |
|---|---|---|
| **PLAY & WIN / Rewards** | category label + "Rewards" H4 | V-500 Spark sparkle bottom-right |
| **MAY SPENDS / ₹12,487** | category label + amount H4 | V-500 → pink pie chart bottom-right |
| **INVITE / Earn ₹150** | category label + "Earn ₹150" H4 | Pink hook-magnet bottom-right |
| **CREDIT SCORE / 785** | category label + score H4 | NONE (value-only tile) |
| **AUTOPAY** | category label + status H4 | Optional |

Variant: card can stack as `Big Recharge card + 2×2 grid` OR `2×2 grid only`. Banking-style hero card NOT used.

### What Explore L0 doesn't do
- **No big balance hero card.** Unlike Banking, Explore doesn't show a calculated single number at the top. The Recharge card + grid IS the structure.
- **No List or Bold section header between card clusters.** Cards carry their own H4 titles — that's the section label (anti-pattern: `EXPLORE MORE` UPPERCASE List header between Recharge card and grid).
- **No `View all` CTA on grid tiles.** Each tile is whole-row tappable.
- **No quick-action V-500 fill avatar tiles** on the Recharge 4-up grid (that's the action-tile pattern leaking into content-grid — see "Reward row" for the correct icon-grid treatment).

Source: cal:2026-05-28 R18 — Explore L0 reference frame `885:19759` ✅

---

## Recharge & bills card

The signature Explore surface. White card on white page (shadow elevation), page padding 24, card internal padding 20.

### Full anatomy

```
┌────────────────────────────────────────────────┐
│  Recharge & bills            [₹0 FEE]          │  ← H4 left + solid V-500 pill trailing
│                                                │
│   ⊙       ⊙        ⊙        ⊙                  │  ← 4-up icon grid
│  Card  Electricity Prepaid  More               │     subtle-outline circles + SLATE glyphs
│                                                │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─    │  ← dashed full-bleed divider
│                                                │
│  ⊕  Get assured ₹10              ›             │  ← reward row, whole-row tap
│     Reward on 1st bill payment                 │
└────────────────────────────────────────────────┘
```

### Card header rule (recap from `reference_dls_cards.md`)
- **NO leading icon** on the title (card's own framing is identity enough)
- **NO hairline/divider below** the title (card border already separates)
- H4 title (16px Medium, 0.32px tracking)

### Solid-fill pill rule — ₹0 FEE Valentino
The trailing "₹0 FEE" pill on the Recharge card header is a **solid V-500 fill pill UPPERCASE, white text** (DLS Tag Bold · Brand; Metadata weight, ~10pt). NOT Blue-500, NOT a subtle-bg pill. V-500 is the same in light and dark.
Source: cal:2026-10-06 (user, birthday-spark review: "Tag should be Valentino color and not this blue") — supersedes the R18 Blue-500 rule read off `885:19759`.

### 4-up icon grid (Card / Electricity / Prepaid / More)
Critical anatomy — easy to get wrong:
- **White-fill circles** (subtle-outline border, ~48×48), NOT V-500 fill, NOT slate-10 fill
- **Slate-glyph line icons inside** (NOT V-500 glyphs — that's the action-tile pattern from Payments)
- Caption secondary labels below each tile, all on **same line count** (anti-pattern: if `View more` wraps to 1 line, every label sits on 1 line — no truncation, no ellipsis)
- 4-up horizontal layout fills card width, even gaps

Why slate glyphs not V-500: the Recharge tiles are **content-grid tiles** (browse / navigate to a section), not action tiles (quick-action send/receive/scan from Banking or Payments). Content-grid → slate. Action-tile → V-500.

### Dashed divider full-bleed within card
Hairline dashed line spanning the card's internal width (between the icon grid and the reward row). Not a Big divider (8px slate-10 strip — that's an L1-screen pattern). Dashed signals "soft separator within a contained surface."

### Reward row pattern (whole-row tap target)
The bottom row of the Recharge card is a **reward strip** with chevron `›` — one of the **valid chevron uses** in slice.

- Leading: Avatar M-40 **slate-100 fill** + line-icon (not V-500, not subtle-bg)
- Title H4 left: e.g. "Get assured ₹10"
- Subtitle Caption secondary below: e.g. "Reward on 1st bill payment"
- Trailing: chevron `›`
- **The whole row is tappable** — chevron is the affordance signal, not a separate tap target

Valid chevron use: tap-the-whole-row callouts (Reward strip in Recharge card, Claim reward Spark Offer pill on txn detail, Action centre rows). Invalid chevron use: rows that already have a button / switch, column headers, repeated rows of the same type.

Source: cal:2026-05-17 — `reward_strip_composition` pairs 101 + 101b + `chevron_in_non_nav` pair 203 ✅ + cal:2026-05-28 R18 Explore L0 canonical (`885:19759`) ✅

---

## Rewards

Rewards is its own L1 surface accessed from the **PLAY & WIN / Rewards** tile in the Explore 2×2 grid.

### Trailing slice-currency pill on Rewards L0
The Rewards L0 App bar Standard carries a special trailing slot: a **slice-currency pill** showing accumulated currency balance.
- Anatomy: `[V-500 Bold avatar 24×24 ₹-glyph] [amount value text]` — single Radius/Circle pill with outline-subtle border
- The Avatar / ₹-glyph sits **inside the pill at the leading edge**, NOT as a separate floating badge next to a value pill (anti-pattern: cal:2026-05-18 review-1202)

### Pink → coral 2-stop brand-rewards gradient (only sanctioned gradient on Rewards)
The Rewards leaderboard hero card uses the **only sanctioned Rewards-pod gradient**: pink → coral (2-stop, Valentino-pink family). Full-width, Radius/L.

- Card content: "Leading this week: <name>" + amount + leader photo Avatar trailing
- This is the **second sanctioned 2-stop gradient** in slice (the first being Payments brand gradient Valentino → Blue for full-bleed L0)
- Anti-pattern: multi-stop / rainbow gradients (>2 stops). No pink → orange → yellow rainbow strips, no extra colour interpolation.

### Empty Rewards screen recipe
1. **App bar Standard** — chevron back + "Rewards" title + trailing utility (bulb / tip icon) + **trailing slice-currency pill** showing balance
2. **Pink → coral 2-stop gradient hero card** (leaderboard) — full-width, Radius L: "Leading this week: <name>" + amount + leader Avatar
3. Section header `Fires (0)` — H4 weight, left-aligned, NO trailing CTA (no "View all", no chevron)
4. **Real slice illustration: asteroid + diamonds** (`asteroid_diamonds_empty_rewards`) centred ~120px below header — NOT a generic line icon, NOT a placeholder SVG
5. **NO bottom CTA.** The leaderboard banner IS the call-to-action. Adding a Primary "Earn fires" button competes with the gradient hero.

Source: cal:2026-05-17 — review-1102 reference frame ✅

### Spark — Fires count
"Fires" is slice's reward currency unit (a Spark unlock = N fires earned). It appears on Rewards L0 as the **section header `Fires (N)`** under the leaderboard. On the Payments L0 action-pill row, fires balance can appear as `[fire icon] 8 fires left` pill (translucent white on V-500, see `reference_pod_payments.md`).

### What Rewards never does
- ❌ **Invite & earn surfaced inside Rewards** — Invite is a share affordance, not an unlocked reward. Lives in footer / 2×2 grid / Profile, never in the Rewards stack.
- ❌ Cashback on subtle-bg / brand-50 bg (cashback strip = white card with Card elevation, never V-50 banner)
- ❌ Generic line-art for empty state — only the asteroid + diamonds branded illustration

---

## Spark hero reveal motion

**The most important Explore-related motion.** Validated 2026-05-17 in explore-base. Use when a card has a quiet anchor state that should resolve into a richer state (savings hook → live drops, balance hook → reward unlock, Spark tile teaser → Fires reveal).

### Choreography (anchor → reveal)
- **t = 0** — Initial state visible (static icon + anchor copy)
- **t ≈ 1.6s** — Icon does a short **bling twitch**: scale + wiggle, **640ms `spring-soft`** (`cubic-bezier(0.34, 1.56, 0.64, 1)`)
- **t ≈ 1.8s** — Title **pushes up** from below into new copy: translateY 100% → 0%, **520ms `out`**, edges masked top/bottom 22%/78% for fade-on-cross
- **t ≈ 2.1s** — Icon rotates 360° + scales to 0 + opacity fades; **brand pills cascade in** from the same anchor with right→left stagger (30–80ms per pill)

### When to use
- Spark hero card teaser → live-drops reveal
- Anchor-card → reward-unlocked moment
- Brand-pill cascade post-BE response (e.g. Payments L0 action pills, but the choreography pattern itself originates from Spark)

### When NOT to use
- Routine state changes / filter toggles (too much motion for a casual interaction)
- Repeated actions (high-frequency rule — animations on 100+/day actions feel slow)
- Anywhere without a "moment" justifying the choreography

Source: mem:feedback_spark_reveal_choreography ✅ + see `reference_motion.md` for the full motion vocabulary

---

## Invite & earn

### Surface treatment
- **Illustration**: `invite_earn_hook_magnet` — pink hook + magnet motif with gradient texture
- Pink (Valentino-pink family) signals "share / earn through others"
- Sized ~80px trailing-bleed on L0 small tile; larger (~120px) on Profile

### Where it appears
| Surface | Treatment |
|---|---|
| **Explore L0 — 2×2 grid INVITE tile** | "INVITE / Earn ₹150" H4 + pink hook-magnet bottom-right bleed |
| **Profile overlay** | Full-width Primary `Invite & earn ₹150` mid-screen below name/phone block (NOT bottom-anchored; Profile is overlay-style) |
| **Payment OS — nudge column** | INVITE & EARN nudge as a post-payment reward column (Payment OS 26 file `4935:26794`) |

### Where it doesn't appear
- ❌ **Inside Rewards** — Invite is share, not earned reward (anti-pattern, cal explore-base f50ca71)
- ❌ Banking L0 (Banking shows Savings + FD + Atom, not Invite)
- ❌ As a standalone large hero card on L0 — always a tile / nudge / overlay CTA

---

## May Spends

The MAY SPENDS tile in the 2×2 grid links to a stats viz surface (May Spends detail). Stats viz pattern is heavily calibrated.

### Stats viz rules
- **Spends-only sparkline + avg pill** — no cashback, no interest, no rewards mixing
- The chart answers ONE question (spends trend over time). Mixing cashback/interest muddies the question.
- **No month chips + per-point amounts + insight row** stacked together — the curve already tells the trend
- Avg pill = one secondary signal; everything else is noise

### Full anti-pattern recap
- ❌ Sparkline overlaying cashback earned + interest gained + outgoing spends on one axis
- ❌ Curve + month chips at bottom + tooltip on every point + "insight row" copy describing the trend (three overlapping channels for one signal)
- ❌ Drop point amounts + month labels — keep visual curve + pulse marker + avg pill

Source: explore-base 8da51e7, e12e08c, 4f5bef5 ✅

### Illustration
The MAY SPENDS tile carries the **`may_spends_pie`** illustration — V-500 → pink pie chart motif, ~80px trailing-bleed.

---

## slice fire — Valentino purple (not orange)

**Central brand identity for "hot / winning" in Explore.**

slice fire ≠ orange/yellow flame. slice fire = **Valentino-500 (`#D30AD7`)**, full stop.

### Why this matters
The Explore pod is where fire/spark/rewards/winning states live most densely. Every "hot deal", "fire-mode payment", "trending offer" temptation to render with orange/red flame iconography must be redirected to Valentino purple.

User explicitly rejected orange/yellow as "horrible" — the base proto had its orange flame assets ripped out and replaced with V-500.

### Allowed treatments
- Valentino-500 (`#D30AD7`) on white — solid V-500 fire glyph / V-500 text
- Valentino-Subtle bg (`#FAE2FA`) with V-500 text — subtle brand callout
- Brand gradient (`#D30AD7 → #2B6ACF`) — only on Payments L0 full-bleed (not Explore)
- Pink → coral 2-stop — only on Rewards leaderboard hero card

### Banned treatments
- ❌ 🔥 emoji in orange (or any emoji — slice line icons only)
- ❌ Gradient orange flames, gold trophy glows on "hot deal"
- ❌ Custom violet-pinks like `#C200FF`, `#E040FF` — use the Valentino scale (50/400/500/600/700/950) only
- ❌ Multi-stop rainbow gradients on Fire cards

Source: slice-dls L356, mem:project_explore_base, cal:2026-05-17 pair 301 (clean FireCard re-pair) ✅

---

## Explore-relevant illustrations

| Illustration | Surface | Size | Style |
|---|---|---|---|
| **`invite_earn_hook_magnet`** | INVITE tile (Explore L0), Profile, Payment OS nudge | ~80px tile / ~120px Profile | Pink hook+magnet gradient |
| **Spark sparkle (V-500)** | PLAY & WIN / Rewards tile | ~80px trailing-bleed | V-500 sparkle glyph |
| **`asteroid_diamonds_empty_rewards`** | Empty Rewards screen (centred below leaderboard) | ~120px | Branded asteroid + diamonds |
| **`may_spends_pie`** | MAY SPENDS tile | ~80px trailing-bleed | V-500 → pink pie motif |

Anti-patterns:
- ❌ Generic line-art for empty Rewards (must be the asteroid+diamonds illustration)
- ❌ Standalone illustration in list-leading position (wrap in Avatar container)
- ❌ Generated / AI-imagined illustrations — ask user if asset missing, never substitute

---

## Reward row tap-target pattern

The Recharge card's reward row (bottom strip with chevron) is the **canonical "tap-the-whole-row callout" pattern**. Reusable across slice — one of the few valid chevron uses.

### Anatomy
- Leading **Avatar** (slate-100 bg + line icon, ~40px) — NOT V-500 Bold (that's the in-card callout colour-coded variant for Credit pod)
- Title **H4** + Caption secondary subtitle stacked
- Trailing **chevron `›`**
- **Whole row tappable** — chevron is the affordance signal

### Where this pattern appears
| Surface | Use |
|---|---|
| Recharge & bills card — reward row | "Get assured ₹10 / Reward on 1st bill payment" |
| Transaction detail — Spark Offer callout | V-50 bg + V-500 Bold gamepad Avatar + "Claim reward / Play and win upto ₹1,000" |
| Action centre — notification cards | Title H3 + body + optional Primary inside card (different anatomy — H3 not H4, no chevron) |
| Credit L0 — in-card subtle callout | Blue-50 / V-50 / Green-50 / Slate-10 bg variants, V-500/Blue-500/Green-500 Bold Avatar |

### Where chevron is INVALID
- Rows that already have a CTA / button / switch (redundant)
- Column headers (chevron is for back-nav or tap-row callouts only)
- Repeated rows of the same content type (use no chevron + 12px gap separation)
- Section headers on lists (use Bold or List header — no chevron for collapse on L0)

Source: cal:2026-05-17 — `chevron_in_non_nav` pair 203 ✅

---

## Calibrated history (Explore-relevant rounds)

| Round | Surface | Calibration |
|---|---|---|
| **R11 (cal:2026-05-17)** | Empty Rewards | Leaderboard gradient + asteroid+diamonds illustration + trailing slice-currency pill + no bottom CTA — `review-1102` reference frame ✅ |
| **R11 (cal:2026-05-17)** | Reward row composition | Whole-row tap target with chevron — `reward_strip_composition` pairs 101 + 101b ✅ |
| **R11 (cal:2026-05-17)** | Chevron in non-nav | Chevron OK on tap-row callouts; invalid elsewhere — `chevron_in_non_nav` pair 203 ✅ |
| **R11 (cal:2026-05-17)** | Cashback white card | Cashback strip = white card + Card elevation, NOT V-50 subtle-bg banner — `cashback_white_card` pair 205 ✅ |
| **R11 (cal:2026-05-17)** | Fire = V-500 | Clean FireCard re-pair — pair 301: no orange/yellow ✅ |
| **R11 (cal:2026-05-17)** | Quick-action icon grid uniform labels | All labels same line count, no truncation — pair 403 ✅ |
| **R12 (cal:2026-05-18)** | slice-currency pill | Avatar inside pill at leading edge, NOT separate floating badge — `review-1202` ✅ |
| **R17 (explore-base)** | Stats viz simplification | Spends-only, drop month chips + insight row + point amounts — commits 8da51e7, e12e08c, 4f5bef5 ✅ |
| **R17 (explore-base)** | Invite out of Rewards | Spark + Fire + Monies = Rewards; Invite lives in footer / tile — commit f50ca71 ✅ |
| **R17 (explore-base)** | History off Bills | No "View history" CTA on bills section — commit a6808af ✅ |
| **R18 (cal:2026-05-28)** | Explore L0 sweep | Canonical L0 reference frame `885:19759`: App bar L0 + Recharge card + 2×2 grid; no hero card, no section headers between clusters ✅ |
| **R18 (cal:2026-05-28)** | No section header between L0 cards | Banking + Explore + Credit all card-stacked with NO intermediate headers ✅ |
| **R18 (cal:2026-05-28)** | Pod title capitalisation | "Explore" capitalized on App bar L0 (R14 lowercase rule overridden by canonical) ✅ |

---

## Flows Explore participates in

See `reference_flows.md` for full step-by-step.

- **Recharge & pay bills** — entry to Bills sub-pod (Explore L0 Recharge & bills card → Bills L1 → My bills L2). Bills sub-pod owns the recipe; Explore is the entry point.
- **Earn fires** (Spark) — passive, fires on qualifying payments. Surfaces in Explore L0 PLAY & WIN tile.
- **Claim a reward** (Spark Offer) — entry from txn detail L2 callout, but Spark gamified surfaces live in Explore.
- **Invite & earn** — entry from Explore L0 INVITE tile (multiple entry points across surfaces — Profile V3 action tile is the canonical home; Explore tile is a secondary trigger).
- **Check credit score** — native here (Explore L0 CREDIT SCORE tile).

Cross-pod handoffs:
- Explore → Bills (Recharge & bills card tap)
- Explore → Payments (Spark hero reveal motion fires inside payment confirmation; Explore tiles may route to Payments for the action)
- Explore → Profile (Invite & earn tile in Explore is a shortcut to Profile's native Invite action)
