---
name: slice-design
description: Use whenever the user is creating, designing, judging, building, iterating, or critiquing any slice screen, flow, component, or visual asset — Figma builds, web protos, motion design, anti-pattern checks, DLS 2.0 component usage, brand voice review, and any fintech/UPI/banking/credit/payments UI work that targets slice. Trigger this skill even when the user doesn't explicitly say "slice" — Figma URLs in conversation, mentions of DLS, UPI flows, Atom, Spark, Monies, Fire, payment screens, balance screens, credit cards, super card, brand-immersive Valentino purple surfaces, "design audit", "is this on-brand", or any visual judgment task on consumer fintech mobile UI all warrant invoking this skill. Also fires for build / iterate / judge / audit / recipe / proto / motion / explore / extract / status / calibrate / sweep sub-commands. (Renamed from slice-dls 2026-05-17.)
version: 2.1.0
user-invocable: true
---

# slice-design — slice Design System Skill

> ## ⚖ Precedence (non-negotiable)
>
> **slice-design / slice-DLS wins on any contradiction.**
>
> Priority order, top wins:
> 1. `references/reference_calibration_log.md` + calibrated overrides in any `reference_*.md` (the user's own validated judgments)
> 2. Project-local memory at `.slice-design/project.md` if present (project-specific patterns + exploration decisions)
> 3. Base rules in this `SKILL.md` and other `references/reference_*.md` files
> 4. `impeccable`, `design-motion-principles`, `emil-design-eng`, `frontend-design` (toolkit extensions — pull techniques, but slice rules win on conflict)
> 5. `taste-skill`, `brand-guidelines`, `huashu-design`, `hue`, and any other design skill
> 6. Anthropic default behaviour
>
> `emil-design-eng` is a particularly useful toolkit extension — its motion framework (frequency rule, purpose rule, easing per direction-of-motion, duration table), spring techniques, clip-path patterns, blur crossfade, momentum dismissal, and `@starting-style` entry are all valid first-class techniques for slice. Use them when the brief warrants. See `reference_motion.md` and `reference_exploration_patterns.md`.
>
> If another skill says "use OKLCH neutrals" or "no emoji" — slice-design's calibrated rule for that surface wins. Other skills are inputs, not authorities, when working on slice.
>
> When a contradiction surfaces mid-task, state it briefly ("impeccable says X, slice-design overrides to Y because cal:2026-05-17 — proceeding with Y") and continue. Don't re-litigate.

DLS 2.0 components/tokens (Figma execution), motion, web-proto defaults, anti-patterns, and calibrated judgments. Calibrated overrides win over any baseline rule in this file.

## Be flow-aware, not just surface-aware

When designing, judging, or building a slice screen, **always consider the flow context**, not just the visual recipe. A screen isn't a standalone artifact — it's a step in a journey. Ask:

- What flow is this screen part of? (See `references/reference_flows.md` for the god view of all major flows.)
- Where did the user come from? (Push nav from L0 → L1? Sheet over a flow? Cross-pod handoff?)
- Where do they go next? (Confirmation tick → back to pod? Sheet dismiss returns to L0? Failed → Retry/Cancel branch?)
- Mid-flow context: do dynamic elements (App bar dynamic title `Pay ₹2,000`, identity-anchor UPI ID pill, breadcrumb-ish caption metadata) need to carry the flow's running state?
- What's the entry point taxonomy? (See `references/reference_entry_points.md` — native home + secondary triggers.)

A surface designed without flow context is a screen mock. A surface designed WITH flow context is a slice screen.

## Page-ID-as-recency heuristic

In Figma files with multiple iterations of the same screen, **higher node IDs = newer = canonical; lower node IDs = older = potentially superseded.**

Confirmed by Profile V3 sweep (R21): frame `522:6239` (lower ID) was an earlier iteration; frames `813:9080`, `765:6819`, `767:7349`, `765:7200` (higher IDs) were canonical V3.

Apply this heuristic when:
- A sweep returns multiple versions of "the same screen" — prefer the higher-ID frame
- "Final" or ✅-marked siblings exist — use those even if their IDs are higher
- The DLS author marks a page with ⚠️ (incomplete) — sweep cautiously, but trust the higher-ID frames within

This is a heuristic, not a rule. Designer naming (`Final`, ✅, `Canonical`, page name conventions) overrides node IDs when both exist. But absent any signal, prefer the newer frame.

## Working modes — hard rules, soft rules, exploration

Three registers govern every slice design decision:

- **HARD rules** — never violate. Brand voice (lowercase "slice"), V-500 + sanctioned palette, Rubik only, no emoji, calibrated absolute bans. Use these even in exploration mode. Why: these define what makes a screen recognizably slice. Break them and the work stops being slice.
- **SOFT rules** — defaults that can be remixed. Screen recipes, component compositions, motion choices, specific layout patterns. Use the calibrated default unless the brief warrants a deviation. Why: defaults make routine work fast and consistent; remix room makes the system extensible.
- **EXPLORATION** — actively encouraged when there's a reason. New product (Atom), new surface, new feeling. Keep HARD rules locked. Propose alternatives to soft rules with reasoning. See `reference_exploration_patterns.md` for technique scaffolding (clip-path, momentum, blur crossfade, springs, etc.).

When the user asks for "something new", default to exploration mode. When the user gives a routine brief, default to build mode with the calibrated recipe. When you're judging existing work, hard rules are absolute; soft rules become "this deviates from default for [reason]" findings, not violations.

## Suite

slice-design ships as a small skill suite:

| Skill | Role | Trigger |
|---|---|---|
| **slice-design** (this skill) | Build, judge, and apply DLS 2.0 to slice screens | "design / create / build a slice screen", Figma URLs, any slice UI task |
| **slice-design-calibrate** | Calibrate the rules in this skill via A/B pairs + reference frames | `/update-slice-design`, "calibrate slice", "triage the calibration log" |

The calibrate skill is the maintenance loop. It walks the user through judgment pairs on a local web proto, then writes the resulting rules into this skill's `references/`. Treat the two as one product — one applies the rules, the other keeps them honest.

## Required dependency — agentation

This skill assumes **agentation is installed and implemented in every slice project** it works on. Why: agentation is the runtime layer that lets the skill's web-proto and Figma-build workflows actually function — DLS primitives loading, gallery component instantiation via the calibration proto, asset routing for icons/illustrations, and the localhost:8766 endpoint that ships icons + design tokens.

If a user installs slice-design without agentation, the skill's `proto` / `build` / `iterate` workflows will partially fail (icons won't resolve, DLS primitives won't render, gallery component lookups won't work).

