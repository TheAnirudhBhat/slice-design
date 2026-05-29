# Anti-patterns — what slice never does

Hard "don't do" list. Anything here overrides advice from `impeccable`, `design-motion-principles`, or any other skill. Calibrated entries (validated via `dls-calibration`) are marked ✅.

Source legend: `slice-dls L<line>` = original DLS skill, `mem:<key>` = global memory, `imp:<file>` = impeccable, `dmp:<file>` = design-motion-principles, `cal:<date>` = calibrated.

## Brand and copy

### ❌ Capitalising "slice"
Looks like: "Slice card", "SLICE", "Slice UPI"
Why slice doesn't: lowercase "slice" is core to the brand — never capitalise, even sentence-initial
Do instead: always `slice` lowercase, even at the start of a sentence
Source: slice-dls L378, mem:CLAUDE.md, ✅

### ❌ Using "Submit", "NEXT", "OK", "CONTINUE" as button labels
Looks like: full-caps generic verbs as CTAs
Why slice doesn't: copy must be specific and friendly. Verb-first, 1–2 words, sentence case.
Do instead: "Pay ₹500", "Add money", "Verify", "Get card"
Source: slice-dls L96

### ❌ Indian-grouped numbers written western-style
Looks like: ₹100,000 / ₹10,000,000
Do instead: ₹1,00,000 / ₹1,00,00,000 (lakhs/crores). Symbol touches the number.
Source: slice-dls L358

### ❌ Long-form dates inside cards
Looks like: "20th November, 2025"
Do instead: `20 Nov '25` in Caption type style
Source: slice-dls L359

## Colour

### ❌ Fire / hot / winning states in orange or yellow
Looks like: 🔥 emoji in orange, gradient orange flames, gold trophy glows on a "hot deal"
Why slice doesn't: brand purple (Valentino) is the slice "fire" colour. User explicitly rejected orange/yellow as "horrible" — base proto had its orange flame assets ripped out.
Do instead: Valentino 500 (`#D30AD7`) on white, or Valentino-Subtle bg (`#FAE2FA`) with Valentino 500 text. Brand gradient (`#D30AD7 → #2B6ACF`) only on Payments L0 surfaces.
Source: slice-dls L356, mem:project_explore_base, cal:2026-05-17 pair 301 (clean FireCard re-pair) ✅

### ❌ Rainbow / multi-stop gradients
Looks like: pink → orange → yellow → green cashback strips, "rainbow" reward backgrounds
Do instead: brand gradient (Valentino → Blue) or solid Valentino-Subtle bg
Source: imp:brand.md + slice judgment

### ❌ Neon glows, drop shadows on text, outer glows
Looks like: glowing button text, glow under amounts, neon outline on cards
Do instead: use DLS elevation tokens — Card / Above / Below — they are 5% opacity black, nothing more
Source: slice-dls L350-353, imp:polish.md

### ❌ Inventing new purples
Looks like: `#C200FF`, `#E040FF`, custom violet-pinks for emphasis
Do instead: Valentino 50 / 400 / 500 / 600 / 700 / 950 only. No `--brand-purple-2`.
Source: slice-dls L367

## Typography

### ❌ Non-Rubik fonts
Looks like: Inter, SF Pro, Roboto, system-ui
Why slice doesn't: Rubik is the slice typeface — full stop. Two weights only: Regular (400), Medium (500).
Do instead: Rubik Regular for body, Rubik Medium for headings/emphasis. Never Bold (700+), never Light (300).
Source: slice-dls L247, L323

### ❌ Mixing case styles in a single screen
Looks like: ALL CAPS section headers next to sentence-case headers
Do instead: Metadata (10pt) is the only uppercase type. Everything else: sentence case.
Source: slice-dls L333

### ❌ Centred body text on cards
Looks like: paragraphs centre-aligned in a content card
Do instead: left-align body text. Centring is reserved for confirmation/celebration screens with a single line.
Source: imp:typography.md + slice judgment

## Layout and rhythm

### ❌ Mixing Bold and List section headers on the same screen
Looks like: one section with grey-bg List header, another with white-bg Bold header
Why slice doesn't: visual fragmentation. Pick one, use it throughout.
Do instead: choose List OR Bold for the whole screen. Bold headers must be preceded by Divider/Big; List headers stand alone.
Source: slice-dls L270, L317

### ❌ Avatar list with full-bleed dividers (or no-avatar list with inset)
Looks like: dividers that line up under the avatar
Do instead: avatar list → Inset divider. No-avatar list → Full-bleed divider. Never mix in one list.
Source: slice-dls L313

### ❌ Cards touching the screen edge (no 24px page padding)
Do instead: L0 cards get 24px horizontal padding via the screen frame. Card internal padding is also 24px.
Source: slice-dls L302, L309

### ❌ 0-gap stacks of L0 cards
Looks like: Large + Medium cards flush against each other
Do instead: 16px gap between cards in an L0 column. Only flat list components (App bar → Header → List item → Divider) stack at 0-gap.
Source: slice-dls L306

## Composition rules (extracted from explore-base discards)

> In-card header rules (no leading icon, no hairline below title) live in `reference_dls_cards.md` L217 — that's their home as a component-level constraint, not duplicated here.

### ❌ "Stats" viz mixing cashback / interest with spends
Looks like: a sparkline that overlays cashback earned + interest gained + outgoing spends on the same axis
Why slice doesn't: stats are a spends-focus view. Cashback and interest have their own surfaces (Rewards, FD details). Mixing them muddies the question the chart is supposed to answer.
Do instead: spends-only sparkline + avg pill. If reward-context is needed, link out to Rewards.
Source: explore-base 8da51e7 "stats: strip cashback + interest from all variants (spends-only focus)"

### ❌ Stats viz cluttered with month chips + per-point amounts + insight row
Looks like: a curve + month chips at the bottom + a tooltip showing every point's ₹ value + an "insight row" describing the trend in copy
Why slice doesn't: the chart already tells the trend. Stacking month chips + point labels + an insight row is three overlapping channels for one signal.
Do instead: curve + pulse marker + one avg pill. The narrative is implicit.
Source: explore-base e12e08c "stats G: simplify — drop month chips + insight row, keep sparkline + avg pill" + 4f5bef5 "drop point amounts + month labels, keep visual curve + pulse"

