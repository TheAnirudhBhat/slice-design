# Compression audit — kill / merge / shrink list

**Goal**: cut the skill from 71 files / 11,639 lines → ~45 files / ~7,000 lines (40% reduction) **without losing knowledge**. Most cuts are merges, not deletions.

**Status**: AUDIT — no files have been touched yet. Awaiting sign-off before execution.

---

## TL;DR

| Category | Action | Files affected | Line delta |
|---|---|---|---|
| Feedback files | KILL (fold into rule files OR delete as resolved) | 6 | −81 |
| Stale meta | KILL outright | 2 | −261 |
| God-view triple-coverage | MERGE 3 → 1 | 3 → 1 | −500 to −700 (depending on consolidation depth) |
| Proto-patterns duplication | MERGE 2 → 1 | 2 → 1 | −150 |
| Anti-patterns standalone | CO-LOCATE into rule files; reduce to thin index | 1 (shrink ~80%) | −400 |
| Screen-layouts mega-file | SHRINK as proto pages absorb recipes | 1 (shrink ~70%) | −750 |
| Pod aggregators | SHRINK as proto pages absorb recipes | 7 (shrink ~50% each) | −1,250 |
| Misc patterns | DISTRIBUTE into per-pattern files | 1 | −198 |
| **Total estimate** | | **22 files net** | **−3,600 to −4,000 lines** |

After: ~49 files, ~7,500-8,000 lines. Within striking distance of the 40% target.

---

## Kill outright

### Feedback files (6 files, 81 lines) — DELETE

These are session-level user direction notes from R11-R14. They've all been folded into rule files. Standalone existence creates triple-coverage and stale signal.

| File | Status | Action |
|---|---|---|
| `feedback_assets.md` (10L) | Resolved — content in `reference_dls_illustrations.md` + `reference_dls_iconography.md` | DELETE |
| `feedback_design_mode.md` (18L) | Resolved — content in `reference_exploration_patterns.md` | DELETE |
| `feedback_dls_design.md` (10L) | Resolved — content in `reference_pod_cross_cutting.md` | DELETE |
| `feedback_figma_first.md` (14L) | Resolved — content in `SKILL.md` + `reference_figma_build.md` | DELETE |
| `feedback_reuse_existing.md` (16L) | Resolved — content in `reference_pod_cross_cutting.md` | DELETE |
| `feedback_transitions.md` (13L) | Resolved — content in `reference_motion.md` | DELETE |

### Stale meta (2 files, 261 lines) — DELETE / REPLACE

| File | Why kill | Action |
|---|---|---|
| `reference_calibrated_digest.md` (214L) | Quarterly digest from R15 that's never been updated. Per-pod aggregators superseded it in R21. | DELETE |
| `INDEX.md` (47L) | Manual file index; goes stale instantly. SKILL.md routing table replaces it. | DELETE |

---

## Merge

### God-view 3 → 1 (1,097 lines → ~500 lines)

`reference_flows.md` (515L) + `reference_entry_points.md` (323L) + `reference_slice_product_model.md` (259L) all describe the same product from different angles (flows, entry points, mental model). Triple coverage. Merge into:

**`reference_god_view.md`** — single doc structured as:
1. Product mental model (what slice ships, who for, brand voice)
2. The 5 pods + their relationships
3. End-to-end flows (Pay UPI, FD purchase, Atom setup, etc.) — pointer to proto pages for each surface
4. Entry-point map (where each feature is reachable from)

Cut ~600 lines by killing the cross-references and duplicate descriptions across the 3 files.

### Proto patterns 2 → 1 (428 lines → ~280 lines)

`reference_explore_proto_patterns.md` (210L) + `reference_web_proto.md` (218L) overlap heavily on "how to build a web proto of slice." Merge into:

**`reference_proto_patterns.md`** — single doc structured as:
1. Setup (Vite + React + Tailwind stack, DLS token CSS variables)
2. Page chrome (phone-frame container, status bar, gesture nav)
3. Screen-level patterns (L0 layout, L1 layout, modal/sheet)
4. State management (active pod, mock data, navigation)
5. Asset loading (icons, illustrations, photos)

Cut ~150 lines via dedup.

