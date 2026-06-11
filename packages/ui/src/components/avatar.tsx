"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "#lib/utils"

/**
 * A circular user avatar that displays a photo, with an automatic text fallback.
 *
 * @remarks
 * Composed of `AvatarImage` and `AvatarFallback`. Accepts a `size` prop
 * (`"sm"` | `"default"` | `"lg"`) to control diameter. An `AvatarBadge` can be
 * overlaid for status indicators, and multiple avatars can be stacked inside an
 * `AvatarGroup`.
 *
 * @example
 * ```tsx
 * <Avatar size="lg">
 *   <AvatarImage src="/profile.jpg" alt="Jane Doe" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 *
 * @public
 */
function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  )
}

/**
 * The photo rendered inside an `Avatar`, hidden automatically if it fails to load.
 *
 * @remarks
 * Delegates image load-state detection to Base UI's `AvatarPrimitive.Image`.
 * When the image is unavailable, `AvatarFallback` is shown instead.
 *
 * @public
 */
function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

/**
 * Text or icon rendered inside an `Avatar` when the image is unavailable.
 *
 * @remarks
 * Typically contains the user's initials. Automatically adjusts font size for
 * the `"sm"` avatar size via the parent group context.
 *
 * @public
 */
function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  )
}

/**
 * A small status indicator badge overlaid on the bottom-right corner of an `Avatar`.
 *
 * @remarks
 * Scales with the parent `Avatar` size. Icons inside the badge are hidden at the
 * `"sm"` size to keep the badge readable.
 *
 * @public
 */
function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * A container that overlaps multiple `Avatar` components into a horizontal stack.
 *
 * @remarks
 * Applies negative spacing and a ring around each child avatar to visually
 * separate them. Wrap `Avatar` elements directly inside this component.
 *
 * @public
 */
function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

/**
 * A numeric overflow indicator shown at the end of an `AvatarGroup`.
 *
 * @remarks
 * Displays a count of hidden avatars (e.g., "+3") styled consistently with the
 * sibling `Avatar` elements, scaling to match the group's size.
 *
 * @public
 */
function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
