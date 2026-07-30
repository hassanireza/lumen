# Deploying LUMEN (frontend) to Vercel

This frontend lives in its own **public** (or private, your choice) GitHub repo, separate from
the Django backend, and deploys as a static SPA.

## 1. Push this folder to a GitHub repo

```bash
cd lumen-frontend        # this folder
git init
git add .
git commit -m "Initial commit: LUMEN storefront"
git branch -M main
```

On GitHub: **New repository** → name it e.g. `lumen-frontend` → Create (public or private, your
call — it has no secrets in it).

```bash
git remote add origin https://github.com/<your-username>/lumen-frontend.git
git push -u origin main
```

## 2. Import into Vercel

1. Go to [vercel.com](https://vercel.com) → sign in with GitHub → **Add New** → **Project**.
2. Select the `lumen-frontend` repo → Vercel auto-detects Vite and sets:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

   You shouldn't need to change any of these.

## 3. Set the environment variable

Before the first deploy (or in **Settings → Environment Variables** afterward), add:

| Variable | Value |
|---|---|
| `VITE_API_BASE_URL` | `https://<your-railway-backend-domain>/api` |

Apply it to Production, Preview, and Development environments as appropriate. Vite only reads
`VITE_*` variables at **build time**, so redeploy after changing this.

## 4. Deploy

Click **Deploy**. Vercel builds and gives you a URL like `lumen-frontend.vercel.app`.

## 5. Connect it back to the backend

Go back to your Railway Django service → `CORS_ALLOWED_ORIGINS` env var → add your Vercel URL:

```
CORS_ALLOWED_ORIGINS=https://lumen-frontend.vercel.app
```

Redeploy the backend so the CORS change takes effect. Reload the frontend — product data should
now load from the live API.

## 6. Custom domain (optional)

Vercel → project → **Settings → Domains** → add your domain, follow the DNS instructions shown.
Once added, also add that custom domain to the backend's `CORS_ALLOWED_ORIGINS`.

## Ongoing workflow

- Push to `main` → Vercel auto-builds and deploys.
- Every PR gets its own preview URL automatically — useful for reviewing design changes before
  merging.

## Alternative: Netlify

If you'd rather use Netlify instead of Vercel: same idea — connect the GitHub repo, build
command `npm run build`, publish directory `dist`, set `VITE_API_BASE_URL` under **Site settings
→ Environment variables**, then add the resulting `*.netlify.app` URL to the backend's
`CORS_ALLOWED_ORIGINS`.
