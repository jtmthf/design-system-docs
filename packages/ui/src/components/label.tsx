"use client"

import * as React from "react"

import { cn } from "#lib/utils"

/**
 * A styled form label that associates text with a form control.
 *
 * @remarks
 * Renders a `<label>` element with medium font weight and a flex gap for inline icon support.
 * Automatically dims and disables pointer events when its peer input is disabled, or when a
 * parent group sets `data-disabled="true"`.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email address</Label>
 * <input id="email" type="email" />
 * ```
 *
 * @public
 */
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
