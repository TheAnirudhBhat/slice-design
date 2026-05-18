---
name: DLS 2.0 Pills (segmented control)
description: Pill segmented control — slice's filter/state-toggle pattern, used instead of Tabs
type: reference
---

Slice doesn't use Tabs as a UI pattern. For filtered views, switch between modes, or "show me X vs Y" choices, slice uses **pills** (segmented control).

## Anatomy
- Container: slate-10 (`#F6F9FC`) bg, 1px outline-subtle border, Radius Circle (100px), 4px internal padding
- Active option: white bg, 1px subtle shadow (`0 1px 2px rgba(0,0,0,0.06)`), V-500 text, Rubik Medium
- Inactive options: transparent bg, secondary text colour
- Heights: 38px (regular), 32px (small)
- Internal padding per option: 8px vertical, 16–20px horizontal (depending on content width)

## When to use
- Filter a list (All / Sent / Received)
- Toggle a binary or ternary state (Cards / UPI / All)
- Pick a mode in a single surface (Day / Week / Month)

## When NOT to use
- Top-level navigation between pods → use Bottom nav
- Many options (5+) → use a Bottom sheet with selection list
- Mutually exclusive but rare states → use a Bottom sheet picker

## Anti-pattern
Using a **Tabs** component (underline-style top bar) in slice product surfaces. See `reference_anti_patterns.md`.

Source: cal:2026-05-17 — pair 504 reason "no tabs in slice, we only have pills" ✅
