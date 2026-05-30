---
name: DLS 2.0 Illustrations catalog
description: Catalog of canonical slice illustrations + usage patterns (when to use illustration vs icon-in-Avatar vs photo vs nothing). Sizing conventions per surface.
type: reference
---

Slice uses **real, branded illustrations** — grainy gradient textures, 3D-rendered mascots, photo-illustration hybrids. Generic line-art is only a prototyping placeholder, never a shipped surface.

This file catalogs the illustrations observed across the canonical product files (Atom, Credit Card 2026, Payment OS 26, AVC 2025, the DLS reference frames). Each entry includes visual description, surface usage, size conventions, and style notes.

## Canonical illustrations

### atom_orb_3d
**Visual**: 3D atomic sphere — purple-pink gradient orb with three orbiting capsules labeled (Vacation, Emergency, Travel), set in a pink-glow oval halo.

| Attribute | Value |
|---|---|
| Surface | slice atom onboarding hero, atom product L0 / Get started screen |
| Size | ~200px hero (centered mid-screen) |
| Style | 3D rendered, soft gradient lighting, glow halo |
| Frames cited | Atom `8042:61416` (centre frame) |
| Confidence | High — explicit FTUX hero |

### atom_stash_thumbnails
**Visual**: Photo-realistic / illustrative tiles per stash category — corgi puppy (Round-up), mountains (Vacation), cassette + coin (Daily saver), doctor or shield (Emergency fund), retail packaging (Stash name customisation).

| Attribute | Value |
|---|---|
| Surface | Atoms list ("atoms to start with"), Banking L0 stash rows, Stash name editor |
| Size | ~48px in Avatar L-48 for list rows; ~96-120px for header / detail |
| Style | Photo + illustrative hybrid in rounded-square Avatar containers |
| Frames cited | Atom `8042:61354` (atoms list), `8273:26635` (name editor) |
| Confidence | High |

### round_ups_setup_pair
**Visual**: Two side-by-side small spot illustrations — beer mugs (spending) + piggy-bank/coin stack (saving), separated by a tap-arrow.

| Attribute | Value |
|---|---|
| Surface | Setup round-ups bottom sheet / explainer screen |
| Size | ~64px each |
| Style | Flat illustrated, beige + green accent, white background — minimal spot style (NOT grainy) |
| Frames cited | Atom `9442:23914` |
| Confidence | High |

### grainy_gradient_tick_hero (~120px)
**Visual**: Green-to-blue grainy gradient circle (~120px) with white check inside.

| Attribute | Value |
|---|---|
| Surface | Full-screen payment-success confirmation hero |
| Size | ~120px centered |
| Style | Noisy gradient texture (green-blue), 8px white check stroke (NOT 6 — too thin on noisy gradient per cal:2026-05-18) |
| Frames cited | (existing canonical confirmation recipe — `reference_dls_screen_layouts.md`) |
| Confidence | High |

### grainy_gradient_tick_status_indicator (small variant)
**Visual**: Same green grainy gradient texture as the hero, scaled down with a smaller white check inside.

| Attribute | Value |
|---|---|
| Surface | Top-right of payment/cashback transaction-detail header (inline with `Paid ₹X` title) |
| Size | ~32-40px (S-32 to M-40 Avatar) |
| Style | Same noisy gradient family as the 120px hero, miniaturised |
| Frames cited | Credit Card 2026 `66734:22867`, AVC `2410:22541` |
| Confidence | High |

NEW addition: previously only the 120px hero variant was documented in the skill. The small status-indicator variant is a sibling for txn detail headers.

### red_avatar_bold_x (failure indicator, small variant)
**Visual**: Solid red circle ~32-40px with white X glyph inside.

| Attribute | Value |
|---|---|
| Surface | Top-right of "Payment failed" / "Processing failed" transaction-detail header |
| Size | ~32-40px (Avatar Bold) |
| Style | Solid red fill, NO grain, white X glyph (~6-8px stroke) |
| Frames cited | AVC `2410:22541` (Failed light + dark variants) |
| Confidence | High |

The full-screen hero failure variant uses the same red-Bold with X but at ~120px (already documented in `reference_dls_screen_layouts.md` § Transaction Failed recipe).

### amber_processing_ring
**Visual**: Yellow/amber donut or ring ~32-40px with white ! glyph inside (pending indicator).

| Attribute | Value |
|---|---|
| Surface | Top-right of "Processing" / "Pending" transaction-detail header |
| Size | ~32-40px |
| Style | Solid amber ring, possibly with rotating animation (unconfirmed) |
| Frames cited | AVC `2410:22541` (Processing variants) |
| Confidence | High structure, motion TBD |

### blue_info_initiated_ring
**Visual**: Blue circle ~32-40px with white info/arrow glyph inside (initiated indicator — e.g. NEFT transfers awaiting beneficiary credit).

