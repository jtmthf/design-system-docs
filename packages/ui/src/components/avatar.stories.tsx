import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "#components/avatar"

/**
 * Represents a user or entity visually. Falls back to initials when an image
 * is unavailable. Compose with `AvatarGroup` to show multiple participants.
 */
const meta = {
  component: Avatar,
  tags: ["ai-generated"],
  args: {
    size: "default",
  },
  argTypes: {
    size: {
      description: "Visual size of the avatar circle.",
      control: "select",
      options: ["default", "sm", "lg"],
      table: {
        category: "Appearance",
        type: { summary: '"default" | "sm" | "lg"' },
        defaultValue: { summary: '"default"' },
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
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

/** Default size with initials fallback so stories render offline. */
export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>JM</AvatarFallback>
    </Avatar>
  ),
}

/** Compact 24 px avatar for dense surfaces such as comment threads or table rows. */
export const Small: Story = {
  render: (args) => (
    <Avatar size="sm" {...args}>
      <AvatarFallback>JM</AvatarFallback>
    </Avatar>
  ),
}

/** Larger size for profile headers or detail pages. */
export const Large: Story = {
  render: (args) => (
    <Avatar size="lg" {...args}>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
}

/** A stack of overlapping avatars with an overflow count. */
export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback>JM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+5</AvatarGroupCount>
    </AvatarGroup>
  ),
}
