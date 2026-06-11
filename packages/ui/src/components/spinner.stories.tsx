import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import { Spinner } from "#components/spinner"

/**
 * Communicates that an operation is in progress. The spinner is
 * automatically announced to screen readers via `role="status"`.
 */
const meta = {
  component: Spinner,
  tags: ["ai-generated"],
  argTypes: {
    className: {
      description: "Tailwind classes to change size or colour.",
      control: "text",
      table: { category: "HTML" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

/** Default 16 px spinner. Suitable for inline or icon-sized contexts. */
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("status")).toBeVisible()
  },
}

/** Larger 32 px spinner for full-page or section-level loading states. */
export const Large: Story = {
  args: { className: "size-8" },
}

/** Spinner embedded inside a button to indicate an in-progress action. */
export const InsideButton: Story = {
  render: () => (
    <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
      <Spinner className="size-4 text-primary-foreground" />
      Saving...
    </button>
  ),
}
