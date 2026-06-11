import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen } from "storybook/test"
import { toast } from "sonner"

import { Toaster } from "#components/sonner"
import { Button } from "#components/button"

/**
 * A themed toast notification layer backed by Sonner. Render `<Toaster />` once
 * at the root of your app and call `toast()` from anywhere to fire a notification.
 * The component automatically picks up the active `next-themes` colour scheme.
 */
const meta = {
  component: Toaster,
  tags: ["ai-generated"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    position: {
      description: "Screen position where toasts appear.",
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      table: {
        category: "Appearance",
        type: {
          summary:
            '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
        },
        defaultValue: { summary: '"bottom-right"' },
      },
    },
    richColors: {
      description: "Enable richer semantic colours for success, error, and warning toasts.",
      control: "boolean",
      table: {
        category: "Appearance",
        defaultValue: { summary: "false" },
      },
    },
    closeButton: {
      description: "Show a dismiss button on every toast.",
      control: "boolean",
      table: {
        category: "Appearance",
        defaultValue: { summary: "false" },
      },
    },
    duration: {
      description: "Auto-dismiss duration in milliseconds.",
      control: "number",
      table: {
        category: "State",
        defaultValue: { summary: "4000" },
      },
    },
    className: {
      description: "Additional Tailwind classes.",
      control: "text",
      table: { category: "HTML" },
    },
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

/** Fires a plain informational toast when the button is clicked. */
export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <Toaster {...args} />
      <Button
        onClick={() => toast("File saved successfully.")}
      >
        Show toast
      </Button>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /show toast/i }))
    const toastEl = await screen.findByText("File saved successfully.")
    await expect(toastEl).toBeVisible()
  },
}

/** Fires a success toast with a green semantic icon via `toast.success`. */
export const Success: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <Toaster {...args} richColors />
      <Button
        variant="outline"
        onClick={() => toast.success("Changes saved successfully.")}
      >
        Show success
      </Button>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /show success/i }))
    const toastEl = await screen.findByText("Changes saved successfully.")
    await expect(toastEl).toBeVisible()
  },
}

/** Fires an error toast via `toast.error`. */
export const Error: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <Toaster {...args} richColors />
      <Button
        variant="destructive"
        onClick={() => toast.error("Something went wrong. Please try again.")}
      >
        Show error
      </Button>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /show error/i }))
    const toastEl = await screen.findByText("Something went wrong. Please try again.")
    await expect(toastEl).toBeVisible()
  },
}

/** Toast with a description and a custom action button. */
export const WithAction: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <Toaster {...args} />
      <Button
        variant="outline"
        onClick={() =>
          toast("Email sent", {
            description: "Your message has been delivered.",
            action: {
              label: "Undo",
              onClick: () => toast("Email send cancelled."),
            },
          })
        }
      >
        Send email
      </Button>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /send email/i }))
    const toastEl = await screen.findByText("Email sent")
    await expect(toastEl).toBeVisible()
  },
}
