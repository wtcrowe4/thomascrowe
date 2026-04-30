# Thomas Crowe — Next.js Portfolio

Next.js 16 (App Router) + React 19 + TypeScript strict + Tailwind v4 (CSS-first, `@theme` tokens in `globals.css`).

## Stack

- **Next.js 16** App Router
- **React 19**
- **TypeScript** strict mode
- **Tailwind CSS v4** — no `tailwind.config.js`; tokens live in `app/globals.css` under `@theme`
- **framer-motion** v12 for scroll/in-view animations
- **three.js** for the hero neural network (vanilla, drop-in compatible with `@react-three/fiber` if you migrate later)
- Netlify ready via `@netlify/plugin-nextjs`

## Getting started

```bash
npm install
npm run dev
```

## Structure

```
app/
  globals.css     # @theme tokens + base styles + utility classes (.btn, .tag, .eyebrow, .serif-accent)
  layout.tsx      # font preconnect + Google Fonts
  page.tsx        # composes all section components

components/
  Nav.tsx
  Hero.tsx
  NeuralCanvas.tsx   # three.js hero background, stand-alone
  Ticker.tsx
  About.tsx
  Projects.tsx
  GolfLab.tsx        # placeholder for Sawgrass 17 splat + heatmap + SG stats
  Skills.tsx
  Experience.tsx
  Contact.tsx
  Footer.tsx
```

## Design tokens

All colors, fonts, and the container width live in `globals.css` under `@theme`. Reference them via Tailwind's auto-generated classes (`bg-[var(--color-surface)]`) or the CSS variables directly.

Current accent is `#fb923c` (orange). To change globally, update `--color-accent` in `app/globals.css`.

## Golf section — extension points

`components/GolfLab.tsx` is the placeholder. The two slots to wire up:

1. **`.golf-main`** (16:10 viewport) — drop in a Three.js / R3F canvas with the Gaussian splat + shot tracers
2. **`.golf-mini`** (1:1 viewport) — replace the inline SVG with a Google Maps top-down + heatmap + scatter points

Stats card pulls hardcoded values currently — wire to ShotLink data feed when ready.

## Netlify

`netlify.toml` is included. Drop the project folder in, point Netlify at it, and it should build cleanly with the official Next.js plugin.

## Notes

- **No GSAP** — animation work uses framer-motion to match your existing setup
- **No tailwind.config.js** — Tailwind v4 reads `@theme` from CSS directly
- The Three.js neural canvas is stand-alone (`NeuralCanvas.tsx`) — easy to replace with R3F if you'd rather keep the whole app in one renderer paradigm