| Attribute | Value |
|---|---|
| Surface | Top-right of "Payment initiated" transaction-detail header |
| Size | ~32-40px |
| Style | Solid blue fill, white info or up-arrow glyph |
| Frames cited | AVC `2410:22541` (Initiated variants) |
| Confidence | Medium (visual small in screenshot; semantics clear from context) |

### spark_lifetime_cashback_avatar
**Visual**: Orange-red flash/spark glyph (the "spark" product icon) in subtle V-50 / cream Avatar M-36.

| Attribute | Value |
|---|---|
| Surface | Cashback-earned callout strip on payment-detail page ("₹300 cashback earned") |
| Size | 36px Avatar with 24px glyph |
| Style | Subtle-bg Avatar — slice's idiomatic icon-in-Avatar pattern |
| Frames cited | Credit Card 2026 `66734:22867` |
| Confidence | High |

### category_dashed_placeholder_avatar
**Visual**: Dashed-outline circle Avatar M-40 with no fill, paired with "Category" label + "Edit" CTA.

| Attribute | Value |
|---|---|
| Surface | "Add category" empty state on payment detail |
| Size | 40px |
| Style | 2px dashed stroke, transparent fill — a tappable affordance / empty Avatar |
| Frames cited | Credit Card 2026 `66734:22867` |
| Confidence | High |

NEW pattern: **dashed Avatar as "add / customise" affordance**. Distinct from solid Avatars; signals "tap to fill" rather than "this is the identity".

### fire_pink_swirl
**Visual**: Pink/magenta swirling abstract illustration (slice fire-mode brand graphic).

| Attribute | Value |
|---|---|
| Surface | Card-styles vertical/horizontal art for Fire card variants on payment success ("FIRE", "FIRE + INSTANT CASHBACK") |
| Size | Full-card width, ~360 × 240 (horizontal) or ~180 × 360 (vertical) |
| Style | Gradient swirl, grainy texture |
| Frames cited | Payment OS 26 `4935:26794` (Fire light + dark columns) |
| Confidence | High — canonical brand artwork for Fire-mode payments |

### monies_green_motif
**Visual**: Green plant / leaf / sprouting graphic with text overlay.

| Attribute | Value |
|---|---|
| Surface | Monies-mode card styles on payment success |
| Frames cited | Payment OS 26 `4935:26794` (MONIES, SPARK+FIRE+MONIES, MONIES TRANSFERRED columns) |
| Confidence | Medium-high |

### invite_earn_hook_magnet
**Visual**: Pink "earn ₹150" graphic with hook/magnet — pink illustration in subtle pink bg.

| Attribute | Value |
|---|---|
| Surface | Invite & earn nudge on Banking L0, Explore L0 (Invite tile in 2×2 grid), Profile (Primary Invite & earn ₹150 button) |
| Size | ~80px trailing-bleed (L0 card variant); larger on Profile |
| Style | Pink hook + magnet motif, gradient texture |
| Frames cited | Banking L0 (R18), Explore L0 (R18), Profile (R18), Payment OS 26 `4935:26794` (INVITE & EARN NUDGE column) |
| Confidence | High |

### super_card_mascot
**Visual**: Blue + pink mascot characters (Meet your slice super card / Learn more about your card promo art).

| Attribute | Value |
|---|---|
| Surface | Credit L0 super card promo (Medium card), Credit Card L1 "Learn more" promo |
| Size | ~80px trailing-bleed within card |
| Style | Friendly branded mascot illustration |
| Frames cited | Credit L0 (R18), Credit Card L1 `45748:1462` |
| Confidence | High |

### asteroid_diamonds_empty_rewards
**Visual**: Asteroid with diamonds floating around it (empty Rewards illustration).

| Attribute | Value |
|---|---|
| Surface | Empty Rewards screen (when no fires earned yet) |
| Size | ~120px centered below leaderboard banner |
| Style | Branded illustration with sparkle / gradient elements |
| Frames cited | Empty Rewards recipe (existing in `reference_dls_screen_layouts.md`) |
| Confidence | High |

### sad_mascot_connection_lost
**Visual**: Sad mascot illustration (large) for the Connection Lost full-screen takeover.

| Attribute | Value |
|---|---|
| Surface | Connection Lost takeover (no app bar, no nav) |
| Size | ~160px centered |
| Style | Real branded illustration — warm slice copy paired |
| Frames cited | Empty/error state recipes (existing) |
| Confidence | High |

## Usage patterns

### When to use illustration vs icon-in-Avatar vs photo vs nothing

