import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, waitFor } from "storybook/test"
import { useState } from "react"
import {
  CloudIcon,
  CreditCardIcon,
  KeyboardIcon,
  LogOutIcon,
  MailIcon,
  MessageSquareIcon,
  PlusCircleIcon,
  PlusIcon,
  SettingsIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "#components/dropdown-menu"
import { Button } from "#components/button"

/**
 * A floating menu that appears next to a trigger button. Use for
 * secondary actions, navigation, or contextual commands.
 */
const meta = {
  component: DropdownMenu,
  tags: ["ai-generated"],
  args: {
    defaultOpen: false,
  },
  argTypes: {
    defaultOpen: {
      description: "Whether the menu starts open (uncontrolled).",
      control: "boolean",
      table: { category: "State" },
    },
    open: {
      description: "Controlled open state.",
      control: "boolean",
      table: { category: "State" },
    },
    modal: {
      description: "When true, pointer events outside the menu are disabled while open.",
      control: "boolean",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    onOpenChange: {
      description: "Fired when the menu open state changes.",
      action: "openChanged",
      table: { category: "Events" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The standard dropdown menu. Open via a trigger button; items are grouped
 * under a label with a destructive action at the bottom.
 */
export const Default: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Open menu
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /open menu/i }))
    await waitFor(() => expect(screen.getByRole("menu")).toBeVisible(), {
      timeout: 3000,
    })
  },
}

/**
 * A full-featured account menu with icon items, keyboard shortcuts, grouped
 * sections, and a submenu for inviting team members.
 */
export const WithIconsAndShortcuts: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        My Account
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon />
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <KeyboardIcon />
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Team</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon />
            Team
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlusIcon />
              Invite users
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <MailIcon />
                Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquareIcon />
                Message
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircleIcon />
                More...
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <PlusIcon />
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CloudIcon />
            API
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/** Checkbox items let users toggle options independently. */
export const WithCheckboxItems: Story = {
  render: function CheckboxStory(args) {
    const [showStatus, setShowStatus] = useState(true)
    const [showPanel, setShowPanel] = useState(false)

    return (
      <DropdownMenu {...args}>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          View options
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showStatus}
              onCheckedChange={setShowStatus}
            >
              Status bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Activity bar
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

/** Radio items enforce a single selection within a group. */
export const WithRadioItems: Story = {
  render: function RadioStory(args) {
    const [position, setPosition] = useState("bottom")

    return (
      <DropdownMenu {...args}>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          Panel position
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

/** A destructive item style for irreversible actions such as deletion. */
export const WithDestructiveItem: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Actions
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
