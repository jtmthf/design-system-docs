import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "#components/resizable"

/**
 * A set of drag-to-resize panels built on `react-resizable-panels`.
 * Compose `ResizablePanelGroup`, `ResizablePanel`, and `ResizableHandle`
 * to create flexible split-pane layouts.
 */
const meta = {
  component: ResizablePanelGroup,
  tags: ["ai-generated"],
  argTypes: {
    orientation: {
      description: "Axis along which the panels are split.",
      control: "select",
      options: ["horizontal", "vertical"],
      table: {
        category: "Appearance",
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: '"horizontal"' },
      },
    },
    className: {
      description: "Additional Tailwind classes applied to the panel group.",
      control: "text",
      table: { category: "HTML" },
    },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Two side-by-side panels separated by a draggable vertical handle. */
export const Horizontal: Story = {
  render: (args) => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-72 w-full rounded-lg border"
      {...args}
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium text-muted-foreground">
            Left panel
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium text-muted-foreground">
            Right panel
          </span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

/** Two panels stacked vertically with a horizontal drag handle between them. */
export const Vertical: Story = {
  render: (args) => (
    <ResizablePanelGroup
      orientation="vertical"
      className="h-96 w-full rounded-lg border"
      {...args}
    >
      <ResizablePanel defaultSize={60}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium text-muted-foreground">
            Top panel
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium text-muted-foreground">
            Bottom panel
          </span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

/** Three columns — a narrow sidebar, a wide editor, and a right gutter. */
export const ThreeColumns: Story = {
  render: (args) => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-72 w-full rounded-lg border"
      {...args}
    >
      <ResizablePanel defaultSize={20} minSize={12}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-xs font-medium text-muted-foreground">
            Files
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm font-medium text-muted-foreground">
            Editor
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={20} minSize={12}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-xs font-medium text-muted-foreground">
            Terminal
          </span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
