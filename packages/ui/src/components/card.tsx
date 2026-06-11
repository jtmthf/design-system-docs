import * as React from "react"

import { cn } from "#lib/utils"

/**
 * A surface container used to group related content and actions in a distinct visual panel.
 *
 * @remarks
 * Composed of `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`,
 * `CardContent`, and `CardFooter`. Accepts a `size` prop (`"default"` | `"sm"`)
 * that adjusts internal spacing via the `--card-spacing` CSS custom property.
 * Images placed as the first or last direct child are automatically given
 * matching top or bottom border radii.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Project Status</CardTitle>
 *     <CardDescription>Overview of current sprint</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Everything is on track.</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button size="sm">View details</Button>
 *   </CardFooter>
 * </Card>
 * ```
 *
 * @public
 */
function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

/**
 * The top section of a `Card` that contains the title, description, and optional action.
 *
 * @remarks
 * Uses a container query context (`@container/card-header`) and adjusts its grid
 * layout when a `CardAction` is present.
 *
 * @public
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

/**
 * The primary heading of a `Card`, rendered in medium font weight.
 *
 * @remarks
 * Uses the heading font family. Reduces to `text-sm` when the parent `Card` has
 * `size="sm"`.
 *
 * @public
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Supporting subtitle text displayed below the `CardTitle` in muted foreground color.
 *
 * @public
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

/**
 * An optional slot in the `CardHeader` for a contextual action such as a menu or button.
 *
 * @remarks
 * Spans two rows and aligns to the end of the header grid, keeping the action
 * flush with the top-right of the header regardless of whether a description is present.
 *
 * @public
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * The body area of a `Card` with horizontal padding matching the card spacing token.
 *
 * @public
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

/**
 * The bottom section of a `Card` rendered with a muted background and top border.
 *
 * @remarks
 * When present, the parent `Card` removes its own bottom padding so the footer
 * flush-fits the card's rounded bottom corners.
 *
 * @public
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
