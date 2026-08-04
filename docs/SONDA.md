# Sonda — Bundle Analyzer

Shows what's actually inside the JS bundle, and which dependency is making it big.

## Run it

```bash
bun run build
```

Sonda hooks into the build. Reports land in `.sonda/`:

- `sonda_client_0.html` — the browser bundle (the one that affects load speed)
- `sonda_nitro_0.html` — the server/Nitro bundle

Open either file in a browser.

## Config

In `nuxt.config.ts`:

```ts
import Sonda from 'sonda/nuxt';

modules: [
  Sonda({ server: true }), // server: true = also analyze the Nitro bundle
];
```

**Sourcemaps are required** — that's how Sonda maps bundled code back to real files:

```ts
sourcemap: { client: true, server: true }
```

Turn those off and the reports become useless.

## Reading the report

- **Treemap** — bigger box = more bytes. Start with the biggest one.
- Look for **dependencies you didn't expect to be there** (a whole library pulled in for one helper).
- Compare **used vs unused bytes** — a large chunk that's mostly unused means tree-shaking isn't working, often from a bad import style.

## What to watch in this project

| Package | Why |
| --- | --- |
| `three` / `@tresjs/nuxt` | 3D — large, used only by the gradient effect |
| `gsap` | Animations, plus plugins (`ScrollTrigger`, `SplitText`) |
| `isomorphic-dompurify` | HTML sanitizing |

If one of these shows up in the initial bundle instead of a lazy chunk, that's the thing to fix — usually by making the component client-only or dynamically imported.

## Gotchas

- **Only runs on `build`**, not `dev`. Dev bundles are unoptimized and tell you nothing.
- `.sonda/` is build output — add it to `.gitignore` so reports don't get committed.
- Numbers are pre-gzip. Real transfer size is smaller, but relative sizes are what matter.
