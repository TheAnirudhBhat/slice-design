---
name: DLS 2.0 User Action Request banners
description: 8-colorway banner family with Avatar + Title + Subtitle + optional CTA. Used for prompts that require user response (activation, KYC, low balance, surplus notification, etc.). Previously undocumented in slice-design.
type: reference
---
Figma source: `PNUz3Dr9KSlFJSnsXsC0nL` page `4:57` ("Carousel" — banners live here oddly because they share the carousel surface), variants documented in the DLS file as a row of 8 colorways.

The **User Action Request banner** is a full-width pill-like callout that surfaces something requiring user attention — activate a product, complete KYC, low balance warning, surplus notification, marketing nudge. Distinct from cards (which are persistent data) and snackbars (which are transient toasts).

This molecule was entirely undocumented in slice-design prior to R19.

## Anatomy

```
┌─────────────────────────────────────────┐
│  [Avatar]  Title H4 left              │  ← top row
│            Subtitle Caption secondary  │  ← bottom row (optional)
│                              [Activate] │  ← optional trailing CTA
└─────────────────────────────────────────┘
```

Composition:
- **Container**: full-width pill / banner, Radius L (16), 12px-16px padding (12 vertical / 16 horizontal)
- **Leading**: Avatar S-32 (32×32 circle) with line icon, colour per intent (see colorway table)
- **Title**: H4 (16/20 Medium)
- **Subtitle**: Caption (12/16, secondary colour, optional — 1 line)
- **Trailing CTA**: optional pill button (Tertiary Small) — used for action-required banners like "Activate"
- **Gap**: 12px between Avatar and text block, 4px between Title and Subtitle

## Colorway taxonomy

| Variant | Bg | Avatar | Intent | Example use |
|---|---|---|---|---|
| **Brand subtle (V-50)** | Valentino-50 `#FAE2FA` | V-500 Bold | Slice-product / brand-feature prompt | "Activate spark", "Set up Atom" |
| **Slate neutral** | Slate-10 `#F6F9FC` | Slate Bold | Neutral / informational | "Update your address", "Verify selfie" |
| **Brand pink subtle** | Pink-50 (lighter pink) | Pink Bold | Rewards / earnings prompt | "Claim your reward", "₹150 earned — invite a friend" |
| **Warning yellow subtle** | Yellow-50 / Amber-50 | Amber Bold | Warning / attention-needed | "Low balance — top up", "Action required" |
| **Negative red subtle** | Red-50 | Red Bold | Failure / urgent action | "Payment failed — retry", "Card blocked" |
| **Positive green subtle** | Green-50 | Green Bold | Success / positive prompt | "UPI credit card activated", "Surplus available" |
| **Info blue subtle** | Blue-50 | Blue Bold | Informational / promo | "Pay bills with credit card", "Set up autopay" |
| **Brand magenta SOLID** | Valentino-500 `#D30AD7` (full fill, white text) | White Avatar with V-500 glyph | Brand-immersive emphasis | "Activate slice card" (rare — solid V-500 reserved for major activations) |

WHY 8 colorways: banners need to communicate intent before the user reads the words. Green = OK / done. Amber = pay attention. Red = something broke. Blue = informational. V-50 = slice-product feature. Slate = neutral. The colour codes the urgency / category; the title explains specifics.

## When to use vs other patterns

| Surface | Use this molecule? |
|---|---|
| Persistent data card (balance, FD, spends) | NO — use Card with appropriate chrome |
| Transient confirmation ("Saved!") | NO — use Snackbar |
| In-card callout INSIDE a parent card (Credit L0 callout taxonomy) | NO — use the Credit L0 in-card callout taxonomy (4-color, see `reference_dls_screen_layouts.md`) |
| Standalone full-width prompt for user action | YES — User Action Request banner |
| Empty-state hero | NO — use empty-state recipe (illustration + title + body + optional CTA) |
| L0 banner-position promo | YES — User Action Request banner (Brand magenta SOLID variant for major) |

The cleanest cue: if the surface is **persistent and informational** → card. If it's **persistent and prompts an action** → User Action Request banner. If it's **transient** → snackbar.

## Composition rules

1. **One banner per scroll-view region.** Multiple banners stacked compete for attention. If multiple states need surfacing, prioritize one and queue the others or move them to Action Centre.
2. **Title is verb-led when action required.** "Activate slice card" > "Slice card activation pending". Verb forward.
3. **Trailing CTA only when action is genuinely required.** Banners without a trailing CTA are read as informational — the whole banner is the tap target.
4. **Don't pair with chevron `›` trailing** — the trailing CTA owns the affordance. If both a CTA and a chevron appear, chevron is anti-pattern (competing affordances).
5. **Avatar matches the bg colour family.** V-50 bg + V-500 Avatar; Green-50 bg + Green Avatar; etc. Avatar carries the same hue as bg but at Bold emphasis.

## Anti-patterns

### ❌ Banner with grey-on-white card chrome (banner styled as a card)
Looks like: User Action Request banner rendered with a 1px outline-subtle border and shadow, instead of the subtle-bg fill.
Why slice doesn't: subtle-bg fills are the visual language of banners. Adding card chrome makes a banner look like a persistent data card, which dilutes the "prompt requiring action" signal.
Do instead: keep subtle-bg fill, no border, no shadow. The bg colour IS the chrome.

### ❌ Mixing 2 banner colorways in adjacent positions
Looks like: a Warning yellow banner stacked directly above a Negative red banner on the same screen.
Why slice doesn't: the two warning colours compete for the same attention slot. Users can't tell which is more urgent.
Do instead: pick the most-urgent one to surface; route others through Action Centre or queue for later.

### ❌ Using Brand magenta SOLID for routine banners
The solid V-500 fill is the brand-immersive variant — it claims a lot of visual weight. Reserve for **major activation moments** (first-time product activation, major brand event). Routine banners (autopay nudge, low balance warning, etc.) use subtle-bg colorways.

## Source

cal:2026-05-28 R19 — DLS molecules sweep, page `4:57` shows 8 colorway variants in the canonical Carousel page. Cross-referenced against Atom Banking L0 entry card (uses Brand subtle), Credit Card L1 (uses Positive green inline), and Banking L0 hero (uses subtle V-50 for "Grow your savings" CTA-row treatment).

Confidence: high on structure + 8 colorways. Specific token hex values inferred from DLS standard subtle / Bold palette; exact values verified against design context where possible.
