import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const UI_SRC = resolve(process.cwd(), "../../packages/ui/src");

/** npm packages that are peer-provided and should not be listed as deps. */
const IGNORED_DEPS = new Set(["react", "react-dom"]);

/** Map an import specifier to its npm package name, or null if not external. */
function toPackageName(spec: string): string | null {
  if (
    spec.startsWith("#") ||
    spec.startsWith("@workspace/") ||
    spec.startsWith(".") ||
    spec.startsWith("@/")
  ) {
    return null;
  }
  if (spec.startsWith("@")) {
    const [scope, name] = spec.split("/");
    return `${scope}/${name}`;
  }
  return spec.split("/")[0]!;
}

/**
 * Rewrites the design system's internal subpath aliases to the `@/` aliases a
 * shadcn consumer project uses, so a copied component drops in cleanly.
 */
function rewriteAliases(code: string): string {
  return code
    .replace(/#lib\/utils/g, "@/lib/utils")
    .replace(/#components\//g, "@/components/ui/")
    .replace(/#hooks\//g, "@/hooks/");
}

export interface RegistryItem {
  $schema: string;
  name: string;
  type: string;
  dependencies: string[];
  registryDependencies: string[];
  files: { path: string; content: string; type: string; target: string }[];
}

/**
 * Builds a shadcn registry item for a component, reading the real source from
 * `@workspace/ui`. Returns null if the component does not exist.
 */
export function buildRegistryItem(name: string): RegistryItem | null {
  let code: string;
  try {
    code = readFileSync(resolve(UI_SRC, "components", `${name}.tsx`), "utf-8");
  } catch {
    return null;
  }

  const importRe = /import\s+(?:[^"']+\s+from\s+)?["']([^"']+)["']/g;
  const dependencies = new Set<string>();
  const registryDependencies = new Set<string>();

  for (const match of code.matchAll(importRe)) {
    const spec = match[1]!;
    if (spec.startsWith("#components/")) {
      registryDependencies.add(`@workspace-ui/${spec.replace("#components/", "")}`);
    } else {
      const pkg = toPackageName(spec);
      if (pkg && !IGNORED_DEPS.has(pkg)) dependencies.add(pkg);
    }
  }

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:ui",
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
    files: [
      {
        path: `components/ui/${name}.tsx`,
        content: rewriteAliases(code),
        type: "registry:ui",
        target: `components/ui/${name}.tsx`,
      },
    ],
  };
}
