import { cn } from "#lib/utils"
import { Loader2Icon } from "lucide-react"

/**
 * Animated loading indicator rendered as a spinning icon.
 *
 * @remarks
 * Renders a `Loader2Icon` from lucide-react with `role="status"` and an
 * `aria-label` of `"Loading"` for screen-reader accessibility. Size defaults
 * to `size-4`; override via `className`.
 *
 * @example
 * ```tsx
 * <Spinner className="size-6 text-primary" />
 * ```
 *
 * @public
 */
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }
