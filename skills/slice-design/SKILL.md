---
name: slice-design
description: Use whenever the user is creating, designing, judging, building, iterating, or critiquing any slice screen, flow, component, or visual asset — Figma builds, web protos, motion design, anti-pattern checks, DLS 2.0 component usage, brand voice review, and any fintech/UPI/banking/credit/payments UI work that targets slice. Trigger this skill even when the user doesn't explicitly say "slice" — Figma URLs in conversation, mentions of DLS, UPI flows, Atom, Spark, Monies, Fire, payment screens, balance screens, credit cards, super card, brand-immersive Valentino purple surfaces, "design audit", "is this on-brand", or any visual judgment task on consumer fintech mobile UI all warrant invoking this skill. Also fires for build / iterate / judge / audit / recipe / proto / motion / explore / extract / status / calibrate / sweep sub-commands. (Renamed from slice-dls 2026-05-17.)
version: 2.3.0
user-invocable: true
---

# slice-design — slice Design System Skill

> ## ⚖ Precedence (non-negotiable)
>
> **slice-design / slice-DLS wins on any contradiction.** Priority order, top wins:
> 1. **Calibrated values in the topical `reference_*.md` files** — the current source of truth. `reference_calibration_log.md` is the dated AUDIT TRAIL (rationale + superseded entries), NOT a live spec: if the log disagrees with a topical reference, the **topical reference wins**. When a calibrated value changes, update the topical reference AND mark the old log entry superseded — never leave two live values for one fact (stale log rows have been re-applied as "current" before).
> 2. Project-local memory at `.slice-design/project.md` if present.
> 3. Base rules in this `SKILL.md` and other `references/reference_*.md` files.
> 4. `impeccable`, `design-motion-principles`, `emil-design-eng`, `frontend-design` (toolkit extensions — pull techniques, but slice rules win on conflict). `emil-design-eng`'s motion framework (frequency/purpose rules, easing per direction, duration table), springs, clip-path, blur crossfade, momentum dismissal, `@starting-style` entry are all valid slice techniques — use when the brief warrants (`reference_motion.md`, `reference_exploration_patterns.md`).
> 5. `taste-skill`, `brand-guidelines`, `huashu-design`, `hue`, any other design skill.
> 6. Anthropic default behaviour.
>
> Other skills are inputs, not authorities, when working on slice. When a contradiction surfaces mid-task, state it briefly ("impeccable says X, slice-design overrides to Y because cal:2026-05-17 — proceeding") and continue. Don't re-litigate.

DLS 2.0 components/tokens (Figma execution), motion, web-proto defaults, anti-patterns, and calibrated judgments. Calibrated overrides win over any baseline rule in this file.

## Canonical-first — references for built screens, fetch Figma for the rest (HARD)

The single biggest time-sink is **guessing**. For any spec'd value (colour, component state, layout/margin, icon, token), resolve it in this order — never eyeball a screenshot or iterate on terse feedback:

1. **Check the proto + topical `reference_*.md` FIRST.** For a screen/component that already exists in the proto, the built code + its reference ARE the calibrated canonical — that's the whole point of the skill. Don't re-fetch Figma for what's already captured; reuse it.
2. **Fetch the canonical from Figma when** (a) it's a **NEW screen/component** in Figma but not yet in the proto/references, (b) the reference is **missing / ambiguous / contested**, or (c) the user points you at a node. Use `get_variable_defs` / `get_design_context` on the **specific frame node-id** (dark value → pass a dark frame; variables resolve in the frame's mode). Then **promote** what you fetched into the topical reference. This is the **proto-expansion path**: a new screen is built from scratch against the fetched canonical, then captured as a reference and wired into the proto — that's how the proto grows.
3. **Disambiguate terse feedback before acting.** "Make it black in dark" is ambiguous — confirm *which element* (chip vs glyph vs background), and remember colours are **per-mode** (light and dark are SEPARATE values; never apply one to both).
4. **Verify both states before claiming done** — toggle light/dark and read computed values. Gotchas: `setAttribute('data-theme')` re-themes CSS but does NOT recompute React-driven state (e.g. nav slot variants); `getComputedStyle` is live — read it immediately, never after mutating the same node.

