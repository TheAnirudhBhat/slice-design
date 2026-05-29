---
name: DLS 2.0 Display Amount (₹)
description: Big ₹ amount entry — Indian comma grouping, dynamic font shrink, ₹50,00,000 cap on the Valentino home dialer.
type: reference
---

The Display amount is the centered hero number on the Valentino home (Payments L0), FD purchase L1, Atom amount-entry L1, and any custom-keypad-driven amount-entry surface.

## Anatomy

- Centered horizontally and vertically within the page's amount-zone band
- `₹` symbol leading, **same digit weight** — never subscript, never lowered/raised
- Tabular-nums for digit width consistency (`font-variant-numeric: tabular-nums`)
- Font: Rubik Medium (500), `letter-spacing: -0.02em`
- Color: white on V-500 page; slate-90 on white page

## Indian comma grouping (lakhs/crores convention)

Group digits using the **Indian numbering system**, not Western thousand-separators:

| Raw value | Formatted | Notes |
|---|---|---|
| `1` | `1` | |
| `99` | `99` | |
| `999` | `999` | No comma until 4+ digits |
| `9,999` | `9,999` | First comma at 4 digits (separates last 3) |
| `99,999` | `99,999` | |
| `9,99,999` | `9,99,999` | Indian convention: from 6th digit, group every 2 (not 3) |
| `99,99,999` | `99,99,999` | |
| `50,00,000` | `50,00,000` | The cap (50 lakhs) |

Implementation:
```js
function formatINR(amountStr) {
  if (!amountStr) return '0';
  const [intPart, decPart] = String(amountStr).split('.');
  const lastThree = intPart.slice(-3);
  const rest = intPart.slice(0, -3);
  const grouped = rest
    ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree
    : lastThree;
  return decPart !== undefined ? `${grouped}.${decPart}` : grouped;
}
```

## Dynamic font size (shrink-as-you-type)

The font size **shrinks** as the number grows so the formatted amount always fits within the centered band without horizontal clipping or overflow.

| Integer-part digits | Font size (px) |
|---|---|
| 1–3 | 88 |
| 4 | 80 |
| 5 | 72 |
| 6 | 60 |
| 7 (at the 50L cap) | 50 |

Transition: `font-size 220ms cubic-bezier(0.25,0.1,0.25,1)` for a smooth shrink as the user types each digit.

## Cap: ₹50,00,000 (50 lakhs)

Per slice product rules:
- **Max single-transaction amount**: ₹50,00,000 (5,000,000 paise / 50 lakhs)
- Cap enforced at input time: any digit press that would push the value above 5,000,000 is rejected (input ignored).
- Cap applies to the integer part only; decimal portion is unlimited within the cap.

```js
// Inside the digit-press handler, before appending:
const proposed = Number(intPart + key);
if (proposed > 5000000) return prev; // reject — input ignored
if (intPart.length >= 7) return prev; // also reject if already 7 digits
```

## Anti-patterns

- ❌ Western thousand-separator (`50,000,000` instead of `50,00,00,000`) — wrong locale convention.
- ❌ `₹` subscript or smaller weight than the digits. ₹ matches the digit size always.
- ❌ Fixed huge font size when the amount has 6-7 digits — overflows or breaks layout.
- ❌ Allowing amounts above ₹50,00,000 on a single transaction.
- ❌ Not transitioning the font-size change — makes the resize feel snap-y.

## Where it appears

- Valentino home (Payments L0) — main dialer
- FD purchase L1 — Deposit amount entry
- Atom amount-entry L1
- Add money to Savings amount entry
- Repay credit-card amount entry (rotary dialer)
- Any custom-keypad surface

## Source

cal:2026-05-29 R23 — Documented during slice-app-proto build, validated against Figma Pay L0 dialer (file `HBoBlZN1CrmVwO3rXeZjY0`).
