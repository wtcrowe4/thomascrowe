# thomascrowe-portfolio

Personal portfolio for Thomas Crowe. The work casebook is the main attraction:
`/` has an overview and `/work/<slug>` has one page per case study.

## Stack

- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first config in `app/globals.css`)
- **Framer Motion** for section reveals; respects reduced motion, and a `noscript`
  rule keeps content visible without JS
- Deploy: **Netlify**, from `main`. Treat a push to `main` as going live.

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Layout

```
app/
  page.tsx               home page sections
  work/[slug]/page.tsx   case study pages, statically generated
  sitemap.ts, robots.ts
data/
  casebook.ts            case study content; public copy, so no code, hostnames,
                         IPs, pricing rules or customer names
components/
  Casebook.tsx, Flow.tsx casebook overview and pipeline diagram
  GolfLab.tsx            Sawgrass placeholder, marked in progress
  sawgrass17/            3D scene synced from the standalone repo; NOT mounted
public/
  work/                  case study screenshots; fake demo data only
scripts/
  sync-sawgrass.sh       re-sync the scene from the standalone repo
```

`.site-container` in `globals.css` sets the page width and gutter. Use it for every
section so left edges stay aligned.

## Sawgrass 17 scene

The scene is developed in its own repo, `sawgrass_17`. Files under
`components/sawgrass17/`, `lib/golf/`, `public/hdr/` and `public/textures/` are copies.
Edit them there, not here. It stays unmounted until Thomas gives an explicit go.

```bash
SAWGRASS_SRC=~/Projects/sawgrass_17 bash scripts/sync-sawgrass.sh [ref]
```

The sync reads committed files through `git archive`, from an allow-list only, and
records the source commit in `components/sawgrass17/SOURCE.txt`.
