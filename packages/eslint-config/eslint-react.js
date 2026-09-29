import eslintReact from "@eslint-react/eslint-plugin"
import pluginReactHooks from "eslint-plugin-react-hooks"

const recommended = eslintReact.configs["recommended-typescript"]

/**
 * @eslint-react's recommended rules, minus its reimplementations of the hooks
 * rules — eslint-plugin-react-hooks owns those, so each issue is reported once.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const eslintReactConfig = [
  recommended,
  {
    rules: Object.fromEntries(
      Object.keys(recommended.rules)
        .filter((rule) => rule.replace("@eslint-react/", "") in pluginReactHooks.rules)
        .map((rule) => [rule, "off"])
    ),
  },
]
