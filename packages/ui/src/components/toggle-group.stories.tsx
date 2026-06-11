import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "#components/toggle-group"

/**
 * A container that groups related `Toggle` items and manages their shared
 * variant and size. Supports both single-select and multi-select modes.
 */
const meta = {
  component: ToggleGroup,
  tags: ["ai-generated"],
  args: {
    variant: "default",
    size: "default",
    spacing: 2,
    orientation: "horizontal",
  },
  argTypes: {
    variant: {
      description: "Visual style applied to all items in the group.",
      control: "select",
      options: ["default", "outline"],
      table: {
        category: "Appearance",
        type: { summary: '"default" | "outline"' },
        defaultValue: { summary: '"default"' },
      },
    },
    size: {
      description: "Size applied to all items in the group.",
      control: "select",
      options: ["sm", "default", "lg"],
      table: {
        category: "Appearance",
        type: { summary: '"sm" | "default" | "lg"' },
        defaultValue: { summary: '"default"' },
      },
    },
    spacing: {
      description:
        "Gap between items in spacing units. Set to 0 for a joined/pill appearance.",
      control: "number",
      table: {
        category: "Appearance",
        defaultValue: { summary: "2" },
      },
    },
    orientation: {
      description: "Direction of the item layout.",
      control: "select",
      options: ["horizontal", "vertical"],
      table: {
        category: "Appearance",
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: '"horizontal"' },
      },
    },
    multiple: {
      description:
        "When true, multiple items can be pressed simultaneously (multi-select).",
      control: "boolean",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    className: {
      description: "Additional Tailwind classes.",
      control: "text",
      table: { category: "HTML" },
    },
    onValueChange: {
      description: "Fired when the selection changes.",
      action: "valueChanged",
      table: { category: "Events" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Single-select group for mutually exclusive alignment choices. */
export const Default: Story = {
  render: (args) => (
    <ToggleGroup {...args} defaultValue={["left"]}>
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const center = canvas.getByRole("button", { name: /align center/i })
    await userEvent.click(center)
    await expect(center).toHaveAttribute("aria-pressed", "true")
    const left = canvas.getByRole("button", { name: /align left/i })
    await expect(left).toHaveAttribute("aria-pressed", "false")
  },
}

/** Multi-select group where multiple formatting options can be active at once. */
export const MultiSelect: Story = {
  render: (args) => (
    <ToggleGroup {...args} multiple>
      <ToggleGroupItem value="bold" aria-label="Bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const bold = canvas.getByRole("button", { name: /bold/i })
    const italic = canvas.getByRole("button", { name: /italic/i })
    await userEvent.click(bold)
    await userEvent.click(italic)
    await expect(bold).toHaveAttribute("aria-pressed", "true")
    await expect(italic).toHaveAttribute("aria-pressed", "true")
  },
}

/** Joined pill appearance achieved with `spacing={0}` and the outline variant. */
export const Joined: Story = {
  render: (args) => (
    <ToggleGroup {...args} variant="outline" spacing={0} defaultValue={["left"]}>
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/** Vertical layout for sidebar toolbars or stacked option panels. */
export const Vertical: Story = {
  render: (args) => (
    <ToggleGroup {...args} orientation="vertical" defaultValue={["left"]}>
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}
