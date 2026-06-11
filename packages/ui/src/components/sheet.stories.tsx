import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen } from "storybook/test"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "#components/sheet"
import { Button } from "#components/button"

/**
 * A sliding panel anchored to the edge of the viewport. Use Sheets for
 * navigation menus, settings drawers, and supplemental content that should
 * remain in context alongside the main page.
 */
const meta = {
  component: Sheet,
  tags: ["ai-generated"],
  args: {
    defaultOpen: false,
  },
  argTypes: {
    defaultOpen: {
      description: "Whether the sheet starts open (uncontrolled).",
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
      description: "Fired when the sheet open state changes.",
      action: "openChanged",
      table: { category: "Events" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

/** A sheet that slides in from the right — the default side. */
export const Default: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline" />}>
        Open sheet
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your public profile. Click save when you&apos;re
            done.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 text-sm text-muted-foreground">
          Profile form fields go here.
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /open sheet/i }))
    await expect(await screen.findByText(/edit profile/i)).toBeVisible()
  },
}

/** Sheet sliding in from the left side, suitable for navigation menus. */
export const LeftSide: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline" />}>
        Open navigation
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse sections of the application.</SheetDescription>
        </SheetHeader>
        <nav className="p-4">
          <ul className="space-y-2 text-sm">
            <li>Dashboard</li>
            <li>Projects</li>
            <li>Settings</li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  ),
}

/** A sheet anchored to the bottom, styled like a mobile action sheet. */
export const BottomSheet: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline" />}>
        Open bottom sheet
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Share</SheetTitle>
          <SheetDescription>Choose how to share this item.</SheetDescription>
        </SheetHeader>
        <div className="flex gap-2 p-4">
          <Button variant="outline" className="flex-1">Copy link</Button>
          <Button variant="outline" className="flex-1">Email</Button>
          <Button variant="outline" className="flex-1">Message</Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

/** The built-in close button can be hidden when custom dismiss controls are provided. */
export const WithoutCloseButton: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline" />}>
        Open sheet
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Custom close</SheetTitle>
          <SheetDescription>
            The built-in close button is hidden. Use the footer action instead.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose render={<Button />}>Done</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}
