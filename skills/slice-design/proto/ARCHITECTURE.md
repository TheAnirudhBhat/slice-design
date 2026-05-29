# slice-app-proto — architecture

A **1:1 React mirror of the slice app**, owned by the `slice-design` skill. Figma is canonical; this proto is a downstream artifact that the skill keeps in sync via calibration sweeps.

## Why this exists

The skill needs a runnable, inspectable, modifiable artifact — not just markdown. Markdown describes recipes; code IS the recipe. When an agent has to compose a new screen, copying the nearest proto page + modifying it beats reconstructing from a text description.

Inspired by the shadcn/ui pattern (component-code-is-the-documentation), applied to slice's design system.

## What this is — and isn't

| It is | It isn't |
|---|---|
| A complete-as-possible React replica of slice's live consumer app | A production codebase. No real APIs, no real auth, no real money flow. |
| The skill's canonical "this is what slice looks like" reference | A unilateral source of truth. **Figma is canonical** — this is downstream. |
| A stakeholder demo surface — tap-through to feel the system | A pixel-perfect Figma export. Approximations are fine where they don't matter; precision matters for recipes. |
| Updated as live app ships (Figma → sweep → proto regen) | Manually-maintained per change. Updates happen via skill sweeps. |
| A foundation new screens get composed from | A static screenshot library. Components are real React, fully interactive. |

## Source-of-truth rule

**Figma wins.** When proto and Figma diverge, the proto re-syncs from Figma — not the other way around. The `/calibrate-proto` sub-command (planned) will:

1. Sweep Figma for canonical frames per screen
2. Compare to the matching proto page
3. Surface diffs
4. Regenerate the proto page from the latest Figma

Why this direction: design ownership stays with the design tool. Devs/agents don't accidentally "win" arguments by editing the proto.

## Directory layout

```
slice-app-proto/
├── ARCHITECTURE.md         ← you are here
├── README.md               ← run instructions
├── package.json
├── vite.config.js
├── tailwind.config.js
├── index.html
├── public/
│   └── assets/             ← extracted Figma assets (icons, illustrations, photos)
│       ├── nav/            ← bottom nav icons (banking_active.svg, …)
│       ├── illustrations/  ← grainy_gradient_tick.png, atom_orb_3d.png, …
│       └── icons/          ← DLS line icons
└── src/
    ├── main.jsx
    ├── App.jsx             ← root: bottom nav + page router
    ├── index.css           ← Tailwind + slice DLS tokens + custom CSS
    ├── _internal/          ← dev-only: page index, screen catalog
    │   └── Index.jsx       ← dev nav to every screen with search
    ├── components/         ← reusable DLS primitives
    │   ├── BottomNav.jsx
    │   ├── AppBar.jsx
    │   ├── Pager.jsx
    │   ├── L0Card.jsx
    │   ├── DisplayAmount.jsx
    │   ├── … (one per DLS molecule)
    ├── icons/              ← per-icon React components (currentColor-driven)
    │   ├── NavIcons.jsx
    │   ├── ActionIcons.jsx
    │   ├── … (per family)
    ├── pods/               ← all screens, organized by pod
    │   ├── banking/
    │   │   ├── L0.jsx           ← Banking home
    │   │   ├── savings/
    │   │   │   ├── L1.jsx
    │   │   │   ├── L1_addMoney.jsx
    │   │   │   └── …
    │   │   ├── atom/
    │   │   │   ├── L1_ftux.jsx
    │   │   │   ├── L1_returning.jsx
    │   │   │   └── …
    │   │   ├── fd/
    │   │   │   ├── L1_amount.jsx
    │   │   │   ├── L1_summary.jsx
    │   │   │   └── …
    │   │   └── monies/…
    │   ├── payments/
    │   │   ├── L0_dialer.jsx
    │   │   ├── L1_payperson.jsx
    │   │   ├── L1_pin_slice.jsx       ← slice account → slice PIN UI
    │   │   ├── L1_pin_npci.jsx        ← external bank → NPCI SDK UI
    │   │   ├── L1_qrScanner.jsx
    │   │   ├── L1_paste.jsx
    │   │   ├── L1_confirmation.jsx
    │   │   ├── L1_envelope_stage1.jsx ← brand-immersion pink
    │   │   ├── L1_envelope_stage2.jsx ← card stack reveal
    │   │   ├── L1_envelope_stage3.jsx ← resolve / tick
    │   │   └── …
    │   ├── credit/
    │   │   ├── L0.jsx
    │   │   ├── L1_card.jsx
    │   │   ├── L2_repayment_dialer.jsx
    │   │   └── …
    │   ├── explore/
    │   │   ├── L0.jsx
    │   │   ├── spark/L1.jsx
    │   │   ├── rewards/L1.jsx
    │   │   ├── invite/L1.jsx
    │   │   ├── bills/L1.jsx
    │   │   └── …
    │   ├── activity/
    │   │   ├── L0.jsx
    │   │   ├── L2_txnDetail.jsx
    │   │   ├── L2_txnDetail_failed.jsx
    │   │   ├── L2_txnDetail_pending.jsx
    │   │   ├── L2_txnDetail_initiated.jsx
    │   │   └── …
    │   └── profile/
    │       ├── overlay.jsx        ← V3 — QR-as-identity hero
    │       └── …
    └── shared/             ← cross-pod shared state (active pod, mock data)
        ├── store.js        ← lightweight zustand-style store
        └── mockData.js     ← user, balances, atoms, txns, etc.
```

