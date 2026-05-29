---
name: DLS 2.0 Bottom Sheet
description: Modal overlay — 4 row clusters (Action driven / Action on sheet / Payment / Information), 20+ canonical variants. R20 sweep expanded this from a 35-line stub.
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0` node `2001:41881` (component) + DLS working copy `PNUz3Dr9KSlFJSnsXsC0nL` page `3:48` (DLS author marked this page ⚠️ as incomplete; R20 sweep extracted the canonical patterns).

## 4 row clusters (DLS author's taxonomy)

The DLS bottom-sheet page groups variants into 4 named row-clusters. These are the canonical taxonomy — more useful than the earlier 6-variant naming.

| Cluster | What it's for | Handle? | Title alignment |
|---|---|---|---|
| **Action driven** | Sheet asks user to do/decide one thing | NO | Left for directed action / Centre for advisory or destructive-confirm |
| **Action on sheet** | Sheet contains the action itself (input, checklist, picker) | NO | Left |
| **Payment Bottomsheet** | Payment-specific selectors (account picker, plan selector) | **YES** | Left |
| **Information** | Purely informational, dismissible scrollable list | **YES** | Left |

## Shared structure (top to bottom)

1. **Overlay backdrop**: `rgba(0,0,0,0.3)` — works even on saturated brand-purple pages (no need to bump opacity for V-500 surfaces)
2. **Container**: white bg, top corners 16px radius
3. **Optional drag handle** (Payment + Information clusters only): slate-200 pill, ~32×4px, centered, ~8-12px top padding
4. **Header spacer**: 24px tall (per R18 — corrects earlier "20px" + "16px" specs)
5. **Content**: padding `24px` all sides on the content block (left + right + top from edge)
6. **Button group footer**: padding-top 16px between body and button row, padding-x 24px
7. **Gesture nav**: 8px + 4px bar + 8px

## Typography

- Title (Action driven, Action on sheet): **H3** — 20px Medium, 24px lh, 0.4px tracking (corrects earlier "H2" — used only on legacy variants)
- Title (Information, Multiple actions): **H3** — same
- Subtext: Body Normal — 16px regular, 24px lh, color `rgba(0,0,0,0.7)`

## Drag handle — CONDITIONAL rule (R20 refinement of R12)

**Earlier rule (R12, cal:2026-05-18)**: "slice bottom sheets do not show the slate-100 pill at the top — never. Adding a handle reads as iOS Sheet styling."

**R20 override**: drag handle IS canonical on Payment and Information sheets. NOT on Action driven / Action on sheet variants.

| Cluster | Handle present? | Why |
|---|---|---|
| Action driven (Verify, Confirm, single-CTA) | No | Sheet is a directed interrupt; offering drag-dismiss undermines the commit |
| Action on sheet (input, picker, checklist) | No | Sheet IS the action surface; gesture-dismiss while user is mid-input is wrong |
| Payment Bottomsheet (account picker, plan selector) | **Yes** | Sheet is incidental; drag-to-dismiss is the expected exit |
| Information (scrollable list, recent txns) | **Yes** | Content is scrollable; handle communicates "drag to dismiss vs scroll" |

WHY the conditional: handle = "drag-to-dismiss is the exit." That's only meaningful when content scrolls OR the sheet is dismissible without commitment. Action-driven sheets are deliberate interrupts; gesture-dismiss would let users back out of decisions they haven't made.

Source: cal:2026-05-28 R20 — 3 canonical handle frames (`2001:23655` Pay from, `2001:24386` Choose account, `2001:24310` Recent transactions) + 10+ canonical no-handle frames ✅

## Title alignment — CONDITIONAL rule (R20 refinement)

**Earlier rule (cal:2026-05-17, pair 601)**: "Title: left-aligned, sentence case, H3 (or H4 for compact sheets). Not centred."

**R20 refinement**: left for directed-action / input / list / picker (15+ frames). **Centred for advisory / destructive-confirm / illustration sheets** (6+ frames).

| Sheet purpose | Title alignment | Example |
|---|---|---|
| Directed action with avatar/icon leading | Left | "Verify your identity", "Duplicate email!", "Set UPI PIN" |
| Input + numpad | Left | "Daily transfer limit", "Pinless transaction" |
| List picker (radio, chip, account, plan) | Left | "Pay from", "Sign in with", "Choose a plan" |
| Advisory acknowledgment (no avatar) | **Centre** | "Application incomplete", "No pending dues" |
| Destructive confirm | **Centre** | "End call?", "Remove private number" |
| Illustration-led | **Centre** | "All agents are busy" |
| Maintenance / system notice (no CTA) | **Centre** | "Maintenance notice" |

WHY: centred title pairs with symmetric two-button rows or single-CTA layouts where reading order doesn't lead to a single anchor. Left title pairs with anchored avatar/icon at top-left.

Source: cal:2026-05-28 R20 ✅

## Avatar color semantic system (NEW R20 pattern)

When a directed Action sheet uses a 48px leading avatar, the fill encodes the category — Claude should match colour to intent, not pick freely.

| Bg | Avatar fill | Use for | Example sheet |
|---|---|---|---|
| Brand purple | `#D30AD7` (V-500) + white icon | Product / standard action | Verify your identity, Activity link nudge |
| Green | Positive green + white icon | Positive / protection / activation | Set UPI PIN, Account selected |
| Red 50 | Red-50 bg + Red-100 icon | Error / duplicate | "Duplicate email!" |
| Blue | Info blue + white icon | Info / system | Generic informational |

