# R22 Quality Baseline — slice-design skill

**Date**: 2026-05-29
**Calibration round**: post-R21 multi-file sweep + per-pod aggregator architecture + flows/interactions/entry-points/product-model files
**Test method**: 5 parallel subagents, each given a realistic slice design prompt + access to the skill + asked to self-assess
**Eval set**: `evals/evals.json`

---

## Aggregate scores

| Eval | Layer tested | Overall |
|---|---|---|
| 1. Atom L1 build | Pod-specific recipe + tokens + motion + anti-pattern | 4.5/5 |
| 2. Orange-fire ban | Cross-cutting hard rule enforcement | 5.0/5 |
| 3. Pay UPI flow | God-view flow understanding | 4.5/5 |
| 4. Judge compliance | Before/After/Why format + severity tagging | 4.5/5 |
| 5. Exploration novel pattern | Hard-vs-soft + alternatives + slice-way | 4.0/5 |
| **Average** | — | **4.5/5** |

---

## What the skill nails

1. **Calibrated rule enforcement** — Eval 2 (orange-fire) scored a perfect 5/5 across all sub-dimensions. The skill cites Absolute bans directly, articulates WHY, offers sanctioned alternatives, and provides calibration log provenance. This is the strongest layer.

2. **Pod recipes with WHY preserved** — Eval 1 found the Atom L1 returning-user recipe in `reference_pod_banking.md` with the exact frame ID (`8534:23336`), R19 calibration date, and the WHY for the mid-screen Primary CTA pattern. Pod aggregators are paying off.

3. **God-view flow narration** — Eval 3 walked the Pay UPI flow from L0 dialer → 3 entry branches → Pay person → PIN → transition envelope → confirmation with cross-pod handoffs and exact motion durations. The `reference_flows.md` file is doing its job.

4. **Judge-mode rigor** — Eval 4 produced a Before/After/Why table catching 9 issues across 4 severity tiers in one synthetic screen. Cross-cutting + Banking pod + Profile V3 supersession all cited correctly.

5. **Hard-rule preservation in exploration** — Eval 5 scored 5/5 on hard-rule preservation. Even in "try something new" mode, the skill kept V-500, Rubik, no-emoji, no-rainbow-gradient, no-infinite-loop, no-scale-on-press all locked.

---

## Where the skill is weakest

### Exploration mode — alternatives feel composed, not novel

Eval 5 scored only 3/5 on "alternative quality (genuinely novel?)" — most options were composed from existing validated patterns (Spark hero reveal + value-change + bling) rather than inventing new vocabulary. The skill has a clip-path / blur / spring / momentum toolkit, but those primitives skew toward hero moments and form interactions — not toward **tile-level micro-motion** (counter rolls, ember pulses, particle bursts).

**Gap**: there's no documented tier between "Spark hero reveal" (~2 second hero moment) and "press feedback" (160ms opacity dim). Tile-level micro-animations live in this missing tier.

### Documented-but-implicit rules

Several rules are calibrated in pod files but not lifted to cross-cutting:
- **Bottom nav stays on L0** — implicit in each pod's L0 anatomy, not a standalone HARD rule
- **Off-token Avatar sizes** — Avatar size list is canonical but "anything else is wrong" isn't stated
- **Cross-pod CTA leakage** — Pay Bills on Banking, Add money on Explore — implied but not codified as anti-pattern

**Gap**: judge mode caught these issues because the subagent was thorough, but a sharper version of cross-cutting hard rules would surface them faster.

### Motion specifics still inferred at envelope level

Eval 3 flagged that per-frame motion durations for the rewarded payment transition envelope are still marked LOW-MEDIUM confidence (already known from R19). Eval 5 inferred pixel sizes for ember dot (4px) and particle bursts (8px) because the skill doesn't specify micro-motion sizes.

**Gap**: a few targeted sweeps would lock these down — Payment OS frame-by-frame sampling for the envelope, and an Explore-tile micro-motion sweep.

### Recipe gaps surfaced

