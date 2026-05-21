---
name: slice-design-calibrate
description: Companion to `slice-design` — end-to-end calibration → skill-update flow. Ensures the dls-calibration dev server is up, surfaces the URL to the user, waits while they fill in pair judgments (A/B compares, "is this slice?" reviews, image-attached references), then triages the new log entries and proposes diffs to the slice-design skill's reference files. Each diff is approved/edited/rejected per rule. Writes are mirrored to references/reference_calibration_log.md for audit. Triggers on "/update-slice-design", "calibrate slice", "run the slice calibration", "triage the calibration log", "promote calibration learnings".
---

# slice-design-calibrate

Part of the **slice-design suite** (companion to `slice-design`). Keeps the slice-design skill itself in sync with how the senior product designer actually wants slice screens to look.

The user calibrates judgment via A/B pairs, "is this slice?" reviews, or attached production references in a local web proto (`~/claude/slice/projects/dls-calibration/`). This skill triages those judgments and promotes the resulting rules into the `slice-design` skill's `references/*.md`.

## When to invoke

- `/update-slice-design` slash command (the canonical trigger)
- "Calibrate slice", "run the calibration", "triage what's new on the page"
- After the user has filled some new pairs on the dls-calibration page and says "done" / "ready"
- Without a fresh batch — the user wants to triage existing parking-lot entries or revise rules

## Required files

- `~/claude/slice/projects/dls-calibration/` — the calibration proto (Vite + React, port 8766)
- `~/claude/slice/projects/dls-calibration/data/log.jsonl` — append-only pick log
- `~/claude/slice/projects/dls-calibration/data/parking_lot.jsonl` — "need more info" queue
- `~/claude/slice/projects/dls-calibration/data/attachments/<session>/` — image references attached during picks
- `~/claude/slice/projects/dls-calibration/src/pairs.json` — pair definitions
- `~/.claude/skills/slice-design/references/reference_calibration_log.md` — audit trail (append-only)
- `~/.claude/skills/slice-design/references/reference_*.md` — target ref files for promoted rules

## Flow — single end-to-end run

The user types `/update-slice-design` once. Do all of the following in sequence, **without exiting** between steps:

### Step 0 — Launch the calibration webpage

1. Check whether a Vite dev server is already serving port 8766:
   - `curl -s -o /dev/null -w "%{http_code}" http://localhost:8766/ 2>/dev/null` — 200 = running
2. If not running, start it in the background:
   ```
   cd ~/claude/slice/projects/dls-calibration && npm run dev
   ```
   Use `run_in_background: true`. Then wait ~3s and `tail` the output to confirm "Local: http://localhost:8766/" appeared.
3. Snapshot the current line count of `data/log.jsonl` so we know which entries are "new" for this batch:
   ```
   START_LINES=$(wc -l < ~/claude/slice/projects/dls-calibration/data/log.jsonl 2>/dev/null || echo 0)
   ```
   Remember this number for Step 2.

### Step 0.5 — Ask the user what to seed (NEW)

Before pointing them at the page, **ask** what kind of pairs to generate for this round. Show the menu:

> "How many pairs to seed for this round? Pick a category (or say 'none' to just triage what's there, or describe a custom set):
>
> - **Motion** (8 pairs) — easings, page transitions, sheet enter/exit, micro-interactions
> - **Empty / error states** (6 pairs) — Activity-empty, Notifications-empty, connection-lost, transaction-failed
> - **Forms / inputs** (6 pairs) — multi-step form, OTP choreography, file upload, address, date picker
> - **Settings / dense rows** (4 pairs) — S-32 list row anatomy, toggle row, danger row, group container
> - **Pills / segmented filters** (3 pairs) — pill active state, scroll-behavior, position
> - **Open questions** (1–3 pairs) — Button Regular 48 vs 44, etc.
> - **None** — skip seeding, walk through whatever's queued
> - **Custom** — describe what you want (e.g. 'tune Card', '5 pairs on Notification rows')
>
> Tell me the category (e.g. 'motion') or 'none' / 'custom: <description>'."

**STOP and wait** for the user to choose. Don't seed without explicit instruction.

When they answer:
- **Named category**: build the pairs from the recipe in the relevant category below (`### Seed recipes`).
- **Custom**: design 3–10 pairs against the user's description. Each pair needs a unique `rule_key`, `component`, `axis`, `description`, and either A/B render props OR a tune showcase OR a review screen.
- **None**: skip the rest of Step 0.5 and go to Step 0.6.

Generate pairs by running a `.cjs` script under `~/claude/slice/projects/dls-calibration/scripts/` that mutates `src/pairs.json`. Bump the version and description. Pattern:

