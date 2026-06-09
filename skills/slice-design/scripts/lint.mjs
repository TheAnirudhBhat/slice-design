#!/usr/bin/env node
// slice-design lint — mechanical DLS compliance sweep (the deterministic floor
// under `judge`/`audit`; see references/reference_lint.md).
//
// The token map is GENERATED at runtime from proto/src/index.css (:root vars)
// and proto/src/tokens.js (theme-invariant constants) — never hardcoded, so new
// tokens are linted the day they land (the aibanker design-lint skill went
// stale because its map was a literal list; this fixes that).
//
// Usage:
//   node scripts/lint.mjs [targetDir...]   # default: <skill>/proto/src
//   node scripts/lint.mjs --refs           # reference-integrity mode
//   node scripts/lint.mjs --json           # machine-readable output
//
// Pragmas (self-documenting exemptions, reason required on the same line):
//   // dls-lint-ok: <reason>          — exempt THIS line
//   // dls-lint-disable: <reason>     — exempt until dls-lint-enable
//   // dls-lint-enable
//
// Report-only: this script NEVER writes. Fixes go through the confirm →
// per-category-commit → build-gate workflow in reference_lint.md.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SKILL_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PROTO_SRC = path.join(SKILL_ROOT, 'proto', 'src');
const REFS_DIR = path.join(SKILL_ROOT, 'references');

const args = process.argv.slice(2);
const REFS_MODE = args.includes('--refs');
const JSON_MODE = args.includes('--json');
const targets = args.filter((a) => !a.startsWith('--'));

// Dev-chrome files: review tooling that deliberately does NOT theme with DLS
// tokens (must stay readable over both light and dark app stages). Raw values
// are correct there. Playground/debug surfaces, not shipped UI.
const DEV_CHROME = [
  'components/DebugPanel.jsx',
  'components/ControlPanel.jsx',
  'playground/',
];

// ---------------------------------------------------------------------------
// Token map generation
// ---------------------------------------------------------------------------

function normColor(v) {
  let s = v.trim().toLowerCase().replace(/\s+/g, '');
  // #abc → #aabbcc
  const short = s.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/);
  if (short) s = `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}`;
  // strip trailing zeros in alpha: 0.10 → 0.1
  s = s.replace(/0\.(\d*?)0+(?=[,)])/g, (m, d) => (d ? `0.${d}` : '0'));
  return s;
}

function buildTokenMap() {
  const map = new Map(); // normalized raw value → [token names]
  const add = (raw, name) => {
    const k = normColor(raw);
    if (!map.has(k)) map.set(k, []);
    if (!map.get(k).includes(name)) map.get(k).push(name);
  };

  // 1. CSS variables — LIGHT (:root) block only. Dark values are mode-specific
  //    and matching them against raw literals would mis-suggest.
  const css = fs.readFileSync(path.join(PROTO_SRC, 'index.css'), 'utf8');
  const rootBlock = css.match(/:root\s*\{([^}]*)\}/);
  if (rootBlock) {
    for (const m of rootBlock[1].matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
      if (m[1] === 'color-scheme') continue;
      add(m[2], `var(--${m[1]})`);
    }
  }

  // 2. tokens.js exported constants (theme-invariant: WHITE, V_500, WHITE_10…)
  const tok = fs.readFileSync(path.join(PROTO_SRC, 'tokens.js'), 'utf8');
  for (const m of tok.matchAll(/export const (\w+)\s*=\s*'((#|rgba?\()[^']+)'/g)) {
    add(m[2], m[1]);
  }
  return map;
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

const findings = []; // {category, severity, file, line, text, hint}
function report(category, severity, file, line, text, hint) {
  findings.push({ category, severity, file: path.relative(process.cwd(), file), line, text: text.trim().slice(0, 120), hint });
}

// Emoji (incl. ZWJ sequences) in source — slice ships line icons, never emoji.
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F900}-\u{1F9FF}\u{FE0F}]/u;

// ₹ amount with commas — validate Indian grouping (last group 3, rest 2).
const INR_RE = /₹\s?[\d,]+/g;
function isIndianGrouping(digits) {
  if (!digits.includes(',')) return true;
  return /^\d{1,2}(,\d{2})*,\d{3}$/.test(digits);
}

