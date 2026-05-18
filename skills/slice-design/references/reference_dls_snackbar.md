---
name: DLS 2.0 Snackbar
description: Toast notification bar — Default (dark) and Negative (red), optional icon and action button
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, nodes `670:240`, `1910:22720`

## Container
- 328px wide | Radius: 12px | Padding-right: 8px

## Types

| Type | Background | Shadow |
|------|-----------|--------|
| Default | #252a31 (neutral) | 0px 2px 32px rgba(0,0,0,0.05) |
| Negative | #da535a (red) | 0px 2px 32px rgba(0,0,0,0.3) |

## Typography
- Text: 14px regular, 20px lh, 0.28px tracking, white
- Action: 14px medium, 20px lh, 0.28px tracking, white

## Slots
- **Icon** (optional): 20×20px, left side, padding-left 16px (e.g. `Status/Tick`)
- **Text**: flex-1, padding 16px
- **Action** (optional): pill button, padding `8px 16px` (e.g. "Reload")

Combinations: text only, text+icon, text+action, text+icon+action.

## With-action vs auto-dismiss
- **With trailing action** (e.g. "Retry"): use for failure states or anything requiring user follow-up. V-500 text on slate-900 bg for the action label.
- **Auto-dismiss** (with status dot, no action): use for passive confirmations ("Payment received") — disappears on its own.

Source: cal:2026-05-17 — pair 606 A (with-action wins as the default failure pattern) ✅
