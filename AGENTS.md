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

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
