<div align="center">

<img src="./docs/banner.svg" alt="LUMEN banner" width="100%" />

<br/>

![Status](https://img.shields.io/badge/status-archived-8a7fb0?style=for-the-badge)
![License](https://img.shields.io/badge/license-private-863bff?style=for-the-badge)
![Type](https://img.shields.io/badge/type-portfolio_project-47bfff?style=for-the-badge)

![React](https://img.shields.io/badge/React_19-1b1330?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-1b1330?style=flat-square&logo=typescript&logoColor=3178C6)
![Vite](https://img.shields.io/badge/Vite-1b1330?style=flat-square&logo=vite&logoColor=B73BFE)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-1b1330?style=flat-square&logo=tailwindcss&logoColor=38BDF8)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-1b1330?style=flat-square&logo=reactquery&logoColor=FF4154)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-1b1330?style=flat-square&logo=framer&logoColor=0055FF)
![React Router](https://img.shields.io/badge/React_Router_7-1b1330?style=flat-square&logo=reactrouter&logoColor=CA4245)
![Axios](https://img.shields.io/badge/Axios-1b1330?style=flat-square&logo=axios&logoColor=5A29E4)

</div>

<br/>

## Overview

**LUMEN** is a single-page storefront concept for a small, curated catalog of flagship smartphones. It is a **frontend engineering sample** built to demonstrate a clean React + TypeScript architecture consuming a real REST API: typed data fetching, cache-aware querying, animated page transitions, and a restrained, editorial visual design.

The project is deployed as a static site (GitHub Pages) talking to a separate Django REST API backend (Railway). This repository contains the **frontend only**.

<br/>

## Table of contents

- [Design language](#design-language)
- [Architecture](#architecture)
- [Application structure](#application-structure)
- [Data flow](#data-flow)
- [Routes](#routes)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Deployment topology](#deployment-topology)
- [License](#license)

<br/>

## Design language

LUMEN's visual identity is quiet and editorial rather than loud e-commerce: a dark ink background, a single violet accent, monospace micro-labels, and a serif display face for headings.

<table>
<tr>
<td width="50%" valign="top">

**Color palette**

| Token | Swatch | Hex | Role |
|---|---|---|---|
| `ink` | ![#100b1f](https://img.shields.io/badge/-100b1f-100b1f?style=flat-square) | `#100b1f` | Page background |
| `surface` | ![#1b1330](https://img.shields.io/badge/-1b1330-1b1330?style=flat-square) | `#1b1330` | Cards / nav |
| `prism-violet` | ![#863bff](https://img.shields.io/badge/-863bff-863bff?style=flat-square) | `#863bff` | Primary accent |
| `deep-violet` | ![#7e14ff](https://img.shields.io/badge/-7e14ff-7e14ff?style=flat-square) | `#7e14ff` | Accent depth |
| `prism-blue` | ![#47bfff](https://img.shields.io/badge/-47bfff-47bfff?style=flat-square) | `#47bfff` | Secondary highlight |
| `line` | ![#2c2c2a](https://img.shields.io/badge/-2c2c2a-2c2c2a?style=flat-square) | `#2c2c2a` | Hairline borders |

</td>
<td width="50%" valign="top">

**Typography**

| Use | Face | Notes |
|---|---|---|
| Display / headings | Serif (`font-display`) | Editorial tone |
| Body copy | System sans | Readability |
| Labels / meta | Monospace, uppercase, tracked | Product-sheet feel |

**Motion**

Page and element transitions are handled with `framer-motion`, fade and rise on mount, scale feedback on interactive controls.

</td>
</tr>
</table>

<br/>

## Architecture

The frontend is a fully static React SPA. It never touches a database directly, every piece of catalog data (products, images, pricing, stock) is fetched from the Django REST API at runtime, over HTTPS.

```mermaid
flowchart LR
    subgraph Client["Browser"]
        UI["LUMEN SPA<br/>React + Vite build"]
    end

    subgraph Hosting["GitHub Pages"]
        Static["Static assets<br/>HTML / JS / CSS"]
    end

    subgraph API["Railway"]
        Django["Django REST API"]
        DB[("PostgreSQL")]
        Media["Media storage<br/>product images"]
    end

    Static -- "serves bundle" --> UI
    UI -- "GET /api/products/" --> Django
    UI -- "GET /api/products/:slug/" --> Django
    UI -- "GET /media/products/*.webp" --> Media
    Django --> DB
    Django --> Media
```

<br/>

## Application structure

```mermaid
flowchart TD
    App["App.tsx<br/>Router shell"]
    Nav["NavBar"]
    Foot["Footer"]

    Home["Home<br/>Landing / hero"]
    Coll["Collection<br/>Search + sort grid"]
    Detail["ProductDetail<br/>Gallery + specs"]
    NF["NotFound"]

    App --> Nav
    App --> Home
    App --> Coll
    App --> Detail
    App --> NF
    App --> Foot

    Coll --> Card["ProductCard"]
```

Each route is a thin page component that composes shared primitives (`NavBar`, `Footer`, `ProductCard`) and pulls its data through the `useProducts` / `useProduct` hooks, no page ever calls `axios` directly.

<br/>

## Data flow

Data fetching is centralized behind two TanStack Query hooks, which wrap a single typed Axios client. This keeps caching, loading, and error states consistent across every page that needs catalog data.

```mermaid
sequenceDiagram
    participant Page as Page component
    participant Hook as useProducts / useProduct
    participant RQ as TanStack Query cache
    participant Client as api/client.ts (Axios)
    participant API as Django REST API

    Page->>Hook: call with params (search, ordering, slug)
    Hook->>RQ: check cache for key
    alt cache hit and fresh
        RQ-->>Hook: cached data
    else cache miss or stale
        Hook->>Client: fetchProducts() / fetchProduct(slug)
        Client->>API: GET /api/products/ or /api/products/:slug/
        API-->>Client: JSON (paginated list or product detail)
        Client-->>Hook: typed response
        Hook->>RQ: store in cache (60s staleTime)
    end
    Hook-->>Page: data, isLoading
```

All response shapes are typed end to end via `src/types/catalog.ts` (`ProductListItem`, `ProductDetail`, `ProductImage`, `Paginated<T>`), so the API contract is enforced at compile time in every component that consumes it.

<br/>

## Routes

| Path | Page | Purpose |
|---|---|---|
| `/` | `Home` | Hero, brand intro, featured entry point |
| `/collection` | `Collection` | Full catalog with live search and sort |
| `/product/:slug` | `ProductDetail` | Gallery, pricing, specifications for one device |
| `*` | `NotFound` | Fallback for unmatched routes |

<br/>

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 19 | Modern concurrent rendering, hooks-first |
| Language | TypeScript | End-to-end type safety against the API contract |
| Build tool | Vite | Fast dev server, minimal config |
| Styling | Tailwind CSS v4 | Utility-first, no runtime CSS-in-JS cost |
| Data fetching | TanStack Query + Axios | Caching, staleness, and loading states out of the box |
| Routing | React Router 7 | Client-side navigation for the SPA |
| Animation | Framer Motion | Declarative enter/exit and gesture transitions |
| Linting | oxlint | Fast, zero-config linting |

<br/>

## Project structure

```
lumen/
├── index.html
├── public/
│   └── favicon.svg
├── docs/
│   └── banner.svg
└── src/
    ├── main.tsx              # App entry point
    ├── App.tsx               # Router shell (NavBar / Routes / Footer)
    ├── index.css              # Tailwind entry + design tokens
    ├── api/
    │   └── client.ts          # Axios instance + typed request functions
    ├── hooks/
    │   └── useProducts.ts     # TanStack Query hooks
    ├── types/
    │   └── catalog.ts         # Shared API response types
    ├── lib/
    │   └── format.ts          # Formatting helpers (currency, etc.)
    ├── components/
    │   ├── NavBar.tsx
    │   ├── Footer.tsx
    │   └── ProductCard.tsx
    └── pages/
        ├── Home.tsx
        ├── Collection.tsx
        ├── ProductDetail.tsx
        └── NotFound.tsx
```

<br/>

## Deployment topology

```mermaid
flowchart LR
    Dev["Local development"] -- "git push" --> GH["GitHub repository"]
    GH -- "Pages workflow" --> Pages["GitHub Pages<br/>static hosting"]
    GH2["Backend repository"] -- "git push" --> RW["Railway<br/>auto-deploy"]
    Pages -- "HTTPS API calls" --> RW
    RW --> PG[("PostgreSQL")]
```

The frontend and backend live in **separate repositories** and deploy independently:

- **Frontend**, built with Vite, published as a static bundle to **GitHub Pages**.
- **Backend**, Django REST Framework service on **Railway**, backed by PostgreSQL, serving both the API and product media.

<br/>

## License

<table>
<tr>
<td width="80%">

This repository is shared **strictly for portfolio and code-review purposes**.

All rights reserved. No license is granted to use, copy, modify, merge, publish, distribute, sublicense, or sell copies of this software, in whole or in part, for any purpose.

</td>
<td width="20%" align="center">

![Private](https://img.shields.io/badge/-PRIVATE-863bff?style=for-the-badge)

</td>
</tr>
</table>

<div align="center">
<sub>© LUMEN, for records only.</sub>
</div>
