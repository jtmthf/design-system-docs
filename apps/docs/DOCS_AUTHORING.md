# Component docs authoring spec

How every component page in `content/docs/components/<name>.mdx` is built. The
`button` and `accordion` pages are the canonical reference implementations —
match their structure and tone exactly.

## Sources of truth (read these per component)

For component `<name>`, read all three from the UI package:

- `packages/ui/src/components/<name>.tsx` — implementation + TSDoc + the exact
  exported names and the Base UI primitive each part wraps.
- `packages/ui/src/components/<name>.stories.tsx` — canonical examples, prop
  descriptions, default args, accessibility notes. **This is the most accurate
  source — never invent props or behavior the stories don't show.**
- `packages/ui/src/components/<name>.mdx` — Storybook docs with Usage, Do/Don't,
  and example prose. Reuse this prose (tightened) rather than writing new claims.

Never copy claims from the OLD `content/docs/components/<name>.mdx`; it was
machine-generated and is frequently wrong (e.g. it invented `openMultiple`; the
real prop is `multiple`). Verify every prop name against the source.

## Example files

For each live demo, create `apps/docs/components/examples/<example-name>.tsx`:

- File name is kebab-case and unique, prefixed by the component:
  `button-variants.tsx`, `accordion-multiple.tsx`.
- First line is `"use client";` then a blank line.
- Default-export a component named in PascalCase matching the file
  (`button-variants.tsx` → `export default function ButtonVariants()`).
- Import UI components from `@workspace/ui/components/<name>`.
- Keep demos self-contained, realistic, and small. Constrain width with
  `className="w-full max-w-sm"` etc. so they sit well in the preview frame.
- Every component gets a `<name>-demo.tsx` hero example, plus 2–5 more covering
  the meaningful variations shown in the stories.
- Do NOT add `"use client"` reasoning beyond the directive; do NOT edit
  `components/examples/registry.ts` — it is generated.

## Page template (`content/docs/components/<name>.mdx`)

```mdx
---
title: <Component Name>
description: <one sentence, <= ~90 chars, no trailing period needed>
---

<ComponentPreview name="<name>-demo" />

<1–2 short paragraphs: what it is, when to use it, what Base UI primitive it
builds on. Pull from the stories/storybook mdx. No H1 — the title renders it.>

## Installation

<Tabs items={["Workspace", "CLI"]}>

<Tab value="Workspace">

```tsx
import { <Exports> } from "@workspace/ui/components/<name>";
```

</Tab>

<Tab value="CLI">

```bash
pnpm dlx shadcn@latest add @workspace-ui/<name>
```

</Tab>

</Tabs>

## Usage

```tsx twoslash
<a minimal, correct usage example — must compile; hover types come for free>
```

## Examples

### <Variation title>

<one sentence>

<ComponentPreview name="<name>-<variation>" />

<repeat per variation>

## Guidelines   (optional, only if the storybook mdx has Do/Don't)

**Do** / **Don't** bullet lists.

## API reference

<one <PropsTable> per exported component part>

## Accessibility

<bullets from the stories' a11y notes / Base UI pattern>
```

### Rules

- **No leading `# H1`** and **no repeated description paragraph** — the page
  title and description are rendered from frontmatter automatically. (The old
  pages duplicated both; that is the #1 bug we are fixing.)
- Exactly one ` ```tsx twoslash ` block per page (the Usage block). It must be
  valid, compiling code. Do NOT use `// @errors` or `// @noErrors`. Do NOT add
  `twoslash` to any other code block.
- `<ComponentPreview name="x" />` `name` must match an example file you created.
- `<PropsTable component="X" source="<name>" element="<tag>" />`:
  - `component` = the exported name (e.g. `Button`, `AccordionTrigger`).
  - `source` = the file name (e.g. `accordion`).
  - `element` = the native element the part renders, so its HTML attributes are
    stripped from the table. Use `button` for triggers/buttons, `input` for text
    inputs, `div` for most containers, `span` for inline, `textarea`, `a`, etc.
    Infer from the Base UI primitive / rendered tag in the source. When a part
    does not render a host element (pure context provider), use `element={null}`.
  - Add one `### <PartName>` + `<PropsTable>` per exported part worth documenting.
- Use `<kbd>` for keys, backtick code for prop names. Keep prose tight and
  factual — this is reference documentation, not marketing.

## Do not

- Do not run any dev server, build, lint, or `node` command.
- Do not edit `registry.ts`, `mdx.tsx`, `component-preview.tsx`, or any file
  outside `content/docs/components/<name>.mdx` and
  `components/examples/<name>-*.tsx` for your assigned components.
- Do not touch components you were not assigned.
