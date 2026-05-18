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
