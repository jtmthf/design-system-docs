"use client"

import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "#lib/utils"
import { Label } from "#components/label"
import { Separator } from "#components/separator"

/**
 * Semantic `<fieldset>` wrapper that groups multiple `Field` elements.
 *
 * @remarks
 * Adjusts vertical gap automatically when the fieldset contains a
 * `checkbox-group` or `radio-group` slot. Use `FieldLegend` as its first child
 * to provide an accessible caption.
 *
 * @public
 */
function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

/**
 * Accessible caption for a `FieldSet`.
 *
 * @remarks
 * Accepts a `variant` of `"legend"` (base text size, default) or `"label"`
 * (small text size) to match the visual weight of surrounding labels.
 *
 * @public
 */
function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className
      )}
      {...props}
    />
  )
}

/**
 * Container that arranges a group of `Field` rows with consistent spacing and
 * responsive layout via container queries.
 *
 * @remarks
 * Establishes a `@container/field-group` query context so that child `Field`
 * components can switch between vertical and horizontal orientations at the
 * `@md` breakpoint when `orientation="responsive"`.
 *
 * @public
 */
function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Builds the Tailwind class string for `Field` orientation variants.
 *
 * @remarks
 * Available variants:
 * - `orientation`: `"vertical"` (stacked, default) | `"horizontal"` (label and
 *   control side-by-side) | `"responsive"` (vertical below `@md/field-group`,
 *   horizontal at or above it).
 *
 * Default variant: `orientation: "vertical"`.
 *
 * @public
 */
const fieldVariants = cva(
  "group/field flex w-full gap-2 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
        horizontal:
          "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        responsive:
          "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

/**
 * Individual form field that pairs a label with its control and optional
 * description or error message.
 *
 * @remarks
 * Renders a `div[role="group"]` and applies `fieldVariants` classes based on the
 * `orientation` prop (`"vertical"` | `"horizontal"` | `"responsive"`). The
 * `data-invalid` attribute is set externally by form libraries to trigger
 * destructive color theming. Compose with `FieldLabel`, `FieldDescription`,
 * `FieldError`, and `FieldContent`.
 *
 * @example
 * ```tsx
 * <Field orientation="horizontal">
 *   <FieldLabel htmlFor="email">Email</FieldLabel>
 *   <Input id="email" type="email" />
 *   <FieldDescription>We will never share your email.</FieldDescription>
 * </Field>
 * ```
 *
 * @public
 */
function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

/**
 * Secondary content area used to align multi-line descriptions or nested fields
 * relative to a `FieldLabel` in horizontal layouts.
 *
 * @remarks
 * Renders a flex column with `flex-1` so it fills available width next to the
 * label. Place `FieldDescription` and `FieldError` inside this when using
 * `orientation="horizontal"` or `"responsive"`.
 *
 * @public
 */
function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
        className
      )}
      {...props}
    />
  )
}

/**
 * Styled `Label` linked to the control inside a `Field`.
 *
 * @remarks
 * Applies muted opacity when the parent `Field` carries `data-disabled="true"`.
 * When the label contains a nested `Field` slot, it renders as a card-style
 * bordered container (used for checkbox and radio card variants).
 *
 * @public
 */
function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className
      )}
      {...props}
    />
  )
}

/**
 * Plain-div title element for use when a `Label` element is not appropriate.
 *
 * @remarks
 * Functionally similar to `FieldLabel` but renders a non-interactive `div` with
 * matching typography. Useful when the label text sits beside a control that
 * already has an accessible label via `aria-labelledby`.
 *
 * @public
 */
function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

/**
 * Descriptive hint text rendered below a form control inside a `Field`.
 *
 * @remarks
 * Adjusts alignment based on the field orientation: left-aligned by default and
 * balanced when inside a horizontal field. Inline anchor links are underlined and
 * adopt primary color on hover. Slightly reduced top margin when rendered last or
 * second-to-last inside a field.
 *
 * @public
 */
function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
        "last:mt-0 nth-last-2:-mt-1",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

/**
 * Visual separator rendered between `Field` rows inside a `FieldGroup`.
 *
 * @remarks
 * When `children` are provided they are centered over the rule with a background
 * cutout, producing an "or" style divider. The separator height is fixed at
 * `1.25rem` and uses negative vertical margin to tighten spacing.
 *
 * @public
 */
function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

/**
 * Validation error message area rendered below a form control inside a `Field`.
 *
 * @remarks
 * When `children` are provided they are rendered as-is. Otherwise the component
 * derives messages from the `errors` prop (an array of objects with an optional
 * `message` string), deduplicates them, and renders a single string or a bulleted
 * list. Returns `null` when there is nothing to display.
 *
 * @public
 */
function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-sm font-normal text-destructive", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
