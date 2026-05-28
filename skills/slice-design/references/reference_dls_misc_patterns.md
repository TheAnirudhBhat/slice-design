---
name: DLS 2.0 Misc patterns (calibration-extracted)
description: Receipt breakdowns, FAQ items, permission sheets, tags on cards — patterns that don't fit one component family
type: reference
calibrated: 2026-05-17
---

## Receipt / transaction breakdown
Use a **bordered table** with:
- 1px `outline-subtle` between rows
- Grey `slate-10` background on the total row (last)
- Label (Body) left, value (Body) right
- Total row labels and value in Medium weight

A list-of-rows pattern (no borders) reads as "more transactions" — wrong cognitive frame. The table reads as "this is the breakdown."

Source: cal:2026-05-17 — pair 807 B ✅

## FAQ / accordion item question
The question text on a collapsed FAQ row uses **Body weight (Regular)**, not H4 Medium. Trailing chevron at 20px.

Why: questions are read; making them Medium overemphasises them and makes scanning fatiguing.
Source: cal:2026-05-17 — pair 808 B ✅

## Permission ask sheet — minimal default
Default permission ask sheet: **no illustration** — just title (H3) + body (Body Normal, secondary text) + Primary CTA full-width. Save illustrations for true onboarding moments, not interruptive permission prompts.

Source: cal:2026-05-17 — pair 809 B ✅

## Tag on card — use Chip variant
When a card displays a status tag (Active, Expired, Pending), use the **Chip** component (small rounded pill with brand-tinted bg + matching text colour). Don't use a plain Metadata UPPERCASE label — chip gives the status a container that reads as a discrete badge.

Source: cal:2026-05-17 — pair 818 A ✅

## EMI plan — list rows, not table
EMI options use **list-item rows** (leading number + label + trailing amount) — not a bordered table. List rhythm matches the rest of slice; the table treatment (cal R8 receipt) is reserved for breakdowns, not selectable plans.

Source: cal:2026-05-17 — pair 914 B ✅

## Payee in payment confirmation
Use the **large treatment** — H3 name on its own line, caption with amount/VPA below. Not a compact pill chip. The payee is the headline of a confirmation, not a chip.

Source: cal:2026-05-17 — pair 908 B ✅

## Interest accrued display — running tally
For active investments, show the **running tally** ("+₹2,847 earned so far · @ 7.25%") with V-500 or green emphasis. Not the end-state projection. Running tallies reward checking in; end-state framing kills the daily-engagement loop.

Source: cal:2026-05-17 — pair 916 A ✅

## Loading copy — "Loading…", not fake-friendly
Use the system-default "Loading…" caption with a centred spinner. Don't write "Hold on a sec" or other fake-friendly variants — they read as overly cute on financial actions where speed and trust are what matter.

Note: this differs from error copy, where slice prefers calm/friendly tone (see pair 927 — kept open).

Source: cal:2026-05-17 — pair 926 B ✅

## CTA verb — action + value
Primary CTAs use **verb + value** ("Pay ₹500", "Send ₹1,000") — not verb + object ("Send payment"). The value in the button makes the action concrete and reduces second-guessing.

Source: cal:2026-05-17 — pair 928 A (revised from neither) ✅

## Error copy tone — friendly, not technical
Error states use **calm, friendly language** ("Something didn't work · try again in a moment") — not technical error codes ("Error 504: Gateway Timeout"). Errors are stressful by default; the copy shouldn't add to the panic.

