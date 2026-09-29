import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";
import path from "node:path";

// Next and fumadocs-mdx run with apps/docs as the working directory.
const uiSrc = path.resolve(process.cwd(), "../../packages/ui/src");

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      defaultColor: false,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      transformers: [
        transformerTwoslash({
          twoslashOptions: {
            compilerOptions: {
              // JSX automatic runtime so `<Component />` type-checks without a
              // React import in scope (otherwise TS 2686: React UMD global).
              jsx: "react-jsx",
              jsxImportSource: "react",
              module: "esnext",
              target: "esnext",
              lib: ["dom", "esnext"],
              // Absolute paths: `baseUrl` is deprecated as of TypeScript 6.
              paths: {
                "@workspace/ui/*": [`${uiSrc}/*`],
                "#lib/*": [`${uiSrc}/lib/*`],
                "#components/*": [`${uiSrc}/components/*`],
                "#hooks/*": [`${uiSrc}/hooks/*`],
              },
            },
          },
        }),
      ],
    },
  },
});
