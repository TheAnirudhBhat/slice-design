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

## R19 update (2026-05-28) — List item type taxonomy from canonical DLS

The canonical DLS List items page (`3:41`) organizes rows by **use-context type**, not just leading variant. Adding 4 sub-types that were undocumented:

### Sub-type: Search (NEW)
Search-result rows. Shorter than Standard, with the matched text **highlighted** (bold or coloured) within the title. Used in search-result screens.

### Sub-type: Subtitle (NEW)
Row variant with **prominent caption-style subtitle** below title. Subtitle is more visible than the Standard secondary subtitle — possibly Caption Medium weight.
- Title H4 (Body weight)
- Subtitle Caption secondary (Medium weight, more prominent than usual)

Used for: account-selector rows showing account name + bank + balance, payee-with-context rows.

### Sub-type: L0 (NEW)
Standard row rendered on L0 surfaces (Activity L0 transaction rows are the canonical example). Same as Standard but with L0-specific padding/scaling.

### Sub-type: Control (NEW)
List items with **trailing controls** (Switch / Toggle / Radio / Checkbox). Distinct from Selection (which uses radios only).

Control row anatomy:
- Leading: Empty / Icon / Avatar (same as Standard)
- Title + optional Subtitle
- **Trailing: Switch (green-fill default per cal:2026-05-28) / Toggle / Radio / Checkbox**
- Tap the row toggles the control; the control isn't a separate tap target

Used for: Settings pages, permission toggles, notification preferences.

### Existing heights stand
Existing height specs (Standard 56/72px, Transaction 76px, Setup 48/64px, Selection 52px) remain canonical. The R19 finding is that Search / Subtitle / L0 / Control are documented variants of the Standard family with their own anatomy details.

Source: cal:2026-05-28 R19 — DLS molecules sweep, List items page `3:41` ✅

---

## Canonical Transaction row spec (R24 cont-22, 2026-05-29)

Source: `figma_get_library_component_by_key` on `List item/Transaction` →
variant `Type=Transaction` (componentKey `57e2a21c6b1758903b732050281bfb146cc1a4fd`,
node `796:27298`).

**visualSpec.layout** (verbatim from Figma):
```
mode: HORIZONTAL
paddingTop:    16
paddingRight:  24
paddingBottom: 16
paddingLeft:   24
itemSpacing:   12       (avatar → content gap)
counterAxisAlign: CENTER  (vertically center avatar against text stack)
```

**Bounds**: 360 × 76 (full row width × full row height).

**Default property values**:
- Name: "Sanjay S."
- Subtitle 1: "24 Jan '26"
- Subtitle 2: "UPI"
- Show Subtitle 2: true → renders as "24 Jan '26 · UPI"
- Avatar: true

**Typography** (verified against canonical Activity L0 screenshot):
- Name: 16/24 Medium 500 (Body Strong) — primary anchor
- Amount: 16/24 **Regular 400** (Body Normal) — one step lighter
- Subtitle: 14/20 Regular 400 (Caption) tertiary

**Internal layout**:
- Title and amount sit baseline-aligned via `display:flex; alignItems:'baseline'; justify-content:'space-between'`
- Subtitle stacks underneath the title in a second row (gap 4)
- Avatar centers against the title+subtitle group via outer `alignItems:'center'`
- NO inter-row dividers between rows (separation is whitespace only)

**Avatar (M-40)**:
- 40×40 visible
- Outlined circle for non-contact rows: 1px border, white interior, centered letter
- Photo for contacts: 40×40 image, no border
- Received/cashback rows: green border + green letter (matches canonical "Jan fires", "Dec savings interest")
- Failed/pending: NO badge on the avatar; state communicated by subtitle text color (red / amber) + amount color

**Promoted rules**:
1. Don't reinvent transaction rows. Use the canonical padding `16/24` + gap `12` + alignItems `center`.
2. Don't put status badges on avatars. Use subtitle text + amount color.
3. Don't add a trailing chevron — txn rows in the Activity list are tappable but the affordance is the whole row, not an inline glyph.

Source: R24 cont-22, 2026-05-29.
