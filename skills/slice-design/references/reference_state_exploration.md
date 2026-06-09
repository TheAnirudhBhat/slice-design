# reference_state_exploration — control panels, user-state presets, playground

Added 2026-06-10 (ported from the aibanker-design playground workflow). Three
mechanisms that let the proto exercise STATES, not just the canonical
happy-path frame.

## Variant-vs-state doctrine (HARD for playground/debug surfaces)

- A **variant** is a structurally distinct version: different layout, different
  anatomy (AppBar `l0` vs `standard`).
- A **state** is any prop the component already exposes: `scroll`, `tone`,
  `size`, `disabled`, hidden-balance.
- **States are NEVER enumerated as separate variant chips.** A component with 5
  orthogonal props gets ONE panel with 5 controls, not 2^5 frozen variants —
  that's what lets you see real combinations ("scrolled AND dark AND
  high-balance") that a variant grid can't.
- If you're about to add a 4th "variant" chip, stop — check whether they're
  really states.

## ControlPanel (`proto/src/components/ControlPanel.jsx`)

Dev-chrome primitives (`Group`, `Chip`, palette `C`) shared by DebugPanel and
the playground — single source, theme-independent styling. Declarative hook:

```jsx
const [state, panel] = useControlPanel({
  tone: { kind: 'select', label: 'Tone', options: ['plain', 'subtle', 'chip'], default: 'chip' },
  scroll: { kind: 'switch', label: 'Scrolled', default: false },
  title: { kind: 'input', label: 'Title', default: 'Banking' },
});
// render {panel} in the rail; read state.tone etc. in the stage
```

Schema is captured on first render — declare it inline as a literal.

## User-state presets (`proto/src/data/userStatePresets.js`)

Whole-app user contexts, switched from the debug panel's **Persona** group
(`?debug` → Persona chips). Presets:

| id | Exercises |
|---|---|
| `canonical` | The exact values the calibrated screens were built with — DEFAULT; proto is pixel-identical to pre-preset behaviour |
| `new-user` | ₹0 balance, no FDs, empty activity — empty states |
| `high-balance` | ₹12,48,500, lakh+ FDs, long payee names — width/wrap |
| `behind` | Credit overdue — negative/urgent treatments |

Mechanics: `App.jsx` holds the preset and provides `UserStateContext`
(`src/user-state.js`); pods read `useUserState()`. The context default is the
canonical preset, so pods render correctly outside the provider too.

**Fixture discipline** (`proto/src/data/fixtures.js`): realistic INR data,
single source. Pods importing user-visible amounts/payees pull from fixtures
or the preset — never invent per-screen numbers inline for stateful surfaces.
Amounts are raw numbers rendered through `formatINR()`; dates are fixed
strings so screenshots stay reproducible.

**Wiring status (2026-06-10):** Banking L0 (savings balance, account mask) +
bottom-nav balance chip are wired as the exemplar. Other pods still hardcode
their canonical values — migrate them to `useUserState()` opportunistically
when a screen is next touched (or via a deliberate `cascade`); never as a
side-effect of project work.

**Done-gate addition:** a new stateful screen is validated against ALL presets
before it's called done — empty, lakh+, and overdue are exactly the states
static canonical frames never exercise.

## Playground (`proto/src/playground/Playground.jsx`)

Canonical-URL gallery, lazy-loaded dev chrome (zero cost to the clean app
bundle):

| URL | Shows |
|---|---|
| `/?playground` | first entry (Colors) |
| `/?playground=colors` | themed CSS-var swatches (light/dark stage toggle) |
| `/?playground=type` | Rubik scale (Display → Metadata) |
| `/?playground=avatar` | Avatar with size/tone/content/monogram controls |
| `/?playground=appbar` | AppBar l0/standard + scrolled elevation + eye |
| `/?playground=txn-rows` | transaction rows from fixtures (credit = green, no `+`) |
| `/?playground=screen:<pod>` | the FULL app at that pod — canonical per-screen screenshot URL |

Uses: screenshot-verify targets, calibration A/B material
(slice-design-calibrate can point pairs at playground URLs), dark-mode spot
checks, new-component state review before promotion.

Add an entry when a component gains calibrated rules worth exercising: extend
`ENTRIES` with `{ id, label, render }` where `render` returns `{ node, panel? }`
— `panel` (from `useControlPanel`) docks in the rail automatically.

## Browser-tool choice (ported rule)

- **Preview server** — DEFAULT for visual verification of proto changes
  (screenshot/snapshot/console/network, tied to the dev server).
- **DevTools-style inspection** — only to diagnose WHY something renders wrong.
- **Real browser (Claude in Chrome / Playwright)** — only when the task needs
  real browser state, or when the user asks.
- Respect the user's standing preference: don't auto-screenshot every change
  unless asked; the done-gate's screenshot step is for NEW screens / visual
  changes where verification was requested or is part of a build hand-off.
