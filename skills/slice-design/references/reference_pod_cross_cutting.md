---
name: slice-design cross-cutting rules
description: Per-pod aggregator — HARD rules that apply across every pod. Brand voice, palette, Rubik, anti-patterns, slice-slop test, working modes, motion + accessibility + performance + craft principles. Load this for any task that ISN'T pod-specific (judging a frame, brand voice questions, general slice questions).
type: reference-aggregator
---

# Cross-cutting rules — what makes any slice screen slice

These rules apply regardless of pod. They're the HARD rules — slice doesn't compromise on these even in exploration mode. The source-of-truth refs (`reference_anti_patterns.md`, `reference_dls_colors.md`, `reference_motion.md`, etc.) stay authoritative; this file is the daily reference for `judge` / `audit` / brand-voice tasks where you need all the hard rules visible at once.

**Synthesizes**: `SKILL.md` (Defaults, Absolute bans, slice-slop test, Working modes) + `reference_anti_patterns.md` + `reference_dls_colors.md` + `reference_dls_spacing.md` + `reference_dls_corner_radius.md` + `reference_dls_elevation.md` + `reference_dls_iconography.md` + `reference_motion.md` + `reference_accessibility.md` + `reference_performance.md` + `reference_craft_principles.md` + `feedback_assets.md` + `reference_calibrated_digest.md`.

---

## Working modes (recap from SKILL.md)

Three registers govern every slice design decision:

- **HARD rules** — never violate. Brand voice (lowercase "slice"), V-500 + sanctioned palette, Rubik only, no emoji, calibrated absolute bans. Use these even in exploration mode. Break them and the work stops being slice.
- **SOFT rules** — defaults that can be remixed. Screen recipes, component compositions, motion choices, specific layout patterns. Use the calibrated default unless the brief warrants a deviation.
- **EXPLORATION** — actively encouraged when there's a reason. Keep HARD rules locked. Propose alternatives to soft rules with reasoning.

When judging existing work, hard rules are absolute; soft rules become "this deviates from default for [reason]" findings, not violations.

---

## HARD rules — never violate

### Brand voice (from SKILL.md Defaults + reference_anti_patterns.md § Brand and copy)

- **Lowercase "slice"** always — never "Slice", "SLICE", or "Slice UPI", even sentence-initial. This is core to brand identity.
- **Short, friendly, simple copy.** No corporate filler. No "Submit", "NEXT", "OK", "CONTINUE", "Proceed" as CTAs.
- **Verb-led CTAs with value** — "Pay ₹500", "Add money", "Verify", "Get card". Verb-first, 1–2 words, sentence case.
- **No emoji in shipped UI** — neither in Avatar glyphs, button labels, list rows, nor illustration roles. Slice line icons only. Emoji render differently per OS, breaks brand consistency.
- **Indian number grouping**: `₹1,00,000` not `₹100,000`. `₹1,00,00,000` not `₹10,000,000`. ₹ symbol touches the digit — no space (`₹500` not `₹ 500`).
- **Date format in cards**: `20 Nov '25` Caption style, not "20th November, 2025".
- **No decimals on amounts where unnecessary**: `₹482` not `₹482.00`.
- **Account masking**: last 4 digits only (`xx1234`); never full mask (`XXXX XXXX XXXX XXXX`).
- **Pod title casing**: BOTH `Capitalised` and `lowercase` valid (cal:2026-05-28 R18 override of R14). Capitalised dominates on filled L0s (`Banking`, `Explore`, `Credit`, `Activity`); lowercase valid on empty/illustrative states. The lowercase rule on the **slice word itself** still stands.

### Palette (from reference_dls_colors.md + reference_anti_patterns.md § Colour)

**Valentino (brand purple) primitives**:
- V-50: `#FAE2FA` (subtle-bg banners only)
- V-400: `#DE45E1`
- V-500: `#D30AD7` ← **the slice brand color**
- V-600: `#A008A3` (pressed)
- V-700: `#87068A` (dark-mode brand callouts)
- V-950: `#260227` (dark-mode brand callouts)

**Slate (neutral)**: 10 / 30 / 50 / 100 / 400 / 500 / 600 / 700 / 800 / 900 / 950. Slate-10 (`#F6F9FC`) = List section header bg ONLY (and now-banned as page bg).

