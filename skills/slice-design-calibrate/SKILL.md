---
name: slice-design-calibrate
description: Conversational calibration for the slice-design skill. Generates 10-30 design questions about uncovered DLS territory, asks them one at a time in the CLI, auto-saves + promotes after each answer. User can stop anytime — all progress is saved. Triggers on "calibrate slice", "run the calibration", "/slice-design-calibrate".
---

# slice-design-calibrate

Conversational companion to `slice-design`. Generates design judgment questions, asks them one at a time, and promotes rules after each answer. No web UI required. User can stop at any point — every answer is saved immediately.

## When to invoke

- `/slice-design-calibrate`
- "Calibrate slice", "run the calibration", "train the design skill"

## Data files

- `~/claude/slice/projects/dls-calibration/data/log.jsonl` — append-only pick log
- `~/.claude/skills/slice-design/references/reference_calibration_log.md` — audit trail
- `~/.claude/skills/slice-design/references/reference_*.md` — target ref files for promoted rules

## Flow

### Step 1 — Generate questions

1. Read the calibration log (`reference_calibration_log.md`) to know what's been covered.
2. Read the INDEX.md to know which reference files exist.
3. Scan the reference files for thin coverage — components with few or no calibrated rules.
4. Generate **10-30 questions** covering uncalibrated territory. Mix these question types:

**A vs B** (most common):
> "**Q3/15** · App bar trailing icons: A) all icons Text Primary, B) primary action in V-500, rest Text Primary — which is more slice?"

**Yes/No**:
> "**Q7/15** · Does slice ever use a full-width banner at the top of L1 screens for announcements?"

**What would you do**:
> "**Q12/15** · A user's KYC is pending and they try to open a savings account. What does the blocker screen look like?"

**Pick the default**:
> "**Q5/15** · Avatar in a notification row: S-32 or M-40?"

Rules for generating questions:
- Cover genuinely new territory — don't re-ask what's already settled in the calibration log
- Prioritize components/patterns with no rules yet, or with "both_fine" / "neither" results from prior rounds
- Each question should target a specific `rule_key` that can become a promotable rule
- Questions should be concrete and answerable in 1-2 sentences
- Number them clearly: **Q1/N**, **Q2/N**, etc.

### Step 2 — Ask and save (one at a time)

Present one question at a time. After the user answers:

1. **Save immediately** — append a log entry to `log.jsonl`:
   ```json
   {"id":"r17-cli-1700","timestamp":"2026-05-28T...","mode":"cli","rule_key":"...","component":"...","question":"...","answer":"...","reason":"..."}
   ```

2. **Promote immediately** if the answer gives a clear rule:
   - Write the rule to the appropriate `reference_dls_*.md` file
   - Append a line to `reference_calibration_log.md`
   - Tell the user briefly: `saved → reference_dls_buttons.md`

3. **Skip promotion** if the answer is ambiguous ("depends", "not sure", "both fine") — just log it and move on.

4. **Ask the next question.** Don't wait for any other signal.

If the user says "stop", "done", "enough", or anything indicating they want to end — stop asking and go to Step 3. Don't ask "are you sure?".

If the user gives a long answer with multiple rules embedded, extract and promote all of them.

### Step 3 — Sync to git repo

After the last answered question (whether the user answered all or stopped early):

1. Copy every `references/*.md` file modified this session from `~/.claude/skills/slice-design/references/` to `~/claude/slice/projects/slice-design-suite/skills/slice-design/references/`.
2. Commit: `cd ~/claude/slice/projects/slice-design-suite && git add -A skills/slice-design/references/` with message `R<N+1> <topic> calibration: <count> rules promoted` (check `git log --oneline -1` for last R number).
3. Do NOT push — just commit locally.

### Step 4 — Summary

End with a short tally:

```
answered: 8/15
promoted: 6 rules
logged (no rule): 2
files touched: reference_dls_buttons.md, reference_dls_screen_layouts.md, reference_anti_patterns.md
git: committed as R18 to slice-design-suite
```

## Question generation strategy

### Priority 1 — Components with no reference file yet
Check INDEX.md against the full DLS component list. If a DLS component has no `reference_dls_*.md` file, generate 2-3 questions for it.

### Priority 2 — Existing files with < 3 rules
Reference files that exist but are thin (few rules, mostly from a single round). Generate 1-2 questions to deepen coverage.

### Priority 3 — Cross-component patterns
Patterns that span multiple components: spacing between sections, density of different screen types, animation choreography, copy patterns, error handling flows.

### Priority 4 — Revisit "both fine" / "neither" from prior rounds
The calibration log has entries marked "both_fine" or "neither" with no rule extracted. Reframe these as sharper questions.

### Things to NEVER ask about
- Rules already promoted and not contradicted — they're settled
- Atom-level token questions (exact hex values, exact px) — those come from Figma, not judgment
- Questions that require seeing a visual to answer — this is text-only mode

## Safety

- `log.jsonl` is append-only — never rewrite or delete existing entries.
- `reference_calibration_log.md` is append-only.
- All reference file writes use the `Edit` tool with explicit diffs.
- If a new rule contradicts an existing promoted rule, flag it and ask the user to confirm before overwriting.

## Legacy web UI mode

If the user explicitly says "use the webpage" or "launch the calibration page", fall back to the old flow:
1. Start the Vite dev server at `~/claude/slice/projects/dls-calibration/` on port 8766
2. Wait for user to say "done"
3. Triage log entries and promote as before