WHY: matches DLS feedback-colour system (success/error/info/brand) — user pre-classifies the sheet before reading. The colour does the heavy lifting; the title just confirms.

Source: cal:2026-05-28 R20 — 4 canonical Action sheets ✅

## Three button-group archetypes

Every canonical sheet uses ONE of three footer layouts. The choice signals action hierarchy.

| Archetype | Layout | Use when |
|---|---|---|
| **Single primary pill** | Full-width 312px, V-500 fill, 100px radius | One path forward (Verify, Set up, Continue) |
| **Two-button row** | Equal-width, gap ~12px, outlined left + filled right (or both outlined for equal-weight) | Binary skip/proceed OR equal-weight destructive/safe |
| **Stacked two-button** | Primary filled on top + outlined OR tertiary text link below, both full-width | One action preferred, escape hatch below |

**Tertiary text link** = brand-purple text only (no stroke, no fill), centred, 8-12px gap below primary. Used for "I'll do it later", "End call", "Schedule call", "Ask me later", "Login with +91 ...6342". This is the "escape hatch" — distinct from outlined Secondary buttons.

WHY: hierarchy signal — adjacent two-button = equal weight; stacked = primary preferred with clear escape; primary + tertiary link = strongly preferred + soft escape.

Source: cal:2026-05-28 R20 — all 20+ variants conform ✅

## Selector trio (when a list of options is the sheet body)

| Selector | Visual | Use for |
|---|---|---|
| **Radio circle** (brand purple fill on selected, white dot inside) | 24px disc trailing | Generic "pick one" (Sign in with, Execution date) |
| **Green-check disc** (green fill + white check) | 24px disc trailing | Account / SIM / active-instrument picker (Pay from, Choose account) |
| **Stroke-as-selected** (2px V-500 border around the whole row container vs 1px slate idle) | No separate radio — the row IS the selection | Plan picker with embedded data (Choose a plan) |

WHY: 3 trios because the affordance language matches the semantic. Radio = "pick one of several." Green check = "this is the chosen account." Stroke-as-selected = "the row IS data — emphasise the whole row, no separate disc."

Source: cal:2026-05-28 R20 ✅

## Avatar / illustration / neither — never both

A sheet uses **either** a 48px brand-categorical avatar **or** a centered illustration above the title **or** nothing. Never both. Never an illustration paired with an avatar.

WHY: avoids visual stacking; the leading visual is a single category signal.

Source: cal:2026-05-28 R20 — across 20+ variants ✅

## Consent sheet — mascot pokes above container

When a consent sheet uses a mascot illustration (e.g. T&C acceptance), the illustration is positioned so its top half extends **above the rounded sheet header into the backdrop area**. The close-X also lives in the backdrop area, NOT inside the sheet. Disabled primary CTA = grey-fill until all checkboxes ticked.

WHY: signals the consent moment is special — earns extra real estate.

Source: cal:2026-05-28 R20 — `2001:23552` Confirm T&C ✅

