import type { Meta, StoryObj } from "@storybook/react-vite"
import { InboxIcon, FileXIcon, SearchXIcon } from "lucide-react"

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "#components/empty"
import { Button } from "#components/button"

/**
 * A full-bleed placeholder shown when a list or view has no content.
 * Compose `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`,
 * `EmptyDescription`, and `EmptyContent` to build a helpful empty state
 * with a clear call to action.
 */
const meta = {
  component: Empty,
  tags: ["ai-generated"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      description: "Additional Tailwind classes applied to the root element.",
      control: "text",
      table: { category: "HTML" },
    },
  },
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

/** Basic empty state with an icon, title, description, and a primary action. */
export const Default: Story = {
  render: () => (
    <Empty className="w-96">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No messages yet</EmptyTitle>
        <EmptyDescription>
          When you receive messages they will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Compose message</Button>
      </EmptyContent>
    </Empty>
  ),
}

/** Empty search results state — shown when a query returns no matches. */
export const NoResults: Story = {
  render: () => (
    <Empty className="w-96">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try adjusting your search or filters to find what you&apos;re looking for.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">Clear filters</Button>
      </EmptyContent>
    </Empty>
  ),
}

/** Minimal empty state without a media icon — suitable for inline placeholders. */
export const Minimal: Story = {
  render: () => (
    <Empty className="w-96">
      <EmptyHeader>
        <EmptyMedia>
          <FileXIcon className="size-10 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>No files uploaded</EmptyTitle>
        <EmptyDescription>
          Drag and drop files here, or click the button to browse.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}