### ❌ "Invite & earn" surfaced inside Rewards
Looks like: an Invite card sitting in the Rewards section
Why slice doesn't: Invite isn't a reward you've earned — it's a share affordance. It belongs in the footer or a share entry-point, not Rewards.
Do instead: Rewards = Spark + Fire + Monies (rewards you've actually unlocked). Invite lives in footer.
Source: explore-base f50ca71 "rewards: Spark + Fire + Monies (drop Invite — now in footer)"

### ❌ "History" CTA on a Bills section
Looks like: a "View history" link in the bills strip
Why slice doesn't: bill payments are a forward action; "history" pulls users sideways into Activity, which has its own surface.
Do instead: tapping the bill row shows the past payment when relevant; no separate history CTA on the bills surface.
Source: explore-base a6808af "drop history CTA from bills F"

### ❌ Chevron on reward / info / list-style rows
Looks like: a `›` glyph at the trailing edge of a Get assured ₹10 row, an FD info card, or any card-row that already has a button
Why slice doesn't: chevrons are reserved for back navigation. On every other surface they read as noise — the row's tap target is the row.
Do instead: if the row needs an explicit affordance, use a buttonSmall trailing. Otherwise just make the whole row tappable, no glyph.
Source: cal:2026-05-17 — `reward_strip_composition` pairs 101 + 101b + `chevron_in_non_nav` pair 203. 3 signals against chevron on non-nav rows. "no chevron, slice rarely uses chevrons, only in back or else very rare" ✅

### ❌ Cashback / reward summary on a coloured-subtle background
Looks like: a cashback strip with Valentino-50 bg + Valentino-500 text (banner-style)
Why slice doesn't: subtle-bg surfaces (V-50, blue-50, green-50, etc.) are reserved for **banners** — interruptive marketing or system notices. Cashback is a persistent data card, not a banner.
Do instead: cashback uses a white card with the standard Card elevation token. Brand gradient is reserved for L0-hero-status surfaces (full-bleed).
Source: cal:2026-05-17 — `cashback_no_rainbow` reason + `cashback_white_card` pair 205 pick. 2 signals for white card over subtle-bg. "white on white card, the left style is used for banners only" ✅

### ❌ List section header directly after App bar
Looks like: App bar/L0 → List section header (grey #F6F9FC) as the first content row
Why slice doesn't: the grey List-header bg touching the App bar reads as a malformed second nav bar. There must be a content row between them.
Do instead: App bar → Top header / Balance hero / At-a-glance row → [optional Divider/Big] → List header → rows. If you genuinely have no top content, use a **Bold** section header instead — Bold sits on white and doesn't double-up on the nav.
Source: cal:2026-05-17 — `txn_date_in_subtitle` reason (R1) + `compound-activity-list-header-r3-300` pick A (R3, full Activity feed mockup). 2 signals. "this header never comes directly after the app bar" ✅

> Softened 2026-05-17 (R2): "standalone illustration where Avatar should be" was downgraded from anti-pattern to a **preference** after `illustration_in_avatar` pair 204 came back `both_fine`. The guidance ("prefer wrapping illustrations in Avatars") now lives in `reference_dls_avatar.md` instead.

## Components

### ❌ Red-fill Primary button for destructive actions
Looks like: a `Block card` / `Delete` / `Logout` button rendered with red bg + white text as the Primary CTA
Why slice doesn't: slice doesn't use red as a button fill colour. The Primary button is brand-purple full stop. Destructive intent comes through copy + alternative treatment, not by recolouring the Primary.
Do instead: for destructive confirmation, use the **alert-dialog pattern** (small modal) with neutral Primary (V-500) for the destructive verb, OR use a Tertiary outlined button with the destructive verb in red text. The container (sheet/dialog) carries the intent — the button stays brand-purple or neutral.
Source: cal:2026-05-17 — pair 718 B pick + reason "we don't use this CTA colour" ✅

### ❌ Back arrow (←) for navigation
Looks like: a leading ← arrow icon in the App bar/Standard
Why slice doesn't: slice uses a **chevron** (‹) for back navigation, not an arrow.
Do instead: leading icon on App bar/Standard is the chevron ‹ (or whatever the slice icon set's "back" glyph is — chevron-shaped, not arrow-shaped).
Source: cal:2026-05-17 — pair 604 reason "our back is a chevron not an arrow" ✅

### ❌ Tooltip with an arrow tail
Looks like: a tooltip rendered with a triangular arrow pointing at its target
Why slice doesn't: slice tooltips don't have arrows. Position alone communicates the target.
Do instead: render the tooltip pill on its own (8px padding, 8px radius), positioned above or below the target with normal gap. No triangle tail.
Source: cal:2026-05-17 — pair 607 reason "tooltip without arrow" ✅

### ❌ Avatar component for quick-action icon tiles
Looks like: using `Avatar M-40 / Subtle V-50` as the container for a quick-action icon (Send, Bills, Mobile, etc.)
Why slice doesn't: quick-action tiles look like avatars but they're not — they're **icons in a container**, not identity avatars.
Do instead: render a white-bg container with a subtle stroke (`outline-subtle` border, `Radius Circle`, 48×48), with the line-icon centred in slice's brand purple (V-500). Avatars carry identity (initials, photo, brand glyph); icon-boxes carry actions.
Source: cal:2026-05-17 — pair 619 reason "avatar colour should be white with subtle stroke, they are icons in the avatar box, not avatars exactly" ✅

### ❌ Tabs as a navigation/filter pattern
Looks like: a row of underlined tab labels at the top of a list view, or a Tabs component instance
Why slice doesn't: slice doesn't use tabs. For filtered views, slice uses **pills** (segmented control — slate-10 track + white-thumb on active, V-500 text on active). The Tabs components in the legacy skill registry (`2 Tabs`, `3 Tabs`, `Tabs Mode Bottom Bar`) exist but are not the active pattern.
Do instead: use a pill segmented control (slate-10 bg, white thumb on active state, V-500 text on active). For top-level navigation across pods, use the Bottom nav.
Source: cal:2026-05-17 — pair 504 reason "no tabs in slice, we only have pills, but if it did have tabs they would look something like the right one" ✅

### ❌ Hand-built buttons / hand-built cards
Looks like: a `<button>` styled with Tailwind classes to "look like" a DLS button; a div with custom shadow and radius pretending to be a Card
Why slice doesn't: every DLS component has variants, states, and motion baked in. Hand-rolled = misses pressed/loading/disabled states and drifts over time.
Do instead: import via `importComponentSetByKeyAsync` (Figma) or use `src/dls/primitives.jsx` (web protos). For protos see `reference_web_proto.md`.
Source: slice-dls L248, mem:feedback_reuse_existing, ✅

### ❌ "View all" CTA inside List Item rows
Looks like: a trailing chevron link saying "See all" on every row
Do instead: section header CTA (Bold-with-CTA variant), not a row-level affordance
Source: slice-dls L62

### ❌ Importing new icon packages
Looks like: `import { CreditCard } from "lucide-react"`, Heroicons, Phosphor
Do instead: every icon must come from the Figma payload. If a Figma localhost source is available, use it directly.
Source: slice-dls L401, mem:feedback_assets

## Animation

### ❌ Bounce-on-tap / iOS-style rubber-band on cards
Looks like: cards scale 1 → 1.05 → 0.98 → 1 on press
Do instead: 160ms ease-out opacity dim (0.7 alpha) — that's the slice "press" feedback
Source: dmp:emil-kowalski.md + slice judgment, see `reference_motion.md`

### ❌ Infinite parallax, spinning logos, perpetual ambient motion
Looks like: a logo that rotates forever in the corner, background that scrolls infinitely
Why slice doesn't: ambient motion costs battery and attention budget. Motion must serve a moment, then stop.
Do instead: choreographed reveals tied to entry/state-change moments (see `reference_motion.md`). Skeleton shimmer is the only allowed infinite loop.
Source: dmp:jhey-tompkins.md + slice judgment

## Data display

### ❌ "Monthly SIP" or active-SIP filters in mutual-funds sections
Looks like: a chip filter showing "Monthly SIP: ₹5,000"
Why slice doesn't: user runs monthly **manual** deploys. SIPs are not part of how the MF flow is framed.
Do instead: show invested-amount + value + XIRR; let category mix surface from manual deploys
Source: mem:feedback_no_sip_in_mf, ✅

### ❌ Masking card numbers / accounts in full
Looks like: `XXXX XXXX XXXX XXXX`
Do instead: card numbers `xx1234`; accounts last 4 digits only
Source: slice-dls L360

## Cross-skill conflicts (slice-design always wins)

| Other skill says | slice-design says | Why |
|---|---|---|
| impeccable: "use color sparingly, prefer neutrals" | use brand Valentino confidently on hot/winning states | brand expression matters; the system reserves grey for chrome, not emphasis |
| design-motion-principles: "spring physics for delight" | use 4 named easings (`reference_motion.md`); springs only on `bling` keyframe | consistency across the app > per-screen delight |
| frontend-design: "consider distinctive typography pairings" | Rubik only, 2 weights | brand is the typography |
| brand-guidelines (Anthropic): "Styrene / Tiempos" | irrelevant — that's Anthropic, not slice | wrong brand |
| frontend-design / impeccable: "emoji as casual visual anchors OK" | slice uses **line icons only** inside Avatars; never emojis | brand visual consistency; emoji rendering varies by OS |

### ❌ Emoji in CTA buttons
Looks like: a Primary or Tertiary button with a leading emoji glyph (📷 Upload PAN, 🔥 Earn fires)
Why slice doesn't: same rule as Avatars — emojis render differently per OS and break brand consistency. CTAs use **slice line icons** as leading-icon glyphs, not emoji.
Do instead: leading-icon slot on Button uses a slice line-icon SVG. In protos where the icon set isn't available, use a placeholder line-stroke SVG or no icon — never an emoji.
Source: cal:2026-05-17 — pair 921 reason "no emoji in CTA, only icons" ✅

### ❌ Arrow + sign together on trend deltas
Looks like: `↑ +12%` or `↓ −8%` — arrow glyph alongside a +/− sign on the same number
Why slice doesn't: redundant — the arrow already encodes direction. Combining them creates visual noise.
Do instead: pick one. **Arrow alone is preferred** (`↑ 12%`). If you must use sign without an arrow, then no arrow (`+12%` / `−8%`).
Source: cal:2026-05-17 — pair 923 reason "arrow and Plus should not be used together, arrow is preferred over +/-" ✅

## 2026-05-18 batch (R12 + R13 tune triage)

### ❌ Grey-background card on a white page (Action centre / notifications)
Looks like: card with `var(--slate-10)` fill on a white parent surface.
Why slice doesn't: visually muddy on white; the card needs its own chrome (outline-subtle border for Action centre, shadow elevation elsewhere) to read as a contained surface.
Do instead: white card + 1px outline-subtle border (Action centre cards) OR white card + shadow elevation token (everywhere else). Never grey-fill.
Source: cal:2026-05-18 — review-1205 reason "we don't do grey backgrounds, white on white with shadow".

### ❌ White card on white background without shadow chrome
Looks like: white card on a white page with no border AND no shadow — the card has no edge against the page.
Do instead: shadow elevation (default surface lift) OR outline-subtle border (Action centre quiet variant). Pick one — bare white never works.
Source: cal:2026-05-18 — review-1205.

### ❌ H3 title inside an Action centre / notification card
Cards in the Action centre are LIST ITEMS in disguise — the page header is the H3 hero. Card title = **H4 (16/20 Medium)**, not H3. Reduces visual weight, lets the stack breathe, and matches list-row hierarchy.
Source: cal:2026-05-18 — review-1205 reason "the card heading is too big".

### ❌ Bottom sheet with a drag-handle / dragger / hairline pill at top
Reconfirmed (R12-1206 + earlier rounds): slice has NO handle on bottom sheets. Sheet dismisses via scrim tap. No drag affordance.
Source: cal:2026-05-18 — review-1206 reason "we don't keep a drgger".

### ❌ "Confirm payment" bottom sheet as a pattern
Slice has no confirm-payment bottom sheet. Payment confirmation lives on a full screen or inline review row. Bottom sheets carry transient single-action prompts (e.g. "Continue with Aadhaar?", "Switch account?"), not financial commitments — those are too important to be dismissable via a scrim tap.
Source: cal:2026-05-18 — review-1206 reason "we never have a confirm payment bottomsheet".

### ❌ Pills row directly under the search bar on Activity L0
Filter pills below the search bar are NOT a slice pattern today. Activity L0 uses search bar + **circular filter icon button trailing** (slate-10 bg, V-500 line icon).
"Pills could be a future pattern" but is not calibrated. Stick to icon button until calibrated.
Source: cal:2026-05-18 — review-1203 reason "we don't have pills under search till now".

### ❌ slice-currency pill with a separate Avatar badge alongside it
The slice-currency pill (Rewards L0 trailing slot) has the Avatar / glyph **inside the pill at the leading edge** — not as a separate floating badge next to a value pill.
Anatomy: `[V-500 Bold avatar 24×24 ₹-glyph] [amount value text]` — single radius-100 pill with outline-subtle border.
Source: cal:2026-05-18 — review-1202 reason "the circle should be inside the pill".

### ❌ Inset divider between consecutive avatar-leading list items of the same type
Flipped 2026-05-18. Earlier rule said "avatar list → inset divider". Override: slice does **not** use a divider between consecutive same-type avatar-leading rows — the avatar itself + 12px row gap is enough visual separation. Inset divider IS valid when the list mixes leading types (avatar / icon / empty in one stack), but mixing types is itself uncommon. Default to no divider in same-type lists.
Source: cal:2026-05-18 — tune-1303 reject reason "we don't do divider between avatar list items".

### ❌ Confirmation tick stroke too thin
The textured grainy gradient success tick (~120px) needs a **stroke thickness of 8px**, not 6. The check needs visual weight on the noisy gradient field to stay legible.
Source: cal:2026-05-18 — review-1201 reason "tick stroke should be thicker".

### ❌ Retry button on connection-lost takeover
Slice auto-retries in the background when connection drops. Showing an explicit "Retry" CTA puts work on the user that the system handles itself. Connection-lost = full-screen takeover with illustration + title + body only, no action.
Source: cal:2026-05-21 — r14-empty-1403.

### ❌ Bottom CTA on Action centre / Notifications empty state
The Action centre is read-only. An empty state there does NOT carry a CTA (no "View past notifications", no "Get notified", etc.). The illustration + "All caught up" copy is the whole state.
Source: cal:2026-05-21 — r14-empty-1401 + r14-empty-1400 reason.

### ❌ Always-on helper text below form inputs
Helper text below input fields stays hidden until the user is in error. Always-on helper crowds the form and trains users to ignore the caption row. Field defaults to clean; error state introduces the red caption.
Source: cal:2026-05-21 — r14-empty-1405.

### ❌ Capitalised pod titles
Pod titles (Activity, Banking, Explore, Payments, Credit, Action centre, Rewards) follow the slice brand-voice rule and render in **lowercase**: "activity", "banking", "explore", "payments", "credit", "action centre", "rewards". Mirrors the lowercase-"slice" rule — slice's brand voice extends to pod names.
Source: cal:2026-05-21 — r14-empty-1402 reference frame showing "activity" lowercase.

### ❌ Leading icon on a Primary CTA
Primary CTAs in slice are **verb + value** text only ("Pay ₹500", "Add money", "Continue"). Don't insert a leading icon (no tap-to-pay glyph, no card icon, no arrow). The verb-plus-value label is itself the affordance. Adding an icon creates visual noise that competes with the text and asks the user to parse two signals.
Exceptions:
- Icon-only FAB-style buttons (no label), where the icon IS the label
- Tertiary "Share receipt" / "Download" etc. where a leading icon supports a secondary action
Primary fill = label only.
Source: cal:2026-05-21 — r15-icon-1502 pick neither (both white and V-500 leading-icon styles rejected → the leading icon itself is the issue).

### ❌ Grey/secondary background on page-level surfaces
Looks like: `#F6F9FC` / Slate-10 as the main page background behind white cards
Why slice doesn't: "white on white" — slice uses white backgrounds with shadow-elevated cards. Grey backgrounds feel like a system settings page, not a fintech product. User: "slice doesn't do grey backgrounds".
Do instead: white `#FFFFFF` page background + Card elevation shadow for separation.
Source: cal:2026-05-27 — pair 1607 A + reason "white on white, slice doesn't do grey backgrounds" ✅

## 2026-05-28 batch (R18 — L0-canonical-reference-frame sweep)

Patterns extracted from the DLS 2.0 working copy L0 page (node `885:19528`), Light + Dark, across all 6 pods. Only rules visible in 2+ pods are promoted to anti-patterns. Source frames cited inline.

### ❌ List or Bold section header between L0 cards
Looks like: an `EXPLORE MORE` UPPERCASE List header (slate-10 bg) sitting between the Recharge card and the 2×2 grid on Explore L0. Or a Bold H4 header `Your accounts` between the Savings card and the FD card on Banking L0.
Why slice doesn't: pod L0 surfaces use the **cards themselves as the structure**. Section headers are an L1+ pattern (transaction lists, settings groups). The canonical L0 frames for Banking, Explore, Credit are entirely card-stacked with NO intermediate headers. Headers between cards introduce a list-mental-model where there isn't one.
Do instead: card titles (H4 inside each card) carry the section label. If two cards need to be grouped, use card-internal hierarchy (caption + amount + sub-row), not an external header.
Source: cal:2026-05-28 — Banking L0 (885:19757), Explore L0 (885:19759), Credit L0 (885:20015). 3 pods, no L0 section headers anywhere ✅

### ❌ Leading icon on App bar L0
Looks like: a hamburger menu icon, slice logo, or back chevron in the leading slot of App bar L0
Why slice doesn't: App bar L0 carries the **pod title at the leading edge** — period. The trailing slot holds utility (optional, max 2 items: utility icon + Avatar). A leading icon on App bar L0 reads as App bar Standard chrome, which is for L1+ flows that need back-navigation.
Do instead: pod title left, trailing slot for utility + Avatar. If a leading icon feels needed, you're probably building an L1 — switch to App bar Standard.
Source: cal:2026-05-28 — Banking, Explore, Payments (no App bar at all, brand-immersive), Credit, Activity all show NO leading icon on the L0 chrome. 5 pods ✅

### ❌ Brand-colour fill carrying into dark mode
Looks like: the Payments L0 Valentino-500 full-bleed page bg, rendered as a slightly-darker Valentino-700 or Valentino-950 fill in dark mode
Why slice doesn't: brand-immersive surfaces FLATTEN to pure black in dark mode. The brand fill is light-mode-only. In dark mode, the brand colour survives only as text + active-glyph accents — never as a page fill.
Do instead: dark-mode page bg = `#000000`, white text, outline-subtle pills (transparent fill + white-subtle outline), V-500 reserved for the active floating-dock glyph and link text.
Source: cal:2026-05-28 — Payments L0 light (885:19901) vs dark (1967:18266). The V-500 page fill becomes pure black ✅

### ❌ Floating dock active state with V-500 fill background
Looks like: the active bottom-nav icon button rendered as a V-500 solid circle with white glyph inside
Why slice doesn't: the floating dock active state is **white solid circle + V-500 glyph inside** — inverted from a fill-bg pattern. Inactive icons are semi-transparent slate with slate glyph. The white pop draws the eye without competing with brand surfaces below.
Do instead: active = white circle + V-500 glyph; inactive = semi-transparent slate circle + slate glyph.
Source: cal:2026-05-28 — Banking, Explore, Payments, Credit, Activity all show identical white-circle active pattern. 5 pods ✅

### ❌ Bottom-anchored Primary CTA on Profile / overlay-style screens
Looks like: an `Invite & earn ₹150` Primary button docked at the bottom of the Profile screen above gesture nav
Why slice doesn't: Profile is **overlay-style** (X close, no nav, mid-screen CTA). The Primary sits **mid-screen below the centred photo + name block**, not bottom-anchored. Bottom-anchoring is the L1+ form/flow pattern — Profile isn't a flow, it's a personal-page overlay.
Do instead: full-width Primary CTA positioned just below the name/phone block in the centred stack. Settings list flows below the CTA. No bottom dock.
Source: cal:2026-05-28 — Profile reference (2486:75064) ✅

## Reverifications (2026-05-28 against canonical L0 frames)

### Downgrade: ❌ Capitalised pod titles → BOTH FORMS VALID (R14 rule overridden)
Earlier rule (cal:2026-05-21 r14-empty-1402): pod titles always lowercase.
Override (cal:2026-05-28 R18): The canonical L0 reference frames (`885:19758` Light, `2017:5795` Dark) render pod titles **CAPITALIZED** — `Banking`, `Explore`, `Credit`, `Activity`. 4 visible pod titles, all capitalized.
The R14 lowercase reading came from a single empty-Activity frame. Treating that as system-wide was extrapolation. **Capitalised pod titles are valid and probably the dominant form on filled L0s. Lowercase is valid on empty/illustrative states.** Don't ban either.
The lowercase rule on the slice word ITSELF still stands — that's brand voice, not pod-title casing.
Source: cal:2026-05-28 — L0 canonical reference frames vs cal:2026-05-21 single frame. Canonical wins.

### Update: Activity L0 filter icon button anatomy
Earlier doc (R12, 2026-05-18): slate-10 bg + V-500 line icon.
Override (cal:2026-05-28 R18): the canonical Activity L0 (node `885:20122`) shows **white fill + outline-subtle border + slate glyph**, NOT slate-10 + V-500.
The earlier R12 doc was likely from an iteration variant. Promote the canonical form.
Source: cal:2026-05-28 — Activity L0 reference frame ✅

## R19 batch (2026-05-28) — multi-file sweep additions

From sweeping 5 product files + DLS molecules + icons/illustrations. Only patterns visible across multiple frames OR canonical references promoted.

### Motion anti-patterns (from emil-design-eng)

#### ❌ `transition: all` (kitchen-sink CSS transition)
Looks like: `transition: all 300ms ease` on every styled element.
Why slice doesn't: `all` transitions every property — including `background`, `color`, `padding`, `width`, `height`. The non-`transform`/`opacity` properties drop frames and you can't tune individual easings. Also catches state changes you didn't mean to animate.
Do instead: specify exact properties. `transition: transform 200ms ease-out, opacity 200ms ease-out`. One property per transition declaration, with intent.
Source: cal:2026-05-28 R19 — emil-design-eng skill ✅

#### ❌ `transform-origin: center` on popovers (non-modal)
Looks like: a popover (tooltip, dropdown, action pill morph) scales in from its centre instead of from the trigger.
Why slice doesn't: the user's eye is on the trigger; the popover should grow from there. Scaling from centre breaks spatial continuity — the popover feels disconnected from what was tapped.
Do instead: set `transform-origin` to match the trigger position. For Radix UI: `var(--radix-popover-content-transform-origin)`. For Base UI: `var(--transform-origin)`.
**Exception: modals.** Modals should keep `transform-origin: center` because they aren't anchored to a specific trigger — they appear centred in the viewport, so origin-centre matches the spatial intent.
Source: cal:2026-05-28 R19 — emil-design-eng skill ✅

#### ❌ Animation on keyboard-initiated actions
Looks like: a 250ms slide-in animation on opening a command palette via `⌘K`. A 200ms fade on toggling a filter via keyboard.
Why slice doesn't: keyboard actions are repeated tens / hundreds of times daily by power users. Any animation makes them feel slow, delayed, and disconnected from the keystroke. The user pressed a key — the result should appear instantly.
Do instead: skip animation entirely on keyboard-initiated state changes. Mouse / touch can keep the animation since those interactions are slower and the animation gives feedback.
Source: cal:2026-05-28 R19 — emil-design-eng skill (Raycast / command palette precedent) ✅

#### ❌ Same enter/exit timing
Looks like: a bottom sheet that takes 400ms to rise AND 400ms to dismiss.
Why slice doesn't: the user is deciding when entering (slow is fine) and the system is responding when exiting (slow feels sluggish, like the system isn't listening). Asymmetric timing — slow press, fast release — matches the cognitive model of decide-then-act.
Do instead: enter at 200-400ms, exit at 200-280ms (faster). Slice's existing Sheet present (280ms `out`) + Sheet dismiss (240ms `out-fast`) already follows this — apply the pattern to any new transition.
Source: cal:2026-05-28 R19 — emil-design-eng skill ✅

#### ❌ All list elements appearing at once
Looks like: a list of atom cards all fading in simultaneously on page load.
Why slice doesn't: simultaneous reveals feel like a "pop", not a flow. Users can't track which item arrived first; the page feels heavier than it is.
Do instead: stagger 30–80ms per item. Cascading reveal feels natural and lets the eye follow a path through the list.
Limit: stagger > 80ms per item makes the list feel broken (already in `reference_motion.md`'s "What we never use" table). 30–80ms is the sweet spot.
Source: cal:2026-05-28 R19 — emil-design-eng skill ✅

### Recipe-level anti-patterns

#### ❌ Status caption rendered in secondary grey on txn detail
Looks like: the explanatory caption on a Pending / Failed / Initiated transaction detail page rendered in `text-secondary` slate grey to "calm it down".
Why slice doesn't: the status colour IS the affordance — it tells the user instantly whether the screen is OK / waiting / broken without reading the words. Greying out the caption decouples the explanation from the status; the user has to read the text to figure out what state they're in. The status colour communicates state instantly; the caption explains the state. Both should be the same colour.
Do instead: caption text inherits the status colour (amber-700 for Pending, red-600 for Failed, blue-600 for Initiated). Success carries no caption — the H2 title `Paid ₹X` is the receipt.
Source: cal:2026-05-28 R19 — AVC `2410:22541` 6 frames (3 states × Light/Dark) all use status-colored captions ✅

#### ❌ Card chrome on the txn detail status header
Looks like: wrapping the status title + status icon block in a white card with shadow elevation.
Why slice doesn't: the status header is page-level hero content, not a card. Wrapping it in card chrome introduces a second container layer that competes with the actual Details card-section below — the eye gets confused about which surface is the "thing".
Do instead: status header sits flush on the page bg with 24px horizontal padding. The Bold Divider (8px slate-10 strip) below it carves the section break — no card chrome needed.
Source: cal:2026-05-28 R19 — AVC `2410:22541`, all 12 detail frames show flush page-level status header ✅

#### ❌ Two simultaneous tickers animating on the action pills row
Looks like: the fire-count pill and the monies-count pill both incrementing at the same time after a payment confirmation.
Why slice doesn't: parallel value changes are visually noisy and the user can't track either. The eye gets pulled between competing motions.
Do instead: tickers run sequentially. Second ticker waits for first to complete its animation before incrementing.
Source: cal:2026-05-28 R19 — Valentino `8772:12216` (action pills + tickers behavior spec) ✅

#### ❌ Two emphasized marketing pills on the action pills row
Looks like: both `New spark live` and `Win up to ₹100` rendered with highlighted fill (~22% white).
Why slice doesn't: priority dilution. The whole point of the highlighted fill is "this one is more important right now." Two highlighted pills means neither is the priority — the user can't decide which to tap first.
Do instead: max 1 marketing pill emphasized at a time. With 2 marketing pills, only highest-priority gets highlighted fill (~22%); others stay at default fill (~10–14%).
Source: cal:2026-05-28 R19 — Valentino `8772:12216` ✅

#### ❌ Removing the UPI ID pill from the action pills row
Looks like: the action pills row shows only product pills (monies, fires) — UPI ID pill missing.
Why slice doesn't: UPI ID pill is the identity anchor. Without it, the user loses the "this is your account" signal during the payment-entry moment — at exactly the time identity confusion matters most.
Do instead: UPI ID pill always present. Product/marketing pills can dismiss; UPI cannot. When all secondary pills dismiss, UPI re-expands to full 195 width and centres in the row.
Source: cal:2026-05-28 R19 — Valentino `8772:12216`, anchor rule confirmed in 30+ frames ✅

#### ❌ Solid white or V-500 fill on action pills
Looks like: an action pill rendered with a solid white background OR a Valentino-500 fill against the V-500 page bg.
Why slice doesn't: solid fills on the V-500 brand-immersive surface compete with the keypad numerals (white) and the Request/Transfer Tertiary pills (transparent-white-outline). Solid V-500 fill is invisible against V-500 page bg.
Do instead: translucent-white fill (~10–14% default, ~22% highlighted). Tints the brand colour instead of competing with it.
Source: cal:2026-05-28 R19 — Valentino `8772:12216` ✅

### Reverification updates

#### Soften / scope: brand-colour fill in dark mode (refines R18)
Earlier R18 rule: "brand-immersive surface FLATTENS to black in dark mode" — promoted as an absolute.
**Scope clarification (R19)**: that rule applies only to **full-bleed brand surfaces** (the entire page is brand colour, like Payments L0). For **smaller brand-tinted callouts** (Spark Offer pill, in-card V-50 callout rows), dark mode uses **deep V-700/950 fill**, NOT pure black.
Why: a callout's purpose is to read as a brand moment within surrounding chrome. Flattening to black loses the brand signal; carrying light V-50 fill makes it invisible on dark page. Deep V-700/950 keeps brand identity while reading against dark chrome.
Source: cal:2026-05-28 R19 — AVC Spark Offer pill light (`2410:40749`) vs dark (`2410:125949`), 2 paired observations ✅

#### Reverify: Tabs are valid as a DLS molecule (downgrade ban)
Earlier rule (`SKILL.md` L112, R11 calibration): "Tabs as a navigation/filter pattern" is BANNED — slice uses Pills.
**R19 finding**: the canonical DLS 2.0 file calls the segmented control "Tabs" (page `486:2793`). The component itself IS slice's pill segmented control — just named "Tabs" in the design system file.
**Recommend**: keep the ban on **iOS-style underlined tab bars** (which IS what the ban was really about), but acknowledge the DLS molecule is named Tabs. Add a clarifying note in `reference_dls_pills.md` and `reference_dls_tabs.md` cross-referencing each other.
Source: cal:2026-05-28 R19 — DLS molecules sweep ✅

#### Reverify: Tooltips CAN have arrow pointers (invert earlier rule)
Earlier rule (cal:2026-05-21 R6): "slice tooltips don't have arrow pointers" — banned the triangular tail.
**R19 finding**: the canonical DLS 2.0 Tooltip component (page `352:162`) shows tooltips with **white triangle pointers in 6 orientations** (top-left/top/top-right/bottom-left/bottom/bottom-right). The arrow IS canonical in DLS.
**Recommend**: **invert the rule**. Tooltips have arrow pointers. The R6 calibration was probably contextual to a specific in-product surface (likely info-icon tooltips inline with text where the pointer competed with the text baseline). Update `reference_dls_tooltip.md` to show arrows + note the historical R6 context.
Source: cal:2026-05-28 R19 — DLS molecules sweep, canonical Tooltip page ✅

#### Reverify: Chevron on collapsible section headers is valid
Earlier rule (`reference_anti_patterns.md` L122 + SKILL.md L96): "chevron on section headers banned" — applies to navigation/go-to-detail rows.
**R19 finding**: the canonical Section header component (page `686:5876`) documents a **Bold + chevron variant** for collapsible groups. The chevron rotates 180° on expand.
**Recommend**: keep the ban scoped to "chevron as go-to-detail navigation affordance"; **explicitly allow chevron-as-collapse-toggle on collapsible Section headers**. Clarification, not inversion.
Source: cal:2026-05-28 R19 — DLS molecules sweep ✅

### Flagged for calibration (not yet promoted)

#### ⚠️ 2-tone product-mark title (slice atom in black + V-500)
The Atom Feature PDP hero shows `slice atom` as a 2-tone title: `slice` in text-primary black, `atom` in V-500. This is a NEW treatment that **uses V-500 for body/title text colour**, not just CTAs/accents.
Could be: (a) a sanctioned new exception for sub-product brand-marks on FTUX hero screens, or (b) a 1-off that should be conformed to single-tone titles.
**Flag for next calibration round.** Treating as canonical for Atom FTUX only until confirmed.
Source: cal:2026-05-28 R19 — Atom `7949:50755` (single frame)

#### ⚠️ User-uploadable thumbnail with edit pencil badge
The Custom atom screen shows a photo placeholder (cats) with a small edit-pencil badge bottom-right — a "tap to upload your own image" affordance not documented elsewhere.
**Flag** for confirmation. Likely a new pattern needed for any user-customised illustration tile.
Source: cal:2026-05-28 R19 — Atom `8273:26635` (single frame)

---

## R23 fix-it pass — proto anti-patterns (2026-05-29)

Failure modes from a live user-review of `slice/projects/slice-app-proto`. Each is a **shipped mistake** that needs an explicit guardrail. These are now standing rules — any future proto build that hits one is a regression, not a new feature.

### ❌ Sticky-fade-in-non-flex hack
**Activity L0 first pass:** placed bottom fade INSIDE the scroll container with `position:sticky; bottom:0; marginTop:-120; order:999`. Parent wasn't flex, so `order` was a no-op. The fade rendered between search row and txn list instead of at the bottom of the viewport.
**Rule:** bottom fades are `position:absolute; left:0; right:0; bottom:0; height:140; pointer-events:none; zIndex:5` SIBLINGS of the scroll container, INSIDE a `position:relative` page wrapper. NEVER inside the scroll. See `reference_proto_patterns.md` § "BottomFade overlay".

### ❌ Asset-extracted-but-not-verified
**Banking L0 first pass:** curl'd `monies_glyph.png` from Figma node, shipped it at 21×36 as the inline brand mark. The PNG was 1.6KB — empty/transparent. Rendered invisible against white card. User: "monies logo missing."
**Rule:** after any asset extraction:
1. File size sanity check — < 2KB for a non-trivial glyph is a red flag.
2. Read/preview before referencing in JSX.
3. If verification fails, **inline an SVG approximation** rather than ship the broken PNG. For brand marks, a hand-built SVG with V-500 + accent is better than an invisible asset.
4. Successful `curl` ≠ usable asset. Verify visually.

### ❌ Hardcoded white page-bg on L0 component
**Banking L0 first pass:** `App.jsx` set per-pod `PAGE_BG`, but the Banking L0's outermost div hardcoded `background:'#FFFFFF'` and overrode it. Card drop-shadows (`0px 2px 32px rgba(0,0,0,0.05)`) drew on pure white and were invisible.
**Rule:** when App.jsx owns per-pod page bg, the L0 component's outermost div is `background:'transparent'`. ONE layer owns the bg. Both → override race → wrong layer wins. See `reference_proto_patterns.md` § "Page bg + status variant map".

### ❌ Status-bar element coloring via center-point sampling
**StatusBar.jsx first pass:** `Math.round((viewportX - currentX) / pageWidth - 0.5)` picked the page whose center was nearest each element's center. Mid-drag from white → Pay (V-500), icons stayed dark until past midpoint — dark icons on half-V-500 bg, unreadable.
**Rule:** color decided by **span overlap**. Define `[elemL, elemR]`, check overlap with every page, return `LIGHT` if ANY overlapping page is `'dark'` variant. Bias toward immersive visibility. See `reference_proto_patterns.md` § "Status bar element coloring uses SPAN-OVERLAP".

### ❌ Removed canonical chrome during refactor without screenshot diff
**Activity L0 refactor:** a broken gradient overlay covered the SearchBarRow. The row rendered in DOM but was visually obscured. User: "you removed the search bar in the filter."
**Rule:** every L0 refactor ends with a side-by-side visual check against the canonical Figma frame. List the canonical chrome elements (app bar / search / filter pill / action centre / list / fade) → walk down the list → confirm each visible. Anything missing or mispositioned → restore before claiming done.

### ❌ Center-point flex centering with transform-scale
**App.jsx earlier pass:** `display:flex; align-items:center; justify-content:center` on a 100vw/100vh root with a transformed phone chassis inside. The layout box (un-scaled) didn't match the visual box (scaled). Flex centered the layout box → visual chassis offset on certain aspect ratios.
**Rule:** for "always centered, scales to viewport" phone shells, use `position:fixed; inset:0` + a child anchored at `top:50% left:50%; transform: translate(-50%,-50%)` sized to the SCALED dimensions, with the actual `scale()` on a grandchild sized to the UN-scaled dimensions. Three layers, NOT two. See `reference_proto_patterns.md` § "Centering pattern (R23 fix-it)".

### ❌ Big-amount type tokens drift in both directions
**Banking L0 first pass:** Savings hero amount at `32px` instead of canonical 48/56M -0.48px (Display Small). After fixing Banking to 48, Explore felt "smaller" because Explore was ALSO drifted off-canonical in the other direction — its medium-card titles were `T.h3` 20/24M instead of canonical 16/20M H4.
**Rule:** for every L0 build, FIRST set type tokens from the canonical Figma frame's text styles dump (the `get_design_context` response includes a `These styles are contained in the design` block). Match exact px values BEFORE writing components. Token name "h3" in your code is meaningless if its value doesn't match canonical.

### ❌ Failed/pending txn states rendered as full-avatar replacements
**Activity L0 first pass:** failed txn → solid RED circle + white X as the avatar. Pending → white circle with amber RING + `!` as the avatar. Both jarring, neither is canonical. The canonical DLS pattern: keep the regular avatar (photo / initial monogram / icon), add a **16×16 status badge bottom-right corner** of the avatar with a 2px page-bg border to ring it. Subtitle text turns red/amber to match.
**Rule:** payment state badges are CORNER OVERLAYS on the regular avatar, never replacements. Maintains identity continuity (you still see who/what), adds the state signal as a secondary glyph.

These patterns make the proto + the skill move together. If we hit one of them again, fix the proto AND surface why the skill didn't catch it.

---

## R23 fix-it-2 retractions (2026-05-29, same day)

Within hours of promoting the R23 fix-it patterns above, a live user review surfaced that **three of the rules were wrong** — they fixed the symptom but introduced new craft regressions. Captured here as explicit retractions so the WRONG rules don't get re-applied.

### 🔁 RETRACTED — "Hardcoded white page-bg on L0 components" (anti-pattern)
**The wrong rule was:** L0 outermost div must be `background: 'transparent'` because the wrapper bg is slate-10 (so the shadows show).
**Why retracted:** the underlying slate-10 page bg was wrong. slice has **zero gray surfaces**. All non-immersive pods are pure WHITE `#FFFFFF` — no exceptions for "shadow contrast". Card drop-shadows are subtle on white BY DESIGN.
**Replacement rule:** App.jsx `PAGE_BG[pod]` = `#FFFFFF` for Banking/Explore/Credit/Activity. L0 outer div can be `'transparent'` OR `'#FFFFFF'` — both are equivalent now. Don't introduce slate / off-white tints to "improve" shadow visibility.

### 🔁 RETRACTED — "Status-bar coloring via center-point sampling" (anti-pattern)
**The wrong rule was:** status icons should flip to LIGHT whenever ANY part of the element overlaps a `dark` (Valentino) page during drag. Center-point sampling was wrong because it "flips at midpoint".
**Why retracted:** the span-overlap algorithm made the icons on the WHITE side become white prematurely — they vanished against the still-visible white half while only a sliver of Valentino had entered. User wanted: icons stay DARK while their CENTER is over white; flip to WHITE the moment their CENTER crosses onto Valentino.
**Replacement rule:** center-point sampling IS the correct algorithm. Pick the page whose viewport span contains the element's center x-coordinate. Element color = that page's variant. Hard cut at the page boundary. See `reference_proto_patterns.md` § "Status bar element coloring uses CENTER-POINT".

### 🔁 RETRACTED — "Asset-extracted-but-not-verified → inline SVG fallback" (rule)
**The wrong rule was:** if a Figma asset extraction looks broken (empty PNG, transparent), inline an SVG approximation rather than ship a broken file.
**Why retracted:** Figma is the source of truth. Approximating with inline SVG drifts off-canonical (wrong geometry, wrong colors, looks visibly different from the real DLS asset). The user could tell.
**Replacement rule:** if an extracted asset doesn't render, **re-fetch via a different method** — typically `get_screenshot` of the same node ID returns a clean rendered PNG when the `get_design_context` asset URL returned an empty file. Worked for monies brand mark: `get_screenshot` of node `886:24912` returned a valid 21×37 RGBA PNG where the first-pass URL had returned an empty file. NEVER approximate canonical Figma assets with inline SVG.

### New rule promoted (R23 fix-it-2)

#### ❌ AppBar profile avatar with outer ring / 48×48 wrapper / 1px subtle border
**What happened:** AppBar L0 was rendering the photo avatar inside a 48×48 outer container with the 40×40 inner having a `1px solid rgba(0,0,0,0.05)` border. User: "the profile avatar should be 40, and no outline, or ring outside, the image should be 40 x 40."
**Rule:** the AppBar avatar is a 40×40 photo with `border-radius: 9999`, NO border, NO outer wrapper, NO ring. The photo IS the tap target. The 48×48 hit-area pattern applies to ICON buttons (eye, search, filter) — it does NOT apply to the avatar.

### Meta-learning from fix-it-2

The fix-it pass shipped THREE wrong inversions inside 24 hours. Pattern:
- Each "fix" extrapolated from a real problem (shadows hard to see, icons unreadable during drag, asset shipped broken) to a wrong solution (gray the page, flip to LIGHT eagerly, fall back to SVG).
- The right answer in each case was MORE faithful to slice DLS, not more clever:
  - shadows on white → live with the subtlety, slice's design language IS that subtle
  - status icons during drag → simple center-point sampling, the hard cut at the boundary is the right feel
  - broken asset → fetch the asset again via a different method, Figma is always the source of truth

**Standing rule (R23 fix-it-2 onward):** when a craft problem surfaces during user review, the first move is "what does canonical Figma do here?" — NOT "what's a clever workaround?". Approximations, fallbacks, and "smart" algorithms are how the proto drifts off-canonical.

