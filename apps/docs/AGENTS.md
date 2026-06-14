# apps/docs

Fumadocs site documenting all `@workspace/ui` components + shadcn registry at `/r/<name>.json`.

The `next dev` server compiles lazily and chokes under rapid/concurrent requests (ERR_CONNECTION_REFUSED/RESET cascades that are NOT page errors). Treat the production build (`pnpm build --filter docs`) as the source of truth for whether all routes render — it statically generates every page and fails loudly.
