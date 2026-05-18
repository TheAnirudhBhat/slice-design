# slice web protos — defaults

When building a web proto for any slice screen / flow / variant (NOT Figma), start from this template. Avoids re-inventing the shell and ensures agentation, DLS tokens, and the phone frame are wired the same way every time.

Source: explore-base (`~/claude/slice/projects/explore-base/`), explore-react (`~/claude/slice/projects/explore-react/`), mem:project_explore_base.

## Stack

- **Vite 6** (or matching slice convention) + React 18 + Tailwind 3 (PostCSS)
- No Babel CDN. No Next.js for prototypes — that's for production.
- TypeScript optional; JSX (`.jsx`) is fine for protos
- Port: 8765 default; pick next free 876x if collision

## File layout

```
<proto-name>/
  package.json
  vite.config.js          (port 876x)
  tailwind.config.js      (content: src/**/*.{js,jsx,ts,tsx})
  postcss.config.js
  index.html              (mounts #root)
  public/assets/          (real Figma exports, never placeholders)
  src/
    main.jsx              (mounts <App />; agentation wired here)
    App.jsx               (the screen / flow under prototype)
    index.css             (Tailwind + DLS CSS variables on :root)
    dls/
      tokens.js           (semantic tokens — colours, spacing, type)
      primitives.jsx      (Button, Card, ListItem, Header, Divider, AppBar, Avatar, Chip)
    sections/             (per-section split when App.jsx exceeds ~600 lines)
```

## Phone shell

Outer device frame: **380×800**, 38px radius, with status bar (44px) and gesture nav (20px) baked in.
Inner screen: **360×780**, no radius (clipped by the device frame).

```jsx
<div className="device" style={{ width: 380, height: 800, borderRadius: 38, overflow: "hidden", background: "#000" }}>
  <StatusBar />
  <div className="screen" style={{ width: 360, height: 780, background: "#fff", margin: "0 auto" }}>
    {/* App bar → content → bottom nav */}
  </div>
  <GestureNav />
</div>
```

This 380/360 setup matches the explore-base proto. Don't deviate without reason.

## iOS native StatusBar (canonical, from explore-base)

The status bar is the **iOS-native shape** — 9:41 time on the left, signal bars + wifi + battery on the right. Height: 44px (iPhone-style). Foreground colour adapts to the surface beneath (black by default; white on dark/gradient L0 hero surfaces).

Copy this component into every new proto's `src/dls/StatusBar.jsx`:

```jsx
export function StatusBar({ color = '#000' }) {
  return (
    <div style={{
      height: 44, padding: '0 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      color, fontFamily: 'Rubik', fontSize: 16, fontWeight: 500,
    }}>
      <span>9:41</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {/* Signal bars — 4 ascending */}
        <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
          <rect x="0" y="7" width="3" height="4" rx="0.8" fill="currentColor" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.8" fill="currentColor" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.8" fill="currentColor" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.8" fill="currentColor" />
        </svg>
        {/* Wifi — 3 concentric arcs */}
        <svg width="16" height="13" viewBox="0 -2 16 13" fill="currentColor" style={{ overflow: 'visible' }}>
          <path d="M8 11 5.6 8.6a3.4 3.4 0 0 1 4.8 0L8 11z" />
          <path d="M11.6 6.4 13.4 4.6A7.4 7.4 0 0 0 2.6 4.6l1.8 1.8a4.8 4.8 0 0 1 7.2 0z" />
          <path d="M14.6 3.4 16 2A10.6 10.6 0 0 0 0 2l1.4 1.4a8.6 8.6 0 0 1 13.2 0z" />
        </svg>
        {/* Battery — 25×12 outline + 78% fill + nub */}
        <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 2 }}>
          <span style={{
            width: 25, height: 12, position: 'relative',
            border: '1px solid rgba(0,0,0,0.35)', borderRadius: 3.5,
            padding: 1.5, boxSizing: 'border-box',
          }}>
            <span style={{ display: 'block', height: '100%', width: '78%', background: 'currentColor', borderRadius: 1.5 }} />
          </span>
          <span style={{
            display: 'inline-block', width: 1.5, height: 4,
            background: 'rgba(0,0,0,0.35)', borderRadius: '0 1px 1px 0', marginLeft: 1,
          }} />
        </span>
      </span>
    </div>
  );
}
```

Pair with a **GestureNav** at the bottom (20px):

```jsx
export function GestureNav() {
  return (
    <div style={{
      height: 20, background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ width: 134, height: 5, borderRadius: 100, background: 'rgba(0,0,0,0.9)' }} />
    </div>
  );
}
```

Source: extracted verbatim from `~/claude/slice/projects/explore-base/src/App.jsx` L23–53, validated 2026-05-17.

