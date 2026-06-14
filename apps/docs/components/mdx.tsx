import { AutoTypeTable as AutoTypeTableBase } from "fumadocs-typescript/ui";
import defaultComponents from "fumadocs-ui/mdx";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Popup, PopupContent, PopupTrigger } from "fumadocs-twoslash/ui";
import type { ComponentType } from "react";

import { ComponentPreview } from "./component-preview";
import { ComponentSource } from "./component-source";
import { OpenInV0 } from "./open-in-v0";
import { generator } from "@/lib/typescript-generator";

function AutoTypeTable(props: React.ComponentProps<typeof AutoTypeTableBase>) {
  return <AutoTypeTableBase {...props} generator={generator} />;
}

interface PropsTableProps {
  /** Exported component name from `@workspace/ui`, e.g. `Button`. */
  component: string;
  /** Component file name in `@workspace/ui/components`, e.g. `button`. */
  source: string;
  /**
   * Native element the component renders, e.g. `button`, `div`, `input`.
   * Its HTML attributes are stripped from the table so only the
   * design-system-specific props remain. Pass `null` to keep all props.
   */
  element?: string | null;
}

/**
 * Renders a prop table for a UI component, type-checked against the real
 * component source. Base HTML element attributes are omitted by default so the
 * table shows only the props this design system adds.
 */
function PropsTable({ component, source, element = "div" }: PropsTableProps) {
  const base =
    element === null
      ? "Record<never, never>"
      : `import("react").ComponentProps<"${element}">`;

  const type = `
import { ${component} } from "@workspace/ui/components/${source}"
type Props = import("react").ComponentProps<typeof ${component}>
export type ResolvedProps = Omit<Props, keyof (${base})>
`;

  return (
    <AutoTypeTable type={type} name="ResolvedProps" generator={generator} />
  );
}

export const mdxComponents = {
  ...defaultComponents,
  Tabs,
  Tab,
  AutoTypeTable,
  PropsTable,
  ComponentPreview,
  ComponentSource,
  OpenInV0,
  Popup,
  PopupContent,
  PopupTrigger,
} as any;
