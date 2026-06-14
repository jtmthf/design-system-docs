// Generates a shadcn registry from the @workspace/ui source and runs
// `shadcn build` to emit static JSON into apps/docs/public/r.
//
// Pipeline:
//   1. Read every component in packages/ui/src/components (+ lib/utils, hooks/use-mobile).
//   2. Parse imports to derive npm `dependencies` and `registryDependencies`.
//   3. Rewrite the library's internal subpath aliases (`#components/*`, `#lib/utils`,
//      `#hooks/*`) to the `@/` aliases a consumer app uses, writing the transformed
//      source into a staging dir (apps/docs/registry/).
//   4. Author registry.json pointing at the staged files + a registry:theme item
//      whose cssVars come from globals.css.
//   5. `shadcn build registry.json -o public/r`, then write the index public/r/registry.json.
//
// Internal registryDependencies are emitted as absolute URLs (`${REGISTRY_URL}/r/<name>.json`)
// so they resolve through every channel: raw-URL installs, the namespaced registry config,
// and the shadcn MCP server. Run with NEXT_PUBLIC_REGISTRY_URL set at deploy time.

import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = resolve(__dirname, "..");
const UI_SRC = resolve(DOCS_ROOT, "../../packages/ui/src");
const COMPONENTS_DIR = resolve(UI_SRC, "components");
const CONTENT_DIR = resolve(DOCS_ROOT, "content/docs/components");
const GLOBALS_CSS = resolve(UI_SRC, "styles/globals.css");
const STAGE_DIR = resolve(DOCS_ROOT, "registry");
const OUTPUT_DIR = resolve(DOCS_ROOT, "public/r");
const REGISTRY_JSON = resolve(DOCS_ROOT, "registry.json");
const SHADCN_BIN = resolve(
  DOCS_ROOT,
  "../../packages/ui/node_modules/.bin/shadcn"
);

const REGISTRY_NAME = "@workspace-ui";
// Resolve the deploy origin automatically. Vercel exposes the canonical
// production domain (without protocol) as VERCEL_PROJECT_PRODUCTION_URL, so the
// emitted registryDependencies stay correct on the real deploy without
// hardcoding a domain. An explicit NEXT_PUBLIC_REGISTRY_URL still wins for local
// overrides; otherwise fall back to localhost for dev.
const REGISTRY_URL = (
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ??
  process.env.NEXT_PUBLIC_REGISTRY_URL ??
  "http://localhost:3001"
).replace(/\/$/, "");

/** npm packages that are peer-provided and should not be listed as deps. */
const IGNORED_DEPS = new Set(["react", "react-dom"]);

/** Absolute URL of a published registry item, used for registryDependencies. */
function itemUrl(name) {
  return `${REGISTRY_URL}/r/${name}.json`;
}

/** Map an import specifier to its npm package name, or null if not external. */
function toPackageName(spec) {
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
  return spec.split("/")[0];
}

/**
 * Rewrites the design system's internal subpath aliases to the `@/` aliases a
 * shadcn consumer project uses, so a copied file drops in cleanly.
 */
