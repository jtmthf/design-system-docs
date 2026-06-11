import * as React from "react"

import { cn } from "#lib/utils"
import { Button } from "#components/button"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

/**
 * A navigation landmark for paginated content, rendering page links and previous/next controls.
 *
 * @remarks
 * Renders a `<nav>` with `role="navigation"` and `aria-label="pagination"`. Compose with
 * `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`,
 * `PaginationNext`, and `PaginationEllipsis` for a full pagination UI.
 *
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem><PaginationPrevious href="/page/1" /></PaginationItem>
 *     <PaginationItem><PaginationLink href="/page/2" isActive>2</PaginationLink></PaginationItem>
 *     <PaginationItem><PaginationNext href="/page/3" /></PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 *
 * @public
 */
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

/**
 * The `<ul>` container that holds PaginationItem elements in a flex row.
 *
 * @public
 */
function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  )
}

/**
 * A list item wrapper for a single pagination control within PaginationContent.
 *
 * @public
 */
function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

/**
 * Props for PaginationLink, combining anchor attributes with Button size and an active-page flag.
 *
 * @remarks
 * `isActive` sets `aria-current="page"` and switches the button to the `outline` variant.
 * `size` maps to the underlying Button size, defaulting to `"icon"`.
 *
 * @public
 */
type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

/**
 * A page-number anchor rendered as a Button that indicates the current page when active.
 *
 * @remarks
 * Uses Button's `outline` variant when `isActive` is true and `ghost` otherwise. Renders
 * as an `<a>` tag via Button's `render` prop for correct semantics.
 *
 * @public
 */
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  )
}

/**
 * A PaginationLink preconfigured as a "Go to previous page" control with a left chevron.
 *
 * @remarks
 * The `text` prop sets the visible label (hidden on small screens); defaults to `"Previous"`.
 *
 * @public
 */
function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("pl-1.5!", className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  )
}

/**
 * A PaginationLink preconfigured as a "Go to next page" control with a right chevron.
 *
 * @remarks
 * The `text` prop sets the visible label (hidden on small screens); defaults to `"Next"`.
 *
 * @public
 */
function PaginationNext({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("pr-1.5!", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  )
}

/**
 * A non-interactive indicator representing a gap in the page number sequence.
 *
 * @remarks
 * Renders `aria-hidden` with a screen-reader-only "More pages" label and a horizontal
 * ellipsis icon.
 *
 * @public
 */
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon
      />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