function checkFile(file, tokenMap) {
  const rel = path.relative(PROTO_SRC, file);
  const src = fs.readFileSync(file, 'utf8');
  const lines = src.split('\n');
  const isDevChrome = DEV_CHROME.some((p) => rel.startsWith(p) || rel.includes(`/${p}`));

  const isCss = file.endsWith('.css');
  let disabled = false;
  let inBlockComment = false;
  lines.forEach((line, i) => {
    const n = i + 1;
    if (/dls-lint-disable:/.test(line)) disabled = true;
    if (/dls-lint-enable/.test(line)) disabled = false;
    const wasInBlock = inBlockComment;
    if (/\/\*/.test(line) && !/\*\//.test(line)) inBlockComment = true;
    if (/\*\//.test(line)) inBlockComment = false;
    if (disabled || /dls-lint-ok:/.test(line)) return;
    const isComment = wasInBlock || /^\s*(\/\/|\*|\/\*)/.test(line);

    // -- raw colors that have an exact token. Skipped contexts (sanctioned raw
    //    values): dev chrome, comments, gradient/shadow/filter strings, SVG
    //    fill=/stroke= attributes (inline canonical geometry — use currentColor
    //    where theming is needed, but never auto-flagged), and .css files
    //    (can't import tokens.js; their vars live in index.css, the token source).
    if (!isDevChrome && !isCss && !isComment && !/gradient\(|[Ss]hadow|filter|drop-shadow/.test(line)) {
      const stripped = line.replace(/(?:fill|stroke)=["'][^"']*["']/g, '');
      for (const m of stripped.matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\([\d\s.,%]+\)/g)) {
        const tokens = tokenMap.get(normColor(m[0]));
        if (tokens) {
          report('raw-color', 'error', file, n, line, `${m[0]} → ${tokens.join(' or ')} (import from tokens.js)`);
        }
      }
    }

    // -- brand voice: capitalised product names in UI strings ---------------
    if (!isComment) {
      for (const m of line.matchAll(/["'>`]([^"'<`]*)\b(Slice|Monies|Sparks?)\b([^"'<`]*)["'<`]/g)) {
        // skip identifiers/imports (SliceIcons, MoniesMark) — require the word
        // to sit in prose (preceded by space/start, not part of CamelCase)
        if (/\b(Slice|Monies|Spark)[A-Z]/.test(m[0])) continue;
        report('brand-voice', 'error', file, n, line, `"${m[2]}" → lowercase (product/brand names are always lowercase)`);
      }
    }

    // -- emoji ---------------------------------------------------------------
    if (EMOJI_RE.test(line) && !isComment) {
      report('emoji', 'error', file, n, line, 'emoji in UI source — slice line icons only');
    }

    // -- INR formatting -------------------------------------------------------
    for (const m of line.matchAll(INR_RE)) {
      const raw = m[0];
      if (/^₹\s/.test(raw)) report('inr-format', 'error', file, n, line, '₹ must touch the digit (no space)');
      const digits = raw.replace(/^₹\s?/, '');
      if (!isIndianGrouping(digits)) {
        report('inr-format', 'error', file, n, line, `"${raw}" → Indian grouping (₹1,00,000 not ₹100,000); use formatINR()`);
      }
    }
    if (/\+\s*₹/.test(line) && !isComment) {
      report('inr-format', 'error', file, n, line, 'no "+" prefix on credit amounts — Positive Green colour alone');
    }
    if (/[↑↓]\s*[+\-−]/.test(line)) {
      report('inr-format', 'error', file, n, line, 'arrow + sign together on a delta — pick one (arrow preferred)');
    }

    // -- typography: Rubik only, weights 400/500 only ------------------------
    if (!isDevChrome && !isComment) {
      if (/fontFamily:\s*['"`](?!Rubik)/.test(line)) {
        report('typography', 'error', file, n, line, 'non-Rubik fontFamily — Rubik is the only slice face');
      }
      const fw = line.match(/fontWeight:\s*['"]?(\d{3})/);
      if (fw && !['400', '500'].includes(fw[1])) {
        report('typography', 'error', file, n, line, `fontWeight ${fw[1]} — slice uses Rubik 400/500 only`);
      }
    }

    // -- shadows: inventory (info) — canonical card shadow is
    //    0px 4px 24px rgba(0,0,0,0.08); anything else is reviewed, not banned.
    if (!isDevChrome && !isComment) {
      const sh = line.match(/box-?[sS]hadow['"]?\s*[:=]\s*['"`]([^'"`]+)/);
      if (sh && !sh[1].includes('4px 24px')) {
        report('shadow', 'info', file, n, line, `non-canonical shadow "${sh[1].slice(0, 48)}…" — verify against the spec`);
      }
    }
  });
}

// ---------------------------------------------------------------------------
// Reference-integrity mode (--refs)
// ---------------------------------------------------------------------------

function checkRefs() {
  const refFiles = fs.readdirSync(REFS_DIR).filter((f) => f.endsWith('.md'));
  const skillMd = fs.readFileSync(path.join(SKILL_ROOT, 'SKILL.md'), 'utf8');
  const indexMd = fs.existsSync(path.join(REFS_DIR, 'INDEX.md'))
    ? fs.readFileSync(path.join(REFS_DIR, 'INDEX.md'), 'utf8')
    : '';
  const allRefText = refFiles.map((f) => fs.readFileSync(path.join(REFS_DIR, f), 'utf8')).join('\n');

  // 1. Orphans: reference files cited nowhere (SKILL.md, INDEX.md, other refs).
  //    The reference_dls_* component-spec family is cited BY PATTERN in
  //    SKILL.md's quick-reference table ("reference_dls_<component>.md"), so
  //    membership in that family counts as cited.
  for (const f of refFiles) {
    if (f === 'INDEX.md') continue;
    const familyCited = f.startsWith('reference_dls_') && skillMd.includes('reference_dls_<component>.md');
    const cited = familyCited || skillMd.includes(f) || indexMd.includes(f) || allRefText.split(f).length > 2;
    if (!cited) report('refs-orphan', 'warn', path.join(REFS_DIR, f), 1, f, 'reference file cited nowhere — orphan candidate');
  }

  // 2. Files cited in SKILL.md that don't exist on disk
  for (const m of skillMd.matchAll(/reference_[\w]+\.md/g)) {
    if (!refFiles.includes(m[0])) {
      report('refs-missing', 'error', path.join(SKILL_ROOT, 'SKILL.md'), 1, m[0], 'cited in SKILL.md but missing from references/');
    }
  }

  // 3. Superseded hygiene: calibration-log entries marked superseded should
  //    name what superseded them (prevents two live values for one fact).
  const logPath = path.join(REFS_DIR, 'reference_calibration_log.md');
  if (fs.existsSync(logPath)) {
    fs.readFileSync(logPath, 'utf8').split('\n').forEach((line, i) => {
      // entry lines only (list items / table rows) — prose headers don't count
      if (!/^\s*[-|]/.test(line)) return;
      if (/superseded/i.test(line) && !/superseded by|→|R\d+/i.test(line)) {
        report('refs-superseded', 'warn', logPath, i + 1, line, 'superseded marker without a pointer to the superseding entry');
      }
    });
  }
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === 'dist') continue;
      yield* walk(p);
    } else if (/\.(jsx?|tsx?|css)$/.test(e.name) && e.name !== 'index.css' && e.name !== 'tokens.js') {
      yield p;
    }
  }
}

if (REFS_MODE) {
  checkRefs();
} else {
  const tokenMap = buildTokenMap();
  const dirs = targets.length ? targets.map((t) => path.resolve(t)) : [PROTO_SRC];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      console.error(`target not found: ${dir}`);
      process.exit(2);
    }
    for (const f of walk(dir)) checkFile(f, tokenMap);
  }
}

if (JSON_MODE) {
  console.log(JSON.stringify(findings, null, 2));
} else {
  const byCat = {};
  for (const f of findings) (byCat[f.category] ??= []).push(f);
  for (const [cat, items] of Object.entries(byCat)) {
    console.log(`\n■ ${cat} (${items.length})`);
    for (const it of items) {
      console.log(`  [${it.severity}] ${it.file}:${it.line}`);
      console.log(`      ${it.text}`);
      console.log(`      ↳ ${it.hint}`);
    }
  }
  const errors = findings.filter((f) => f.severity === 'error').length;
  const warns = findings.filter((f) => f.severity === 'warn').length;
  const infos = findings.filter((f) => f.severity === 'info').length;
  console.log(`\n${errors} error(s), ${warns} warning(s), ${infos} info — ${findings.length ? 'review via reference_lint.md workflow' : 'clean ✓'}`);
}
process.exit(findings.some((f) => f.severity === 'error') ? 1 : 0);
