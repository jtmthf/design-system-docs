import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "#components/button"

/**
 * Primary interactive element. Use buttons for actions that affect the
 * application state or trigger events. Prefer `variant` for semantic
 * meaning and `size` for density.
 */
const meta = {
  component: Button,
  tags: ["ai-generated"],
  args: {
    children: "Get started",
    variant: "default",
    size: "default",
    disabled: false,
  },
  argTypes: {
    children: {
      description: "The visible label of the button.",
      control: "text",
      table: { category: "Content" },
    },
    variant: {
      description: "Visual style indicating the button's purpose.",
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "destructive",
        "ghost",
        "link",
      ],
      table: {
        category: "Appearance",
        type: {
          summary:
            '"default" | "secondary" | "outline" | "destructive" | "ghost" | "link"',
        },
        defaultValue: { summary: '"default"' },
      },
    },
    size: {
      description: "Density and target-size of the button.",
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
      table: {
        category: "Appearance",
        type: {
          summary:
            '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
        },
        defaultValue: { summary: '"default"' },
      },
    },
    disabled: {
      description: "When true, the button is not interactive.",
      control: "boolean",
      table: { category: "State" },
    },
    type: {
      description: "The HTML `type` attribute. Use `submit` inside forms.",
      control: "select",
      options: ["button", "submit", "reset"],
      table: { category: "HTML" },
    },
    className: {
      description: "Additional Tailwind classes.",
      control: "text",
      table: { category: "HTML" },
    },
    onClick: {
      description: "Callback fired when the button is clicked.",
      action: "clicked",
      table: { category: "Events" },
    },
  },
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The standard button appearance. Use for the primary action on a page
 * or inside a modal.
 */
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: /get started/i })
    ).toBeVisible()
  },
}

/** A less prominent action that sits alongside the primary button. */
export const Secondary: Story = { args: { variant: "secondary" } }

/** An outlined button for tertiary actions or toolbars. */
export const Outline: Story = { args: { variant: "outline" } }

/** Reserved for destructive or irreversible actions such as deletion. */
export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
}

/** Subtle hover state for icon-only toolbars or list rows. */
export const Ghost: Story = { args: { variant: "ghost" } }

/** Styled as a hyperlink. Use sparingly to avoid confusion with navigation. */
export const Link: Story = { args: { variant: "link" } }

/** Extra-small size for dense UIs such as data tables. */
export const Small: Story = { args: { size: "sm" } }

/** Large size for hero sections or empty states. */
export const Large: Story = { args: { size: "lg" } }

/** A button with an inline-end icon. Icons should always be decorative. */
export const WithIcon: Story = {
  args: {
    children: (
      <>
        Continue
        <ArrowRightIcon data-icon="inline-end" />
      </>
    ),
  },
}

/**
 * Icon-only button. The icon is decorative, so provide an accessible name
 * with `aria-label`.
 */
export const Icon: Story = {
  args: {
    size: "icon",
    "aria-label": "Continue",
    children: <ArrowRightIcon />,
  },
}

/** Non-interactive state. Screen readers will announce the button as disabled. */
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: /get started/i })
    ).toBeDisabled()
  },
}
