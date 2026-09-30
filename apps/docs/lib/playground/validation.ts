import { validateSpec, type Spec, type SpecIssue } from "@json-render/core";

/**
 * Plain-language introduction for each validation code, so a malformed
 * generated spec reads as advice instead of a machine code. The raw
 * `SpecIssue.message` is kept as the detail line.
 */
const friendlySummary: Record<SpecIssue["code"], string> = {
  missing_root: "The generated UI has no root element.",
  root_not_found: "The generated UI points at a root element that doesn't exist.",
  empty_spec: "The generated UI is empty.",
  missing_child: "An element references a child that doesn't exist.",
  invalid_visible: "An element has an invalid visibility condition.",
  visible_in_props:
    "`visible` must sit next to `type`/`props`, not inside `props`.",
  on_in_props: "`on` must sit next to `type`/`props`, not inside `props`.",
  repeat_in_props: "`repeat` must sit next to `type`/`props`, not inside `props`.",
  watch_in_props: "`watch` must sit next to `type`/`props`, not inside `props`.",
  repeat_without_children:
    "A repeated container has no children, so it can't render one item per row.",
  repeat_item_outside_scope:
    "A nested list reads the current row with `$item` but isn't inside another repeat.",
  repeat_state_mismatch:
    "A repeated list points at state that isn't an array yet — seed it with sample items.",
  orphaned_element: "An element is not reachable from the root.",
};

export interface SpecProblem {
  code: SpecIssue["code"];
  /** Short, user-facing explanation of what's wrong. */
  summary: string;
  /** The validator's specific message, including the offending element key. */
  detail: string;
  elementKey?: string;
}

/**
 * Run the json-render validator and turn its machine codes into friendly,
 * renderable errors. Errors (not warnings) are surfaced: a warning like an
 * orphaned element is harmless in a live preview.
 */
export function findSpecProblems(spec: Spec | null | undefined): SpecProblem[] {
  if (!spec || typeof spec !== "object" || !spec.elements) return [];

  return validateSpec(spec).issues
    .filter((issue) => issue.severity === "error")
    .map((issue) => ({
      code: issue.code,
      summary: friendlySummary[issue.code] ?? "The generated UI has a problem.",
      detail: issue.message,
      elementKey: issue.elementKey,
    }));
}