Why HARD: the 2026-05-30 dark-mode build burned ~10 rounds on bottom-nav colours — a built screen whose reference row was *stale*. The fix wasn't "always re-fetch", it was: trust the reference, but when it's contested, pull `get_variable_defs` on the canonical node (`6591:60485`) instead of iterating on terse feedback — then correct the reference.

## How to work — flow-aware, recency, registers

- **Flow-aware, not just surface-aware.** A screen is a step in a journey, not a standalone artifact: know where the user came from (push? sheet? cross-pod handoff?), where they go next, and what running state the chrome must carry (dynamic app-bar title, UPI-ID pill). See `references/reference_flows.md` (god view) + `reference_entry_points.md`.
- **Page-ID-as-recency heuristic (Figma):** higher node IDs = newer = canonical; lower = older/superseded (confirmed by the Profile V3 sweep, R21). Designer signals (`Final`, ✅, `Canonical`, page naming) override IDs; absent any signal, prefer the higher-ID frame.
- **Three registers.** **HARD** rules never bend (brand voice, palette, Rubik, no emoji, absolute bans — locked even in exploration). **SOFT** rules are calibrated defaults you can remix with reason (recipes, compositions, motion). **EXPLORATION** is encouraged when there's a reason — keep HARD locked, propose soft-rule alternatives with reasoning (`reference_exploration_patterns.md`). "Something new" → explore; routine brief → build with the calibrated recipe; judging → HARD is absolute, SOFT deviations are findings not violations.

## Building a proto / a slice screen — READ FIRST

Any new proto, new L0, or cross-cutting chrome (status bar, nav, app bar, shell): **read `references/reference_proto_systematics.md` FIRST.** It has the distilled meta-rules from the R23 build (16 root causes + permanent rules), the inherit/read-only model, the two process non-negotiables, the LIVE-proto workspace + run + refresh, the new-screen pre-flight, and the 22-item cross-cutting craft checklist. Run its checklists — the point is ship-ready in one round, not seven.

Three things always true, worth stating here:
- **The skill proto (`~/.claude/skills/slice-design/proto/`) is upstream "main" + READ-ONLY during project work.** Projects inherit it live and build on top via the seam; never edit the skill proto to satisfy a project (unlink the component into the project instead — `link-kit.sh materialize`). Promote to the skill proto only via deliberate maintenance with a calibration-log entry.
- **Compose from cache; self-audit before you show.** Copy chrome from the live proto (`proto/src/` + `proto/public/assets/`) — don't re-hand-build from memory (that reintroduces fixed bugs). Screenshot your own output and diff against canonical before handing it over.
- **agentation is a baseline dependency** (like npm): every slice proto must have `agentation@^3.0.2` installed + `<Agentation/>` wired as a sibling of `<App/>`; without it icons / DLS primitives / click-annotation break. Scaffold it first on `/proto`. See `reference_web_proto.md`.
- **Done-gate trio for every proto change**: build passes → `lint` 0 errors → look at the affected surface. State-reading screens also get flipped through all user-state presets (debug panel → Persona). Playground URLs (`/?playground=…`, `/?playground=screen:<pod>`) are the canonical screenshot targets. See `reference_proto_systematics.md` + `reference_state_exploration.md`.

Maintenance companion: **slice-design-calibrate** (`/update-slice-design`) — the A/B-pair + sweep loop that keeps these rules honest. Two skills, one product.

## Defaults (token-efficient, slice brand voice)

These hold for every interaction routed through this skill — no need to re-state per task:

- **Lowercase "slice"** always (never "Slice", even sentence-initial).
- **Rubik only**, two weights (Regular 400, Medium 500). Never Inter, SF Pro, Bold, Light.
- **No emojis** in shipped UI — not in Avatar glyphs, button labels, list rows, nor illustration roles. Slice line icons only.
- **No gray surfaces.** Non-immersive pages are pure WHITE `#FFFFFF`; Pay/Valentino is V-500 `#D30AD7`. Any "gray" you perceive is a card drop-shadow on white (`0px 4px 24px rgba(0,0,0,0.08)`), never an actual gray fill — don't add slate-10 to "make shadows pop".
- **Indian number grouping**: `₹1,00,000` not `₹100,000`. ₹ touches the digit (no space).
- **Brand voice**: short, friendly, simple. No corporate filler.
- **Output**: answer first, lists/tables over paragraphs, no sycophantic openers/closers.

