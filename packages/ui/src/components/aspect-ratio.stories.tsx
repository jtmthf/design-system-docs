import type { Meta, StoryObj } from "@storybook/react-vite"

import { AspectRatio } from "#components/aspect-ratio"

/**
 * Constrains a child element to a given width-to-height ratio. Useful for
 * images, videos, maps, or any embed that must preserve its proportions
 * regardless of the available width.
 */
const meta = {
  component: AspectRatio,
  tags: ["ai-generated"],
  args: {
    ratio: 16 / 9,
  },
  argTypes: {
    ratio: {
      description:
        "Width divided by height (e.g. 16/9, 4/3, 1). The component uses this as a CSS custom property.",
      control: { type: "number", step: 0.01, min: 0.1 },
      table: {
        category: "Appearance",
        type: { summary: "number" },
        defaultValue: { summary: "16/9" },
      },
    },
    className: {
      description: "Additional Tailwind classes applied to the wrapper div.",
      control: "text",
      table: { category: "HTML" },
    },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

/** Widescreen 16 ∶ 9 — the default ratio for video and hero images. */
export const Widescreen: Story = {
  args: { ratio: 16 / 9 },
  render: (args) => (
    <div className="w-full max-w-lg">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="White wall with framed photo"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

/** Square 1 ∶ 1 — profile pictures, thumbnails, and avatar frames. */
export const Square: Story = {
  args: { ratio: 1 },
  render: (args) => (
    <div className="w-48">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&dpr=2&q=80"
          alt="Abstract portrait"
          className="h-full w-full rounded-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

/** Classic 4 ∶ 3 — maps, legacy video, or photograph crops. */
export const Classic: Story = {
  args: { ratio: 4 / 3 },
  render: (args) => (
    <div className="w-full max-w-md">
      <AspectRatio {...args}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
          <span className="text-sm text-muted-foreground">4 : 3 container</span>
        </div>
      </AspectRatio>
    </div>
  ),
}
