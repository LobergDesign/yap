# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Testing Locally with Vercel Runtime

To test the app exactly as it runs on Vercel, use the Vercel CLI:

```bash
npx vercel dev
```

This runs the app through Vercel's local runtime, including serverless functions and environment variables from your linked Vercel project.

### Local production build (non-Vercel)

`bun run preview` does not work with the Vercel preset. To preview a standard production build locally:

```bash
NITRO_PRESET=node-server bun run build
node .output/server/index.mjs
```
