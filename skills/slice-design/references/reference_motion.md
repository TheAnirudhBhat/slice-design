# Motion — slice durations, easings, choreographies

Motion in slice is **functional first, expressive second**. Every animation serves a moment (entry, exit, state change, attention-grab) and then stops — no ambient loops except shimmer.

When `design-motion-principles` (or any other skill) suggests something that conflicts with this file, slice-design wins. See `reference_anti_patterns.md` for the explicit conflict table.

## Named durations

| Token | ms | Use for |
|---|---|---|
| `instant` | 80 | Toggle dot moves, switch flips |
| `quick` | 160 | Press feedback (opacity dim), state colour swap, hover (web) |
| `base` | 240 | Sheet header morph, inline value change |
| `gentle` | 320 | Push/pop nav, screen-level transitions |
| `linger` | 520 | Title push-up cross-fade (see Spark choreography) |
| `bling` | 640 | Attention twitch on highlight icon (one-shot only) |
| `shimmer` | 1200 | Skeleton loading shimmer (linear infinite — the only allowed loop) |

## Named easings

| Token | curve | Use for |
|---|---|---|
| `out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default. Push/pop, sheet, value change, title push-up. |
| `out-fast` | `cubic-bezier(0.16, 1, 0.3, 1)` | Pressed state release, quick lift |
| `in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | State change with both ends visible (toggle) |
| `spring-soft` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bling twitch — overshoot. **Only** for one-shot attention. |

Do not invent custom curves. If a moment doesn't fit one of these four, ask before adding.

## Choreographies — reusable patterns

### Nav push (screen → screen)
- Outgoing screen: translateX 0 → -25%, opacity 1 → 0.7, 320ms `out`
- Incoming screen: translateX 100% → 0, 320ms `out`
- Bottom nav: stays put, no transition

### Nav pop (back)
- Incoming screen: translateX -25% → 0, opacity 0.7 → 1, 320ms `out`
- Outgoing screen: translateX 0 → 100%, 320ms `out`

### Sheet present (bottom sheet, modal)
- Sheet: translateY 100% → 0, 280ms `out`
- Backdrop: opacity 0 → 0.3 (`overlay` token), 280ms `out`
- Page underneath: stays put (no scaling)

### Sheet dismiss
- Sheet: translateY 0 → 100%, 240ms `out-fast`
- Backdrop: opacity 0.3 → 0, 240ms `out-fast`

### Press feedback (tappable surface)
- Opacity 1 → 0.7 over 160ms `quick`, then back to 1 over 160ms `out-fast` on release
- **NEVER scale** the surface on press (no rubber-band). See anti-patterns.

### Value change (amount, counter)
- New value: translateY -100% → 0 + opacity 0 → 1, 240ms `out`
- Old value: translateY 0 → 100% + opacity 1 → 0, 240ms `out` (same time, mask edges)

### Skeleton shimmer
- Linear gradient (`#F6F9FC` → `#EAEBED` → `#F6F9FC`) translateX -100% → 100%
- 1200ms `linear` infinite
- Only allowed infinite loop in the app

### Spark hero reveal (anchor → reveal)

Validated 2026-05-17 in explore-base. Use when a card has a quiet anchor state that should resolve into a richer state (savings hook → live drops, balance hook → reward unlock).

- **t=0** — initial state visible (static icon + anchor copy)
- **t≈1.6s** — icon does a short bling twitch (scale + wiggle, 640ms `spring-soft`)
- **t≈1.8s** — title pushes from below into new copy (translateY 100%→0%, 520ms `out`, edges masked top/bottom 22%/78% for fade-on-cross)
- **t≈2.1s** — icon rotates 360° + scales to 0 + opacity fades; brand pills cascade in from the same anchor with right→left stagger

Do not apply for routine state changes or filter toggles — too much choreography for a casual interaction.

Source: mem:feedback_spark_reveal_choreography ✅

## What we do NOT animate

- Card hover (web protos): no lift, no shadow swap, no scale. Cards on slice are tap targets, not hover surfaces.
- Header titles: stay still. Movement is in the body content.
- Bottom nav: never animates between screens (anchored layer).
- Avatars: do not pulse / glow / breathe. If you must signal "live", use a small Valentino dot, not motion.
- Buttons: no shimmer through the label. No gradient sweep.

## What we never use (anti-motion)

| Pattern | Why not |
|---|---|
| Infinite parallax | Battery + attention cost; signals "playful" not "trustworthy" — wrong for fintech |
| Spinning logos / icons | Reads as "loading" even when not loading; confuses users |
| Bounce on tap | iOS-y / consumer-toy aesthetic; slice is calm fintech |
| Page-level scaling on sheet present | iOS-Maps look; doesn't fit a 360-width phone-first design |
| Stagger > 80ms per item in a list | List feels broken / slow |
| Auto-playing video in cards | Battery, data, accessibility — never |

## Cross-skill notes

- **design-motion-principles** is a great audit lens but is platform-neutral. Slice's choices (Rubik-only, 4 easings, no rubber-band, no infinite ambient motion) are tighter.
- **frontend-design** suggests "ambitious visual effects" — for slice, the ambition is restraint plus the spark reveal moment.
