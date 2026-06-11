"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"

import { cn } from "#lib/utils"

/**
 * A scrollable container with a custom-styled scrollbar built on Base UI's ScrollArea primitive.
 *
 * @remarks
 * Renders a viewport with overflow clipping and appends a `ScrollBar` and corner element
 * automatically. The viewport receives focus-visible ring styling for keyboard accessibility.
 *
 * @example
 * ```tsx
 * <ScrollArea className="h-48">
 *   <div>Long content...</div>
 * </ScrollArea>
 * ```
 *
 * @public
 */
function ScrollArea({
  className,
  children,
  ...props
}: ScrollAreaPrimitive.Root.Props) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

/**
 * A custom scrollbar track and thumb rendered inside a ScrollArea.
 *
 * @remarks
 * Supports `orientation` of `"vertical"` (default) or `"horizontal"`. The thumb is rounded and
 * styled with the border color token. Automatically appended by `ScrollArea`; can also be used
 * standalone within a `ScrollAreaPrimitive.Root`.
 *
 * @public
 */
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
