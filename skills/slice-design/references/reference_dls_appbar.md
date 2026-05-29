---
name: DLS 2.0 App Bar
description: Standard app bar (L1+) and L0 app bar — layout, spacing, scroll shadow behavior
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, node `668:3876`

## Standard (L1 and deeper)

Types: **Button**, **Icon**, **Alt button** (trailing slot variants)

### Layout
- Total height: 108px (44px status bar + 64px bar)
- Bar padding: `8px 12px` (XS vertical, S horizontal)
- Background: white
- Scroll state: adds Below shadow `0px 6px 8px rgba(0,0,0,0.05)`

### Leading (nav icon)
- Touch target: 48x48 | Icon: 24x24 | Padding: 12px
- Default: back chevron, always left side

### Title
- Typography: H3 — 20px medium, 24px line-height, 0.4px tracking
- Color: rgba(0,0,0,0.9)
- Layout: flex-1, left-aligned (not centered), overflow ellipsis

### Trailing
- **Button**: brand color text, buttonSmall (14px medium), pill, `16px 8px` padding
- **Icon**: up to 2 icon buttons, 48x48 with 24px icons
- **Alt button**: pill with `1px solid rgba(0,0,0,0.05)` border, 16px icon + 14px text, `8px 12px` padding, 24px radius

## L0 (top-level pods)

Per-pod variants: Banking, Explore, Credit, Activity, Payments

### Layout
- Height: 64px (excluding 44px status bar)
- Padding: `8px` vertical, `24px` left, `20px` right
- Gap: 8px between title and trailing

### Title
- Typography: H2 — 24px medium, 32px line-height, 0.48px tracking
- Color: rgba(0,0,0,0.9), left-aligned

### Trailing
- Avatar (40px in 48px target) and/or icon buttons
- Scroll state: adds Below shadow

## L0 — Avatar required
The Avatar top-right slot on App bar/L0 is **not optional** — it's required on every pod-root surface (Banking, Explore, Payments, Credit, Activity). Identity belongs in the corner of every home.

Source: cal:2026-05-17 — pair 611 reason "avatar is necessary for the L0 app bar" ✅

