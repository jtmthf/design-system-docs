import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, waitFor } from "storybook/test"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "#components/popover"
import { Button } from "#components/button"
import { Input } from "#components/input"
import { Label } from "#components/label"

/**
 * A floating card that appears next to a trigger element. Popovers are
 * lighter than dialogs and do not disable the rest of the page.
 */
const meta = {
  component: Popover,
  tags: ["ai-generated"],
  args: {
    defaultOpen: false,
  },
  argTypes: {
    defaultOpen: {
      description: "Whether the popover starts open (uncontrolled).",
      control: "boolean",
      table: { category: "State" },
    },
    open: {
      description: "Controlled open state.",
      control: "boolean",
      table: { category: "State" },
    },
    modal: {
      description: "When true, restricts focus inside the popover.",
      control: "select",
      options: [false, true, "trap-focus"],
      table: {
        category: "Behavior",
        type: { summary: "boolean | 'trap-focus'" },
        defaultValue: { summary: "false" },
      },
    },
    onOpenChange: {
      description: "Fired when the popover open state changes.",
      action: "openChanged",
      table: { category: "Events" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The default popover. Click the trigger to open a floating card with
 * dimension controls.
 */
export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger render={<Button variant="outline" />}>Open popover</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Width</span>
            <span className="text-muted-foreground">100%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Height</span>
            <span className="text-muted-foreground">Auto</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /open popover/i }))
    await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible(), {
      timeout: 3000,
    })
  },
}

/**
 * Opens immediately on mount. The `defaultTriggerId` ties the popover to its
 * trigger so Base UI can position it correctly when `defaultOpen` is true.
 */
export const OpenByDefault: Story = {
  args: { defaultOpen: true, defaultTriggerId: "popover-open-default" },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger id="popover-open-default" render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Notifications</PopoverTitle>
          <PopoverDescription>
            You have 3 unread messages.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
}

/**
 * A popover containing a small form. Useful for inline editing without
 * navigating away.
 */
export const WithForm: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger render={<Button variant="outline" />}>Edit profile</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Edit profile</PopoverTitle>
          <PopoverDescription>
            Make changes to your public profile here.
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="popover-name">Name</Label>
            <Input id="popover-name" defaultValue="Jack Moore" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="popover-username">Username</Label>
            <Input id="popover-username" defaultValue="@jackmoore" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
