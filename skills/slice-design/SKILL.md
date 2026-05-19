---
name: slice-design
description: Use when creating, designing, judging, or building screens, pages, components, or flows for slice — Figma execution, web protos, motion, anti-pattern checks, and DLS 2.0. Triggers on "design a page", "create a screen", "make a flow", Figma URLs with build requests, or any design/judgment task for the slice app. (Renamed from slice-dls 2026-05-17.)
version: 2.0.0
user-invocable: true
---

# slice-design — slice Design System Skill

> ## ⚖ Precedence (non-negotiable)
>
> **slice-design / slice-DLS wins on any contradiction.**
>
> Priority order, top wins:
> 1. `references/reference_calibration_log.md` + calibrated overrides in any `reference_*.md` (these are the user's own validated judgments)
> 2. Base rules in this `SKILL.md` and other `references/reference_*.md` files
> 3. `impeccable`
> 4. `design-motion-principles`
> 5. `frontend-design`
> 6. `taste-skill`, `brand-guidelines`, `huashu-design`, `hue`, and any other design skill
> 7. Anthropic default behaviour
>
> If another skill says "use OKLCH neutrals" or "ease-out-quart for motion" or "no emoji" — slice-design's calibrated rule for that surface wins. The other skills are inputs, not authorities, when working on slice.
>
> When a contradiction surfaces mid-task, state it briefly ("impeccable says X, slice-design overrides to Y because cal:2026-05-17 — proceeding with Y") and continue. Don't re-litigate.

DLS 2.0 components/tokens (Figma execution), motion, web-proto defaults, anti-patterns, and calibrated judgments. Calibrated overrides win over any baseline rule in this file.

## Suite

slice-design ships as a small skill suite:

| Skill | Role | Trigger |
|---|---|---|
| **slice-design** (this skill) | Build, judge, and apply DLS 2.0 to slice screens | "design / create / build a slice screen", Figma URLs, any slice UI task |
| **slice-design-calibrate** | Calibrate the rules in this skill via A/B pairs + reference frames | `/update-slice-design`, "calibrate slice", "triage the calibration log" |

The calibrate skill is the maintenance loop. It walks the user through judgment pairs on a local web proto, then writes the resulting rules into this skill's `references/`. Treat the two as one product — one applies the rules, the other keeps them honest.

## Defaults (token-efficient, slice brand voice)

These hold for every interaction routed through this skill — they don't need to be re-stated per task:

- **Lowercase "slice"** always (never "Slice", even sentence-initial in copy)
- **Rubik only**, two weights (Regular 400, Medium 500). Never Inter, SF Pro, Bold, Light.
- **No emojis** in shipped UI — neither in Avatar glyphs, button labels, list rows, nor illustration roles. Slice line icons only.
- **Indian number grouping**: `₹1,00,000` not `₹100,000`. ₹ touches the digit (no space).
- **Brand voice**: short, friendly, simple. No corporate filler.
- **Output style**: answer first, lists/tables over paragraphs for structured info, no sycophantic openers / closers.

When the user explicitly asks for verbose or alternate behaviour, follow them — these are defaults, not gates.

## Quick reference: when to read which file

Don't load all references at once. Read on demand based on the task.

| Task | Read |
|---|---|
| **Building in Figma** (any `use_figma` call) | `references/reference_figma_build.md` (component registry, scripts, hard rules, token cheatsheet) |
| Building any slice screen for the first time in a session | + `references/feedback_dls_design.md`, `feedback_figma_first.md`, `feedback_reuse_existing.md` |
| Need an icon | `references/reference_dls_iconography.md` (taxonomy) + `slice-design-suite/icons/<category>/<name>.svg` (276 SVGs) |
| Judging "is this slice?" / fixing an existing mockup | `references/reference_calibrated_digest.md` (single-page index of every calibrated rule) |
| Composing a screen layout (L0 / L1 / L2 / form / confirmation / empty) | `references/reference_dls_screen_layouts.md` (includes screen recipes calibrated through R11) |
| Anti-pattern check before shipping | `references/reference_anti_patterns.md` |
| Specific component spec (anatomy, sizes, states) | `references/reference_dls_<component>.md` (28 files — appbar, avatar, buttons, button_group, cards, chips, accordion, badge, bottom_nav, bottomsheet, carousel, controls, corner_radius, colors, dialer, dividers, dot_indicator, elevation, file_upload, footer_header, iconography, input_field, list_items, pills, pin_field, progress, search, section_header, slider, snackbar, spacing, tabs, tags, tooltip) |
| Specific token (color / spacing / radius / elevation) | `references/reference_dls_<topic>.md` |
| Motion / transitions / choreography | `references/reference_motion.md` |
| Starting a new slice web proto (Vite + agentation + DLS primitives) | `references/reference_web_proto.md` |
| Specific calibrated rule's history | `references/reference_calibration_log.md` (append-only audit) |
| `figma-use` Plugin API call | `figma:figma-use` SKILL.md ONLY. **Do not load figma-use's references/** |

## Sub-commands (routing)

When the user opens a task with one of these verbs (or types them into the conversation), follow the matching workflow. No verb = general design invocation = apply defaults + the right reference for the surface in focus.

| Verb | Category | What it does | Read |
|---|---|---|---|
| `build [screen]` | Build | Plan → resolve gallery IDs → 1 `use_figma` call → screenshot verify | this file + `feedback_*.md` + relevant `reference_dls_*.md` |
| `iterate [frame]` | Build | Clone existing frame, swap props for variants — never hand-build elements | `feedback_reuse_existing.md` |
| `judge [frame]` | Evaluate | "Is this slice?" review against calibrated rules + anti-patterns | `reference_calibrated_digest.md`, `reference_anti_patterns.md` |
| `audit [frame]` | Evaluate | Walk every calibrated rule against the frame, list violations | `reference_calibrated_digest.md` |
| `recipe [screen-type]` | Build | Return the calibrated recipe (L0 / balance L1 / confirm / pay / etc.) | `reference_dls_screen_layouts.md` |
| `proto [name]` | Build | Scaffold a new slice web proto with DLS primitives | `reference_web_proto.md` |
| `motion [target]` | Enhance | Apply slice motion choreography (Spark reveal, push left/right etc.) | `reference_motion.md` |
| `calibrate` | Maintain | Run the calibration loop → invokes `slice-design-calibrate` skill | (suite companion) |

If the user invokes `calibrate`, hand off to the `slice-design-calibrate` skill. Don't duplicate that flow here.

## Absolute bans (match and refuse)

If you're about to write any of these in slice UI, rewrite the element differently. These are calibrated bans — they were tested and rejected.

- **Capital-S "Slice"** — always lowercase, even sentence-initial
- **Emoji as Avatar glyph or in CTA leading-icon slot** — slice line icons only
- **Red-fill Primary button** for destructive actions — use a dialog with neutral Primary, or Tertiary with red text
- **Right-chevron `›` in non-row contexts** (column headers, rows that already have a CTA / switch). Valid: tap-the-whole-row callouts. Invalid: redundant trailing affordance.
- **Arrow + sign together on trend deltas** (`↑ +12%`). Pick one — arrow alone preferred.
- **`+` prefix on credit / received amounts** — use Positive Green colour alone, no `+`. Credits read as green; debits stay neutral.
- **Rainbow / multi-stop gradients** (>2 stops). The Payments brand gradient (Valentino → Blue) and the Rewards leaderboard gradient (Valentino-pink → coral) are the only sanctioned 2-stop gradients.
- **Fire / hot / winning state in orange or yellow** — slice fire is Valentino purple.
- **Cashback on subtle-bg** — cashback strip is always a white card (subtle-bg = banners only).
- **List section header directly after App bar** — needs a content row between.
- **In-card header with leading icon or hairline below** — cards are clean inside.
- **Centred body text on cards** — left-aligned only.
- **Page-edge full-bleed cards** — 24px page padding, always.
- **Standalone illustration in list-leading position** — use Avatar container.
- **Avatar component for quick-action icon tiles** — use white + outline-subtle circle + V-500 (action tiles) or slate (content-grid tiles) glyph.
- **Generic line-art illustration in empty / confirmation states** — slice ships real branded illustrations (asteroid + diamonds for rewards, grainy gradient tick for paid). Generic placeholders are prototyping only.
- **Avatar with `✓` glyph as confirmation indicator** — confirmation success uses the textured grainy gradient tick (~120px).
- **Week-summary hero block on Activity L0** — L0 is App bar + search + filter trailing + flat transaction list with relative-date subtitles. Week-summary is L2/L3.
- **Cancel button on a slice bottom sheet** — sheet dismisses via scrim tap. Bottom sheets carry the Primary action only.
- **Tabs as a navigation / filter pattern** — use pills.
- **Banking home as a separate L0 with quick-action grid + accounts list** — Banking home IS the Savings/Balance L1 screen.
- **Coloured-card hero on Credit L0** — Credit home is the bill summary view.
- **Brand-gradient "Pay anyone" banner as Payments L0 hero** — the live pattern is Standard app bar with dynamic amount title + form rows + QUICK PAY coloured circles.

Source for every entry: `references/reference_anti_patterns.md` + `reference_calibrated_digest.md` (calibrated through 2026-05-17 round 11).

## The slice-slop test

If someone could look at a screen and say "AI made this slice mockup" without doubt, it's failed. Specific slop signatures for slice:

- Anything from the "Absolute bans" list above
- Generic capitalised "Slice" branding
- Section-header / page-header / list-header inconsistencies (mixed Bold and List on the same screen)
- Cards that don't have shadow chrome OR don't have outline-border chrome (one of the two — slice has both variants for different contexts, but never bare)
- Quick-action tiles with V-500 fill avatars on a content-grid card (that's the action-tile pattern leaking into the content-grid pattern)
- A confirmation screen with a chevron back instead of an X close
- A payment-to-person screen on white (the brand-immersive V-500 fill IS the screen for known UPI ID payee)
- "+₹X" notation on a credit-amount row
- A search bar with the filter icon trailing on a screen that's NOT Activity L0
- An emoji in any production surface

Run this test before declaring a slice mockup done.

## Workflow

### Building new screens (`build`)
1. **PLAN** (no Figma calls) — Parse brief, pick screen type, list components + content, check `reference_calibrated_digest.md` for the screen recipe if one exists
2. **RESOLVE** (0 calls) — Look up gallery IDs from the registry below
3. **EXECUTE** (1 `use_figma` call) — Build entire screen using gallery components
4. **VERIFY** (1 `get_screenshot` call) — Confirm visual output. Run the slice-slop test.

### Iterating on existing designs (`iterate`)
1. **SCREENSHOT** — Capture the base frame, understand the layout
2. **INSPECT** — Get node tree to identify components, instances, and custom elements
3. **PLAN** — For each variation, list what changes. Map EVERY new element to a DLS component.
4. **CLONE** — Duplicate the base frame(s) into a named Section
5. **MODIFY** — For each clone, import DLS components via `importComponentSetByKeyAsync` and modify. NEVER hand-build elements.
6. **VERIFY** — Screenshot each variation. Run the slice-slop test.

### Judging an existing frame (`judge` / `audit`)
1. **SCREENSHOT** — Get the frame
2. **SCAN** — Run `reference_calibrated_digest.md` mentally against the frame
3. **REPORT** — List violations with severity (anti-pattern / calibrated rule mismatch / minor) and the rule each one breaks. Cite the reference file + section.

## Gallery (12× faster than import)

A `🗄️ Component Gallery` page (ID: `6422:340`) in the DLS working copy (`PNUz3Dr9KSlFJSnsXsC0nL`) has pre-imported DLS instances. Use `getNodeById(galleryId)` → `createInstance()` instead of `importComponentSetByKeyAsync`.

**Fallback:** If building in a DIFFERENT file (not the working copy), use `importComponentSetByKeyAsync` with the `componentKey` from the registry.

**DO NOT load `figma:figma-use` reference docs.** This skill contains everything needed. Only load `figma-use` SKILL.md for the `use_figma` tool definition, then STOP — skip all `references/` files.

## When building in Figma — load the build reference

For any task that calls `use_figma` (build a screen, iterate variants, modify an existing frame), **also load `references/reference_figma_build.md`**. It has:
- Full component registry (componentKey + galleryId + setProperties + variants for 30+ components)
- Script templates (L1 list screen recipe)
- Script rules (hard rules + API quirks — preventing the common figma-execute failure modes)
- Layout / token / typography cheatsheet
- Screen recipe shorthand
- Exploration-mode rules

For judging / auditing / applying calibrated rules without writing to Figma, you don't need this file — the main SKILL.md + the calibrated_digest + the matching `reference_dls_<component>.md` are enough.

## Figma file references

- DLS 2.0 published library: `ncGqxiE6wUOqgOURwHx6Hp` (where components import from at runtime)
- DLS 2.0 working copy: `PNUz3Dr9KSlFJSnsXsC0nL` (gallery for fast `createInstance`)
- DLS 2.0 reference / spec file: `HBoBlZN1CrmVwO3rXeZjY0` (cited as "source" in tokens / icon refs)
- Gallery page ID (in working copy): `6422:340`

## Calibration loop (skill maintenance)

When the user invokes `/update-slice-design` or says "calibrate slice / triage the calibration log / promote learnings", hand off to the **`slice-design-calibrate`** companion skill. Don't duplicate that flow here.
