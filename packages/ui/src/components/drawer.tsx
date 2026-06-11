"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "#lib/utils"

/**
 * Drawer root that manages open/close state for a slide-in panel anchored to a
 * viewport edge.
 *
 * @remarks
 * Built on the Vaul `Drawer.Root` primitive. Compose with `DrawerTrigger`,
 * `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, and
 * `DrawerDescription`. Direction (bottom, top, left, right) is controlled by
 * the `direction` prop on the primitive, and the content panel adapts its
 * styling automatically via `data-[vaul-drawer-direction]` attributes.
 *
 * @example
 * ```tsx
 * <Drawer>
 *   <DrawerTrigger>Open drawer</DrawerTrigger>
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <DrawerTitle>Settings</DrawerTitle>
 *       <DrawerDescription>Manage your preferences.</DrawerDescription>
 *     </DrawerHeader>
 *     <DrawerFooter>
 *       <Button>Save</Button>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 * ```
 *
 * @public
 */
function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

/**
 * Element that opens the parent `Drawer` when activated.
 *
 * @remarks
 * Delegates to `DrawerPrimitive.Trigger`. Any focusable element can be used via
 * the underlying primitive's `render` prop.
 *
 * @public
 */
function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

/**
 * Portal wrapper that renders drawer content outside the normal DOM hierarchy.
 *
 * @remarks
 * Delegates to `DrawerPrimitive.Portal`. Used internally by `DrawerContent`; you
 * rarely need to use this directly.
 *
 * @public
 */
function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

/**
 * Element that closes the parent `Drawer` when activated.
 *
 * @remarks
 * Delegates to `DrawerPrimitive.Close`. Use inside `DrawerContent` or
 * `DrawerFooter` for an explicit close affordance.
 *
 * @public
 */
function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

/**
 * Semi-transparent backdrop rendered behind the drawer panel.
 *
 * @remarks
 * Applies a subtle blur when the browser supports `backdrop-filter`. Animates in
 * and out using `data-open` / `data-closed` attributes. Used internally by
 * `DrawerContent`.
 *
 * @public
 */
function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Slide-in panel that renders via a portal with a backdrop overlay.
 *
 * @remarks
 * Composes `DrawerPortal` and `DrawerOverlay`. Layout adapts to the drawer
 * `direction` prop: bottom and top variants are full-width with a max height of
 * `80vh`; left and right variants are full-height with a max width of `75%` on
 * mobile and `sm:max-w-sm` on wider screens. A drag handle is rendered
 * automatically for bottom-direction drawers.
 *
 * @public
 */
function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content fixed z-50 flex h-auto flex-col bg-popover text-sm text-popover-foreground data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-xl data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:rounded-r-xl data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:rounded-l-xl data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-xl data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=right]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="mx-auto mt-4 hidden h-1 w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

/**
 * Top section of a `DrawerContent` for title and description.
 *
 * @remarks
 * Centers text for bottom and top direction drawers; left-aligns on `md` screens
 * and for side drawers. Renders a `data-slot="drawer-header"` attribute for CSS
 * targeting.
 *
 * @public
 */
function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-0.5 md:text-left",
        className
      )}
      {...props}
    />
  )
}

/**
 * Bottom action area of a `DrawerContent` that pushes to the end of the panel.
 *
 * @remarks
 * Uses `mt-auto` to remain pinned at the bottom of the drawer's flex column.
 * Renders a `data-slot="drawer-footer"` attribute for CSS targeting.
 *
 * @public
 */
function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

/**
 * Accessible title for the drawer, announced by screen readers on open.
 *
 * @remarks
 * Delegates to `DrawerPrimitive.Title` and applies heading font styles.
 *
 * @public
 */
function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "font-heading text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * Supplementary description for the drawer, linked to the panel for screen readers.
 *
 * @remarks
 * Delegates to `DrawerPrimitive.Description` and renders muted small text.
 *
 * @public
 */
function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
