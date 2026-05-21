---
name: Calibrated rules digest (rounds 1–10)
description: Quick-scan summary of every calibrated rule across 10 calibration rounds. Use as a build checklist when assembling slice screens.
type: reference
calibrated_through: 2026-05-17 round 10
total_calibrated_pairs: 166
total_promoted_rules: 80+
---

This digest is the canonical "what we know is slice" summary. When building a slice screen / mockup, scan this list first. Detailed sources live in the per-component reference files; this is the index.

## Avatar
- Sizes: S-32, M-40, L-48, XL-64, XXL-80, XXXL-128. Inner glyph = `size / 2` (M-40 → 20pt)
- Emphasis: default = **Subtle** (V-50 bg + V-500 glyph) OR **White** (pure white + outline-subtle); never Bold (V-500 bg) as the default across a list
- Inner glyph = slice line icon, never emoji
- Status indicator = small corner dot (12×12, white border), never a ring around the avatar
- Group avatars = overlapping stack with 2px white borders
- In dense rows (settings, contacts): S-32. Default list = M-40

## Button
- Default CTA = Primary (V-500 fill)
- Press feedback = opacity 0.7 over 160ms (never scale-bounce)
- Disabled = opacity dim (light, ~0.7 — not heavy 0.4 grey-fill)
- Loading = spinner alongside the label ("Paying…"), never spinner replacing label
- Destructive: **never red-fill Primary** — use alert dialog with neutral Primary, or Tertiary with red text
- Label = verb + value ("Pay ₹500"), not verb + object ("Send payment")
- No emoji in leading-icon slot — slice line icons only

## List item
- Heights: Standard-Empty 56, Standard-Icon 56, Standard-Avatar 72, Transaction 76
- Padding 16/24, gap 12 between leading and content
- Transaction debit = neutral Text Primary (never red); credit = positive green prefixed `+`
- Insight row: Avatar leading, amount = Body (not H4 Medium)
- Disabled = opacity dim (light)
- Selected = subtle bg OR trailing checkmark (both valid)
- Unread = trailing V-500 dot, not bold text
- Load-more = auto on scroll, not button
- Selection list (radio/check) = radio circles
- Subtitle = one unit of info (`UPI · 9:14 AM`), never long
- Dense settings rows = Standard-Empty 56
- Group display = overlapping avatars

