"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "#lib/utils"

/**
 * A thin visual divider used to separate sections of content.
 *
 * @remarks
 * Built on Base UI's Separator primitive. Supports `orientation` of `"horizontal"` (default,
 * renders as a full-width 1px bar) or `"vertical"` (renders as a 1px self-stretching column).
 *
 * @example
 * ```tsx
 * <Separator />
 * <Separator orientation="vertical" className="h-6" />
 * ```
 *
 * @public
 */
function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