## Agentation (mandatory for every proto)

`agentation@3.0.2` enables you to click any element on the page, annotate it, and emit structured markdown the user can paste back to me. **Every slice proto must wire it in `src/main.jsx`** as a sibling of `<App />`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Agentation } from 'agentation';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Agentation
      onAnnotationAdd={(a) => console.log('[agentation] add', a)}
      onSubmit={(payload) => console.log('[agentation] submit', payload)}
    />
  </React.StrictMode>
);
```

Callback-only mode is the default (logs to console). To sync with a local server, add `endpoint="http://localhost:4747"`.

## DLS tokens (CSS variables on :root)

`src/index.css` declares all DLS tokens once. Components reference them as `var(--token)`. Never inline raw hex.

```css
:root {
  /* Colour — primitives (full palette in slice/CLAUDE.md) */
  --v-50: #FAE2FA; --v-500: #D30AD7; --v-600: #A008A3;
  --slate-10: #F6F9FC; --slate-50: #EAEBED; --slate-500: #4E5866; --slate-900: #171A1F;
  --green-500: #00A63E; --red-500: #CE1D26; --blue-500: #2B6ACF; --orange-500: #FF9A17;

  /* Semantic */
  --text-primary: rgba(0,0,0,0.9); --text-secondary: rgba(0,0,0,0.7);
  --text-tertiary: rgba(0,0,0,0.5); --text-disabled: rgba(0,0,0,0.2);
  --bg-primary: #FFFFFF; --bg-secondary: var(--slate-10); --bg-disabled: var(--slate-50);
  --outline-bold: rgba(0,0,0,0.1); --outline-subtle: rgba(0,0,0,0.05);
  --overlay: rgba(0,0,0,0.3);

  /* Spacing */
  --s-3xs: 2px; --s-2xs: 4px; --s-xs: 8px; --s-s: 12px; --s-m: 16px;
  --s-l: 24px; --s-xl: 32px; --s-2xl: 40px; --s-3xl: 48px; --s-4xl: 64px;

  /* Radius */
  --r-s: 8px; --r-m: 16px; --r-l: 24px; --r-circle: 100px;

  /* Elevation */
  --elev-card:  0 2px 32px 0 rgba(0,0,0,0.05);
  --elev-above: 0 -6px 8px 0 rgba(0,0,0,0.05);
  --elev-below: 0  6px 8px 0 rgba(0,0,0,0.05);
}

body, html, #root { font-family: "Rubik", system-ui; font-weight: 400; }
```

Load Rubik from `https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap` in `index.html` — never use `next/font/google` in protos (sandbox blocks build-time CSS fetch, see mem:feedback_next_build_fonts_sandbox).

## DLS primitives (`src/dls/primitives.jsx`)

Hand-coded React components matching the Figma DLS spec. Use these instead of styled `<div>`s.

Minimum set every new proto should have copy-pasted in:
- `<AppBar />` — Standard, Search, L0 variants
- `<TopHeader />` — heading + amount (Display) + insight row
- `<SectionHeader type="list" | "bold" />` — see `reference_dls_section_header.md`
- `<ListItem type="standard" | "transaction" | "setup" />`
- `<Card type="large" | "medium" | "small" | "explore" />`
- `<Button type="primary" | "secondary" | "tertiary" | "text" />`
- `<Divider type="inset" | "full-bleed" | "big" />`
- `<Avatar size="40" color="valentino" type="icon" />`
- `<Chip />` and `<Tag />`

Each primitive reads from `--var(...)` tokens; never hardcoded.

## Run conventions

```bash
npm install
npm run dev       # serves on configured port
npm run build     # production bundle to dist/

# Sandbox-disabled bash needed for fonts (see mem:feedback_next_build_fonts_sandbox)
# Use cache override per proto to avoid EPERM:
npm install --cache "$TMPDIR/npm-cache-<proto-name>"
```

## Anti-patterns specific to web protos

- ❌ Tailwind CDN script tag in `index.html` (the explore-base style) — only acceptable for single-file `<index.html>` protos with React Babel CDN, not in a Vite project
- ❌ Placeholder icons / colour blocks for assets the user has in Figma
- ❌ Hand-styled buttons that "look right" — always use `<Button />` from `dls/primitives.jsx`
- ❌ Skipping agentation because "it's just a quick proto"
- ❌ Importing icon libraries (lucide, heroicons, phosphor) — assets come from Figma payload

## When to NOT use this template

- One-off HTML mockups for design exploration (huashu-design / canvas-design territory)
- Production code (uses Next.js + the real slice repo conventions, not this proto setup)
- Non-phone surfaces (web dashboard, admin tools — use frontend-design or impeccable)
