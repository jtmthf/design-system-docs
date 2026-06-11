import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "#lib/utils"

/**
 * Builds the Tailwind class string for an `Alert` based on its visual variant.
 *
 * @remarks
 * Available variants:
 * - `variant`: `"default"` | `"destructive"`
 *
 * Defaults to `variant="default"`.
 *
 * @public
 */
const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * A non-modal callout that communicates a status message or feedback to the user.
 *
 * @remarks
 * Composed with `AlertTitle`, `AlertDescription`, and optionally `AlertAction`.
 * Place an SVG icon as a direct child to activate the two-column icon layout.
 * Use the `variant` prop to switch between `"default"` and `"destructive"` styles.
 *
 * @example
 * ```tsx
 * <Alert variant="destructive">
 *   <AlertCircleIcon />
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
 * </Alert>
 * ```
 *
 * @public
 */
function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

/**
 * The heading line of an `Alert`, rendered in medium weight.
 *
 * @remarks
 * Automatically shifts to the second column when an icon is present in the `Alert`.
 *
 * @public
 */
function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * The body text of an `Alert` providing additional context below the title.
 *
 * @remarks
 * Rendered in muted foreground color and supports balanced/pretty text wrapping.
 *
 * @public
 */
function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * An optional slot for placing a call-to-action button inside an `Alert`.
 *
 * @remarks
 * Rendered absolutely positioned in the top-right corner of the `Alert`.
 * The parent `Alert` reserves right padding for this element automatically.
 *
 * @public
 */
function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
