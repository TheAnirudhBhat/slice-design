#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# link-kit.sh — wire slice proto projects to the skill's canonical KIT by
# REFERENCE (symlinks), so design-system updates in the skill proto propagate
# to every project automatically (next reload), with zero per-project sync.
#
# THE KIT = the design-system layer that must stay consistent across every
# project derived from this skill:
#     src/components  src/icons  src/utils  src/tokens.js  src/index.css
# PROJECT-OWNED (never linked — feature content is per-project):
#     src/App.jsx  src/main.jsx  src/pods/  public/assets/
#
# Usage:
#   link-kit.sh link        /abs/path/to/project  # link kit dirs/files + register
#   link-kit.sh doctor      /abs/path/to/project  # report which kit paths are linked
#   link-kit.sh materialize /abs/path/to/project  # symlinks -> real copies (portable export)
#   link-kit.sh relink-all                        # re-link EVERY registered project
#                                                 # (run after the kit gains a NEW file)
#   link-kit.sh list                              # print the registry
#
# After `link`, set the project's vite.config.js  server.fs.allow  to include the
# printed skill path (Vite must be allowed to serve files outside the project root
# through the symlinks).
# ---------------------------------------------------------------------------
set -euo pipefail

KIT_PROTO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"   # the skill's proto/
KIT_SRC="$KIT_PROTO/src"
REGISTRY="$KIT_PROTO/proto-registry.txt"                       # one abs project path per line

KIT_PATHS=(components icons utils tokens.js index.css)

register() {  # add an abs project path to the registry, deduped
  touch "$REGISTRY"
  grep -qxF "$1" "$REGISTRY" || echo "$1" >> "$REGISTRY"
}

do_link() {   # $1 = abs project path
  local proj="$1" proj_src="$1/src"
  [ -d "$proj_src" ] || { echo "ERROR: $proj_src not found"; return 1; }
  for p in "${KIT_PATHS[@]}"; do
    local target="$KIT_SRC/$p" link="$proj_src/$p"
    [ -e "$target" ] || { echo "  skip   src/$p (not in kit)"; continue; }
    rm -rf "$link"; ln -s "$target" "$link"
    echo "  linked src/$p"
  done
}

cmd="${1:-}"
case "$cmd" in
  link)
    PROJ="$(cd "${2:?usage: link-kit.sh link /abs/path/to/project}" && pwd)"
    echo "linking $PROJ"; do_link "$PROJ"; register "$PROJ"
    echo ""
    echo "NEXT: in $PROJ/vite.config.js set:"
    echo "  server: { fs: { allow: ['.', '$KIT_PROTO'] } }"
    echo "registered → $REGISTRY"
    ;;
  relink-all)
    [ -f "$REGISTRY" ] || { echo "no registry yet"; exit 0; }
    while IFS= read -r proj; do
      [ -z "$proj" ] && continue
      [ -d "$proj/src" ] || { echo "MISSING project: $proj (skipped)"; continue; }
      echo "→ $proj"; do_link "$proj"
    done < "$REGISTRY"
    echo "done. All registered projects re-linked to the current kit."
    ;;
  doctor)
    PROJ="$(cd "${2:?usage: link-kit.sh doctor /abs/path/to/project}" && pwd)"
    for p in "${KIT_PATHS[@]}"; do
      link="$PROJ/src/$p"
      if [ -L "$link" ]; then echo "LINKED   src/$p -> $(readlink "$link")"
      elif [ -e "$link" ]; then echo "LOCAL *  src/$p (real file/dir, NOT linked — run \`link\`)"
      else echo "MISSING  src/$p"; fi
    done
    ;;
  materialize)
    # materialize <project> [relpath]
    #   relpath given → UNLINK just that one path so the project can EXPLORE/diverge
    #     it (e.g. `src/components` or `src/AppBase.jsx`). The skill proto is NEVER
    #     edited — we copy its CURRENT file into the project; the project owns the copy.
    #   no relpath → make the whole kit standalone (portable export).
    PROJ="$(cd "${2:?usage: link-kit.sh materialize /abs/path/to/project [relpath-to-unlink]}" && pwd)"
    TARGET="${3:-}"
    if [ -n "$TARGET" ]; then
      link="$PROJ/$TARGET"
      [ -L "$link" ] || { echo "ERROR: $TARGET is not a symlink (already local, or wrong path)"; exit 1; }
      real="$(readlink "$link")"; rm "$link"; cp -R "$real" "$link"
      echo "UNLINKED $TARGET → now project-owned; explore freely. Skill proto UNTOUCHED."
      echo "(To re-inherit later: rm it + re-run \`link\` / \`relink-all\`.)"
    else
      for p in "${KIT_PATHS[@]}"; do
        link="$PROJ/src/$p"
        if [ -L "$link" ]; then real="$(readlink "$link")"; rm "$link"; cp -R "$real" "$link"; echo "copied src/$p (now standalone)"; fi
      done
      echo "Project fully standalone — kit updates will NO LONGER propagate."
    fi
    ;;
  list) [ -f "$REGISTRY" ] && cat "$REGISTRY" || echo "(registry empty)";;
  *) sed -n '2,30p' "$0"; exit 1 ;;
esac
