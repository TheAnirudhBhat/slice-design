---
name: Calibrated rules digest (rounds 1–24 + R19 web)
description: Quick-scan index of every calibrated slice-design rule. Use as a build checklist when assembling slice screens. The per-topic reference_*.md files are the source of truth; this is the index.
type: reference
calibrated_through: 2026-06-02
total_promoted_rules: 175+
---

This digest is the canonical "what we know is slice" quick-scan INDEX. When building a slice screen / mockup / proto, scan this list first. The detailed, authoritative sources live in the per-topic reference files (`reference_dls_*.md`, `reference_theming.md`, `reference_motion.md`, `reference_anti_patterns.md`, `reference_proto_systematics.md`, etc.) — this is the index, not the full spec. Where this digest and a topical ref disagree, the **topical ref wins**.

## Meta-rules (read first)
- **Canonical-fetch-first**: never assert a spec value ("this matches canonical") without pulling it in the same turn — `search_design_system` then `figma_get_library_component_by_key({format:'full', includeVisualSpecs:true})`. Eyeballing a screenshot or recalling from memory is the #1 source of error
- **Compose from cache, don't rebuild**: reuse the known-good component/asset from the live proto (`proto/src/` + `proto/public/assets/`) — re-deriving chrome from memory reintroduces already-fixed bugs
- **Self-audit before showing**: build clean + screenshot/inspect your own output (incl. `document.fonts` + network) before handing it over; don't make the user your QA
- **Asset reuse order**: copy from cache → fetch from Figma → (proto/working context only) auto-generate a flagged placeholder. Never approximate an icon or illustration inline
- **When a craft problem surfaces, ask "what does canonical Figma do here?"** — be more faithful to DLS, not more clever. An over-correction shipped into the skill is worse than the original miss
- **Page-ID-as-recency heuristic**: higher Figma node IDs are usually the newer iteration; prefer them when two frames conflict
- **Run the NEW-SCREEN PRE-FLIGHT CHECKLIST** (in `reference_proto_systematics.md`) end-to-end before showing any new screen/flow — every time

## Avatar
- Sizes: S-32, M-40, L-48, XL-64, XXL-80, XXXL-128. Inner glyph = `size / 2` (M-40 → 20pt)
- Glyph font = Rubik, Medium (500); never emoji, never line-art outside the line-icon set
- Emphasis: default = **Subtle** (V-50 bg + V-500 glyph) OR **White** (pure white + outline-subtle); never Bold (V-500 bg) as the list default
- Status indicator = small corner dot (12×12, white border), never a ring around the avatar
- Group avatars = overlapping stack with 2px white borders
- Dense rows (settings, contacts, menus): S-32. Default list = M-40
- Background is **categorical per context** (R19): transaction list / contact list / system list / banking logo / merchant logo each have a defined fill; transfer screen is an exception
- L0 app-bar avatar = 44×44 photo visual inside a 48×48 hit area, `border-radius:9999`, **no border / no ring**, even on the Valentino surface; tap opens Profile L1 (R24). The Valentino in-bar audio + avatar circles keep their 1px white-30 border (immersive-variant exception)
- Activity row avatar = 40×40 outlined circle (1px border); green border+letter for received/cashback, neutral outline otherwise. State (failed/pending) goes in subtitle text + amount colour, NOT on a badge over the avatar

## Button
- Default CTA = Primary (V-500 fill)
- Canonical Primary height = **48px** (12/24 padding); not 52, not 44
- Native `<button>` does not inherit font — set `button { font-family: inherit }` (or explicit Rubik). A button rendering a non-Rubik face is a bug
- Press feedback = opacity 0.7 over 160ms (never scale-bounce)
- Disabled = opacity dim (light, ~0.7 — not heavy 0.4 grey-fill)
- Loading = spinner alongside the label ("Paying…"), never spinner replacing label
- Destructive: **never red-fill Primary** — use alert dialog/sheet with neutral Primary, or Tertiary with red text
- Label = verb + value ("Pay ₹500"), not verb + object ("Send payment")
- CTA copy is **Capital-first** ("Confirm", "Proceed", "Continue"), an exception to lowercase brand voice — never lowercase "continue"
- No leading icon on a Primary CTA (verb+value text only). Exceptions: the Reload refresh-circle on API-failure states
- No emoji in leading-icon slot — slice line icons only

