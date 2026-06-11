import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import { Label } from "#components/label"
import { Switch } from "#components/switch"

/**
 * A toggle that immediately applies a state change. Use for settings or
 * preferences where the effect is instant and does not require a submit button.
 */
const meta = {
  component: Switch,
  tags: ["ai-generated"],
  args: {
    size: "default",
    defaultChecked: false,
    disabled: false,
  },
  argTypes: {
    size: {
      description: "Physical size of the switch thumb and track.",
      control: "select",
      options: ["default", "sm"],
      table: {
        category: "Appearance",
        type: { summary: '"default" | "sm"' },
        defaultValue: { summary: '"default"' },
      },
    },
    defaultChecked: {
      description: "Initial checked state for uncontrolled usage.",
      control: "boolean",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    checked: {
      description: "Controlled checked state.",
      control: "boolean",
      table: { category: "State" },
    },
    disabled: {
      description: "Prevents user interaction.",
      control: "boolean",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    "aria-invalid": {
      description: "Signals validation failure to assistive technology.",
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
    onCheckedChange: {
      description: "Fired when the checked state changes.",
      action: "checkedChanged",
      table: { category: "Events" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

/** Off state with a grey track and left-aligned thumb. */
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("switch")
    await expect(toggle).toHaveAttribute("aria-checked", "false")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-checked", "true")
  },
}

/** On state with a filled track and right-aligned thumb. */
export const Checked: Story = { args: { defaultChecked: true } }

/** Compact variant for dense settings panels. */
export const Small: Story = { args: { size: "sm", defaultChecked: true } }

/** Non-interactive state for read-only contexts. */
export const Disabled: Story = { args: { disabled: true } }

/** Visual and ARIA treatment for validation errors. Always pair with an error message. */
export const Invalid: Story = {
  args: { "aria-invalid": true },
}

/** Recommended composition: label and switch share a click target. */
export const WithLabel: Story = {
  render: () => (
    <Label>
      <Switch defaultChecked />
      Enable notifications
    </Label>
  ),
}
