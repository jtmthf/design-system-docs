import type { Meta, StoryObj } from "@storybook/react-vite"
import { CommandIcon } from "lucide-react"

import { Kbd, KbdGroup } from "#components/kbd"

/**
 * A presentational keyboard-key element that renders a single key or a group
 * of keys styled to look like physical keyboard caps. Use `Kbd` for a single
 * key and `KbdGroup` to display a shortcut chord.
 */
const meta = {
  component: Kbd,
  tags: ["ai-generated"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      description: "Key label — text, symbol, or an icon.",
      control: "text",
      table: { category: "Content" },
    },
    className: {
      description: "Additional Tailwind classes.",
      control: "text",
      table: { category: "HTML" },
    },
  },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

/** A single alphanumeric key. */
export const SingleKey: Story = {
  args: { children: "K" },
}

/** A modifier key with an icon inside the cap. */
export const WithIcon: Story = {
  render: () => (
    <Kbd>
      <CommandIcon />
    </Kbd>
  ),
}

/** A multi-key chord using `KbdGroup`. */
export const Chord: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>
        <CommandIcon />
      </Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
}

/** Common shortcut combos for reference. */
export const Combos: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4 text-sm">
        <span className="w-32 text-muted-foreground">Command palette</span>
        <KbdGroup>
          <Kbd>
            <CommandIcon />
          </Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span className="w-32 text-muted-foreground">Save</span>
        <KbdGroup>
          <Kbd>
            <CommandIcon />
          </Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span className="w-32 text-muted-foreground">Copy</span>
        <KbdGroup>
          <Kbd>
            <CommandIcon />
          </Kbd>
          <Kbd>C</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span className="w-32 text-muted-foreground">Undo</span>
        <KbdGroup>
          <Kbd>
            <CommandIcon />
          </Kbd>
          <Kbd>Z</Kbd>
        </KbdGroup>
      </div>
    </div>
  ),
}