## List item
- Heights: Standard-Empty 56, Standard-Icon 56, Standard-Avatar 72, Transaction 76
- Transaction canonical (DLS List item/Transaction): padding 16/24 symmetric, itemSpacing 12, counterAxisAlign CENTER. Name = Body Strong (16/24 Medium); amount = Body Normal (16/24 Regular, one step lighter); subtitle = Caption (14/20 Regular tertiary). No inter-row dividers
- Transaction debit = neutral Text Primary (never red); credit = positive green, **no `+` prefix**
- Insight row: Avatar leading, amount = Body (not H4 Medium)
- A **label + value pair is a list item**, not two hand-aligned divs
- Disabled = opacity dim (light)
- Selected = subtle bg OR trailing checkmark (both valid)
- Unread = trailing V-500 dot, not bold text
- Load-more = auto on scroll, not button
- Selection list (radio/check) = radio circles
- Subtitle = one unit of info (`UPI · 9:14 AM`), never long
- No divider between same-type avatar-leading rows
- Dense settings rows = Standard-Empty 56; settings rows use bare line icons (not Avatar-wrapped)
- Group display = overlapping avatars
- Sub-types: Search / Subtitle / L0 / Control variants exist (R19)
- Any tappable row inside a horizontally-swipeable pager must guard against drag-initiated clicks (pointer-move ≥10px threshold; keep native onClick for keyboard/programmatic)

## Section header
- List (grey-track Metadata UPPERCASE, 8/24 padding) OR Bold (transparent, H4, 24/24/12)
- Never mix Bold + List on the same screen
- List header **must not** directly follow App bar — needs a content row between them
- Bold + CTA = text CTA (V-500 buttonSmall), never chevron — middle space auto-flexes
- Settings groups = List header
- Day-grouped lists (Today / Yesterday): hairline divider between, not Big divider; date headers are sticky
- Chevron on a **collapsible** section header is valid (collapse toggle); banned only as a nav affordance
- ❌ No section header **between** L0 cards — cards are the structure on L0

## Divider
- Avatar list → Inset (extra left margin so no line runs under the avatar; ~76px offset = 24 page + 40 avatar + 12 gap)
- No-avatar list → Full-bleed
- Middle = respects card L/R padding on both sides (section breaks inside a card)
- Big (8px slate-10) only between distinct surface types
- Day groupings = hairline, not Big
- Spark FD rows = dashed full-bleed dividers (no card)
- **Never lead a data block with a divider** — hairlines go BETWEEN rows only; whitespace separates the block from the hero (footer-total-above-CTA top hairline is the one allowed region separator)

## App bar
- L0 = 108px, requires Avatar top-right (not optional)
- ❌ No leading icon on App bar L0 — pod title sits left only; trailing slot carries utility icon + Avatar
- Standard = 56px, leading icon is **chevron ‹**, never arrow ←
- Back chevron is a **FILLED** glyph (DLS Interface/Chevron left, node 582:580), not a thin strokeWidth-2 "V"
- Close = X variant (e.g. Send-to-person, Transaction Failed); use the canonical profile_close glyph, never hand-drawn
- Trailing utility icons = pattern-specific single icon (eye/pie/chat/card), Text Primary tint (not V-500), not menus
- Canonical types: Standard, Search, Subtitle, dynamic-amount-in-title — Search + Subtitle previously undocumented (R19)
- Dynamic amount in title: Pay screen reads `Pay ₹2,000` in the title (amount lives in title, not a separate hero)
- Scroll behaviour = stays pinned; content scrolls UNDER it. On scroll the App bar **and the 54px status reserve above it** fill white (immersive Valentino pod opts out). Elevation shadow `0 6px 8px rgba(0,0,0,0.05)` when scrolled
- AppBar bg = transparent by default; per-pod `background` prop override (Activity passes solid white because the search bar interrupts the cascade)
- Valentino app bar: 8/16-20 padding, "Check balance" pill (1px white-20 border), 48-hit-area audio + avatar circles with 1px white-30 border

