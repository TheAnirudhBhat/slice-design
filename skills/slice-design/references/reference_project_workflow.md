---
name: Project workflow — how to run a slice proto engagement
description: The operating model for working on a slice proto over many rapid feedback rounds — the extension-seam project model, deploy-by-vendoring, the agentation iteration loop, working discipline (tracked checklist, don't-guess, skill-proto read-only), and the reusable debug-view / exploration-screen framework. Read at the start of any multi-round project engagement (not a one-off screen). Complements reference_proto_systematics.md (which is "build the UI right"); this is "run the engagement right".
type: reference
---

# Project workflow — running a slice proto engagement

`reference_proto_systematics.md` tells you how to build a slice proto's UI correctly. This file tells you how to **operate a project over many feedback rounds** without churn: the project shape, how it deploys, the feedback loop, the discipline that prevents repeat breakage, and the exploration framework that makes fast variant iteration possible.

Distilled from the explore-base engagement (a Vite + React phone proto of the Explore page, deployed to Vercel, iterated over dozens of agentation feedback rounds).

---

## 1. The extension-seam project model

A slice proto project is not a fork of the whole app. It's a **seam**: it inherits the shared app shell + the base pods, and **owns exactly one surface**.

- **The skill proto (`~/.claude/skills/slice-design/proto/`)** is the source of truth for the app shell (status bar, bottom nav, app bar, page pager, phone shell) and the base pods (Banking, Payments/Valentino, Credit, Activity, Profile).
- **A project (e.g. `explore-base`)** owns ONE pod (e.g. the Explore L0) and inherits everything else. The owned pod is where all the project's design exploration happens; the inherited shell + pods should keep matching the skill so the surface stays consistent.

**Rule: a project never changes inherited chrome to fix its own pod.** If the Banking pod or the nav looks wrong in the project, the fix belongs in the skill proto (this session), not in a project-local override. Project pod-overrides live in the consuming project (materialise / unlink the owned pod), never as a prop threaded into a shared skill-proto component. (This is why a `podOverrides` prop on the skill shell was reverted — it pushed project concerns into shared code.)

---

## 2. Deploying a seam project — VENDOR, never symlink

A seam project is tempting to wire with **symlinks** back to the skill proto (so the shell + base pods stay live-linked). This works locally and **breaks every CI/host build** (Vercel, Netlify): the symlink targets are absolute paths on your machine that don't exist on the build server → `Could not resolve './index.css'` (or AppBase, tokens, a base pod, etc.).

**Rule: to deploy a seam project, VENDOR the seam — replace symlinks with real copies.**

1. Copy real files for everything inherited: `index.css`, the shell (`AppBase.jsx` / `App.jsx`), `theme-context.js`, `tokens.js`, `components/`, `icons/`, `utils/`, and the base pods — keeping the project's own owned pod.
2. Simplify `vite.config.js`: drop any skill-proto path resolver / alias. Keep `plugins:[react()]`, `resolve:{dedupe:['react','react-dom','framer-motion']}`, and the dev `server.port`.
3. The cost: the vendored copies now drift from the skill. Re-vendor when the skill shell materially changes. Document the trade-off in the project's README.

(Local dev can still use a live link for fast iteration; just make sure what gets committed + deployed is vendored.)

---

## 3. The iteration loop (agentation feedback → push)

The engagement runs as a tight loop. The user drives it from the running proto.

1. **User submits agentation page-feedback** — a structured payload: the element's DOM path, the **source file + line**, the React component stack, and a freeform instruction ("make it black", "remove this divider"). agentation is the click-to-annotate layer; it's a baseline dependency in every slice proto (`<Agentation/>` sibling of `<App/>`, desktop-only).
2. **Fix project-side only.** Read the cited file around the cited line *plus* the related component before editing — agentation line numbers are often off by ±10–20 (they point near, not at, the node). Confirm you're editing the right element.
3. **Build to verify** (`npm run build`) before every push. This catches compile errors that don't show in dev (e.g. a JSX `{/* */}` comment placed in a ternary branch where only `/* */` is valid).
4. **Commit** with a short message focused on *why*.
5. **Push** to the project's remote. The user re-tests on **both** local (`:PORT`, HMR) and the deployed URL (Vercel).
6. **Cadence:** push after each batch of related fixes, not after every single edit. When the user says "/push" or "go", that's the signal to run the whole loop.

---

## 4. Working discipline (hard-won, prevents repeat breakage)

These are the rules that, when skipped, caused the most rework in the engagement.

- **Keep a tracked task checklist; show it on request.** The user prioritizes from it. Every piece of feedback becomes a tracked item with a stable ID so "show me the checklist, let me prioritise" works instantly.
- **Don't guess on subtle visual items.** When you cannot reproduce or locate a visual bug from static reading (e.g. "X vanishes on mobile"), do **not** guess a fix and push — guessing repeatedly broke the bottom nav and burned trust. Instead ask **one crisp diagnostic question** with a one-word / single-choice answer ("blank vs thin sliver vs pushed-off-screen?") that localizes it. A 10-second question beats a wrong push.
- **The skill proto is read-only from project work.** Never modify the skill proto (shell / components / pods / tokens / assets) as a side-effect of project work, a linter, or "while I'm here". Only edit it when the user *explicitly* asks (as in "backport the general fixes to the skill proto"). See §6.
- **Don't over-interpret feedback.** "Match V0" means align the *specific* thing pointed at, not revert the whole component to V0's content. Make the minimal change the instruction asks for; confirm before a sweeping rewrite.
- **Respect concurrency by ownership.** When multiple sessions work the same surfaces, split by ownership — e.g. one session owns the skill, another owns the project. Treat the other session's repo as **read-only**: you may read it to extract a fix, never write to it. Watch for ambient "file was modified" notices that reveal the other session's in-flight edits, and don't fight them.
- **React 17 event delegation gotcha.** React 17 delegates events at the root, so calling native `stopPropagation()` on a child kills that child's *own* React handlers (this broke a draggable card deck). Don't add native pointer listeners to arbitrate gestures — use `touch-action` (`pan-y` on scrollers that should yield horizontal swipes to the pager; `none` on draggable decks).
- **Environment quirks:**
  - npm cache EPERM (root-owned `~/.npm`): always pass `--cache "$TMPDIR/npm-cache-<name>"`.
  - cwd slips: prefix `cd <project-abs-path> &&` on npm/git, or commands run from the wrong directory and ENOENT.

---

## 5. The debug-view / exploration-screen framework (reusable)

The most reusable artifact from the engagement is **not** any single screen — it's the **exploration framework** that let the user try dozens of compositions live and annotate them. It's independent of any one pod and worth standing up for any new surface exploration.

**Architecture:**

- **Section-variant system.** The screen is decomposed into regions (For You, Bills, Rewards, Stats, More, …). Each region has many lettered variants (`FY_A…FY_T`, `BL_A…BL_W`, …). A single `sections` state object maps each region → its active variant letter. A `RegionSection` switch renders the chosen variant. Archived variants are kept in an `archived` map so nothing is lost but the picker stays tidy.
- **Named presets.** `PRESETS` (V0, V1, V2, …) are full-screen compositions — each is a `{ headerStyle, sections }` snapshot. The proto boots from one preset (`useState(PRESETS.V1.sections)` = the default the user sees first). A seg-picker switches presets; `matchesPreset()` / `activePreset` highlight which preset the live layout currently equals.
- **Collapsible debug drawer.** Desktop = right-docked panel; mobile = dark bottom-sheet above the nav. It exposes the per-region variant pickers, header-style toggle, and layout toggles (including a dark-mode toggle). It's opened via a dispatched `window` CustomEvent (`open-debug-drawer`) so the trigger doesn't have to thread a prop through every parent.
- **agentation overlay** for click-to-annotate feedback on top of all of it.

Together this is a **fast design-exploration surface**: switch variants/presets live, flip dark mode, annotate inline, iterate. Reuse the pattern whenever a brief is "explore N directions for surface X" rather than "build the one known design".

**Invocation is opt-in / project-gated.** The debug panel is the proto's *optional second view* — both the clean app view and the debug view exist, but the debug view is **only invoked when building on a project**, never in the standalone skill proto's default view (so the proto always reads as a real app). The skill proto ships the framework as `proto/src/components/DebugPanel.jsx` + an `App({ debug, debugContent })` prop:
- **Standalone skill proto** → `<App />` (debug off) = clean app view only. The skill author can peek it with the `?debug` URL param.
- **A derived project** → its wrapper passes `<App debug debugContent={<ProjectExplorationControls/>} />`. The `debugContent` slot is where the project injects its section-variant / preset pickers. The panel's built-in controls (theme · pod-jump · device) come for free.
- Desktop: a column BESIDE the phone (AI Banker's layout, cal:2026-10-06) — `DEBUG_PANEL_WIDTH` 300, `DEBUG_PANEL_GAP` 40, the phone's on-screen height; phone + panel centre together as one row and `useFitScale` reserves the panel's width (was: right-docked to the page edge with the phone pushed left). Opened via a `d` key / corner toggle, both gated behind `debug`.

---

## 6. General vs project-specific craft learnings

When fixes accumulate during an engagement, sort them: **general** (shell / shared-component / cross-cutting → candidates to backport to the skill proto) vs **project-specific** (tied to the owned pod's particular construction → stay in the project). Backport only the clearly-general, clearly-beneficial ones, and only when explicitly asked.

| Learning | Scope | Disposition |
|---|---|---|
| **Pager momentum** — project release position by throw velocity (`x + velocity*0.18`), snap to nearest (clamp ±1 page), settle with a velocity-aware spring. Makes a flick carry; a slow drag settles in place. | General (shared `Pager`) | **Backported to skill proto.** |
| agentation hidden on mobile/PWA (desktop design-review tool overlaps phone UI) | General | Already in skill proto (`MaybeAgentation`). |
| **Bleed-hero app bar on mobile** — when a hero bleeds under the status reserve, the pod is pulled up a fixed amount (e.g. `-54px`). The absolute app bar must add that exact amount back as `padding-top` (`54px`), NOT `env(safe-area-inset-top)` — safe-area is **0 in a normal mobile browser**, so the title renders behind the opaque reserve and vanishes. `54px` is correct for both browser (reserve=54, pod-top=0 → title@54) and PWA (reserve=safe-area, pod-top=safe-area−54 → title@safe-area). | General *pattern*; project *impl* (only the owned pod bleeds) | Documented here; impl stays project-side. |
| Status reserve: transparent-at-rest + opacify-on-scroll (coupled with the app bar) works when the page bg behind it is opaque. A project whose app bar is absolute/bleeding may need an **always-opaque** reserve to kill a see-through sliver. | Project-specific (bleed-induced) | Stays in project. Skill proto keeps scroll-coupled reserve. |
| No gray surfaces — any apparent gray is a card shadow on white; never add a slate page bg. Bleed heroes fade to the **page bg token** (white light / near-black dark), not a hardcoded white band (which reads as a bright slab in dark mode). | General (HARD brand rule) | Already a skill rule; reinforced. |
| App-bar title color flips by hero darkness via a `darkBg` set; a white-fading mesh hero is a LIGHT hero → keep the title dark. Adding a light hero to `darkBg` makes the title white-on-white (invisible). | General pattern | Documented. |

**Promotion path:** a project learning that proves general across surfaces → raise it at the next calibrate/sweep, then move it into the relevant reference + log it. Until then it lives in the project, not the global skill.
