# slice-design skill — design audit
**Date**: 2026-05-28
**Round**: post-R19 multi-file sweep
**Auditor**: claude (synthesized from R19 sweep + skill-creator compliance check)
**Owner**: Anirudh Bhat (senior product designer, slice)

---

## TL;DR

slice-design is **healthy and substantially complete** for routine slice design work. The R19 sweep just landed the largest update in the skill's history (18 files touched, 8 new reference files, 5 product files mined, motion + accessibility + performance + craft principles documented for the first time, illustrations partially extracted to local assets).

**Strong**: screen recipes, anti-patterns, brand voice, calibrated rules through R19.

**Weak**: icon library (directory missing — needs re-export from DLS), illustration extraction (~10 of 22 cataloged, Payment OS file timeouts blocked the rest), no automated eval loop (works empirically, not benchmarked).

**No RAG needed yet** — progressive disclosure works. See § RAG analysis below.

---

## Stats

| Metric | Value |
|---|---|
| Total lines (SKILL.md + references/) | 7,247 |
| SKILL.md lines | ~265 (under 500-line cap ✅) |
| Reference files | 59 |
| Local illustrations extracted | 10 |
| Local icons | 0 (broken — needs re-export from DLS) |
| Calibration rounds completed | R19 |
| Calibrated rules cited | ~120+ (across anti-patterns + screen layouts + molecules) |
| Sub-commands | `build` / `iterate` / `judge` / `audit` / `recipe` / `proto` / `motion` / `explore` / `extract` / `status` / `calibrate` / `sweep` |

---

## Coverage matrix

### Screen recipes (covered)
- L0 pod homes — Banking, Explore, Payments (with Action Pills row), Credit, Activity, Profile
- L1 — Balance, Atom returning-user, Credit Card limit dashboard, Spark FD details
- L2 — Transaction detail (4 states: Success / Pending / Failed / Initiated), Payment confirmation, Pay person, PIN entry, Repayment dialer
- Form / picker — Atom setup form shell, Atom chooser picker, Product picker split layout
- Empty / error — Empty Rewards, Empty Activity, Empty Action centre, Empty Search Results, Connection Lost, Transaction Failed, Validation Error
- Sub-product — Atom (full suite: FTUX PDP pair, Banking L0 entry, chooser, setup, returning-user L1, explainer)
- Motion choreographies — Nav push/pop, Sheet present/dismiss, Press feedback, Value change, Skeleton shimmer, Spark hero reveal, Campaign pill reveal, Payment status transition envelope

### Molecules (covered with R19 corrections)
App bar (4 types: Standard, L0, Search, Subtitle) · Avatar (6 sizes, 6 colours, 2 emphasis, 6 background rules per row context) · Buttons · Button group (4 layouts including Total due summary) · Cards (L0 Large with 1- and 2-insight, Medium, Small, Outline-border, Stat tile, FD card) · Carousel (with User Action Request banners cross-referenced) · Chips (20px icons, Disabled state) · Accordion · Badge · Bottom nav · Bottom sheet · Dialer · Dot indicator · File upload · Footer & header (with Bharat Connect + corrected Tick icon) · Iconography (taxonomy synced, directory flagged missing) · Input field · List items (5 sub-types: Standard, Search, Subtitle, L0, Control) · Pills (cross-referenced as DLS "Tabs") · Pin field · Progress · Search · Section header (List, Bold, Bold+CTA, Bold+chevron for collapsibles) · Slider · Snackbar · Spacing · Tabs (consolidated under Pills) · Tags · Tooltip (arrows ARE canonical — R6 inverted) · Top header (NEW file) · User Action Request banners (NEW file, 8 colorways)

