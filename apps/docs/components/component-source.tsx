import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

interface ComponentSourceProps {
  /** Component file name in `packages/ui/src/components`, e.g. `button`. */
  name: string;
}

/**
 * Renders the full implementation source of a UI component, read from the
 * `@workspace/ui` package at build time. Useful for an "Anatomy" section.
 */
export function ComponentSource({ name }: ComponentSourceProps) {
  const filePath = resolve(
    process.cwd(),
    "../../packages/ui/src/components",
    `${name}.tsx`
  );

  let code: string;
  try {
    code = readFileSync(filePath, "utf-8").trimEnd().concat("\n");
  } catch {
    return (
      <div className="my-6 rounded-xl border border-dashed p-6 text-sm text-fd-muted-foreground">
        Could not read source for <code>{name}</code>.
      </div>
    );
  }

  return (
    <div className="my-6">
      <DynamicCodeBlock
        lang="tsx"
        code={code}
        options={{ themes: { light: "github-light", dark: "github-dark" } }}
      />
    </div>
  );
}
