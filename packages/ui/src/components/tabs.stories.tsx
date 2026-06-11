import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "#components/tabs"

/**
 * Organises content into mutually exclusive panels. Tabs reduce clutter
 * while keeping related information within easy reach.
 */
const meta = {
  component: Tabs,
  tags: ["ai-generated"],
  args: {
    orientation: "horizontal",
  },
  argTypes: {
    orientation: {
      description: "Stack direction of the tab list relative to its panels.",
      control: "select",
      options: ["horizontal", "vertical"],
      table: {
        category: "Appearance",
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: '"horizontal"' },
      },
    },
    defaultValue: {
      description: "Value of the tab selected by default.",
      control: "text",
      table: { category: "State" },
    },
    value: {
      description: "Controlled active tab value.",
      control: "text",
      table: { category: "State" },
    },
    className: {
      description: "Additional Tailwind classes.",
      control: "text",
      table: { category: "HTML" },
    },
    onValueChange: {
      description: "Fired when the active tab changes.",
      action: "valueChanged",
      table: { category: "Events" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const Example = (props: React.ComponentProps<typeof Tabs>) => (
  <Tabs defaultValue="account" className="w-80" {...props}>
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">Manage your account details.</TabsContent>
    <TabsContent value="password">Change your password here.</TabsContent>
  </Tabs>
)

/** Horizontal tabs with a pill-style list and content below. */
export const Default: Story = {
  render: (args) => <Example {...args} />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText(/manage your account/i)).toBeVisible()
    await userEvent.click(canvas.getByRole("tab", { name: /password/i }))
    await expect(
      await canvas.findByText(/change your password/i)
    ).toBeVisible()
  },
}

/** Vertical layout places the tab list on the left and panels on the right. */
export const Vertical: Story = {
  render: (args) => <Example orientation="vertical" {...args} />,
}

/** A minimal underline variant for clean interfaces. */
export const Line: Story = {
  render: () => (
    <Tabs defaultValue="one" className="w-80">
      <TabsList variant="line">
        <TabsTrigger value="one">Overview</TabsTrigger>
        <TabsTrigger value="two">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Overview panel.</TabsContent>
      <TabsContent value="two">Activity panel.</TabsContent>
    </Tabs>
  ),
}
