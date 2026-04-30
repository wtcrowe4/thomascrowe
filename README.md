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
  golf/
    golf-showcase.tsx    section wrapper, pin selector, hover state
    sawgrass-3d.tsx      R3F scene — green, water, animated tracers
    overhead-map.tsx     Canvas 2D top-down with Gaussian heatmap + dots
    stats-panel.tsx      strokes-gained bars + outcome distribution
data/
  sawgrass-17.ts     illustrative shot data, schema-matched to DataGolf
lib/
  types.ts           Shot / HoleData / StrokesGained types
```

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
