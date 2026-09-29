import { nextJsConfig } from "@workspace/eslint-config/next-js";

/** @type {import("eslint").Linter.Config} */
export default [
  // Generated: fumadocs-mdx output and the built shadcn registry.
  { ignores: [".source/**", "registry/**"] },
  ...nextJsConfig,
  {
    // Run by hand against a dev server, not as a turbo task, so its env vars
    // have no task to be declared on.
    files: ["scripts/build-template-specs.mjs"],
    rules: {
      "turbo/no-undeclared-env-vars": ["warn", { allowList: ["^PLAYGROUND_"] }],
    },
  },
];
