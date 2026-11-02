# thomascrowe-portfolio

Personal portfolio for Thomas Crowe. Cutting-edge stack, signature 3D golf
analytics piece (TPC Sawgrass No. 17), built to grow into a Gaussian-splat
playground.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first config in `app/globals.css`)
- **React Three Fiber 9** + **drei 10** for the 3D shot tracers
- **Framer Motion** for hero animations
- Deploy target: **Netlify** (free) — `netlify.toml` already wired

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Layout

```
app/
  layout.tsx         root layout, metadata, globals
  page.tsx           composes all sections
  globals.css        tailwind v4 theme + utilities
components/
  nav.tsx            sticky top nav
  hero.tsx           landing hero
  about.tsx          short bio block
  projects.tsx       selected work grid
  contact.tsx        social links
  footer.tsx         version + credit
  GolfLab.tsx        Golf section; mounts the 3D scene via SawgrassStage
  sawgrass17/        3D scene (synced from the standalone repo, see below)
    SawgrassStage.tsx    lazy-load gate, poster, mobile/reduced-motion fallback  [portfolio-owned]
    Sawgrass17Embed.tsx  visitor HUD + off-screen frame-loop pause              [portfolio-owned]
    overrides/           replacements copied over synced parts                  [portfolio-owned]
    Sawgrass17.tsx, parts/   the scene                                          [synced]
  golf/
    overhead-map.tsx     Canvas 2D heatmap + dots (unmounted; older data shape)
    stats-panel.tsx      strokes-gained bars + outcome distribution (unmounted)
data/
  sawgrass17-sample-shots.ts  illustrative shots used by the scene  [synced]
  sawgrass-17.ts     older illustrative data for overhead-map / stats-panel
lib/
  golf/              scene geometry, palette, elevation, shore, types  [synced]
  types.ts           Shot / HoleData / StrokesGained types (older components)
public/
  hdr/, textures/    scene assets, vendored locally  [synced]
  sawgrass17/poster.jpg  static poster / fallback (screenshot of the scene)
scripts/
  sync-sawgrass.sh   re-sync the scene from the standalone repo
```

## Sawgrass 17 scene — sync from the standalone repo

The 3D model is developed in its own repo (`sawgrass_17`, WSL `~/dev/sawgrass_17`).
Everything marked **[synced]** above is a copy: edit it there, not here. To pull
the latest committed `main`:

```bash
# inside WSL, from the portfolio root
bash scripts/sync-sawgrass.sh            # or: bash scripts/sync-sawgrass.sh <ref>
# from Windows PowerShell, in the portfolio root
wsl.exe -d Ubuntu-26.04 -e bash scripts/sync-sawgrass.sh
```

Then `npx tsc --noEmit && npm run build`, check the Golf section, commit.

- Reads committed files via `git archive` (never the working tree), from an
  allow-list only: no `reference-photos/`, no scraped shot data, no dev HUD,
  no API routes. `SAWGRASS_SRC` overrides the source path.
- Synced folders are mirrored (upstream deletions propagate), then
  `components/sawgrass17/overrides/parts/*` is copied on top. Today that stubs
  `GaussianSplat` so the splat library is not a dependency.
- Guards fail the sync on remote asset URLs (vendor them under `public/`) and on
  package imports missing from `package.json`.
- `components/sawgrass17/SOURCE.txt` records the source commit.
- If the scene changes visibly, regenerate `public/sawgrass17/poster.jpg`
  (1440x900 JPEG screenshot of the scene with `intro={false}`).
- three is pinned to the scene repo's version (^0.184) with `@types/three`
  0.171.0, mirroring the scene repo (newer @types releases are barrel-only).

## Golf section — design notes

The signature piece is the Sawgrass 17 viz. Architecture:

1. **`HoleData`** is the contract. Today it's hand-authored
   (`data/sawgrass-17.ts`); tomorrow it's a `loadHole('tpc-sawgrass-17')`
   call against DataGolf's free tier. The components don't care.
2. **`Sawgrass3D`** renders a stylized broadcast-style hole and animates
   parabolic tracers from tee to landing point, color-coded by outcome.
   OrbitControls let visitors fly around.
3. **`OverheadMap`** is a 2D canvas with a real Gaussian heatmap (per-pixel
   sum of Gaussian kernels around landing positions) plus shot dots and the
   pin marker.
4. **`StatsPanel`** shows the field's strokes-gained breakdown and outcome
   distribution for the currently filtered shot set.
5. The pin selector at the top of the section filters all three views in
   sync, so visitors can compare Sunday-pin chaos vs. Saturday-back-pin
   carnage.

## v2 roadmap (per design session)

- Replace stylized hole with a Gaussian splat capture
  ([Spark](https://github.com/worldlabs/spark) renderer)
- Layer Google Maps Photorealistic 3D Tiles for satellite ground reference
- DataGolf API live data (free tier → proxy via Next.js Route Handler)
- "Play" page: pick handicap, pick hole, AI caddie (Claude API), random
  outcome generation weighted by tour averages

## Deploy (Netlify)

```bash
npm i -g netlify-cli
netlify init           # link to repo, pick site
netlify deploy --prod  # or just push — Netlify builds on git push
```
