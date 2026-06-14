<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# design-system-docs

pnpm + turbo monorepo: a `@workspace/ui` component library published as a shadcn registry, documented by a fumadocs site.

- `packages/ui` (`@workspace/ui`) — the component library; the source of truth.
- `apps/docs` (`docs`) — fumadocs site + shadcn registry output.
- `apps/web` — minimal Next.js app consuming `@workspace/ui`.
- `packages/{eslint,typescript}-config` — shared config.

## Running commands

Always go through the root `pnpm` scripts; they dispatch to turbo. Caching and `dependsOn` ordering only work on this path.

| Do | Don't |
|----|-------|
| `pnpm build` / `typecheck` / `lint` / `api-report` / `registry:build` | `cd packages/ui && …`, or running turbo from a subdir |
| Scope with the flag **last**: `pnpm build --filter @workspace/ui` | `pnpm --filter <pkg> build` (bypasses turbo) |
| Run the turbo script directly: `pnpm api-report` | `pnpm api-extractor run …`, `pnpm exec …`, `npx …` |

`--filter` always comes after the script name. No `run`, `exec`, or `npx` — they bypass turbo or the pinned dependency version.
