import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen } from "storybook/test"
import { PlusIcon } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "#components/tooltip"
import { Button } from "#components/button"

/**
 * A floating label that explains an interface element on hover or focus.
 * Always wrap the page in `TooltipProvider` so delays and timeouts are shared.
 */
const meta = {
  component: Tooltip,
  tags: ["ai-generated"],
  args: {
    defaultOpen: false,
  },
  argTypes: {
    defaultOpen: {
      description: "Whether the tooltip starts visible (uncontrolled).",
      control: "boolean",
      table: { category: "State" },
    },
    open: {
      description: "Controlled open state.",
      control: "boolean",
      table: { category: "State" },
    },
    disabled: {
      description: "Prevents the tooltip from opening.",
      control: "boolean",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    trackCursorAxis: {
      description: "Which cursor axis the tooltip tracks.",
      control: "select",
      options: ["none", "x", "y", "both"],
      table: {
        category: "Behavior",
        type: { summary: '"none" | "x" | "y" | "both"' },
        defaultValue: { summary: '"none"' },
      },
    },
    disableHoverablePopup: {
      description: "When true, the popup itself cannot be hovered without closing it.",
      control: "boolean",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onOpenChange: {
      description: "Fired when visibility changes.",
      action: "openChanged",
      table: { category: "Events" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

/** Hover the button to reveal the tooltip label. */
export const Default: Story = {
  render: (args) => (
    <TooltipProvider>
      <Tooltip {...args}>
        <TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.hover(canvas.getByRole("button", { name: /hover me/i }))
    await expect(
      await screen.findByText(/add to library/i, {}, { timeout: 3000 })
    ).toBeVisible()
  },
}

/**
 * Opens immediately on mount without requiring hover. The `defaultTriggerId`
 * ties the tooltip to its trigger so Base UI can position it when
 * `defaultOpen` is true.
 */
export const OpenByDefault: Story = {
  args: { defaultOpen: true, defaultTriggerId: "tooltip-open-default" },
  render: (args) => (
    <TooltipProvider>
      <Tooltip {...args}>
        <TooltipTrigger id="tooltip-open-default" render={<Button variant="outline" />}>
          Hover me
        </TooltipTrigger>
        <TooltipContent>
          <p>Always visible for screenshots.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

/** Tooltip attached to an icon-only button. Provide an `aria-label` on the trigger. */
export const IconButton: Story = {
  render: (args) => (
    <TooltipProvider>
      <Tooltip {...args}>
        <TooltipTrigger
          render={<Button variant="outline" size="icon" aria-label="Add item" />}
        >
          <PlusIcon />
        </TooltipTrigger>
        <TooltipContent>Add item</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

/** When `disabled` is true, the tooltip never appears, even on hover or focus. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <TooltipProvider>
      <Tooltip {...args}>
        <TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>
        <TooltipContent>
          <p>This tooltip is disabled.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
