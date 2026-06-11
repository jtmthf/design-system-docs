import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "#components/label"
import { Input } from "#components/input"
import { Checkbox } from "#components/checkbox"

/**
 * Associates a caption with a form control. Clicking the label moves focus
 * to its control, improving accessibility and target size.
 */
const meta = {
  component: Label,
  tags: ["ai-generated"],
  args: {
    children: "Email address",
  },
  argTypes: {
    children: {
      description: "The label text.",
      control: "text",
      table: { category: "Content" },
    },
    htmlFor: {
      description: "ID of the associated form control.",
      control: "text",
      table: { category: "HTML" },
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
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label {...args} htmlFor="email" />
      <Input id="email" placeholder="ada@example.com" />
    </div>
  ),
}

export const WithCheckbox: Story = {
  render: () => (
    <Label className="flex items-center gap-2">
      <Checkbox />
      Accept terms and conditions
    </Label>
  ),
}