function rewriteAliases(code) {
  return code
    .replace(/#lib\/utils/g, "@/lib/utils")
    .replace(/#components\//g, "@/components/ui/")
    .replace(/#hooks\//g, "@/hooks/");
}

const IMPORT_RE = /import\s+(?:[^"']+\s+from\s+)?["']([^"']+)["']/g;

/**
 * Parses imports out of a source file into external npm deps and internal
 * registry deps (other components / hooks), as absolute item URLs.
 */
function parseDeps(code) {
  const dependencies = new Set();
  const registryDependencies = new Set();

  for (const match of code.matchAll(IMPORT_RE)) {
    const spec = match[1];
    if (spec.startsWith("#components/")) {
      registryDependencies.add(itemUrl(spec.replace("#components/", "")));
    } else if (spec.startsWith("#hooks/")) {
      registryDependencies.add(itemUrl(spec.replace("#hooks/", "")));
    } else if (spec.startsWith("#lib/")) {
      // cn/utils is provided by `shadcn init` (the standard `@/lib/utils`), so
      // it is not listed as a dependency — matching shadcn's own components.
      continue;
    } else {
      const pkg = toPackageName(spec);
      if (pkg && !IGNORED_DEPS.has(pkg)) dependencies.add(pkg);
    }
  }

  return {
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
  };
}

/** Reads `title` / `description` from a component's MDX frontmatter. */
function readFrontmatter(name) {
  let raw;
  try {
    raw = readFileSync(join(CONTENT_DIR, `${name}.mdx`), "utf-8");
  } catch {
    return {};
  }
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return {};
  const title = fm[1].match(/^title:\s*(.+)$/m)?.[1]?.trim();
  const description = fm[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  return { title, description };
}

/** Title-cases a kebab-case name, e.g. `button-group` -> `Button Group`. */
function titleCase(name) {
  return name
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

/** Parses a `:root` / `.dark` block from globals.css into a cssVars object. */
function parseCssBlock(css, selector) {
  const re = new RegExp(`${selector}\\s*\\{([^}]*)\\}`);
  const block = css.match(re)?.[1] ?? "";
  const vars = {};
  for (const line of block.split("\n")) {
    const m = line.match(/^\s*--([\w-]+):\s*(.+?);?\s*$/);
    if (m) vars[m[1]] = m[2].trim();
  }
  return vars;
}

function stageFile(relPath, content) {
  const dest = join(STAGE_DIR, relPath);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, content);
}

function main() {
  rmSync(STAGE_DIR, { recursive: true, force: true });
  rmSync(OUTPUT_DIR, { recursive: true, force: true });
  mkdirSync(STAGE_DIR, { recursive: true });

  const items = [];

  // --- Component items (registry:ui) ---
  const componentFiles = readdirSync(COMPONENTS_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .filter((f) => !/\.(stories|test)\.tsx$/.test(f))
    .sort();

  for (const file of componentFiles) {
    const name = file.replace(/\.tsx$/, "");
    const code = readFileSync(join(COMPONENTS_DIR, file), "utf-8");
    const { dependencies, registryDependencies } = parseDeps(code);
    const { title, description } = readFrontmatter(name);

    stageFile(`${name}.tsx`, rewriteAliases(code));

    items.push({
      name,
      type: "registry:ui",
      title: title ?? titleCase(name),
      description: description ?? `The ${titleCase(name)} component.`,
      dependencies,
      registryDependencies,
      files: [
        {
          path: `registry/${name}.tsx`,
          type: "registry:ui",
          target: `components/ui/${name}.tsx`,
        },
      ],
    });
  }

  // --- lib item: cn/utils (registry:lib) ---
  {
    const code = readFileSync(resolve(UI_SRC, "lib/utils.ts"), "utf-8");
    const { dependencies } = parseDeps(code);
    stageFile("lib/utils.ts", rewriteAliases(code));
    items.push({
      name: "utils",
      type: "registry:lib",
      title: "Utils",
      description: "The `cn` class-name helper used by every component.",
      dependencies,
      registryDependencies: [],
      files: [
        { path: "registry/lib/utils.ts", type: "registry:lib", target: "lib/utils.ts" },
      ],
    });
  }

  // --- hook item: use-mobile (registry:hook) ---
  {
    const code = readFileSync(resolve(UI_SRC, "hooks/use-mobile.ts"), "utf-8");
    const { dependencies } = parseDeps(code);
    stageFile("hooks/use-mobile.ts", rewriteAliases(code));
    items.push({
      name: "use-mobile",
      type: "registry:hook",
      title: "use-mobile",
      description: "A hook that tracks whether the viewport is below the mobile breakpoint.",
      dependencies,
      registryDependencies: [],
      files: [
        { path: "registry/hooks/use-mobile.ts", type: "registry:hook", target: "hooks/use-mobile.ts" },
      ],
    });
  }

  // --- theme item: cssVars from globals.css (registry:theme) ---
  {
    const css = readFileSync(GLOBALS_CSS, "utf-8");
    items.push({
      name: "theme",
      type: "registry:theme",
      title: "Theme",
      description:
        "The design system's color tokens and radius as CSS variables for light and dark mode.",
      cssVars: {
        light: parseCssBlock(css, ":root"),
        dark: parseCssBlock(css, "\\.dark"),
      },
    });
  }

  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: REGISTRY_NAME,
    homepage: REGISTRY_URL,
    items,
  };
  writeFileSync(REGISTRY_JSON, JSON.stringify(registry, null, 2) + "\n");

  // --- shadcn build -> public/r/*.json ---
  execFileSync(SHADCN_BIN, ["build", "registry.json", "-o", "public/r"], {
    cwd: DOCS_ROOT,
    stdio: "inherit",
  });

  // --- Index for the shadcn MCP server + gallery (public/r/registry.json) ---
  const index = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: REGISTRY_NAME,
    homepage: REGISTRY_URL,
    items: items.map(({ name, type, title, description }) => ({
      name,
      type,
      title,
      description,
    })),
  };
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(join(OUTPUT_DIR, "registry.json"), JSON.stringify(index, null, 2) + "\n");

  console.log(`Built ${items.length} registry items to public/r.`);
}

main();