When the user explicitly asks for verbose or alternate behaviour, follow them — these are defaults, not gates.

## Quick reference: when to read which file

Don't load all references at once. Read on demand. **Per-pod aggregator files are the preferred load path for pod-specific tasks** — synthesized, surface-first, anti-patterns paired to recipes. Only load deeper component refs if you need anatomy detail the pod file lacks.

### Primary load paths (most slice tasks)

| Task | Read |
|---|---|
| **Banking screen** (Savings, FD, monies, Atom sub-product) | `references/reference_pod_banking.md` |
| **Payments screen** (V-500 dialer, action pills, Pay person, PIN, confirmation, transition envelope) | `references/reference_pod_payments.md` |
| **Credit screen** (Credit L0, Card L1 limit dashboard, repayment dialer, utilisation, slice in 3, autopay) | `references/reference_pod_credit.md` |
| **Explore screen** (Recharge & bills, 2×2 grid, Rewards, Spark, May Spends, Invite) | `references/reference_pod_explore.md` |
| **Activity screen** (txn list, txn detail L2, Action centre, search, filter, states + avatars) | `references/reference_pod_activity.md` |
| **Bills screen** (Recharge L1, My bills L2, Manage sheet) | `references/reference_pod_bills.md` (sub-pod under Explore) |
| **Cross-cutting / judge mode / brand voice** | `references/reference_pod_cross_cutting.md` (HARD rules, slop test, motion + a11y + perf cross-cuts) |
| **Understanding a flow** | `references/reference_flows.md` (god view) |
| **Tracing where a feature lives** | `references/reference_entry_points.md` |
| **Interaction primitives** (press, page transitions, drag, stagger) | `references/reference_interaction_layer.md` |
| **Product mental model** | `references/reference_slice_product_model.md` |

### Deeper / specific (load when the pod file isn't enough)

| Task | Read |
|---|---|
| **Building a proto / cross-cutting chrome** | `references/reference_proto_systematics.md` (READ FIRST — root causes, inherit model, checklists) + `reference_proto_patterns.md` (shell, fit-scale, pager) + `reference_web_proto.md` (scaffold) |
| **Running a multi-round project engagement** (seam project, agentation feedback loop, deploy) | `references/reference_project_workflow.md` (extension-seam model, deploy-by-vendoring, the feedback→build→push loop, working discipline, the reusable debug-view / exploration-screen framework) |
| **Viewing a proto on a real phone** (Expo / Expo Go, edge-to-edge) | `references/reference_expo_on_device.md` (Path A WebView-wrapper template + every solved gotcha: SDK-must-match-Expo-Go, LAN servers, status-bar colour sync, edge-to-edge, safe-area top reserve, bottom-nav shadow, overscroll) |
| **Building in Figma** (any `use_figma` call) | `references/reference_figma_build.md` (component registry, scripts, hard rules, token cheatsheet) + the Gallery note below |
| Need an icon | `references/reference_dls_iconography.md` (taxonomy). Order: copy local (`public/assets/` + `public/assets/icons/`) → pull DLS Figma (`582:257`; inline path + `fill:currentColor` to theme) → **if truly missing, a clear DUMMY placeholder + tell the user where to drop the real file.** Icons are **NEVER generated/traced/hand-drawn** (see bans). Generation (`reference_slice_asset_generation.md`) is **illustrations only**. |
| Need an illustration | `references/reference_dls_illustrations.md` (catalog + usage). **If not on disk: generate a flagged raster placeholder** (Gemini/Nano-Banana, proto only) per `reference_slice_asset_generation.md` — circle (V-100 `#F4E5F8`) for big heroes ~120–200px; `gen_`-prefix + log in `GENERATED_ASSETS.md`; if unavailable, dull dummy + `<!-- ILLUSTRATION-MISSING -->`. Product builds never generate. |
| Theming / dark mode | `references/reference_theming.md` (dark tokens, icon-vs-illustration theme-safety, CSS-var mechanism, Figma dark refs, theme-switch motion, dark gotchas). Bottom-nav dark colours → `reference_dls_bottom_nav.md`; Activity states/avatars → `reference_pod_activity.md`. |
| Composing a full screen layout | `references/reference_dls_screen_layouts.md` (every L0/L1/L2/empty/error recipe) |
| Anti-pattern check before shipping | `references/reference_anti_patterns.md` |
| **Mechanical compliance sweep** (`lint`, raw values / brand voice / INR / Rubik; also step 1 of judge/audit on code) | `references/reference_lint.md` + `scripts/lint.mjs` |
| **Propagating a confirmed change** (`cascade` — reference → digest → log → proto → snapshot → projects) | `references/reference_cascade.md` |
| **State exploration** (control panels, user-state presets, playground URLs, variant-vs-state doctrine) | `references/reference_state_exploration.md` |
| Verifying a spec matches DLS (before asserting any value) | `references/reference_canonical_fetch.md` (R24 meta-rule — fetch the published variant via Figma MCP; never eyeball a screenshot) |
| Specific component spec | `references/reference_dls_<component>.md` (~40 files: appbar, avatar, amount_display, buttons, button_group, cards, chips, accordion, badge, bottom_nav, bottomsheet, carousel, controls, corner_radius, colors, dates_time, dialer, dividers, dot_indicator, elevation, error_states, file_upload, footer_header, iconography, input_field, list_items, phone_shell, pills, pin_field, progress, search, section_header, slider, snackbar, spacing, tabs, tags, tooltip, top_header, user_action_banners) |
| Motion vocabulary | `references/reference_motion.md` |
| Performance / accessibility / craft / exploration / project-memory | the same-named `references/reference_<topic>.md` (`_performance`, `_accessibility`, `_craft_principles`, `_exploration_patterns`, `_project_memory`) |
| Calibrated digest (single-page rule index — current to 2026-06-02) | `references/reference_calibrated_digest.md` — quick-scan index of all calibrated rules; the topical refs remain the source of truth. Regenerate via /update-slice-design when it drifts |
| A specific calibrated rule's history | `references/reference_calibration_log.md` (append-only audit) |
| `figma-use` Plugin API call | `figma:figma-use` SKILL.md ONLY. **Do not load figma-use's references/** |

