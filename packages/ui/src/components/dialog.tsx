"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "#lib/utils"
import { Button } from "#components/button"
import { XIcon } from "lucide-react"

/**
 * Dialog root that manages open/close state for a modal overlay.
 *
 * @remarks
 * Compose with `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`,
 * `DialogTitle`, and `DialogDescription`. Delegates state management to the Base UI
 * `Dialog.Root` primitive. Can be controlled via `open` and `onOpenChange` props.
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>Open</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Confirm action</DialogTitle>
 *       <DialogDescription>This cannot be undone.</DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter showCloseButton>
 *       <Button>Confirm</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 *
 * @public
 */
function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

/**
 * Button or element that opens the parent `Dialog` when activated.
 *
 * @remarks
 * Delegates to `DialogPrimitive.Trigger`. Any focusable element may be used as the
 * trigger via the `render` prop of the underlying primitive.
 *
 * @public
 */
function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

/**
 * Portal wrapper that renders dialog content outside the normal DOM hierarchy.
 *
 * @remarks
 * Delegates to `DialogPrimitive.Portal`. Used internally by `DialogContent`; you
 * rarely need to use this directly.
 *
 * @public
 */
function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

/**
 * Button or element that closes the parent `Dialog` when activated.
 *
 * @remarks
 * Delegates to `DialogPrimitive.Close`. Use inside `DialogContent` or
 * `DialogFooter` for explicit close affordances.
 *
 * @public
 */
function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

/**
 * Semi-transparent backdrop rendered behind the dialog popup.
 *
 * @remarks
 * Applies a subtle blur when the browser supports `backdrop-filter`. Animates in
 * and out using `data-open` / `data-closed` attributes. Used internally by
 * `DialogContent`; you rarely need to use this directly.
 *
 * @public
 */
function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Centered popup panel rendered inside a portal with an overlay backdrop.
 *
 * @remarks
 * Composes `DialogPortal`, `DialogOverlay`, and `DialogPrimitive.Popup`. Renders a
 * close button in the top-right corner by default; set `showCloseButton` to `false`
 * to suppress it. Animates in and out via `data-open` / `data-closed` attributes.
 *
 * @public
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-sm"
              />
            }
          >
            <XIcon
            />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

/**
 * Vertical stack container for `DialogTitle` and `DialogDescription`.
 *
 * @remarks
 * A plain `div` with `flex-col gap-2` layout. Renders a `data-slot="dialog-header"`
 * attribute for CSS targeting.
 *
 * @public
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

/**
 * Action area rendered at the bottom of `DialogContent` with a muted background.
 *
 * @remarks
 * Lays out children in a reversed column on mobile and a right-justified row on
 * wider viewports. When `showCloseButton` is `true`, appends a `DialogClose`
 * button labelled "Close" at the end of the row.
 *
 * @public
 */
function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

/**
 * Accessible title for the dialog, announced by screen readers on open.
 *
 * @remarks
 * Renders via `DialogPrimitive.Title` and applies heading font styles. Required for
 * accessibility; hide visually with `sr-only` if needed.
 *
 * @public
 */
function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

/**
 * Supplementary description for the dialog, linked to the popup for screen readers.
 *
 * @remarks
 * Renders via `DialogPrimitive.Description` in muted small text. Inline anchor
 * links are underlined and adopt foreground color on hover.
 *
 * @public
 */
function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
