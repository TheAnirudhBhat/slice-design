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

## Local icon files — ⚠️ CURRENTLY MISSING ON DISK

**R19 finding (cal:2026-05-28)**: the `slice-design-suite/icons/` directory referenced below **does NOT exist on disk** in the current skill. The export was documented but never (or no longer) shipped with the skill. This is a real gap that needs action.

The directory structure documented below describes the intended state when icons are re-exported. Until that re-export happens:

- **For code / proto work**: pull the icon SVG directly from the DLS Figma file via the figma MCP tools (e.g. `figma_get_node` with the icon's node ID, then export it). Ask the user when in doubt.
- **For any other use**: cite the icon by name + category from the taxonomy table above. Don't fabricate SVG.
- **Generating a missing icon in PROTO context (user-directed override, 2026-05-30)**: if the icon is truly missing everywhere and you're building a proto, generate a **flagged** slice-style SVG placeholder per `reference_slice_asset_generation.md` (filled / `currentColor` / rounded / 24-grid + mandatory flag comment). This is now the sanctioned third fallback (copy → Figma → generate) — dull dummies made proto pages read as broken during design review.
- **Never generate icon SVGs for product builds or post-handoff surfaces** — the ban below stands everywhere except flagged proto placeholders.

### Intended structure (post re-export)

When icons are re-exported, the directory will look like:

```
slice-design-suite/icons/
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
├── products/      (10)        spark, monies, explore, borrow, upi, fire, &, bonfire ...
├── profile/       (8)         profile, self-transfer, add-people, nominee ...
├── shopping/      (15)        coupon, shopping-bag, wallet, tag, filter, graph ...
├── status/        (15)        ban, tick-rounded, info, verified, error-outline ...
└── time/          (23)        calendar, alarm, stopwatch, imps, rtgs, frequency ...
```

Each file named `<icon-slug>.svg` (no variants) or `<icon-slug>__<variant-slug>.svg` (component-set variants like `general/qr__style-outline.svg`).

### R19 taxonomy sync — new icons in DLS not in skill taxonomy

The DLS sweep surfaced **30+ icons** in the canonical file that aren't in the taxonomy table above. New additions to consider:

- **Products** — new entries: `&`, `Bonfire`
- **General** — new entries: `Action_centre`, `Voice`, `placeholder`
- **Interface** — new entries: `Side arrows`, `up-and-down arrow`, `Withdraw`, `Widgets library`, `Upgrade`, `Library`, `Language`, `Hashtag`, `Exclude`, `Double arrow`, `Circle share`, `Bullet point dot`, `Align`, `Applications`, `Analytics`
- **Money** — new entries: `Advance money`, `Cashback history`, `Money_bag`, `Money canceled`, `Money cross`, `Money notification`, `Purchase power issue`, `Purchase power lock`, `Repayment failed`, `surplus transfer`
- **Status** — new entries: `Add`, `Disclaimer`, `Primary`, `Remove`, `Source`, `Tick-pending`, `Upload circle`
- **Documents** — new entries: `Application issue`, `Contacts`, `File closed/filled/signed/time`, `Grievience`
- **Shopping** — new entries: `Calculate interest`, `Interest square`, `Logistic box`, `Miscellaneous`, `Suitcase`
- **Objects** — new entries: `Crown`, `Investment`, `Fast tag`, `Headphone`, `Pet`, `Thumbs up/down`
- **Cashback** — placement quirk: `monies` icon appears under Cashback in DLS but is a Product

### Source file typos worth flagging next sync
- `Documents/Cheque_status` (underscore in name)
- `Documents/Edit ` (trailing space)
- `Profile/Wrong aacount` (typo — should be `account`)
- `Cashback/Card cashback ` (trailing space)
- `Cashback/Cash ` (trailing space)
- `Device` (singular) vs `Devices` (plural) — category typo

When re-exporting, sanitize slugs (strip trailing spaces, fix `aacount` → `account`, decide single category name `devices`).

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

## Usage rules (calibrated 2026-05-21 · R15)

### Standalone utility icon color
Trailing utility icons in App bar Standard / L0 (eye, pie chart, chat, card, etc.) render in **Text Primary `rgba(0,0,0,0.9)`**, not Brand V-500. The neutral color keeps the chrome from competing with the title and hero content. Brand purple is reserved for actions the user is meant to *take* — utility icons report state.
Source: cal:2026-05-21 — r15-icon-1501 pick A.

### Icon color on brand gradient
Icons rendered on the slice brand gradient (Valentino → Blue, used on Payments L0 hero only) use a **subtle V-50 white** — `rgba(250, 226, 250, 0.85)`, not pure `#FFFFFF`. Pure white competes with the headline text on the gradient. The subtle white sits one layer back, letting the title lead.
Source: cal:2026-05-21 — r15-icon-1504 pick B.

### State-specific icon variants — use them
When the DLS provides per-state variants of an icon (Phone/Type=Phone/Missed/Outgoing, Eye/Type=Open/Closed, Microphone/Type=Default/Mute, Tap-to-pay/Type=Enabled/Disabled, Privacy/Style=Lock/Unlock), **use the variant matching the row state**. Reusing the default icon and reading state from the row text only is wrong — the variant carries semantic weight (incoming-call arrow inward, missed-call arrow with cross, outgoing arrow outward) that text alone can't.
Source: cal:2026-05-21 — r15-icon-1505 pick A.

### Outline vs Solid (when both exist)
Both are valid. Default mapping:
- **Outline** for utility / secondary placement (App bar trailing, settings rows, content-grid tiles, anywhere the icon is a quiet label)
- **Solid** for primary / active states (selected pill, active tab, current state on a state-toggle, hero CTA leading slot)
Neither variant is the universal default. Context decides.
Source: cal:2026-05-21 — r15-icon-1500 pick both_fine (interpreted as context-dependent, not undecided).

### Glyph size in S-32 Avatar — confirmed 16pt
Reconfirmed: the inner glyph in a S-32 Avatar = **16pt** (= size/2). Don't bump to 18 for "more presence" — 16 reads correctly at the dense-row distance the S-32 Avatar lives in.
Source: cal:2026-05-21 — r15-icon-1503 pick A. Strengthens the original Avatar `glyphScale: size/2` rule (cal:2026-05-18 tune-1300).