---

## Co-locate

### Anti-patterns standalone → distribute (473 lines → ~80 lines, ~85% reduction)

`reference_anti_patterns.md` currently holds 473 lines of "don't do X" rules separated from the "do Y" rules that own them.

Move each entry to its owning file:
- "No orange for streak" → `reference_dls_colors.md` (where V-500 is described)
- "No emoji in shipped UI" → `reference_dls_iconography.md`
- "Capital S 'Slice' is wrong" → `reference_pod_cross_cutting.md` (brand voice)
- "No bottom nav on Profile overlay" → `reference_dls_bottom_nav.md`
- ...etc.

Result: every recipe gets its anti-pattern next to it. Reader gets full picture in one read.

Keep `reference_anti_patterns.md` as a thin (~80L) **index** that lists all anti-patterns with one-line description + pointer to the owning file. Function: discoverability.

### Misc patterns 1 → distribute (198 lines → 0)

`reference_dls_misc_patterns.md` is a junk drawer. Distribute each pattern to its proper file based on the pattern's type. Delete the file.

---

## Shrink (as proto absorbs content)

### Screen layouts mega-file → pointer file (1,063 lines → ~300 lines)

`reference_dls_screen_layouts.md` currently holds every L0/L1/L2 recipe in text. As proto pages get built for each, the recipe moves to the proto. The markdown file shrinks to:
- Cross-cutting layout rules (header height, content max-width, bottom nav clearance)
- Recipe index — table of "this surface → proto path"
- The L0/L1/L2 anatomy diagrams (these stay textual; they're invariants)

Target: 300 lines once proto coverage reaches ~30 pages.

### Pod aggregators → pointer files (2,557 lines → ~1,300 lines, ~50% reduction each)

The 7 `reference_pod_*.md` files (`banking`, `payments`, `credit`, `explore`, `activity`, `bills`, `cross_cutting`) hold concrete recipes. As proto pages absorb the recipes, each pod file shrinks to:
- Pod identity (what's in it, who it serves)
- Sub-product map (e.g. Banking → Savings, FD, Atom, monies)
- Recipe index — table of "screen → proto path"
- Pod-specific hard rules (the ones unique to this pod)
- Cross-pod handoff notes
- Anti-patterns specific to this pod (per Co-locate above)

`reference_pod_cross_cutting.md` stays larger — it's the hard-rules file, which we explicitly want to preserve.

---

## Keep as-is (untouched by this audit)

- All `reference_dls_<molecule>.md` (component primitives — 30 files)
- `reference_motion.md`, `reference_accessibility.md`, `reference_performance.md`
- `reference_craft_principles.md`, `reference_exploration_patterns.md`, `reference_project_memory.md`
- `reference_calibration_log.md` (consider quarterly rollup at some future round)
- `reference_figma_build.md` (how to write Figma plugin code)
- `evals/evals.json`
- `docs/quality-baseline-R22.md`

---

## Execution order

When you sign off, execute in this order to minimize risk:

1. **Phase 1 (low risk, high signal)** — Delete the 6 feedback files + 2 stale meta files. 8 files gone, knowledge intact (already in rule files).
2. **Phase 2** — Merge god-view 3 → 1. New `reference_god_view.md` written; old 3 deleted after content sweep.
3. **Phase 3** — Merge proto patterns 2 → 1. Same approach.
4. **Phase 4** — Co-locate anti-patterns. Each entry moves; standalone file shrinks to index.
5. **Phase 5** — Distribute misc patterns. Delete the junk drawer.
6. **Phase 6** — Begin proto absorption (ongoing across R23+ rounds). Pod files + screen layouts shrink as proto coverage grows.

Each phase concludes with: rerun the eval battery. If score drops, rollback the phase.

---

## Risks

- **Deleting a file deletes its calibration history.** Mitigation: every delete entry goes into the calibration log with what was killed and where the content moved.
- **Pod files getting too thin too fast.** Mitigation: Phase 6 is gradual, ties to proto coverage.
- **Cross-references breaking.** Mitigation: after each phase, grep for the deleted filename across all remaining files; fix references.

---

Last updated: 2026-05-29 (R23 kickoff)
