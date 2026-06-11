import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen } from "storybook/test"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "#components/hover-card"

/**
 * A preview card that appears when the user hovers over a trigger element.
 * Use HoverCards to surface supplemental information without requiring a click.
 */
const meta = {
  component: HoverCard,
  tags: ["ai-generated"],
  args: {
    defaultOpen: false,
  },
  argTypes: {
    defaultOpen: {
      description: "Whether the hover card starts open (uncontrolled).",
      control: "boolean",
      table: { category: "State" },
    },
    open: {
      description: "Controlled open state.",
      control: "boolean",
      table: { category: "State" },
    },
    onOpenChange: {
      description: "Fired when the hover card open state changes.",
      action: "openChanged",
      table: { category: "Events" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

/** Opens a preview card when the user hovers over a username link. */
export const Default: Story = {
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger
        render={
          <a
            href="#"
            className="text-sm font-medium underline underline-offset-4 hover:text-foreground"
            onClick={(e) => e.preventDefault()}
          />
        }
      >
        @jackmoore
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-full bg-muted" />
            <div>
              <p className="text-sm font-medium">Jack Moore</p>
              <p className="text-xs text-muted-foreground">@jackmoore</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Building design systems and developer tools.
          </p>
          <p className="text-xs text-muted-foreground">
            Joined January 2020
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.hover(canvas.getByRole("link", { name: /@jackmoore/i }))
    await expect(await screen.findByText(/building design systems/i)).toBeVisible()
  },
}

/** Opens immediately on mount to preview the card layout without hovering. */
export const OpenByDefault: Story = {
  args: { defaultOpen: true, defaultTriggerId: "hover-card-open-default" },
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger
        id="hover-card-open-default"
        render={
          <a
            href="#"
            className="text-sm font-medium underline underline-offset-4 hover:text-foreground"
            onClick={(e) => e.preventDefault()}
          />
        }
      >
        @design-system
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-full bg-muted" />
            <div>
              <p className="text-sm font-medium">Design System</p>
              <p className="text-xs text-muted-foreground">@design-system</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Official account for the component library.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

/** A hover card placed above the trigger to avoid clipping at the bottom of the page. */
export const TopPlacement: Story = {
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger
        render={
          <a
            href="#"
            className="text-sm font-medium underline underline-offset-4 hover:text-foreground"
            onClick={(e) => e.preventDefault()}
          />
        }
      >
        Hover for details
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <p className="text-sm">
          This card opens above the trigger. Useful when the trigger is near
          the bottom of the viewport.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
}
