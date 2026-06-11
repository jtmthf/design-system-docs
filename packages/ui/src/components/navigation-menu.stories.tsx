import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, waitFor } from "storybook/test"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "#components/navigation-menu"

/**
 * A horizontal navigation bar with animated dropdown panels. Use it for
 * top-level site navigation where items may reveal rich content on hover or
 * focus.
 */
const meta = {
  component: NavigationMenu,
  tags: ["ai-generated"],
  argTypes: {
    className: {
      description: "Additional CSS classes applied to the navigation menu root.",
      control: "text",
      table: { category: "HTML" },
    },
    align: {
      description: "Alignment of the floating panel relative to the trigger.",
      control: { type: "select", options: ["start", "center", "end"] },
      table: {
        category: "Appearance",
        type: { summary: "\"start\" | \"center\" | \"end\"" },
        defaultValue: { summary: "\"start\"" },
      },
    },
    onValueChange: {
      description: "Fired when the active item changes.",
      action: "valueChanged",
      table: { category: "Events" },
    },
    value: {
      description: "Controlled value of the currently open item.",
      control: "text",
      table: { category: "State" },
    },
    defaultValue: {
      description: "Initially open item (uncontrolled).",
      control: "text",
      table: { category: "State" },
    },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

/**
 * A navigation menu with a single trigger that reveals a panel of links.
 * Hover or focus the trigger to open the dropdown.
 */
export const Default: Story = {
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-2 w-[320px]">
              <li>
                <NavigationMenuLink href="#" className="flex flex-col gap-0.5">
                  <span className="font-medium text-sm">Introduction</span>
                  <span className="text-xs text-muted-foreground">Re-usable components built with Base UI and Tailwind.</span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" className="flex flex-col gap-0.5">
                  <span className="font-medium text-sm">Installation</span>
                  <span className="text-xs text-muted-foreground">How to install dependencies and set up your project.</span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" className="flex flex-col gap-0.5">
                  <span className="font-medium text-sm">Theming</span>
                  <span className="text-xs text-muted-foreground">Customise colours, fonts, and border radius with CSS variables.</span>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: /getting started/i })
    await userEvent.click(trigger)
    await waitFor(
      () => expect(screen.getByText("Introduction")).toBeVisible(),
      { timeout: 3000 }
    )
  },
}

/**
 * Multiple top-level menus with rich panel content, mixed with plain link
 * items that navigate directly without opening a panel.
 */
export const WithMultipleMenus: Story = {
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-2 gap-1 p-2 w-[400px]">
              {[
                { title: "Analytics", desc: "Measure what matters." },
                { title: "Automation", desc: "Automate repetitive tasks." },
                { title: "Commerce", desc: "Sell more, ship faster." },
                { title: "Integrations", desc: "Connect your stack." },
              ].map(({ title, desc }) => (
                <li key={title}>
                  <NavigationMenuLink href="#" className="flex flex-col gap-0.5">
                    <span className="font-medium text-sm">{title}</span>
                    <span className="text-xs text-muted-foreground">{desc}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-2 w-[240px]">
              {["Documentation", "Blog", "Changelog", "Status"].map((label) => (
                <li key={label}>
                  <NavigationMenuLink href="#">{label}</NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

/**
 * A minimal navigation menu where items are plain links with no dropdown
 * panels, using `navigationMenuTriggerStyle` for consistent visual sizing.
 */
export const LinksOnly: Story = {
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        {["Home", "About", "Blog", "Contact"].map((label) => (
          <NavigationMenuItem key={label}>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              {label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
