---
name: DLS 2.0 PIN / OTP field
description: Slice PIN entry pattern — circular input boxes
type: reference
calibrated: 2026-05-17
---

Slice PIN / OTP entry uses **circular input boxes** — one circular slot per digit, V-500 outline on focus, filled dot inside on entry. Not square boxes, not dots-on-underline.

## Anatomy
- Each digit slot: 48×48 circle (Radius Circle / 100px)
- Idle: 2px outline-bold border, transparent bg
- Filled: 2px V-500 border, V-500 filled dot (12×12) centred inside
- Focused (current digit): 2px V-500 border, no inner dot yet
- Error: 2px red-500 border (digit count: 4 for PIN, 6 for OTP, 6 for UPI PIN)

## Layout
- Gap between slots: 12px
- Centred horizontally on the screen
- Sits below a single-line caption ("Enter PIN" / "Enter OTP")

Source: cal:2026-05-17 — pair 515 reason "we have circular input boxes" ✅

## CVV input — same pattern as PIN
CVV entry uses the **same circular input boxes** as PIN (3 boxes instead of 4), with V-500 outline on focus and a filled dot inside on entry. Not a single underlined input.

Source: cal:2026-05-17 — pair 904 reason "circular input, for CVV" ✅

## PIN entry screen — full anatomy (refined)
Refined against the production reference (review-1105, 2026-05-17):

### Layout
- Top-left aligned (NOT centred). Page padding: 24px sides.
- Sequence top→bottom:
  1. App bar Standard with chevron back, no title
  2. **Display-size title** ("Enter slice PIN") — uses Display/Small (~48px), not H2
  3. **Context subtitle** ("Paying ₹1,000 to Aman") — body, secondary color. Always carries transaction context when invoked mid-flow, not the generic "4 digits to unlock".
  4. PIN slot row — left-aligned, 24px gap from subtitle
  5. System keyboard takes over from below — **NOT the slice custom keypad** (custom keypad is for amount entry, e.g. Send money)

### Slot sizing (refined)
- Slot diameter: **~64×64** (not 48×48). Larger than the M-40 quoted earlier — these are first-class focus targets.
- Filled dot inside: ~12×12 V-500
- Gap between slots: 12px
- The currently-focused slot **briefly shows the typed digit** before masking — this is intentional feedback, not a bug. Mask delay ~600ms.

### Forgot PIN
A `Forgot PIN?` text link (V-500 buttonSmall) typically anchors near the bottom-left of the content area, above the keypad. Optional on context-driven flows where recovery routes through a different surface.

Source: cal:2026-05-17 — review-1105 reference frame ✅
