# Knip — Dead Code Finder

Finds things nothing uses: unused files, exports, dependencies, and types.

## Run it

```bash
bun run knip
```

## What it reports

- **Unused files** — never imported by anything
- **Unused dependencies** — in `package.json` but never imported
- **Unlisted dependencies** — imported but missing from `package.json`
- **Unused exports** — exported but nobody imports them
- **Unused types** — same, for TypeScript types

## Config (`knip.json`)

```json
{
  "$schema": "https://unpkg.com/knip@6/schema.json",
  "tags": ["-lintignore"]
}
```

- Knip auto-detects Nuxt, so there's no plugin setup — it already knows about `app/`, `server/`, and auto-imports.
- `"tags": ["-lintignore"]` means: **skip anything tagged `@lintignore`**.

## Silencing a false positive

Add a JSDoc tag above the export:

```ts
/** @lintignore */
export const somethingKnipCantSee = () => {};
```

Use this when the code _is_ used but knip can't tell — dynamic imports, config-only references, that kind of thing.

## When to run it

- Before a cleanup / maintenance commit
- After deleting a feature, to catch the leftovers
- When `package.json` feels bloated

## Gotchas

- **Auto-imported composables can look unused.** Knip understands Nuxt auto-imports, but if something is only referenced in a template it can still get flagged — check before deleting.
- Generated files (`app/types/generated/graphql.ts`) may show unused exports. That's normal — codegen emits types for every query whether or not you use them all.
- Knip suggests, it doesn't decide. Read each hit before removing anything.
