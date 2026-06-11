"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "#lib/utils"
import { Button } from "#components/button"
import { Input } from "#components/input"
import { Textarea } from "#components/textarea"

/**
 * Composite input container that combines a text control with addons and buttons
 * in a single bordered group.
 *
 * @remarks
 * Renders a `div[role="group"]` with a shared border and focus ring that activates
 * when the inner `[data-slot=input-group-control]` element is focused. Compose with
 * `InputGroupAddon`, `InputGroupButton`, `InputGroupText`, `InputGroupInput`, and
 * `InputGroupTextarea`. When the group contains a block-aligned addon the height
 * becomes `auto` and the layout switches to `flex-col`.
 *
 * @example
 * ```tsx
 * <InputGroup>
 *   <InputGroupAddon>
 *     <SearchIcon />
 *   </InputGroupAddon>
 *   <InputGroupInput placeholder="Search..." />
 * </InputGroup>
 * ```
 *
 * @public
 */
function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-lg border border-input transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-input/50 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className
      )}
      {...props}
    />
  )
}

/**
 * Builds the Tailwind class string for `InputGroupAddon` alignment variants.
 *
 * @remarks
 * Available variants:
 * - `align`: `"inline-start"` (leading, default) | `"inline-end"` (trailing) |
 *   `"block-start"` (top, full-width) | `"block-end"` (bottom, full-width).
 *
 * Default variant: `align: "inline-start"`.
 *
 * @public
 */
const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
        "inline-end":
          "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

/**
 * Addon container placed inside an `InputGroup` to hold icons, text, or buttons.
 *
 * @remarks
 * Clicking the addon (outside any child button) forwards focus to the first `input`
 * in the parent `InputGroup`. Use the `align` prop to control position:
 * `"inline-start"` (default, leading), `"inline-end"` (trailing),
 * `"block-start"` (top row), or `"block-end"` (bottom row).
 *
 * @public
 */
function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

/**
 * Builds the Tailwind class string for `InputGroupButton` size variants.
 *
 * @remarks
 * Available variants:
 * - `size`: `"xs"` (default, small text button with `1.5rem` height) |
 *   `"sm"` (standard small button) | `"icon-xs"` (square `1.5rem` icon button) |
 *   `"icon-sm"` (square `2rem` icon button).
 *
 * Default variant: `size: "xs"`.
 *
 * @public
 */
const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

/**
 * Compact button rendered inside an `InputGroupAddon`.
 *
 * @remarks
 * Wraps `Button` and applies `inputGroupButtonVariants` sizing. Defaults to
 * `variant="ghost"`, `size="xs"`, and `type="button"` to avoid accidental form
 * submission. Pass `size="icon-xs"` or `size="icon-sm"` for square icon buttons.
 *
 * @public
 */
function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset"
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

/**
 * Non-interactive text or icon label rendered inside an `InputGroupAddon`.
 *
 * @remarks
 * Renders muted small text. Icons are sized to `1rem` by default. Use for static
 * prefix/suffix labels such as currency symbols or unit strings.
 *
 * @public
 */
function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Unstyled text input rendered inside an `InputGroup`, sharing the group border
 * and focus ring.
 *
 * @remarks
 * Delegates to `Input` and applies `data-slot="input-group-control"` so the parent
 * `InputGroup` can detect focus. Border, background, and ring styles are removed
 * so they do not double-render with the group container.
 *
 * @public
 */
function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

/**
 * Unstyled textarea rendered inside an `InputGroup`, sharing the group border
 * and focus ring.
 *
 * @remarks
 * Delegates to `Textarea` and applies `data-slot="input-group-control"`. Resize is
 * disabled (`resize-none`) and padding is adjusted to sit flush within the group
 * container. Border, background, and ring styles are removed to avoid double
 * rendering.
 *
 * @public
 */
function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