```js
const fs = require('fs');
const p = JSON.parse(fs.readFileSync('./src/pairs.json','utf8'));
const newPairs = [
  { id: 'r14-motion-1400', phase: 1, mode: 'compare',
    component: 'Page transition', axis: 'which is more slice?',
    rule_key: 'page_transition_duration',
    a: { render: 'R14Variant', props: { kind: 'page-transition', side: 'A' }, description: '200ms push' },
    b: { render: 'R14Variant', props: { kind: 'page-transition', side: 'B' }, description: '320ms push' },
    description: 'Slow vs snappy push-left page transition. Both ease-out.' },
  // ...
];
p.pairs.push(...newPairs);
p.version = p.version + 1;
fs.writeFileSync('./src/pairs.json', JSON.stringify(p, null, 2));
console.log('added', newPairs.length, 'pairs · active:', p.pairs.filter(x => !x.calibrated).length);
```

If the category requires new component renders (e.g. motion demos, error-state screens), also add the React variants to `src/mockups/Round<N>Variants.jsx` and register them in `src/mockups/registry.jsx`. The runner auto-shuffles them in.

After seeding, report briefly: "Seeded N pairs in category X. Refresh the page."

### Step 0.6 — Tell the user to walk through

Tell the user:

> "Calibration page is up: **http://localhost:8766/**
>
> Walk through the pairs — pick A / B / Neither / Both fine (or ✓ Ship / ⚠ Issues / ✗ Not slice for review screens, or ✓ Lock / ✗ Reject for tune-mode). Add a reason and/or attach a reference image where it helps.
>
> When you're done, just say **'done'** — I'll auto-triage, update the skill, mark the pairs calibrated, and commit. You don't need to do anything else."

**STOP and wait** for the user's "done". Do not advance to Step 1 until they signal.

### Seed recipes (reference for Step 0.5)

| Category | rule_keys (sample) | Notes |
|---|---|---|
| **Motion** | `page_transition_duration`, `page_transition_easing`, `sheet_enter_curve`, `sheet_exit_curve`, `tap_press_feedback`, `loading_skeleton_shimmer_speed`, `value_change_animation`, `error_shake_intensity` | Use compare mode with two video-loop-style demos in `R14Variant.jsx`. Each demo runs an inline CSS animation; user picks which feels slice. |
| **Empty / error states** | `empty_activity_layout`, `empty_notifications_layout`, `empty_search_results`, `connection_lost_pattern`, `transaction_failed_pattern`, `validation_error_layout` | Compare mode; full-screen mockups using existing primitives + the calibrated illustration rule. |
| **Forms / inputs** | `otp_entry_choreography`, `multi_step_form_progress`, `file_upload_button`, `address_input`, `date_picker`, `inline_error_position` | Mix of compare + tune mode. Use existing `Underlined input` primitive. |
| **Settings / dense rows** | `dense_row_height`, `toggle_row_layout`, `danger_row_color`, `settings_group_container` | Tune mode for dense_row_height (showcase 56 vs 64); compare for the rest. |
| **Pills / segmented filters** | `pill_active_state`, `pill_scroll_behavior`, `pill_position_relative_to_search` | Compare mode. |
| **Open questions** | `button_regular_48_vs_44`, `quick_pay_avatar_size`, `empty_rewards_pill_anatomy` | Re-pair lingering R12/R13 unresolveds with corrected mockups. |

When seeding a category, generate ~half the listed rule_keys (so user gets variety, not exhaustive coverage). The user can ask for more in a follow-up round.

### Step 1 — Parking lot first

Read `parking_lot.jsonl`. For each entry (oldest first):
1. Show the pair to the user: pair id, molecule/component, axis, the two prop sets, encoded `expected_winner` + `source`, the user's original `reason`.
2. Provide elaboration: cite the relevant slice-design rule (load the matching `reference_*.md` only if needed), explain why one side is expected to win, note any conflict with `impeccable` or `design-motion-principles`.
3. Ask: "now that you've seen the context, what's your pick?" — accept A / B / neither / both_fine / still unclear.
4. If "still unclear": leave in parking lot, move on.
5. Otherwise: append a resolved pick to `log.jsonl` (`resolved_from_parking_lot: true`) and remove the entry from `parking_lot.jsonl`.

Do not proceed to step 2 until the parking lot is processed (or the user says skip).

### Step 2 — Triage picks by rule_key

Read `log.jsonl`. Use the `START_LINES` snapshot to focus on entries added this session — older entries inform context but the *promotion decisions* should be driven primarily by the new batch.

For entries with `attachments: [...]` paths, **convert each SVG/PNG to PNG and Read it** before triaging — the reference image often carries 10× the signal of the reason text. Conversion recipe:

```bash
qlmanage -t -s 720 -o <out_dir>/ <path/to/file.svg>
```