**Status palette**: Blue-500 `#2B6ACF` (info), Green-500 `#00A63E` (positive), Red-500 `#CE1D26` (negative), Orange-500 `#FF9A17` (warning).

**Sanctioned gradients — 2-stop only**:
- **Brand gradient**: V-500 `#D30AD7` → Blue-500 `#2B6ACF`, left→right linear. Used on Payments-related hero surfaces. Not on small cards.
- **Rewards leaderboard gradient**: Valentino-pink → coral. Sanctioned for that specific hero banner only.

**Banned colors / patterns**:
- ❌ Rainbow / multi-stop gradients (>2 stops)
- ❌ Inventing new purples (`#C200FF`, `#E040FF`, `--brand-purple-2`) — V-50/400/500/600/700/950 only
- ❌ Fire / hot / winning state in orange or yellow — slice fire is V-500 (user explicitly: "orange/yellow horrible")
- ❌ Red-fill Primary button for destructive — use dialog with neutral Primary OR Tertiary with red text
- ❌ Neon glows, drop shadows on text, outer glows — use DLS elevation tokens only (5% black opacity)
- ❌ Grey/secondary background on page surfaces — slice is "white on white" + shadow-elevated cards
- ❌ Cashback on subtle-bg (V-50, blue-50, etc.) — banners only; cashback is a white card

**Color usage rules**:
- V-500 reserved for actions the user is meant to take (CTAs, brand callouts, action-tile glyphs)
- Trailing utility icons (App bar): **Text Primary `rgba(0,0,0,0.9)`** neutral — not V-500 (cal:2026-05-21 R15)
- Icons on brand gradient: **subtle V-50 white** `rgba(250,226,250,0.85)` — not pure `#FFFFFF` (cal:2026-05-21 R15)
- Status caption on txn detail: caption text inherits status color (amber-700 / red-600 / blue-600), never greyed (cal:2026-05-28 R19)

### Typography (from reference_anti_patterns.md § Typography)

- **Rubik only**, 2 weights: **Regular (400)** + **Medium (500)**. Never Inter, SF Pro, Roboto, system-ui. Never Bold (700+), never Light (300).
- **Type scale** (from calibrated_digest):
  - Display/Small 48 (hero amount)
  - H2 24/Medium
  - H3 20/Medium
  - H4 16/Medium (card titles)
  - Body 16/Regular
  - Caption 12/Regular
  - Metadata 10/Regular UPPERCASE — **only uppercase type allowed**
- **Sentence case** for everything except Metadata.
- **Left-align body text in cards** — centering only on confirmation/celebration single-line.
- **Never mix case styles** in a single screen (ALL CAPS section header next to sentence-case header).
- **Action centre / notification card title** = H4 (16/20 Medium), not H3 — they're list items in disguise (cal:2026-05-18 R12).

### Iconography (from reference_dls_iconography.md)

- **Slice line icons only**, never emoji as glyph or CTA leading.
- **Grid**: 56×56 container, 24×24 glyph centered (16px inset).
- **Naming**: `Category/Name` with variant suffixes (Style, Type, Direction, Orientation, Stroke).
- **Avatar inner glyph** = `size / 2` (M-40 → 20pt, S-32 → 16pt). Reconfirmed R15.
- **15 categories, ~236+ icons** across General, Interface, Objects, Money, Documents, Time, Shopping, Status, Devices, Cashback, Products, Buildings, Profile, Cards, Messaging.

**⚠️ Local icon files currently missing on disk** (R19 finding 2026-05-28): the `slice-design-suite/icons/` directory does NOT exist. For code/proto work, pull SVG from Figma directly or ask the user. Never fabricate.

**Highest-stakes anti-pattern**: ❌ **Never generate icon SVGs ad-hoc** — wrong proportions, inconsistent stroke widths, off-grid paths, AI-slop. Use a placeholder + comment (`<!-- ICON-MISSING: ... -->`) instead. Never `figma.createVector()` to fake a missing icon. Never import Lucide/Heroicons/Tabler/Feather/Phosphor.

**State-specific icon variants** (cal:2026-05-21 R15): when DLS provides per-state variants (Phone/Missed vs Outgoing vs Incoming, Eye/Open vs Closed, Mic/Default vs Mute), USE the variant matching the row state. The variant carries semantic weight text alone can't.

