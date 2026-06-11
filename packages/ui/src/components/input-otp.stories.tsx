import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "#components/input-otp"

/**
 * A segmented one-time password field. Each slot accepts a single character and
 * advances focus automatically. Use for verification codes, PINs, and 2FA flows.
 */
const meta = {
  component: InputOTP,
  tags: ["ai-generated"],
  args: {
    maxLength: 6,
    disabled: false,
    children: (
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    ),
  },
  argTypes: {
    maxLength: {
      description: "Total number of OTP digits.",
      control: "number",
      table: {
        category: "Appearance",
        defaultValue: { summary: "6" },
      },
    },
    disabled: {
      description: "Prevents user interaction on all slots.",
      control: "boolean",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    pattern: {
      description:
        "Regular expression pattern restricting allowed characters (e.g. digits only).",
      control: "text",
      table: { category: "State" },
    },
    value: {
      description: "Controlled value string.",
      control: "text",
      table: { category: "State" },
    },
    onChange: {
      description: "Fired when the value changes.",
      action: "changed",
      table: { category: "Events" },
    },
    onComplete: {
      description: "Fired when all slots are filled.",
      action: "completed",
      table: { category: "Events" },
    },
    children: {
      description: "Slot composition rendered inside the field.",
      control: false,
      table: { category: "Content" },
    },
    className: {
      description: "Additional Tailwind classes.",
      control: "text",
      table: { category: "HTML" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputOTP>

export default meta
type Story = StoryObj<typeof meta>

/** Six-slot code field; type digits to fill each slot sequentially. */
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox")
    await userEvent.click(input)
    await userEvent.type(input, "123456")
    await expect(input).toHaveValue("123456")
  },
}

/** Two groups of three slots separated by a dash — a common SMS code layout. */
export const WithSeparator: Story = {
  args: {
    children: (
      <>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </>
    ),
  },
}

/** Four-digit PIN field for shorter codes. */
export const FourDigit: Story = {
  args: {
    maxLength: 4,
    children: (
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    ),
  },
}

/** Non-interactive state for read-only confirmation screens. */
export const Disabled: Story = {
  args: { disabled: true, value: "123456" },
}