## Standard — back icon = chevron, not arrow
Leading icon on App bar/Standard is a **chevron ‹** (slice icon set's back glyph), not a left arrow ←.
Source: cal:2026-05-17 — pair 604 reason "our back is a chevron not an arrow" ✅

## Standard — close (X) variant for terminal flows
On terminal screens with no "back" destination (payment success, full-screen pay flow, modal-style takeovers), the leading icon is an **X close** (not chevron back). No title in this variant — the screen content is the title.

Use cases:
- Payment confirmation success ("Paid ₹X,XXX")
- Brand-immersive pay-to-person screen (V-500 full-fill)
- Any "you're done, dismiss" terminal state

Source: cal:2026-05-17 — review-1102 reference (Paid ₹18,000 confirmation), review-1109 (Pay person brand-immersive)

## Standard — trailing utility icon
Standard app bars commonly carry a **single trailing utility icon** (24×24, neutral text color) — pattern-specific:
- Balance / Savings → **eye** (hide / show balance)
- Spark FD details → **chat** (help / support)
- Credit bill summary → **pie chart** (spend analytics)
- Pay screen → **card** (switch payment instrument)
- Action centre / Notifications → none, the entire screen IS the inbox

Trailing icons are not menus or overflow — each one is a direct action affordance for that surface.

Source: cal:2026-05-17 — review references 1101, 1108, 1111, 1112

## Standard — title typography
App bar Standard title uses **H3 (20/24 Medium)**, not H4.
Source: cal:2026-05-28 — review critique ✅

## Standard — dynamic title with amount
When a flow has an active value (e.g. Pay screen with running amount), the App bar title can be **dynamic**: `Pay ₹2,000`. The amount lives in the title, not a separate hero row.

This applies to mid-flow surfaces where the amount is the primary context.

Source: cal:2026-05-17 — review-1112 reference (Pay ₹2,000 in title)

## L0 — trailing slice-currency pill
On Rewards / Fires surfaces, the L0 App bar trailing slot can be a **slice-currency pill** (white bg + outline-subtle border + valentino ₹-glyph avatar leading + amount value) — e.g. `₹43,230` with the slice ₹ icon. This replaces the photo Avatar in this specific pod.

Source: cal:2026-05-17 — review-1103 reference (Rewards L0)

## Scroll behavior
App bar **stays pinned** (always visible) — does NOT auto-hide on scroll down. The bar is an anchor; hiding it on scroll creates orientation loss.
Source: cal:2026-05-27 — pair 1609 A ✅

## R19 update (2026-05-28) — 4 App bar types in canonical DLS

The canonical DLS App bar page (`3:38`) documents **4 types**, not 2. The skill previously focused on Standard + L0; Search and Subtitle were undocumented.

### Type 3: Search (NEW)
Full-bar search variant. Used when search IS the screen's purpose.
- Chevron back leading
- Inline search input pill (full available width)
- 4 states: Default / Focused / Typing / Filled (with cleared X icon trailing the input)
- 108px tall

Why distinct from "Activity L0 search bar": the Activity L0 search lives BELOW App bar L0 as a separate content row. The Search-type App bar IS the search bar — used on dedicated search screens (e.g. search-merchants, search-categories).

Cross-reference: `reference_dls_search.md` — same component described from the search angle.

### Type 4: Subtitle (NEW)
For detail pages like transaction detail. Anatomy:
- Chevron back leading
- **2-line title**: line 1 = small caption-like label, line 2 = title (H3 or H4)
- Optional trailing utility
- 108px tall

Example: a sub-detail page where line 1 = "Transaction ID #ABC123" caption and line 2 = "Paid ₹500 to Aman" title. Packs metadata + page-title without a separate top header.

Per the canonical DLS, Subtitle is the recommended chrome for sub-detail pages. The R19 Transaction detail L2 recipe in `reference_dls_screen_layouts.md` chose Standard App bar (chevron back, no title) with a flush page-level status hero — a deliberate design choice for txn detail. Other sub-detail surfaces should consider Subtitle type when context-label + title both matter.

### Standard trailing subvariants (clarification)
The canonical file labels two trailing layouts:
- **Icons trailing** — up to 2 icons side-by-side (e.g. share + more)
- **Button trailing** — single text-button pill (e.g. "Save", "Skip")

Use the canonical "Icons trailing" / "Button trailing" naming.

Source: cal:2026-05-28 R19 — DLS molecules sweep, App bar page `3:38` ✅

## R23 calibrated specs (proto rewrite, 2026-05-29)

Canonical proto component: `slice/projects/slice-app-proto/src/components/AppBar.jsx`. Canonical Figma: node `3:38` in `PNUz3Dr9KSlFJSnsXsC0nL`. Variants: `678:454` (L0) and `679:2330` (Standard).

### L0 variant — operational specs
- **Height: 64px** (status bar is OUTSIDE the AppBar — rendered as a global fixed overlay at the phone-shell level).
- **Exception — Valentino-immersive Payments L0:** uses a thinner ~52px chrome with translucent pills, NOT the AppBar component. See `reference_pod_payments.md` § CANONICAL.
- **Padding:** `24px left, 20px right, 8px top/bottom`.
- **Title:** Rubik Medium **24/32** with **0.48px letter-spacing**, color `rgba(0,0,0,0.9)`, `flex: 1 1 0` (left-aligned, takes remaining space).
- **Trailing avatar:** `40×40` photo inside a `48×48` container with `1px solid rgba(0,0,0,0.05)` border, `border-radius: 9999`, `overflow: hidden`. Image: `width: 100%; height: 100%; object-fit: cover`.
- **Trailing action buttons (eye, etc.):** `48×48` IconButton with `padding: 12px` (24×24 glyph centered). Transparent bg, no border, no outline.
- **Gap between title and trailing cluster:** 8px.

### Standard variant — operational specs
- **Height: 64px.** Padding `12px horizontal, 8px vertical`.
- **Leading icon (back chevron):** 48×48 IconButton with 24×24 chevron. Default: ChevronBackGlyph. Pass `leading={null}` to hide; pass custom React node to override.
- **Title:** Rubik Medium **20/24** with **0.4px letter-spacing**, `rgba(0,0,0,0.9)`, `flex: 1 1 0`, overflow ellipsis nowrap.
- **Trailing cluster:** up to 2 IconButtons side-by-side (48×48 each, 24×24 glyph). Layout: `display: flex; justify-content: space-between` between leading | title | trailing.

### Sticky position — content scrolls UNDER
- **Position:** `sticky; top: 0` (anchored at the top of the scrollable parent).
- **z-index:** 20 (above page content, below floating bottom nav at z=100, below status bar overlay at z=55).
- The AppBar STAYS at the top of the viewport while page content scrolls beneath. No auto-hide on scroll-down (`reference_dls_appbar.md` "Scroll behavior" rule still applies).

### Scroll elevation — operational
- When the scrollable parent's `scrollTop > 1`, the AppBar gets `box-shadow: 0 6px 8px rgba(0,0,0,0.05)` (DLS "Below" elevation token).
- Transition: `box-shadow 200ms cubic-bezier(0.25, 0.1, 0.25, 1)`.
- WHY threshold of 1 (not 0): scrollTop of 0 means "exactly at top" — at exactly-top, no shadow. Any scroll past that triggers the lift. Threshold of 1 prevents shadow flicker on bounce-scroll at iOS rubber-band boundary.

### `usePageScroll(ref, threshold=1)` hook
- Co-located in `AppBar.jsx`. Attach a ref to the SCROLLABLE container (typically the page body inside the page reserve area, NOT the window).
- Returns `boolean` — `true` once `el.scrollTop > threshold`.
- Pass-through to `<AppBar scroll={scrolled} />` to drive the shadow.

```jsx
const scrollRef = useRef(null);
const scrolled = usePageScroll(scrollRef);
return (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <AppBar variant="l0" title="Banking" avatar={<img src="/assets/avatar_only.png"/>} scroll={scrolled} />
    <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
      {pageContent}
    </div>
  </div>
);
```

### What the AppBar does NOT carry
- ❌ Status bar (44/54px) — rendered globally by `App.jsx`/PhoneFrame as a fixed overlay above all pages.
- ❌ Immersive variant — Payments L0 has its own brand-immersive top chrome, not the canonical AppBar.
- ❌ Hamburger / overflow menu — slice doesn't use these. Each L0 has 0-2 trailing utility icons + avatar.

Source: cal:2026-05-29 R23 — proto rewrite. Canonical: `slice/projects/slice-app-proto/src/components/AppBar.jsx`.

---

## R24 cont-23: white-on-scroll + tappable avatar + tertiary action icons

### Scroll behavior (cont-13)
- `AppBar.effectiveBg = scroll ? '#FFFFFF' : background` — defaults to transparent so the underlying page color shows through, transitions to opaque white when content scrolls beneath.
- The 54px status reserve sitting ABOVE the AppBar (rendered at App.jsx level) must paint white in sync. Lift the L0's scroll state via an `onScrollChange(boolean)` callback prop. App.jsx tracks `scrolledByPod` and styles the reserve accordingly.
- Immersive pods (Pay/Valentino on V-500) opt out — the reserve stays transparent.
- Transition: `background 160ms linear` on both the AppBar AND the reserve, in sync.

### Avatar (cont-5, cont-23)
- **Visual 44×44** photo (bumped from 40 in cont-23).
- **Hit area 48×48** — `AvatarContainer` renders as a `<button>` when `onTap` is provided; otherwise a non-interactive div.
- **No outline, no ring** — applies on standard AND immersive (Valentino) variants.
- Tap opens Profile L1 via `useL1().push('profile')`.

### Action icons (cont-11)
- `ActionSlot` (48×48 wrapper) sets `color: rgba(0,0,0,1) + opacity: 0.5` — NOT `color: rgba(0,0,0,0.5)`. Why: opacity propagates to BOTH inline SVG and raster PNG children. The slice eye glyph is a PNG, so CSS `color` doesn't tint it; opacity does.
- Don't set per-button `color` on the action child (Banking L0 used to override with `rgba(0,0,0,0.6)`, which blocked the ActionSlot cascade).

### Back chevron (cont-14)
- Stroke V: `<path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />` in viewBox `0 0 24 24`.
- NOT the chunky filled mirror-of-dls_chevron path (that was wrong in cont-6, reverted in cont-14).
- `IconButton tone='primary'` ensures `color: rgba(0,0,0,0.9)` (primary black) flows to `currentColor`.

Source: R24 cont-2 through cont-23, 2026-05-29.
