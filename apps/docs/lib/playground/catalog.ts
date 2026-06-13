import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { z } from "zod";

const labelProp = z.string().optional().describe("Label or text content");

const variantProp = (
  values: string[],
  defaultValue: string,
  description: string
) =>
  z
    .enum(values as [string, ...string[]])
    .optional()
    .describe(`${description}. Default: "${defaultValue}"`);

const sizeProp = (
  values: string[],
  defaultValue: string,
  description: string
) =>
  z
    .enum(values as [string, ...string[]])
    .optional()
    .describe(`${description}. Default: "${defaultValue}"`);

export const catalog = defineCatalog(schema, {
  components: {
    // Layout
    Stack: {
      props: z.object({
        direction: z.enum(["row", "column"]).optional().describe("Flex direction. Default: 'column'"),
        gap: z.number().min(0).max(12).optional().describe("Tailwind gap scale (0-12). Default: 2"),
        align: z.enum(["start", "center", "end", "stretch", "baseline"]).optional().describe("align-items"),
        justify: z.enum(["start", "center", "end", "between", "around", "evenly"]).optional().describe("justify-content"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Flex container for vertical or horizontal layouts",
    },
    Grid: {
      props: z.object({
        columns: z.number().min(1).max(12).optional().describe("Number of grid columns (1-12). Default: 2"),
        gap: z.number().min(0).max(12).optional().describe("Tailwind gap scale (0-12). Default: 2"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "CSS grid container",
    },

    // Content
    Heading: {
      props: z.object({
        text: z.string().describe("Heading text content"),
        level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional().describe("Heading level (h1-h4). Default: 2"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Section heading (h1-h4)",
    },
    Text: {
      props: z.object({
        text: z.string().describe("Paragraph text content"),
        variant: z.enum(["body", "muted", "caption", "lead"]).optional().describe("Text style variant. Default: 'body'"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Paragraph text with style variants",
    },

    // Actions
    Button: {
      props: z.object({
        label: z.string().describe("Button text label"),
        variant: z.enum(["default", "destructive", "outline", "secondary", "ghost", "link"]).optional().describe("Visual style variant. Default: 'default'"),
        size: z.enum(["default", "sm", "lg", "icon"]).optional().describe("Size variant. Default: 'default'"),
        disabled: z.boolean().optional().describe("Disable the button"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "A clickable button with style variants and sizes",
    },
    ButtonGroup: {
      props: z.object({
        orientation: z.enum(["horizontal", "vertical"]).optional().describe("Layout direction. Default: 'horizontal'"),
        items: z.array(z.object({
          label: z.string().describe("Button text"),
          variant: z.enum(["default", "destructive", "outline", "secondary", "ghost", "link"]).optional(),
          size: z.enum(["default", "sm", "lg", "icon"]).optional(),
          disabled: z.boolean().optional(),
        })).optional().describe("Array of button definitions to render inside the group"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "A container that visually merges related buttons into a single unit",
    },

    // Indicators
    Badge: {
      props: z.object({
        text: z.string().describe("Badge text content"),
        variant: z.enum(["default", "secondary", "destructive", "outline", "ghost", "link"]).optional().describe("Visual style variant. Default: 'default'"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Compact inline status label",
    },
    Spinner: {
      props: z.object({
        size: z.enum(["sm", "default", "lg"]).optional().describe("Spinner size. Default: 'default'"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Loading indicator",
    },
    Skeleton: {
      props: z.object({
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Placeholder loading shape",
    },
    Progress: {
      props: z.object({
        value: z.number().min(0).max(100).describe("Current progress value (0-100)"),
        max: z.number().optional().describe("Maximum value. Default: 100"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Progress bar indicator",
    },

    // Display
    Card: {
      props: z.object({
        size: z.enum(["default", "sm"]).optional().describe("Card size. Default: 'default'"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "A surface container for grouping related content",
    },
    CardHeader: {
      props: z.object({
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Top section of a Card containing title, description, and optional action",
    },
    CardTitle: {
      props: z.object({
        text: z.string().describe("Title text"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Primary heading of a Card",
    },
    CardDescription: {
      props: z.object({
        text: z.string().describe("Description text"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Supporting subtitle text below the CardTitle",
    },
    CardContent: {
      props: z.object({
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Body area of a Card",
    },
    CardFooter: {
      props: z.object({
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Bottom section of a Card with actions",
    },
    Avatar: {
      props: z.object({
        size: z.enum(["sm", "default", "lg"]).optional().describe("Avatar size. Default: 'default'"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "User image or fallback container",
    },
    AvatarImage: {
      props: z.object({
        src: z.string().describe("Image URL"),
        alt: z.string().optional().describe("Alt text for accessibility"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Image inside an Avatar",
    },
    AvatarFallback: {
      props: z.object({
        text: z.string().describe("Fallback text (initials or name)"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Text fallback when Avatar image fails to load",
    },
    Separator: {
      props: z.object({
        orientation: z.enum(["horizontal", "vertical"]).optional().describe("Divider orientation. Default: 'horizontal'"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Visual divider line",
    },

    // Feedback
    Alert: {
      props: z.object({
        variant: z.enum(["default", "destructive"]).optional().describe("Alert style variant. Default: 'default'"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Non-modal callout for status messages",
    },
    AlertTitle: {
      props: z.object({
        text: z.string().describe("Alert title text"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Heading line of an Alert",
    },
    AlertDescription: {
      props: z.object({
        text: z.string().describe("Alert body text"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Body text providing additional context in an Alert",
    },

    // Input
    Input: {
      props: z.object({
        type: z.enum(["text", "email", "password", "number", "search", "url", "tel"]).optional().describe("Input type. Default: 'text'"),
        placeholder: z.string().optional().describe("Placeholder text"),
        value: z.string().optional().describe("Current input value"),
        disabled: z.boolean().optional().describe("Disable the input"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Single-line text input field",
    },
    Textarea: {
      props: z.object({
        placeholder: z.string().optional().describe("Placeholder text"),
        value: z.string().optional().describe("Current textarea value"),
        disabled: z.boolean().optional().describe("Disable the textarea"),
        rows: z.number().optional().describe("Number of visible rows"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Multi-line text input field",
    },
    Select: {
      props: z.object({
        value: z.string().optional().describe("Currently selected value"),
        placeholder: z.string().optional().describe("Placeholder text shown when no value is selected"),
        disabled: z.boolean().optional().describe("Disable the select"),
        options: z.array(z.object({
          value: z.string().describe("Option value"),
          label: z.string().describe("Option label"),
          disabled: z.boolean().optional(),
        })).optional().describe("Array of options to render in the dropdown"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Single-select dropdown with a trigger and list of options",
    },
    Checkbox: {
      props: z.object({
        checked: z.boolean().optional().describe("Whether the checkbox is checked"),
        label: z.string().optional().describe("Label text displayed next to the checkbox"),
        disabled: z.boolean().optional().describe("Disable the checkbox"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Checkable toggle control",
    },
    Switch: {
      props: z.object({
        checked: z.boolean().optional().describe("Whether the switch is turned on"),
        label: z.string().optional().describe("Label text displayed next to the switch"),
        disabled: z.boolean().optional().describe("Disable the switch"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Toggle switch control",
    },
    Slider: {
      props: z.object({
        value: z.number().optional().describe("Current slider value"),
        min: z.number().optional().describe("Minimum value. Default: 0"),
        max: z.number().optional().describe("Maximum value. Default: 100"),
        step: z.number().optional().describe("Step increment. Default: 1"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Range slider control",
    },
    RadioGroup: {
      props: z.object({
        value: z.string().optional().describe("Currently selected value"),
        disabled: z.boolean().optional().describe("Disable the radio group"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Group of radio buttons where only one can be selected",
    },
    RadioGroupItem: {
      props: z.object({
        value: z.string().describe("Radio item value"),
        label: z.string().optional().describe("Label text for the radio item"),
        disabled: z.boolean().optional().describe("Disable this radio item"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Individual radio button inside a RadioGroup",
    },
    Label: {
      props: z.object({
        text: z.string().describe("Label text content"),
        htmlFor: z.string().optional().describe("ID of the associated form control"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Accessible label for form controls",
    },

    // Navigation
    Tabs: {
      props: z.object({
        value: z.string().optional().describe("Currently active tab value (controlled)"),
        defaultValue: z.string().optional().describe("Default active tab value (uncontrolled)"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Tabbed navigation with list triggers and content panels",
    },
    TabsList: {
      props: z.object({
        variant: z.enum(["default", "line"]).optional().describe("List style variant. Default: 'default'"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Container for tab trigger buttons",
    },
    TabsTrigger: {
      props: z.object({
        value: z.string().describe("Tab value identifier"),
        text: z.string().describe("Tab trigger label text"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Clickable tab trigger button",
    },
    TabsContent: {
      props: z.object({
        value: z.string().describe("Tab value identifier this panel belongs to"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Panel shown when its associated tab trigger is active",
    },
    Pagination: {
      props: z.object({
        count: z.number().describe("Total number of pages"),
        page: z.number().describe("Current active page (1-based)"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Navigation landmark for paginated content",
    },

    // Overlay
    Dialog: {
      props: z.object({
        title: z.string().optional().describe("Dialog title text"),
        description: z.string().optional().describe("Dialog description text"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Modal dialog overlay (always visible in preview)",
    },
    DialogContent: {
      props: z.object({
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Popup panel inside a Dialog",
    },
    DialogHeader: {
      props: z.object({
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Top section of DialogContent for title and description",
    },
    DialogTitle: {
      props: z.object({
        text: z.string().describe("Dialog title text"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Accessible title for the dialog",
    },
    DialogDescription: {
      props: z.object({
        text: z.string().describe("Dialog description text"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Supplementary description for the dialog",
    },
    DialogFooter: {
      props: z.object({
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Action area at the bottom of DialogContent",
    },
    Drawer: {
      props: z.object({
        title: z.string().optional().describe("Drawer title text"),
        description: z.string().optional().describe("Drawer description text"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Slide-in panel overlay (always visible in preview)",
    },
    DrawerContent: {
      props: z.object({
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Slide-in panel inside a Drawer",
    },
    DrawerHeader: {
      props: z.object({
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Top section of DrawerContent",
    },
    DrawerTitle: {
      props: z.object({
        text: z.string().describe("Drawer title text"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Accessible title for the drawer",
    },
    DrawerDescription: {
      props: z.object({
        text: z.string().describe("Drawer description text"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Supplementary description for the drawer",
    },
    DrawerFooter: {
      props: z.object({
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Bottom action area of DrawerContent",
    },
    DropdownMenu: {
      props: z.object({
        text: z.string().optional().describe("Trigger button text"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Floating menu popup (always visible in preview)",
    },
    Tooltip: {
      props: z.object({
        text: z.string().describe("Tooltip text content"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Floating label on hover (always visible in preview)",
    },

    // Data
    Table: {
      props: z.object({
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Data table with rows and columns",
    },
    TableHeader: {
      props: z.object({
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Table header section containing column headings",
    },
    TableBody: {
      props: z.object({
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Table body section containing data rows",
    },
    TableRow: {
      props: z.object({
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Single row in a table",
    },
    TableHead: {
      props: z.object({
        text: z.string().describe("Column header text"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Individual column header cell",
    },
    TableCell: {
      props: z.object({
        text: z.string().describe("Cell text content"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Individual data cell",
    },

    // Disclosure
    Accordion: {
      props: z.object({
        type: z.enum(["single", "multiple"]).optional().describe("Whether one or multiple items can be open. Default: 'single'"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Stacked collapsible panels",
    },
    AccordionItem: {
      props: z.object({
        value: z.string().describe("Unique identifier for this accordion item"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Single collapsible section within an Accordion",
    },
    AccordionTrigger: {
      props: z.object({
        text: z.string().describe("Trigger button text"),
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      description: "Clickable header that toggles an AccordionItem",
    },
    AccordionContent: {
      props: z.object({
        className: z.string().optional().describe("Additional Tailwind CSS utility classes"),
      }),
      slots: ["default"],
      description: "Animated panel revealing body content of an AccordionItem",
    },

    // Styling
    TailwindStyle: {
      props: z.object({
        css: z.string().describe("Raw CSS content inside the style block. Use @theme to define custom colors, fonts, spacing, etc."),
      }),
      description: "Injects a <style type=\"text/tailwindcss\"> block for custom Tailwind theme definitions and arbitrary CSS",
    },
  },
  actions: {},
});

export type PlaygroundCatalog = typeof catalog;
