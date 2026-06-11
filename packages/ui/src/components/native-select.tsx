import * as React from "react"

import { cn } from "#lib/utils"
import { ChevronDownIcon } from "lucide-react"

/**
 * Props for the NativeSelect component, extending the native `<select>` element.
 *
 * @remarks
 * The native `size` attribute is omitted and replaced with `"sm" | "default"` to control
 * visual height and border-radius without conflicting with HTML's multi-row size attribute.
 *
 * @public
 */
type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default"
}

/**
 * A styled wrapper around the browser-native `<select>` element with a custom chevron icon.
 *
 * @remarks
 * Accepts `size` (`"default"` or `"sm"`) to adjust height and border radius. The native
 * `size` attribute is excluded to prevent multi-row rendering. Compose with
 * `NativeSelectOption` and `NativeSelectOptGroup` for options and groups.
 *
 * @example
 * ```tsx
 * <NativeSelect size="sm">
 *   <NativeSelectOption value="a">Option A</NativeSelectOption>
 *   <NativeSelectOption value="b">Option B</NativeSelectOption>
 * </NativeSelect>
 * ```
 *
 * @public
 */
function NativeSelect({
  className,
  size = "default",
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        className
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className="h-8 w-full min-w-0 appearance-none rounded-lg border border-input bg-transparent py-1 pr-8 pl-2.5 text-sm transition-colors outline-none select-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-[size=sm]:py-0.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
        {...props}
      />
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground select-none" aria-hidden="true" data-slot="native-select-icon" />
    </div>
  )
}

/**
 * A styled `<option>` element intended for use inside a NativeSelect.
 *
 * @remarks
 * Applies system canvas colors (`bg-[Canvas]`, `text-[CanvasText]`) for cross-browser
 * consistency in dark and light themes.
 *
 * @public
 */
function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

/**
 * A styled `<optgroup>` element for grouping related options inside a NativeSelect.
 *
 * @remarks
 * Applies system canvas colors for cross-browser dark/light mode consistency.
 *
 * @public
 */
function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
