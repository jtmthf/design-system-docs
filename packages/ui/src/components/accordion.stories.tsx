import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "#components/accordion"

/**
 * A vertically stacked set of headings that reveal or hide associated panels.
 * Use to reduce cognitive load on pages with long content.
 */
const meta = {
  component: Accordion,
  tags: ["ai-generated"],
  args: {
    multiple: true,
    disabled: false,
    loopFocus: true,
    orientation: "vertical",
  },
  argTypes: {
    multiple: {
      description: "Allows more than one panel to be open at once.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    disabled: {
      description: "Disables interaction for the entire accordion.",
      control: "boolean",
      table: { category: "State" },
    },
    loopFocus: {
      description: "Wraps keyboard focus from last item back to first.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    orientation: {
      description: "Determines arrow-key direction for roving focus.",
      control: "select",
      options: ["vertical", "horizontal"],
      table: {
        category: "Behavior",
        type: { summary: '"vertical" | "horizontal"' },
        defaultValue: { summary: '"vertical"' },
      },
    },
    defaultValue: {
      description: "Values of items open by default.",
      control: "object",
      table: { category: "State" },
    },
    value: {
      description: "Controlled open item values.",
      control: "object",
      table: { category: "State" },
    },
    keepMounted: {
      description: "Keeps collapsed panels in the DOM.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    hiddenUntilFound: {
      description: "Allows browser find-in-page to search collapsed content.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    className: {
      description: "Additional Tailwind classes.",
      control: "text",
      table: { category: "HTML" },
    },
    onValueChange: {
      description: "Fired when the open items change.",
      action: "valueChanged",
      table: { category: "Events" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const Example = (props: React.ComponentProps<typeof Accordion>) => (
  <Accordion className="w-96" {...props}>
    <AccordionItem value="accessible">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It follows the WAI-ARIA accordion pattern.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="styled">
      <AccordionTrigger>Is it styled?</AccordionTrigger>
      <AccordionContent>Yes, it ships with sensible defaults.</AccordionContent>
    </AccordionItem>
  </Accordion>
)

/** Closed accordion where clicking a trigger expands its panel. */
export const Default: Story = {
  render: (args) => <Example {...args} />,
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: /is it accessible/i })
    await expect(trigger).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await expect(await canvas.findByText(/wai-aria/i)).toBeVisible()
  },
}

/** Pre-opens the first item so users see content on page load. */
export const FirstItemOpen: Story = {
  render: (args) => <Example defaultValue={["accessible"]} {...args} />,
}
