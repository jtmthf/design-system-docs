import { collectUsedComponents, serializeProps } from "@json-render/codegen";
import type { Spec, UIElement } from "@json-render/core";

const importMap: Record<string, string> = {
  Stack: "@/components/playground/primitives",
  Grid: "@/components/playground/primitives",
  Heading: "@/components/playground/primitives",
  Text: "@/components/playground/primitives",
  TailwindStyle: "@/components/playground/primitives",
  Button: "@workspace/ui/components/button",
  ButtonGroup: "@workspace/ui/components/button-group",
  Badge: "@workspace/ui/components/badge",
  Spinner: "@workspace/ui/components/spinner",
  Skeleton: "@workspace/ui/components/skeleton",
  Progress: "@workspace/ui/components/progress",
  Card: "@workspace/ui/components/card",
  CardHeader: "@workspace/ui/components/card",
  CardTitle: "@workspace/ui/components/card",
  CardDescription: "@workspace/ui/components/card",
  CardContent: "@workspace/ui/components/card",
  CardFooter: "@workspace/ui/components/card",
  Avatar: "@workspace/ui/components/avatar",
  AvatarImage: "@workspace/ui/components/avatar",
  AvatarFallback: "@workspace/ui/components/avatar",
  Separator: "@workspace/ui/components/separator",
  Alert: "@workspace/ui/components/alert",
  AlertTitle: "@workspace/ui/components/alert",
  AlertDescription: "@workspace/ui/components/alert",
  Input: "@workspace/ui/components/input",
  Textarea: "@workspace/ui/components/textarea",
  Select: "@workspace/ui/components/select",
  Checkbox: "@workspace/ui/components/checkbox",
  Switch: "@workspace/ui/components/switch",
  Slider: "@workspace/ui/components/slider",
  RadioGroup: "@workspace/ui/components/radio-group",
  RadioGroupItem: "@workspace/ui/components/radio-group",
  Label: "@workspace/ui/components/label",
  Tabs: "@workspace/ui/components/tabs",
  TabsList: "@workspace/ui/components/tabs",
  TabsTrigger: "@workspace/ui/components/tabs",
  TabsContent: "@workspace/ui/components/tabs",
  Pagination: "@workspace/ui/components/pagination",
  Dialog: "@workspace/ui/components/dialog",
  DialogContent: "@workspace/ui/components/dialog",
  DialogHeader: "@workspace/ui/components/dialog",
  DialogTitle: "@workspace/ui/components/dialog",
  DialogDescription: "@workspace/ui/components/dialog",
  DialogFooter: "@workspace/ui/components/dialog",
  Drawer: "@workspace/ui/components/drawer",
  DrawerContent: "@workspace/ui/components/drawer",
  DrawerHeader: "@workspace/ui/components/drawer",
  DrawerTitle: "@workspace/ui/components/drawer",
  DrawerDescription: "@workspace/ui/components/drawer",
  DrawerFooter: "@workspace/ui/components/drawer",
  DropdownMenu: "@workspace/ui/components/dropdown-menu",
  Tooltip: "@workspace/ui/components/tooltip",
  Table: "@workspace/ui/components/table",
  TableHeader: "@workspace/ui/components/table",
  TableBody: "@workspace/ui/components/table",
  TableRow: "@workspace/ui/components/table",
  TableHead: "@workspace/ui/components/table",
  TableCell: "@workspace/ui/components/table",
  Accordion: "@workspace/ui/components/accordion",
  AccordionItem: "@workspace/ui/components/accordion",
  AccordionTrigger: "@workspace/ui/components/accordion",
  AccordionContent: "@workspace/ui/components/accordion",
};

const childPropNames = ["text", "label"];

export function generateJSX(spec: Spec | null): string {
  if (!spec || !spec.root || !spec.elements[spec.root]) {
    return "// No UI generated yet";
  }

  const used = collectUsedComponents(spec);
  const imports: Record<string, string[]> = {};

  for (const name of used) {
    const path = importMap[name];
    if (path) {
      if (!imports[path]) imports[path] = [];
      if (!imports[path].includes(name)) imports[path].push(name);
    }
  }

  const importLines = Object.entries(imports)
    .map(([path, names]) => `import { ${names.join(", ")} } from "${path}";`)
    .join("\n");

  const body = elementToJSX(spec, spec.root, 1);

  return `${importLines}\n\nexport default function GeneratedUI() {\n  return (\n${body}\n  );\n}`;
}

function elementToJSX(spec: Spec, key: string, depth: number): string {
  const element = spec.elements[key];
  if (!element) return "";

  const { type, props = {} } = element;
  const children = element.children ?? [];

  const indent = "  ".repeat(depth);

  const childText = childPropNames
    .map((name) => props[name])
    .filter((v) => v !== undefined && v !== null && v !== "")
    .join("");

  const attrs: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(props)) {
    if (childPropNames.includes(k)) continue;
    if (v === undefined || v === null) continue;
    attrs[k] = v;
  }

  const attrString = serializeProps(attrs);
  const opening = attrString ? `${type} ${attrString}` : type;

  const childLines = children
    .map((childKey) => elementToJSX(spec, childKey, depth + 1))
    .filter(Boolean)
    .join("\n");

  if (childText || childLines) {
    const textLine = childText ? `${indent}  ${childText}` : "";
    const inner = [textLine, childLines].filter(Boolean).join("\n");
    return `${indent}<${opening}>\n${inner}\n${indent}</${type}>`;
  }

  return `${indent}<${opening} />`;
}
