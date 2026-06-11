import type { Meta, StoryObj } from "@storybook/react-vite"

import { Separator } from "#components/separator"

/**
 * A thin line that divides content visually. Use `orientation` to create
 * vertical or horizontal dividers.
 */
const meta = {
  component: Separator,
  tags: ["ai-generated"],
  args: {
    orientation: "horizontal",
  },
  argTypes: {
    orientation: {
      description: "Direction of the dividing line.",
      control: "select",
      options: ["horizontal", "vertical"],
      table: {
        category: "Appearance",
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: '"horizontal"' },
      },
    },
    className: {
      description: "Additional Tailwind classes.",
      control: "text",
      table: { category: "HTML" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

/** Horizontal separator dividing stacked content blocks. */
export const Default: Story = {
  render: (args) => (
    <div className="w-72 space-y-2 text-sm">
      <p>Above the separator</p>
      <Separator {...args} />
      <p>Below the separator</p>
    </div>
  ),
}

/** Vertical separator for inline content such as toolbars or breadcrumbs. */
export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="flex h-8 items-center gap-2 text-sm">
      <span>Item A</span>
      <Separator {...args} className="h-4" />
      <span>Item B</span>
    </div>
  ),
}
