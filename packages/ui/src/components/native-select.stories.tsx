import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "#components/label"
import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from "#components/native-select"

/**
 * A styled wrapper around the native `<select>` element. Use when a custom
 * dropdown is unnecessary and you want full platform-native behaviour on mobile.
 */
const meta = {
  component: NativeSelect,
  tags: ["ai-generated"],
  args: {
    size: "default",
    disabled: false,
  },
  argTypes: {
    size: {
      description: "Physical height of the select.",
      control: "select",
      options: ["default", "sm"],
      table: {
        category: "Appearance",
        type: { summary: '"default" | "sm"' },
        defaultValue: { summary: '"default"' },
      },
    },
    disabled: {
      description: "Prevents user interaction.",
      control: "boolean",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    "aria-invalid": {
      description: "Signals validation failure to assistive technology.",
      control: "boolean",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    defaultValue: {
      description: "Initially selected value for uncontrolled usage.",
      control: "text",
      table: { category: "State" },
    },
    value: {
      description: "Controlled selected value.",
      control: "text",
      table: { category: "State" },
    },
    onChange: {
      description: "Fired when the selected value changes.",
      action: "changed",
      table: { category: "Events" },
    },
    className: {
      description: "Additional Tailwind classes applied to the wrapper.",
      control: "text",
      table: { category: "HTML" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

/** Default select with a flat list of options. */
export const Default: Story = {
  render: (args) => (
    <NativeSelect {...args}>
      <NativeSelectOption value="">Choose a fruit…</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
    </NativeSelect>
  ),
}

/** Compact `sm` size for dense form layouts. */
export const Small: Story = {
  render: (args) => (
    <NativeSelect {...args} size="sm">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
    </NativeSelect>
  ),
}

/** Options organised into logical categories using `optgroup`. */
export const WithOptGroups: Story = {
  render: (args) => (
    <NativeSelect {...args}>
      <NativeSelectOptGroup label="Fruits">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Vegetables">
        <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
        <NativeSelectOption value="broccoli">Broccoli</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
}

/** Non-interactive state and validation error state shown side by side. */
export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Label>
        Disabled
        <NativeSelect {...args} disabled defaultValue="apple">
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
        </NativeSelect>
      </Label>
      <Label>
        Invalid
        <NativeSelect {...args} aria-invalid defaultValue="">
          <NativeSelectOption value="">Choose…</NativeSelectOption>
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
        </NativeSelect>
      </Label>
    </div>
  ),
}
