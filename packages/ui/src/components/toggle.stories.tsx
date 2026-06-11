import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import { Toggle } from "#components/toggle"

/**
 * A two-state button that lets users activate or deactivate a feature.
 * Common uses include text formatting, view modes, and toolbar actions.
 */
const meta = {
  component: Toggle,
  tags: ["ai-generated"],
  args: {
    variant: "default",
    size: "default",
    disabled: false,
  },
  argTypes: {
    variant: {
      description: "Visual style of the toggle.",
      control: "select",
      options: ["default", "outline"],
      table: {
        category: "Appearance",
        type: { summary: '"default" | "outline"' },
        defaultValue: { summary: '"default"' },
      },
    },
    size: {
      description: "Physical size of the toggle.",
      control: "select",
      options: ["sm", "default", "lg"],
      table: {
        category: "Appearance",
        type: { summary: '"sm" | "default" | "lg"' },
        defaultValue: { summary: '"default"' },
      },
    },
    disabled: {
      description: "Prevents user interaction.",
      control: "boolean",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    defaultPressed: {
      description: "Initial pressed state for uncontrolled usage.",
      control: "boolean",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    pressed: {
      description: "Controlled pressed state.",
      control: "boolean",
      table: { category: "State" },
    },
    onPressedChange: {
      description: "Fired when the pressed state changes.",
      action: "pressedChanged",
      table: { category: "Events" },
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
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

/** Default unpressed toggle; click to activate. */
export const Default: Story = {
  args: { children: <BoldIcon /> },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button")
    await expect(toggle).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-pressed", "true")
  },
}

/** Outline variant with a visible border for use on filled backgrounds. */
export const Outline: Story = {
  args: { variant: "outline", children: <ItalicIcon /> },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button")
    await expect(toggle).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-pressed", "true")
  },
}

/** Pre-activated state for a feature that is on by default. */
export const Pressed: Story = {
  args: { defaultPressed: true, children: <UnderlineIcon /> },
}

/** Non-interactive state for unavailable formatting actions. */
export const Disabled: Story = {
  args: { disabled: true, children: <BoldIcon /> },
}
