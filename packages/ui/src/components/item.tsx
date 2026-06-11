import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "#lib/utils"
import { Separator } from "#components/separator"

/**
 * A vertical list container that groups multiple Item components with consistent spacing.
 *
 * @remarks
 * Renders a `div` with `role="list"` and adjusts gap based on the `size` data attribute of
 * descendant items via group-context CSS selectors.
 *
 * @example
 * ```tsx
 * <ItemGroup>
 *   <Item>First item</Item>
 *   <Item>Second item</Item>
 * </ItemGroup>
 * ```
 *
 * @public
 */
function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        "group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * A horizontal separator rendered between items in an ItemGroup.
 *
 * @remarks
 * Wraps the `Separator` component with `orientation="horizontal"` and adds vertical margin
 * appropriate for item list layouts.
 *
 * @public
 */
function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-2", className)}
      {...props}
    />
  )
}

/**
 * Builds the class string for an Item based on its variant and size.
 *
 * @remarks
 * Variants: `default` (transparent border), `outline` (border-border), `muted` (muted background).
 * Sizes: `default`, `sm` (same padding as default), `xs` (compact padding, dropdown-friendly).
 * Default variant is `default`; default size is `default`.
 *
 * @public
 */
const itemVariants = cva(
  "group/item flex w-full flex-wrap items-center rounded-lg border text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-muted",
  {
    variants: {
      variant: {
        default: "border-transparent",
        outline: "border-border",
        muted: "border-transparent bg-muted/50",
      },
      size: {
        default: "gap-2.5 px-3 py-2.5",
        sm: "gap-2.5 px-3 py-2.5",
        xs: "gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * A flexible content row component used to display structured data with optional media, title, description, and actions.
 *
 * @remarks
 * Renders via `useRender` from Base UI so the underlying element is polymorphic via the `render`
 * prop. Supports `variant` (`default`, `outline`, `muted`) and `size` (`default`, `sm`, `xs`).
 * Compose with `ItemMedia`, `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions`,
 * `ItemHeader`, and `ItemFooter` for full layouts.
 *
 * @example
 * ```tsx
 * <Item variant="outline" size="sm">
 *   <ItemMedia variant="icon"><UserIcon /></ItemMedia>
 *   <ItemContent>
 *     <ItemTitle>Jane Doe</ItemTitle>
 *     <ItemDescription>Product designer</ItemDescription>
 *   </ItemContent>
 *   <ItemActions><Button size="sm">Follow</Button></ItemActions>
 * </Item>
 * ```
 *
 * @public
 */
function Item({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof itemVariants>) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(itemVariants({ variant, size, className })),
      },
      props
    ),
    render,
    state: {
      slot: "item",
      variant,
      size,
    },
  })
}

/**
 * Builds the class string for an ItemMedia element based on its variant.
 *
 * @remarks
 * Variants: `default` (transparent background), `icon` (auto-sizes SVGs to 16px),
 * `image` (fixed square container sized by the parent Item's size data attribute).
 * Default variant is `default`.
 *
 * @public
 */
const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "[&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * A slot for media content (icon or image) placed at the inline-start of an Item.
 *
 * @remarks
 * Accepts `variant` (`default`, `icon`, `image`) to control sizing and overflow behavior.
 * Automatically aligns with the item description when one is present.
 *
 * @public
 */
function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

/**
 * A flex column container that holds an item's primary textual content such as title and description.
 *
 * @remarks
 * Grows to fill available width. Adjacent ItemContent siblings shrink to fit their natural width.
 *
 * @public
 */
function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

/**
 * The primary label of an Item, rendered as a single clamped line with medium font weight.
 *
 * @public
 */
function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "line-clamp-1 flex w-fit items-center gap-2 text-sm leading-snug font-medium underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Secondary descriptive text for an Item, clamped to two lines with muted styling.
 *
 * @remarks
 * Inline anchor tags inside the description receive underline and hover color treatment.
 * Font size reduces further at `xs` item size.
 *
 * @public
 */
function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "line-clamp-2 text-left text-sm leading-normal font-normal text-muted-foreground group-data-[size=xs]/item:text-xs [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

/**
 * A flex row container for inline action controls placed at the trailing edge of an Item.
 *
 * @public
 */
function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

/**
 * A full-width row spanning the top of an Item, used for titles or metadata positioned with space-between alignment.
 *
 * @public
 */
function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * A full-width row spanning the bottom of an Item, used for supplementary controls or metadata.
 *
 * @public
 */
function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