## Sub-commands (routing)

When the user opens a task with one of these verbs (or types them), follow the matching workflow. No verb = general design invocation = apply defaults + the right reference for the surface in focus.

| Verb | Category | What it does | Read |
|---|---|---|---|
| `build [screen]` | Build | Plan → resolve gallery IDs → 1 `use_figma` call → screenshot verify | this file + `feedback_*.md` + relevant `reference_dls_*.md` |
| `iterate [frame]` | Build | Clone existing frame, swap props for variants — never hand-build elements | `feedback_reuse_existing.md` |
| `judge [frame]` | Evaluate | "Is this slice?" review against calibrated rules + anti-patterns. **Code targets: run `lint` FIRST** (deterministic floor), judgment on top | `reference_calibrated_digest.md` (current quick-scan index) + `reference_anti_patterns.md`; pull the topical `reference_dls_*.md` for exact specs; `reference_lint.md` for code |
| `audit [frame]` | Evaluate | Walk every calibrated rule against the frame, list violations. **Code targets: run `lint` FIRST** | `reference_calibrated_digest.md` (current) + `reference_anti_patterns.md` + topical `reference_dls_*.md`; `reference_lint.md` for code |
| `lint [path]` | Evaluate | Mechanical DLS sweep (`node scripts/lint.mjs`): raw values vs generated token map, brand voice, INR format, Rubik/weights, emoji. Report → confirm → per-category commits → build gate | `reference_lint.md` |
| `cascade [change]` | Maintain | Propagate a confirmed change through reference → digest → log → proto → seam projects. Blast radius shown + confirmed first; `--dry-run` supported; verify trio after | `reference_cascade.md` |
| `recipe [screen-type]` | Build | Return the calibrated recipe (L0 / balance L1 / confirm / pay / etc.) | `reference_dls_screen_layouts.md` |
| `proto [name]` | Build | Scaffold a new slice web proto with DLS primitives | `reference_web_proto.md` |
| `motion [target]` | Enhance | Apply slice motion choreography (Spark reveal, push left/right, campaign-pill reveal) | `reference_motion.md` |
| `explore [brief]` | Enhance | Propose novel patterns; HARD rules locked, soft remixed. Pull emil-design-eng techniques. | `reference_exploration_patterns.md`, `reference_motion.md` |
| `extract [path]` | Maintain | Sweep a project / recent Figma for patterns to promote into the skill. Outputs a diff. | `reference_calibration_log.md` (append on commit) |
| `status` | Maintain | Show current calibration round + active project memory + drift candidates. Also run `scripts/check-drift.sh` (installed vs suite repo) + `node scripts/lint.mjs --refs` (orphans, missing citations, superseded hygiene). | — |
| `calibrate` / `sweep` | Maintain | Calibrate = A/B pair loop. Sweep = batch reference-frame extraction. Both via `slice-design-calibrate`. | (suite companion) |

