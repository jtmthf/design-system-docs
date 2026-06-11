import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "#lib/utils"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

/**
 * A navigational landmark that shows the user's current location within a hierarchy.
 *
 * @remarks
 * Renders a `nav` element with `aria-label="breadcrumb"`. Composed of
 * `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`,
 * `BreadcrumbSeparator`, and `BreadcrumbEllipsis`.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Settings</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 *
 * @public
 */
function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

/**
 * An ordered list that wraps all breadcrumb items with consistent spacing and text styling.
 *
 * @remarks
 * Must be a direct child of `Breadcrumb`.
 *
 * @public
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * A single entry in the `BreadcrumbList`, containing a link, page label, or separator.
 *
 * @public
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

/**
 * An anchor element representing an ancestor page in the breadcrumb trail.
 *
 * @remarks
 * Accepts a `render` prop for use with client-side router `Link` components via
 * Base UI's `useRender`. Defaults to a plain `a` tag.
 *
 * @public
 */
function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn("transition-colors hover:text-foreground", className),
      },
      props
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  })
}

/**
 * A non-interactive label representing the user's current page in the breadcrumb trail.
 *
 * @remarks
 * Carries `aria-current="page"` and `aria-disabled="true"` to communicate the
 * current location to assistive technology.
 *
 * @public
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  )
}

/**
 * A visual divider rendered between `BreadcrumbItem` elements.
 *
 * @remarks
 * Defaults to a `ChevronRightIcon` but accepts custom children to override the icon.
 * Hidden from assistive technology via `aria-hidden="true"`.
 *
 * @public
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? (
        <ChevronRightIcon />
      )}
    </li>
  )
}

/**
 * A collapsed indicator shown when some breadcrumb items are hidden due to space constraints.
 *
 * @remarks
 * Renders a `MoreHorizontalIcon` with a screen-reader-only "More" label.
 * Hidden from assistive technology via `aria-hidden="true"`.
 *
 * @public
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-5 items-center justify-center [&>svg]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon
      />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
