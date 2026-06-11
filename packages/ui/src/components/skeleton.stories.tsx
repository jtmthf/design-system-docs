import type { Meta, StoryObj } from "@storybook/react-vite"

import { Skeleton } from "#components/skeleton"

/**
 * A placeholder animation for content that is still loading.
 * Use `className` to match the dimensions of the content being replaced.
 */
const meta = {
  component: Skeleton,
  tags: ["ai-generated"],
  argTypes: {
    className: {
      description: "Tailwind classes to set width, height, and shape.",
      control: "text",
      table: { category: "HTML" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

/** Single line skeleton matching a body-text row. */
export const Default: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
}

/** Circular skeleton matching an avatar or icon placeholder. */
export const Circle: Story = {
  render: () => <Skeleton className="size-12 rounded-full" />,
}

/** Composed skeleton that mirrors a typical card layout with text lines and an image block. */
export const CardSkeleton: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-72" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-32 w-80 rounded-xl" />
    </div>
  ),
}
