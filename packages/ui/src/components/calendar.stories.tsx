import type { Meta, StoryObj } from "@storybook/react-vite"

import { Calendar } from "#components/calendar"

/**
 * A date picker calendar built on react-day-picker. Supports single dates,
 * ranges, and multi-select modes, with optional dropdown navigation.
 */
const meta = {
  component: Calendar,
  tags: ["ai-generated"],
  args: {
    showOutsideDays: true,
    captionLayout: "label",
    buttonVariant: "ghost",
  },
  argTypes: {
    captionLayout: {
      description: "How the month caption is rendered.",
      control: "select",
      options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
      table: {
        category: "Appearance",
        type: {
          summary: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
        },
        defaultValue: { summary: '"label"' },
      },
    },
    buttonVariant: {
      description: "Variant applied to the previous/next navigation buttons.",
      control: "select",
      options: ["default", "secondary", "outline", "destructive", "ghost", "link"],
      table: {
        category: "Appearance",
        type: {
          summary: '"default" | "secondary" | "outline" | "destructive" | "ghost" | "link"',
        },
        defaultValue: { summary: '"ghost"' },
      },
    },
    showOutsideDays: {
      description: "Whether days outside the current month are shown.",
      control: "boolean",
      table: {
        category: "Appearance",
        defaultValue: { summary: "true" },
      },
    },
    showWeekNumber: {
      description: "Whether ISO week numbers are shown as the first column.",
      control: "boolean",
      table: { category: "Appearance" },
    },
    mode: {
      description: "Selection mode: single date, range, or multiple dates.",
      control: "select",
      options: ["single", "range", "multiple"],
      table: {
        category: "State",
        type: { summary: '"single" | "range" | "multiple"' },
      },
    },
    disabled: {
      description: "Matcher(s) for dates that cannot be selected.",
      control: false,
      table: { category: "State" },
    },
    className: {
      description: "Additional Tailwind classes applied to the root element.",
      control: "text",
      table: { category: "HTML" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default single-date calendar. Click any day to select it. Today is
 * highlighted with a muted background.
 */
export const Default: Story = {
  args: {
    mode: "single",
  },
}

/**
 * Range selection. Click a start date then an end date to highlight a span.
 */
export const Range: Story = {
  args: {
    mode: "range",
    defaultMonth: new Date(2025, 0, 1),
    selected: {
      from: new Date(2025, 0, 8),
      to: new Date(2025, 0, 15),
    },
  },
}

/**
 * Dropdown navigation gives users quick access to any month and year without
 * paging through months one at a time. Bound the range with `startMonth`/`endMonth`.
 */
export const DropdownNavigation: Story = {
  args: {
    mode: "single",
    captionLayout: "dropdown",
    startMonth: new Date(2020, 0),
    endMonth: new Date(2030, 11),
  },
}

/**
 * Demonstrates disabled dates — here every weekend is non-selectable.
 */
export const WithDisabledDates: Story = {
  args: {
    mode: "single",
    disabled: { dayOfWeek: [0, 6] },
  },
}
