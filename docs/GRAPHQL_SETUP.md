# GraphQL Setup

How data gets from Hygraph into the app.

## Why a proxy instead of a GraphQL client

- The Hygraph token (`GQL_TOKEN`) must never reach the browser.
- So the browser calls **our** endpoint (`/api/cms`), and the server calls Hygraph.
- No Apollo/urql needed — just `$fetch` plus generated types.

## The flow

1. Query lives in `app/queries/*.graphql`
2. `bun run codegen` turns it into a typed document in `app/types/generated/graphql.ts`
3. A composable (`useProject`, `useProjects`, …) calls `useGraphQL(Document, variables)`
4. `useGraphQL` POSTs `{ document, variables }` to `/api/cms`
5. `server/api/cms.post.ts` adds the auth header and forwards it to Hygraph
6. Response comes back, wrapped in caching by `useCachedFetchFactory`

## Adding a new query

1. Write `app/queries/myThing.graphql`
2. Run `bun run codegen`
3. Create `app/composables/useMyThing.ts` — copy `useProjects.ts`, it's the simplest one
4. Use it in a component (auto-imported, no import needed)

## Key files

| File | What it does |
| --- | --- |
| `app/queries/*.graphql` | The queries you write |
| `app/queries/fragments/*.graphql` | Reusable field sets (`ImageFragment`, `HeroFragment`) |
| `codegen.ts` | Codegen config — reads the schema live from Hygraph |
| `app/types/generated/graphql.ts` | Auto-generated. **Never edit.** |
| `app/composables/shared/useGraphQL.ts` | Sends the query to `/api/cms` |
| `server/api/cms.post.ts` | The proxy — adds token, handles errors |

## Fragments

Import them at the top of a `.graphql` file with a comment:

```graphql
#import "./fragments/HeroSection.graphql"

query GetFrontpage($id: ID) {
  frontpage(where: { id: $id }) {
    heroSection {
      ...HeroFragment
    }
  }
}
```

## Types (TypedDocumentNode)

- Codegen emits a document that **carries its own types**.
- So `useGraphQL(GetProjectDocument, { slug })` already knows the result shape and which variables are required — no manual typing.
- Pass the wrong variables and TypeScript complains.

## Gotchas

- **Codegen needs `.env`** — it fetches the live schema from Hygraph, so `GQL_HOST` and `GQL_TOKEN` must be set.
- `bun run build` runs codegen first, so Vercel needs those env vars too.
- Only the `typescript-operations` + `typed-document-node` plugins are used. Adding the `typescript` plugin duplicates type names and breaks the build (see the comment in `codegen.ts`).
- Content IDs (like the frontpage ID) live in `app/utils/constants.ts` under `CONTENT_IDS`.
