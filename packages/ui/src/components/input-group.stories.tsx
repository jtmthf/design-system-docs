import type { Meta, StoryObj } from "@storybook/react-vite"
import { SearchIcon, EyeIcon, AtSignIcon, DollarSignIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
  InputGroupButton,
} from "#components/input-group"

/**
 * A decorated input container that attaches icons, text, or action buttons
 * to either end of an input field. All focus and validation ring styling is
 * coordinated by the outer `InputGroup` wrapper.
 */
const meta = {
  component: InputGroup,
  tags: ["ai-generated"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      description: "Additional Tailwind classes applied to the group wrapper.",
      control: "text",
      table: { category: "HTML" },
    },
  },
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Search field with a leading icon and a clear button on the trailing end. */
export const WithIcons: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <SearchIcon />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search…" />
    </InputGroup>
  ),
}

/** Email field with a leading at-sign text decoration. */
export const WithTextAddon: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <AtSignIcon />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="username" />
    </InputGroup>
  ),
}

/** Currency input with a leading symbol and a trailing action button. */
export const WithButton: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <DollarSignIcon />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput type="number" placeholder="0.00" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>
          <EyeIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

/** Invalid state — the group applies a destructive ring to the entire control. */
export const Invalid: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <AtSignIcon />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput aria-invalid placeholder="username" defaultValue="bad value!" />
    </InputGroup>
  ),
}