**Outline vs Solid** (cal:2026-05-21 R15): both valid. Default mapping: Outline for utility/secondary (App bar trailing, settings rows); Solid for primary/active (selected pill, active tab, hero CTA leading). Context decides.

### Spacing (from reference_dls_spacing.md)

| Token | Value | Common usage |
|-------|-------|--------------|
| 3XS | 2px | — |
| 2XS | 4px | — |
| XS | 8px | App bar vertical, element gaps |
| S | 12px | App bar horizontal standard, list internal gaps |
| M | 16px | L0 card stack gap, bottom sheet vertical |
| L | 24px | **Page horizontal padding, card internal padding, form stack** |
| XL | 32px | — |
| 2XL | 40px | — |
| 3XL | 48px | — |
| 4XL | 64px | — |

**Hard rhythm rules**:
- Page horizontal padding: **24px (L)** — cards inset, never full-bleed
- Card internal padding: **24px (L)**
- L0 card stack gap: **16px** — never 0-gap (only flat list components stack at 0)
- Form input stack: **24px (L)**
- List item internal gap (leading→content): **12px**

### Corner radius (from reference_dls_corner_radius.md)

| Token | Value | Usage |
|-------|-------|-------|
| S | 8px | Chips, tags, tooltips |
| M | 16px | Cards, banners, bottom sheet top corners |
| L | 24px | Large containers |
| Circle | 100px | Buttons (pill), avatars, circular elements |

Corner smoothing: 60% default (100% if platform supports).

### Elevation (from reference_dls_elevation.md)

Shadow color: `rgba(0,0,0,0.05)` — 5% black, nothing more.

- **Card** — `0px 2px 32px 0px rgba(0,0,0,0.05)` — diffuse ambient. Product cards, goal cards, any floating card.
- **Above** — `0px -6px 8px 0px rgba(0,0,0,0.05)` — upward. Fixed bottom (footer, button group, chat input).
- **Below** — `0px 6px 8px 0px rgba(0,0,0,0.05)` — downward. Fixed top (app bar on scroll).

**Calibrated rule**: fixed bottom CTA bar uses shadow (`elevation.above`) NOT a 1px hairline — but only when there's scrollable content beneath (cal:2026-05-28).

### Cards (from anti-patterns + calibrated_digest)

- **Card chrome must exist**: outline-subtle border (Action centre quiet variant) OR Card elevation shadow (default). White card on white bg without either = bare/broken (cal:2026-05-18 R12).
- **Sizes**: Large 312×160, Medium 148×148, Small 148×66.
- **In-card header rules** (live in `reference_dls_cards.md`): no leading icon, no hairline below title — cards are clean inside.
- **Title alignment**: left when inside a card; centred when at top of page (hero context).
- **Page-edge full-bleed**: ❌ never — 24px page padding always.
- **0-gap L0 card stacks**: ❌ never — 16px gap.
- **Grey-fill card on white**: ❌ never — white card + outline-subtle (Action centre) OR white + shadow (everywhere else).

### Section headers (from anti-patterns + calibrated_digest)

- **List variant**: grey-10 bg (`#F6F9FC`), Metadata UPPERCASE, 8/24 padding. Stands alone.
- **Bold variant**: transparent bg, H4, 24/24/12 padding. Must be preceded by Divider/Big.
- **NEVER mix Bold + List on the same screen** — pick one (cal source: slice-dls L270, L317).
- **List header must not directly follow App bar** — needs a content row (Top header, Balance hero, etc.) between. Grey List-header bg touching App bar reads as malformed second nav (cal:2026-05-17).
- **Bold + CTA variant**: text CTA (V-500 buttonSmall), never chevron — middle space flexes.
- **L0 surfaces**: NO section headers between cards. Cards self-structure (cal:2026-05-28 R18, 3 pods confirmed).
- **Settings groups**: List section header (NOT iOS-style rounded cards on grey).

### Chevron (from anti-patterns + calibrated_digest, multiple rounds)

- ✅ **Left chevron `‹`** = back navigation always (not arrow `←`)
- ✅ **Right chevron `›`** valid on:
  - Tap-the-whole-row callout rows ("Get assured ₹10" full-row tap)
  - Collapsible section headers (Bold + chevron variant; rotates 180° on expand — R19 invert/clarify)