### Cross-cutting (NEW in R19)
- Motion (Emil's 4-question framework + 13 techniques + 2 R19 choreographies)
- Performance (GPU-only, CSS variables on parent, Framer Motion shorthand, WAAPI)
- Accessibility (prefers-reduced-motion, touch hover gate, tap targets, contrast)
- Craft principles (taste is trained, unseen details, beauty as leverage, review next day)
- Exploration patterns (clip-path, blur crossfade, momentum, damping, springs, 3D)
- Project memory (.slice-design/project.md per-project layer)
- Illustrations catalog (12 illustrations cataloged, 10 extracted)

### Calibration audit trail
- R1 through R19 entries in `reference_calibration_log.md`
- 551 lines of audit log
- Method: A/B paired calibration (calibrate) + bulk reference-frame sweep (sweep) running in parallel

---

## Strengths

1. **Pattern density** — almost every slice surface in active production has a calibrated recipe + reasoning + source frame. R19 sweep filled the major gaps (Atom, Credit Card 2026, Payments L0 action pills, txn detail L2, transition envelope).

2. **Brand voice locked** — lowercase "slice", Rubik only, V-500 palette, Indian numerals, no emoji. Hard rules don't drift even across major batches.

3. **Anti-patterns are sharp and cited** — every Absolute ban has a calibrated source. The slice-slop test gives Claude a concrete failure-mode checklist.

4. **Working modes documented (R19)** — hard/soft/exploration distinction lets Claude reason about when to apply rigid rules vs remix. Solves the "AI keeps building the same thing" problem.

5. **Skill-creator compliance** — SKILL.md under 500 lines, progressive disclosure via 59 references loaded on demand, pushy description, imperative voice, WHY field on new rules.

6. **Audit trail** — every rule cites its source frame (node ID) + calibration round. Future drift can be traced.

---

## Weaknesses + gaps

### 1. Icon library directory is empty (high impact)
- `slice-design-suite/icons/` exists as a folder but has zero SVGs.
- The skill ban "never generate icons" + the directory-based usage pattern (`<icon-slug>.svg` per category) both depend on icons being present.
- **Impact**: when asked to build a screen, Claude can't load slice icons in code/proto contexts. Falls back to placeholders or asks the user.
- **Fix**: re-export from DLS Figma file. Pipeline documented in `reference_dls_iconography.md` (figma_execute batch POST to localhost:8766/api/icons). Should be a 1-2 hour task once the calibration proto is running.

### 2. Illustration extraction partial (medium impact)
- 10 of 22 illustrations extracted to disk. Most-impactful (atom_orb_3d, super_card_mascot, FD mascot, round_ups_setup_pair, 6 atom stash thumbnails) are in place.
- Missing: grainy_gradient_tick (hero + small), red_x failure, amber_processing_ring, blue_initiated_ring, fire_pink_swirl, monies_green_motif, spark_lifetime_cashback_avatar, invite_earn_hook_magnet, asteroid_diamonds_empty_rewards, sad_mascot_connection_lost.
- **Root cause**: Payment OS file (`xIc12scqCFBSJ5Kgyd6Krh`) metadata calls consistently timeout. The file is too large for single-call inspection.
- **Fix**: targeted node-ID sampling. Identify each illustration's specific node by drilling into smaller sub-frames (not the whole canvas). 30-min follow-up sweep.

### 3. WHY field is partial (low impact)
- New R19 rules have WHY where the subagent extracted reasoning.
- Older rules (Absolute bans, Defaults section, R1-R18 entries) often lack explicit WHY — they cite calibration sources but don't articulate the principle.
- **Per user direction (2026-05-28)**: backfill WHYs during /calibrate sessions, not as a bulk pass. Tasks #29 (update calibrate to prompt for WHY) + #30 (backfill, optional) deferred.
- **Impact**: low — Claude can usually infer WHY from context. But explicit WHY makes the skill more defensible when a designer challenges a rule.

### 4. Calibrated digest is stale (medium impact)
- `reference_calibrated_digest.md` last updated 2026-05-21.
- The digest is supposed to be the single-page index of every calibrated rule — used for fast `judge` / `audit` lookups.
- R18 + R19 added ~30+ new calibrated rules + reverifications that aren't in the digest.
- **Fix**: regenerate via `/update-slice-design` (slice-design-calibrate companion). Should be automated.

### 5. No automated eval loop (low impact, per user empirical signal)
- Skill triggers reliably and produces slice-correct output in practice (multiple projects: explore-base, dawave-portfolio, atom proto).
- No formal eval prompts in `evals/evals.json`. No baseline vs with-skill comparison.
- **Per user direction**: skill works empirically; formal evals are future regression safety, not a current blocker. Tasks #26 (add evals) + #27 (description optimization) deferred.

### 6. Agentation dependency was implicit, now explicit (just fixed)
- SKILL.md now declares agentation as required (R19 update).
- Open question: should the skill auto-detect agentation at session start and warn if missing? Currently the dependency is documented but not enforced.

### 7. Heavy MUSTs in Absolute bans section unsoftened
- The skill-creator compliance check noted some heavy MUSTs that could be softened with WHY.
- R19 only applied softening to new rules (per user direction); existing Absolute bans + Defaults stay as-is.
- **Impact**: low — Absolute bans are HARD rules and the rigidity is justified. But for Defaults section ("Lowercase slice always"), brief WHY would help Claude reason in novel cases.
- **Recommended fix**: pass through Defaults at next /calibrate session, add brief WHY per default.

---

## Dependencies

### Required
- **agentation** — runtime layer for icon routing, DLS primitives, localhost:8766. Now explicitly documented in SKILL.md as required.
- **Figma MCP** (official `claude.ai Figma`) — for `use_figma` writes, get_screenshot, get_design_context, search_design_system, get_libraries
- **figma-console MCP** (backup) — REST API + Desktop Bridge for batch icon export, faster reads

### Companion skill
- **slice-design-calibrate** — A/B paired calibration loop + bulk sweep maintenance. Required when running `/calibrate` or `/sweep`.

### Toolkit extensions (recommended)
- **emil-design-eng** — motion framework, asymmetric timing, clip-path techniques, springs, blur crossfade, momentum, damping. Integrated as first-class toolkit in R19.
- **Dammyjay93/interface-design** — project-local memory pattern. Inspiration for `.slice-design/project.md`.

### Optional
- **impeccable**, **design-motion-principles**, **frontend-design** — slice still wins on contradiction; these are audit lenses.

---

## RAG analysis — would it help?

**Question**: skill is now 7,247 lines / 59 reference files. Has it reached the point where Retrieval-Augmented Generation (RAG) would improve performance?

**Short answer**: not yet. Progressive disclosure is doing the job.

### How the skill currently works

1. **Session start**: Claude sees skill name + description (~100 tokens). Decides whether to invoke.
2. **On invocation**: SKILL.md body loads (~265 lines). The quick-reference table tells Claude which reference file to load for which task.
3. **On task**: Claude loads specific reference files (e.g. `reference_dls_screen_layouts.md` for screen recipes, `reference_motion.md` for motion choreography, `reference_dls_<component>.md` for component anatomy).

This is **manual progressive disclosure** — the routing logic lives in SKILL.md's quick-reference table.

### When RAG would help

RAG would help if:
1. The skill grew so large that even SKILL.md + 1-2 references exceed the context window (currently it does NOT — references are loaded on demand, total cached size manageable)
2. The number of calibrated rules grew so high that the quick-reference table couldn't route accurately (currently ~120 rules across well-organized references — routing works)
3. Multiple users with different domain expertise needed to query the same skill differently (currently single-user; not an issue)
4. Rule lookups happened thousands of times per session at low latency (currently 5-10 lookups per session; manual routing fine)

### When RAG would hurt

- Adds infrastructure (vector DB, embeddings, retrieval logic) — operational overhead
- Embedding-based retrieval is **fuzzier** than the current explicit routing — could surface tangentially-related rules and miss specific calibrated ones
- The current "load this specific file for this specific task" pattern is **deterministic** — Claude knows exactly which rules will apply to a `/judge` task vs a `/build` task
- RAG would obscure provenance — the audit trail (rule → calibration source) is easier to follow when references are explicit files

### Better intermediate steps (before RAG)

If the skill grows further, consider:

1. **Search index** — a single derived `reference_calibrated_digest.md` that lists every calibrated rule with a 1-line summary + ref. Already exists, just stale. Regenerate.
2. **`/search-slice-design <query>` sub-command** — uses grep across references to find rules matching a query. Fast, deterministic, no embeddings.
3. **Per-pod index files** — `reference_pod_<banking|explore|payments|credit|activity>.md` that aggregates all rules touching that pod. Cross-cuts the per-component structure for fast pod-specific lookups.
4. **Versioned rule snapshots** — for major calibration rounds, snapshot the digest. Easier to diff over time.

### Verdict

**Don't add RAG yet.** The skill is well-organized, references are appropriately sized, and the routing logic in SKILL.md works. Add RAG only if:
- The skill grows to 15,000+ lines AND
- The number of calibrated rules exceeds ~300 AND
- Manual routing in SKILL.md starts to miss the right reference for a task (signaled by Claude consistently loading the wrong file or asking for clarification on which reference applies)

Current bottleneck is NOT retrieval — it's **maintenance pace** (keeping the skill in sync with product work). The sweep method addresses that. Once sweep is the routine maintenance loop, retrieval bottleneck won't materialize.

---

## Recommendations (priority-ordered)

### P0 — do soon
1. **Re-export icon library** from DLS. Unblocks `proto` / `build` workflows in code contexts. Pipeline already documented; needs 1-2 hours with figma-console MCP running.
2. **Regenerate `reference_calibrated_digest.md`** — stale since 2026-05-21, missing R18 + R19 entries. Should be automated.
3. **Targeted Payment OS illustration sweep** — extract the 10+ missing illustrations via per-node sampling (file metadata timeouts blocked the R19 attempt). 30-min follow-up.

### P1 — do at next calibrate session
4. **Backfill WHY** on existing high-traffic Absolute bans (per user direction, only during /calibrate). Capture as you encounter each rule in normal use.
5. **Update slice-design-calibrate** to prompt for WHY on every promoted rule (task #29).

### P2 — future safety net
6. **Add 2-3 eval prompts** to `evals/evals.json` — design Atom L1, judge a Figma frame, build Payments L0 with action pills. Skip the baseline comparison loop until something breaks.
7. **Run skill-creator's description optimization loop** — only if triggering issues surface in practice.
8. **Per-pod index files** — useful as the skill grows.

### Not recommended right now
- **RAG** — overkill. See § RAG analysis. Reconsider only at 15,000+ lines.
- **Splitting slice-design into multiple skills** — current single-skill structure works. Don't fragment.
- **Migrating to a different skill format** — the current structure is skill-creator compliant.

---

## Open questions (flag for next calibrate session)

1. **2-tone product-mark title** (slice atom in black + V-500) — sanctioned exception for sub-product FTUX heroes, or 1-off? (1 frame canonical so far)
2. **User-uploadable thumbnail with edit-pencil badge** — new affordance pattern. Promote or limit to atom?
3. **Payment OS transition envelope durations** — observed structure (pink-immersion → reveal → tick) but durations are inferred. Per-frame node sampling needed.
4. **Atom project memory candidates** — multiple project-specific decisions could promote to global rules: mid-screen Primary CTA (already promoted), 2-tone title, photo-illustration in Avatar L-48, sequential ticker (already in Valentino).
5. **Heavy MUSTs softening pass** — Defaults section + older Absolute bans — opt in next calibrate?

---

## Sign-off

The slice-design skill is in its strongest state since inception. The R19 multi-file sweep proved that bulk reference-frame extraction can keep the skill in sync with active product work at the pace slice ships. The skill now reflects:
- 5 active product files (Atom, AVC, Valentino, Payment OS, Credit Card 2026)
- All DLS molecules (with R19 drift corrections)
- Emil-design-eng motion framework as a toolkit extension
- Project-local memory pattern as an optional per-project layer

The biggest open work is asset extraction (icons + remaining illustrations) — that's a mechanical task, not a design judgment. Everything else is in calibrated, audit-trailable shape.

Next sweep / calibrate session should focus on:
- The 10+ illustrations Payment OS blocked
- The icon re-export
- The 5 flagged-for-calibration items above
- Backfilling WHYs on high-traffic rules as you encounter them
