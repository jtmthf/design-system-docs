import type { Meta, StoryObj } from "@storybook/react-vite"

import { Slider } from "#components/slider"

/**
 * A draggable thumb on a track for selecting a numeric value or range within a
 * bounded interval. Supports single and dual-thumb (range) modes.
 */
const meta = {
  component: Slider,
  tags: ["ai-generated"],
  args: {
    min: 0,
    max: 100,
    disabled: false,
  },
  argTypes: {
    defaultValue: {
      description:
        "Initial value(s) for uncontrolled usage. Pass an array with one element for a single thumb or two elements for a range.",
      control: "object",
      table: { category: "State" },
    },
    value: {
      description: "Controlled value(s).",
      control: "object",
      table: { category: "State" },
    },
    min: {
      description: "Minimum value of the slider.",
      control: "number",
      table: {
        category: "Appearance",
        defaultValue: { summary: "0" },
      },
    },
    max: {
      description: "Maximum value of the slider.",
      control: "number",
      table: {
        category: "Appearance",
        defaultValue: { summary: "100" },
      },
    },
    step: {
      description: "Increment between selectable values.",
      control: "number",
      table: {
        category: "Appearance",
        defaultValue: { summary: "1" },
      },
    },
    orientation: {
      description: "Layout direction of the track.",
      control: "select",
      options: ["horizontal", "vertical"],
      table: {
        category: "Appearance",
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: '"horizontal"' },
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
    onValueChange: {
      description: "Fired continuously while the thumb is dragged.",
      action: "valueChanged",
      table: { category: "Events" },
    },
    onValueCommitted: {
      description: "Fired when the user releases the thumb.",
      action: "valueCommitted",
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
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

/** Single thumb starting at 40% of the range. */
export const Default: Story = {
  args: { defaultValue: [40] },
}

/** Two thumbs defining a selected range; useful for price or date filters. */
export const Range: Story = {
  args: { defaultValue: [20, 70] },
}

/** Snaps to increments of 10 for coarser control. */
export const Stepped: Story = {
  args: { defaultValue: [30], step: 10 },
}

/** Non-interactive state for read-only contexts. */
export const Disabled: Story = {
  args: { defaultValue: [60], disabled: true },
}