**When this skill is installed:**
- Confirm agentation is present at the project root OR globally available
- If absent, prompt the user to install + initialize agentation before continuing
- For new projects (`/proto` flow), scaffold agentation as the first step alongside Vite + DLS primitives setup
- See `reference_web_proto.md` for the full Vite + agentation + DLS scaffold

Agentation is not optional. Treat it the same way you'd treat npm being installed before running `npm install` — it's a baseline.

## Building a slice proto — READ FIRST

If you're starting a new slice proto, scaffolding a new L0, or building any cross-cutting chrome (status bar, bottom nav, app bar, phone shell), **read `references/reference_proto_systematics.md` FIRST**. That file is the distilled meta-rules from the R23 build of `slice-app-proto` — 7+ fix-it rounds of recurring failures, root causes, and PERMANENT RULES that prevent each.

It also has a Pre-build Checklist and Post-build Verification list. Run both. The whole point of `reference_proto_systematics.md` is that future proto builds ship-ready in one round, not seven.

### HARD RULE — projects INHERIT the skill proto; the skill proto is upstream and READ-ONLY during project work (R24 cont-35/36)

The skill proto (`~/.claude/skills/slice-design/proto/`) is the **single upstream source of truth — the "main".** Every project is a thin wrapper that **inherits the whole proto by default and builds on top of it**, staying live-linked so skill-proto improvements flow down automatically (see `reference_web_proto.md` § "Shared kit + extension seam"). Non-negotiables:

1. **Default = inherit everything, build on top.** A new project (`proto/scripts/new-proto.sh`) is born as `App.jsx` (thin wrapper) + `AppBase.jsx` (symlink → skill `App.jsx`) + linked kit + its feature pod(s). Shell, theme, status bar, nav, all base pods, Explore — all inherited live. The project adds its feature via the seam (`extraL1` / `exploreExtraCards` / `initialPod`), never by forking.

2. **NEVER edit the skill proto to satisfy a project.** While building or exploring a project, the skill proto is **read-only**. A project-specific change goes in the PROJECT. If a project needs to diverge a shared component, **UNLINK just that component into the project** — `link-kit.sh materialize <project> src/<path>` (e.g. `src/components` or `src/AppBase.jsx`) — which copies the skill's current file in so the project owns its copy. The skill proto is untouched; every other project keeps inheriting the original. Everything stays linked to main until the user explicitly asks to explore something.

3. **The skill proto changes ONLY via deliberate skill maintenance** — a universal DLS truth (e.g. a canonical token, a fixed chrome bug, a motion-pacing rule) promoted on purpose, with a `reference_calibration_log.md` entry. That is a SEPARATE act from building a project, never an incidental side-effect of it. When in doubt whether a change is universal or project-specific: assume project-specific (edit the project), and only promote to the skill proto when it's clearly a slice-wide rule the user has confirmed.

Why: a project's copied files silently drift from the evolving skill app → the "legacy view" (cont-35). Inherit-by-default + unlink-only-to-explore keeps every project current and the design system consistent, while protecting the upstream from project churn.

### Two non-negotiables before you write any proto code

These are the two process rules that, when skipped, produce "kinda mid" output that then takes 20 correction rounds to fix (root cause of R24 cont-25→29). Do these every time, no exceptions:

1. **Compose from cache — don't rebuild chrome.** The proto + `references/proto-snapshot/` are a read-through cache of the canonical app. For ANY new screen or flow, COPY the StatusBar / AppBar / Avatar / phone shell / tokens / Primary button from `proto-snapshot/code/` and `proto-snapshot/assets/`. Do not re-hand-build them from memory — that's how you reintroduce already-fixed bugs (cropped wifi, wrong chevron, 52px button, lowercase CTA). If you catch yourself typing `<svg>` for a glyph or `borderRadius` for a button that already exists in the snapshot, STOP and copy instead. Re-deriving = you will get a detail wrong.

2. **Self-audit before you show.** The loop is: fetch canonical → build → **screenshot your own output → compare against canonical side-by-side → fix the diffs → THEN show the user.** The most expensive failures this session were all things a 10-second self-screenshot would have caught (font not inheriting, double header, off button height). Never hand the user the first build as if it's done. If the browser/Playwright is genuinely unavailable, say so explicitly and fall back to `npm run build` + a careful manual diff against the snapshot spec — don't silently skip the audit.

When you skip these, you are outsourcing QA to the user, one screenshot at a time. That is the "death by a thousand corrections" anti-pattern. The new-screen pre-flight checklist in `reference_proto_systematics.md` operationalizes both.

## LIVE proto + snapshot (both inside this skill)

The slice-app-proto LIVES INSIDE the skill:

```
~/.claude/skills/slice-design/
  ├── proto/                    ← LIVE working proto (R23 cont-23)
  │   ├── src/                    (App, components, icons, pods)
  │   ├── public/assets/          (canonical PNGs + SVGs from Figma)
  │   ├── package.json, vite.config.js, etc.
  │   └── ARCHITECTURE.md
  └── references/
      └── proto-snapshot/       ← FROZEN snapshot at R23 cont-22
          ├── code/, assets/, manifests/, INDEX.md, README.md
```

### Run the live proto

```bash
cd ~/.claude/skills/slice-design/proto
npm install --cache "$TMPDIR/npm-cache-slice-app-proto"   # first time
npm run dev                                                # default vite port
```

The proto boots to the working R23 state with all 5 pods (Banking, Explore, Pay/Valentino, Credit, Activity), the full bottom nav + status bar + page pager, and agentation wired (toolbar bottom-right of the browser).

### When to use which

- **Editing / iterating** → work in `proto/`. That's the live source. Changes here are immediate.
- **Recreating one component in another project** → check `references/proto-snapshot/INDEX.md` first for the curated catalog with Figma node IDs and calibration-history per item. Copy from `proto-snapshot/code/` to lock in the R23 cont-22 known-good baseline.
- **Researching WHY a line of code is the way it is** → `references/reference_proto_systematics.md` (meta-rules) + `reference_calibration_log.md` (round-by-round audit trail).

### Refresh cadence

