# reference_lint — mechanical DLS compliance sweep (`lint` sub-command)

Added 2026-06-10 (inspired by the aibanker-design `design-lint` skill; fixed its
one structural flaw — a hardcoded token map that silently goes stale — by
generating the map from `proto/src/index.css` + `proto/src/tokens.js` at runtime).

## What it is

`scripts/lint.mjs` is the **deterministic floor** under `judge`/`audit`. Model
judgment is spent on composition, recipe fit, and the slop test; the mechanical
class of violations (raw values, brand-voice strings, INR formatting) is caught
by script, every time, with no "did the model happen to look at that line" risk.

```bash
node scripts/lint.mjs                 # sweep proto/src (default)
node scripts/lint.mjs <project>/src   # sweep a seam project
node scripts/lint.mjs --refs         # reference-integrity mode
node scripts/lint.mjs --json         # machine-readable
```

Exit 1 on any `error`-severity finding. **Report-only — it never writes.**

## Mechanical vs judgment — the doctrine

Every calibrated rule falls in one of two classes:

- **Mechanical (lintable)** — detectable by regex/AST with near-zero false
  positives. Examples: raw hex/rgba with an exact token match, capital "Slice",
  emoji in source, `+₹` on credits, `↑ +` double trend markers, western
  grouping (`₹100,000`), `₹ ` with a space, non-Rubik `fontFamily`, weights
  other than 400/500. The script owns these.
- **Judgment** — needs surface/flow context. Examples: recipe mismatches,
  section-header-after-app-bar, tabs-as-navigation, centred body text on cards,
  illustration style mismatch, slop test. `judge`/`audit` own these.

**`judge` and `audit` MUST run the lint script first** (when the target is code
— a proto or seam project; Figma frames have no code to lint), then do judgment
on top. Lint findings are reported as **(hard)** rows with `lint:<category>` as
the citation. Don't re-derive mechanically what the script already proved.

## Checks (code mode)

| Category | Severity | What |
|---|---|---|
| `raw-color` | error | hex/rgba literal whose normalized value exactly matches a token (CSS var from `:root` or a tokens.js constant). Suggests the token(s). |
| `brand-voice` | error | Capitalised "Slice" / "Monies" / "Spark(s)" inside string/JSX prose (CamelCase identifiers like `SliceIcons` excluded). |
| `emoji` | error | Emoji codepoints in non-comment source. |
| `inr-format` | error | `₹` + western grouping (must be `₹1,00,000`-style — use `formatINR()`); `₹ ` with a space; `+₹` credit prefix; arrow+sign trend deltas. |
| `typography` | error | Non-Rubik `fontFamily`; `fontWeight` other than 400/500. |
| `shadow` | info | Any `boxShadow` ≠ the canonical card shadow (`0px 4px 24px rgba(0,0,0,0.08)`) — inventory for review, not a violation (nav, knobs, and stage chrome legitimately differ). |

### Sanctioned-raw contexts (NOT flagged)

- **Dev chrome** — `DebugPanel.jsx`, `ControlPanel.jsx`, `playground/` —
  deliberately theme-independent review tooling (must stay readable over both
  light and dark app stages).
- **Gradient / shadow / filter strings** — canonical multi-stop values (theme
  reveal, bottom fades) are spec'd raw.
- **SVG `fill=`/`stroke=` attributes** — inline canonical geometry. (Where
  theming is needed the FIX is `currentColor`, but that's a judgment call —
  see `reference_theming.md` — never an auto-flag.)
- **`.css` files** — can't import tokens.js; their variables live in
  `index.css`, which IS the token source (along with `tokens.js`, both skipped
  as definitions).
- **Comments** (line and block).

### Pragmas

Self-documenting exemptions; a reason on the same line is mandatory:

```js
const LIGHT = '#FFFFFF'; // dls-lint-ok: status-bar text over dark pages — theme-invariant
// dls-lint-disable: iOS hardware chrome mimics the OS face/weight, not slice UI
fontFamily: '-apple-system, …',
fontWeight: 600,
// dls-lint-enable
```

A pragma without a real reason is itself a finding in review. Don't pragma your
way out of a genuine violation — fix it.

## Reference-integrity mode (`--refs`)

Guards the reference corpus itself:

| Category | What |
|---|---|
| `refs-orphan` | Reference file cited nowhere (SKILL.md, INDEX.md, other refs). The `reference_dls_*` family counts as cited via SKILL.md's `reference_dls_<component>.md` pattern row. |
| `refs-missing` | File cited in SKILL.md but absent from `references/`. |
| `refs-superseded` | Calibration-log entry line marked "superseded" without naming what superseded it — the exact "two live values for one fact" hazard the precedence note warns about. |

Run from `status` alongside the drift check (`scripts/check-drift.sh`).

## Fix workflow (after a lint run with findings)

Borrowed intact from aibanker's design-lint — its safety rails are the best
part:

1. **Report first** — findings grouped by category. Never silent-fix.
2. **Confirm with the user** which categories to fix (default: all `error`s).
3. **Fix one category per commit** — easy rollback, reviewable blast radius.
4. **Build gate after each category** — `npm run build` in the proto (or the
   project) must pass before the next category.
5. Genuine violations get token imports / `formatINR()` / copy fixes;
   intentional values get pragmas WITH reasons.
6. New tokens are NEVER created to satisfy lint — if a raw value has no exact
   token, it's either canonical-raw (pragma) or a question for calibration.

## When to run

- Before declaring any proto/screen build done (part of the done-gate trio —
  `reference_proto_systematics.md`).
- As step 1 of `judge`/`audit` on code targets.
- After a `cascade` (verify trio — `reference_cascade.md`).
- `--refs` during `status` and after calibration promotions.

## Baseline

2026-06-10 initial sweep over proto/src: 45 findings → 3 false-positive classes
fixed in the script (CSS block comments, SVG attrs, .css files), 19 genuine
fixes applied (raw `#FFFFFF` on V-500/Blue-500 → `WHITE`; raw
`rgba(0,0,0,0.05)` card borders → `OUTLINE_SUBTLE`), 9 intentional values
pragma'd with reasons (stage chrome, iOS status-bar face, reveal caption).
Proto is lint-clean at 0 errors / 1 info (AppSettings switch-knob shadow —
verify against spec when the control is next calibrated).
