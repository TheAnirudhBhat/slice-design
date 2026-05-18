---
name: DLS 2.0 List Items
description: List item variants — Standard (Empty/Icon/Avatar), Deposit, Setup, Transaction, Selection
type: reference
---
Figma source: `HBoBlZN1CrmVwO3rXeZjY0`, nodes `796:27418`, `796:27419`, `2465:44860`

## Standard

### Leading variants
- **Empty**: no leading element, 56px height
- **Icon**: 24x24 icon, 56px height
- **Avatar**: circular avatar, 72px height

### Layout
- Padding: `16px 24px` (M vertical, L horizontal)
- Gap: 12px between leading and content
- Width: 360px (full screen)

### Content
- Title: Body Normal — 16px regular, 24px lh, 0.32px tracking
- Color: rgba(0,0,0,0.9)
- Optional info icon: 16px, 4px gap after title

### Trailing
- Optional 24x24 slot (chevron, toggle, icon)

## Deposit
- Stages: 80px height | Avatar: 72px height

## Setup
- Title only: 48px | Title + subtitle: 64px

## Transaction
- 76px height
- **Debit amount colour: Text Primary** (`rgba(0,0,0,0.9)`). Never negative red on routine debits — red reads as bank-app punishment.
- **Credit amount colour: Positive green** (`#00A63E`), prefixed with `+`.
- Why: slice keeps debits calm and reserves colour for the moment of relief (credits).
- Source: cal:2026-05-17 — pairs 001 + 304 + 401, 3 picks 100% ✅

## Insight row (spend insight)
- Uses the Standard-Avatar variant (72px) with a category Avatar leading (Subtle bg, line-icon glyph).
- **Trailing amount uses Body Normal** (16 / Regular / 24 / 0.32) — same weight as the title. **Not** H4 Medium.
- Why: the row's identity is the *category* (Food / Travel / Groceries), not the amount. H4 on the amount flips hierarchy — the eye lands on a number before "what".
- Distinct from Transaction rows, where the amount is the outcome — there too, amount stays Body, not H4.
- Source: cal:2026-05-17 — pair 402 reason "right number font is too bond" ✅

## Selection
- Default/Loading/Disabled: 52px height, 296px width

## Disabled state
Disabled list items use **light opacity dim** (~0.7) on the whole row — not a grey-fill background. The dim is light: enough to read as "not now", not "broken".
Source: cal:2026-05-17 — pair 704 A + reason "little fade is fine, this is too much fade" ✅

## Unread marker
Unread list items use a **trailing V-500 dot** (8×8). Don't bold the text — bold reads as semantic emphasis, not as state.
Source: cal:2026-05-17 — pair 713 A ✅

## Load-more — auto on scroll
Long lists auto-load on scroll (spinner near bottom, "Loading more…" caption) — not via an explicit "Load more" button. Auto-load preserves continuity; explicit button adds a tap for no reason.
Source: cal:2026-05-17 — pair 715 A ✅

## Selection list marker
In-list / in-sheet selection lists use **radio circles** (filled when selected) — not checkmarks. Radio reads as "pick one"; checkmark reads as multi-select.
Source: cal:2026-05-17 — pair 719 A ✅

## Form validation — inline placement
Form validation errors appear **inline below each invalid field** (Caption / red-500). Not as a top banner. Local context wins over global summary.
Source: cal:2026-05-17 — pair 717 A ✅

## Account selector pattern
The "From account" picker on payment flows uses a **full-width row** (Avatar S-32/M-40 + caption "From" + value "HDFC Bank ••1234" + trailing chevron) — not a compact pill chip.

The full-width treatment gives the source-account choice the weight it deserves (mistakes in payment source are costly).
Source: cal:2026-05-17 — pair 801 A ✅

## Compact list item (Standard-Empty, 56px)
For settings menus and link-list patterns (Privacy policy / Terms / Logout), use **Standard-Empty (56px)** rows — title-only, no avatar, no subtitle. Denser, calmer.

Reserve Standard-Avatar (72px) for rows that carry identity (contacts) or context (settings rows with descriptions).
Source: cal:2026-05-17 — pair 819 A ✅

## Group avatar — overlapping stack
When showing a group (shared expense, group chat), avatars **overlap with 2px white borders** between them — not spaced individually. Overlap signals "they belong together"; spacing signals "individuals."
Source: cal:2026-05-17 — pair 817 A ✅
