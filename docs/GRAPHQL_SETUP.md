# GraphQL Setup

How data gets from Hygraph into the app.

## The idea

- GraphQL is a **server detail**. The browser never sends or sees a query.
- Each piece of content has its own GET route under `/api/`, with the query fixed on the server.
- The Hygraph token (`GQL_TOKEN`) stays on the server.

## The flow

1. Query lives in `server/graphql/*.graphql`
2. `bun run codegen` turns it into a typed document in `shared/types/generated/graphql.ts`
3. A route in `server/api/` runs it with `hygraphQuery(Document, variables)`
4. Pages and components call the route with `useFetch('/api/...')` — the response type is inferred from the route

## Adding a new query

1. Write `server/graphql/myThing.graphql`
2. Run `bun run codegen`
3. Create `server/api/my-thing.get.ts` — copy `server/api/projects/index.get.ts`, it's the simplest one
4. Call `useFetch('/api/my-thing')` where you need it

## When to write a composable

Only when it adds something. `useFetch` already shares one request between components that ask for the same URL.

- `useProjects` exists because it owns a fixed key (`'projects'`), readable with `useNuxtData`.
- `useProject` exists because two places build the same URL from a slug.
- Keep them non-async one-liners that return `useFetch` directly, so callers keep every option.

## Key files

| File                                 | What it does                                          |
| ------------------------------------ | ----------------------------------------------------- |
| `server/graphql/*.graphql`           | The queries you write                                 |
| `server/graphql/fragments/*.graphql` | Reusable field sets (`ImageFragment`, `HeroFragment`) |
| `codegen.ts`                         | Codegen config — reads the schema live from Hygraph   |
| `shared/types/generated/graphql.ts`  | Auto-generated. **Never edit.**                       |
| `server/utils/hygraph.ts`            | `hygraphQuery` — adds the token, handles errors       |
| `server/api/**`                      | One GET route per query                               |
| `shared/utils/constants.ts`          | `CONTENT_IDS` (like the frontpage ID)                 |

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

## Types

- Codegen emits a document that **carries its own types**, so `hygraphQuery(GetProjectDocument, { slug })` knows the result shape and the required variables.
- Components that need a type for props import it from `#shared/types/generated/graphql`.

## Gotchas

- **Codegen needs `.env`** — it fetches the live schema from Hygraph, so `GQL_HOST` and `GQL_TOKEN` must be set.
- `bun run build` runs codegen first, so Vercel needs those env vars too.
- Only the `typescript-operations` + `typed-document-node` plugins are used. Adding the `typescript` plugin duplicates type names and breaks the build (see the comment in `codegen.ts`).
- Hygraph answers an unknown slug with `null`, not an error. The route has to turn that into a 404 itself (see `server/api/projects/[slug].get.ts`).