This differs from loading copy, which uses the calm system default "Loading…" (no fake friendliness). The asymmetry: errors get warmth (cushion the bad news); loading gets neutrality (don't oversell speed).

Source: cal:2026-05-17 — pair 927 A ✅

## Empty-state copy length
Empty-state copy is **explanatory, not terse**. Title + 1-2 line body that guides what to do next ("Spend on your slice card to earn cashback, fires, and Spark interest. Your rewards will appear here") — not just "No rewards yet."

The empty state is the only moment a user gets to learn what *will* appear there. Don't waste it.

Source: cal:2026-05-17 — pair 929 B ✅

## Sparkline shape — smooth, not stepped
Inline sparklines (stat cards, trend rows) use a **smooth curve** — not stepped/jagged segments. Smooth reads as continuous trend; stepped reads as discrete daily snapshots (and feels finance-software-y in the wrong way).

Source: cal:2026-05-17 — pair 922 A ✅

## Comparison delta — arrow alone, not arrow+sign
For trend deltas (vs last week / month), use **an arrow alone** (↑/↓) with the percentage and a coloured value — not arrow combined with `+`/`−` prefix. The arrow communicates direction; the +/− is redundant.

When using arrow: drop the +/− entirely. When omitting arrow: use +/− prefix on the value. **Never both.**

Source: cal:2026-05-17 — pair 923 reason "arrow and +/- should not be used together, arrow preferred over +/-" ✅

## Maturity countdown — date primary
Investment maturity displays the **date as the headline** ("14 Nov '26") with days remaining as caption ("147 days from now") — not days primary. Dates anchor; days are auxiliary context.
Source: cal:2026-05-17 — pair 915 B ✅

## Transaction reference — show in full
UPI/NEFT reference numbers display in **full** (monospace), not truncated. References are copy-paste artifacts — truncation forces the user to expand-to-copy.
Source: cal:2026-05-17 — pair 906 B ✅

## Help icon glyph
Use `i` (info) glyph in a slate-10 circle for help/tooltip triggers — not `?`. The `i` reads as "additional context"; `?` reads as "you should know this."
Note: mockup used an inline letter; production should use the proper slice info-icon SVG (no border letter).
Source: cal:2026-05-17 — pair 919 B + "the icons is incorrect tho" ✅

## Verified badge — inline tick
Verified contacts get an **inline ✓ tick** beside the name (green-500, 14px) — terse, doesn't compete with the name. Not a "verified" word label.
Source: cal:2026-05-17 — pair 905 A ✅

## Offline state indicator — minimal
Offline state shows a **small icon + "Offline" label** in a row — not a full-width slate-900 banner. The minimal indicator respects the user's intent without taking over the screen.
Source: cal:2026-05-17 — pair 918 B ✅

## Bank logo placement in transaction rows
Transaction list items keep **Avatar in the leading slot** (initial / category glyph). The bank/issuer reference goes in the **caption text** ("HDFC ••1234") — **no inline bank-logo glyph** beside the caption.
Source: cal:2026-05-17 — pair 907 B + "no bank glyph" ✅

## Charts in slice — donut, sparingly
Pie charts aren't a slice pattern. When a category breakdown needs a chart at all, use a **donut** (ring with a hole) — not a pie. But charts in general are rare in slice; default to numeric breakdowns + sparklines, not full charts.
Source: cal:2026-05-17 — pair 925 B + "never seen a pie chart in slice yet" ✅

## Empty / nil states — use illustrations, not Avatars
Empty / nil states use **illustrations** as the leading visual — not an Avatar with a glyph. Avatars are for identity (people, accounts, categories); illustrations are for narrative / mood / "this is what's missing."

When you don't have the slice illustration set in a proto, leave the slot empty rather than substitute an Avatar glyph.

Source: cal:2026-05-17 — pair 1003 reason "we usually have an illustration in nil states, not an avatar icon" ✅

## Hero number — always with context
Hero numbers (balance, cashback, savings goal) show **Display/Small + caption above + delta caption below** — not the number alone. The number without context reads as raw and severs the user from what it means.

Format: `caption ("Total balance") → Display/Small (₹1,28,470) → caption ("+₹2,310 this month")`
Source: cal:2026-05-17 — pair 1004 B ✅

## Cashback card — minimal by default
Cashback summary cards: **label + amount only** by default. Don't add inline sparklines, comparison deltas, or txn counts on the surface card — those belong in the detail view.
Source: cal:2026-05-17 — pair 1017 A ✅

## Card title alignment — context-dependent
- **Inside a card** (cashback, FD, account): **left-aligned**. Card frame already focuses the eye; centring competes with the card border.
- **Top of a page** (full-screen hero, dedicated balance screen): **centred**. No surrounding card; centring acts as the anchor.

Don't centre titles inside cards. Don't left-align hero titles on a page-top context.
Source: cal:2026-05-17 — pair 1009 reason "when in card left aligned, when not in card and top of the page then center" ✅

## List subtitles — keep short
Transaction / list-item subtitles carry **one unit of info** — `UPI · 9:14 AM` is enough. Don't pack in bank, full timestamp, and reference number — those go in the row's detail view.
Source: cal:2026-05-17 — pair 1005 A ✅

## Currency — no decimals on amounts
Display amounts without decimals (`₹482`, `₹1,28,470`) — not `₹482.00` / `₹1,28,470.50`. Decimals on the surface read as banking-app fussy; the precision belongs in the detail / receipt view, not the surface.
Source: cal:2026-05-17 — pair 1019 A ✅

## Status pill placement — trailing edge
On a card or list row, the **status pill goes at the trailing edge** (right side, opposite the title) — not beside the title. The pill is the row's state, not part of the name. Trailing aligns the pill with other row-end elements (chevrons, amounts).
Source: cal:2026-05-17 — pair 1002 B ✅

## Status badge — icon + text
Status badges include a **leading glyph + text label** (`✓ Delivered`, `⏱ Pending`) — not text alone. The glyph carries state at a glance; the word confirms.
Source: cal:2026-05-17 — pair 1020 A ✅

## Avatar size in dense lists — S-32
For dense list rows (settings, contacts, menu) where avatar is supplementary to the title, use **Avatar S-32** — not M-40. Compact rows read faster. Reserve M-40 for transaction lists where the avatar carries identity weight.
Source: cal:2026-05-17 — pair 1007 A ✅

## Form input label — Caption above value
Form inputs show **Caption label above + H4 value below** — not placeholder-on-focus-only. The persistent label means a filled form is still scannable; placeholder-only inputs lose identity once filled.
Source: cal:2026-05-17 — pair 1015 A ✅

## Destructive modal copy — full reassurance
Destructive confirmation modals: **title + 1-2 line body + Primary + Cancel** (full reassurance). Not title + Primary alone. The body explains consequence — critical before a destructive action.
Source: cal:2026-05-17 — pair 1018 B ✅

## slice-currency pill (Rewards L0 trailing slot)

Anatomy: a single radius-100 pill that holds an Avatar leading + amount text in one unit.

- Avatar **inside** the pill at the leading edge: 24×24, V-500 Bold, ₹-glyph in white
- Amount value text right of the avatar: Rubik Medium 14, Text Primary
- Pill bg: white | Border: 1px outline-subtle | Padding: 4px 12px 4px 4px (tighter on the leading edge to hug the avatar)
- Radius: 100 (circle pill)
- Touch target: 32 height
- Lives in App bar L0 / Standard trailing slot for Rewards / Fires / Spark surfaces

**Not** a separate floating badge sitting next to a value pill — the avatar is structurally inside the pill.

Source: cal:2026-05-18 — review-1202 reason "the circle should be inside the pill".

## Info banner — neutral background
Inline info banners use **Slate-10 (`#F6F9FC`) neutral background**, not Blue-50 semantic blue. The neutral bg keeps the banner calm; semantic blue reads as a system alert, which is too heavy for informational messages.
Source: cal:2026-05-27 — pair 1612 B ✅

## Destructive sheet secondary CTA — "Cancel"
On destructive confirmation sheets, the secondary action label is **"Cancel"**, not "Not now". "Cancel" is direct and unambiguous; "Not now" implies deferral.
Source: cal:2026-05-27 — pair 1613 A ✅

## Amount decimals — hide .00 everywhere
Hide `.00` decimals on **detail screens** too (not just surfaces). Show `₹2,450` not `₹2,450.00`. Only show decimals when the fractional part is non-zero.
Source: cal:2026-05-27 — pair 1617 B (extends surface rule `currency_no_decimals_on_surface` from R10) ✅

## Countdown timer — digital
Payment countdown timers use **large digital text** (`04:32`), not circular progress rings. The digital readout is precise and scannable; a ring adds visual weight for no information gain.
Source: cal:2026-05-27 — pair 1618 A ✅
