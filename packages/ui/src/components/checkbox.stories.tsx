import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import { Checkbox } from "#components/checkbox"
import { Label } from "#components/label"

/**
 * A binary control that lets users toggle a single option on or off.
 * Always pair with a `Label` so the choice is announced by screen readers.
 */
const meta = {
  component: Checkbox,
  tags: ["ai-generated"],
  args: {
    defaultChecked: false,
    disabled: false,
  },
  argTypes: {
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
    required: {
      description: "Marks the field as required for form validation.",
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
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

/** Unchecked checkbox ready for user input. */
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox")
    await expect(checkbox).toHaveAttribute("aria-checked", "false")
    await userEvent.click(checkbox)
    await expect(checkbox).toHaveAttribute("aria-checked", "true")
  },
}

/** Pre-selected option for forms with defaults. */
export const Checked: Story = { args: { defaultChecked: true } }

/** Non-interactive state for read-only contexts. */
export const Disabled: Story = { args: { disabled: true } }

/** Visual and ARIA treatment for validation errors. Always pair with an error message. */
export const Invalid: Story = {
  args: { "aria-invalid": true },
}

/** Accessible composition pattern: wrap the checkbox in a `Label`. */
export const WithLabel: Story = {
  render: () => (
    <Label>
      <Checkbox defaultChecked />
      Accept terms and conditions
    </Label>
  ),
}
