#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# new-proto.sh — scaffold a NEW slice proto via the EXTENSION SEAM (R24 cont-35).
#
# The project INHERITS the whole skill app (phone shell, dark-mode, status bar,
# bottom nav, ALL base pods, Explore) live, and owns only a thin App wrapper +
# its feature pod(s). Nothing base can drift, ever.
#
# Project-owned (copied/generated):  App.jsx (thin), main.jsx, local.css,
#                                     pods/<feature>/, configs, public/assets/
# Linked from the skill (propagate):  AppBase.jsx (→ skill App.jsx),
#                                     components/ icons/ utils/ tokens.js index.css
# Inherited via AppBase's own imports (NOT copied): all base pods + Explore.
#
# Usage: new-proto.sh <project-name> [dest-parent-dir] [port]
#   dest-parent default: ~/claude/slice/projects ; port default: 8790
# ---------------------------------------------------------------------------
set -euo pipefail

KIT_PROTO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NAME="${1:?usage: new-proto.sh <project-name> [dest-parent] [port]}"
DEST_PARENT="${2:-$HOME/claude/slice/projects}"
PORT="${3:-8790}"
DEST="$DEST_PARENT/$NAME"
[ -e "$DEST" ] && { echo "ERROR: $DEST already exists"; exit 1; }
mkdir -p "$DEST/src/pods" "$DEST/public/assets"

# 1. Configs (project-owned copies). NOT App.jsx, NOT pods/ — those inherit.
for f in package.json index.html tailwind.config.js postcss.config.js; do
  [ -f "$KIT_PROTO/$f" ] && cp "$KIT_PROTO/$f" "$DEST/$f"
done

# 2. Kit (symlinks) — the design-system layer that propagates from the skill.
"$KIT_PROTO/scripts/link-kit.sh" link "$DEST" >/dev/null

# 3. AppBase = symlink to the skill App; thin local App.jsx wraps + injects.
ln -sfn "$KIT_PROTO/src/App.jsx" "$DEST/src/AppBase.jsx"
cat > "$DEST/src/App.jsx" <<EOF
// $NAME = the slice skill app + your feature, via the extension seam (cont-35).
// Inherit EVERYTHING (shell, theme, all base pods, Explore); inject ONLY your
// feature. Add your feature pod under src/pods/<feature>/ and wire it here:
//   extraL1            — { name: { Component, slideFrom: 'right'|'bottom' } }
//   exploreExtraCards  — [<YourEntryCard/>]  (full-width cards after Recharge)
//   initialPod         — 'pay' | 'banking' | 'explore' | 'credit' | 'activity'
// NEVER edit AppBase / the linked kit here — those are the shared skill app.
import React from 'react';
import AppBase from './AppBase.jsx'; // symlink → skill proto src/App.jsx

export default function App() {
  return <AppBase /* extraL1={{}} exploreExtraCards={[]} initialPod="pay" */ />;
}
EOF

# 4. Entry (main.jsx) — fonts + linked index.css + local.css + App + Agentation.
cat > "$DEST/src/main.jsx" <<'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Agentation } from 'agentation';
// Self-hosted Rubik (bundled) — NEVER the Google Fonts CDN (blocked on slice's
// corporate network; Medium-500 silently falls back).
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/500.css';
import '@fontsource/rubik/600.css';
import '@fontsource/rubik/700.css';
import App from './App.jsx';
import './index.css';   // linked kit base CSS (theme vars + resets) — propagates
import './local.css';   // tiny project-local overrides, loaded AFTER the kit

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Agentation
      onAnnotationAdd={(a) => console.log('[agentation] add', a)}
      onSubmit={(payload) => console.log('[agentation] submit', payload)}
    />
  </React.StrictMode>,
);
EOF

printf '/* project-local base overrides, loaded AFTER the kit index.css. Keep tiny. */\n' > "$DEST/src/local.css"

# 5. Assets — copied + synced (the inherited shell + base pods reference them).
rsync -a "$KIT_PROTO/public/assets/" "$DEST/public/assets/"

# 6. vite.config — fs.allow lets Vite serve the symlinked kit + AppBase; own port.
cat > "$DEST/vite.config.js" <<EOF
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const KIT_PROTO = '$KIT_PROTO';
export default defineConfig({
  plugins: [react()],
  server: { port: $PORT, fs: { allow: ['.', KIT_PROTO] } },
});
EOF

# 7. Name the package.
if [ -f "$DEST/package.json" ]; then
  sed -i '' "s/\"name\": *\"[^\"]*\"/\"name\": \"$NAME\"/" "$DEST/package.json" 2>/dev/null \
    || sed -i "s/\"name\": *\"[^\"]*\"/\"name\": \"$NAME\"/" "$DEST/package.json"
fi

echo "✓ scaffolded $DEST (extension-seam, port $PORT)"
echo ""
echo "  cd \"$DEST\""
echo "  npm install --cache \"\$TMPDIR/npm-cache-$NAME\""
echo "  npm run dev"
echo ""
echo "Build your feature pod under src/pods/<feature>/ and wire it in src/App.jsx"
echo "(extraL1 / exploreExtraCards / initialPod). Everything else inherits live."
