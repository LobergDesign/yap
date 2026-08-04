# Error Handling Strategy

Errors travel through three stages: **server maps them → composable decides → error page shows**.

## The chain

```
Hygraph fails
  → server/api/cms.post.ts        maps it to an HTTP status
  → useErrorHandler.watchError()  decides: error page or just log?
  → app/error.vue                 shows a friendly message
```

## 1. Server: `server/api/cms.post.ts`

Turns GraphQL/network problems into real HTTP status codes.

| Cause | Status |
| --- | --- |
| `UNAUTHENTICATED` | 401 |
| `FORBIDDEN` | 403 |
| `BAD_USER_INPUT`, validation, parse failed | 400 |
| `NOT_FOUND` | 404 |
| Network error (`FetchError`) | 503 |
| Timeout (10s limit) | 504 |
| Anything else | 500 |

- Everything is logged server-side with a tag: `[GraphQL Error]`, `[Network Error]`, `[Timeout Error]`, `[Unknown Error]`.
- GraphQL can return errors _and_ data at once — the partial data is passed along as `data.partialData`.

## 2. Composable: `useErrorHandler`

Used in every data composable:

```ts
const { watchError } = useErrorHandler();
watchError(error); // error ref from useCachedFetchFactory
```

What it does:

- **404 or 500+** → calls `showError()`, which renders `error.vue` (fatal, takes over the page)
- **Everything else** (400, 401, 403) → logged to console only, page keeps working
- In dev, _all_ errors are logged with full detail

**Why `immediate: true` on the watcher:** during SSR the data resolves before the watcher is registered, so a normal watcher would never fire. It has to check the current value right away.

## 3. Page: `app/error.vue`

- Maps status codes to friendly title + message (400, 401, 403, 404, 500, 503, 504).
- Unknown codes fall back to a generic message.
- **Dev only:** a `<details>` block with the raw status text and error data.
- Two buttons: `clearError({ redirect: '/' })` (go home) and `clearError()` (try again).

## Adding error handling to a new composable

Just copy the pattern — three lines:

```ts
const { watchError } = useErrorHandler();
const { data, error } = await useCachedFetchFactory(...);
watchError(error);
```

## Gotchas

- `showError` is **fatal** — it replaces the whole page. Don't use it for something optional like a failed weather widget.
- 400/401/403 do **not** show the error page. If you want them to, change `shouldShowErrorPage()`.
- The proxy has a **10 second timeout**. A slow Hygraph response becomes a 504, not a hang.