The snapshot is frozen at R23 cont-22 (2026-05-29). Re-snapshot the live proto into `references/proto-snapshot/` whenever:
- A major round lands and the user calls the proto "in a decent state".
- A new pod / cross-cutting component is added.
- Asset library grows by 10+ items.

Re-snapshot script: re-run the file-copy commands documented in `INTEGRATION_PLAN.md`.

## R23 calibrated rules (operational must-do)

### Asset reuse — copy first; generate a flagged placeholder only when truly missing
- **Before generating any icon, image, or illustration**, check `/Users/anirudhbhat/claude/slice/projects/explore-base/public/assets/` (87 canonical assets including: spark / fire / monies / invite-magnet / bill tiles / brand logos / category icons / 3D illustrations / rewards cards). Copy directly via `cp explore-base/public/assets/<file> slice-app-proto/public/assets/`. Never inline-SVG-generate a glyph if a real one exists locally.
- **ICONS — official ONLY; if missing, a DUMMY placeholder. NEVER hand-draw, trace, or generate an icon.** (User-directed HARD rule, 2026-05-30, stated repeatedly and angrily: *"only use official icons, if you don't have use dummy icons"*, *"no don't trace wtf, just use the image i gave you"*.) The official slice icon library is **Figma DLS 2.0 Copy node `582:257`** — and **most icons are already in the proto `public/assets/` + `public/assets/icons/`**, so check there first. To theme a monochrome official icon (light/dark), inline its EXACT Figma path and swap `fill`→`currentColor` (that is still "official" — same geometry). If the icon genuinely isn't available, drop in a clear neutral DUMMY (e.g. a rounded-box placeholder) and tell the user where to put the real file — do NOT approximate the real mark. This SUPERSEDES "generate icons via SVG few-shot" for icons.
  - A user-PASTED inline image is shown to the agent visually but is **NOT written to disk** — you cannot read its bytes. To use a user's exact image, it must live as a repo file; point the `<img>` at a known path (e.g. `public/assets/upi_pill.png`) and have the user drop the file there. Never trace/redraw it from the preview.
- **ILLUSTRATIONS genuinely missing everywhere (big 3D/brand art, not on disk, not a known Figma node)?** AUTO-GENERATE a high-fidelity, slice-accurate, FLAGGED placeholder per **`references/reference_slice_asset_generation.md`** (Gemini/Nano-Banana, free tier) — a dull box makes a hero read as broken in review. The flag (`gen_` prefix + `GENERATED_ASSETS.md` entry) is mandatory; the visual team redraws every flagged asset. Generated assets are PROJECT-OWNED (`public/assets/`), never the linked kit. **This generation path is for illustrations, NOT icons** (see the icon rule above). Copy/Figma still win when the asset exists; generation is the last fallback.
- Canonical L0 pages reference: file `PNUz3Dr9KSlFJSnsXsC0nL` node `885:19528` — overview of Banking, Explore, Credit, Activity, Profile L0s in one frame. Pull screenshots from here when building or auditing L0 pages.

### No gray backgrounds in slice (re-affirmed, R23 fix-it-2 2026-05-29)
**slice has zero gray surfaces.** All non-immersive page backgrounds are pure WHITE `#FFFFFF`. Any apparent gray you perceive is the **drop-shadow of a floating card on white** — not an actual gray surface. Do not "add slate-10 to make shadows pop" — that drifts off-brand and reads as gray.

- **Brand-immersive pages** (Pay / Valentino home) → V-500 `#D30AD7`.
- **All other pods** (Banking, Explore, Credit, Activity) → pure WHITE `#FFFFFF`.
- Cards: white bg + `box-shadow: 0 2px 32px rgba(0,0,0,0.05)`. The subtle shadow on white IS what gives the floating effect. If you can't see it in a screenshot, that's a screenshot fidelity problem, not a design problem — don't "fix" it by graying the page.
- Inactive nav circles: `rgba(0,0,0,0.12)` bg + WHITE glyph.

**Retraction (FX10–FX14, R23 fix-it-2)**: an earlier "R23 fix-it" pass introduced slate-10 page bgs for card-stacked pods to make shadows visible. **User overruled** — slice never has gray. The fix-it pass also introduced a span-overlap status-bar coloring algorithm (light if any overlap with V-500) and an inline-SVG fallback for missing Figma assets. **All three retracted.** See `reference_calibration_log.md` § "R23 fix-it-2" for the full retraction trail.

### App bar is fixed; content scrolls UNDER it
- App bar uses `position: sticky; top: 0`. Content area scrolls beneath. App bar gets a subtle bottom shadow (`0 6px 8px rgba(0,0,0,0.05)`) once content has scrolled past 1px.
- Use the shared `AppBar` + `usePageScroll(scrollRef)` from `slice-app-proto/src/components/AppBar.jsx`. Don't reinvent per-page app bars.
- Canonical AppBar Figma: node `3:38` in `PNUz3Dr9KSlFJSnsXsC0nL`. L0 variant (`678:454`) for pod homes, Standard variant (`679:2330`) for L1+ surfaces.

### Bottom nav — Apple Dock model
- Items in NATURAL order (Banking · Explore · Pay · Credit · Activity), never reordered.
- Selected item lands at viewport center via row TRANSLATION (not item swap).
- Selected = larger (40→64) + V-500 glyph on white circle.
- NO vertical lift — selected sits on the same baseline as inactives.
- Pay-active special (72px ring around inner) only on COMMITTED active (post-drag-release). During drag visually-active Pay shows the standard 64px white circle.
- Variant theming (white-gradient vs V-500 immersive) follows COMMITTED active, not in-drag visuallyActive — switches instantly on release, no mid-drag bg flash.
- Inactive icons: WHITE glyphs (not slate-dark).
- Bg/color swap on selection is INSTANT (no mid-tween gray); size still tweens for the smooth grow.

### Internal nomenclature

