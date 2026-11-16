# Cache Strategy

Two layers, each solving a different problem.

## The layers

| Layer            | Where       | How long    | Solves                                             |
| ---------------- | ----------- | ----------- | -------------------------------------------------- |
| **ISR**          | Vercel edge | 2 hours     | Visitors get a prebuilt response — no Hygraph call |
| **Nuxt payload** | Client      | Per session | Two components asking for the same URL = one fetch |

## 1. ISR

In `nuxt.config.ts`:

```ts
$production: {
  routeRules: {
    '/**': { isr: 7200 },
    '/api/weather': { isr: 300 },
  },
},
```

- Vercel serves a cached response for **2 hours** (7200s). After that, the next visitor triggers a rebuild in the background.
- `/**` covers pages **and** the `/api/` routes, so client-side navigation is served from the edge too.
- Weather is refreshed every 5 minutes.
- **Production only** — dev always fetches fresh, so CMS changes show up immediately.

Why `routeRules` and not `defineCachedEventHandler`: Nitro's own cache lives in server storage, which on Vercel is per-instance memory unless a KV driver is configured. `isr` caches at the CDN.

## 2. Keys

`useFetch` derives its key from the URL, so the same URL is fetched once and shared.

- `useProjects` sets a fixed key, `'projects'`, so the list can be read with `useNuxtData('projects')`.
- Everything else uses the automatic key.

## Getting fresh content out

There is **no manual revalidation**. Content updates two ways:

- **Wait out the 2-hour ISR window** — the next visitor after it expires triggers a rebuild
- **Redeploy** — clears everything immediately

If instant CMS updates are wanted later, the shape is: a Hygraph webhook → an authenticated endpoint → a Vercel cache purge.

## Gotchas

- **ISR is invisible in dev.** Caching bugs only show up in production.
- During server rendering, a page's call to `/api/...` runs in-process and skips the CDN. The API cache only helps client-side navigation.
- 2 hours is the ceiling on how stale content can get — redeploy if it's urgent.
