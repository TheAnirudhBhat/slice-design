# slice design

A suite of Claude Code skills that encode slice's DLS 2.0 design system — and the calibration loop that keeps the rules honest.

## Suite

| Skill | Role |
|---|---|
| **slice-design** | Build, judge, and apply DLS 2.0 to slice screens (Figma execution, web protos, motion, anti-patterns, calibrated judgments) |
| **slice-design-calibrate** | Companion. Walks the senior designer through A/B pairs + "is this slice?" review screens, triages picks + reference frames, promotes the resulting rules into `slice-design/references/` |

The two ship together. The calibrate skill is the maintenance loop. It pairs with a local web proto (described below) — the user owns the proto, the skill owns the loop.

## Precedence (non-negotiable)

When working on slice, **slice-design wins** on any contradiction with `impeccable`, `design-motion-principles`, `frontend-design`, `taste-skill`, `brand-guidelines`, or any other design skill. Calibrated overrides inside `references/` win over baseline rules in the SKILL.md.

Full priority order lives at the top of `skills/slice-design/SKILL.md`.

## Installation

Symlink or copy into your Claude Code skills directory:

```bash
# Symlink (recommended — edits flow in both directions)
ln -s "$(pwd)/skills/slice-design"           ~/.claude/skills/slice-design
ln -s "$(pwd)/skills/slice-design-calibrate" ~/.claude/skills/slice-design-calibrate
ln -s "$(pwd)/commands/update-slice-design.md" ~/.claude/commands/update-slice-design.md

# Or copy
cp -R skills/slice-design           ~/.claude/skills/slice-design
cp -R skills/slice-design-calibrate ~/.claude/skills/slice-design-calibrate
cp     commands/update-slice-design.md ~/.claude/commands/update-slice-design.md
```

Restart Claude Code or open a new session for the skills to be picked up.

## Using the build / judge side (`slice-design`)

Triggers:
- "design a slice screen for X"
- "build the Spark FD details screen in Figma"
- "is this slice?" + a screenshot
- Pasting a Figma URL and asking for a build / variant / audit

The skill self-describes the sub-commands (`build` / `iterate` / `judge` / `audit` / `recipe` / `proto` / `motion` / `calibrate`). It plans internally, executes in one `use_figma` call, then verifies with a screenshot.

`references/` contains:
- `reference_calibrated_digest.md` — single-page index of every calibrated rule (read this first when judging)
- `reference_dls_screen_layouts.md` — full screen recipes (Activity L0, Balance L1, Confirm success, Empty Rewards, Recharge & bills, PIN entry, Bottom sheet confirm, Spark FD details, Add money, Pay person brand-immersive, Credit bill summary, Pay screen, Action centre)
- `reference_dls_<component>.md` — 28 per-component spec files
- `reference_anti_patterns.md` — hard "don't do" list + cross-skill conflict table
- `reference_motion.md` — named durations, easings, choreographies
- `reference_web_proto.md` — how to start a new slice web proto
- `reference_calibration_log.md` — append-only audit of every promoted rule (since 2026-05-13)

## Using the calibration loop (`slice-design-calibrate`)

The calibrate skill expects a local web proto at `~/claude/slice/projects/dls-calibration/` to exist. **This repo does not ship the proto** — it's user-specific and contains your own calibration history. Set one up only if you want to run the loop.

### Setting up the calibration proto (one-time)

The proto is a small Vite + React app that the skill drives. The contract it must meet:

- **Port**: serves on `http://localhost:8766/`
- **Pair definitions**: `src/pairs.json` — array of `{id, phase, mode: 'compare' | 'review', component, axis, rule_key, expected_winner, a: {render, props}, b: {render, props}, description, calibrated?}`
- **Log endpoint**: `POST /api/log` — accepts the JSON pick payload, appends to `data/log.jsonl` (or `data/parking_lot.jsonl` if `pick === 'needs_elaboration'`)
- **Attachment endpoint**: `POST /api/attach` — accepts `{session_id, pair_id, mime, data_url}`, saves to `data/attachments/<session>/<file>.<ext>`, returns `{ok, path}`
- **Attachment serve**: `GET /data/attachments/<session>/<file>` — serves saved files back for thumbnail display
- **UI**: a runner that shuffles active pairs, lets the user pick A / B / Neither / Both fine (compare mode) or ✓ Ship / ⚠ Issues / ✗ Not slice (review mode), attach images, and write a reason

Ask Claude Code (with this suite installed) to scaffold one for you:

> "scaffold a slice-design calibration proto at ~/claude/slice/projects/dls-calibration/ matching the slice-design-calibrate skill's contract"

It will set up the Vite app, the middleware endpoints, the DLS primitives, and seed `pairs.json` with a starter round.

### Running the loop

```
/update-slice-design
```

Or in plain text: "calibrate slice", "run the calibration", "triage the calibration log". The skill walks Step 0 → Step 7 (launch server → wait → parking lot → triage → propose diffs → write → suggest next pairs → summary).

## Directory layout

```
slice-design/
├── README.md                                    ← you are here
├── LICENSE
├── .gitignore
├── skills/
│   ├── slice-design/
│   │   ├── SKILL.md                             ← the main skill
│   │   └── references/
│   │       ├── INDEX.md
│   │       ├── reference_calibrated_digest.md   ← read first when judging
│   │       ├── reference_calibration_log.md     ← append-only audit
│   │       ├── reference_anti_patterns.md
│   │       ├── reference_motion.md
│   │       ├── reference_web_proto.md
│   │       ├── reference_dls_screen_layouts.md
│   │       ├── reference_dls_<component>.md     ← 28 component specs
│   │       └── feedback_*.md                    ← workflow / process rules
│   └── slice-design-calibrate/
│       └── SKILL.md                             ← the calibration loop
└── commands/
    └── update-slice-design.md                   ← slash-command pointer to slice-design-calibrate
```

## Maintenance

- New rule comes from a calibration session → `slice-design-calibrate` writes it into the right `reference_*.md` and appends a line to `reference_calibration_log.md`. Commit on the next push.
- A rule turns out wrong → user picks against it again, the loop flips `expected_winner` and updates the rule. Old log entries are never deleted (append-only audit).
- A skill from outside the suite (impeccable, motion, frontend-design) suggests something that contradicts slice → slice-design wins. If the contradiction is structural, append a row to `reference_anti_patterns.md`'s "Cross-skill conflicts" table.

## Status

Calibrated through 2026-05-17 round 11 (review-with-reference mode). 80+ promoted rules. Active development.

## License

Proprietary. slice-internal. Do not redistribute.