## UPI payment sheet — "Powered by UPI" footer

Payment source-account picker sheets carry a "Powered by UPI" monogram at the bottom (centred, ~12px below the last list row, above the gesture nav).

WHY: NPCI/UPI brand compliance + user trust signal.

Source: cal:2026-05-28 R20 — `2001:23655` Pay from ✅

## Input sheet (input + numpad embedded)

When a sheet needs amount/number input:
- H3 title left + body
- **Underlined input field** (single line, with clear-X trailing when filled) for in-flow amounts
- OR **outlined-rectangle input** when the value is a new identifier to be saved (e.g. private UPI number)
- Uppercase Metadata caption beneath ("LIMIT PER TRANSACTION")
- Button group with **disabled primary CTA** until a value is entered (grey fill `#E5E5E5`-ish + grey text)
- **Numpad embedded in sheet** — sheet height grows to accommodate; numpad doesn't slide up separately

WHY: keeps the user's context (the question they're answering) visible while typing — unlike a full-screen keyboard takeover.

Source: cal:2026-05-28 R20 — `2001:23874`, `2001:23916`, `2001:24143`, `2001:24195`

## Chip picker (when picking a reason)

For "select a reason" or "pick from 2-6 short options":
- H3 + body → outlined pill chips (1-2 per row, wrap) → optional info card (light-grey rounded-12px) → disabled primary CTA until a chip is picked
- Chip: outlined 1px slate, pill 100r, body-small label, ~12×16 padding

Source: cal:2026-05-28 R20 — `2001:24845` Freeze card

## List-only sheet (no footer CTA)

When the sheet IS an action menu (each row performs the action on tap):
- H3 left → list rows (24px outlined leading icon + label) → row taps perform the action → **NO footer button** → gesture nav
- Row height ~72px (matches Standard list item)

WHY: a footer button would suggest a confirmation step that doesn't exist. The row IS the commit.

Source: cal:2026-05-28 R20 — `2001:23726` Upload account details

## Motion

- **Sheet present**: 280ms `out` (`cubic-bezier(0.22, 1, 0.36, 1)`), translateY 100% → 0
- **Sheet dismiss**: 240ms `out-fast` — exit always faster than entry (asymmetric timing rule)
- **Backdrop**: opacity 0 → 0.3 in parallel with sheet rise
- **Embedded numpad**: rises with the sheet as one unit — no internal stagger
- **Drag-to-dismiss** (Payment / Information sheets only): pointer captures the gesture; velocity-based dismiss (> 0.11 dismisses regardless of distance — see `reference_motion.md` momentum rule)

## What slice bottom sheets DON'T do

- ❌ Drag handle on Action driven / Action on sheet variants (handle only on Payment + Information)
- ❌ Cancel button — bottom sheets carry the Primary action only. Scrim tap is the canonical cancel (R11)
- ❌ Centred title on directed-action sheets — centre is reserved for advisory / destructive / illustration
- ❌ Avatar AND illustration in same sheet — pick one leading visual
- ❌ "Cancel" + "OK" iOS-style button labels — slice uses verbs matching the action (Skip/Continue, Delete/Disable, End call/Stay on call)
- ❌ Side-by-side outlined+outlined or filled+filled buttons in two-button row — always one of each
- ❌ Body text in title case — every title is sentence case
- ❌ In-place list update after a Manage sheet action — close sheet → full-screen loader → updated list

## Calibrated history

- cal:2026-05-17 (R11): no Cancel button on sheets, scrim tap is cancel ✅
- cal:2026-05-17 (R11): left-aligned title (NOW refined — centre also valid for advisory/destructive/illustration per R20)
- cal:2026-05-18 (R12): no drag handle (NOW refined — handle present on Payment + Information per R20)
- cal:2026-05-18 (R12, review-1206): no "confirm payment" bottom sheet pattern (still holds — payment commitments are full screen)
- cal:2026-05-21 (R14, r14-empty-1401): no CTA on Action Centre empty state (related — sheet conventions don't apply to empty surfaces)
- cal:2026-05-28 (R20): 4 row clusters + handle conditional + title-alignment conditional + avatar color semantic system + 3 button archetypes + selector trio + 9 specific variant recipes ✅
