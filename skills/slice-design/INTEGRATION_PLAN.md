# slice-design proto integration plan (R23 → skill)

**Date drafted:** 2026-05-29
**Trigger:** user direction — "I think this proto is in a decent stage now, take learnings, incorporate this proto and all the assets used into the slice design skill, keep assets and code as well, if someone requires to recreate some part it will be faster, make a plan".

## Goal

Snapshot the R23-done state of `slice-app-proto` into the `slice-design` skill so that:
1. The skill is self-contained — no dependency on the live proto repo for recreating parts.
2. Anyone (future me, future agent, future PD) can grab a component / asset / pattern from the skill and have it work.
3. The 7+ rounds of fix-its are baked into the snapshot, not re-discovered.

The skill becomes the SHIP-READY library; the proto becomes the latest exploration substrate.

## Proposed layout

```
~/.claude/skills/slice-design/
  ├── SKILL.md
  ├── INTEGRATION_PLAN.md              (this file)
  ├── OPEN_ITEMS.md
  ├── references/
  │   ├── reference_proto_systematics.md   (the up-front meta-rules — already exists)
  │   ├── reference_calibration_log.md     (round-by-round trail — already exists)
  │   ├── ...other reference_*.md
  │   └── proto-snapshot/                  ← NEW directory
  │       ├── README.md                    (entry point — what's in here, how to use)
  │       ├── INDEX.md                     (component catalog — name → file mapping)
  │       ├── code/
  │       │   ├── App.jsx
  │       │   ├── main.jsx
  │       │   ├── index.css
  │       │   ├── package.json             (dependencies snapshot)
  │       │   ├── vite.config.js
  │       │   ├── tailwind.config.js
  │       │   ├── postcss.config.js
  │       │   ├── index.html
  │       │   ├── components/
  │       │   │   ├── AppBar.jsx
  │       │   │   ├── BottomNav.jsx
  │       │   │   ├── BottomNav.css
  │       │   │   ├── BottomFade.jsx
  │       │   │   ├── Pager.jsx
  │       │   │   ├── StatusBar.jsx
  │       │   │   └── NavIcons.jsx
  │       │   └── pods/
  │       │       ├── banking/L0.jsx
  │       │       ├── explore/L0.jsx
  │       │       ├── credit/L0.jsx
  │       │       ├── activity/L0.jsx
  │       │       └── payments/L0_valentinoHome.jsx
  │       ├── assets/
  │       │   ├── icons/                   (DLS line icons — eye open/closed, search, filter, etc.)
  │       │   ├── illustrations/           (FD mascot, monies cluster, etc.)
  │       │   ├── brand/                   (avatar, BHIM UPI, monies mark)
  │       │   └── nav/                     (active/inactive nav SVGs)
  │       └── manifests/
  │           ├── components.json          (machine-readable index)
  │           └── assets.json              (asset → Figma node ID map)
```

## Execution phases

### Phase 1 — Create the directory + README + INDEX
- `mkdir -p references/proto-snapshot/{code/{components,pods/{banking,explore,credit,activity,payments}},assets/{icons,illustrations,brand,nav},manifests}`
- Write `proto-snapshot/README.md` explaining what's in here and how to use it (copy a file out, drop it in a new proto, adjust imports).
- Write `proto-snapshot/INDEX.md` — a human-readable catalog with one section per component:
  - Component name
  - Source path in proto
  - Snapshot path in skill
  - What it does (1-2 sentences)
  - Dependencies (other components/assets it requires)

### Phase 2 — Snapshot the code
- Copy each file from `slice-app-proto/src/...` to `proto-snapshot/code/...`
- Add a header comment to each copied file: `// SNAPSHOT from slice-app-proto @ R23 cont-16 (2026-05-29). See INDEX.md for the catalog.`
- Copy `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `index.css` — the full scaffold.
- Don't copy `node_modules/`, `dist/`, build artifacts.

### Phase 3 — Snapshot the assets
- Copy `slice-app-proto/public/assets/*` to `proto-snapshot/assets/`
- Organize by type: icons / illustrations / brand / nav. Move files into the right subfolders.
- Update relative paths in the snapshotted JSX to point to the new asset locations (`/assets/icons/...` instead of `/assets/...`).

### Phase 4 — Manifests
- `manifests/components.json` — machine-readable index:
  ```json
  {
    "components": [
      {
        "name": "BottomNav",
        "kind": "chrome",
        "file": "code/components/BottomNav.jsx",
        "css": "code/components/BottomNav.css",
        "props": ["active", "visuallyActive", "onChange", "onVisualChange", "balance", "pagerX", "pages"],
        "depends_on": ["NavIcons.jsx", "framer-motion"],
        "calibration_rounds": ["A1", "FX21", "FX30", "FX39", "FX53"]
      },
      ...
    ]
  }
  ```
- `manifests/assets.json` — asset → Figma node ID map:
  ```json
  {
    "assets": [
      {
        "file": "assets/icons/slice_eye_open.png",
        "figma_node": "586:138",
        "figma_file": "PNUz3Dr9KSlFJSnsXsC0nL",
        "size_px": "24x24",
        "format": "PNG RGBA",
        "used_in": ["AppBar.jsx (Banking eye toggle)"]
      },
      ...
    ]
  }
  ```

### Phase 5 — SKILL.md pointer
- Add a top-level section in SKILL.md: "Proto snapshot — recreate parts fast"
- Pointer to `references/proto-snapshot/` with a 1-paragraph description and a "copy a file out → drop in your project → adjust imports" workflow.
- Cross-reference from `reference_proto_systematics.md` (the existing meta-rules file) — that file describes the patterns; the snapshot is the implementation.

### Phase 6 — Smoke test
- Pretend to recreate one pod from scratch using only the skill files.
- Walk through:
  1. Read `reference_proto_systematics.md` (meta-rules).
  2. Open `proto-snapshot/INDEX.md` (catalog).
  3. Copy `proto-snapshot/code/pods/banking/L0.jsx`.
  4. Copy needed components (AppBar, BottomFade) and assets.
  5. Adjust imports if dropping into a different proto.
- Confirm everything needed is there. Fix any gaps.

## What this DOESN'T do

- Doesn't keep `slice-app-proto` and skill in lockstep continuously. The snapshot is point-in-time; new rounds happen on the live proto first, then get snapshotted into the skill at meaningful checkpoints (e.g. once R24 calibration completes).
- Doesn't replace `reference_proto_systematics.md` (meta-rules) — that's the WHY. The snapshot is the WHAT (the actual code/assets).
- Doesn't replace `reference_calibration_log.md` — that's the audit trail.

## Trigger to re-snapshot

Snapshot the proto into the skill again whenever:
1. A new calibration round (R24, R25, ...) lands and the user calls it "decent" — like now.
2. A new pod/feature ships with substantial new components.
3. Asset library grows significantly (10+ new icons/illustrations).
4. The cross-cutting craft checklist in `SKILL.md` gets a new rule that requires code-level reference.

## Execution order

Execute phases 1 → 6 sequentially. Phases 1–3 are file-shovels; phase 4 is JSON authoring; phase 5 is documentation; phase 6 is verification.

**Estimated time**: 30-45 minutes for full execution if done in one pass.

---

Plan author: Claude (R23 cont-16, 2026-05-29). After approval / on-the-go, this plan executes immediately.
