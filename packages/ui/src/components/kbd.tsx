import { cn } from "#lib/utils"

/**
 * Renders a keyboard key label with consistent monospace styling.
 *
 * @remarks
 * Renders a `<kbd>` element sized to at least 20px square. Adapts its background when placed
 * inside a tooltip via `in-data-[slot=tooltip-content]` selectors. SVG children are resized
 * to 12px automatically.
 *
 * @example
 * ```tsx
 * <Kbd>Ctrl</Kbd>
 * <Kbd><CommandIcon /></Kbd>
 * ```
 *
 * @public
 */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  )
}

/**
 * An inline flex container that renders a sequence of Kbd keys with consistent spacing.
 *
 * @remarks
 * Renders as a `<kbd>` element wrapping multiple `Kbd` children, representing a key combination.
 *
 * @public
 */
function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
