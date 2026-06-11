import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import { Textarea } from "#components/textarea"

/**
 * A multi-line text field for longer free-form input. Supports all
 * standard HTML textarea attributes.
 */
const meta = {
  component: Textarea,
  tags: ["ai-generated"],
  args: {
    placeholder: "Type your message...",
    disabled: false,
    rows: 4,
  },
  argTypes: {
    placeholder: {
      description: "Hint text shown when empty.",
      control: "text",
      table: { category: "Content" },
    },
    rows: {
      description: "Visible height in lines. The element also auto-grows via `field-sizing-content`.",
      control: "number",
      table: { category: "HTML" },
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
    defaultValue: {
      description: "Initial uncontrolled value.",
      control: "text",
      table: { category: "State" },
    },
    value: {
      description: "Controlled value.",
      control: "text",
      table: { category: "State" },
    },
    className: {
      description: "Additional Tailwind classes.",
      control: "text",
      table: { category: "HTML" },
    },
    onChange: {
      description: "Fired when the value changes.",
      action: "changed",
      table: { category: "Events" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

/** Standard empty textarea with a placeholder. Auto-grows as the user types. */
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByPlaceholderText<HTMLTextAreaElement>(
      "Type your message..."
    )
    await userEvent.type(textarea, "Hello world")
    await expect(textarea).toHaveValue("Hello world")
  },
}

/** Non-editable state for read-only contexts. */
export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Read-only content" },
}

/** Visual and ARIA treatment for validation errors. Always pair with an error message. */
export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "Invalid input" },
}
