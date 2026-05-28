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
