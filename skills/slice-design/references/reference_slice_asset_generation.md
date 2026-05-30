---
name: slice asset generation (missing-asset placeholders)
description: How to GENERATE high-fidelity flagged placeholders when a required icon/illustration is missing on disk — icons via direct SVG few-shot, illustrations via Gemini (Nano Banana) free tier. Auto-invoked during proto builds. Overrides the older "dull dummy circle" + "never generate" rules for PROTO context only.
type: reference
---

> **User-directed override (2026-05-30).** The base skill said: missing asset → dull dummy + flag, and "never generate icon SVGs". The user overruled this for **proto/working context** because dull placeholders make pages read as broken during design review. New policy: missing asset → **generate a high-fidelity, slice-accurate, FLAGGED placeholder**. The flag is non-negotiable — it keeps handoff safe. See calibration log R24 cont-33.

## Status / action plan (2026-05-30)

| Engine | Status | Notes |
|---|---|---|
| **Icons (SVG few-shot)** | ✅ LIVE — validated | Rating game scored 10/12 first-pass, both filled + outline. Two craft fixes baked in. No model/key needed. Use it now. |
| **Illustrations (Gemini/Nano-Banana)** | ⏸ PARKED — blocked on setup | Spec is written + correct, but generation can't run until: (1) user sets a free `NANOBANANA_API_KEY` from https://aistudio.google.com/apikey, and (2) the nanobanana extension is re-enabled (the `!/Users/anirudhbhat/*` override in `~/.gemini/extensions/extension-enablement.json` disables it; run `gemini extensions enable nanobanana`). Until both are done, fall back to dummy + flag. **Action: when the user provides the key, re-enable + re-run the gem test from an empty dir, then mark LIVE.** |

Stress-test harness lives at `icon-lab/` (in this skill dir): `build_icons.py` (batch generator), `server.py` + `index.html` (the spot-the-bad-ones rating game on :8777), `ratings.jsonl` (verdict log). Reuse it to validate future generation rounds.

## When this fires (AUTO-INVOKE)

During any `build` / `iterate` / `proto` flow, the asset-resolution order is now:

1. **Copy** — asset exists in `proto/public/assets/`, the kit, or `explore-base/public/assets/`? Use it directly. (Unchanged — copy always beats generate.)
2. **Figma** — buildable via a known DLS node? Pull the real vector. (Unchanged.)
3. **GENERATE (new)** — asset genuinely doesn't exist anywhere? Don't drop a dull dummy. Generate a slice-accurate flagged placeholder per this file.

This is automatic. When you're mid-build and reach for an icon/illustration that isn't on disk, generate it — don't stop to ask, don't ship a grey circle.

## HARD guardrails (these keep it safe)

- **Every generated asset carries the flag.** Without the flag it's invisible to the visual team and can ship by accident — that is the exact failure the base "never generate" rule was protecting against. The flag is what makes generation safe.
  - SVG: first child is `<!-- GENERATED-PLACEHOLDER: <name> | slice-asset <date> | not DLS-final, redraw before ship -->`
  - Raster: filename prefix `gen_` AND an entry in the project's `GENERATED_ASSETS.md` manifest (path, name, concept, date) so the visual team has a grep-able worklist.
- **Generated assets are PROJECT-OWNED, never kit.** Write to `public/assets/` (or `public/assets/icons/gen_*`). NEVER into the linked `src/icons/` kit layer — placeholders must not propagate to other projects.
- **Naming follows the DLS taxonomy** in `reference_dls_iconography.md` (15 categories, ~236 named icons). Match the canonical concept name (`wallet`, `bell`, `coupon`, `self-transfer`…) so the visual team can map it 1:1 to the real DLS icon.
- **Generation is for protos only.** Product builds and anything past handoff still use real DLS assets — the original "never generate" ban stands there.

---

## Engine 1 — Icons (direct SVG few-shot) — FREE, instant, no model

