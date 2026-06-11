import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, waitFor } from "storybook/test"
import { useState } from "react"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "#components/menubar"

/**
 * A horizontal bar of menus for application-level commands. Use it as a
 * persistent top-level navigation control analogous to a native app menu bar.
 */
const meta = {
  component: Menubar,
  tags: ["ai-generated"],
  argTypes: {
    className: {
      description: "Additional CSS classes applied to the menubar root.",
      control: "text",
      table: { category: "HTML" },
    },
    modal: {
      description: "When true, interaction outside the menubar is blocked while a menu is open.",
      control: "boolean",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    disabled: {
      description: "Whether the whole menubar is disabled.",
      control: "boolean",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    orientation: {
      description: "Orientation of the menubar.",
      control: { type: "inline-radio", options: ["horizontal", "vertical"] },
      table: {
        category: "Appearance",
        type: { summary: "\"horizontal\" | \"vertical\"" },
        defaultValue: { summary: "\"horizontal\"" },
      },
    },
    loopFocus: {
      description: "Whether arrow-key focus loops from the last item back to the first.",
      control: "boolean",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof meta>

/**
 * A typical application menubar with File, Edit, and View menus, each
 * containing grouped items and keyboard shortcuts.
 */
export const Default: Story = {
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              New File
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Open…
              <MenubarShortcut>⌘O</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarItem>
            Save
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem variant="destructive">Close Window</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Cut
            <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Copy
            <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Paste
            <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Zoom In</MenubarItem>
          <MenubarItem>Zoom Out</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Full Screen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("menuitem", { name: /file/i }))
    await waitFor(() => expect(screen.getByRole("menu")).toBeVisible(), {
      timeout: 3000,
    })
    await expect(screen.getByText("New File")).toBeVisible()
  },
}

/**
 * A View menu with checkbox items for toggling panels and a radio group for
 * controlling the active theme — both common menubar patterns.
 */
export const WithCheckboxAndRadio: Story = {
  render: function CheckboxRadioStory(args) {
    const [showSidebar, setShowSidebar] = useState(true)
    const [showStatusBar, setShowStatusBar] = useState(false)
    const [theme, setTheme] = useState("system")

    return (
      <Menubar {...args}>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarLabel>Panels</MenubarLabel>
              <MenubarCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
                Sidebar
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
                Status bar
              </MenubarCheckboxItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarLabel>Theme</MenubarLabel>
              <MenubarRadioGroup value={theme} onValueChange={setTheme}>
                <MenubarRadioItem value="light">Light</MenubarRadioItem>
                <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
                <MenubarRadioItem value="system">System</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  },
}

/**
 * A Format menu with a submenu for text style options, demonstrating how
 * `MenubarSub` composes inside a menubar entry.
 */
export const WithSubMenu: Story = {
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>Format</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Text style</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Bold</MenubarItem>
              <MenubarItem>Italic</MenubarItem>
              <MenubarItem>Underline</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Strikethrough</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>Paragraph</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Clear formatting</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}