## Cards / Elevation
- Sizes: Large 312×160, Medium 148×148, Small 148×66
- Internal padding 24px (L token)
- Page horizontal padding 24px (cards inset, never full-bleed)
- L0 card stack gap 16px (never 0)
- Surface chrome = shadow (Card elevation token), not border; **never a grey bg**
- Canonical content-card shadow = `0 2px 32px rgba(0,0,0,0.05)` (proto-scale: `0 4px 24px rgba(0,0,0,0.08)`). A too-heavy shadow reads as a grey wash — fix with a LIGHTER shadow, not no shadow
- In-card header: no leading icon, no hairline below title, no H3 title
- Title alignment = **left inside a card**; **centred at top of page** (hero context); never centred body text on a card
- Cards never lead with an illustration — text leads, illustration bleeds on the RIGHT; left-illustration is a **banner-only** treatment
- Bottom bar / nav elevation = shadow, not hairline
- **Data inside a box is rare** — read-only multi-field data = flush stacked label-top/value-below rows with hairlines; a box is for an interactive choice, not for displaying data
- Subvariants: 2-insight, Label+Title+Repay footer, stat tile, FD illustration card, outline-border card (Action centre)

## Selection / chooser cards
- Every slice card (content + selection alike) = white + the canonical shadow (Explore aesthetic)
- Unselected selection card = 1px hairline `rgba(0,0,0,0.05)` + canonical shadow; selected = 2px V-500 border (`box-sizing:border-box` so the swap doesn't shift the row)

## Pills (segmented control) / Tabs
- slice uses Pills (segmented control) for filtered views, not underlined iOS Tabs
- Slate-track + white thumb on active + V-500 text on active
- DLS calls the component "Tabs"; the skill calls it "Pills" — same component. The ban is scoped to underlined iOS-style tabs only
- Action Pills = a distinct family (e.g. Payments L0 Action Pills row holding the UPI ID pill)

## Tooltip
- No tail in older note — **inverted (R19)**: arrow pointers ARE canonical; DLS shows arrows in 6 orientations
- Dark slate-900 bg + white text (default)

## Bottom sheet
- Container: white, top corners 16px radius; backdrop `rgba(0,0,0,0.3)` (works on V-500 pages too)
- 4 row clusters: **Action driven / Action on sheet / Payment / Information**
- **Drag handle CONDITIONAL**: handle present on **Payment + Information** sheets; absent on Action-driven / Action-on-sheet variants
- **Title alignment CONDITIONAL**: left for directed-action / input / list / picker; centred for advisory / destructive-confirm / illustration / maintenance
- Header spacer 24px; content padding 24px all sides
- Avatar colour encodes intent (V-500 brand / green protection / red-50 error / blue info) on 48px leading avatars
- Three button-group archetypes: single primary pill / two-button row (one outlined + one filled, never both same) / stacked primary + tertiary-text link
- Selector trio: radio circle (pick one) / green-check disc (chosen account) / stroke-as-selected (row IS data)
- Avatar OR illustration OR neither — never both
- ❌ No Cancel button — scrim tap is the cancel; sheet carries the Primary action only
- ❌ No "confirm payment" sheet — payment commitments are full-screen
- List-only action menu = no footer CTA (the row IS the commit)
- Motion: present 280ms `cubic-bezier(0.22,1,0.36,1)` translateY 100→0; dismiss faster (240ms); L1 bottom-sheet variant 450ms `cubic-bezier(0.32,0.72,0,1)`

## PIN / OTP / CVV
- Circular input boxes (not square, not dots-on-underline)
- 4 for PIN, 6 for OTP/UPI PIN, 3 for CVV (CVV extends the PIN rule)
- ~64px circular slots, V-500 border on focus, brief digit visibility before mask
- PIN-entry screen: Display title + context subtitle + 64px slots + system keypad

## Toggle / Controls
- iOS-style switch (48×28 pill + thumb) is the default for on/off; on-colour = Green
- Switch label sits trailing/right
- Checkboxes are **circular** (not square corners)
- Radio button style is context-dependent (both valid)
- Keypad/dialer keys = borderless (no stroke)

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
- Helper text appears **on error only** — default state is clean (no always-on helper)
- Slider value shown in page content above (no tooltip/inline highlight on the thumb)
- File-upload multi = 2×2 grid

## Search
- Search bar anatomy = icon left + left-aligned placeholder
- Default search = full bar below the App bar (not icon-only)

## Iconography
- Trailing utility icons (standalone, on App bar) = Text Primary, not V-500
- Icons on a brand gradient = V-50 subtle white, not pure #fff
- Use state-specific icon variants when DLS provides them
- Outline for utility / inactive; Solid for active / primary (context-dependent)
- Chip icon size = **20px** (not 16px)
- Canonical slice icons are always fetched from Figma (DLS 2.0 Copy node `582:257`), never approximated inline. Most already live in the proto `public/assets/icons/`
- Verify content type before saving: a Figma asset URL may return SVG even for a node exported as raster — `file <path>`, save with the matching extension (Vite infers MIME from extension)
- Theming a mono icon: inline the EXACT Figma path + `fill=currentColor`, OR render via CSS mask (`mask-image` + themed `background-color`). PNGs and `<img src=.svg>` do NOT recolour
- Generated placeholder icon DNA (proto-only, flagged): filled paths `fill-rule=evenodd`, single `currentColor` @ 0.5/0.9 opacity, rounded geometry, 24-grid, minimal shape count, accent holes = filled dots not rings

## Accordion
- Chevron rotates 180° (animated) on expand
- Inset divider between items

## Numbers / Currency / Dates
- Numbers: Indian grouping (₹1,00,000 not ₹100,000)
- Currency: ₹ touches the number (₹500), matches the digit weight + size (not subscript); no decimals on surface (₹482); hide `.00` even on detail
- Amount-entry symbol: ₹ matches amount font size
- Dates: TODAY / YESTERDAY for recent in some contexts; absolute `17 May '26` for older. **Never write relative day labels like "today"/"Today, 9:41 am"** — use the real date (`25 Jan '26`)
- Time: absolute in lists ("3:42 PM"), not relative
- Countdown = digital timer; Maintenance copy is time-bound ("till 4PM today"); vague time is an anti-pattern
- Account masking `xx1234`; card number `xx4321`; card expiry `12/27` short; UPI ID + txn ref shown in full (copyable)

## Empty / confirmation / error states
- Empty states use **illustrations**, not Avatars
- Empty copy = explanatory (title + 1-2 line body that guides), not terse
- Empty CTA = bottom-anchored full-width Primary — EXCEPT Action centre (read-only, no CTA)
- Confirmation = full composition (title + body + button + the canonical illustration)
- 4 canonical full-screen error variants (Offline / API failure L1 / API failure L0 / Maintenance); chrome signals recoverability (no chrome = wait; chevron-only = back-out; App bar L0 + dock = switch pods)
- **System errors avoid red** — red is reserved for money-failure (Transaction Failed, Validation Error); system hiccups use a friendly mascot + V-500 Primary
- Transaction Failed = X close + solid red Avatar Bold + verb+amount+state copy + Retry/Cancel
- Connection-lost / Offline = full-screen takeover, broken-wifi mascot, **no explicit Retry** (slice auto-retries silently)
- Error tone = friendly / calm, never technical; loading copy = neutral "Loading…"
- Top-heavy status/success/empty blocks anchor near the TOP and are optically centred (not geometrically)

## Success screens
- **Success = white / restrained, NOT a V-500 full-bleed celebration** (R19 web)
- Use the canonical **`dls_success_tick`** asset (in `slice-design-suite/illustrations/`), never a hand-drawn check
- Confirmation tick = textured green-blue grainy gradient circle (~120px) with single-green grainy variant + 8px white check stroke; not an Avatar with a ✓ glyph

## Theming / dark mode
- Mechanism = CSS variables: `tokens.js` exports `var(--x)`; `index.css` defines `:root` (light) + `[data-theme="dark"]`; the toggle flips `data-theme` on the phone root
- Dark page bg = **`#090B0C`** (not pure black, not slate-950); card = `rgba(255,255,255,0.05)`; outline-subtle = `rgba(255,255,255,0.05)`
- V-500 (`#D30AD7`) is **unchanged** in dark; positive → Green/400 `#3DBB6C`, negative → Red/400 `#DA535A`; text → white at .9/.7/.5
- Brand-immersive surfaces (V-500 Pay/Valentino) **flatten to `#090B0C`** in dark — brand survives only as text + active-glyph accents
- Brand-tinted callouts flip to deep V-700/950 (not flat black)
- Dark cards = no shadow (outline optional)
- Asset theme-safety: icons = single-colour SVG with `currentColor` (never PNG); illustrations = transparent bg, slice ships distinct light/dark variants
- A sprite-crop can hide a baked white sliver that breaks dark — prefer the clean standalone official asset
- Theme-switch reveal = a 300%-tall blue-violet→target gradient overlay sliding top→bottom with a mid pause (~3.2s); flip `data-theme` during the pause; destination icon (moon→dark / sun→light) + typewriter caption; never magenta/pink, no blur

## Brand / colour / voice
- Lowercase "slice" always; the lowercase rule is about the **brand token**, not the whole UI
- UI copy is **sentence case** (capital first) — headings, titles, questions, list labels, settings rows ("Explore", "Recharge & bills", "Choose your cover"). Only product/brand names stay lowercase mid-sentence ("slice", "spark", "monies", "slice super card", "slice atom")
- Generic in-app features carry **no brand prefix** ("Health cover", not "slice health insurance"); the mark stays only on named sub-products
- Fire / hot / winning = Valentino purple, never orange / yellow
- Brand gradient = Payments L0 hero only (not small cards)
- No rainbow / multi-stop gradients (>2 stops), no neon glows, no invented purples
- Cashback strip = white card (subtle bg = banners only); cashback density = label + amount only by default

## Screen layouts / pod L0s
- Activity L0 = App bar + search + filter trailing + flat transaction list (relative-date subtitles); NO week-summary hero
- Banking home = the Savings/Balance L1 (hero amount + brand-purple caption + Transfer/Add money dual CTA + FD + monies, in-card CTA pattern)
- Credit home = bill summary (date range + period spend + "View unbilled spends" + statement callout) + white card spends + recent txns + Blue-50 callout + super card promo Medium. Callout taxonomy = 4-colour (Blue-50 / V-50 / Green-50 / Slate-10-disabled)
- Payments L0 = full-bleed V-500 dialer (custom keypad) + Request|Transfer Tertiary pills + Action Pills row (UPI ID pill between App bar and hero); App bar Standard with dynamic amount title downstream
- Explore L0 = Recharge & bills card + 2×2 small grid; bento second-row tiles sized so column heights match (short = (tall − (N−1)·gap) / N)
- Hero number always with caption above + delta caption below (Display/Small); stat card minimal = label + amount only
- Balance hero = left-aligned on L0, centred on L1
- L0 trailing avatar = identity (opens Profile overlay on tap)
- Floating dock = semi-transparent slate circles + white-circle active with V-500 glyph
- CTA anchoring = three valid patterns: bottom-anchored full-width / centred Small / mid-screen full-width (mid-screen now validates only Atom returning-user L1)
- Onboarding illustration = centred layout
- Core PDP (centred, gradient heading, dot indicator, FAB) for core bank products; Feature PDP (left-aligned, green eyebrow, 3 tick rows, FAB) for features/sub-products
- Profile = V3 overlay: QR-as-identity hero card + photo Avatar centre + lifetime metric strip + 2-up action tile grid (Primary substitute) + slimmed 5-row settings (bare line icons) + bell badge top-right + brand-temple footer; NO bottom nav, Primary mid-screen (not bottom-anchored)

## Misc patterns
- Quick-action grid = 4-up, icon size 48, sentence-case labels, flat tiles, **uniform line count** across labels (no truncation)
- Quick-action containers = icon-boxes (white+outline-subtle, V-500 line glyph for action tiles; subtle outline + slate glyph for content-grid tiles in Explore cards) — NOT Avatars
- Status pill on card/row = trailing edge, not beside title; status badge = icon + text (`✓ Delivered`)
- Tag on card = Chip variant (Subtle default, inside the card, 12px Caption), not a floating Metadata label
- Receipt breakdown = bordered table; EMI plan = list rows, not table
- FAQ question = Body weight (Regular), not H4
- Permission sheet = no illustration default
- Payee in confirmation = large H3 name (not pill chip); account selector = full-width row (not chip)
- Help icon = "i" glyph (not "?"); verified badge = inline ✓; offline = icon+label (not banner)
- Bank logo = no inline glyph; chart = donut, not pie; sparkline = smooth, not stepped
- Maturity date = headline; interest = running tally
- Info banner bg = Slate-10 neutral; destructive secondary copy = "Cancel" (not "Not now")
- Footer T&C = inline caption + underline link; trust header = horizontal row, white bg, **Tick** icon (not Shield); Bharat Connect band documented
- Dot indicator default = Pill type
- slice-currency pill = avatar inside the pill, not a separate badge
- Bills sub-pod: reward callout is a **carousel** on L1 (3-dot, no chevron); chevron-row is L0-card only. "due in N days" uses orange (not red); row-level Pay uses slate-10 (not magenta)

## Motion
- Asymmetric timing: exit faster than entry
- Frequency rule: animate more-frequent interactions more subtly
- Stagger 30–80ms; CSS transitions for simple state, keyframes for sequences; `@starting-style` for enter
- Nav push / L1 open = **400ms, `cubic-bezier(0.32,0.72,0,1)`** (iOS decelerate); sub-300ms reads abrupt
- Press/release is asymmetric; damping at scroll boundaries; pointer capture for drag; momentum (velocity > 0.11) dismissal
- ❌ `scale(0)` ban (animate from a small non-zero or fade); ❌ `transition: all` ban; ❌ no animation on keyboard-triggered actions
- Spark hero reveal: bling → title push-up → rotate-out into brand pills (validated anchor→reveal pattern)
- Campaign-pill reveal (9-step) and payment-status transition envelope (3-stage rewarded/un-rewarded) are run-once / per-frame-calibrated choreographies

## Proto / phone shell
- Default device = **iPhone 16 Pro (393×852 logical)**; the iPhone 17 Pro Silver bezel PNG (transparent screen cut-out ~402×874) layers OVER content, `pointer-events:none`, with a `drop-shadow` float
- Proto stage = white (`#FFFFFF`), phone floats with a subtle shadow; not a black stage
- Phone is responsive AND always centred: `useFitScale` (`Math.min(1,…)` — scale down only) + flex/grid centring; outer stage fills the viewport
- Status bar = real component (system font for the time, not Rubik); per-element colour from the page under each element's CENTRE x (hard cut at the page boundary); icons centred on the Dynamic Island (y≈32)
- 54px status reserve lives in App.jsx (above each pod), not in the L0; L0s report scroll state up via `onScrollChange`
- BottomFade overlay (height 146: 22px fade, then solid page bg from 750pt — prod-matched cal:2026-10-06; colour MUST match page bg) above the dock on EVERY white L0 incl. Credit; not on the V-500 immersive page
- Debug panel (project builds only) = a 300px column 40px to the RIGHT of the phone, same height, centred together as one row; fit-scale reserves its width; on a PHONE the same panel is a bottom sheet behind a three-finger hold (cal:2026-10-06)
- Device mode (phone / home-screen app): screen = device width × device height (no cover-crop); TRANSPARENT status bar (`black-translucent`; `StatusTint` strip feeds iOS 26's edge sampler, dims with every `useStatusDim()` overlay; cal:2026-10-07); `--status-reserve` = the real top inset for every page; nav clears the home indicator (`max(24px, inset − 4px)`) (cal:2026-10-06)
- App bg / outer stage fills 100vw×100vh; pages reserve 54px transparent at top so page bg fills under the status bar during swipes
- Bottom nav: flex+gap layout (GAP 24), never uniform SLOT_WIDTH; per-slot variant computed from `navX + pagerX + page meta`, clamped to the visible viewport; `useLayoutEffect` for synchronous variant updates; single SPRING animate on state change (page snaps instantly via Pager `x.set`)
- Nav inactive on white = white circle + 40%-black glyph; on Valentino = white-30% circle + V-500 glyph; active non-pay = white circle + V-500 (or 40%-black per latest) glyph + shadow; Pay-active = 72px white ring + scanner glyph
- Image-drag protection: global `img,svg { user-drag:none } img { pointer-events:none }`
- Agentation is MANDATORY in every slice proto — install + wire as a direct sibling of `<App />` (no wrapper) + verify
- Self-host fonts via `@fontsource/rubik` — NEVER the Google Fonts CDN (corporate network silently drops Medium-500)
- Shared kit by reference: design-system layer (`components/icons/utils/tokens.js/index.css`) is symlinked (propagates); pods + App + assets are project-owned via the **extension seam** (`AppBase.jsx` symlink + thin local `App.jsx` with injection props). Scaffold new projects with `new-proto.sh`
- **HARD: skill proto is READ-ONLY during project work.** Projects inherit by default and build on top; diverge a single component only via `link-kit.sh materialize`; the skill proto changes only via deliberate skill maintenance with a calibration-log entry

## Spacing rhythm
- L0 card stack: 16px gap · Section gap: 16px · Form input stack: 24px
- Page horizontal padding: 24px · Card internal padding: 24px
- List-item internal element gap: 12px · Keypad gutter: 0 36px (canonical 24 + 12 extra)

## Typography
- Rubik only · Regular (400) + Medium (500) — no other fonts (proto bundles 400/500/600/700 for weight headroom)
- Type scale: Display/Small 48, H2 24/Medium, H3 20/Medium, H4 16/Medium, Body 16/Regular, Caption 12/Regular, Metadata 10/Regular UPPERCASE
- Don't bump sizes for "felt small" without verifying against canonical (proto-scale bumps H4→H3 and card-title/metadata stand; the bill-tile bump did NOT)

## Anti-patterns (the "don'ts")
- ❌ Tabs as a pattern (use pills); ban scoped to underlined iOS-style tabs
- ❌ Red-fill Primary buttons (destructive uses dialog/sheet + neutral Primary)
- ❌ Right-chevron `›` in unexpected contexts: column headers, rows with their own CTA/switch, action items with a leading verb. Right-chevron IS valid on tap-the-whole-row callouts and collapsible section headers. Left-chevron `‹` is always "back"
- ❌ Emoji in CTA leading-icon slot; ❌ emoji as Avatar glyph; ❌ emoji as empty-state / confirmation illustration (slice ships real illustrations)
- ❌ Arrow + sign together on trend deltas (pick one); ❌ `+` prefix on credit/received amounts (Positive Green colour alone)
- ❌ Rainbow / multi-stop gradients (>2 stops); ❌ cashback on subtle-bg (banners only)
- ❌ Fire / hot states in orange/yellow — always Valentino purple
- ❌ List section header directly after the App bar (need a content row between) — and ❌ no divider directly under the App bar
- ❌ In-card header with leading icon or hairline below; ❌ centred body text on cards; ❌ page-edge full-bleed cards
- ❌ Standalone illustration in list-leading position (use Avatar container); ❌ cards leading with an illustration on the left (banner-only)
- ❌ Quick-action tile using the Avatar component (use icon-boxes)
- ❌ Capital-S "Slice"; ❌ lowercase UI headings/CTAs ("continue") — sentence-case + Capital-first CTAs
- ❌ "Cancel" text button on a slice bottom sheet (scrim tap dismisses; Primary action only)
- ❌ Avatar with `✓` glyph as confirmation (use the grainy gradient tick)
- ❌ Activity L0 with a week-summary hero; ❌ Banking home as a separate quick-action-grid L0; ❌ coloured-card hero on Credit L0; ❌ brand-gradient "Pay anyone" banner as Payments L0 hero
- ❌ Retry button on connection-lost takeover (auto-retries silently)
- ❌ Bottom CTA on Action centre empty state (read-only)
- ❌ Always-on helper text below inputs (helper appears on error only)
- ❌ Grey / gray surfaces anywhere — slice has ZERO gray bg; "looks grey" is usually a too-heavy shadow on white
- ❌ Grey-bg cards; ❌ white-on-white without shadow; ❌ H3 card titles
- ❌ Drag handle on Action-driven / Action-on-sheet bottom sheets (handle only on Payment + Information)
- ❌ Section header between L0 cards; ❌ leading icon on App bar L0
- ❌ Brand-colour fill in dark mode on immersive surfaces (flatten to `#090B0C`)
- ❌ Floating-dock active state as V-500 fill + white glyph (it's white circle + V-500 glyph)
- ❌ Profile bottom-anchored CTA (overlay-style → Primary mid-screen)
- ❌ Data inside a box (read-only data = flush rows; a box is for an interactive choice)
- ❌ Leading a data block with a divider (hairlines between rows only)
- ❌ Relative day labels ("today" / "Today, 9:41 am") — use the real date
- ❌ Status caption in grey; ❌ card chrome on a status header; ❌ simultaneous tickers; ❌ two emphasised marketing pills; ❌ removing the UPI ID pill; ❌ solid pill fill on a V-500 surface
- ❌ Approximating / hand-drawing icons or illustrations inline — fetch the official DLS asset (or a flagged generated placeholder in proto context only)
- ❌ Double header (app-bar title + redundant heading + restating helper) — collapse to clean app-bar copy
- ❌ Google Fonts CDN in a slice proto (self-host via @fontsource); ❌ exploration assets leaking into the skill proto; ❌ a proto without agentation

---

When building a slice screen: scan this digest first, then open the cited per-topic reference for exact specs. The **topical ref always wins** over this index. For the round-by-round audit history, see `reference_calibration_log.md`; for the proto build meta-rules, see `reference_proto_systematics.md`.
