#!/usr/bin/env bash
# check-drift — diff the INSTALLED skill (~/.claude/skills/slice-design) against
# the suite git repo (~/claude/slice/projects/slice-design-suite/slice-design).
# The installed copy is the live working surface; the suite repo is the git
# source of truth. They sync by hand, which has drifted before — this makes the
# gap visible. Run as part of the `status` sub-command.
#
# Usage: scripts/check-drift.sh [--quiet]
#   exit 0 = in sync, exit 1 = drift found

set -euo pipefail

INSTALLED="$HOME/.claude/skills/slice-design"
SUITE_CANDIDATES=(
  "$HOME/claude/slice/projects/slice-design-suite/slice-design"
  "$HOME/claude/slice/projects/slice-design-suite/skills/slice-design"
  "$HOME/claude/slice/projects/slice-design-suite"
)

SUITE=""
for c in "${SUITE_CANDIDATES[@]}"; do
  if [ -f "$c/SKILL.md" ]; then SUITE="$c"; break; fi
done
if [ -z "$SUITE" ]; then
  echo "✗ suite repo not found (looked under ~/claude/slice/projects/slice-design-suite)"
  exit 2
fi

QUIET="${1:-}"

# Compare the content that ships with the skill. Excludes runtime/derived dirs:
# node_modules, dist, .git, and proto public assets are compared by name only
# (binary diffs are noise; a name-level mismatch is still reported).
DIFF_OUT=$(diff -rq \
  --exclude node_modules --exclude dist --exclude .git \
  --exclude .DS_Store --exclude GENERATED_ASSETS.md \
  "$INSTALLED" "$SUITE" 2>&1 | grep -v '^Common subdirectories' || true)

if [ -z "$DIFF_OUT" ]; then
  echo "✓ installed skill and suite repo are in sync ($SUITE)"
  exit 0
fi

ONLY_INSTALLED=$(echo "$DIFF_OUT" | grep -c "^Only in $INSTALLED" || true)
ONLY_SUITE=$(echo "$DIFF_OUT" | grep -c "^Only in $SUITE" || true)
DIFFER=$(echo "$DIFF_OUT" | grep -c "^Files .* differ$" || true)

echo "✗ DRIFT between installed skill and suite repo"
echo "  installed: $INSTALLED"
echo "  suite:     $SUITE"
echo "  $DIFFER file(s) differ · $ONLY_INSTALLED only-installed · $ONLY_SUITE only-suite"
if [ "$QUIET" != "--quiet" ]; then
  echo
  echo "$DIFF_OUT" | sed 's/^/  /'
  echo
  echo "  → newer side wins per-file (check git log + file mtimes); sync changed"
  echo "    files INTO the suite repo and commit. Never git-init the installed dir."
fi
exit 1