Group by `rule_key`. For each rule, compute:
- pick count (this batch + prior; show both)
- agreement rate vs `expected_winner` (if encoded)
- anti-pattern flag count (`anti_pattern_marked` set, whether `anti_pattern_auto: true` or user-set)
- confidence tier (revised 2026-05-17 — no quorum gate):
  - **promote** — 1 clean pick + reason / reference image that matches `expected_winner`, OR a non-trivial reason that extracts a new rule. This is the default.
  - **flip** — pick contradicts `expected_winner` and the reason / reference is decisive → propose rule reversal, don't wait for repeats.
  - **mockup-quality neither** — "neither" pick with a reason about rendering/spacing/colour fidelity → don't re-pair the rule; the rule isn't being tested. Note the mockup bug for fixing, and move on.
  - **silent neither** — "neither" with no reason and no AP flag → drop the pair (it didn't read); don't re-pair.
  - **AP-confirmed** — anti-pattern flagged or implied by reason → promote to anti-pattern immediately, even on 1 pick.
  - **review-with-reference** — review-mode pick ("ship" / "issues" / "not_slice") with an attached production frame → extract every concrete rule the reference encodes (could be 5–15 rules from one frame). Don't apologise for "thin data".
  - **tune-locked** — `mode: 'tune'` entry with `pick: 'lock'` → the user fine-tuned a single component via the knob panel. The `config` field is the canonical spec. Promote to the matching `reference_dls_<component>.md` as the **default config block**, overriding any prior baseline. The `diff` field shows exactly what changed from the seed config — surface it in the proposed diff.
  - **tune-rejected** — `mode: 'tune'` entry with `pick: 'reject'` → the user couldn't tune this component into shape. The component spec itself is broken; flag for redesign rather than promotion.

**Do NOT** require ≥3 picks for promotion. **Do NOT** create "quorum builder" pairs for already-promoted rules. **Do NOT** re-test rules in compound/screen contexts to "strengthen" them — once a rule is promoted, it's settled until contradicted.

Show the user a triage table BEFORE proposing any diffs. **Only list rules that have new signal this batch** — settled rules with no new picks don't appear in the table.

```
| Rule | New pick | Reason / reference note | Tier | Proposed action |
|---|---|---|---|---|
| txn_debit_neutral_vs_red | A ✅ | — | promote | Promote to reference_dls_list_items.md |
| insight_amount_weight_body | neither | "right number font is too bold" | new rule from reason | Promote new rule |
| l0_card_gap_16 | neither | placeholder (A==B) | drop pair | Drop placeholder, don't re-pair |
| review_balance_l1 | ⚠ + ref SVG | ref shows brand-purple caption, dual CTA | review-with-reference | Promote 3 new rules + screen recipe |
```

**Don't apologise for "thin data" or wait for more picks.** One clean pick / reference + reason is the signal.

### Step 3 — Propose diffs (high / high+AP / flip / AP-confirmed)

In auto-triage mode (user said "done"): **skip per-rule approval and just apply the diffs.** The user has already validated the picks on the page; they don't want to confirm each promotion. Show a short summary at the end (Step 7).

In manual triage mode (user explicitly asked to "review before promoting"): propose diffs per rule and ask **approve / edit / reject**. Show the diff inline:

```diff
# references/reference_dls_list_items.md
+ ## Transaction row · debit colour
+ Debit amounts: use Text Primary (neutral), not negative red.
+ Source: calibration session 2026-05-17, 5 picks, 100% agreement.
+ Reason (user): "red is too punitive for normal spends".
```

For anti-pattern flips:

```diff
+ ### ❌ Cashback strip with rainbow gradient
+ Looks like: pink → orange → yellow → green multi-stop bg
+ Why slice doesn't: 4 picks, 1 explicit anti-pattern flag (2026-05-17)
+ Do instead: Valentino-Subtle bg with Valentino 500 text, OR brand gradient
+ Source: cal:2026-05-17 ✅
```

For flips:

```diff
~ Original encoded answer for "insight_uses_avatar" was A. Calibration override: user picked B 4/4 times.
~ Reason: "avatars feel heavy for a list of insights".
~ Update pairs.json `expected_winner` to B and lock with `calibrated: true`.
```

For reference-driven screen recipes:

```diff
# references/reference_dls_screen_layouts.md
+ ### Balance L1 (= "Banking home")
+ 1. App bar Standard chevron back + title + trailing eye-icon
+ 2. Centred Display amount with decimal-subscript treatment
+ 3. Brand-purple caption below (not secondary)
+ 4. Dual CTA bottom: Tertiary outline "Transfer" + Primary "Add money"
+ Source: cal:2026-05-17 — review-1101 reference frame ✅
```

For tune-locked entries (single-component fine-tuning):

```diff
# references/reference_dls_avatar.md
+ ## Calibrated default config (2026-05-18)
+ ```json
+ { "size": 40, "emphasis": "subtle", "color": "valentino", "label": "A" }
+ ```
+ Source: cal:2026-05-18 tune session — diff from baseline: { "size": 32→40 }.
+ Reason (user, if attached): "M-40 is the default everywhere; S-32 is dense-row only".
+ This is the canonical spec the rest of slice inherits. Any deviation must justify itself.
```

### Step 4 — Cross-skill conflicts

If a confirmed slice-design rule contradicts what `impeccable` or `design-motion-principles` would advise, surface it explicitly and append a row to the "Cross-skill conflicts" table in `reference_anti_patterns.md`.

### Step 5 — Writes (on approval)

For each approved diff, write to three places in this order:
1. The target reference file — actual rule lives here
2. `references/reference_calibration_log.md` — append one line per rule:
   `2026-05-17 · txn_debit_neutral_vs_red · 5 picks · 100% · promoted to reference_dls_list_items.md`
3. `pairs.json` — bump `expected_winner` for flipped rules; add `"calibrated": true` to confirmed rules so the runner can deprioritize them in future batches

Use the `Edit` tool with explicit diff previews. Never overwrite log history.

### Step 6 — Suggest next pairs (only if genuinely new territory)

After all writes, propose 2–3 new pair candidates **only if they cover uncovered DLS territory** — not re-pairs of already-settled rules, not "quorum builders", not "test the rule in a compound context."

Good candidates: components / tokens / patterns that haven't been calibrated yet (e.g. specific button states, specific card sizes, motion durations, copy patterns, empty / error states for surfaces not yet covered).

Bad candidates (do NOT propose):
- Re-pairs of rules already promoted ("strengthen at quorum")
- Same rule in a slightly different mockup ("3rd pick to graduate to high tier")
- Compound versions of already-tested molecule rules

If there's no genuinely new territory worth covering, say so plainly: "No new pairs to propose this round — recommended skill state is stable. Run again when you've got fresh territory to explore."

### Step 7 — Summary

End with:

```
✅ promoted: 4 rules
⚠️ mixed: 2 rules (no promotion; consider adding pairs to reach quorum)
⏳ low: 3 rules (need more picks)
🔄 flipped: 1 rule
🚩 anti-pattern entries: 1 new, 1 strengthened
📝 calibration_log.md: 7 new lines appended
🎯 next-batch pair suggestions queued: 4
```

## Auto-AP behavior (in the webpage)

The webpage auto-flags a side as anti-pattern when its `rule_key` has been rejected ≥2 times before (via "neither" picks or explicit `anti_pattern_marked`). The user can un-flag if it's wrong. When an `anti_pattern_auto: true` entry shows up in the log, treat it as roughly equivalent to a user-explicit AP flag for purposes of promotion — but call out in the triage table that it was Claude-flagged not user-flagged.

## Reference-image triage (new in R11)

The calibration webpage now accepts image attachments per pair (drag / paste / click-to-pick). Attachments save to `data/attachments/<session>/<pair_id>-<ts>.<ext>` and the paths appear in the log entry's `attachments` field.

When triaging:
1. List attachment paths from each log entry
2. Convert SVG → PNG via `qlmanage -t -s 720 -o _png/ <path>.svg`
3. Use the `Read` tool on the resulting `.png` to see the reference frame
4. Extract every concrete rule the frame encodes — typography, spacing, chrome, layout, copy patterns

Reference frames compress orders of magnitude more signal than A/B picks — treat one production reference as 5–15 rules worth of input, not a single data point.

## Implementation notes

- Always read all files before proposing diffs — never propose blind.
- Use `Read` with byte offset on large log files.
- Use `Bash` with `tail -n +$((START_LINES+1)) data/log.jsonl` to scope to new entries.
- If a `rule_key` appears in `log.jsonl` but not in `pairs.json`, surface the orphan and ask the user.
- `anti_pattern_auto: true` entries count toward the AP count, but flag the Claude-vs-user distinction in the triage table.
- `resolved_from_parking_lot: true` entries count toward the agreement rate just like normal picks.

## Safety

- All writes go through `Edit` with explicit diffs.
- `log.jsonl` and `parking_lot.jsonl` are append-only — do not rewrite or delete.
- `reference_calibration_log.md` is append-only — never edit existing lines.
- `pairs.json` is OK to edit but only the `expected_winner`, `calibrated`, and added pairs — never delete history.
- `data/attachments/` files are user-provided references — preserve, do not modify.

## When NOT to use

- If the user explicitly says "skip the webpage, just triage what's there" — skip Step 0, go straight to Step 1.
- If the user wants to add new pairs without triaging existing data — use a different command (or just ask).
- If the user wants to read or apply slice-design rules to build something — use the main `slice-design` skill instead.
