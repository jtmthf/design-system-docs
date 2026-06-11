import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import { Label } from "#components/label"
import { RadioGroup, RadioGroupItem } from "#components/radio-group"

/**
 * A set of mutually exclusive options where only one can be selected at a time.
 * Always pair each `RadioGroupItem` with a `Label` for accessibility.
 */
const meta = {
  component: RadioGroup,
  tags: ["ai-generated"],
  args: {
    disabled: false,
  },
  argTypes: {
    defaultValue: {
      description: "Initially selected value for uncontrolled usage.",
      control: "text",
      table: { category: "State" },
    },
    value: {
      description: "Controlled selected value.",
      control: "text",
      table: { category: "State" },
    },
    disabled: {
      description: "Prevents user interaction on all items in the group.",
      control: "boolean",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    required: {
      description: "Marks the group as required for form validation.",
      control: "boolean",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    onValueChange: {
      description: "Fired when the selected value changes.",
      action: "valueChanged",
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
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Default group with no initial selection. Click an item to select it. */
export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" />
        Comfortable
      </Label>
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="compact" />
        Compact
      </Label>
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="spacious" />
        Spacious
      </Label>
    </RadioGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const item = canvas.getByRole("radio", { name: /comfortable/i })
    await userEvent.click(item)
    await expect(item).toBeChecked()
    const compact = canvas.getByRole("radio", { name: /compact/i })
    await userEvent.click(compact)
    await expect(compact).toBeChecked()
    await expect(item).not.toBeChecked()
  },
}

/** Pre-selected state for forms with a sensible default. */
export const WithDefault: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="compact">
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" />
        Comfortable
      </Label>
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="compact" />
        Compact
      </Label>
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="spacious" />
        Spacious
      </Label>
    </RadioGroup>
  ),
}

/** Non-interactive state when options are unavailable in the current context. */
export const Disabled: Story = {
  render: (args) => (
    <RadioGroup {...args} disabled defaultValue="comfortable">
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" />
        Comfortable
      </Label>
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="compact" />
        Compact
      </Label>
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="spacious" />
        Spacious
      </Label>
    </RadioGroup>
  ),
}

/** Visual and ARIA treatment for validation errors. Always pair with an error message. */
export const Invalid: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" aria-invalid />
        Comfortable
      </Label>
      <Label className="flex items-center gap-2">
        <RadioGroupItem value="compact" aria-invalid />
        Compact
      </Label>
    </RadioGroup>
  ),
}
