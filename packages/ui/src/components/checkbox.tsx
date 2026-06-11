"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { cn } from "#lib/utils"
import { CheckIcon } from "lucide-react"

/**
 * A binary toggle input that allows users to select or deselect an option.
 *
 * @remarks
 * Delegates checked state, keyboard handling, and ARIA semantics to Base UI's
 * `CheckboxPrimitive.Root`. The check icon is rendered via an internal
 * `CheckboxPrimitive.Indicator` and animates in/out with CSS transitions.
 * Supports an indeterminate state when configured through the Base UI primitive.
 * Integrates with form field group context for disabled styling.
 *
 * @example
 * ```tsx
 * <label className="flex items-center gap-2">
 *   <Checkbox id="accept" />
 *   <span>Accept terms and conditions</span>
 * </label>
 * ```
 *
 * @public
 */
function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
