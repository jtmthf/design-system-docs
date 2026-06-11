import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import { Input } from "#components/input"

/**
 * A single-line text field. Use inside a `Field` or `Label` wrapper for
 * accessible form composition. Supports all standard HTML input attributes.
 */
const meta = {
  component: Input,
  tags: ["ai-generated"],
  args: {
    placeholder: "Email",
    disabled: false,
    "aria-invalid": false,
  },
  argTypes: {
    type: {
      description: "HTML input type.",
      control: "select",
      options: [
        "text",
        "password",
        "email",
        "number",
        "search",
        "tel",
        "url",
        "date",
        "datetime-local",
        "time",
        "month",
        "week",
      ],
      table: {
        category: "HTML",
        type: {
          summary:
            '"text" | "password" | "email" | "number" | "search" | "tel" | "url" | "date" | "datetime-local" | "time" | "month" | "week"',
        },
        defaultValue: { summary: '"text"' },
      },
    },
    placeholder: {
      description: "Hint text shown when the field is empty.",
      control: "text",
      table: { category: "Content" },
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
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/** Standard empty text field with a placeholder. */
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByPlaceholderText<HTMLInputElement>("Email")
    await userEvent.type(input, "ada@example.com")
    await expect(input).toHaveValue("ada@example.com")
  },
}

/** Non-editable state for read-only forms. */
export const Disabled: Story = {
  args: { disabled: true, value: "Read only" },
}

/** Visual treatment for validation errors. Always pair with an error message. */
export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "not-an-email" },
}

/** Masked entry for sensitive data. */
export const Password: Story = {
  args: { type: "password", placeholder: "Password" },
}
