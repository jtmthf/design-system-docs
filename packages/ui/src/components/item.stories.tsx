import type { Meta, StoryObj } from "@storybook/react-vite"
import { FileTextIcon, StarIcon, MoreHorizontalIcon } from "lucide-react"

import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemHeader,
  ItemFooter,
} from "#components/item"
import { Button } from "#components/button"
import { Badge } from "#components/badge"

/**
 * A flexible list-item primitive for building menus, contact lists, file
 * browsers, and similar collections. Compose `Item` with `ItemMedia`,
 * `ItemContent`, `ItemTitle`, `ItemDescription`, and `ItemActions` to
 * create richly structured rows.
 */
const meta = {
  component: Item,
  tags: ["ai-generated"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      description: "Visual treatment of the item container.",
      control: "select",
      options: ["default", "outline", "muted"],
      table: {
        category: "Appearance",
        type: { summary: '"default" | "outline" | "muted"' },
        defaultValue: { summary: '"default"' },
      },
    },
    size: {
      description: "Padding and gap density.",
      control: "select",
      options: ["default", "sm", "xs"],
      table: {
        category: "Appearance",
        type: { summary: '"default" | "sm" | "xs"' },
        defaultValue: { summary: '"default"' },
      },
    },
    className: {
      description: "Additional Tailwind classes.",
      control: "text",
      table: { category: "HTML" },
    },
  },
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

/** A full-featured item with a file icon, title, description, and an action button. */
export const Default: Story = {
  render: (args) => (
    <Item {...args} className="w-96">
      <ItemMedia variant="icon">
        <FileTextIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Q3 Financial Report.pdf</ItemTitle>
        <ItemDescription>Last modified 2 days ago by Ada Lovelace</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontalIcon />
        </Button>
      </ItemActions>
    </Item>
  ),
}

/** A list of items separated by a visual divider using `ItemGroup` and `ItemSeparator`. */
export const Group: Story = {
  render: () => (
    <ItemGroup className="w-96">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Annual Report 2024</ItemTitle>
          <ItemDescription>PDF · 4.2 MB</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge variant="secondary">New</Badge>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item variant="outline">
        <ItemMedia variant="icon">
          <StarIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Starred items</ItemTitle>
          <ItemDescription>12 files marked as favourite</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
}

/** Compact `sm` size — useful for dense lists such as command menus or sidebars. */
export const Small: Story = {
  args: { size: "sm", variant: "muted" },
  render: (args) => (
    <Item {...args} className="w-80">
      <ItemMedia variant="icon">
        <FileTextIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Draft proposal.docx</ItemTitle>
        <ItemDescription>Shared with 3 people</ItemDescription>
      </ItemContent>
    </Item>
  ),
}

/** Item with a header and footer for extra metadata rows spanning the full width. */
export const WithHeaderFooter: Story = {
  render: () => (
    <Item variant="outline" className="w-96 flex-wrap">
      <ItemHeader>
        <span className="text-xs text-muted-foreground">Pinned</span>
        <Badge variant="outline">Active</Badge>
      </ItemHeader>
      <ItemMedia variant="icon">
        <FileTextIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Project roadmap</ItemTitle>
        <ItemDescription>Updated yesterday</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontalIcon />
        </Button>
      </ItemActions>
      <ItemFooter>
        <span className="text-xs text-muted-foreground">Created by Ada Lovelace</span>
        <span className="text-xs text-muted-foreground">Jan 2025</span>
      </ItemFooter>
    </Item>
  ),
}
