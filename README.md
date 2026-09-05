# First Principles — 1-on-1 STEM Tutoring

Landing page for First Principles, one-to-one tutoring in Mathematics, Physics and
Chemistry for ambitious Form 2–4 students (Nairobi + online).

**Positioning:** good grades aren't the finish line — reasoning is. The site trains
trust in sequence: who teaches → grade vs degree → method → evidence → offer →
pricing → booking.

## Stack

React 19 + Vite + Tailwind CSS v4 + shadcn-style UI + Motion + lucide-react.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build & deploy

```bash
npm run build    # outputs dist/
```

`dist/` deploys anywhere as static files (relative asset paths). GitHub Pages
deploys automatically via `.github/workflows/pages.yml`. The Vercel production
target builds from `main`.

## Project layout

- `src/designs/design-b.jsx` — the landing page (all sections)
- `src/content.js` — every word on the site + pricing + FAQs + articles
- `src/components/` — gradient background, overlays, cookie banner, PWA/analytics helpers
- `public/gregory.png` — tutor photo · `public/manifest.webmanifest`, `sw.js` — PWA

## Contact channels (live on site)

- WhatsApp: https://wa.me/254745947704 (per-section prefilled messages in `content.js`)
- Email: gregorykimemiah@gmail.com
