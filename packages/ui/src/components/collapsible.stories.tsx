import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "#components/collapsible"
import { Button } from "#components/button"
import { ChevronsUpDown } from "lucide-react"

/**
 * A vertically collapsible section that hides and reveals content on demand.
 * Pairs a trigger element with a panel that animates open and closed.
 */
const meta = {
  component: Collapsible,
  tags: ["ai-generated"],
  args: {
    defaultOpen: false,
    disabled: false,
  },
  argTypes: {
    defaultOpen: {
      description: "Whether the collapsible is open by default (uncontrolled).",
      control: "boolean",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    open: {
      description: "Controlled open state.",
      control: "boolean",
      table: {
        category: "State",
        type: { summary: "boolean" },
      },
    },
    disabled: {
      description: "Prevents the collapsible from being toggled.",
      control: "boolean",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onOpenChange: {
      description: "Fired when the open state changes.",
      action: "openChanged",
      table: { category: "Events" },
    },
    className: {
      description: "Additional Tailwind classes.",
      control: "text",
      table: { category: "HTML" },
    },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

/** A collapsible FAQ entry — click the trigger to reveal the answer. */
export const Default: Story = {
  render: (args) => (
    <Collapsible {...args} className="w-96 space-y-2">
      <div className="flex items-center justify-between rounded-md border px-4 py-3">
        <span className="text-sm font-medium">What is a design system?</span>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon-sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          }
        />
      </div>
      <CollapsibleContent className="rounded-md border px-4 py-3 text-sm text-muted-foreground">
        A design system is a collection of reusable components, guided by clear
        standards, that can be assembled to build any number of applications.
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: /toggle/i })
    const content = canvas.queryByText(/collection of reusable/i)
    // Content should be hidden initially
    await expect(content).not.toBeVisible()
    // Open
    await userEvent.click(trigger)
    await expect(
      await canvas.findByText(/collection of reusable/i)
    ).toBeVisible()
  },
}

/** Starts open — useful when the content is important on first render. */
export const DefaultOpen: Story = {
  render: (args) => (
    <Collapsible {...args} defaultOpen className="w-96 space-y-2">
      <div className="flex items-center justify-between rounded-md border px-4 py-3">
        <span className="text-sm font-medium">Team members</span>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon-sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          }
        />
      </div>
      <CollapsibleContent className="space-y-1">
        {["Alice Chen", "Bob Sharma", "Carol Davis"].map((name) => (
          <div
            key={name}
            className="rounded-md border px-4 py-2 text-sm font-mono"
          >
            {name}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  ),
}

/** Disabled state — the trigger is inert and content cannot be toggled. */
export const Disabled: Story = {
  render: (args) => (
    <Collapsible {...args} disabled className="w-96 space-y-2">
      <div className="flex items-center justify-between rounded-md border px-4 py-3 opacity-60">
        <span className="text-sm font-medium">Locked section</span>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon-sm" disabled>
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          }
        />
      </div>
      <CollapsibleContent className="rounded-md border px-4 py-3 text-sm text-muted-foreground">
        This content is unreachable while disabled.
      </CollapsibleContent>
    </Collapsible>
  ),
}
