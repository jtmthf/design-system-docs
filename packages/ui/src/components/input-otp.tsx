"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"

import { cn } from "#lib/utils"
import { MinusIcon } from "lucide-react"

/**
 * One-time password input that manages focus, caret, and slot state for digit-by-digit
 * entry.
 *
 * @remarks
 * Wraps the `input-otp` `OTPInput` primitive. Compose with `InputOTPGroup`,
 * `InputOTPSlot`, and optionally `InputOTPSeparator` to define the visual layout.
 * Spell-check is disabled by default. The `containerClassName` prop customises the
 * outer wrapper; the `className` prop targets the hidden native input.
 *
 * @example
 * ```tsx
 * <InputOTP maxLength={6}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *     <InputOTPSlot index={2} />
 *   </InputOTPGroup>
 *   <InputOTPSeparator />
 *   <InputOTPGroup>
 *     <InputOTPSlot index={3} />
 *     <InputOTPSlot index={4} />
 *     <InputOTPSlot index={5} />
 *   </InputOTPGroup>
 * </InputOTP>
 * ```
 *
 * @public
 */
function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "cn-input-otp flex items-center has-disabled:opacity-50",
        containerClassName
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

/**
 * Flex row container that groups a set of `InputOTPSlot` elements.
 *
 * @remarks
 * Applies rounded corners and conditional destructive ring styling when any slot
 * inside carries `aria-invalid`. Multiple groups separated by `InputOTPSeparator`
 * are common for six-digit codes rendered as two groups of three.
 *
 * @public
 */
function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center rounded-lg has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

/**
 * Individual character slot within an `InputOTPGroup`.
 *
 * @remarks
 * Reads slot state (character, active status, fake-caret flag) from the nearest
 * `OTPInputContext`. The `index` prop identifies which slot position to render.
 * A blinking caret is shown when `hasFakeCaret` is `true`. Active slots display a
 * ring and border in the ring color; invalid slots display destructive styling.
 *
 * @public
 */
function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-8 items-center justify-center border-y border-r border-input text-sm transition-all outline-none first:rounded-l-lg first:border-l last:rounded-r-lg aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-3 data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
}

/**
 * Visual separator rendered between `InputOTPGroup` elements.
 *
 * @remarks
 * Renders a `MinusIcon` by default and carries `role="separator"` for accessibility.
 * Place between two `InputOTPGroup` components to indicate a logical break in the
 * code (e.g. between the first and second half of a six-digit OTP).
 *
 * @public
 */
function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center [&_svg:not([class*='size-'])]:size-4"
      role="separator"
      {...props}
    >
      <MinusIcon
      />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
