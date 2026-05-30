# slice-design — what we're building, why, and what's next

A reference doc. When out of ideas, look here. When unsure if a new task fits, check the capabilities + quality bars below.

Last updated: 2026-05-29 (R23)

---

## Identity (one sentence)

**slice-design** is "shadcn for slice" — the canonical, runnable, AI-readable implementation of slice's DLS 2.0, paired with the knowledge an agent needs to compose, judge, iterate, or explore any slice surface.

---

## What this skill should be able to do

Six capabilities. Everything in this skill should serve one of these. If something doesn't, cut it.

1. **Build any slice screen** — Figma URL or prompt in → slice-correct React/HTML/Figma out. <5 min start to runnable.
2. **Judge any slice screen** — screenshot or design in → Before/After/Why critique against hard + soft rules, severity-tagged.
3. **Iterate any slice screen** — existing design + ask → improvements that stay on-brand and motion-correct.
4. **Explore beyond the system** — soft request → 2–3 alternatives within hard rules. Treats hard / soft / exploration as three distinct registers.
5. **Document the system** — sweep new Figma files → extract recipes, rules, anti-patterns into the proto + markdown glue.
6. **Detect drift** — proto vs. Figma vs. live app → surface differences. Don't let silent drift accumulate.

---

## Primary artifacts

| Artifact | Status | Owns |
|---|---|---|
| `slice-app-proto/` — living 1:1 React mirror | 🚧 scaffolded R23 | All concrete screen recipes, motion code, real DLS components |
| `references/*.md` — markdown glue | ✅ R22 | Cross-cutting hard rules, brand voice, anti-patterns, god-view (flows + entry points + product model) |
| `slice-design-suite/` — assets | ✅ partial | Extracted SVG icons + PNG illustrations from canonical Figma frames |
| `figma-map.json` — frame ↔ proto path map | 🚧 planned | Single map; powers proto-sync + drift detection |
| `evals/evals.json` — eval battery | ✅ 5 prompts | Regression test set; expand to 15+ across 5 categories |
| `reference_calibration_log.md` — audit trail | ✅ R11-R22 | R-round changes with sources, WHY, supersession notes |

**Direction of travel:** code grows, markdown shrinks. Markdown moves from "describing recipes" to "framing rules that recipes obey." Recipes live in code.

---

## Slash commands

Each command is a fixed entry point. Names + statuses:

| Command | Purpose | Status |
|---|---|---|
| `/build <description>` | Compose a new slice screen | ✅ implicit (via SKILL.md routing) |
| `/judge <screenshot or design>` | Critique against rules | ✅ implicit |
| `/iterate <design + ask>` | Improve existing screen | ✅ implicit |
| `/explore <request>` | Exploration mode — 2-3 alternatives within hard rules | ✅ via `reference_exploration_patterns.md` |
| `/calibrate <figma-url>` | A/B pair calibration with WHY prompt | ✅ existing `/slice-design-calibrate` |
| `/sweep <figma-url>` | Bulk extraction from canonical reference frame | ✅ informal (used in R19-R22) |
| `/eval` | Run eval battery | ✅ evals.json exists; runner is manual |
| `/proto add <figma-url> --to <path>` | Generate new proto page from Figma | 🚧 planned R23 |
| `/proto sync [pod]` | Re-sync proto pages against latest Figma | 🚧 planned R23 |
| `/proto eval [pod]` | Pixel-diff proto vs. Figma; surface drift | 🚧 planned R24 |

---

## Quality bars

How we know the skill is working. Measurable.

| Metric | Target | Today |
|---|---|---|
| First-pass correctness — Claude produces slice-correct screen without manual correction | ≥95% | ~70% (estimated; not measured) |
| Time-to-screen — prompt → runnable React proto page | <5 min | ~15-30 min today |
| HARD rules with documented WHY + frame ID | 100% | ~60% (R19+ entries, not backfilled) |
| Eval battery score | ≥4.7/5 average across all categories | 4.5/5 (5 prompts, narrow) |
| Eval coverage — categories tested | 5 (recipe, motion, voice, cross-pod, build-from-scratch) | 1.5 (recipe-heavy) |
| Drift detection — Figma → proto regen lag | <2 weeks | ∞ (no loop yet) |
| Drift detection — proto → live app gap | <2 weeks | ∞ (no loop yet) |

**These metrics drive the roadmap. New work has to move at least one of them.**

---

## Forever-on backlog (parking lot — pick from here when out of ideas)

### Coverage extension
- [ ] 100+ screen 1:1 mirror in `slice-app-proto/` (R23+ ongoing)
- [ ] All 4 transition envelopes built as runnable animations (rewarded payment, FD purchase, etc.)
- [ ] Dark mode toggle across the proto
- [ ] Tablet / web breakpoints (per-project, when slice ships a web product)
- [ ] All bottom-sheet variants as composable React components

### Knowledge depth
- [ ] WHY backfill on top-20 most-cited rules
- [ ] Sweep cadence — monthly Figma diff to catch silent moves
- [ ] Live-app screenshot loop — install slice on a device, screenshot top-20 surfaces monthly, diff vs. skill
- [ ] Per-app interaction calibration (`reference_interaction_layer.md` becomes per-project memory)

### Tooling
- [ ] `/proto add` slash command — auto-generate proto page from Figma URL
- [ ] `/proto sync` slash command — re-sync stale pages
- [ ] `/proto eval` slash command — pixel-diff proto vs. Figma
- [ ] Component playground — internal index page listing every component with controls (Storybook-equivalent, built-in)
- [ ] Auto-extract Figma assets to disk on `/sweep`
- [ ] Search index across all skill files
- [ ] Subagent registry — single source for what's in flight, dedup before launching

