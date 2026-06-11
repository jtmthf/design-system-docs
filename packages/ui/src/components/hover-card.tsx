"use client"

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"

import { cn } from "#lib/utils"

/**
 * Hover card root that manages open/close state for a preview popup triggered
 * on hover or focus of its trigger element.
 *
 * @remarks
 * Built on the Base UI `PreviewCard.Root` primitive. Compose with
 * `HoverCardTrigger` and `HoverCardContent`. The popup opens after a configurable
 * delay when the trigger receives pointer or focus events, and closes when the
 * pointer leaves both the trigger and the content.
 *
 * @example
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger>@username</HoverCardTrigger>
 *   <HoverCardContent>
 *     <p>Joined January 2020</p>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 *
 * @public
 */
function HoverCard({ ...props }: PreviewCardPrimitive.Root.Props) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
}

/**
 * Element that opens the parent `HoverCard` popup on hover or focus.
 *
 * @remarks
 * Delegates to `PreviewCardPrimitive.Trigger`. Typically rendered as an inline
 * anchor or button.
 *
 * @public
 */
function HoverCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
  return (
    <PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

/**
 * Floating popup panel that displays rich preview content for a `HoverCardTrigger`.
 *
 * @remarks
 * Renders via a portal and uses a `Positioner` for anchor-aware placement. Accepts
 * `side`, `sideOffset`, `align`, and `alignOffset` from
 * `PreviewCardPrimitive.Positioner` for fine-grained positioning. Width is fixed at
 * `16rem`. Applies entry/exit animations driven by `data-open` and `data-closed`
 * attributes.
 *
 * @public
 */
function HoverCardContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 4,
  ...props
}: PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            "z-50 w-64 origin-(--transform-origin) rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