| Context | Pattern |
|---|---|
| **Empty / nil state** | Branded illustration ~100-160px, centered. **NEVER** Avatar+glyph. Why: empty states are mood moments; an icon feels like a missing image. |
| **Onboarding hero** | 3D / spot illustration ~120-200px above title + body + bottom CTA. |
| **Hero card / promo card trailing** | Branded illustration ~80px right-bleed (super card mascot, monies cluster, atom orb mini, invite hook-magnet). |
| **Inline status indicator on detail screen** | Small Avatar (~32-40px) — grainy tick for success, red-Bold X for fail, amber ring for pending, blue ring for initiated. |
| **Per-row Avatar with brand illustration** | Atom stashes use photo-illustration in Avatar L-48 for list items (corgi, mountains, etc.) — richer alternative to icon-in-subtle-bg Avatar. |
| **Settings / list rows** | Icon-in-Avatar (white + outline-subtle + slate line icon). NOT illustration. |
| **Action tile (quick action grid)** | White + outline-subtle circle + V-500 line icon. NOT illustration, NOT photo. |
| **Identity Avatar (user)** | Photo Avatar (the user's photo). Same identity across all pods. |
| **Brand-mark / pod icon** | Custom illustration / mascot (slice fire, atom orb, etc.) at hero sizes; line-icon equivalent at small sizes (32-40px Avatar containers). |

### Sizing conventions

| Use | Size |
|---|---|
| Empty state hero | 100-160px |
| Onboarding hero | 120-200px |
| Card trailing-bleed | ~80px |
| Inline status indicator (txn detail header) | 32-40px |
| List row Avatar | 32-48px |
| Tile / icon-grid | 24px glyph inside 48px circle |

### Style consistency

Slice illustrations share characteristics:
- **Real, not generic.** Asteroid + diamonds, atom orb, super card mascots, fire swirl — all custom-drawn for slice.
- **Grainy / gradient / 3D-rendered.** Texture matters. Flat line-art is for prototyping only.
- **Brand-coloured.** V-500, pink, green, blue dominate. Multi-stop gradients allowed only in the 2 sanctioned brand gradients (Valentino → Blue for Payments; Valentino-pink → coral for Rewards leaderboard).
- **Photo-illustration hybrid OK in Avatar containers** (Atom stashes — photo of corgi inside rounded-square Avatar).

### Anti-patterns (illustration-specific)

- ❌ Generic line-art illustrations in shipped surfaces (empty states, confirmation, hero cards). Use real branded.
- ❌ Standalone illustration in list-leading position (no Avatar wrapper). Wrap illustrations in Avatar containers for list rows.
- ❌ Generated / AI-imagined illustrations. Never substitute a real slice illustration with a generic SVG or Claude-drawn glyph. **When asset is missing: use the big-circle dummy** (see below).

### Missing-illustration fallback: dummy placeholder

slice's internal convention when an illustration is specified but the real asset isn't available yet — used in protos, design reviews, work-in-progress builds. **Any dummy works**, with one convention:

| Surface | Usual dummy |
|---|---|
| Big center hero (~120-200px) | **Circle**, solid V-100 (`#F4E5F8`) fill, sized to canonical |
| Trailing-bleed (~80px) | Any reasonable shape (circle / rounded square / outlined box), V-100 fill |
| Inline status (32-40px), list-row Avatar (40-48px) | Any reasonable shape, sized to canonical |

What matters: **hold the layout** so spacing/proportions stay reviewable, **read as placeholder** (V-100 fill, no detail), **flag with comment** (`<!-- ILLUSTRATION-MISSING: name -->`) so the gap surfaces in the next extraction pass.

Available illustration assets on disk live in `slice-design-suite/illustrations/`. If the recipe specifies an illustration NOT in that directory, dummy + flag — do NOT generate, do NOT swap in a generic SVG / Claude-drawn glyph, do NOT skip.

## Source

cal:2026-05-28 R19 — Icons + illustrations sweep across Atom, Credit Card 2026, AVC, Payment OS 26, DLS reference frames. 12 illustrations cataloged (10 new + 2 reverified). Usage patterns extracted from cross-file observations.

---

## Transaction status / Success tick (R24 cont-28)

The canonical slice success glyph — used for transaction status + confirmation
success screens. **Grainy-gradient** green circle (feTurbulence noise + green
linear gradient #59C36A→#34FF55 + radial blue/white accents) with a white
check. NOT a flat green circle + stroke check — the grain is the slice
signature, impossible to fake by hand. Export it.

- File: `ncGqxiE6wUOqgOURwHx6Hp` · component set "Transaction status - Small"
  node `7821:3955`, 8 variants: Success/Failed/Pending/Refunded/Reversed/
  Requested/Expired/Rejected.
- Success variant: node `884:16442`, key `bd790e976212e4ad272c97c6ad60f52a3dda8841`.
- Lives in the DLS **Illustrations** page ("Icon states" frame `884:16447`).
- Cached SVG: `slice-design-suite/illustrations/dls_success_tick.svg`.
- Anti-pattern (already in reference_anti_patterns.md): confirmation success
  uses this textured tick, never an Avatar-with-✓ or a flat halo placeholder.

Source: R24 cont-28, 2026-05-30 — verified user-supplied "Success Icon.svg"
against DLS node 884:16442.
