# slice-app-proto snapshot @ R24 cont-23 (2026-05-29)

A point-in-time snapshot of the working `slice-app-proto` after R23's 22 fix-it rounds and R24's L1 + canonical-fetch pass. Designed so anyone (future me, future agent, future PD) can grab a component / asset / pattern from here and have it work without re-discovering the calibrations.

**What's new in R24**: Profile L1 + Transaction Detail L1 screens with full routing scaffold (`L1Stack`), iPhone 16 Pro phone size (393×852), white-on-scroll AppBar+status reserve, drag-vs-click discrimination on Activity rows, canonical avatars (44×44 visual / 48×48 hit) with no ring, halo-pattern StateBadge, and the canonical-fetch-first principle (see `reference_calibration_log.md` § R24 cont-2…23 § A).

## What's here

```
proto-snapshot/
  ├── README.md          (this file)
  ├── INDEX.md           (human catalog — component → file mapping)
  ├── code/              (proto source code, JSX + CSS + scaffold)
  ├── assets/            (PNG + SVG canonical assets, from Figma)
  └── manifests/         (machine-readable JSON: components.json, assets.json)
```

## How to use this

### Scenario A — recreate one pod / component in another proto
1. Open `INDEX.md`, find the component you want (e.g. `BottomNav`).
2. Copy the listed files from `code/` into your project (adjust paths).
3. Copy the dependent assets from `assets/`.
4. Adjust import paths to your project layout.
5. Read the relevant calibration log entries (linked in the INDEX) to understand WHY each line is there.

### Scenario B — scaffold a brand-new slice proto
1. Copy the full `code/` tree as your starting `src/`.
2. Copy `assets/` to your `public/assets/`.
3. Install deps from `code/package.json` (`npm install`).
4. Run `npm run dev` — proto should boot to the working R23 state.
5. Add new pods / surfaces on top.

### Scenario C — borrow a single asset
1. Open `manifests/assets.json` (or `INDEX.md` § Assets).
2. Find the asset by purpose (e.g. "monies brand mark", "FD card corner illustration").
3. Copy from `assets/<category>/<file>`.
4. The manifest entry tells you the Figma node ID + canonical file in case you need to re-fetch.

## Origin

- Live proto: `/Users/anirudhbhat/claude/slice/projects/slice-app-proto/`
- Snapshot date: 2026-05-29 (after R23 fix-it-2 cont-22)
- Canonical Figma file: `PNUz3Dr9KSlFJSnsXsC0nL` (working copy) / `ncGqxiE6wUOqgOURwHx6Hp` (published DLS 2.0)
- Calibration history: see `../reference_calibration_log.md` for the round-by-round audit trail of how each rule was discovered.
- Meta-rules (do BEFORE building): `../reference_proto_systematics.md` — distilled "permanent rules" from the 22 fix-it rounds.

## Refresh policy

Re-snapshot the proto into this folder when:
- A new calibration round (R24+) lands and the user calls the proto "in a decent state".
- A new pod/feature ships with substantial new components.
- Asset library grows by 10+ items.
- A new cross-cutting rule lands that requires a code-level reference.

To re-snapshot, run the same commands documented in `../../INTEGRATION_PLAN.md` (the plan that produced this snapshot).

## Don't

- Don't edit files in here in isolation — they're a snapshot, not the live source. Edit the live proto, then re-snapshot.
- Don't depend on the assets being identical to Figma if Figma's been updated since 2026-05-29. The manifests list the original Figma node IDs so you can re-fetch.
- Don't skip reading `reference_proto_systematics.md` before using this. The snapshot is the WHAT; the systematics file is the WHY. Without the WHY, you'll re-introduce the failure modes the 22 rounds eliminated.
