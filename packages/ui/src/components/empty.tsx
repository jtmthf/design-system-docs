import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "#lib/utils"

/**
 * Full-width centered container for empty-state UI.
 *
 * @remarks
 * Compose with `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, and
 * `EmptyContent` to build a complete empty state. Renders a dashed border, balanced
 * text, and comfortable padding by default.
 *
 * @example
 * ```tsx
 * <Empty>
 *   <EmptyHeader>
 *     <EmptyMedia variant="icon">
 *       <FolderIcon />
 *     </EmptyMedia>
 *     <EmptyTitle>No files found</EmptyTitle>
 *     <EmptyDescription>Upload a file to get started.</EmptyDescription>
 *   </EmptyHeader>
 *   <EmptyContent>
 *     <Button>Upload</Button>
 *   </EmptyContent>
 * </Empty>
 * ```
 *
 * @public
 */
function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed p-6 text-center text-balance",
        className
      )}
      {...props}
    />
  )
}

/**
 * Vertical stack that groups `EmptyMedia`, `EmptyTitle`, and `EmptyDescription`.
 *
 * @remarks
 * Centers its children and constrains width to `max-w-sm`. Must be placed inside
 * an `Empty` root.
 *
 * @public
 */
function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-2", className)}
      {...props}
    />
  )
}

/**
 * Builds the Tailwind class string for `EmptyMedia` variants.
 *
 * @remarks
 * Available variants:
 * - `variant`: `"default"` (transparent background, any size content) |
 *   `"icon"` (fixed `2rem` square with muted background and `1rem` icon size).
 *
 * Default variant: `"default"`.
 *
 * @public
 */
const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Media or icon container placed above the title in an `EmptyHeader`.
 *
 * @remarks
 * Use `variant="icon"` to render a fixed-size muted-background icon badge, or
 * `variant="default"` (the default) for illustrations or other arbitrary content.
 *
 * @public
 */
function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

/**
 * Short heading that names the empty state.
 *
 * @remarks
 * Renders tight-tracking medium-weight text using the heading font. Place inside
 * `EmptyHeader`.
 *
 * @public
 */
function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn(
        "font-heading text-sm font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

/**
 * Explanatory paragraph rendered below the `EmptyTitle`.
 *
 * @remarks
 * Renders muted relaxed-line-height text. Inline anchor links are underlined and
 * adopt primary color on hover. Place inside `EmptyHeader`.
 *
 * @public
 */
function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

/**
 * Action area rendered below `EmptyHeader` for CTAs such as buttons or links.
 *
 * @remarks
 * Centers its children, constrains width to `max-w-sm`, and balances text.
 * Must be placed directly inside an `Empty` root.
 *
 * @public
 */
function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
