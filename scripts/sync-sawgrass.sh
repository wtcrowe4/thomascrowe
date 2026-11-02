#!/usr/bin/env bash
# sync-sawgrass.sh -- pull the Sawgrass 17 scene from the standalone repo.
#
# Usage (from the portfolio root, inside WSL Ubuntu-26.04):
#   bash scripts/sync-sawgrass.sh [ref]
# From Windows PowerShell:
#   wsl.exe -d Ubuntu-26.04 -e bash scripts/sync-sawgrass.sh [ref]
#
# Env: SAWGRASS_SRC  path to the standalone repo (default ~/dev/sawgrass_17)
#      ref           git ref to copy from (default: main)
#
# Reads COMMITTED files from <ref> via `git archive`, never the working tree,
# so half-finished work in the standalone repo (or its other worktrees) can't
# leak in. Only an explicit allow-list is copied -- reference-photos/, data
# scraped from third parties, the dev HUD, API routes and scripts never come
# across (this repo is public).
#
# Mapping (standalone -> portfolio):
#   components/golf/Sawgrass17.tsx  -> components/sawgrass17/Sawgrass17.tsx
#   components/golf/parts/*         -> components/sawgrass17/parts/   (mirrored)
#   lib/golf/*                      -> lib/golf/                      (mirrored)
#   data/sample-shots.ts            -> data/sawgrass17-sample-shots.ts
#   public/hdr/*, public/textures/* -> public/hdr/, public/textures/  (mirrored)
# Then components/sawgrass17/overrides/parts/* is copied over parts/ -- the
# portfolio's deliberate replacements (e.g. a no-op GaussianSplat, so the
# splat library is not a dependency here).
#
# Portfolio-owned files that this script never touches:
#   components/sawgrass17/Sawgrass17Embed.tsx, components/sawgrass17/overrides/,
#   components/GolfLab.tsx, public/sawgrass17/ (poster).
set -euo pipefail

REF="${1:-main}"
SRC="${SAWGRASS_SRC:-$HOME/dev/sawgrass_17}"
DEST="$(cd "$(dirname "$0")/.." && pwd)"

[ -d "$SRC/.git" ] || [ -f "$SRC/.git" ] || { echo "sync: no git repo at $SRC (set SAWGRASS_SRC)" >&2; exit 1; }
[ -f "$DEST/package.json" ] || { echo "sync: $DEST is not the portfolio root" >&2; exit 1; }

SHA="$(git -C "$SRC" rev-parse --short "$REF")"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

git -C "$SRC" archive "$REF" \
  components/golf/Sawgrass17.tsx \
  components/golf/parts \
  lib/golf \
  data/sample-shots.ts \
  public/hdr \
  public/textures \
  | tar -x -C "$TMP"

# Mirror a directory: wipe the destination first so files deleted upstream go.
mirror() { # <from> <to>
  rm -rf "$2"
  mkdir -p "$2"
  cp -R "$1/." "$2/"
}

mkdir -p "$DEST/components/sawgrass17"
cp "$TMP/components/golf/Sawgrass17.tsx" "$DEST/components/sawgrass17/Sawgrass17.tsx"
mirror "$TMP/components/golf/parts" "$DEST/components/sawgrass17/parts"
mirror "$TMP/lib/golf"             "$DEST/lib/golf"
mirror "$TMP/public/hdr"           "$DEST/public/hdr"
mirror "$TMP/public/textures"      "$DEST/public/textures"
mkdir -p "$DEST/data"
cp "$TMP/data/sample-shots.ts" "$DEST/data/sawgrass17-sample-shots.ts"

OVR="$DEST/components/sawgrass17/overrides/parts"
if [ -d "$OVR" ]; then
  cp -R "$OVR/." "$DEST/components/sawgrass17/parts/"
fi

cat > "$DEST/components/sawgrass17/SOURCE.txt" << EOF
Synced by scripts/sync-sawgrass.sh -- do not hand-edit the synced files.
source: sawgrass_17 @ $REF ($SHA)
EOF

# --- Guards -------------------------------------------------------------------
fail=0
# 1. Anything that could only have come from reference/press imagery.
if find "$DEST/public/hdr" "$DEST/public/textures" -iname '*reference*' -o -iname '*getty*' | grep -q .; then
  echo "sync: reference/press imagery found under public/ -- refusing" >&2; fail=1
fi
# 2. Remote asset fetches (a CDN fetch has broken this scene before).
if grep -rnE "(files|url|load)\(?=?\s*[\"'\`]https?://" \
     "$DEST/components/sawgrass17/Sawgrass17.tsx" "$DEST/components/sawgrass17/parts" "$DEST/lib/golf" \
     | grep -v '^\s*//' ; then
  echo "sync: remote asset URL above -- vendor it under public/ instead" >&2; fail=1
fi
# 3. Bare package imports the portfolio does not depend on.
pkgs="$(grep -rhoE "from [\"'][^\"'.@/][^\"']*[\"']|from [\"']@[^/\"']+/[^\"']+[\"']" \
          "$DEST/components/sawgrass17" "$DEST/lib/golf" "$DEST/data/sawgrass17-sample-shots.ts" \
        | sed -E "s/from [\"']//; s/[\"']$//" | grep -v '^@/' \
        | sed -E 's#^(@[^/]+/[^/]+|[^@/][^/]*).*#\1#' | sort -u)"
for p in $pkgs; do
  if ! node -e "const p=require('$DEST/package.json');process.exit((p.dependencies||{})['$p']||(p.devDependencies||{})['$p']?0:1)"; then
    echo "sync: scene imports '$p' which is not in package.json -- add it or override the part" >&2; fail=1
  fi
done

echo "synced sawgrass_17 $REF ($SHA) -> $DEST"
[ "$fail" -eq 0 ] || { echo "sync: guard(s) failed -- review before committing" >&2; exit 1; }
echo "next: npx tsc --noEmit && npm run build"
