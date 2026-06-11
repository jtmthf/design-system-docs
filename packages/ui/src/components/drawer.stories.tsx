import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen } from "storybook/test"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "#components/drawer"
import { Button } from "#components/button"

/**
 * A panel that slides in from the edge of the screen. Drawers are well-suited
 * for mobile-friendly navigation, filters, and secondary actions that don't
 * require a full-page context switch.
 */
const meta = {
  component: Drawer,
  tags: ["ai-generated"],
  args: {
    defaultOpen: false,
    direction: "bottom",
  },
  argTypes: {
    defaultOpen: {
      description: "Whether the drawer starts open (uncontrolled).",
      control: "boolean",
      table: { category: "State" },
    },
    open: {
      description: "Controlled open state.",
      control: "boolean",
      table: { category: "State" },
    },
    direction: {
      description: "Edge from which the drawer slides in.",
      control: "select",
      options: ["top", "right", "bottom", "left"],
      table: {
        category: "Appearance",
        type: { summary: '"top" | "right" | "bottom" | "left"' },
        defaultValue: { summary: '"bottom"' },
      },
    },
    modal: {
      description: "When true, blocks interaction with the rest of the page.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    onOpenChange: {
      description: "Fired when the drawer open state changes.",
      action: "openChanged",
      table: { category: "Events" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

/** A bottom sheet that slides up from the bottom of the screen. */
export const Default: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /open drawer/i }))
    await expect(await screen.findByText(/edit profile/i)).toBeVisible()
  },
}

/** Slides in from the right side — useful for settings panels and detail views. */
export const RightSide: Story = {
  args: { direction: "right" },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open right drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>
            Adjust your application preferences.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 text-sm text-muted-foreground">
          Settings content goes here.
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

/** Opens immediately on mount without requiring a trigger interaction. */
export const OpenByDefault: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>
            You have 3 unread notifications.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Dismiss all</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