**Naming conventions:**
- File name = the screen's level + descriptor: `L0.jsx`, `L1_addMoney.jsx`, `L2_txnDetail_failed.jsx`
- One file = one screen (or one tight variant family). Don't bundle.
- Multi-variant screens (e.g. txn detail 4 states): separate files per variant. Easier to diff vs. Figma per-frame.
- Components live in `components/`, reused across pods.

## How the skill regenerates a proto page

Long-form workflow (lives in `/calibrate-proto` slash command, not yet built):

1. Skill takes a Figma frame URL (e.g. `?node-id=8534:23336` = Atom returning-user L1)
2. Uses `get_design_context` to pull React+Tailwind code + asset URLs
3. Maps the frame to a target proto path: `src/pods/banking/atom/L1_returning.jsx`
4. Reads existing file (if any) for context
5. Generates the new page using DLS tokens + slice patterns (not raw Tailwind from Figma export)
6. Downloads referenced assets to `public/assets/`
7. Writes file, runs proto, screenshots it
8. Compares screenshot to Figma render — if drift > threshold, iterate
9. Updates `cal:YYYY-MM-DD` comment header in the file

Frame-ID to proto-path map lives in `src/_internal/figma-map.json` (to be created — flat JSON dictionary).

## How a new screen is added

```bash
# 1. From inside the slice-design skill
/proto add <figma-frame-url> --to <pod>/<path>

# Behind the scenes: the workflow above
```

## How drift is detected

The `/eval-proto` command (planned):
- Walks `figma-map.json`
- For each entry: re-screenshots the Figma frame + the proto page
- Pixel-diffs them (with tolerance for known-OK differences: real photos, dynamic data, etc.)
- Reports drift > threshold

## Coverage

Initial coverage target (R23):
- ✅ Bottom nav (proven component — test of the architecture)
- ✅ Banking L0 + Payments L0 (two L0 archetypes — white-gradient + brand-immersive)
- ✅ Pay person + PIN (slice) + PIN (NPCI) + confirmation envelope (validates the 3-stage transition)
- ✅ Txn detail 4 states (validates status-state family)

Subsequent rounds: backfill remaining L0s, then most-used L1s, then L2s.

## What lives in code vs. markdown

| Lives in code (this proto) | Lives in markdown (skill references) |
|---|---|
| Concrete screen recipes (Banking L0, Pay person, …) | Cross-cutting hard rules (no orange, lowercase slice, Rubik) |
| Component anatomy (BottomNav, AppBar, …) | Anti-patterns (slice-slop test, AI-mockup tells) |
| Motion durations + curves in actual transition code | Brand voice + craft principles |
| DLS tokens (colors, spacing, radii) in Tailwind config | God-view docs (flows, entry points, product model) |
| Per-screen data attributes (frame ID, cal: date) | Per-pod aggregator files (now: pointers into proto + the cross-cutting rules) |

**Net:** the markdown shrinks, the code grows. Recipes move from text descriptions to actual implementations.

## Open questions / TODO

- Routing strategy: react-router vs. URL-less internal state? Started with internal state for simplicity; revisit if deep-linking matters.
- Mock data: fixtures vs. generative? Start with hand-written fixtures in `shared/mockData.js`.
- agentation integration: install once stable per skill guidance.
- Storybook? Probably not separately — the `_internal/Index` page IS the catalog.
- How to handle device chrome: status bar, gesture nav, safe areas. Start: a fixed phone-frame container (390×844 iPhone 15) on dark bg.

---

Last updated: 2026-05-29 (R23 kickoff)
