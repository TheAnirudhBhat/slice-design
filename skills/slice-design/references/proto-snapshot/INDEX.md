# slice-app-proto snapshot INDEX

Human-readable catalog. Pair with `manifests/components.json` (machine-readable) and `manifests/assets.json`.

## Cross-cutting chrome components

### App.jsx
**Purpose**: top-level scaffold. Owns `active` / `visuallyActive` state. Holds the shared `pagerX` motion value. Centers the phone shell in the viewport via `useFitScale` + flex.
**File**: `code/App.jsx`
**Depends on**: `BottomNav`, `MotionStatusBar`, `DynamicIsland`, `Pager`, all pod L0s.
**Key constants**: `PHONE_OUTER_WIDTH=440, PHONE_OUTER_HEIGHT=952, PHONE_WIDTH=425, PHONE_HEIGHT=925`. `PAGE_BG = {banking,explore,credit,activity: '#FFFFFF', pay: '#D30AD7'}`.
**Calibration history**: FX2, FX10, FX20, FX33, FX38, FX41, FX44, FX47.

### PhoneFrame (defined inside App.jsx)
**Purpose**: iPhone 16 Pro Max physical chassis — metallic bezel gradient + side hardware buttons + 425×925 screen window.
**Key dims**: 440×952 outer / 425×925 screen / 62 outer radius / 56 inner radius / 52 screen radius.

### main.jsx
**Purpose**: React root. Mounts `<App />` + `<Agentation />` as siblings.
**Depends on**: `agentation@^3.0.2` (installed via npm).

### components/Pager.jsx
**Purpose**: horizontal page-pager. Lays out all 5 pages in a row, drags via framer-motion, snaps to nearest page on release.
**Props**: `activeIndex, pageCount, pageWidth, externalX (motion value), onIndexChange, onCommit`.
**Key rule (FX55)**: external `activeIndex` change → `x.set(target)` (INSTANT, no spring). Pages snap; only the nav row springs.
**Calibration history**: FX55.

### components/StatusBar.jsx
**Purpose**: fixed 54px overlay at top of phone screen. Time on left, signal/wifi/battery cluster on right. Each element computes its own color (LIGHT or DARK) based on which page is under its center via `useTransform(pagerX, ...)`.
**Algorithm**: center-point sampling (`colorForCenter`). Time center x=60, icons cluster center x=365 (of 425-wide screen).
**Calibration history**: FX1, FX11.

### components/BottomNav.jsx + BottomNav.css
**Purpose**: 5-slot Apple-Dock-style bottom nav. Items in natural order (Banking · Explore · Pay · Credit · Activity). Active item lands at viewport center via row translation. Active = 64px (or 72px for Pay-committed special). Inactive = 44px. flex+gap layout (GAP=24) so edge-to-edge spacing is constant.
**Per-slot variant**: each slot computes its own variant (immersive / standard) via `useMotionValueEvent` on `navX` + `pagerX` → looks up which page is under its CLAMPED center x. Standard = white-page slot (10%-black bg + white glyph). Immersive = V-500-page slot (white-30% bg + V-500 glyph). Active = white bg + 40%-black glyph (canonical FX65).
**Animation**: SPRING animate on all external `visuallyActive`/`active` changes. Pager itself snaps via `x.set` so screen is always instant.
**Calibration history**: A1, FX17, FX21, FX25, FX29, FX30, FX34, FX39, FX43, FX50, FX53, FX54, FX55, FX65.

### components/BottomFade.jsx
**Purpose**: bottom-of-page gradient overlay that obscures scrolling content behind the floating dock. `position:absolute; bottom:0; height:200; pointer-events:none; zIndex:5`.
**Props**: `color` (must match page bg), `height` (default 200).
**Apply to**: every white-page L0 (Banking, Explore, Credit, Activity). NOT to Pay (V-500 immersive).
**Calibration history**: FX5, FX52.

### components/AppBar.jsx
**Purpose**: sticky 64px app bar at top of each L0's scroll. L0 variant = title H2 + optional eye + photo avatar. Standard variant = chevron back + title H3 + actions. Scroll elevation shadow appears when content scrolls past.
**Props**: `variant ('l0'|'standard'), title, leading, actions, avatar, onBack, scroll, background ('transparent'|'#FFFFFF')`.
**Per-pod bg**: Activity passes `background="#FFFFFF"` (because its sticky search row below interrupts the transparency cascade). Others default to transparent.
**Calibration history**: FX36, FX37, FX13, FX23, FX27.

### components/NavIcons.jsx (under code/icons/)
**Purpose**: SVG glyphs for nav (Banking/Explore/Pay/Credit/Activity in active + inactive variants). All use `fill="currentColor"` so the parent's color CSS controls them.

## Pod L0 components

### pods/banking/L0.jsx
**Purpose**: Banking pod home. Savings hero (L0 Large card) + Fixed Deposits (L0 Medium + rocket-mascot corner) + monies (L0 Medium + cluster corner).
**Canonical Figma**: node `885:19757`.
**Assets**: `monies_mark.png`, `fd_card_corner.png`, `monies_card_corner.png`, `avatar_only.png`.
**Calibration history**: A2, FX12, FX26.

