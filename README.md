# LUMEN (frontend)

React + TypeScript storefront for LUMEN — a curated, six-device smartphone shop. Talks to the
LUMEN API (separate Django backend/repo) over REST.

This repo is public-safe: no secrets, no business logic, just UI.

## Stack
- Vite + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first config, see `src/index.css`)
- Framer Motion for animation
- TanStack Query for data fetching/caching
- React Router for routing

## Local setup

```bash
npm install
cp .env.example .env       # point VITE_API_BASE_URL at your backend
npm run dev
```

Runs at `http://localhost:5173`. Requires the backend running at the URL in `.env`
(defaults to `http://localhost:8000/api`).

## Pages

- `/` — Home: hero + full featured grid
- `/collection` — searchable, sortable product grid
- `/product/:slug` — product detail with image gallery and specs

## Design system

Tokens live in `src/index.css` under `@theme`: a near-black "ink" background, a spectral
violet → coral → mint gradient used sparingly as the signature accent (dividers, hover
states, gradient text), Space Grotesk for display type, Inter for body copy, and JetBrains
Mono for labels/specs/prices — leaning into the idea of a phone spec sheet.

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Deployment

See `DEPLOYMENT.md` for step-by-step instructions (Vercel is the recommended host; any
static host works since this is a pure client-side SPA hitting a REST API).
