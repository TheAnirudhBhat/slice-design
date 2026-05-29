---
name: Project memory — per-project layer for slice-design
description: Template + usage rules for .slice-design/project.md. Read when starting work on a specific slice project, or when proposing project-specific deviations from the default recipe.
type: reference
---

The global slice-design skill captures patterns that apply to **all slice work**. Per-project decisions (a specific proto's exploration choices, project-scope deviations from default recipes, in-flight calibration that hasn't been promoted globally) belong in a project-local memory file: `.slice-design/project.md` at the project root.

## Precedence

When project memory exists, it loads after this SKILL.md and before any reference files. The precedence stack:

1. Calibrated overrides (`reference_calibration_log.md` + per-file calibrated notes) — global, always win
2. **Project memory** (`.slice-design/project.md`) — extends global rules within this project's context
3. Base rules in SKILL.md + references — global defaults
4. Other design skills (impeccable, emil-design-eng, frontend-design) — toolkit extensions

Project memory **extends** global rules. It **never overrides HARD rules** (brand voice, palette, anti-patterns). Where project memory conflicts with a soft global rule, project memory wins within that project.

## Template structure

```markdown
# slice-design project memory — <project name>

## Project Direction
<1-2 sentence framing of the project's design intent. E.g. "Atom proto — goal-based savings sub-product. 3D illustration brand, lighter motion vocabulary, mid-screen CTAs on overlay-style screens.">

## Established Patterns
<Patterns this project uses that aren't the global default, with brief reasoning.>

- **Atom L1 mid-screen Primary CTA** — uses the third valid CTA-anchoring pattern (Atom returning-user L1 frame `8534:23336`). Why: hero shows actionable summary data + Primary acts on that data.
- **3D illustration hero (~200px)** instead of flat spot illustrations on FTUX. Why: project brand uses Spline 3D for atom mascot — flat illustrations would feel inconsistent.
- **Tertiary Small slate-10 pills** for secondary actions inside cards instead of Primary. Why: Banking L0 already has the Savings hero as the primary action; Atom entry shouldn't compete.

## Exploration Decisions
<Departures from default recipe, with frame reference + reasoning. Useful for future audits — explains why something deviates.>

- **2-tone "slice atom" title** (black `slice` + V-500 `atom`) on FTUX hero — flagged for global calibration. Until promoted, treat as project-canonical.
- **Custom thumbnail-with-edit-pencil affordance** for "name your atom" screen — user-uploadable image pattern not yet in global skill. Flagged.

## In-Flight Calibration
<Things we've decided in-project that we'll bring up at the next global calibrate session.>

- Atom 2-tone title — promote or limit to sub-product FTUX hero?
- Mid-screen Primary CTA — already in R19 as a third valid pattern, but want to confirm doesn't conflict with Banking pod conventions.
- Atom uses sequential ticker on count animations (matches Valentino action pill rule) — confirm this carries across all slice number-ticker contexts, not just Payments L0.

## Surface-specific overrides

<If a specific screen / component in this project diverges from the global recipe, document the override here. Include the canonical reference for what the project does + global recipe it diverges from.>

### Atom Banking L0 entry card
- Global default: L0 Medium card with Primary CTA below (Banking L0 recipe)
- Project override: Tertiary Small `Let's go` pill with green-fill `+ Live` status pill top-right
- Why: entry-point promotion, not feature CTA. Primary lives on the Atom L1 (Create atom).
- Reference frame: `9442:24842`
```

## When to use project memory

**Create `.slice-design/project.md` when:**
- The project introduces patterns that aren't in the global skill yet (likely candidates for future promotion)
- The project intentionally deviates from a default recipe and that deviation should persist across sessions
- Multiple sessions of work on the same proto are accumulating decisions that should be captured somewhere

**Don't create project memory for:**
- One-off design choices that won't recur
- Decisions that are actually global (those go through the calibrate / sweep loop instead)
- Quick experiments that haven't earned a memory entry yet

## When to read project memory

At the start of any session involving a slice project that has `.slice-design/project.md`:
1. Read the project memory file after this SKILL.md
2. Honor its overrides within the project
3. Don't apply its patterns globally — they're project-scope until promoted

## How project memory feeds back to global

When a project memory entry has been stable across multiple sessions and feels generally applicable:
1. Bring it up at the next `/calibrate` or `/sweep` session
2. If the user confirms, promote to global (add to `reference_dls_screen_layouts.md` or relevant ref + log in `reference_calibration_log.md`)
3. Remove from project memory once promoted (it's now in the global default)

Otherwise, leave it in project memory. Not every project decision needs to be a global rule.

## `/status` command

When the user runs `/status` on a project with `.slice-design/project.md`:
1. Show project direction (top line of the memory file)
2. List established patterns (count + names)
3. List in-flight calibration candidates (count + names)
4. Note last update date

Output example:
```
slice-design project memory — Atom proto
Direction: Goal-based savings sub-product. 3D illustration brand, lighter motion vocabulary.
Established patterns: 3 (mid-screen CTA, 3D illustration hero, Tertiary slate-10 pills)
In-flight for next calibration: 2 (2-tone title, custom thumbnail-with-edit-pencil)
Surface overrides: 1 (Atom Banking L0 entry card)
Last updated: 2026-05-28
```
