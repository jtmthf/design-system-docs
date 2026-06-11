import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  HomeIcon,
  InboxIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "#components/sidebar"

/**
 * A full-featured application sidebar with collapsible behaviour, keyboard
 * shortcut (⌘B), and mobile sheet support. Always wrap with `SidebarProvider`
 * and pair with `SidebarInset` for the main content area.
 */
const meta = {
  component: Sidebar,
  tags: ["ai-generated"],
  argTypes: {
    side: {
      description: "Which edge of the viewport the sidebar anchors to.",
      control: "select",
      options: ["left", "right"],
      table: {
        category: "Appearance",
        type: { summary: '"left" | "right"' },
        defaultValue: { summary: '"left"' },
      },
    },
    variant: {
      description:
        "Visual treatment — standard flush sidebar, floating card, or inset (rounded main area).",
      control: "select",
      options: ["sidebar", "floating", "inset"],
      table: {
        category: "Appearance",
        type: { summary: '"sidebar" | "floating" | "inset"' },
        defaultValue: { summary: '"sidebar"' },
      },
    },
    collapsible: {
      description:
        "Collapse behaviour — slide off-canvas, shrink to icon rail, or disable collapsing entirely.",
      control: "select",
      options: ["offcanvas", "icon", "none"],
      table: {
        category: "Appearance",
        type: { summary: '"offcanvas" | "icon" | "none"' },
        defaultValue: { summary: '"offcanvas"' },
      },
    },
    className: {
      description: "Additional Tailwind classes applied to the sidebar.",
      control: "text",
      table: { category: "HTML" },
    },
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const navItems = [
  { label: "Home", icon: HomeIcon },
  { label: "Inbox", icon: InboxIcon },
  { label: "Search", icon: SearchIcon },
  { label: "Team", icon: UsersIcon },
]

function AppShell(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <SidebarProvider>
      <Sidebar {...props}>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
              A
            </div>
            <span className="text-sm font-semibold">Acme Inc.</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map(({ label, icon: Icon }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton isActive={label === "Home"}>
                      <Icon />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <SettingsIcon />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">Dashboard</span>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-6">
          <p className="text-sm text-muted-foreground">
            Main content area. Toggle the sidebar with the button above or press
            ⌘B.
          </p>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

/** Standard left sidebar with offcanvas collapse — the most common layout. */
export const Default: Story = {
  render: (args) => <AppShell {...args} />,
}

/** Icon-rail collapse — sidebar narrows to show only icons when closed. */
export const IconCollapsible: Story = {
  render: (args) => <AppShell {...args} collapsible="icon" />,
}

/** Floating variant — sidebar renders as a card slightly inset from the edge. */
export const Floating: Story = {
  render: (args) => <AppShell {...args} variant="floating" />,
}

/** Sidebar anchored to the right edge of the viewport. */
export const RightSide: Story = {
  render: (args) => <AppShell {...args} side="right" />,
}
