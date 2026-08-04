# Cache Strategy

Three layers, each solving a different problem.

## The layers

| Layer | Where | How long | Solves |
| --- | --- | --- | --- |
| **ISR** | Vercel edge | 2 hours | Visitors get a prebuilt page — no Hygraph call at all |
| **Nuxt payload** | Client | Per session | Navigating back to a page doesn't refetch |
| **`getCachedData`** | Client + server | Per request | Two components asking for the same data = one fetch |

## 1. ISR (the big one)

In `nuxt.config.ts`:

```ts
routeRules: {
  '/**': process.env.NODE_ENV === 'production' ? { isr: 7200 } : {},
  '/api/**': { cache: false, isr: false },
}
```

- Vercel serves a cached HTML page for **2 hours** (7200s).
- After that, the next visitor triggers a rebuild in the background.
- **Production only** — dev always fetches fresh, so CMS changes show up immediately.
- API routes are never cached (they only run during page regeneration).

## 2. The cache factories

Two composables in `app/composables/shared/`:

**`useCachedFetchFactory`** — the default. Runs on the server, blocks render until data arrives.

```ts
const { data, error, pending, refresh, status } =
  await useCachedFetchFactory<GetProjectQuery>(`project-${slug}`, () => executeQuery());
```

**`useLazyCachedFetchFactory`** — `lazy: true, server: false`. Client-only, doesn't block render.

Both use the same trick:

```ts
getCachedData: (key) => useNuxtApp().payload.data[key] ?? useNuxtData(key).data.value;
```

Meaning: _if we already have data under this key, use it — don't fetch again._

## Which one to use

- **Default → `useCachedFetchFactory`.** Content that must be in the HTML (SEO, page content).
- **`useLazyCachedFetchFactory`** for secondary stuff where a loading state is fine. Used by `useProjectCount`.

## Cache keys

Keys must be unique per piece of data, or two things overwrite each other:

- `'frontpage'` — one frontpage, static key
- `'projects'`, `'project-count'` — lists, static keys
- `` `project-${slug}` `` — **dynamic**, one entry per project

## Getting fresh content out

There is **no manual revalidation**. Content updates two ways:

- **Wait out the 2-hour ISR window** — the next visitor after it expires triggers a rebuild
- **Redeploy** — clears everything immediately

That 2 hours is the worst case for how stale a page can be.

> A `/api/revalidate` route used to live here, but nothing ever called it and it never actually purged anything, so it was removed. If instant CMS updates are wanted later, the shape is: a Hygraph webhook → an authenticated endpoint → a Vercel cache purge.

## Gotchas

- **ISR is invisible in dev.** Caching bugs only show up in production or `bun run preview`.
- Changing a query but reusing the old cache key means stale data during a session — bump the key.
- 2 hours is the ceiling on how stale content can get. Publish in Hygraph and it may not appear on the live site for that long — redeploy if it's urgent.