- ❌ **Right chevron `›` BANNED on**:
  - Column headers
  - Rows that already carry a CTA / switch / button
  - Reward / info / list-style rows where row itself is tappable
  - Confirmation screen back-navigation (use X close, not chevron)

### Avatar (from calibrated_digest)

- **Sizes**: S-32, M-40, L-48, XL-64, XXL-80, XXXL-128
- **Inner glyph** = `size / 2`, **slice line icon only**, never emoji
- **Emphasis** default = **Subtle** (V-50 bg + V-500 glyph) OR **White** (pure white + outline-subtle). **Never Bold** (V-500 bg) as the default across a list — Bold reserved for emphasis.
- **Status indicator** = small corner dot (12×12, white border). Never a ring.
- **Group avatars** = overlapping stack, 2px white borders.
- **Dense rows** (settings, contacts) → S-32. Default list → M-40.
- **In list-leading position**: use Avatar container even when illustration involved — softened from R2 (preference not anti-pattern), but Avatar still default.
- ❌ **Avatar for quick-action icon tiles** — those are icon-boxes (white + outline-subtle circle + V-500 glyph), not identity Avatars.

---

## slice-slop test (from SKILL.md)

If someone could look at a screen and say "AI made this slice mockup" without doubt, it's failed. Run before declaring done:

- ❌ Anything from the Absolute bans list below
- ❌ Generic capitalised "Slice" branding
- ❌ Section-header inconsistencies (mixed Bold + List on same screen)
- ❌ Cards without shadow chrome AND without outline-border chrome (one or the other required)
- ❌ Quick-action tiles with V-500 fill avatars on a content-grid card (action-tile pattern leaking into content-grid)
- ❌ Confirmation screen with chevron back instead of X close
- ❌ Payment-to-person screen on white (brand-immersive V-500 IS the screen for known UPI ID payee)
- ❌ "+₹X" notation on credit-amount row
- ❌ Search bar with filter icon trailing on a screen that's NOT Activity L0
- ❌ Emoji in any production surface

---

## Absolute bans (calibrated — match and refuse)

If you're about to write any of these in slice UI, rewrite. These were tested and rejected:

- **Capital-S "Slice"** — always lowercase
- **Emoji as Avatar glyph or CTA leading-icon slot** — slice line icons only
- **Red-fill Primary button** for destructive — use dialog + neutral Primary OR Tertiary with red text
- **Right-chevron `›` in non-row contexts** (column headers, rows with their own CTA/switch). Valid: whole-row callouts + collapsible section headers (R19)
- **Arrow + sign together on trend deltas** (`↑ +12%`) — arrow alone preferred
- **`+` prefix on credit / received amounts** — Positive Green color alone, no `+`
- **Rainbow / multi-stop gradients (>2 stops)** — brand gradient (V → Blue) + leaderboard gradient (pink → coral) are the only sanctioned 2-stop
- **Fire / hot / winning in orange or yellow** — V-500 always
- **Cashback on subtle-bg** — white card only
- **List section header directly after App bar** — needs content row between
- **In-card header with leading icon or hairline below** — cards clean inside
- **Centred body text on cards** — left-aligned only
- **Page-edge full-bleed cards** — 24px always
- **Standalone illustration in list-leading position** — use Avatar container (preference, R2)
- **Avatar component for quick-action icon tiles** — use white + outline-subtle + V-500 glyph (action tiles) or slate (content-grid)
- **Generic line-art illustration in empty / confirmation states** — slice ships real branded illustrations
- **Avatar with `✓` glyph as confirmation indicator** — use textured grainy gradient tick (~120px), 8px stroke
- **Week-summary hero block on Activity L0** — L0 is search + filter + flat list
- **Cancel button on bottom sheet** — sheet dismisses via scrim tap; sheet carries Primary only
- **Bottom sheet drag-handle / hairline pill** — slice has NO handle (cal:2026-05-18 R12 reconfirmed)
- **Confirm payment bottom sheet** — confirmation lives on full screen or inline review row, not a dismissable sheet
- **Banking home as separate L0** — Banking home IS the Savings/Balance L1
- **Coloured-card hero on Credit L0** — Credit L0 is a white L0 Large card
- **Brand-gradient "Pay anyone" banner as Payments L0 hero** — Payments L0 is full-bleed V-500 dialer takeover (solid V-500, not gradient)
- **Tabs as nav/filter pattern** — use Pills (segmented control). DLS molecule named "Tabs" exists but IS slice's pill segmented control (R19 clarification — the iOS-underlined-tabs ban stands)
- **Tooltip arrow tail BAN inverted (R19)** — tooltips CAN have arrows (canonical DLS shows arrows in 6 orientations). R6 ban was contextual to inline-with-text tooltips
- **Pills row directly under search bar on Activity L0** — use circular filter icon button trailing (cal:2026-05-18 R12)
- **Retry button on connection-lost takeover** — slice auto-retries silently (cal:2026-05-21 R14)
- **Bottom CTA on Action centre empty state** — read-only, no CTA (cal:2026-05-21 R14)
- **Always-on helper text below form inputs** — only on error (cal:2026-05-21 R14)
- **Leading icon on Primary CTA** — label is verb + value, no icon (exceptions: icon-only FAB, Tertiary supporting actions)
- **Grey/secondary background on page-level surfaces** — slice is "white on white" + shadows (cal:2026-05-27)
- **Leading icon on App bar L0** — pod title is the leading slot; leading icon means it's L1 (cal:2026-05-28 R18)
- **Brand-colour fill carrying into dark mode (full-bleed pages)** — flatten to pure black; brand survives only as text + glyph accents (R18). **Scope refined R19**: full-bleed only — smaller V-tinted callouts use V-700/950 in dark mode
- **Floating dock active state with V-500 fill bg** — active = white circle + V-500 glyph inside (inverted), not V-500 fill (cal:2026-05-28 R18)
- **Bottom-anchored Primary CTA on Profile** — Profile CTA sits mid-screen below name block (R18)
- **Two simultaneous tickers animating** — sequential only (R19)
- **Two emphasized marketing pills** — max 1 highlighted at a time (R19)
- **Removing UPI ID pill from action pills row** — UPI is identity anchor, always present (R19)
- **Solid white or V-500 fill on action pills** — translucent-white ~10-22% only (R19)
- **Card chrome on txn detail status header** — status header flush page-level, no card (R19)
- **Inset divider between consecutive same-type avatar-leading rows** — avatar + 12px gap is enough (cal:2026-05-18 R13 flip)

Source for every entry: `references/reference_anti_patterns.md` + `reference_calibrated_digest.md`.

---

## Motion — cross-pod hard rules (from reference_motion.md)

### What we never animate

| Pattern | Why not |
|---|---|
| Bounce on tap | iOS-toy aesthetic — slice is calm fintech |
| Infinite parallax | Battery + attention cost |
| Spinning logos / icons (perpetual) | Reads as "loading" even when not — confuses |
| Page-level scaling on sheet present | iOS-Maps look; wrong for 360-width phone-first |
| Stagger > 80ms per item in list | List feels broken |
| Auto-playing video in cards | Battery, data, a11y |
| `transition: all` (kitchen-sink) | Catches state changes you didn't mean; can't tune per-property |
| `transform-origin: center` on popovers | Breaks spatial continuity (use trigger origin); modals exception |
| Animation on keyboard-initiated actions | Keyboard is high-frequency; animation makes it feel slow |
| Same enter/exit timing | Asymmetric: slow press, fast release |
| All list elements appearing at once | Stagger 30-80ms — simultaneous = "pop" |

Skeleton shimmer is the **only allowed infinite loop**.

### Motion decision framework (4 questions, from emil-design-eng)

Before writing any animation, answer in order:

1. **Should this animate at all?**
   - 100+ times/day → No animation, ever
   - Tens of times/day → Remove or drastically reduce
   - Occasional (modals, sheets, toasts, confirmations) → Standard animation
   - Rare / first-time (onboarding, celebration, Spark reveal) → Can add delight

2. **What is the purpose?** (spatial consistency / state indication / explanation / feedback / preventing jarring change). If purpose is "it looks cool" and user sees it often, don't.

3. **What easing?**
   - Entering/exiting viewport → `ease-out` family (default)
   - Moving on-screen both ends visible → `ease-in-out` family
   - Hover / color change → plain `ease`
   - Constant motion → `linear`
   - **Never `ease-in` for UI** — starts slow at the exact moment user is watching

