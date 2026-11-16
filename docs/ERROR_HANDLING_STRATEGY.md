# Error Handling Strategy

Errors travel through three stages: **server maps them → the caller decides → error page shows**.

## The chain

```
Hygraph fails
  → server/utils/hygraph.ts   maps it to an HTTP status
  → the page or component     decides: fatal, or degrade?
  → app/error.vue             shows a friendly message
```

## 1. Server: `hygraphQuery`

| Cause                                              | Status |
| -------------------------------------------------- | ------ |
| Hygraph unreachable or timeout (10s)               | 503    |
| Hygraph returned GraphQL errors                    | 500    |
| Unknown slug (`server/api/projects/[slug].get.ts`) | 404    |

- Details are logged server-side with a tag: `[Hygraph request failed]`, `[Hygraph GraphQL error]`.
- The client only gets the status and a generic text. GraphQL error details are never forwarded.

## 2. Caller decides

**Pages** escalate to the error page:

```ts
const { data, error } = await useFetch('/api/frontpage');
if (error.value) {
  throw createError({
    status: error.value.status,
    statusText: error.value.statusText,
    fatal: true,
  });
}
```

**Widgets and secondary components** don't. They render a fallback or nothing (see `projectCount.vue`).

## 3. Page: `app/error.vue`

- Maps status codes to friendly title + message.
- Unknown codes fall back to a generic message.
- **Dev only:** a `<details>` block with the raw status text and error data.
- Two buttons: `clearError({ redirect: '/' })` (go home) and `clearError()` (try again).

## Gotchas

- A fatal error replaces the whole page. Don't throw one for something optional like a failed weather widget.
