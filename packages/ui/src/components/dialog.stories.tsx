import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen } from "storybook/test"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#components/dialog"
import { Button } from "#components/button"

/**
 * A modal window that interrupts the user to capture attention for
 * critical decisions, confirmations, or rich forms.
 */
const meta = {
  component: Dialog,
  tags: ["ai-generated"],
  args: {
    defaultOpen: false,
    modal: true,
  },
  argTypes: {
    defaultOpen: {
      description: "Whether the dialog starts open (uncontrolled).",
      control: "boolean",
      table: { category: "State" },
    },
    open: {
      description: "Controlled open state.",
      control: "boolean",
      table: { category: "State" },
    },
    modal: {
      description: "When true, blocks interaction with the rest of the page.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    onOpenChange: {
      description: "Fired when the dialog open state changes.",
      action: "openChanged",
      table: { category: "Events" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Your data will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /open dialog/i }))
    await expect(await screen.findByRole("dialog")).toBeVisible()
  },
}

/** Opens immediately without requiring a trigger click. The close button lets the user dismiss it. */
export const OpenByDefault: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button />}>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome back</DialogTitle>
          <DialogDescription>
            You have new notifications since your last visit.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