4. **How fast?**
   - Press feedback: 100-160ms
   - Tooltips: 125-200ms
   - Dropdowns, action pill morphs: 150-250ms
   - Modals, drawers, sheets: 200-500ms
   - Default cap: under 300ms

### Common slice easing curves (starter values, not gospel)

| Token | Curve | Use for |
|---|---|---|
| `out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default — push/pop, sheet, value change, title push-up |
| `out-fast` | `cubic-bezier(0.16, 1, 0.3, 1)` | Pressed state release, quick lift |
| `in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | State change both ends visible (toggle) |
| `spring-soft` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bling twitch overshoot — ONE-SHOT attention only |

**Custom curves valid when**: the named curves don't fit the moment's character (new product like Atom wanting different motion identity); component needs more punch (`cubic-bezier(0.23, 1, 0.32, 1)`); iOS-like drawer feel (`cubic-bezier(0.32, 0.72, 0, 1)`). Pull from easing.dev / easings.co — don't invent from scratch.

### Named durations

| Token | ms | Use for |
|---|---|---|
| `instant` | 80 | Toggle dot, switch flip |
| `quick` | 160 | Press feedback opacity dim, state color swap |
| `base` | 240 | Sheet header morph, inline value change |
| `gentle` | 320 | Push/pop nav, screen-level transitions |
| `linger` | 520 | Title push-up cross-fade (Spark choreography) |
| `bling` | 640 | Attention twitch one-shot |
| `shimmer` | 1200 | Skeleton loading (linear infinite — only allowed loop) |

---

## Accessibility — non-negotiable (from reference_accessibility.md)

- **`prefers-reduced-motion`**: replace transform/scale/rotate with opacity-only transitions. Sheet present → opacity 0→1 no translate. Spark reveal → no overshoot, no rotation, just opacity. Payment status envelope → skip brand-immersion intermediate.
- **Touch device hover gate**: wrap ALL hover styling in `@media (hover: hover) and (pointer: fine)`. Includes color, transform, bg, shadow, text-decoration. Tap on touch triggers false `:hover`.
- **Tap target minimum 48×48 CSS px** (WCAG + Material baseline). Visual can be smaller; expand tap area via padding or `::after { inset: -12px }` overlay.
- **Focus indicators**: never `outline: none` without replacement. On V-500 brand-immersive surfaces, use white outline (`outline: 2px solid white; outline-offset: 2px`). On white pages, browser default OR V-500 outline both fine.
- **Contrast minimums**: 4.5:1 for body text (WCAG AA), 3:1 for large text. White on V-500 = 4.5:1 (borderline for 12px). Run pairs through a contrast checker when in doubt.
- **Status not by color alone**: pair color with icon (green tick / amber ! / red X / blue info) AND text ("Paid" / "Pending" / "Failed"). Colorblind users ~8% of men.

---

## Performance — non-negotiable (from reference_performance.md)

- **Only animate `transform` and `opacity`** — GPU compositor, off main thread. `height/width/padding/margin/top/left/background/color` trigger layout+paint per frame, drop frames under any main-thread load.
  - `height: 0 → auto` → `transform: scaleY(0→1)` + `transform-origin: top`
  - `width: 0 → 100%` → `clip-path: inset(...)`
  - `top: 100px → 0` → `transform: translateY(100px → 0)`
- **CSS variables on parent = expensive recalc**. Triggers style recalc on every descendant reading it. If a value is only used by one element, set it directly. Reserve CSS vars on parents for genuine cascading theme tokens.
- **Framer Motion shorthand (`x`, `y`, `scale`) NOT hardware-accelerated** — uses rAF on main thread. Use `transform: "translateX(100px)"` string form for HW accel.
- **CSS animations beat JS under load** — CSS runs off main thread, stays smooth during page loads. Predetermined animations (sheet present, press feedback) → CSS. Dynamic/interruptible (drag, scroll-linked, gesture-coupled) → JS.
- **WAAPI for programmatic CSS-quality animations** — hardware-accelerated, interruptible, no library.
- **Stagger 30–80ms per item only**; long lists stagger first 5–7 only.
- **`will-change` sparingly** — costs GPU memory; only on elements that animate often.
- **Never animate from `scale(0)`** — looks like materializing out of nowhere. Start from `scale(0.95)` + `opacity: 0`.
- **Skeleton shimmer**: only allowed infinite loop. Stop the moment content arrives — don't fade out.

---

