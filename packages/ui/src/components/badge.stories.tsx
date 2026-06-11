import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "#components/badge"

/**
 * A small, non-interactive label that highlights status, categories, or counts.
 * Badges are not buttons—use them for read-only metadata.
 */
const meta = {
  component: Badge,
  tags: ["ai-generated"],
  args: {
    children: "Badge",
    variant: "default",
  },
  argTypes: {
    children: {
      description: "Text or element rendered inside the badge.",
      control: "text",
      table: { category: "Content" },
    },
    variant: {
      description: "Visual treatment indicating semantic meaning.",
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
      table: {
        category: "Appearance",
        type: {
          summary:
            '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
        },
        defaultValue: { summary: '"default"' },
      },
    },
    className: {
      description: "Additional Tailwind classes.",
      control: "text",
      table: { category: "HTML" },
    },
    render: {
      description: "Optional render prop to change the underlying element.",
      table: { category: "Advanced" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/** The default filled style for primary emphasis. */
export const Default: Story = {}

/** A muted badge for secondary categorisation. */
export const Secondary: Story = { args: { variant: "secondary" } }

/** High-visibility style for errors, warnings, or critical status. */
export const Destructive: Story = {
  args: { variant: "destructive", children: "Error" },
}

/** Subtle bordered style that works on any background. */
export const Outline: Story = { args: { variant: "outline" } }

/** Minimal style for low-priority tags. */
export const Ghost: Story = { args: { variant: "ghost" } }

/** Hyperlink-style badge. Use inside rich text or metadata lines. */
export const Link: Story = { args: { variant: "link" } }
