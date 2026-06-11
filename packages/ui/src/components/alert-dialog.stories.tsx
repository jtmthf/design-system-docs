import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen } from "storybook/test"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "#components/alert-dialog"
import { Button } from "#components/button"
import { TrashIcon } from "lucide-react"

/**
 * A modal dialog that interrupts the user to confirm or cancel a
 * critical, destructive, or irreversible action.
 */
const meta = {
  component: AlertDialog,
  tags: ["ai-generated"],
  args: {
    defaultOpen: false,
  },
  argTypes: {
    defaultOpen: {
      description: "Whether the alert dialog starts open (uncontrolled).",
      control: "boolean",
      table: { category: "State" },
    },
    open: {
      description: "Controlled open state.",
      control: "boolean",
      table: { category: "State" },
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
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

/** Prompts the user to confirm a destructive action before proceeding. */
export const Default: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        Delete account
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Your account and all associated data
            will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Delete account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: /delete account/i })
    )
    await expect(await screen.findByRole("alertdialog")).toBeVisible()
    await expect(
      screen.getByText(/this action cannot be undone/i)
    ).toBeVisible()
  },
}

/** Opens immediately without requiring a trigger click. */
export const OpenByDefault: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Open
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Session expired</AlertDialogTitle>
          <AlertDialogDescription>
            Your session has expired. Please sign in again to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Sign in</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

/** A compact small-size variant with a media icon and two action buttons. */
export const WithMedia: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Remove file
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <TrashIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete file?</AlertDialogTitle>
          <AlertDialogDescription>
            &ldquo;report.pdf&rdquo; will be moved to the trash.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}
