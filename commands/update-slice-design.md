---
name: update-slice-design
description: Slash-command alias → invokes the `slice-design-calibrate` skill. End-to-end calibration loop for the slice-design suite.
---

# `/update-slice-design`

This slash command invokes the `slice-design-calibrate` skill, which is part of the slice-design suite.

Use the **`slice-design-calibrate`** skill. The full workflow (Step 0 → Step 7) lives there:
`~/.claude/skills/slice-design-calibrate/SKILL.md`

Quick reference of the flow:
- Step 0 — launch the dls-calibration dev server at http://localhost:8766/, snapshot log line count, wait for user "done"
- Step 1 — process parking lot
- Step 2 — triage new picks + reference attachments by `rule_key`
- Step 3 — propose diffs (promote / flip / AP-confirmed / review-with-reference)
- Step 4 — surface cross-skill conflicts
- Step 5 — write to target reference file + calibration_log.md + pairs.json
- Step 6 — suggest next pairs only if new territory
- Step 7 — summary

Companion skill: `slice-design` (the consumer of everything this loop promotes).
