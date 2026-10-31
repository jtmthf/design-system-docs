# Design System

A React component library of 55 accessible components built on [Base UI](https://base-ui.com) and styled with Tailwind CSS v4. The library lives in `packages/ui`; a [Fumadocs](https://fumadocs.dev) site documents it and publishes its components through a shadcn-compatible registry.

## Repository layout

- `packages/ui` — `@workspace/ui`, the component, hook, utility, and design-token source.
- `apps/docs` — the Fumadocs site, component playground, AI-assisted documentation, and registry.
- `apps/web` — a small Next.js app that consumes the workspace UI package.
- `packages/eslint-config` and `packages/typescript-config` — shared lint and TypeScript configuration.

This is a pnpm workspace orchestrated with Turborepo. Run workspace tasks from the repository root.

## Use components in another project

The docs deployment hosts the component registry at [design-system-docs-docs.vercel.app](https://design-system-docs-docs.vercel.app). Install a component with the shadcn CLI:

```bash
npx shadcn@latest add https://design-system-docs-docs.vercel.app/r/button.json
```

Replace `button` with another registry item name. The CLI also installs that item's registry dependencies.

To use short names, add a registry entry to your project's `components.json`:

```json
{
  "registries": {
    "@workspace-ui": "https://design-system-docs-docs.vercel.app/r/{name}.json"
  }
}
```

Then install with:

```bash
npx shadcn@latest add @workspace-ui/button
```

For a pnpm workspace app in this repository, add `"@workspace/ui": "workspace:*"` to its dependencies and import components from `@workspace/ui/components/button`. The package exposes source files directly. In Next.js, add `@workspace/ui` to `transpilePackages`; import `@workspace/ui/globals.css` to use the design tokens and styles.

## Local development

Install dependencies and start the root development tasks:

```bash
pnpm install
pnpm dev
```

Run common tasks from the root:

```bash
pnpm build
pnpm typecheck
pnpm lint
pnpm test
pnpm api-report
pnpm registry:build
```

To target a workspace package, put Turbo's `--filter` option after the script:

```bash
pnpm build --filter @workspace/ui
pnpm dev --filter docs
```

The registry build generates the static JSON files served by the docs site. The root scripts also include `format`.

## Documentation tools

The docs site includes a component playground, an Ask AI assistant grounded in the current page, and an `/llms.txt` route for language-model discovery. Its MCP endpoint is available at `/api/mcp` and provides tools to list, retrieve, and search documentation pages.
