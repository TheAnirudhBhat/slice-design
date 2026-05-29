---
name: DLS 2.0 Phone Shell + Status Bar
description: iPhone 15 shell for proto + canonical status bar (dynamic island, 9:41 time, signal/wifi/battery icons), shared across all pages.
type: reference
---

When slice screens are previewed on desktop, they should be wrapped in a **realistic iPhone 15 shell** with a working status bar. The status bar is rendered at the shell level — every page inherits it, no page renders its own.

Canonical proto: `slice-app-proto/src/components/StatusBar.jsx` + the `PhoneFrame` component in `slice-app-proto/src/App.jsx`.

## Phone shell geometry (iPhone 15)

- **Viewport**: 390 × 844 px
- **Outer shell**: 48px corner radius, dark bezel (`8px solid #111` + 1px highlight `#333`)
- **Drop shadow**: `0 24px 80px rgba(0,0,0,0.5)` for floating-on-desktop look

## Status bar (54px safe area top)

- **Container**: 390 wide × 54 tall, transparent (page bg shows through), `pointer-events: none`
- **Dynamic island**: centered horizontally, `top: 11px`, `126 × 37` rounded `19px`, solid `#000`
- **Time (left)**: `9:41` at Rubik Semi 17px (stand-in for SF Pro), `letter-spacing: -0.2px`, left-aligned at `padding-left: 33px`, vertically centered with the dynamic island via `padding-top: 18px`
- **Status icons (right)**: signal | wifi | battery, gap 6px, right-aligned at `padding-right: 24px`, vertically centered with the dynamic island via `padding-top: 22px`
- **Signal**: 4 bars (decreasing height)
- **Wifi**: 3 arcs + dot
- **Battery**: 23×11 rounded rect outline + 16×9 fill + 1.5×5 nub

## Variant

- `variant="light"` — white pages (Banking, Explore, Credit, Activity). Text + icons in slate-90 (`#1A1A1A`).
- `variant="dark"` — V-500 page (Valentino home). Text + icons in pure white (`#FFFFFF`).

Variant is determined by the active pod and passed down via `App.jsx`:
```jsx
const STATUS_VARIANT = {
  banking: 'light',
  explore: 'light',
  pay: 'dark',
  credit: 'light',
  activity: 'light',
};
```

## Layout above the status bar

The dynamic island is always solid black regardless of variant — it represents real device chrome, not slice surface.

## Below the status bar: app bar + content

Page render order (top to bottom):
1. Status bar (54px, rendered by `PhoneFrame`)
2. App bar (per-page, 56px standard) — DLS L0 or Standard variant per the page's role
3. Margin (8–16px from app bar to content start)
4. Page content
5. ~140px reserved bottom padding for the floating bottom nav

## Anti-patterns

- ❌ Per-page status bar implementations — must live at the shell level, single source of truth.
- ❌ Time not aligned to the dynamic island vertically — looks misaligned.
- ❌ Icons positioned at top: 0 instead of centered with the island — looks raised.
- ❌ Status bar visible in dark mode with dark text on V-500 page (low contrast).
- ❌ Page content rendering all the way to top: 0 — must respect the 54px status bar.

## Source

cal:2026-05-29 R23 — Documented during slice-app-proto build. Status bar replicates iPhone 15 (iOS 17+) chrome.

---

## R24 cont-9: iPhone 16 Pro dimensions (393 × 852)

Switched the proto's phone shell from Pro Max (440×952) to real iPhone 16 Pro logical dimensions:

- **Outer chassis**: 402 × 874
- **Inner screen**: 393 × 852

Apple's logical CSS px for iPhone 16 Pro (6.3" display, 3x scale = 1179 × 2556 physical). The DLS 2.0 L0 canvas frames also use the `APPLE_IPHONE_16_WHITE` preset (393×852), confirming alignment.

Updated constants:
- `App.jsx`: PHONE_OUTER_WIDTH=402, PHONE_OUTER_HEIGHT=874, PHONE_WIDTH=393, PHONE_HEIGHT=852
- `StatusBar.jsx`: ICONS_CENTER = 393 - 60 (was 425 - 60)
- `BottomNav.jsx`: const PHONE_WIDTH = 393
- `BottomNav.css`: `.slice-bnav-viewport { max-width: 393px }`

Pro Max sizing (440×952) is wrong for the default proto. Use only when the user explicitly asks for "Pro Max" or a wider device test.

Source: R24 cont-9, 2026-05-29.
