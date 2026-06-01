---
name: slice-design-calibrate
description: Web-based calibration for the slice-design skill. Seeds 10-30 visual A/B pairs into the calibration web app (port 8766), user walks through them at their own pace. Each pick auto-saves to log.jsonl — no need to finish the batch. Triage + promotion runs on whatever was answered. Triggers on "calibrate slice", "run the calibration", "/slice-design-calibrate".
---

# slice-design-calibrate

Web-based companion to `slice-design`. Seeds visual design questions into the calibration web app, user answers at their own pace, each pick auto-saves. Triage runs on whatever was answered — partial completion is fine.

## When to invoke

- `/slice-design-calibrate`
- "Calibrate slice", "run the calibration", "train the design skill"

## Data files

- `~/claude/slice/projects/dls-calibration/` — calibration web app (Vite + React, port 8766)
- `~/claude/slice/projects/dls-calibration/data/log.jsonl` — append-only pick log (auto-saved per answer)
- `~/claude/slice/projects/dls-calibration/data/parking_lot.jsonl` — "need more info" queue
- `~/claude/slice/projects/dls-calibration/data/attachments/<session>/` — reference images (FALLBACK only — prefer a Figma link, see Step 1)
- `~/claude/slice/projects/dls-calibration/src/pairs.json` — pair definitions
- `~/.claude/skills/slice-design/references/reference_calibration_log.md` — audit trail
- `~/.claude/skills/slice-design/references/reference_*.md` — target ref files

## Flow

### Step 0 — Launch the web app

1. Check if Vite is serving port 8766: `curl -s -o /dev/null -w "%{http_code}" http://localhost:8766/`
2. If not running: `cd ~/claude/slice/projects/dls-calibration && npm run dev` (run_in_background)
3. Snapshot log line count: `wc -l < data/log.jsonl` — remember as START_LINES

### Step 1 — Seed 10-30 pairs

1. Read the calibration log (`reference_calibration_log.md`) to know what's been covered.
2. Scan reference files for thin coverage — components with few or no calibrated rules.
3. Generate **10-30 new pairs** covering uncalibrated territory.

Generate pairs by running a `.cjs` script under `~/claude/slice/projects/dls-calibration/scripts/` that mutates `src/pairs.json`. Bump the version. Pattern:

```js
const fs = require('fs');
const p = JSON.parse(fs.readFileSync('./src/pairs.json','utf8'));
const newPairs = [
  { id: 'r17-comp-1700', phase: 1, mode: 'compare',
    component: 'Component', axis: 'which is more slice?',
    rule_key: 'rule_key_here',
    a: { render: 'R17Variant', props: { kind: '...', side: 'A' }, description: 'Option A desc' },
    b: { render: 'R17Variant', props: { kind: '...', side: 'B' }, description: 'Option B desc' },
    description: 'What this pair tests.' },
];
p.pairs.push(...newPairs);
p.version = p.version + 1;
fs.writeFileSync('./src/pairs.json', JSON.stringify(p, null, 2));
console.log('added', newPairs.length, 'pairs');
```

If pairs need new visual renders, add React variants to `src/mockups/Round<N>Variants.jsx` and register in `src/mockups/registry.jsx`.

After seeding: "Seeded N pairs. Refresh the page."

### Reference material — ask for a Figma link, NOT an image

When a pair (or a review screen) needs a real slice reference, **ask the user for a Figma link and fetch the canonical via the official Figma MCP** (`get_design_context` / `get_screenshot` / `get_variable_defs`) — do NOT ask them to attach a screenshot. The skill has canonical Figma access now; a link gives exact specs + the real rendered frame. The `data/attachments/` image path is a **fallback only** (the user has a photo, not a Figma node).

### Mockup compliance — seed only slice-correct mockups (R19 lesson)

A calibration mockup that breaks the skill's OWN rules produces frustration + off-topic "neither"s, not signal (R19 burned most of its 10 pairs this way). Before seeding, every mockup MUST:
- Run clean against `reference_anti_patterns.md` — e.g. **NO section-header / divider directly under the App bar.**
- Use a **status-bar-reserved AppBar** — the app bar sits BELOW the status bar, never inside it. Fix `src/dls/primitives.jsx` if its AppBar lacks the ~54px status reserve.
- Use **canonical assets** (`slice-design-suite/illustrations/`, e.g. `dls_success_tick`), never a hand-drawn glyph.
- Vary EXACTLY ONE axis between A and B; everything else identical.

### Step 2 — User walks through (no gate)

Tell the user:

> "Calibration page is up: **http://localhost:8766/**
>
> Walk through as many as you like — each pick auto-saves. Come back and say **anything** when you're ready for me to triage."

**STOP and wait.** The user can answer 3 out of 20 and that's fine.

### Step 3 — Triage whatever was answered

When the user returns (says "done", "triage", "ok", or anything):

1. Read new entries: `tail -n +$((START_LINES+1)) data/log.jsonl`
2. Group by `rule_key`. For each rule with a new pick:
   - **promote** — clean pick + reason → write rule to reference file
   - **flip** — contradicts expected_winner with decisive reason → propose reversal
   - **AP-confirmed** — anti-pattern flagged → promote to anti_patterns.md
   - **neither (mockup quality)** — reason about rendering → note bug, skip rule
   - **neither (silent)** — no reason → drop, don't re-pair
   - **both_fine** — no rule, just log
3. Auto-apply all promotions (no per-rule approval — user already validated on the page).
4. Write to three places per rule:
   - Target `reference_dls_*.md` file
   - `reference_calibration_log.md` (append)
   - `pairs.json` (add `calibrated: true`)

### Step 4 — Sync to git repo

1. Copy modified `references/*.md` from `~/.claude/skills/slice-design/references/` to `~/claude/slice/projects/slice-design-suite/skills/slice-design/references/`.
2. Commit: `R<N+1> <topic> calibration: <count> rules promoted` (check `git log --oneline -1` for last R number).
3. Do NOT push.

### Step 5 — Summary

```
answered: 8/20
promoted: 6 rules
logged (no rule): 2
files touched: reference_dls_buttons.md, reference_dls_screen_layouts.md
git: committed as R18 to slice-design-suite
```

## Question generation strategy

### Priority 1 — Components with no calibrated rules yet
Reference files with 0 calibrated entries (badge, bottom_nav, footer_header, tags, tabs, elevation, controls).

### Priority 2 — Existing files with < 3 calibrated rules
Thin files like carousel, dialer, dates_time.

### Priority 3 — Cross-component patterns
Spacing, density, animation, copy patterns, error flows that span multiple components.

### Priority 4 — Revisit "both fine" / "neither" from prior rounds
Reframe as sharper pairs with better mockups.

## Safety

- `log.jsonl` and `parking_lot.jsonl` are append-only.
- `reference_calibration_log.md` is append-only.
- All reference writes use the `Edit` tool.
- If a new rule contradicts an existing promoted rule, flag it before overwriting.
- `pairs.json`: only add pairs, add `calibrated: true`, update `expected_winner` for flips. Never delete.
