import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";

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
              jsx: 4 /* ts.JsxEmit.ReactJSX */,
              jsxImportSource: "react",
              module: 99 /* ts.ModuleKind.ESNext */,
              target: 99 /* ts.ScriptTarget.ESNext */,
              lib: ["lib.dom.d.ts", "lib.esnext.d.ts"],
              baseUrl: "../..",
              paths: {
                "@workspace/ui/*": ["./packages/ui/src/*"],
                "#lib/*": ["./packages/ui/src/lib/*"],
                "#components/*": ["./packages/ui/src/components/*"],
                "#hooks/*": ["./packages/ui/src/hooks/*"],
              },
            },
          },
        }),
      ],
    },
  },
});