If the user invokes `calibrate` or `sweep`, hand off to `slice-design-calibrate`. Don't duplicate those flows here.

**state-design-choices-before-build:** In `build` (and ideally `iterate`), verbalize recipe + components + tokens in one sentence BEFORE executing in Figma (e.g. "Building Atom L1 returning-user home. Recipe: App bar Standard chevron-back + 'atom' title + centred Display hero + Primary 'Create atom' + active-atoms list + 2 suggested cards. Components: AppBar/Standard, Button/Primary, Card/Outline, ListItem+progress. Confirm?"). Catches recipe mismatches before a `use_figma` call builds the wrong screen.

## Absolute bans (match and refuse)

If you're about to write any of these in slice UI, rewrite the element differently. These are calibrated bans — tested and rejected.

- **Capital-S "Slice"** — always lowercase, even sentence-initial. BUT lowercase is for PRODUCT/BRAND NAMES ONLY (slice, spark, monies, slice atom, slice health cover). Everything else is SENTENCE CASE: headings, titles, questions, CTAs, list labels, settings rows — "Choose your cover", "Recharge & bills", "Add money". Do NOT lowercase the whole UI. (R24 cont-31.)
- **Emoji as Avatar glyph or in CTA leading-icon slot** — slice line icons only.
- **Red-fill Primary button** for destructive actions — use a dialog with neutral Primary, or Tertiary with red text.
- **Right-chevron `›` in non-row contexts** (column headers, rows that already have a CTA/switch). Valid: tap-the-whole-row callouts. Invalid: redundant trailing affordance.
- **Arrow + sign together on trend deltas** (`↑ +12%`). Pick one — arrow alone preferred.
- **`+` prefix on credit / received amounts** — use Positive Green colour alone, no `+`. Debits stay neutral.
- **Rainbow / multi-stop gradients** (>2 stops). Only sanctioned 2-stops: Payments brand (Valentino→Blue), Rewards leaderboard (Valentino-pink→coral).
- **Fire / hot / winning state in orange or yellow** — slice fire is Valentino purple.
- **Cashback on subtle-bg** — cashback strip is always a white card (subtle-bg = banners only).
- **List section header directly after App bar** — needs a content row between.
- **In-card header with leading icon or hairline below** — cards are clean inside.
- **Centred body text on cards** — left-aligned only.
- **Page-edge full-bleed cards** — 24px page padding, always.
- **Standalone illustration in list-leading position** — use Avatar container.
- **Avatar component for quick-action icon tiles** — use white + outline-subtle circle + V-500 (action tiles) or slate (content-grid tiles) glyph.
- **Generic line-art illustration in empty / confirmation states** — slice ships real branded illustrations. Generic placeholders are prototyping only.
- **Avatar with `✓` glyph as confirmation indicator** — success uses the textured grainy gradient tick (~120px).
- **Week-summary hero block on Activity L0** — L0 is App bar + search + filter trailing + flat list with relative-date subtitles. Week-summary is L2/L3.
- **Cancel button on a slice bottom sheet** — sheet dismisses via scrim tap; bottom sheets carry the Primary action only.
- **Tabs as a navigation / filter pattern** — use pills.
- **Banking home as a separate L0 with quick-action grid + accounts list** — Banking home IS the Savings/Balance L1 screen.
- **Coloured-card hero on Credit L0** — Credit L0 is a white L0 Large card (spends total + recent txn rows + blue-subtle in-card callout) + a Medium card promo. The chevron-back + pie-chart + centred-hero pattern is a downstream analytics surface, not L0.
- **Brand-gradient "Pay anyone" banner as Payments L0 hero** — Payments L0 is the full-bleed Valentino-500 dialer takeover (solid V-500, "Check balance" pill top-left, voice + Avatar trailing, massive centred ₹0, UPI ID chip, slice keypad, Request + Transfer pills). Solid V-500, NOT a gradient.
- **PNG icon when a vector exists** — slice icons are SVGs; inline with `currentColor` so it themes light/dark for free. A PNG can't recolour and breaks in dark. (See `reference_theming.md`.)
- **Hand-drawn / traced / approximated icon** — NEVER invent an icon. Use the official DLS icon (`582:257`; most already in `public/assets/` + `public/assets/icons/`), or a clear DUMMY placeholder if truly missing. Tracing a logo, drawing polygons to mimic a mark, or few-shot-generating a UI glyph are ALL banned. Inlining an official Figma path + `fill→currentColor` for theming is fine (same geometry). (Hard, user-directed 2026-05-30 — stated angrily, multiple times.)
- **Illustration with a baked-in background** — must be transparent-bg; a baked light bg shows as a white box on dark surfaces. Use the dark variant or a transparent export on a themed tile. (See `reference_theming.md`.)

