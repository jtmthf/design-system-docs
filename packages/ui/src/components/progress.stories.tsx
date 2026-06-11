import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "#components/progress"

/**
 * Shows the completion status of a task or operation. Compose with
 * `ProgressTrack`, `ProgressIndicator`, `ProgressLabel`, and `ProgressValue`
 * for a full accessible progress bar.
 */
const meta = {
  component: Progress,
  tags: ["ai-generated"],
  args: {
    value: 50,
  },
  argTypes: {
    value: {
      description: "Current value between 0 and `max`.",
      control: { type: "range", min: 0, max: 100 },
      table: {
        category: "State",
        type: { summary: "number" },
      },
    },
    max: {
      description: "Maximum possible value. Defaults to 100.",
      control: "number",
      table: {
        category: "State",
        type: { summary: "number" },
        defaultValue: { summary: "100" },
      },
    },
    "aria-label": {
      description:
        "Accessible name for the progressbar. Required when no visible label is present.",
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
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

/** Standard progress bar with no visible label. Provide `aria-label` for screen readers. */
export const Default: Story = {
  render: (args) => (
    <Progress aria-label="Upload progress" {...args} className="w-80">
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  ),
}

/** Progress bar with a visible label and numeric value. `ProgressLabel` supplies the accessible name automatically. */
export const WithLabel: Story = {
  render: (args) => (
    <Progress {...args} className="w-80">
      <ProgressLabel>Uploading file</ProgressLabel>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
      <ProgressValue />
    </Progress>
  ),
}

/** Progress bar at 100% — the indicator fills the track completely. */
export const Complete: Story = {
  args: { value: 100 },
  render: (args) => (
    <Progress aria-label="Upload progress" {...args} className="w-80">
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  ),
}
