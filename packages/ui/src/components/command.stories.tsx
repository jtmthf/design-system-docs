import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen } from "storybook/test"
import { CalendarIcon, FileIcon, SettingsIcon, UserIcon } from "lucide-react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "#components/command"
import { Button } from "#components/button"

/**
 * A keyboard-first command palette for searching and launching actions. Embed
 * it inline or wrap it in CommandDialog for a full spotlight-style experience.
 */
const meta = {
  component: Command,
  tags: ["ai-generated"],
  args: {},
  argTypes: {
    value: {
      description: "Controlled value of the selected command item.",
      control: "text",
      table: { category: "State" },
    },
    onValueChange: {
      description: "Fired when the selected item changes.",
      action: "valueChanged",
      table: { category: "Events" },
    },
    filter: {
      description:
        "Custom filter function used to score items against the search query.",
      control: false,
      table: { category: "Behavior" },
    },
    shouldFilter: {
      description:
        "When false, disables built-in filtering so you can supply pre-filtered items.",
      control: "boolean",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    loop: {
      description:
        "When true, keyboard navigation wraps from the last item back to the first.",
      control: "boolean",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    className: {
      description: "Additional Tailwind classes.",
      control: "text",
      table: { category: "HTML" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

/** An inline command palette with grouped items, a search input, and keyboard shortcuts. */
export const Default: Story = {
  render: (args) => (
    <Command {...args} className="w-72 rounded-xl border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon />
            Calendar
          </CommandItem>
          <CommandItem>
            <UserIcon />
            Profile
          </CommandItem>
          <CommandItem>
            <SettingsIcon />
            Settings
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Files">
          <CommandItem>
            <FileIcon />
            New file
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <FileIcon />
            Open file
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByPlaceholderText(/type a command/i)
    await expect(input).toBeVisible()
    await userEvent.type(input, "cal")
    await expect(await canvas.findByText("Calendar")).toBeVisible()
  },
}

/** A spotlight-style modal dialog wrapping the command palette, open on mount. */
export const Dialog: Story = {
  render: () => (
    <CommandDialog defaultOpen>
      <Command>
        <CommandInput placeholder="Search commands..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem>
              <CalendarIcon />
              Open calendar
            </CommandItem>
            <CommandItem>
              <UserIcon />
              View profile
            </CommandItem>
            <CommandItem>
              <SettingsIcon />
              Open settings
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
}

/** A trigger button that opens the command palette dialog via controlled state. */
export const WithTrigger: Story = {
  render: () => {
    const Example = () => {
      const [open, setOpen] = React.useState(false)
      return (
        <>
          <Button
            variant="outline"
            className="w-48 justify-between text-muted-foreground"
            onClick={() => setOpen(true)}
          >
            Search commands…
            <CommandShortcut>⌘K</CommandShortcut>
          </Button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <Command>
              <CommandInput placeholder="Search commands..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                  <CommandItem>
                    <CalendarIcon />
                    Calendar
                  </CommandItem>
                  <CommandItem>
                    <UserIcon />
                    Profile
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Files">
                  <CommandItem>
                    <FileIcon />
                    New file
                    <CommandShortcut>⌘N</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </CommandDialog>
        </>
      )
    }
    return <Example />
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: /search commands/i })
    )
    await expect(await screen.findByRole("dialog")).toBeVisible()
    await expect(screen.getByPlaceholderText(/search commands/i)).toBeVisible()
  },
}