| Gap | Eval | Notes |
|---|---|---|
| Atom L1 hero caption literal copy (`Total saved` vs `Your atoms`?) | 1 | Easy: transcribe from frame 8534:23336 |
| Active atom card amount role (current saved vs target?) | 1 | Disambiguate |
| Active atoms list sort order | 1 | Document |
| Progress-bar fill mount motion | 1 | Add to motion.md |
| QR scanner surface anatomy | 3 | Missing from Payments pod — heavy-use surface |
| Return-from-confirmation transition | 3 | Pin down |
| Rewarded vs un-rewarded routing (BE signal) | 3 | Likely BE doc, not design |
| PLAY & WIN tile copy decision (Rewards vs live count) | 5 | Calibrate |
| Streak / progress indicator recipe | 2, 5 | Add new pattern recipe |
| Run-once gate strategy (session vs daily vs first-tap) | 5 | Document the gate-strategy taxonomy |
| Explore tile motion budget rule | 5 | How many of 4 tiles can animate simultaneously? |
| Particle / radial-burst patterns — legal? | 5 | Calibrate or ban |
| Micro-motion catalogue tier (between press feedback and hero reveal) | 5 | New reference file proposed |

---

## What this validates

1. **The pod-aggregator architecture is working.** Per-pod files were the primary load path for 4/5 evals; subagents successfully routed to the right file via SKILL.md's quick-reference table.

2. **The god-view layer (flows + entry points + product model) helps with multi-surface narration.** Eval 3 walked an end-to-end flow with cross-pod handoffs that no single pod file or component ref could have produced alone.

3. **WHY field is genuinely useful.** Subagents cited WHY consistently — for the orange-fire ban, the in-card CTA pattern, the mid-screen Primary exception, etc. This was a R19 addition; evals confirm it pays off.

4. **Calibrated rule citations + frame IDs build confidence.** Every eval cited specific R-rounds, calibration dates, and source frame node IDs. This is what makes the skill defensible vs hand-wavy.

---

## What this exposes

1. **The skill is excellent at applying patterns; less excellent at inventing them.** This isn't a bug per se — slice's calibrated approach is intentionally pattern-based. But it means the "explore" mode needs more vocabulary to draw from when the brief is genuinely novel.

2. **Interaction-feel is per-app, not abstract.** Eval 5 inferred pixel sizes and motion gating because the abstract `reference_interaction_layer.md` is starter vocabulary — the actual feel is per-project (confirmed direction).

3. **Drift between calibrated rules and reference files** — Eval 4's bottom-nav-on-L0 finding shows that some hard rules live only in pod files. These should be lifted to cross-cutting for one-stop hard-rule audit.

---

## Action items (R23 prep)

### High-priority gap fills
- G7: Document QR scanner surface (Payments pod) — heavy-use, currently missing
- G10: Codify "bottom nav stays on L0" as standalone HARD rule in cross-cutting
- G12: Codify "cross-pod CTA leakage" anti-pattern in cross-cutting

### Medium-priority recipe additions
- G2: Disambiguate Atom card amount role (current saved vs target)
- G4: Add progress-bar fill mount motion to `reference_motion.md`
- G5: Add streak/progress indicator recipe (used in Fires + Atom + FD context)
- G6: Per-frame sampling for payment transition envelope durations
- G11: Explicit "off-token Avatar sizes are anti-pattern" line in cross-cutting

### New reference file
- `reference_micro_motion.md` — tile-level micro-animations (counter rolls, badge bumps, sparkle pulses, ember states, particle bursts). Fills the tier between press feedback (160ms) and Spark hero reveal (~2s).

### Documentation
- Run-once gate strategy taxonomy (session-store vs daily vs first-tap vs viewport-entry)
- Explore tile motion budget (cap on simultaneous tile animations)

### Calibration
- PLAY & WIN tile copy decision (Rewards label vs live fires count)
- Particle / radial-burst patterns — legal or banned?

---

## Recurring eval cadence

This eval set lives at `evals/evals.json`. Rerun after every major sweep:
- **Smoke test** (Evals 2 + 4 — fast hard-rule checks): every minor change
- **Full battery** (all 5 evals): after every R-round batch (R23, R24, ...)
- **Track delta over time** — when overall score drops below 4.0, regression. When it climbs above 4.7, push for new rules / harder evals.

---

## What "the best company design skill ever" looks like (target state)

Based on this baseline, the path to target:
1. **Close the 13 gaps above** (R23 should resolve most via targeted sweeps + cross-cutting hard-rule lift)
2. **Add micro-motion catalogue** (fills the missing motion tier)
3. **Per-project interaction calibration** (capture actual feel via project memory)
4. **Maintain the eval cadence** (regression detector + improvement signal)
5. **Track WHY rigorously at /calibrate** (already structured — task #29 makes it first-class)

At that point: the skill should hit 4.8+ average across the eval battery, with all 5 layers at 4.5+. That's a design skill that someone with no slice context could use to build slice-correct work.

Today: 4.5/5 baseline. That's a strong starting point.
