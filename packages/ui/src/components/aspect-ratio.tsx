import { cn } from "#lib/utils"

/**
 * A container that constrains its content to a specific width-to-height ratio.
 *
 * @remarks
 * Uses a CSS custom property `--ratio` and `aspect-(--ratio)` to maintain
 * the specified ratio without relying on padding-top hacks. The `ratio` prop
 * is required and accepts any positive number (e.g., `16 / 9`, `4 / 3`, `1`).
 *
 * @example
 * ```tsx
 * <AspectRatio ratio={16 / 9}>
 *   <img src="/hero.jpg" alt="Hero" className="object-cover w-full h-full" />
 * </AspectRatio>
 * ```
 *
 * @public
 */
function AspectRatio({
  ratio,
  className,
  ...props
}: React.ComponentProps<"div"> & { ratio: number }) {
  return (
    <div
      data-slot="aspect-ratio"
      style={
        {
          "--ratio": ratio,
        } as React.CSSProperties
      }
      className={cn("relative aspect-(--ratio)", className)}
      {...props}
    />
  )
}

export { AspectRatio }
