import type { Meta, StoryObj } from "@storybook/react-vite"

import { DirectionProvider } from "#components/direction"
import { Input } from "#components/input"
import { Button } from "#components/button"

/**
 * An RTL/LTR context provider from Base UI. Wrap any subtree in
 * `<DirectionProvider direction="rtl">` to signal right-to-left text
 * direction to all Base UI components inside it without altering the HTML
 * `dir` attribute directly.
 */
const meta = {
  component: DirectionProvider,
  tags: ["ai-generated"],
  parameters: {
    layout: "centered",
  },
  args: {
    direction: "ltr",
  },
  argTypes: {
    direction: {
      description: "Text direction applied to all Base UI descendants.",
      control: "select",
      options: ["ltr", "rtl"],
      table: {
        category: "Appearance",
        type: { summary: '"ltr" | "rtl"' },
        defaultValue: { summary: '"ltr"' },
      },
    },
  },
} satisfies Meta<typeof DirectionProvider>

export default meta
type Story = StoryObj<typeof meta>

/** Left-to-right — the default Western reading direction. */
export const LeftToRight: Story = {
  args: { direction: "ltr" },
  render: (args) => (
    <DirectionProvider {...args}>
      <div dir="ltr" className="flex w-80 flex-col gap-3">
        <p className="text-sm text-muted-foreground">Direction: ltr</p>
        <Input placeholder="Type here…" />
        <Button>Submit</Button>
      </div>
    </DirectionProvider>
  ),
}

/** Right-to-left — used for Arabic, Hebrew, and other RTL languages. */
export const RightToLeft: Story = {
  args: { direction: "rtl" },
  render: (args) => (
    <DirectionProvider {...args}>
      <div dir="rtl" className="flex w-80 flex-col gap-3">
        <p className="text-sm text-muted-foreground">Direction: rtl</p>
        <Input placeholder="اكتب هنا…" />
        <Button>إرسال</Button>
      </div>
    </DirectionProvider>
  ),
}

/** Side-by-side comparison of ltr and rtl layouts. */
export const Comparison: Story = {
  render: () => (
    <div className="flex gap-8">
      <DirectionProvider direction="ltr">
        <div dir="ltr" className="flex w-60 flex-col gap-3 rounded-lg border p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">LTR</p>
          <Input placeholder="Type here…" />
          <Button size="sm">Submit</Button>
        </div>
      </DirectionProvider>
      <DirectionProvider direction="rtl">
        <div dir="rtl" className="flex w-60 flex-col gap-3 rounded-lg border p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">RTL</p>
          <Input placeholder="اكتب هنا…" />
          <Button size="sm">إرسال</Button>
        </div>
      </DirectionProvider>
    </div>
  ),
}
