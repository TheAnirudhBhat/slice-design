#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# new-proto.sh — scaffold a NEW slice proto project, BORN KIT-LINKED.
#
# Every project derived from this skill starts as a copy of the canonical app
# (the project-owned layer) with the design-system KIT symlinked back to the
# skill proto — so skill-proto updates propagate to it automatically, from day
# one. (R24 cont-32: "set this up from the start in every new project.")
#
# Usage:
#   new-proto.sh <project-name> [dest-parent-dir] [port]
#     dest-parent default: ~/claude/slice/projects
#     port default:        8790
#
# Result: <dest-parent>/<name>/ with
#   • project-owned (copied):  App.jsx, main.jsx, pods/, public/assets/, configs
#   • kit (symlinked → skill):  components/ icons/ utils/ tokens.js index.css
#   • vite.config.js with server.fs.allow including the skill path
#   • registered in proto-registry.txt (so `link-kit relink-all` covers it)
# ---------------------------------------------------------------------------
set -euo pipefail

KIT_PROTO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NAME="${1:?usage: new-proto.sh <project-name> [dest-parent] [port]}"
DEST_PARENT="${2:-$HOME/claude/slice/projects}"
PORT="${3:-8790}"
DEST="$DEST_PARENT/$NAME"

[ -e "$DEST" ] && { echo "ERROR: $DEST already exists"; exit 1; }
mkdir -p "$DEST"

# 1. Copy the canonical app (project-owned layer). Exclude heavy/local/skill-only
#    artifacts. The kit dirs ARE copied here, then replaced by symlinks in step 2.
rsync -a \
  --exclude node_modules --exclude dist --exclude scripts \
  --exclude proto-registry.txt --exclude package-lock.json \
  --exclude .git --exclude .claude \
  "$KIT_PROTO/" "$DEST/"

# 2. Symlink the design-system kit (link-kit rm's the copied kit paths first).
"$KIT_PROTO/scripts/link-kit.sh" link "$DEST" >/dev/null

# 3. Fresh vite.config.js — fs.allow lets Vite serve the symlinked files; own port.
cat > "$DEST/vite.config.js" <<EOF
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// src/{components,icons,utils,tokens.js,index.css} are SYMLINKS into the
// slice-design skill proto (the shared kit) — design-system updates propagate
// automatically. Vite must be allowed to serve those real paths (outside root).
const KIT_PROTO = '$KIT_PROTO';

export default defineConfig({
  plugins: [react()],
  server: { port: $PORT, fs: { allow: ['.', KIT_PROTO] } },
});
EOF

# 4. Name the package.
if [ -f "$DEST/package.json" ]; then
  sed -i '' "s/\"name\": *\"[^\"]*\"/\"name\": \"$NAME\"/" "$DEST/package.json" 2>/dev/null \
    || sed -i "s/\"name\": *\"[^\"]*\"/\"name\": \"$NAME\"/" "$DEST/package.json"
fi

echo "✓ scaffolded $DEST (kit-linked, port $PORT)"
echo ""
echo "  cd \"$DEST\""
echo "  npm install --cache \"\$TMPDIR/npm-cache-$NAME\""
echo "  npm run dev"
echo ""
echo "Then add your feature pod under src/pods/<feature>/ and wire its entry"
echo "point. Do NOT edit src/{components,icons,utils,tokens.js,index.css} — those"
echo "are the shared kit (edit them in the skill proto to update ALL projects)."
