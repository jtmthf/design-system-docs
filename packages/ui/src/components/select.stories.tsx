import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen } from "storybook/test"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "#components/select"

/**
 * A control for choosing one option from a list. The trigger displays the
 * current value; the popup presents scrollable items with keyboard support.
 */
const meta = {
  component: Select,
  tags: ["ai-generated"],
  args: {
    defaultValue: "apple",
  },
  argTypes: {
    defaultValue: {
      description: "Initially selected item value (uncontrolled).",
      control: "text",
      table: { category: "State" },
    },
    value: {
      description: "Controlled selected value.",
      control: "text",
      table: { category: "State" },
    },
    disabled: {
      description: "Prevents user interaction.",
      control: "boolean",
      table: { category: "State" },
    },
    name: {
      description: "HTML name attribute for form submission.",
      control: "text",
      table: { category: "HTML" },
    },
    onValueChange: {
      description: "Fired when the selected value changes.",
      action: "valueChanged",
      table: { category: "Events" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const Example = (props: React.ComponentProps<typeof Select>) => (
  <Select {...props}>
    <SelectTrigger className="w-56">
      <SelectValue placeholder="Pick a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
)

export const Default: Story = {
  render: (args) => <Example {...args} />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("combobox"))
    await expect(await screen.findByRole("listbox")).toBeVisible()
  },
}

export const SmallTrigger: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger size="sm" className="w-48">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectContent>
    </Select>
  ),
}
