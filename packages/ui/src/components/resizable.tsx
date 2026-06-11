"use client"

import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "#lib/utils"

/**
 * A container that arranges ResizablePanel children in a horizontal or vertical layout with drag handles.
 *
 * @remarks
 * Built on `react-resizable-panels`. Set `direction` to `"horizontal"` or `"vertical"` on the
 * underlying Group. Compose with `ResizablePanel` and `ResizableHandle` for a complete layout.
 *
 * @example
 * ```tsx
 * <ResizablePanelGroup direction="horizontal">
 *   <ResizablePanel defaultSize={50}>Left</ResizablePanel>
 *   <ResizableHandle />
 *   <ResizablePanel defaultSize={50}>Right</ResizablePanel>
 * </ResizablePanelGroup>
 * ```
 *
 * @public
 */
function ResizablePanelGroup({
  className,
  ...props
}: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full aria-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

/**
 * An individual resizable pane within a ResizablePanelGroup.
 *
 * @remarks
 * Accepts `defaultSize`, `minSize`, `maxSize`, and `onResize` from `react-resizable-panels`.
 * Place a `ResizableHandle` between sibling panels to enable drag-to-resize.
 *
 * @public
 */
function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

/**
 * A drag handle placed between two ResizablePanel elements to allow resizing.
 *
 * @remarks
 * Set `withHandle` to `true` to render a visible grip bar in the center of the separator.
 * Adapts between horizontal and vertical orientations via ARIA orientation attributes.
 *
 * @public
 */
function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        "relative flex w-px items-center justify-center bg-border ring-offset-background after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border" />
      )}
    </ResizablePrimitive.Separator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