### Quality + testing
- [ ] Expand evals to 15+ prompts across 5 categories
- [ ] Cross-pod composition test (e.g. "FD purchase from Banking L0 through PIN to confirmation")
- [ ] Motion test (durations + curves match spec)
- [ ] Voice/tone test (lowercase slice, Indian numerals, brand voice)
- [ ] Build-from-scratch test (no Figma URL, prompt only)
- [ ] External eval — independent reviewer (human or different model) judges output

### shadcn adoption (NEW R23 — see shadcn adoption below)
- [ ] Identify shadcn primitives we'd benefit from but don't have in DLS
- [ ] Adoption queue: command (palette), combobox, calendar, date picker, drawer, hover-card, menubar, navigation-menu, popover (we have tooltip but not popover), resizable, sheet (we have bottom sheet but no side sheet), skeleton, slider (we have but minimal), sonner-style toast, virtual table
- [ ] For each: reimagine in slice DLS — V-500 tokens, Rubik, slice motion vocabulary

### Vision + identity
- [ ] Customer-segment the skill — separate entry points for designer / eng / agent / stakeholder
- [ ] Stakeholder mode — clean tap-through of proto without dev tools
- [ ] Measurable success page — render current score against quality bars
- [ ] Voice pass — normalize tone across all 71 files

### Cleanup
- [ ] Compression sweep — kill/merge to 30-40% smaller (see `AUDIT_COMPRESSION.md`)
- [ ] Anti-pattern co-location — every recipe carries its own anti-pattern, no separate file
- [ ] Calibration log rollup — quarterly "what stabilized" summary; archive raw entries

---

## shadcn adoption (R23 NEW)

**Source**: https://github.com/shadcn-ui/ui

**Why**: shadcn has won AI-design-tooling — when agents generate UI, output is shadcn-shaped. DLS 2.0 was built for native mobile fintech; shadcn's strength is web-ish patterns we don't have (command palette, combobox, hover-card, etc.). For slice's web surfaces (proto, future web app, internal tools), we'll need these.

**Process** when adopting a shadcn primitive:
1. Identify the primitive (e.g. `command`, `combobox`)
2. Confirm DLS doesn't already have it (or has an inferior version)
3. Take shadcn's anatomy + composition pattern
4. **Reimagine in slice DLS** — Rubik typography, V-500 tokens, slice motion durations/curves, slice corner radii, slice elevation
5. Add to `slice-app-proto/src/components/` with naming `Slice<Primitive>.jsx`
6. Document in markdown: `references/reference_dls_<primitive>.md` with `(adapted from shadcn)` source line
7. Add to eval prompts (test it gets used correctly when needed)

**Candidates to adopt (per shadcn catalog vs. our DLS coverage):**

| shadcn | DLS coverage | Adoption priority |
|---|---|---|
| `command` (palette) | none | HIGH — useful in proto's internal index; will be useful for slice's future web tools |
| `combobox` | none | MED |
| `hover-card` | tooltip only | MED |
| `popover` | tooltip + bottom-sheet only | HIGH — fills middle ground |
| `menubar` | none | LOW (mobile-first) |
| `navigation-menu` | bottom nav only | LOW |
| `resizable` | none | LOW |
| `sheet` (side drawer) | bottom-sheet only | MED — for tablet/web |
| `skeleton` | minimal loading states | HIGH — used everywhere |
| `sonner` (toast) | snackbar only | MED |
| `calendar` / `date-picker` | input field only | HIGH — used in FD setup |
| `drawer` (Emil's lib) | bottom-sheet | LOW — already covered |
| `slider` | minimal | LOW |
| `virtual table` | none | LOW (no large lists on mobile) |

**Anti-pattern**: copy-paste shadcn unmodified. Defeats the purpose. Every adoption must be reimagined in slice tokens + voice.

---

## Versioning + ground rules

- **Figma is canonical.** Proto + markdown re-sync from Figma, never the other way.
- **Calibration rounds (R-rounds) are append-only with WHY.** Drift corrections are flagged as supersessions, not deletions.
- **Frame IDs ground every rule.** No hand-wavy "slice does this" — every claim cites a Figma node + cal:YYYY-MM-DD.
- **HARD rules don't bend.** SOFT rules can be remixed in explore mode. EXPLORATION is the third register — encouraged, with sanctioned alternatives.
- **Anti-pattern + positive rule live together.** Always.

---

## Customer segments (who this skill serves)

| Customer | What they need from the skill |
|---|---|
| **You (slice senior PD)** when calling Claude | Build / judge / iterate / explore + maintain the skill itself |
| **slice eng team** when using Claude Code | Generate slice-correct screens for proto/staging without manual review |
| **slice design team** (future) | Living spec they can hand to PMs / leadership; replaces "send Figma file" workflow |
| **slice stakeholders (PM, leadership)** | Tap through proto on a phone — feel the system without designer translation |
| **slice new hires** (eng + design) | Onboarding to the design system without a designer in the room |

**Current focus**: customer 1 + customer 2. Customers 3-5 unlock once the proto coverage hits ~50 screens.

---

## When to call this doc

- "What should I work on?" → look at backlog by category
- "Is this task worth doing?" → does it move a quality-bar metric?
- "How does this fit?" → which capability (build/judge/iterate/explore/document/detect) does it serve?
- "Should we add X?" → does it pass the cuts (one of the six capabilities, serves a customer, moves a metric)?
- "What does done look like?" → quality bars table
