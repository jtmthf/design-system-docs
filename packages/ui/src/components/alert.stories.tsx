import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { CircleAlertIcon, TerminalIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "#components/alert"

/**
 * A callout that attracts attention without interrupting the user flow.
 * Compose with `AlertTitle`, `AlertDescription`, and optionally an icon.
 */
const meta = {
  component: Alert,
  tags: ["ai-generated"],
  args: {
    variant: "default",
  },
  argTypes: {
    variant: {
      description: "Semantic tone of the alert.",
      control: "select",
      options: ["default", "destructive"],
      table: {
        category: "Appearance",
        type: { summary: '"default" | "destructive"' },
        defaultValue: { summary: '"default"' },
      },
    },
    className: {
      description: "Additional Tailwind classes.",
      control: "text",
      table: { category: "HTML" },
    },
    children: {
      description: "Alert content (usually title + description + icon).",
      control: "text",
      table: { category: "Content" },
    },
  },
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "muted",
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

/** Standard notice with an icon, title, and description. */
export const Default: Story = {
  render: (args) => (
    <Alert className="w-96" {...args}>
      <TerminalIcon />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("alert")).toBeVisible()
  },
}

/** Use the destructive variant for errors that require user correction. */
export const Destructive: Story = {
  render: (args) => (
    <Alert variant="destructive" className="w-96" {...args}>
      <CircleAlertIcon />
      <AlertTitle>Unable to process payment</AlertTitle>
      <AlertDescription>
        Verify your billing details and try again.
      </AlertDescription>
    </Alert>
  ),
}

/** A minimal alert containing only a title. */
export const TitleOnly: Story = {
  render: (args) => (
    <Alert className="w-96" {...args}>
      <AlertTitle>A short, standalone notice.</AlertTitle>
    </Alert>
  ),
}
