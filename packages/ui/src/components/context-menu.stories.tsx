import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, waitFor } from "storybook/test"
import { useState } from "react"
import {
  CopyIcon,
  FilePenIcon,
  FolderIcon,
  ScissorsIcon,
  ShareIcon,
  Trash2Icon,
} from "lucide-react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "#components/context-menu"

/**
 * A menu that appears on right-click (or long-press) over a trigger area.
 * Use for contextual actions tied directly to a target element.
 */
const meta = {
  component: ContextMenu,
  tags: ["ai-generated"],
  argTypes: {
    onOpenChange: {
      description: "Fired when the menu open state changes.",
      action: "openChanged",
      table: { category: "Events" },
    },
    open: {
      description: "Controlled open state.",
      control: "boolean",
      table: { category: "State" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The standard context menu with grouped items, keyboard shortcuts, and a
 * destructive action at the bottom. Right-click the target area to open it.
 */
export const Default: Story = {
  render: (args) => (
    <ContextMenu {...args}>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground select-none">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuItem>
            <CopyIcon />
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <ScissorsIcon />
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <FilePenIcon />
            Rename
            <ContextMenuShortcut>F2</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2Icon />
          Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ userEvent }) => {
    const trigger = document.querySelector("[data-slot='context-menu-trigger']")!
    await userEvent.pointer({ target: trigger, keys: "[MouseRight]" })
    await waitFor(() => expect(screen.getByRole("menu")).toBeVisible(), {
      timeout: 3000,
    })
    await expect(screen.getByText("Copy")).toBeVisible()
  },
}

/**
 * A file-browser context menu with a submenu for sharing options, illustrating
 * how nested menus compose with `ContextMenuSub`.
 */
export const WithSubMenu: Story = {
  render: (args) => (
    <ContextMenu {...args}>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground select-none">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            <CopyIcon />
            Copy
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <ShareIcon />
              Share
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Via email</ContextMenuItem>
              <ContextMenuItem>Via link</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>More options…</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuItem>
            <FolderIcon />
            Move to folder
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2Icon />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

/**
 * Checkbox items inside a context menu let users toggle view options without
 * closing the menu.
 */
export const WithCheckboxItems: Story = {
  render: function CheckboxStory(args) {
    const [showGrid, setShowGrid] = useState(true)
    const [showHidden, setShowHidden] = useState(false)

    return (
      <ContextMenu {...args}>
        <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground select-none">
          Right-click here
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel>View</ContextMenuLabel>
            <ContextMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
              Show grid
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem checked={showHidden} onCheckedChange={setShowHidden}>
              Show hidden files
            </ContextMenuCheckboxItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    )
  },
}

/**
 * Radio items enforce a single selection within a group, useful for sorting or
 * display-mode choices surfaced directly in a context menu.
 */
export const WithRadioItems: Story = {
  render: function RadioStory(args) {
    const [sortBy, setSortBy] = useState("name")

    return (
      <ContextMenu {...args}>
        <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground select-none">
          Right-click here
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel>Sort by</ContextMenuLabel>
            <ContextMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
              <ContextMenuRadioItem value="date">Date modified</ContextMenuRadioItem>
              <ContextMenuRadioItem value="size">Size</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    )
  },
}
