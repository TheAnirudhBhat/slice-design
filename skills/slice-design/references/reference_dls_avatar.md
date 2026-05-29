---
name: DLS 2.0 Avatar
description: Circular avatar — 6 sizes (32–128px), 4 types (Icon/Text/Image/Logo), 6 colors, 2 emphasis levels
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, nodes `331:74`, `1852:13681`

## Sizes
S: 32px | M: 40px | L: 48px | XL: 64px | XXL: 80px | XXXL: 128px

## Types
- **Icon**: icon centered in circle
- **Text**: letter/initials centered
- **Image**: photo clipped to circle, object-fit cover
- **Logo**: logo image in circle

## Colors
Slate, Valentino, Blue, Orange, Red, Green

## Emphasis
- **Subtle**: light bg (e.g. #FAE2FA), darker icon/text
- **Bold**: dark bg (e.g. #D30AD7), white icon/text

## Surface
- Radius: 100px | Border (Image type): `1px solid rgba(0,0,0,0.05)`

## Common Usage
- L0 app bar: 40px (M) in 48px touch target
- List items: 40px (M) or 48px (L)
- Profile header: 80px (XXL) or 128px (XXXL)

## Inner glyph size
Text/letter glyphs inside the avatar are Rubik Medium, sized at **`avatarSize / 2`**:
- S-32 → 16 · M-40 → 20 · L-48 → 24 · XL-64 → 32 · XXL-80 → 40 · XXXL-128 → 64

Source: cal:2026-05-17 — reason on `list_item_avatar_height_72`: "font inside avatar should be Rubik 20" (for M-40) ✅

## Default emphasis (calibration-confirmed)
For list-leading and most container roles, default to **Subtle** (V-50 bg + V-500 glyph) OR **White** (pure `#FFFFFF` bg + `outline-subtle` border + V-500 glyph). These two read as interchangeable defaults — slice moves between them depending on surface contrast needs.

**Reserve Bold** (V-500 bg + white glyph) for explicit emphasis moments — selected states, hero badges, single-instance accents. **Never use Bold as the default avatar style across a list** — it overwhelms the rhythm.

Source: cal:2026-05-17 — pairs 200 (subtle ≈ white = both_fine) + 201 (subtle > bold-inverse) ✅

## Inner glyph: line icon, not emoji
Avatars carry **slice line icons** (1.5–2px stroke, monochrome, optical-aligned). They do NOT carry:
- Emojis (🔥 💳 ⚡) — rendering varies by OS and breaks brand consistency
- Multi-colour illustrations as the glyph (illustrations can sit *behind* an Avatar via the Image type, but not as a Text/Icon glyph)
- Photographic icons or 3D renders

In protos where the slice icon set isn't available, use a simple line-stroke SVG or a placeholder letter — never an emoji.

Source: cal:2026-05-17 — pair 305 reason + pair 400 pick A. 2 signals. "line icons in avatars, not emojis" ✅

## Avatar as illustration container (preference, not rule)
When a list-leading slot would otherwise carry an illustration (gift, fire, trophy, spark), **prefer wrapping it in an Avatar L-48 with Valentino-Subtle bg**. The illustration becomes the glyph and the row matches the rest of the list's visual rhythm.

Standalone illustrations are not banned — they're acceptable in **hero contexts** (single-instance, non-list — a celebration card, a confirmation screen). But in list-leading positions, the Avatar wrap is preferred.

Source: cal:2026-05-17 — `fire_is_valentino_not_orange` reason ("usually we keep illustrations inside avatars") + `illustration_in_avatar` pair 204 (`both_fine`). "Usually" not "always".

## Status indicator on Avatar
When an Avatar carries a status (online, has-notifications), use a **small corner dot** (12×12 with 2px white border) at bottom-right — not a full-circle ring around the avatar.

Ring overlays claim too much attention; the corner dot is the calm slice convention.
Source: cal:2026-05-17 — pair 815 A ✅

## Calibrated default config (tune lock 2026-05-18)

The user reviewed the full Avatar variant matrix in tune mode and locked the following spec as the canonical default for the rest of slice to inherit:

```json
{
  "sizes": [32, 40, 48, 64, 80, 128],
  "colors": ["valentino", "blue", "green", "red", "orange", "slate"],
  "emphases": ["subtle", "bold"],
  "fontFamily": "Rubik",
  "fontWeight": 500,
  "glyphScale": "size / 2",
  "defaults": { "size": 40, "color": "valentino", "emphasis": "subtle" }
}
```

- Inner glyph weight = **Medium (500)**, not Regular. Calibrated explicitly.
- Default sizing = **M-40** for general list rows; S-32 for dense settings rows; L/XL/XXL/XXXL for hero contexts only.
- Default colour = **Valentino**; switch to category colour only when conveying meaning (blue = bank, green = positive, red = alert, orange = warning, slate = neutral / unknown).
- Default emphasis = **Subtle** (V-50 bg + V-500 glyph). Bold is reserved for primary-action tiles and status-coded categories.
- `glyphScale: "size / 2"` — for any new size, inner glyph = size/2 in Rubik Medium.

Source: cal:2026-05-18 — tune-1300 lock. Reason (user): "the font weight should be medium in these".

## Glyph size rule reconfirmed (cal:2026-05-21)

Reconfirmed via R15 iconography round: inner glyph scales as **size / 2** for every Avatar size.
- S-32 → **16pt** glyph (don't push to 18 for "presence")
- M-40 → 20pt
- L-48 → 24pt
- XL-64 → 32pt
- XXL-80 → 40pt
- XXXL-128 → 64pt

Source: cal:2026-05-21 — r15-icon-1503 pick A. Original spec from cal:2026-05-18 tune-1300.

## Avatar background rules by row context (R19 — Payment OS 26)

The canonical Payment OS file documents 6 rules for what Avatar background to use based on the row's role. These were observed in `1115:6700` (Payment OS 26 file) as a labeled rules sheet — undocumented in slice-design until now.

### Rule 1: System-row / "no logo" merchant
- **Avatar**: CardBG-colored fill + line icon in slate/V-500
- **Used for**: rows where the entity has no specific logo (e.g. "Subscription" without merchant attribution, system-generated transactions)
- **Example**: Activity row for "Dec savings interest" — green up-arrow Avatar with CardBG fill

### Rule 2: Saved beneficiary / contact list
- **Avatar**: Subtle-color avatar (V-50 / V-25) + line icon
- **Used for**: contact / saved beneficiary list rows in Payments flows
- **Example**: "Pay anyone" contact picker — first-letter Subtle V-50 Avatar

### Rule 3: System list (notifications, action centre)
- **Avatar**: CardBG-colored fill + line icon
- **Used for**: notification / Action centre rows where the icon represents the notification type, not a sender

### Rule 4: Banking row leading (bank logo present)
- **Avatar**: Bank logo on **WHITE circle** (NOT subtle)
- **Fallback**: Bank line icon on CardBG when no logo available
- **Used for**: account selection rows, transfer destination rows ("From: HDFC Savings ····5732")
- WHY white circle: banks are external entities with their own brand marks; slate-subtle Avatar dilutes the bank's brand identity. White circle lets the bank logo read clearly.

### Rule 5: Merchant row leading (merchant logo present)
- **Avatar**: Filled merchant logo (e.g. Blinkit, Indigo style — the merchant's actual brand colour)
- **Fallback**: First-letter Avatar with CardBG fill
- **Used for**: transaction rows in Activity feed, payee selection
- **Example**: "Paid ₹370 to Uber" — black-fill Uber wordmark in white Avatar; "Sanjay S." photo Avatar

### Rule 6: Transfer screen large-avatar exception
- **Avatar**: Large avatars (S-72+) — subtle/CardBG fails in light mode here
- **Used for**: dedicated Transfer / Send screens where the recipient Avatar is the hero (large size, prominent placement)
- **Why exception**: at large sizes, subtle Avatar bg disappears against the white page surface. Use a stronger fill (V-500 Bold or merchant logo / photo).

## Background colour summary

| Row context | Default Avatar bg |
|---|---|
| Standard list row (icon-context) | Subtle V-50 + V-500 glyph (default) OR White + outline-subtle + V-500 glyph |
| Standard list row (text initials, no specific identity) | CardBG fill + first-letter slate text |
| System / notification row | CardBG fill + slate line icon |
| Saved contact / beneficiary | Subtle V-50 / V-25 + V-500 glyph (or first-letter) |
| Bank row | **White circle** + bank logo (NOT subtle) |
| Merchant row | Filled merchant logo (uses merchant's brand colour) OR fallback to CardBG + first-letter |
| Large transfer / recipient hero | V-500 Bold or photo/logo at full size |
| Quick-action tile (Send, Bills, Mobile) | White + outline-subtle + V-500 glyph (NOT Avatar — see anti-pattern) |
| Content-grid tile (PLAY & WIN, MAY SPENDS) | Slate glyph in white outline circle (NOT V-500 Bold) |

Source: cal:2026-05-28 R19 — Payment OS 26 `xIc12scqCFBSJ5Kgyd6Krh` node `1115:6700` (Avatar usage rules sheet). 6 numbered rules + cross-referenced against AVC transaction-detail Avatars and Credit Card 2026 row Avatars ✅

---

## R24 cont-23: L0 AppBar avatar 44 × 44 (was 40)

- **Visual size 44×44** (bumped from 40 per user direction "increase by 4px on all L0 pages").
- **Hit area 48×48** when tappable (wrapped in `<button>`).
- **No outline, no border, no ring** — applies on ALL L0 surfaces including immersive Valentino.
- Tap opens Profile L1.

Note: this is the **AppBar avatar**. The Avatar component's `M-40` size (40×40) still stands for in-content uses (e.g. transaction list rows). The 44×44 override is specific to the AppBar slot.

Source: R24 cont-23, 2026-05-29.
