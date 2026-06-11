import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#components/card"
import { Button } from "#components/button"

/**
 * A container for related content and actions. Cards group information
 * into a distinct visual boundary with optional header, content, and footer.
 */
const meta = {
  component: Card,
  tags: ["ai-generated"],
  args: {
    size: "default",
  },
  argTypes: {
    size: {
      description: "Spacing density inside the card.",
      control: "select",
      options: ["default", "sm"],
      table: {
        category: "Appearance",
        type: { summary: '"default" | "sm"' },
        defaultValue: { summary: '"default"' },
      },
    },
    className: {
      description: "Additional Tailwind classes.",
      control: "text",
      table: { category: "HTML" },
    },
    children: {
      description: "Card composition (header, content, footer).",
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
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/** A full card with header, content, and footer actions. */
export const Default: Story = {
  render: (args) => (
    <Card className="w-80" {...args}>
      <CardHeader>
        <CardTitle>Project Lighthouse</CardTitle>
        <CardDescription>Quarterly status update</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        On track for the April release. All blocking issues resolved.
      </CardContent>
      <CardFooter>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  ),
}

/** Reduced spacing for dense dashboards or sidebar widgets. */
export const Small: Story = {
  render: (args) => (
    <Card size="sm" className="w-72" {...args}>
      <CardHeader>
        <CardTitle>Compact card</CardTitle>
        <CardDescription>Tighter spacing</CardDescription>
      </CardHeader>
      <CardContent>Uses the smaller --card-spacing token.</CardContent>
    </Card>
  ),
}

/** Minimal card containing only content. */
export const ContentOnly: Story = {
  render: (args) => (
    <Card className="w-72" {...args}>
      <CardContent>A bare card with only content.</CardContent>
    </Card>
  ),
}