## Section header
- List (grey #F6F9FC, Metadata UPPERCASE, 8/24 padding) OR Bold (transparent, H4, 24/24/12)
- Never mix Bold + List on the same screen
- List header **must not** directly follow App bar — needs content row between them
- Bold + CTA = text CTA (V-500 buttonSmall), never chevron — middle space auto-flexes
- Settings groups = List header
- Day-grouped lists (Today / Yesterday): hairline divider between, not Big divider

## Divider
- Avatar list → Inset (76px offset = 24 page + 40 avatar + 12 gap)
- No-avatar list → Full-bleed
- Big (8px slate-10) only between distinct surface types
- Day groupings = hairline, not Big

## App bar
- L0 = 108px, requires Avatar top-right (not optional)
- Standard = 56px, leading icon is **chevron ‹**, never arrow ←
- Search variant exists; default search = full bar below App bar (not icon-only)

## Cards
- Sizes: Large 312×160, Medium 148×148, Small 148×66
- Internal padding 24px (L token)
- Page horizontal padding 24px (cards inset, never full-bleed)
- L0 card stack gap 16px (never 0)
- Surface chrome = Card elevation token (shadow), not border
- In-card header rules: no leading icon, no hairline below title
- Title alignment = **left when inside a card**; **centred when at top of page** (hero context)

## Pills (segmented control)
- Slice doesn't use Tabs — use Pills for filtered views
- Slate-10 track + white thumb on active + V-500 text on active
- Tabs components in registry exist but are not active pattern

## Tooltip
- No arrow tail
- Dark slate-900 bg + white text (default)

## Bottom sheet
- No handle bar
- Title left-aligned (not centred)

## PIN / OTP / CVV
- Circular input boxes (not square, not dots-on-underline)
- 4 for PIN, 6 for OTP/UPI PIN, 3 for CVV
- 12px gap, V-500 border on focus, filled dot on entry

## Toggle
- iOS-style switch (48×28 pill + thumb)
- Pill segmented controls are a separate component (for multi-option filters)

## Progress
- Indeterminate = circular spinner (V-500 on V-50)
- Definite = linear bar
- Pull-to-refresh = minimal/system spinner, not branded pill
- Skeleton = shimmer animation, not static blocks
- Full-screen loading = centred spinner, not skeleton
- Step progress = animated dot stepper, not segmented bar

## Snackbar / Toast
- Bottom-anchored, not top
- With-action variant for failures (Retry)
- Auto-dismiss with status dot for passive confirmations

## Inputs
- Default style = underlined (label above + V-500 bottom border on focus)
- Form stack gap = 24px (loose)
- Error = underlined + red border + red Caption
- Label always above (Caption) + value (H4) — never placeholder-only
- Focused state = label stays Caption, no scale animation

## Numbers / Currency / Dates
- Numbers: Indian grouping (₹1,00,000 not ₹100,000) — slice-dls L358
- Currency: ₹ touches the number (₹500, not ₹ 500); no decimals on surface (₹482, not ₹482.00)
- Dates: TODAY / YESTERDAY for recent; absolute `17 May '26` for older
- Time: absolute in lists ("3:42 PM"), not relative
- Account masking: `xx1234` (slice-dls L360)
- Card number display: `xx4321` (last 4)
- Card expiry: `12/27` short

## Empty / confirmation / error states
- Empty states use **illustrations**, not Avatars
- Empty copy = explanatory (title + 1-2 line body that guides), not terse
- Empty CTA = bottom-anchored full-width Primary (slice rule)
- Confirmation = full composition (Avatar 64 + H2 + body + button)
- Error tone = friendly / calm ("Something didn't work · try again"), never technical ("Error 504: Gateway Timeout")
- Loading copy = neutral "Loading…" (not fake-friendly)

## Brand / colour
- Lowercase "slice" always
- Fire / hot / winning = Valentino purple, never orange / yellow
- Brand gradient = Payments L0 hero only (not small cards)
- No rainbow gradients, no neon glows, no invented purples
- Cashback strip = white card (subtle bg = banners only)

## Patterns
- Quick-action grid = 4-up icon size 48, sentence-case labels, flat tiles, **uniform line count** across labels (no truncation)
- Quick-action containers = white+outline-subtle, V-500 line icon — these are **icon-boxes, not Avatars**
- Status pill on card/row = **trailing edge**, not beside title
- Status badge = icon + text (`✓ Delivered`)
- Tag on card = Chip variant (not plain Metadata label)
- Chevron `›` = back navigation only — never on rows, headers, or trailing affordances
- Receipt breakdown = bordered table
- FAQ question = Body weight (Regular), not H4
- Permission sheet = no illustration default
- EMI plan card = list rows, not table
- Payee in confirmation = large H3 name (not pill chip)
- Account selector = full-width row (not chip)
- Marketing card = brand gradient bg + OnColor button
- Hero number = always with caption above + delta caption below (Display/Small)
- Stat card minimal = label + amount only
- UPI ID = full display, not masked
- Card visual = gradient or solid both valid

## Anti-patterns (the "don'ts")
- ❌ Tabs as a pattern (use pills)
- ❌ Red-fill Primary buttons (destructive uses dialog + neutral Primary)
- ❌ Right-chevron `›` in unexpected contexts: column headers, table rows with their own CTA/switch, action items that already carry a leading verb (e.g. "Send"). Right-chevron IS valid on tap-the-whole-row callout rows (Recharge & bills "Get assured ₹10"). Left-chevron `‹` is always "back".
- ❌ Emoji in CTA leading-icon slot
- ❌ Emoji as Avatar glyph
- ❌ Emoji as empty-state / confirmation illustration — slice ships **real illustrations** (asteroid + diamonds for rewards, grainy gradient tick for paid). Generic line-art placeholders are a fallback during prototyping only, never shipped.
- ❌ Arrow + sign together on trend deltas (pick one)
- ❌ `+` prefix on credit / received amounts — use Positive Green colour alone, no `+`. Credits read as green; debits stay neutral text-primary.
- ❌ Rainbow / multi-stop gradients (more than 2 stops)
- ❌ Cashback on subtle-bg (banners only)
- ❌ Fire / hot states in orange/yellow (Valentino purple). The Rewards leaderboard **brand pink → coral** is a sanctioned 2-stop gradient on a specific hero banner — not a free pass on warm gradients elsewhere.
- ❌ List header directly after App bar (need a content row between)
- ❌ In-card header with leading icon or hairline below
- ❌ Centred body text on cards
- ❌ Page-edge full-bleed cards (24px page padding)
- ❌ Standalone illustration in list-leading position (use Avatar container)
- ❌ Quick-action tile uses Avatar component (use white+stroke box with V-500 line icon for action-tiles; slate outline + slate glyph for content-grid tiles inside Explore-style cards)
- ❌ Capital-S "Slice"
- ❌ "Cancel" text button on a slice bottom sheet — sheet dismisses by tapping the scrim. Bottom sheets carry the Primary action only.
- ❌ Avatar with `✓` glyph as confirmation indicator — confirmation success uses the **grainy gradient tick illustration** (~120px), not an Avatar
- ❌ Activity L0 with a week-summary hero block ("This week's spends ₹X") — that's an L2/L3 detail header. Activity L0 = App bar + search + filter trailing + flat transaction list with relative-date subtitles.
- ❌ Banking home as a separate L0 with quick-action grid + accounts list. Banking home **is** the Savings/Balance L1 screen (hero amount + brand-purple caption + Transfer/Add money dual CTA).
- ❌ Coloured-card hero on Credit L0 — Credit home is the **bill summary** (date range + period spend + "View unbilled spends" brand text + statement callout row on slate-10 bg).
- ❌ Brand-gradient banner with "Pay anyone" CTA as Payments L0 hero — the live pattern is App bar Standard with **dynamic amount title** (`Pay ₹2,000`) + form rows + QUICK PAY section with **3 large coloured circle category buttons**.

## Refined rules (added 2026-05-17 from review references)
- **Chevron**: left `‹` for back nav, right `›` valid for tap-row callouts (single-tap-the-whole-row affordance). NOT a free pass for arbitrary trailing chevrons.
- **Quick-action icons**: two valid variants depending on context — (a) **Action tiles** (page-level CTAs) = white + outline-subtle circle + V-500 line glyph. (b) **Content-grid tiles inside Explore-style cards** = subtle outline circle + slate glyph (neutral, lets the card's hero copy lead).
- **Illustration**: slice uses **real, branded illustrations** (asteroid+diamonds for rewards, gradient grainy tick for success). Generic line-art is prototyping placeholder only.
- **PIN slot size**: ~64px circles (not 48), with brief digit-visibility before mask.
- **Confirmation tick**: textured **green-blue grainy gradient circle illustration** (~120px), white check inside — not an Avatar.
- **Amount entry symbol**: ₹ matches digit weight and size (not subscript) — already calibrated, reconfirmed via Add money + Pay person references.
- **Send-to-person screen**: brand-immersive (**full V-500 fill**, white X close, white text, "Add a note" pill). Add-money / general amount entry stays neutral (white bg).
- **App bar trailing utility icons**: pattern-specific single icon — eye (balance), pie (credit), chat (FD help), card (pay-instrument). Not menus.
- **Notifications = "Action centre"** (slice naming). Cards use outline-subtle border + radius L, avatar **top-right**, Primary CTA inside card bottom-left.
- **Spark FD list**: dashed full-bleed dividers between rows, no card, left-aligned hero (caption + amount + bulleted subline).
- **Dynamic amount in App bar title**: Pay screen reads `Pay ₹2,000` in title (amount lives in title, not separate hero).

## Spacing rhythm
- L0 card stack: 16px gap
- Section gap: 16px default
- Form input stack: 24px
- Page horizontal padding: 24px
- Card internal padding: 24px
- Internal element gap inside list items: 12px

## Typography
- Rubik only · Regular (400) + Medium (500) — no other weights/fonts
- Type scale: Display/Small 48, H2 24/Medium, H3 20/Medium, H4 16/Medium, Body 16/Regular, Caption 12/Regular, Metadata 10/Regular UPPERCASE

---

When building a slice screen: scan this digest first. Cite the source reference file when adding a new instance. When in doubt about a pattern not in this list, **check `reference_calibration_log.md`** for the audit history.

- ❌ **Retry button on connection-lost takeover** — slice auto-retries silently, the takeover dismisses itself when connection returns. Adding an explicit Retry CTA is wrong (cal:2026-05-21).
- ❌ **Bottom CTA on Action centre empty state** — read-only surface, no CTA. Empty = illustration + "All caught up". (cal:2026-05-21).
- ❌ **Always-on helper text below form inputs** — helper only appears on error. Default state is clean (cal:2026-05-21).
- ❌ **Capitalised pod titles** — "activity", "banking", "explore", "payments", "credit", "action centre", "rewards" all lowercase, mirroring lowercase-slice (cal:2026-05-21).
