import type { Meta, StoryObj } from "@storybook/react-vite"

import { ScrollArea, ScrollBar } from "#components/scroll-area"
import { Separator } from "#components/separator"

/**
 * A custom-scrollbar container that constrains overflow content while
 * keeping the scrollbar styled and cross-browser consistent.
 */
const meta = {
  component: ScrollArea,
  tags: ["ai-generated"],
  argTypes: {
    className: {
      description: "Additional Tailwind classes applied to the root element.",
      control: "text",
      table: { category: "HTML" },
    },
    children: {
      description: "Scrollable content.",
      table: { category: "HTML" },
    },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

const tags = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Radix UI",
  "Storybook",
  "Vite",
  "ESLint",
  "Prettier",
  "pnpm",
  "Turborepo",
  "Vitest",
  "Testing Library",
  "Playwright",
  "CVA",
  "Lucide",
  "shadcn/ui",
  "Next.js",
  "Remix",
  "Astro",
  "SvelteKit",
]

/** A fixed-height area scrolling over a long list of items. */
export const Vertical: Story = {
  render: (args) => (
    <ScrollArea className="h-72 w-64 rounded-md border" {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

/** Horizontal scrolling over a row of wide items. */
export const Horizontal: Story = {
  render: (args) => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border" {...args}>
      <div className="flex w-max gap-4 p-4">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex h-20 w-32 shrink-0 items-center justify-center rounded-md border bg-muted text-xs font-medium"
          >
            {tag}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}

/** Both axes enabled — a large content area inside a small viewport. */
export const BothAxes: Story = {
  render: (args) => (
    <ScrollArea className="h-64 w-80 rounded-md border" {...args}>
      <div className="p-4" style={{ width: 600 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="mb-2 text-sm text-muted-foreground">
            Row {i + 1} — Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}
