import type { Meta, StoryObj } from "@storybook/react-vite"
import { CopyIcon, DownloadIcon, SearchIcon, SlidersHorizontalIcon } from "lucide-react"

import { Button } from "#components/button"
import { Input } from "#components/input"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "#components/button-group"

/**
 * A layout container that merges adjacent buttons and form controls into a
 * single visual unit. Supports horizontal and vertical orientations and
 * composes with `ButtonGroupText` and `ButtonGroupSeparator`.
 */
const meta = {
  component: ButtonGroup,
  tags: ["ai-generated"],
  args: {
    orientation: "horizontal",
  },
  argTypes: {
    orientation: {
      description: "Direction in which the children are arranged.",
      control: "select",
      options: ["horizontal", "vertical"],
      table: {
        category: "Appearance",
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: '"horizontal"' },
      },
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
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Two buttons fused into one unit — the most common split-button pattern. */
export const Default: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">
        <DownloadIcon />
        Download
      </Button>
      <Button variant="outline">
        <SlidersHorizontalIcon />
      </Button>
    </ButtonGroup>
  ),
}

/** Input with a prefix label and a suffix action button for a search bar. */
export const WithInput: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupText>
        <SearchIcon />
      </ButtonGroupText>
      <Input placeholder="Search…" className="w-48" />
      <Button variant="outline">Go</Button>
    </ButtonGroup>
  ),
}

/** A separator visually divides related sections within the group. */
export const WithSeparator: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Edit</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">
        <CopyIcon />
        Copy
      </Button>
    </ButtonGroup>
  ),
}

/** Vertical orientation for stacked toolbar or sidebar layouts. */
export const Vertical: Story = {
  render: (args) => (
    <ButtonGroup {...args} orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
}