- **"Valentino home"** = the Payments L0 brand-immersive screen (#D30AD7 V-500 page with the custom keypad dialer). Internally on the slice team, the payment screen is the canonical *home* — not Banking. Pay is the default landing state for slice users. Treat "Valentino home" and "Payments L0" interchangeably; the former is preferred in design conversations because it captures both the surface identity (V-500 / Valentino purple) and the role (home).
- **Pay is HOME.** When wiring routing defaults, building protos, or sketching first-launch flows: Pay is the initial active state, not Banking.

### Proto cross-cutting rules (R23 fix-it-2 additions, 2026-05-29)

**Bottom nav inactive circles — PER-SLOT variant (R23 fix-it-2-cont-4, 2026-05-29)**:

Each nav slot determines its OWN variant based on which page is under its center x-coordinate, NOT a global "nav variant" tied to any single state. User direction: "only on the valentino BG, even when transitioning" — the white-alpha + V-500-glyph aesthetic applies wherever the underlying page is V-500, even mid-drag.

- **Slot over a `light` page** (Banking, Explore, Credit, Activity): bg `rgba(0,0,0,0.10)`, fg `rgba(0,0,0,0.55)`. Slate-on-white medallion + slate glyph. (R23 fix-it-2-cont-5: bumped from `0.06 / 0.45` — the earlier values were too faint to read on white at typical browser-scaled sizes.)
- **Slot over a `dark` page** (Pay/Valentino home): bg `rgba(255,255,255,0.30)`, fg `#D30AD7` (V-500 — same color as the page background). The glyph reads as "punched out" of the white-alpha medallion. The ₹3K balance text is also `#D30AD7` in this state.

**Implementation**: each `Slot` uses `useMotionValueEvent` on both `navX` (the nav row's translation) and `pagerX` (the page pager's translation) to compute its viewport x and look up which page is under it. The slot writes `data-slot-variant="immersive"` or `"standard"` to its own DOM ref; CSS keys off that attribute. Mid-drag the variants are heterogeneous — slots on the V-500 half show immersive, slots on the white half show standard. Continuous, never invisible.

**R23 fix-it-2-cont-7 — flex+gap layout, no SLOT_WIDTH.** Earlier rounds used a uniform `SLOT_WIDTH` grid (85 → 83 → 81). With different circle sizes (44 inactive / 64 active), uniform slots create ASYMMETRIC edge-to-edge spacing: two adjacent inactives have `SLOT_WIDTH - 44 = 37` gap, but adjacent active+inactive have `SLOT_WIDTH - 54 = 27` gap. User noticed: "the space between 2 deselected bottom nav tabs seems more than the space between the center selected one and the ones besides it". The math means uniform slots **CAN NEVER** give uniform edge-to-edge with different sizes. Fix: switch to `display: flex; gap: 20px` layout. Each slot is its natural circle diameter (44 / 64 / 72 pay-committed). The gap is the constant edge-to-edge distance. Item centers are computed dynamically based on which item is active (active grows from 44 to 64 → trailing items shift right by 20px). `targetXFor(visualActive, committedActive)` returns the row translation that places the active item's center at viewport center.

The global `data-variant=immersive` flag (tied to committed `active === 'pay'`) is still used for gesture-bar color + label-color flips, but the per-slot variant overrides the inactive-circle styling.

**Earlier approaches retracted**: "variant follows visuallyActive globally" (failed: white-alpha invisible on white-half during drag), "variant follows committed active globally" (failed: Valentino-half slots still slate during drag from white pod). Per-slot variant is the only correct decomposition because the nav spans multiple pages mid-drag.

**Keypad on Valentino home respects the page gutter +8px breathing room.** Earlier rule had the keypad with `padding: 0 24px`. R23 fix-it-2-cont-5: bumped to `padding: 0 32px` per user direction ("the keypad is too stretched, maybe I can have an extra 8 px padding on the left and right"). The 32px gutter tightens the digit cluster so the keypad reads as a grouped element rather than column-aligned with the Request|Transfer row below.

**AppBar background is TRANSPARENT** (not `#FFFFFF`). The bar is `position: sticky; top: 0` over the scrolling page. Bg transparent so the page bg cascades through; the elevation shadow (`0 6px 8px rgba(0,0,0,0.05)`) is the visual marker of "I'm now floating because content scrolled past me". Earlier hardcoded white bg created a hard horizontal line at the top of the page that the user found jarring.

**Explore bento — column heights must match.** The 2×2 grid's second row has INVITE (left, single 148px card) paired with stacked CREDIT SCORE + AUTOPAY (right). For the right column to align with the left, each ExploreSmall = `(148 - CARD_GAP)/2 = 66`. The `CARD_GAP` between stacked cards stays 16. Total right column = 66 + 16 + 66 = 148 ✓. Don't bump ExploreSmall above 66 — it breaks the bento alignment.

**Phone shell fit-scale uses ResizeObserver + window.resize together.** Window resize alone misses container resizes (devtools toggle, browser zoom, parent-frame resize in embeds). Padding kept tight (8px) so the chassis always finds room to render at full or scaled. Initial `setState` reads window dims inline to avoid a flash-of-full-size on first paint. See `reference_proto_patterns.md` § "useFitScale hook" for the updated implementation.

**Proto-calibrated type sizes (Explore L0).** Canonical Figma renders the Explore card titles at H4 (16/20M). At our proto's scaled-down browser viewport, that felt too small. Bumped one DLS step up to H3 (20/24M). Bill avatars 48×48 (was canonical 40), bill icons 24×24 (was canonical 20). This is a deliberate proto-only deviation, NOT a calibration of the canonical DLS — the DLS values stay 16/20M / 40 / 20 for product builds at native iOS scale.

**Agentation: install + wire is MANDATORY.** Verify `package.json` lists `agentation@^3.0.2` and `src/main.jsx` renders `<Agentation ... />` as a sibling of `<App />`. Without this, the user can't click-annotate the proto and the feedback loop breaks. Verify after any `npm install` or scaffold change.

### Cross-cutting craft checklist (R23 fix-it-2, run BEFORE marking any L0 done)

Per-component recipes alone don't catch cross-cutting failures. Every L0 build / refactor MUST pass this checklist before claiming done:

1. **Page bg from App.jsx** — outermost L0 div is `background: 'transparent'`. The `App.jsx PAGE_BG` map sets pure WHITE for every non-immersive pod, V-500 for Pay. (Anti-pattern: gray / slate-10 / off-white page bg — slice has zero gray surfaces.)
2. **L0 wrapper structure** — `<div style={{position:'relative', overflow:'hidden'}}>` → scroll container → BottomFade sibling. Three layers. (Anti-pattern: BottomFade inside scroll container, `order:999` on non-flex parent.)
3. **BottomFade present on white pages** — Banking / Explore / Credit / Activity all have `<BottomFade color="#FFFFFF" />` (or the pod's actual bg). Pay does NOT.
4. **Type tokens from canonical Figma response** — the `get_design_context` response has a `These styles are contained in the design` block. Copy values verbatim BEFORE writing components. Token name "h4" in your code is meaningless if its value doesn't match the canonical frame.
5. **Asset fetched from Figma, not approximated** — every glyph / icon / illustration referenced in JSX has been fetched from the canonical Figma node (via `get_design_context` asset URL or `get_screenshot`). NEVER approximate with inline SVG when the asset exists in Figma. If a previously-fetched asset doesn't render (empty PNG, transparent), re-fetch via `get_screenshot` of the node directly — that returns a clean rendered PNG. (Anti-pattern: shipping an inline SVG approximation in place of a real Figma asset because the asset "looked broken".)
6. **AppBar profile avatar 40×40 with NO outline/ring** — pure 40×40 photo, `border-radius: 9999`, no border, no outer wrapper container, no subtle stroke. The tap-target is the avatar itself.
7. **Status bar variant + page bg in sync** — every pod in `PAGE_BG` has a matching `STATUS_VARIANT` entry. Dark variant only on V-500-immersive pods.
8. **Status bar color logic = CENTER-POINT sampling** — each status element's color = the variant of the page whose viewport span contains the element's center x-coordinate. Dark over white, light over Valentino. Hard cut at the page boundary. (Anti-pattern: span-overlap "any dark overlap → LIGHT" — flips the white-side icons to invisible too early.)
9. **Phone centering uses 3-layer position:fixed + 50/50 + translate** scaffold. NOT flex-center with transform-scale.
10. **Failed/pending txn states use corner-badge avatar** (regular monogram + 16×16 status badge bottom-right). NOT solid-red-circle or amber-ring as the WHOLE avatar.
11. **Side-by-side canonical Figma check** — list every chrome element from the canonical frame, walk down it after build, confirm each visible. Refactors must not silently remove canonical chrome.
12. **Bottom nav per-slot variant** — each slot tracks the page under ITS viewport center via `useMotionValueEvent` on navX + pagerX, writes `data-slot-variant="immersive"|"standard"` to its DOM ref, CSS keys off that attribute. Mid-drag the row is heterogeneous (some slots immersive, some standard). NEVER use a single global variant for the nav — the nav spans multiple pages during drag.
13. **Keypad respects page-padding gutters** — `padding: 0 24px` + `justify-content: space-between`, aligning the keypad row width with the action-button row below.
14. **Agentation installed + wired** — `package.json` has `agentation@^3.0.2`; `main.jsx` renders `<Agentation />` as a sibling of `<App />`.
15. **AppBar background prop** — default `transparent` (page bg cascades through). Pods that need a solid bg (e.g. Activity, where the sticky search bar below the AppBar makes transparency look weird) pass `background="#FFFFFF"` explicitly. Banking/Explore/Credit keep default transparent.
16. **Explore bento column heights match** — ExploreSmall height = 66 so 2×66 + 16 gap = 148, equal to INVITE card height.
17. **Phone fit-scale uses ResizeObserver + window resize together** — padding 8, initialize state inline to avoid flash-of-full-size, requestAnimationFrame-debounced.
18. **Card drop-shadow visibility** — `0px 4px 24px 0px rgba(0,0,0,0.08)` (was `0 2px 32px rgba(0,0,0,0.05)`). The 5% alpha shadow was invisible on pure white; 8% with shorter blur is subtle but reads.
19. **Bottom nav layout = `display: flex; gap: 20px`** (R23 fix-it-2-cont-7). NO uniform SLOT_WIDTH grid. Items are their natural circle diameter (44 inactive / 64 active / 72 pay-committed). Edge-to-edge gap between any two adjacent items is exactly 20px. Earlier uniform-slot approach (85 → 83 → 81) is RETRACTED — it can't give symmetric edge-to-edge with different sizes.
20. **Phone shell centering uses `display: grid; place-items: center`** + responsive `useFitScale`. Scaffold: outer position:fixed inset:0 grid stage → inner sized to scaled dims → grandchild un-scaled with `transform: scale()` from top-left. Phone scales down when browser is smaller than 440×952; renders at native otherwise. Always centered.
21. **Slice DLS icons fetched from canonical Figma nodes**, not approximated with inline SVG. Eye open `586:138`, eye closed `586:132` — saved to `public/assets/icons/slice_eye_*.png`. AppBar's `EyeOpenGlyph` / `EyeClosedGlyph` exports render the `<img>` directly.
22. **Valentino app bar canonical (R23 fix-it-2-cont-6, Figma node `885:19901`)**: row padding `8px 20px 8px 16px`. LEFT = "Check balance" pill with 1px white-20 border + `8/16` padding + 14/20R white text. RIGHT cluster (gap 8): audio button (48 hit-area → 40 circle + 1px white-30 border → 20×20 glyph), avatar button (48 hit-area → 40 photo + 1px white-30 border). The Valentino avatar KEEPS its white-30 ring — that differs from the no-ring rule on standard variants because the canonical Figma shows it.

If any item fails → fix before claiming done, AND surface why the skill didn't catch it earlier (so this checklist gets a new line).

See `reference_anti_patterns.md` § "R23 fix-it" and § "R23 fix-it-2 retractions" for the failure modes. See `reference_proto_patterns.md` § "R23 fix-it" for the patterns themselves.

## Defaults (token-efficient, slice brand voice)

These hold for every interaction routed through this skill — they don't need to be re-stated per task:

- **Lowercase "slice"** always (never "Slice", even sentence-initial in copy)
- **Rubik only**, two weights (Regular 400, Medium 500). Never Inter, SF Pro, Bold, Light.
- **No emojis** in shipped UI — neither in Avatar glyphs, button labels, list rows, nor illustration roles. Slice line icons only.
- **Indian number grouping**: `₹1,00,000` not `₹100,000`. ₹ touches the digit (no space).
- **Brand voice**: short, friendly, simple. No corporate filler.
- **Output style**: answer first, lists/tables over paragraphs for structured info, no sycophantic openers / closers.

When the user explicitly asks for verbose or alternate behaviour, follow them — these are defaults, not gates.

## Quick reference: when to read which file

Don't load all references at once. Read on demand based on the task. **Per-pod aggregator files are the preferred load path for pod-specific tasks** — they're synthesized, surface-first, with anti-patterns paired to recipes. Use them as the primary lookup; only load deeper component refs if you need anatomy detail the pod file doesn't carry.

### Primary load paths (most slice tasks)

| Task | Read |
|---|---|
| **Designing / building a Banking screen** (Savings, FD, monies, Atom sub-product) | `references/reference_pod_banking.md` |
| **Designing / building a Payments screen** (V-500 dialer, action pills, Pay person, PIN, confirmation, transition envelope) | `references/reference_pod_payments.md` |
| **Designing / building a Credit screen** (Credit L0, Credit Card L1 limit dashboard, repayment dialer, utilisation, slice in 3, autopay) | `references/reference_pod_credit.md` |
| **Designing / building an Explore screen** (Recharge & bills card, 2×2 grid, Rewards, Spark, May Spends, Invite) | `references/reference_pod_explore.md` |
| **Designing / building an Activity screen** (txn list, txn detail L2, Action centre, search, filter) | `references/reference_pod_activity.md` |
| **Designing / building a Bills screen** (Recharge L1, My bills L2, Manage sheet) | `references/reference_pod_bills.md` (sub-pod under Explore) |
| **Cross-cutting / judge mode / brand voice** | `references/reference_pod_cross_cutting.md` (HARD rules, slice-slop test, motion + a11y + perf cross-cuts) |
| **Understanding a flow** (how surfaces connect into journeys) | `references/reference_flows.md` (god view — every major flow end-to-end) |
| **Tracing where a feature lives** (native home + secondary triggers) | `references/reference_entry_points.md` |
| **Interaction primitives** (button press, page transitions, drag, stagger) | `references/reference_interaction_layer.md` |
| **Product mental model** ("if you've never seen slice, build it") | `references/reference_slice_product_model.md` |

### Deeper / specific (load when pod file isn't enough)

| Task | Read |
|---|---|
| **Building in Figma** (any `use_figma` call) | `references/reference_figma_build.md` (component registry, scripts, hard rules, token cheatsheet) |
| Need an icon | `references/reference_dls_iconography.md` (taxonomy). Resolution order: copy local → pull from DLS Figma → **if truly missing, generate a flagged SVG placeholder** per `references/reference_slice_asset_generation.md` (proto context only; product builds still never generate). |
| Need an illustration | `slice-design-suite/illustrations/` (10 PNGs extracted, 12+ pending) + `references/reference_dls_illustrations.md` (catalog + usage patterns). **If asset NOT on disk: generate a flagged raster placeholder** via Gemini/Nano-Banana (free tier) per `references/reference_slice_asset_generation.md` (proto context only). Convention: **circle** for big center heroes (~120-200px), V-100 (`#F4E5F8`) fill; any reasonable shape for smaller spots, sized to canonical. Always `gen_`-prefix + log in `GENERATED_ASSETS.md`. If Gemini is unavailable, fall back to dull dummy + `<!-- ILLUSTRATION-MISSING: name -->` and say so. Product builds: never generate. |
| Composing a screen layout (full recipe with anti-patterns) | `references/reference_dls_screen_layouts.md` (every L0/L1/L2/empty/error recipe, ~1100 lines) |
| Anti-pattern check before shipping | `references/reference_anti_patterns.md` |
| Specific component spec (anatomy, sizes, states) | `references/reference_dls_<component>.md` (30 files — appbar, avatar, buttons, button_group, cards, chips, accordion, badge, bottom_nav, bottomsheet, carousel, controls, corner_radius, colors, dialer, dividers, dot_indicator, elevation, error_states, file_upload, footer_header, iconography, input_field, list_items, pills, pin_field, progress, search, section_header, slider, snackbar, spacing, tabs, tags, tooltip, top_header, user_action_banners) |
| Specific token (color / spacing / radius / elevation) | `references/reference_dls_<topic>.md` |
| Motion vocabulary (durations, easings, choreographies) | `references/reference_motion.md` |
| Dark mode / theming (dark tokens, icon-vs-illustration theme-safety, CSS-var mechanism, Figma dark refs) | `references/reference_dark_mode.md` |
| Performance constraints | `references/reference_performance.md` |
| Accessibility rules | `references/reference_accessibility.md` |
| Exploration techniques (clip-path, blur, momentum, springs) | `references/reference_exploration_patterns.md` |
| Project-local memory pattern | `references/reference_project_memory.md` + `.slice-design/project.md` if present |
| Craft philosophy | `references/reference_craft_principles.md` |
| Calibrated digest (single-page rule index — STALE since 2026-05-21) | `references/reference_calibrated_digest.md` (regenerate via /update-slice-design) |
| Starting a new slice web proto (Vite + agentation + DLS primitives) | `references/reference_web_proto.md` |
| Specific calibrated rule's history | `references/reference_calibration_log.md` (append-only audit, R1-R21) |
| `figma-use` Plugin API call | `figma:figma-use` SKILL.md ONLY. **Do not load figma-use's references/** |

## Sub-commands (routing)

When the user opens a task with one of these verbs (or types them into the conversation), follow the matching workflow. No verb = general design invocation = apply defaults + the right reference for the surface in focus.

| Verb | Category | What it does | Read |
|---|---|---|---|
| `build [screen]` | Build | Plan → resolve gallery IDs → 1 `use_figma` call → screenshot verify | this file + `feedback_*.md` + relevant `reference_dls_*.md` |
| `iterate [frame]` | Build | Clone existing frame, swap props for variants — never hand-build elements | `feedback_reuse_existing.md` |
| `judge [frame]` | Evaluate | "Is this slice?" review against calibrated rules + anti-patterns | `reference_calibrated_digest.md`, `reference_anti_patterns.md` |
| `audit [frame]` | Evaluate | Walk every calibrated rule against the frame, list violations | `reference_calibrated_digest.md` |
| `recipe [screen-type]` | Build | Return the calibrated recipe (L0 / balance L1 / confirm / pay / etc.) | `reference_dls_screen_layouts.md` |
| `proto [name]` | Build | Scaffold a new slice web proto with DLS primitives | `reference_web_proto.md` |
| `motion [target]` | Enhance | Apply slice motion choreography (Spark reveal, push left/right, campaign-pill reveal etc.) | `reference_motion.md` |
| `explore [brief]` | Enhance | Propose novel patterns that keep HARD rules locked + remix soft ones. Pull from emil-design-eng techniques (clip-path, blur, springs, asymmetric timing). | `reference_exploration_patterns.md`, `reference_motion.md` |
| `extract [path]` | Maintain | Sweep a slice project (or recent Figma work) for patterns that should be promoted into the global skill. Outputs a diff against current refs. | `reference_calibration_log.md` (append entry on commit) |
| `status` | Maintain | Show current calibration round + active project memory + drift candidates flagged since last calibrate. | — |
| `calibrate` / `sweep` | Maintain | Calibrate = A/B pair loop (rule-tuning). Sweep = batch reference-frame extraction (faster, multi-file). Both invoke `slice-design-calibrate` companion. | (suite companion) |

If the user invokes `calibrate` or `sweep`, hand off to the `slice-design-calibrate` skill. Don't duplicate those flows here.

### state-design-choices-before-build

In `build` mode (and ideally `iterate` too), verbalize the recipe + components + tokens **before** executing in Figma. One sentence:

> "Building Atom L1 returning-user home. Recipe: App bar Standard chevron back + 'atom' title + centred Display hero + mid-screen Primary 'Create atom' + active atoms list + 'SUGGESTED FOR YOU' section + 2 suggested atom cards. Components: AppBar/Standard, TopHeader, Button/Primary, Card/Outline, ListItem with progress bar. Tokens: V-500 progress, slate-10 list bg. Confirm before execute?"

Why: catches recipe mismatches (wrong L0 vs L1, wrong app bar type, wrong CTA anchoring) before a `use_figma` call has built the wrong screen. The user can correct the recipe in one line instead of correcting a built frame.

## Absolute bans (match and refuse)

If you're about to write any of these in slice UI, rewrite the element differently. These are calibrated bans — they were tested and rejected.

- **Capital-S "Slice"** — always lowercase, even sentence-initial. BUT lowercase is for PRODUCT/BRAND NAMES ONLY (slice, spark, monies, slice atom, slice health cover) — even mid-sentence. Everything else is SENTENCE CASE (capital first letter): headings, titles, questions, CTAs, list labels, settings rows — "Choose your cover", "You're covered", "Recharge & bills", "All settings", "Add money". Do NOT lowercase the whole UI. (R24 cont-31 — verified across L0 pods + Core PDP in Figma.)
- **Emoji as Avatar glyph or in CTA leading-icon slot** — slice line icons only
- **Red-fill Primary button** for destructive actions — use a dialog with neutral Primary, or Tertiary with red text
- **Right-chevron `›` in non-row contexts** (column headers, rows that already have a CTA / switch). Valid: tap-the-whole-row callouts. Invalid: redundant trailing affordance.
- **Arrow + sign together on trend deltas** (`↑ +12%`). Pick one — arrow alone preferred.
- **`+` prefix on credit / received amounts** — use Positive Green colour alone, no `+`. Credits read as green; debits stay neutral.
- **Rainbow / multi-stop gradients** (>2 stops). The Payments brand gradient (Valentino → Blue) and the Rewards leaderboard gradient (Valentino-pink → coral) are the only sanctioned 2-stop gradients.
- **Fire / hot / winning state in orange or yellow** — slice fire is Valentino purple.
- **Cashback on subtle-bg** — cashback strip is always a white card (subtle-bg = banners only).
- **List section header directly after App bar** — needs a content row between.
- **In-card header with leading icon or hairline below** — cards are clean inside.
- **Centred body text on cards** — left-aligned only.
- **Page-edge full-bleed cards** — 24px page padding, always.
- **Standalone illustration in list-leading position** — use Avatar container.
- **Avatar component for quick-action icon tiles** — use white + outline-subtle circle + V-500 (action tiles) or slate (content-grid tiles) glyph.
- **Generic line-art illustration in empty / confirmation states** — slice ships real branded illustrations (asteroid + diamonds for rewards, grainy gradient tick for paid). Generic placeholders are prototyping only.
- **Avatar with `✓` glyph as confirmation indicator** — confirmation success uses the textured grainy gradient tick (~120px).
- **Week-summary hero block on Activity L0** — L0 is App bar + search + filter trailing + flat transaction list with relative-date subtitles. Week-summary is L2/L3.
- **Cancel button on a slice bottom sheet** — sheet dismisses via scrim tap. Bottom sheets carry the Primary action only.
- **Tabs as a navigation / filter pattern** — use pills.
- **Banking home as a separate L0 with quick-action grid + accounts list** — Banking home IS the Savings/Balance L1 screen.
- **Coloured-card hero on Credit L0** — Credit L0 is a **white L0 Large card** with spends total + recent txn rows + blue-subtle in-card callout, plus a Medium card promo (super card mascot illustration). App bar L0 with "Credit" + photo Avatar trailing. The chevron-back + pie-chart-icon + centred-hero pattern is a downstream analytics surface, not L0. See `reference_dls_screen_layouts.md` § L0 pod home recipes.
- **Brand-gradient "Pay anyone" banner as Payments L0 hero** — Payments L0 is the **full-bleed Valentino-500 dialer takeover** (solid V-500 fill, "Check balance" pill top-left, voice + Avatar trailing, massive centred ₹0, UPI ID chip, slice custom keypad, Request + Transfer Tertiary pills bottom). Solid V-500, NOT a gradient. The Standard app bar + form rows + QUICK PAY circles pattern is the downstream Pay flow (L1/L2), not L0. See `reference_dls_screen_layouts.md` § L0 pod home recipes.

- **PNG icon when a vector exists** — slice icons are SVGs. Inline the SVG with `currentColor` so it themes (light/dark) for free. A PNG icon can't recolour and breaks in dark mode. Check the icon library / Figma vector export before ever using a raster icon. (See `reference_dark_mode.md`.)
- **Hand-drawn / traced / approximated icon** — NEVER invent an icon. Use the official DLS icon (library Figma node `582:257`; most are already in `public/assets/` + `public/assets/icons/`), or a clear DUMMY placeholder if truly missing. Tracing a logo from a screenshot, drawing polygons to mimic a mark, or few-shot-generating a UI glyph are ALL banned. Inlining an official Figma path and swapping `fill`→`currentColor` for theming is fine (same geometry). (Hard, user-directed 2026-05-30 — stated angrily, multiple times.)
- **Illustration with a baked-in background** — illustrations must be transparent-bg. A white/light baked background shows as a white box on dark surfaces. slice splits assets light/dark in Figma; use the dark variant or a transparent export on a themed tile. (See `reference_dark_mode.md`.)

Source for every entry: `references/reference_anti_patterns.md` + `reference_calibrated_digest.md` (calibrated through 2026-05-17 round 11).

## The slice-slop test

If someone could look at a screen and say "AI made this slice mockup" without doubt, it's failed. Specific slop signatures for slice:

- Anything from the "Absolute bans" list above
- Generic capitalised "Slice" branding
- Section-header / page-header / list-header inconsistencies (mixed Bold and List on the same screen)
- Cards that don't have shadow chrome OR don't have outline-border chrome (one of the two — slice has both variants for different contexts, but never bare)
- Quick-action tiles with V-500 fill avatars on a content-grid card (that's the action-tile pattern leaking into the content-grid pattern)
- A confirmation screen with a chevron back instead of an X close
- A payment-to-person screen on white (the brand-immersive V-500 fill IS the screen for known UPI ID payee)
- "+₹X" notation on a credit-amount row
- A search bar with the filter icon trailing on a screen that's NOT Activity L0
- An emoji in any production surface

Run this test before declaring a slice mockup done.

## Workflow

### Building new screens (`build`)
1. **PLAN** (no Figma calls) — Parse brief, pick screen type, list components + content, check `reference_calibrated_digest.md` for the screen recipe if one exists
2. **RESOLVE** (0 calls) — Look up gallery IDs from the registry below
3. **EXECUTE** (1 `use_figma` call) — Build entire screen using gallery components
4. **VERIFY** (1 `get_screenshot` call) — Confirm visual output. Run the slice-slop test.

### Iterating on existing designs (`iterate`)
1. **SCREENSHOT** — Capture the base frame, understand the layout
2. **INSPECT** — Get node tree to identify components, instances, and custom elements
3. **PLAN** — For each variation, list what changes. Map EVERY new element to a DLS component.
4. **CLONE** — Duplicate the base frame(s) into a named Section
5. **MODIFY** — For each clone, import DLS components via `importComponentSetByKeyAsync` and modify. NEVER hand-build elements.
6. **VERIFY** — Screenshot each variation. Run the slice-slop test.

### Judging an existing frame (`judge` / `audit`)
1. **SCREENSHOT** — Get the frame
2. **SCAN** — Run `reference_calibrated_digest.md` mentally against the frame
3. **REPORT in Before/After/Why table format**:

   | Before (what's there) | After (what slice does) | Why |
   |---|---|---|
   | Capital-S "Slice" in header | lowercase "slice" | Brand voice — capitalising reads as generic startup, not slice |
   | Filter button: slate-10 fill + V-500 glyph | white fill + outline-subtle border + slate glyph | Canonical Activity L0 anatomy (cal:2026-05-28). Earlier slate-10 spec was drift. |
   | List section header directly under App bar | Insert content row (Top header / Balance) between, OR switch to Bold header | Grey List bg touching App bar reads as malformed second nav |

   Severity tag each row: **(hard)** = absolute ban / brand voice violation, **(soft)** = deviates from default recipe with no clear reason, **(minor)** = polish/consistency. Cite the reference file + section for each (hard) and (soft) row.

## Gallery (12× faster than import)

A `🗄️ Component Gallery` page (ID: `6422:340`) in the DLS working copy (`PNUz3Dr9KSlFJSnsXsC0nL`) has pre-imported DLS instances. Use `getNodeById(galleryId)` → `createInstance()` instead of `importComponentSetByKeyAsync`.

**Fallback:** If building in a DIFFERENT file (not the working copy), use `importComponentSetByKeyAsync` with the `componentKey` from the registry.

**DO NOT load `figma:figma-use` reference docs.** This skill contains everything needed. Only load `figma-use` SKILL.md for the `use_figma` tool definition, then STOP — skip all `references/` files.

## When building in Figma — load the build reference

For any task that calls `use_figma` (build a screen, iterate variants, modify an existing frame), **also load `references/reference_figma_build.md`**. It has:
- Full component registry (componentKey + galleryId + setProperties + variants for 30+ components)
- Script templates (L1 list screen recipe)
- Script rules (hard rules + API quirks — preventing the common figma-execute failure modes)
- Layout / token / typography cheatsheet
- Screen recipe shorthand
- Exploration-mode rules

For judging / auditing / applying calibrated rules without writing to Figma, you don't need this file — the main SKILL.md + the calibrated_digest + the matching `reference_dls_<component>.md` are enough.

## Figma file references

- DLS 2.0 published library: `ncGqxiE6wUOqgOURwHx6Hp` (where components import from at runtime)
- DLS 2.0 working copy: `PNUz3Dr9KSlFJSnsXsC0nL` (gallery for fast `createInstance`)
- DLS 2.0 reference / spec file: `HBoBlZN1CrmVwO3rXeZjY0` (cited as "source" in tokens / icon refs)
- Gallery page ID (in working copy): `6422:340`

## Project memory (optional per-project layer)

If a project has `.slice-design/project.md` at the repo root, load it after this SKILL.md and before any reference files. Why: per-project decisions (e.g. "Atom uses 3D illustrations as hero", "this proto uses Tertiary slate-10 pills for secondary actions") shouldn't pollute the global skill but should be honored within that project's context.

Template structure (see `reference_project_memory.md`):

```
## Project Direction
Brief context + 1-line direction (e.g. "Atom — goal-based savings, 3D mascot brand, lighter motion vocabulary")

## Established Patterns
- Component X uses variant Y (with brief reasoning)

## Exploration Decisions
- Departure from default recipe with reasoning + frame reference
```

Global calibrated rules + references override; project memory **extends**. Project memory never overrides HARD rules (brand voice, palette, anti-patterns). When project memory and a soft rule conflict, project memory wins within that project.

## Calibration + sweep (skill maintenance)

Two maintenance methods, both companion-driven by `slice-design-calibrate`:

- **`calibrate`** — A/B pair loop. Best for: tuning a specific disputed rule, settling an ambiguous design choice. Slow but precise.
- **`sweep`** — Bulk reference-frame extraction across multiple Figma files (product files, DLS molecules, new project files). Best for: keeping the skill in sync with active product work, catching drift, adding new recipes at scale. Faster but trades user-validated rigor for LLM judgment + your batched review.

When the user invokes `/update-slice-design`, asks to "calibrate slice", "sweep slice", or "triage the calibration log", hand off to the **`slice-design-calibrate`** companion skill. Don't duplicate those flows here.
