"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "#lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "#components/dialog"
import {
  InputGroup,
  InputGroupAddon,
} from "#components/input-group"
import { SearchIcon, CheckIcon } from "lucide-react"

/**
 * Command palette root that provides keyboard-navigable filtering over a list of items.
 *
 * @remarks
 * Built on top of the `cmdk` `Command` primitive. Compose it with `CommandInput`,
 * `CommandList`, `CommandGroup`, `CommandItem`, and optionally `CommandSeparator` and
 * `CommandShortcut`. For a modal variant wrap everything in `CommandDialog` instead.
 *
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="Search..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Actions">
 *       <CommandItem>New file</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 *
 * @public
 */
function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex size-full flex-col overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * Modal dialog wrapper that displays a `Command` palette in a centered overlay.
 *
 * @remarks
 * Composes `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, and
 * `DialogDescription` to produce an accessible modal command palette. The dialog
 * header is visually hidden (`sr-only`) but remains in the accessibility tree.
 * Pass `title` and `description` to customize the accessible label and description.
 * Set `showCloseButton` to `true` to render a visible close button.
 *
 * @public
 */
function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
  children: React.ReactNode
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0",
          className
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

/**
 * Search input rendered at the top of a `Command` palette.
 *
 * @remarks
 * Wrapped in an `InputGroup` with a `SearchIcon` addon. Filters the list of
 * `CommandItem` elements as the user types. Must be placed inside a `Command` root.
 *
 * @public
 */
function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="p-1 pb-0">
      <InputGroup className="h-8! rounded-lg! border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:pl-2!">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        <InputGroupAddon>
          <SearchIcon className="size-4 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

/**
 * Scrollable container for `CommandGroup` and `CommandItem` elements.
 *
 * @remarks
 * Limits height to `18rem` and hides the scrollbar. Must be placed inside a
 * `Command` root; all filtering logic operates on its descendant items.
 *
 * @public
 */
function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none",
        className
      )}
      {...props}
    />
  )
}

/**
 * Message displayed inside `CommandList` when no items match the current query.
 *
 * @remarks
 * Rendered automatically by the `cmdk` primitive when the filtered item count
 * reaches zero. Must be placed inside a `Command` root.
 *
 * @public
 */
function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    />
  )
}

/**
 * Named group of related `CommandItem` elements with a muted heading.
 *
 * @remarks
 * The group heading is styled via the `[cmdk-group-heading]` attribute selector.
 * Automatically hidden when all items inside are filtered out. Must be placed
 * inside a `CommandList`.
 *
 * @public
 */
function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * Horizontal rule that visually separates sections inside a `CommandList`.
 *
 * @public
 */
function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  )
}

/**
 * Selectable row inside a `CommandGroup` or `CommandList`.
 *
 * @remarks
 * Displays a `CheckIcon` when the item carries `data-checked="true"`. Supports
 * `data-selected` (keyboard focus) and `data-disabled` states. If a
 * `CommandShortcut` is present the check icon is hidden to avoid overlap.
 *
 * @public
 */
function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "group/command-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-selected:*:[svg]:text-foreground",
        className
      )}
      {...props}
    >
      {children}
      <CheckIcon className="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
  )
}

/**
 * Keyboard shortcut label rendered at the trailing edge of a `CommandItem`.
 *
 * @remarks
 * When present, the `CommandItem` check icon is hidden to avoid visual collision.
 * Apply key names as children (e.g. `"Ctrl K"`).
 *
 * @public
 */
function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
