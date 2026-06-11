import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within, waitFor } from "storybook/test"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "#components/carousel"

/**
 * A touch-friendly slide carousel powered by Embla Carousel. Supports
 * horizontal and vertical orientations, keyboard navigation, and custom
 * options passed directly to the Embla API.
 */
const meta: Meta<typeof Carousel> = {
  component: Carousel,
  tags: ["ai-generated"],
  args: {
    orientation: "horizontal",
  },
  argTypes: {
    orientation: {
      description: "Scroll axis of the carousel.",
      control: "select",
      options: ["horizontal", "vertical"],
      table: {
        category: "Appearance",
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: '"horizontal"' },
      },
    },
    opts: {
      description: "Options forwarded directly to the Embla Carousel API.",
      control: false,
      table: { category: "Appearance" },
    },
    plugins: {
      description: "Embla Carousel plugins (e.g. Autoplay).",
      control: false,
      table: { category: "Appearance" },
    },
    setApi: {
      description: "Callback receiving the Embla API instance after mount.",
      control: false,
      table: { category: "Events" },
    },
    className: {
      description: "Additional Tailwind classes applied to the root element.",
      control: "text",
      table: { category: "HTML" },
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[480px] px-12">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

const slides = ["One", "Two", "Three", "Four", "Five"]

/**
 * Standard horizontal carousel with numbered slide cards and prev/next
 * navigation buttons.
 */
export const Default: Story = {
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {slides.map((label) => (
          <CarouselItem key={label}>
            <div className="flex aspect-square items-center justify-center rounded-lg border bg-muted text-2xl font-semibold">
              {label}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nextBtn = canvas.getByRole("button", { name: /next slide/i })
    const prevBtn = canvas.getByRole("button", { name: /previous slide/i })

    // Initially prev is disabled (at the first slide)
    await expect(prevBtn).toBeDisabled()
    await expect(nextBtn).not.toBeDisabled()

    // Advance to the second slide
    nextBtn.click()
    await waitFor(() => expect(prevBtn).not.toBeDisabled(), { timeout: 2000 })
  },
}

/**
 * Show multiple partial slides at once using the Embla `slidesToScroll`
 * and `basis` options. Useful for image galleries or card carousels.
 */
export const MultipleSlides: Story = {
  args: {
    opts: { slidesToScroll: 2 },
  },
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {slides.map((label) => (
          <CarouselItem key={label} className="basis-1/2">
            <div className="flex aspect-square items-center justify-center rounded-lg border bg-muted text-xl font-semibold">
              {label}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

/**
 * Looping carousel — the first slide follows the last and the previous button
 * is never disabled.
 */
export const Loop: Story = {
  args: {
    opts: { loop: true },
  },
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {slides.map((label) => (
          <CarouselItem key={label}>
            <div className="flex aspect-square items-center justify-center rounded-lg border bg-muted text-2xl font-semibold">
              {label}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const prevBtn = canvas.getByRole("button", { name: /previous slide/i })
    // With loop both buttons should be enabled from the start
    await expect(prevBtn).not.toBeDisabled()
  },
}
