# R/T Automotive & Transmission

Wadsworth, OH transmission and auto repair shop. Vite/React SSG (prerendered), push to main auto-deploys to Netlify (rt-automotive.netlify.app), canonical rtautotransmission.com.

## Develop
```
npm install
npm run dev      # http://localhost:5247
```

## Build (prerender + sitemap/robots)
```
npm run build    # outputs dist/
```

## Notes
- Content single-source: `src/data/site.ts`. SEO/JSON-LD: `src/lib/seo.ts`.
- Live Google reviews via `netlify/functions/reviews.mts` (needs `GOOGLE_PLACES_API_KEY`).
- Service-request form posts to Netlify Forms (`service-request`). Enable form detection on the site.
