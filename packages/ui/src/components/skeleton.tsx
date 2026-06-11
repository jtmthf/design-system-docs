import { cn } from "#lib/utils"

/**
 * Animated placeholder block used while content is loading.
 *
 * @remarks
 * Renders a rounded div with a pulse animation and muted background. Drop it
 * in place of text, images, or any block element during data-fetching states.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-4 w-48" />
 * ```
 *
 * @public
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