## Craft principles (from reference_craft_principles.md)

These are the WHY behind every calibrated rule. Fall back to them when no rule covers the situation.

- **Taste is trained, not innate** — reverse-engineer the production app. Inspect canonical L0/L1/L2 frames. Notice what's there AND what's missing. Don't just match the rule; understand the principle.
- **Unseen details compound** — Indian number grouping, ₹ touching digit, status caption rendered in status color, photo Avatar identity across pods. Users don't consciously notice. The aggregate of invisible correctness creates UIs people trust without knowing why.
- **Beauty is leverage** — in fintech, beauty is trust. Don't apologize for caring about polish. Don't dilute brand to ship faster.
- **Review your work the next day** — fresh eyes catch drifted spacing, wrong text colors, mis-anchored CTAs, mis-styled section headers. Sleep, look again. Or step away for an hour minimum.
- **Test on real devices** for touch interactions (drawer drag, dialer drag, action pill morphs). Simulator catches layout bugs; real hardware catches feel bugs.
- **Slow-motion testing** — play animations at 2–5× duration to spot timing issues, easing weirdness, wrong `transform-origin`, out-of-sync properties.
- **Cohesion > novelty** — celebration moments can be bouncier, professional dashboards crisp, FTUX slightly different — but always recognizably slice. Don't introduce a motion vocabulary that fights the brand.
- **Asymmetric press / release** — slow press when deliberate (hold-to-confirm), fast release always (~200ms ease-out). Already in Sheet present (280ms) + dismiss (240ms).
- **Naming creates identity** — `atom`, `spark`, `monies`, `fire` carry the brand more than any UI element. Sacrifice discoverability for memorability where appropriate.
- **Handle edge cases invisibly** — UPI ID pill re-expands when alone; payment confirmation pink-immersion only on rewarded txns; bottom sheet no handle dismisses via scrim. The UI just works.
- **Never substitute user-provided assets** (from feedback_assets.md) — Claude defaults to generating SVGs that are always wrong. If an asset isn't loading, ASK the user. Don't silently swap.

---

## Profile V3 — overlay-style screen (cross-pod, R21 — supersedes R18)

Profile is accessed via trailing Avatar tap on any L0. It's an **overlay**, not a flow. R21 fundamentally restructured it from R18.

**Full V3 recipe lives in `reference_dls_screen_layouts.md` § Profile V3.** Summary:
- **X close top-left + bell top-right** (bell carries red badge dot for Action centre nudges)
- **QR-as-identity hero card** (white card, dot-pattern UPI QR with photo Avatar overlaid centre + name + "Joined in..." + 3-column lifetime metrics strip Cashback/Interest/Payments)
- **2-up action tile grid** below hero (`Get ₹150 Invite friends` + `View UPI Manage accounts`) — replaces R18's mid-screen full-width Primary
- **5-row settings list** with bare line icons (NOT Avatar-wrapped): Help & support / Profile details / App settings / Pricing / About. `Action centre` and `UPI settings` removed (promoted to bell + action tile).
- **Brand-illustration footer** (V-500 temple + Secured & RBI licensed + app version)
- **No bottom nav** — still holds

R18 superseded:
- ~~Centred photo Avatar large as page hero~~ → QR hero card is the page identity
- ~~Mid-screen full-width Primary CTA~~ → 2-up action tile grid
- ~~Settings rows with outline-subtle Avatar leading icons~~ → bare line icons
- ~~Phone number under name on Profile L0~~ → moves to Profile details L2
- ~~6-row settings list~~ → 5 rows

Source: cal:2026-05-28 R21 — file `PAykW7c42bZL3CAt2VW1v0` Profile V3 canonical frames (`813:9080` Default, `765:6819`, `767:7349`, `765:7200`, `786:1554`, `775:10827` — higher node IDs = canonical per page-ID-as-recency heuristic) ✅

---

## Settings screens (cross-pod)

- **Flat list** with **List section headers** (grey-10 bg, Metadata UPPERCASE, 8/24 padding)
- **NOT iOS-style rounded cards on grey background** — slice doesn't do grey page bg
- White page bg + List grouping by section
- Dense rows: Standard-Empty 56px height (S-32 Avatars if any)

---

## When to fall back to this file

