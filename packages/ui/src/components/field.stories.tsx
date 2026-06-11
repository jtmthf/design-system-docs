import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldContent,
  FieldTitle,
} from "#components/field"
import { Input } from "#components/input"
import { Checkbox } from "#components/checkbox"

/**
 * A composable form-field wrapper that pairs a label, control, optional
 * description, and error message with consistent layout and accessibility
 * semantics. Use `Field`, `FieldLabel`, `FieldDescription`, and `FieldError`
 * as the primary building blocks.
 */
const meta = {
  component: Field,
  tags: ["ai-generated"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      description: "Controls the label-to-control layout direction.",
      control: "select",
      options: ["vertical", "horizontal", "responsive"],
      table: {
        category: "Appearance",
        type: { summary: '"vertical" | "horizontal" | "responsive"' },
        defaultValue: { summary: '"vertical"' },
      },
    },
    className: {
      description: "Additional Tailwind classes.",
      control: "text",
      table: { category: "HTML" },
    },
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

/** Standard vertical field with a label, input, and supporting description. */
export const Default: Story = {
  render: (args) => (
    <Field {...args} className="w-80">
      <FieldLabel htmlFor="email">Email address</FieldLabel>
      <Input id="email" type="email" placeholder="ada@example.com" />
      <FieldDescription>We&apos;ll never share your email.</FieldDescription>
    </Field>
  ),
}

/** Field in an error state — shows a visible error message below the control. */
export const WithError: Story = {
  render: (args) => (
    <Field {...args} data-invalid="true" className="w-80">
      <FieldLabel htmlFor="email-err">Email address</FieldLabel>
      <Input
        id="email-err"
        type="email"
        defaultValue="not-valid"
        aria-invalid
      />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  ),
}

/** Horizontal orientation — label and control sit side by side on wider layouts. */
export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <Field {...args} className="w-96">
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" placeholder="@handle" />
    </Field>
  ),
}

/** A fieldset grouping related fields with a legend — suitable for multi-field sections. */
export const WithFieldSet: Story = {
  render: () => (
    <FieldSet className="w-80">
      <FieldLegend>Contact details</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="first">First name</FieldLabel>
          <Input id="first" placeholder="Ada" />
        </Field>
        <Field>
          <FieldLabel htmlFor="last">Last name</FieldLabel>
          <Input id="last" placeholder="Lovelace" />
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Subscribe to newsletter</FieldTitle>
            <FieldDescription>Receive weekly updates.</FieldDescription>
          </FieldContent>
          <Checkbox id="subscribe" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}