Source for every entry: `references/reference_anti_patterns.md` + `reference_calibrated_digest.md`.

## The slice-slop test

If someone could look at a screen and say "AI made this slice mockup" without doubt, it failed. Run before declaring done. Slop signatures: anything from Absolute bans; capitalised "Slice"; mixed Bold/List headers on one screen; cards with neither shadow nor outline chrome (bare white); V-500-fill action avatars leaking into a content-grid card; a confirmation screen with chevron-back instead of X-close; a payment-to-person screen on white (brand-immersive V-500 IS the screen for a known payee); "+₹X" on a credit row; a filter-trailing search bar on a non-Activity-L0 screen; an emoji in any production surface.

## Workflow

**Building new screens (`build`):** PLAN (no Figma calls — parse brief, pick screen type, list components + content, check the recipe) → RESOLVE (look up gallery IDs) → EXECUTE (1 `use_figma` call, build with gallery components) → VERIFY (1 `get_screenshot`, run the slop test).

**Iterating (`iterate`):** SCREENSHOT base → INSPECT node tree → PLAN each variation (map EVERY new element to a DLS component) → CLONE the base frame into a named Section → MODIFY via `importComponentSetByKeyAsync` (never hand-build) → VERIFY each + slop test.

**Judging (`judge` / `audit`):** if the target is CODE (proto / seam project), run `node scripts/lint.mjs <path>` FIRST — its findings are **(hard)** rows cited as `lint:<category>`; don't re-derive mechanically what the script proved. Then SCREENSHOT → SCAN `reference_calibrated_digest.md` mentally → REPORT: lead with a one-line tally **`(hard) N · (soft) M · (minor) K`**, then a **Before / After / Why** table, severity-tagging each row **(hard)** = absolute ban / brand-voice violation / lint error, **(soft)** = unjustified deviation from default, **(minor)** = polish. Cite the reference file + section (or lint category) for each (hard)/(soft) row.

## Gallery + Figma build

A `🗄️ Component Gallery` page (ID `6422:340`) in the DLS working copy (`PNUz3Dr9KSlFJSnsXsC0nL`) has pre-imported DLS instances — use `getNodeById(galleryId)` → `createInstance()` instead of `importComponentSetByKeyAsync` (12× faster). Fallback (building in a different file): `importComponentSetByKeyAsync` with the `componentKey` from the registry. For ANY `use_figma` task, also load `references/reference_figma_build.md` (registry + scripts + API quirks + cheatsheet). For judging/auditing without writing to Figma, you don't need it. **Do NOT load `figma:figma-use` references/** — only its SKILL.md for the `use_figma` tool definition.

## Figma file references

- DLS 2.0 published library: `ncGqxiE6wUOqgOURwHx6Hp` (runtime component import source)
- DLS 2.0 working copy: `PNUz3Dr9KSlFJSnsXsC0nL` (gallery for fast `createInstance`)
- DLS 2.0 reference / spec file: `HBoBlZN1CrmVwO3rXeZjY0`
- Gallery page ID (in working copy): `6422:340`

## Project memory (optional per-project layer)

If a project has `.slice-design/project.md` at its repo root, load it after this SKILL.md and before any reference files. Per-project decisions (e.g. "Atom uses 3D illustrations as hero") extend — never override — global calibrated rules and HARD rules. When project memory conflicts with a SOFT rule, project memory wins within that project. Template + load order: `references/reference_project_memory.md`.