This is the daily reference when the task isn't pod-specific:
- `judge` / `audit` on a screen (apply hard rules + slop test)
- Brand voice / copy review
- General slice questions ("does slice use X?")
- Quick rule lookup before / during build
- Cross-pod consistency check

For pod-specific recipes (Payments dialer, Activity L0 search, Banking L1 hero, Atom FTUX, etc.) → respective pod / component files.

---

## Calibrated digest

`reference_calibrated_digest.md` is the single-page index of every calibrated rule through R10 (2026-05-17, 166 pairs, 80+ promoted rules). **Flag: it's stale** — newer rounds (R11–R19, 2026-05-17 → 2026-05-28) are in `reference_anti_patterns.md` and per-component refs but not yet folded into the digest.

To regenerate: invoke `/update-slice-design` → triage calibration log → rebuild digest.

---

## Calibrated history (cross-cutting milestones)

Brief audit trail of cross-cutting rounds:

- **R6** (cal:2026-05-21) — tooltip arrow ban. **Inverted in R19** — tooltips CAN have arrows (canonical DLS shows 6 orientations); R6 was contextual.
- **R11** (cal:2026-05-17) — anti-patterns batch: red-fill destructive, chevron-on-non-nav-rows, tabs→pills, hand-built buttons/cards, illustration→Avatar (softened R2 to preference), cashback-no-rainbow, list-header-after-appbar.
- **R12** (cal:2026-05-18) — grey-card-on-white ban, white-card-needs-chrome, H3-too-big-for-Action-centre cards (H4), bottom-sheet-no-handle reconfirmed, no-confirm-payment-sheet, pills-under-search banned, slice-currency-pill-anatomy.
- **R13** (cal:2026-05-18) — divider-between-avatar-rows FLIPPED (now no divider for same-type), confirmation-tick-stroke-8px, Avatar `glyphScale: size/2` confirmed.
- **R14** (cal:2026-05-21) — empty/error states batch: retry-button-banned, no-cta-on-action-centre-empty, no-always-on-helper, capitalised-pod-titles (later overridden R18).
- **R15** (cal:2026-05-21) — icon usage: utility icons neutral (text-primary not V-500), icons-on-brand-gradient use V-50 white not pure white, state-specific icon variants, outline-vs-solid context-dependent.
- **R17** (settings group) — settings = flat list + List headers, not iOS rounded cards on grey.
- **R18** (cal:2026-05-28) — L0 canonical reference frame sweep: no section headers between L0 cards (3 pods), no leading icon on App bar L0 (5 pods), brand-fill flattens to black in dark mode (full-bleed surfaces), floating dock active = white circle + V-500 glyph (5 pods), Profile CTA mid-screen not bottom-anchored, pod titles BOTH capitalised + lowercase valid (R14 override), Activity L0 filter icon button = white + outline-subtle + slate glyph (not slate-10 + V-500).
- **R19** (cal:2026-05-28) — multi-file sweep + Emil techniques + dark-mode brand survival: motion anti-patterns (`transition: all`, `transform-origin: center`, keyboard animation, symmetric timing, all-at-once), recipe anti-patterns (status caption greyed, card chrome on txn detail header, simultaneous tickers, 2 emphasized marketing pills, UPI pill removable, solid action pills), Tabs molecule reverify (DLS calls pill-segmented "Tabs"), Tooltip arrow re-allowed, chevron-on-collapsible-headers explicitly OK, smaller brand callouts use V-700/950 in dark mode (refines R18 full-bleed-only flatten).

---

## Flows the cross-cutting layer touches

Cross-cutting isn't a flow itself — it's the substrate every flow runs on. But several universal surfaces appear ACROSS flows:

- **PIN entry** — every money-action flow (Pay / Add money / Repay / Atom contribution / FD purchase) routes through PIN entry. App bar Standard + dynamic title (`Pay ₹X to [payee]`) + system keyboard.
- **Source-account picker** — every flow needing a source account uses the Payment-cluster bottom sheet (handle YES, "Powered by UPI" footer).
- **Confirmation tick** — payment success uses the grainy gradient tick at ~120px. Other money-action confirmations reuse the recipe.
- **Snackbar / Toast** — transient cross-pod messaging (received money, action saved, error toasts).
- **Push notification → in-app route** — pushes deep-link into the relevant pod's flow step.

See `reference_flows.md` for the cross-pod handoff matrix.
