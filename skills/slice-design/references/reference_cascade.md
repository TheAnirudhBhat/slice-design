# reference_cascade — propagate a confirmed change through the skill pipeline (`cascade` sub-command)

Added 2026-06-10 (adapted from the aibanker-design `cascade` skill). Exists to
kill the documented failure mode: a calibrated value changes in ONE place and
its other homes go stale — the 2026-05-30 dark-mode build burned ~10 rounds on
a stale reference row, and the SKILL.md precedence note warns "stale log rows
have been re-applied as current before". Cascade makes the blast radius
explicit and walks it every time.

## The pipeline (walk FORWARD only, never backward)

```
calibration decision / user-confirmed change
  → topical reference_*.md          (the live spec — update FIRST)
  → reference_calibrated_digest.md  (quick-scan index row)
  → reference_calibration_log.md    (append entry; mark old entry superseded-by)
  → proto code (proto/src/…)        (the built canonical)
  → seam projects                   (linked kit = free; VENDORED deploys = re-vendor)
```

| Change at | Cascade reaches |
|---|---|
| Token (colour/var) | `index.css` + `tokens.js`, every topical ref citing the value, digest row, proto call sites, vendored projects |
| Component spec (e.g. avatar tone, app-bar anatomy) | `reference_dls_<component>.md`, pod aggregator(s) mentioning it, digest, the component in `proto/src/components/`, every pod using it |
| Screen recipe | pod aggregator + `reference_dls_screen_layouts.md`, digest, the pod L0/L1 in proto, flows refs if the journey changes |
| Motion | `reference_motion.md`, `reference_interaction_layer.md`, digest, any proto choreography implementing it |
| Brand voice / copy rule | SKILL.md defaults/bans (if HARD), `reference_pod_cross_cutting.md`, digest, every proto string instance |
| Anti-pattern (new ban) | `reference_anti_patterns.md`, SKILL.md Absolute bans (if promoted to HARD), digest, sweep proto for instances |

## Procedure

1. **Identify the change.** The most recently confirmed decision in
   conversation (cascade is invoked right after an approval) or the explicit
   subject (`cascade button radius`). Ambiguous → stop and ask which change is
   being cascaded, before touching anything.
2. **Classify the layer** from the table above.
3. **Show the blast radius and WAIT.** List every file to be touched, grouped
   by layer, one line each on what changes. End with "Proceed, or scope down?"
   `--dry-run` = stop here.
4. **Update the topical reference FIRST** (it's the live spec — precedence
   rule 1), then digest, then log (append new entry + mark the superseded one
   "superseded by R<n>" — never leave two live values for one fact).
5. **Cascade to code**: proto, then seam projects. Use
   Edit/grep — never rewrite whole files. Honor every standing rule at each
   edit site (tokens only, reuse-never-recreate, lowercase brand names,
   sentence case, Indian grouping).
6. **Verify trio** — all three, in order, no skipping:
   1. `npm run build` in the proto (and any touched project) — must pass.
   2. `node scripts/lint.mjs` — 0 errors on touched files
      (+ `--refs` if references changed).
   3. Screenshot affected proto screens against the canonical (skip only if
      the user has said not to drive a browser; say so in the report).
7. **Report** grouped by layer, with the verification results, and flag
   anything that couldn't be auto-resolved.

## What NOT to cascade

- Work-in-progress edits nobody confirmed.
- HARD-rule changes — those are calibration decisions; route through
  `slice-design-calibrate` with a log entry, then cascade.
- The skill proto from INSIDE project work (read-only rule). A project-local
  decision cascades within the project; promotion to the skill is a separate,
  deliberate maintenance pass.
- Anything whose topical reference doesn't exist yet — write the reference
  first (canonical-first), then cascade from it.

## Invocation shapes

- `cascade` — last confirmed change in conversation
- `cascade <thing>` — explicit subject
- `cascade --dry-run` — blast radius only, no writes
