---
name: DLS 2.0 Iconography
description: Icon grid (24px glyph/56px container), naming conventions, 15 categories, ~236 icons
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, node `582:257`

## Grid & Sizing
- Artboard: 56×56px (touch target / container)
- Glyph: 24×24px centered (16px inset each side)
- Multi-variant groups use wider containers (104–200px)

## Naming
`Category/Name` with variant suffixes:
- `Style=Outline | Solid | Fill | Line`
- `Type=Default | Fill | Enabled | Disabled | ...`
- `Direction=Up | Down | Left | Right`
- `Orientation=Horizontal | Vertical`
- `Stroke=Regular | Thin`

## Categories

| Category | Count | Examples |
|----------|-------|---------|
| General | 31 | Search, QR, Privacy, Delete, Share, Eye, Shield, Settings |
| Interface | 30 | Chevron, Arrow, Cross, Add, Reload, Categories, Dashboard |
| Objects | 31 | Game, Car, Flight, Electricity, Medical, Bell, Moon |
| Money | 21 | Transfer, Autopay, Deposit, Rupees, Pay_now, Add money |
| Documents | 18 | Bill, PAN, Certificate, Cheque_status, Terms, Save |
| Time | 16 | Calendar, Alarm, Stopwatch, IMPS, RTGS, Frequency |
| Shopping | 16 | Coupon, Shopping bag, Wallet, Tag, Filter, Graph |
| Status | 14 | Ban, Tick-rounded, Info, Verified, Error outline |
| Devices | 14 | Camera, Mobile, Tv, Wifi, Speaker, Storage |
| Cashback | 13 | Cashback, Invite-and-earn, Scratch card, Shimmer |
| Products | 9 | Spark, monies, Explore, Borrow, UPI, Fire |
| Buildings | 7 | House, Bank, Shop, Office, Bank-transfer |
| Profile | 7 | Profile, Self transfer, Add people, Nominee |
| Cards | 5 | Card, Card status, Card delivery |
| Messaging | 4 | Message, Mail, WhatsApp |

## Local icon files (ship with the slice-design suite)

All 277 DLS 2.0 icons are exported to `icons/` in the slice-design-suite repo, organized by category:

```
icons/
├── buildings/     (7 icons)   house, bank, shop, office, bank-transfer ...
├── cards/         (5)         card, card-status, card-delivery ...
├── cashback/      (13)        cashback, invite-and-earn, scratch-card, shimmer ...
├── devices/       (15)        camera, mobile, tv, wifi, speaker, storage ...
├── documents/     (17)        bill, pan, certificate, cheque-status, terms, save ...
├── general/       (40)        search, qr, privacy, eye, delete, share, settings ...
├── interface/     (47)        chevron, arrow, cross, add, reload, dashboard ...
├── messaging/     (5)         message, mail, whatsapp ...
├── money/         (21)        transfer, autopay, deposit, rupees, pay_now, add-money ...
├── objects/       (34)        game, car, flight, electricity, medical, bell, moon ...
├── products/      (10)        spark, monies, explore, borrow, upi, fire ...
├── profile/       (8)         profile, self-transfer, add-people, nominee ...
├── shopping/      (15)        coupon, shopping-bag, wallet, tag, filter, graph ...
├── status/        (15)        ban, tick-rounded, info, verified, error-outline ...
└── time/          (23)        calendar, alarm, stopwatch, imps, rtgs, frequency ...
```

Each file is named `<icon-slug>.svg` (no variants) or `<icon-slug>__<variant-slug>.svg` (for component-set variants like `general/qr__style-outline.svg`).

## Usage

### Loading in a slice mockup or production code

```jsx
// inline (preferred for color-tintable icons)
import searchIcon from '~/slice-design-suite/icons/general/search.svg?raw';
<span dangerouslySetInnerHTML={{ __html: searchIcon }} />

// or <img> for static rendering
<img src="/slice-design-suite/icons/general/search.svg" width={24} height={24} />
```

### Sizing
- Default glyph: 24×24px (matches DLS spec)
- Avatar inner glyph: scales to `size / 2` per the calibrated Avatar spec (e.g. M-40 → 20pt rendered icon)
- All SVGs use `fill="black" fill-opacity="0.9"` — to tint, replace `fill="black"` with `fill="currentColor"` (or post-process at load time)

### Color treatment
The exported SVGs are monochromatic with `fill-opacity="0.9"` matching slice's Text Primary. For colored contexts (Avatar Bold, status indicators):
- Wrap in a coloured Avatar container (slice's idiomatic approach)
- OR post-process to swap fill to `currentColor` and set the parent's CSS `color`

## ❌ ANTI-PATTERN: never generate icons

**This is the highest-stakes anti-pattern in the slice-design suite.**

Generating SVG icons from scratch produces AI-slop — wrong proportions, inconsistent stroke widths, off-grid paths, generic vector shapes. The slice icon library is hand-crafted with consistent visual weight, a specific corner-rounding language, and recognizable category metaphors that AI generation will not match.

**Rules:**
1. If you need an icon, **first check `icons/<category>/`** for it.
2. If the icon you need is NOT in the suite, use a **placeholder** (24×24 outlined square or circle with a fixed-stroke neutral icon) and add a comment:
   ```html
   <!-- ICON-MISSING: payments/refund — added placeholder. Real icon to be exported from Figma node 582:xxxx -->
   ```
   The user / designer will add the real icon later by re-running the calibration loop's icon export step.
3. **Never** `figma.createVector()` or hand-write SVG paths to fill in a missing icon. **Never** copy-paste SVG from a similar icon and tweak it.
4. If you find yourself reaching for a generic Lucide / Heroicons / Tabler / Feather icon — **stop**. Use a slice placeholder instead.

Source: user direction 2026-05-18 — "you generate slop icons, so I would prefer it if you kept a copy of all icons in the suite, with proper instructions."

## Re-exporting / updating the icon set

When new icons are added to the Figma DLS file, re-run the icon export from the calibration proto:

1. Open Figma Desktop, ensure Bridge plugin is running on the DLS 2.0 working copy
2. Confirm `figma-console-mcp` is connected (check via `figma_get_status`)
3. Run the figma_execute loop (see the slice-design-calibrate skill's icon-batch recipe) — batches of ~40, base64-encoded, POST to `http://localhost:8766/api/icons`
4. The `/api/icons` endpoint in `dls-calibration/vite.config.js` handles slugging + writing to `icons/<category>/<name>__<variant>.svg`
5. Commit the new SVGs to the slice-design-suite repo
