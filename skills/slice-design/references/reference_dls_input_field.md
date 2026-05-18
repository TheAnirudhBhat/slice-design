---
name: DLS 2.0 Input Field
description: Underlined input — states, divider colors, typography, help/error/success text
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, node `1974:18462`

Style: **underlined** (bottom divider, not pill/bordered)

## Structure
- Top padding: 12px
- Text area + optional right icon (16px in 4px padding)
- Underline divider
- Gap to help text: 12px

## Typography
- Placeholder: Body Normal — 16px regular, color rgba(0,0,0,0.5)
- Input text: Body Normal — 16px regular, color rgba(0,0,0,0.9)
- Help/error/success: Caption — 12px regular, 16px lh

## States & Underline Colors
| State | Underline |
|-------|-----------|
| Empty | rgba(0,0,0,0.05) |
| Focused | brand purple (Valentino) |
| Typing | brand purple |
| Filled | rgba(0,0,0,0.05) |
| Disabled | rgba(0,0,0,0.05), text rgba(0,0,0,0.3) |

## Feedback Text Colors
- Help: rgba(0,0,0,0.7) | Error: #CE1D26 | Success: #00A63E

## Variants
- Default, Help text, Error, Success
- OTP (4/6 digit), PIN (4/6 digit)

## Right Icon
- Optional 16px clear/cross icon in 4px padding wrapper

## Error state
Error state uses the underlined style with a **red bottom border** (Red 500 / `#CE1D26`, 2px) and a **red error caption** (Caption type, Red 500) below. Outlined-box variant for errors is not used.

Source: cal:2026-05-17 — pair 616 A ✅

## Focused state
Focused inputs use **Caption label above** + **V-500 bottom border** (2px). No scale-and-promote-to-Metadata animation — slice keeps the label calm.
Source: cal:2026-05-17 — pair 702 A ✅

## Filled idle state
Filled inputs are **value-dominant** — the entered value reads as H4, the label sits above in Caption. Don't flip the hierarchy (label dominant, value small).
Source: cal:2026-05-17 — pair 703 A ✅

## UPI ID display — show in full
Display UPI IDs in full (`anirudh.bhat@slice`) — not masked. UPI IDs are public identifiers like email addresses; masking adds privacy theatre without protecting anything real and makes verification harder.
Source: cal:2026-05-17 — pair 901 A ✅

## Card expiry display — MM/YY (short)
Card expiry is rendered as `12/27` (MM/YY, slashed) — not `Dec 2027`. Short form matches the printed-card convention and fits inline with other compact card metadata.
Source: cal:2026-05-17 — pair 903 A ✅
