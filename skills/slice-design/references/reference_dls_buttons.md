---
name: DLS 2.0 Buttons
description: Button types (Primary/Secondary/Tertiary/Grey), sizes (Regular/Small), states, on-color variants
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, node `232:33896`

## Types

| Type | Background | Text | Border | Pressed bg |
|------|-----------|------|--------|-----------|
| Primary | #D30AD7 | white | none | #A008A3 |
| Secondary | transparent | #D30AD7 | 1px solid rgba(0,0,0,0.2) | #FAE2FA |
| Tertiary | transparent | #D30AD7 | none | #EAEBED |
| Grey | #F0F4F7 | rgba(0,0,0,0.9) | none | #EAEBED |

Disabled bg (all): #EAEBED

## Sizes

| Property | Regular | Small |
|----------|---------|-------|
| Height | 48px | 36px |
| Padding | 12px 24px | 8px 16px |
| Font | 16px medium, 24px lh, 0.32px tracking | 14px medium, 20px lh, 0.28px tracking |
| Icon | 24x24 | 20x20 |

## Common
- Border radius: 100px (pill)
- Gap icon↔text: 8px
- Layout: flex, items-center, justify-center
- States: Default, Pressed, Disabled, Loading
- Icon-only button: 48x48 (regular), 36x36 (small)

## On Color (for use on colored backgrounds)
- Primary: white bg, text rgba(0,0,0,0.9)
- Secondary: transparent, border rgba(255,255,255,0.3), text white
- Grey: rgba(0,0,0,0.1) bg, text white
- Tertiary: transparent, text white

## States (calibration-confirmed)

### Disabled
Disabled buttons use **opacity dim on the Primary fill** (not a grey-fill swap). The dim is **light** — closer to `opacity: 0.7`, not 0.4 (heavy dim reads as broken, not "wait").
Source: cal:2026-05-17 — pair 701 A + pair 704 reason "little fade is fine, this is too much fade" ✅

### Loading
Loading buttons keep the **label visible alongside the spinner** ("Paying…"). Don't replace the label with just a spinner — the verb tells the user what's happening.
Source: cal:2026-05-17 — pair 700 B ✅

### Destructive (no red fill)
Destructive actions never use a red-fill Primary. Use the alert-dialog pattern with neutral Primary, or a Tertiary outlined button with red text label. See `reference_anti_patterns.md`.

## Calibrated default config (tune lock 2026-05-18 — height under review)

```json
{
  "types": ["primary", "secondary", "tertiary", "text"],
  "sizes": { "normal": 48, "small": 36 },
  "radius": "Circle (100px)",
  "copy_rules": "verb-first · 1–2 words · sentence case · \"Pay ₹500\" not \"Submit\"",
  "defaults": { "type": "primary", "size": "normal" }
}
```

Source: cal:2026-05-18 — tune-1301 lock. **Open question** (user note: "buttons look a little too big, idk"): is Regular height 48 right? Queue A/B for next batch comparing Regular=48 vs Regular=44. Until that resolves, 48 stands as the calibrated default.