Icons need **no image model**. Generate the SVG directly in the slice icon style, derived from the real DLS SVGs on disk.

### slice icon DNA (derived from `proto/public/assets/icons/*.svg`, 2026-05-30)

| Property | slice rule | Why it matters |
|---|---|---|
| **Fill, not stroke** | Solid filled paths with `fill-rule="evenodd"` cutouts. NEVER `stroke=`/line-art. | Confirmed across search, filter, eye, settings, copy. Line-art generators get this wrong → instant slop tell. |
| **Single themeable fill** | `fill="currentColor"` (or `var(--text-primary)`), `fill-opacity="0.5"` slate / `0.9` strong. No hardcoded hex. | Themes light/dark for free (the kit's "inline SVG, never PNG" rule). |
| **Rounded everything** | Generous corner radii, circular dots, soft terminals. No sharp corners. | Matches friendly/simple brand voice. |
| **Grid** | 24×24 glyph (canonical), centered with ~2px optical inset. Container is 56×56 but the SVG itself is the 24 glyph. | Drops into DLS icon slots with zero layout shift. |
| **Weight** | Chunky-but-clean filled forms, optically even. Not thin, not heavy. | — |

### Calibrated icon-craft rules (from the rating loop, R24 cont-33 — apply to every generated icon)

- **Minimize shape count — one form reads as slice, many forms read as clutter.** Prefer a single `evenodd` path. No decorative inner dots/pips/extra elements just to "fill space." (User on an early calendar with 3 inner dots: *"too many shapes."* The clean fix was solid-header + hollow-body in ONE path.)
- **Accent / punch holes are FILLED dots, never stroked rings — even inside an outline icon.** A 2px-stroke ring at small radius leaves a cramped inner hole that reads "tight." Use a solid `<circle fill="currentColor"/>` and give it breathing room from edges/corners. (User on an early outline tag: *"the circle ring should be filled, it looks very tight."*)

### The icon resolution rule (canonical — user-stated R24 cont-33)

> **Find first, generate second, style by context, colour rules always.**

1. **Find in the set.** We have an icon set (`proto/public/assets/icons/`, the kit, `explore-base`, DLS Figma). Always look there first and use the real one.
2. **Can't find it → generate** per the slice icon spec below. Generation is the fallback, never the first move.
3. **Filled or outline = judged by WHERE it's used** (context, not coin-flip):
   - **Filled** (slice default — the on-disk DLS icons skew filled): inline with text, dense list rows, search/filter/settings chrome, the **active/selected** state of a togglable icon, status/confirmation, brand/emphasis moments. When unsure, default filled.
   - **Outline**: the **inactive/unselected** counterpart of a filled active icon; large hero / empty-state glyphs where a solid fill would read too heavy; lighter secondary affordances. Rule of thumb: if a sibling state is filled, the resting state is outline.
   - If the icon sits in a known DLS component slot, match whatever that component's existing icons use.
4. **Colour rules still apply — unchanged, both styles.** Generated icons obey the same rules as real DLS icons (see `reference_dls_colors.md` / `reference_dark_mode.md`):
   - Fill/stroke = `currentColor` or a token var — **never a hardcoded hex**.
   - Slate default `fill-opacity: 0.5`; strong/primary `0.9`; **V-500 `#D30AD7`** only for active/selected/brand glyphs.
   - **Inline SVG only, never PNG** — an icon must recolour and theme light/dark via `currentColor`. A raster icon can't and is banned.

### Procedure

1. Read 3–5 example SVGs from `proto/public/assets/icons/` as style anchors (e.g. `dls_search.svg`, `dls_filter.svg`, `dls_copy.svg`). Match their construction.
2. Look up the concept's canonical name in the iconography taxonomy.
3. Author the SVG by hand: `viewBox="0 0 24 24"`, filled paths, `currentColor` @ 0.9 (or 0.5 for de-emphasised), rounded geometry, `evenodd` for any holes.
4. Stamp the flag comment as the first child.
5. Write to `public/assets/icons/gen_<name>.svg`. If the proto consumes icons as JSX, also wrap it as an inline-SVG component with a `color` prop.

### Template

```svg
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<!-- GENERATED-PLACEHOLDER: <name> | slice-asset <date> | not DLS-final, redraw before ship -->
<path fill-rule="evenodd" clip-rule="evenodd" d="..." fill="currentColor" fill-opacity="0.9"/>
</svg>
```

---

## Engine 2 — Illustrations (raster, via Gemini / Nano Banana) — FREE tier

slice illustrations are rich 3D/gradient renders (`fy_3d_*`, `fire_*`, gradient banners) — vector can't fake them, so this path uses a raster model.

### Why Gemini (Nano Banana) and not FLUX
- **Free-tier key**: FLUX weights are free but a LoRA needs an NVIDIA GPU; on a Mac that means paid cloud GPU → not free. Gemini's image model is reachable with a **free** Gemini API key (Google AI Studio free tier).
- Routes through the **`cc-nano-banana`** skill (Gemini CLI + nanobanana extension MCP server).

### Setup gotchas (verified broken 2026-05-30 — fix before claiming the engine works)
The nanobanana path has TWO config prerequisites that the bare `gemini` OAuth login does NOT satisfy:
1. **`NANOBANANA_API_KEY` must be set** — a (free) key from https://aistudio.google.com/apikey. The image MCP server authenticates with this env var, NOT the CLI's OAuth login. Without it `/generate` can't run. (Only the user can create this key — it's tied to their Google account.)
2. **The extension must be ENABLED for the working path.** Check `~/.gemini/extensions/extension-enablement.json` — a `"!/Users/<user>/*"` override DISABLES nanobanana for the home tree. When disabled, `gemini extensions list` is empty and `gemini --yolo "/generate ..."` is NOT parsed as a command — gemini treats it as a free-form agent prompt and spirals (searches skills, npx, etc.). Re-enable with `gemini extensions enable nanobanana` (or remove the `!`-override) before running.
3. **Run from an EMPTY dir.** gemini sandboxes file access to cwd and will "investigate" any project files it finds. Generate from a clean output folder.

If any of these isn't satisfied, fall back to dummy + flag and tell the user exactly which prerequisite is missing — don't let the CLI spin.

### Procedure

1. Pick 2–3 closest existing slice illustrations as **style references** (`explore-base/public/assets/fy_3d_*.png`, `fire_*.png`, etc.) — pass them as reference images so the model anchors on slice's actual 3D/gradient look, not generic clip-art.
2. Prompt anchored on slice style. Skeleton:
   > "A single 3D-rendered object illustration of `<concept>`, in the style of the reference images: soft purple→pink gradient lighting, glossy rounded 3D forms, subtle glow, transparent background, centered, no text, no background scene."
3. Request **transparent background** (illustrations with baked backgrounds show as white boxes on dark surfaces — see `reference_dark_mode.md`).
4. Save to `public/assets/gen_<name>.png`, add to `GENERATED_ASSETS.md`.
5. Honor DLS placement conventions (`reference_dls_illustrations.md`): circle container (V-100 `#F4E5F8` fill) for big center heroes ~120–200px; any reasonable shape for smaller spots, sized to the surface.

### Fallback
If `gemini` isn't authed / image gen is unavailable, fall back to the **base skill behavior**: dummy + flag (dull placeholder + `ILLUSTRATION-MISSING` comment). Say so explicitly — don't silently skip.

---

## Manifest format (`GENERATED_ASSETS.md` at project root)

```markdown
# Generated placeholder assets — REDRAW before ship (visual team worklist)
| Asset | Concept | Engine | Created | Status |
|---|---|---|---|---|
| public/assets/icons/gen_bell.svg | notification bell | svg-fewshot | 2026-05-30 | placeholder |
| public/assets/gen_loyalty_orb.png | loyalty 3D orb | nano-banana | 2026-05-30 | placeholder |
```