### pods/explore/L0.jsx
**Purpose**: Explore pod home. Recharge & bills composite card (4-up bill grid + "Get assured ₹10" row) + 2×2 bento (Rewards, MAY spends, Invite, stacked Credit Score + Autopay).
**Canonical Figma**: node `885:19759`.
**Assets**: `bill_v2_credit.png`, `bill_v2_electric.png`, `bill_v2_mobile.png`, `bill_v2_more.png`, `flame_orange.png`, `fire_sparkle.png`, `may_spends.png`, `invite_magnet.png`.
**Bento math**: ExploreSmall height = 66 so stack of 2 + GAP(16) = 148 = INVITE card height.
**Calibration history**: A4, FX7, FX18, FX22, FX26.

### pods/credit/L0.jsx
**Purpose**: Credit pod home. Spends summary L0 Large card + Meet your slice super card L0 Medium card.
**Canonical Figma**: node `885:20015`.
**Assets**: `credit_avatar.png`, `credit_car.svg`, `credit_bag.svg`, `credit_invite_scatter.svg`, `super_card_mascot.png`.
**Calibration history**: FX26, FX102.

### pods/activity/L0.jsx
**Purpose**: Activity pod home. Activity title + sticky search row (input + filter pill) + flat txn list (20 entries spanning sent/received/failed/pending across a month of dates).
**Canonical Figma**: node `885:20122`.
**Assets**: `avatar_only.png`.
**Special**: AppBar passes `background="#FFFFFF"` because the search row below interrupts transparency.
**Calibration history**: A3, FX4, FX8, FX27, FX28.

### pods/payments/L0_valentinoHome.jsx
**Purpose**: Valentino home (Payments L0). V-500 immersive bg. "Check balance" pill + audio + photo avatar app bar; ₹0 hero (Display Large 80/96, -0.8 tracking); UPI ID pill with BHIM mark; 4×3 keypad (justify-between with 36px page gutters); Request | Transfer pills.
**Canonical Figma**: node `885:19901`.
**Assets**: `bhim_upi.png`, `valentino_audio_icon.svg`, `avatar_only.png`.
**Calibration history**: A1, FX15, FX32, FX36, FX40, FX48.

## Cross-cutting CSS

### components/BottomNav.css
**Purpose**: nav row + slot + circle + glyph styling. Per-slot variant rules keyed off `[data-slot-variant='immersive'|'standard']` attribute. Active state keyed off `[data-state='active']`. Pay special handled by `.slice-bnav-pay-special` rules.

### index.css
**Purpose**: Tailwind directives + global resets. `html/body/#root { width: 100%, height: 100%, background: #000 }`. `body { overflow: hidden }`. Image-drag protection global rule. Scrollbar hiding global rule. Keypad active feedback.

## Build scaffold

### package.json
**Deps**: react@^18.3.1, react-dom@^18.3.1, framer-motion@^12.40.0, agentation@^3.0.2. Dev: vite@^6.0.7, @vitejs/plugin-react@^4.3.4, tailwindcss@^3.4.17, postcss@^8.4.49, autoprefixer@^10.4.20.

### vite.config.js, tailwind.config.js, postcss.config.js
Standard Vite + React + Tailwind setup. No special slice config — Tailwind is mostly for utility classes; primary styling is inline + per-component CSS modules.

### index.html
Standard React root mount + Google Fonts Rubik (400/500/600/700).

## Assets — by category

### assets/icons/
Slice DLS line icons fetched from Figma canonical (via `get_screenshot` on node ID):
- `slice_eye_open.png` (node 586:138)
- `slice_eye_closed.png` (node 586:132)
- `dls_eye.png`, `dls_search.png`, `dls_filter.png`, `dls_arrow_up.png`, `dls_chevron.png` (from cached `get_design_context` URLs)

### assets/brand/
Brand marks + photo avatar:
- `avatar_only.png` — generic user profile photo (R23 production avatar)
- `bhim_upi.png` — canonical BHIM-UPI mark from Figma node `886:28338` (30×12 RGBA)
- `monies_mark.png` — canonical monies brand mark from Figma node `886:24912` (21×37 RGBA)
- `valentino_audio_icon.svg` — voice/audio glyph for Valentino app bar

### assets/illustrations/
Cards / mascots / corner-illustrations:
- FD card corner / mascot (`fd_card_corner.png`, `fd_mascot.png`) — from Figma `923:60307`
- monies card corner / glyph (`monies_card_corner.png`, `monies_glyph.png`) — from Figma `923:60436`
- Explore tile illustrations (`fire_sparkle.png`, `may_spends.png`, `invite_magnet.png`, `flame_orange.png`) — copied from `explore-base` proto
- Credit page glyphs (`credit_car.svg`, `credit_bag.svg`, `credit_invite_scatter.svg`, `credit_avatar.png`) — from canonical Credit L0 Figma
- `super_card_mascot.png` — slice super card mascot from skill suite

### assets/bills/
4-up bill grid icons for Explore Recharge & bills card:
- `bill_v2_credit.png`, `bill_v2_electric.png`, `bill_v2_mobile.png`, `bill_v2_more.png`

### assets/nav/
SVG nav icons for active + inactive states (Banking, Explore, Credit, Activity). Note: Pay nav uses raster PNG (`pay_active_qr.png` if present) due to complex vector geometry. Active SVGs unused at runtime (BottomNav.jsx renders NavIcons.jsx components instead) — kept here as the Figma export for reference / re-export.

---

For the WHY of each rule, see `../reference_proto_systematics.md` and `../reference_calibration_log.md`.
