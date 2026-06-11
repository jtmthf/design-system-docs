"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import { cn } from "#lib/utils"
import { Button } from "#components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "#components/input-group"
import { ChevronDownIcon, XIcon, CheckIcon } from "lucide-react"

/**
 * Combobox root component providing selection state and filtering context for its children.
 *
 * @remarks
 * This is a direct alias for the Base UI `Combobox.Root` primitive. Compose it with
 * `ComboboxInput` (or `ComboboxChips`), `ComboboxContent`, `ComboboxList`, and
 * `ComboboxItem` to build a full combobox widget. Use `useComboboxAnchor` when you
 * need an explicit positioning anchor (e.g. for chip-based multi-select).
 *
 * @example
 * ```tsx
 * <Combobox>
 *   <ComboboxInput />
 *   <ComboboxContent>
 *     <ComboboxList>
 *       <ComboboxItem value="apple">Apple</ComboboxItem>
 *       <ComboboxItem value="banana">Banana</ComboboxItem>
 *     </ComboboxList>
 *   </ComboboxContent>
 * </Combobox>
 * ```
 *
 * @public
 */
const Combobox = ComboboxPrimitive.Root

/**
 * Renders the current value of the combobox as text inside the trigger area.
 *
 * @remarks
 * Must be used inside a `Combobox` root. Delegates to `ComboboxPrimitive.Value`.
 *
 * @public
 */
function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

/**
 * Clickable trigger that opens or closes the combobox popup.
 *
 * @remarks
 * Appends a `ChevronDownIcon` as a visual indicator and constrains icon sizes to
 * `1rem`. Must be used inside a `Combobox` root.
 *
 * @public
 */
function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
    </ComboboxPrimitive.Trigger>
  )
}

/**
 * Ghost icon-button that clears the current combobox selection.
 *
 * @remarks
 * Renders via `InputGroupButton` with ghost and icon-xs styles. Must be used inside
 * a `Combobox` root, typically inside `ComboboxInput`.
 *
 * @public
 */
function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  )
}

/**
 * Composite input field for the combobox, combining a text input with optional
 * trigger and clear buttons inside an `InputGroup`.
 *
 * @remarks
 * Accepts `showTrigger` (default `true`) to display the `ComboboxTrigger` chevron
 * button, and `showClear` (default `false`) to display the `ComboboxClear` button.
 * The trigger button is automatically hidden when a clear button is rendered via
 * CSS grouping. The `disabled` prop disables both the input and the inline buttons.
 *
 * @public
 */
function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

/**
 * Floating popup panel that contains the combobox list and optional search input.
 *
 * @remarks
 * Renders inside a portal and uses a `Positioner` for anchor-aware placement.
 * Accepts `side`, `sideOffset`, `align`, `alignOffset`, and `anchor` props from
 * `ComboboxPrimitive.Positioner` for fine-grained positioning control. Applies
 * entry/exit animations driven by `data-open` and `data-closed` attributes.
 *
 * @public
 */
function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn("group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

/**
 * Scrollable list container that holds `ComboboxItem` elements inside a `ComboboxContent`.
 *
 * @remarks
 * Limits height to `18rem` (or available viewport height minus spacing) and hides
 * the scrollbar. Adds `p-0` padding automatically when the list is empty.
 *
 * @public
 */
function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Selectable option row rendered inside a `ComboboxList`.
 *
 * @remarks
 * Displays a `CheckIcon` indicator on the right when the item is selected.
 * Supports `data-highlighted` and `data-disabled` states via CSS.
 *
 * @public
 */
function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

/**
 * Groups related `ComboboxItem` elements under an optional `ComboboxLabel`.
 *
 * @remarks
 * Delegates to `ComboboxPrimitive.Group`. Use alongside `ComboboxLabel` to provide
 * an accessible heading for the group.
 *
 * @public
 */
function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  )
}

/**
 * Accessible label for a `ComboboxGroup`.
 *
 * @remarks
 * Renders muted extra-small text above the group items. Must be placed as the first
 * child of a `ComboboxGroup`.
 *
 * @public
 */
function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

/**
 * Wraps a virtualized or static collection of combobox options.
 *
 * @remarks
 * Delegates to `ComboboxPrimitive.Collection`. Useful when rendering large option
 * sets via a virtual list.
 *
 * @public
 */
function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

/**
 * Placeholder shown inside `ComboboxContent` when no items match the current query.
 *
 * @remarks
 * Hidden by default; becomes visible (flex) when the parent popup carries the
 * `data-empty` attribute set by `group/combobox-content`.
 *
 * @public
 */
function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
        className
      )}
      {...props}
    />
  )
}

/**
 * Visual divider between groups of items inside a `ComboboxContent`.
 *
 * @remarks
 * Renders a 1 px horizontal rule with standard margin. Delegates to
 * `ComboboxPrimitive.Separator`.
 *
 * @public
 */
function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

/**
 * Multi-select chip container that acts as the input trigger for a chip-based combobox.
 *
 * @remarks
 * Renders selected values as removable `ComboboxChip` elements alongside a
 * `ComboboxChipsInput` text field. Pair with `useComboboxAnchor` and pass the
 * resulting ref as the `anchor` prop of `ComboboxContent` so the popup aligns to
 * this container rather than the hidden input.
 *
 * @public
 */
function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        "flex min-h-8 flex-wrap items-center gap-1 rounded-lg border border-input bg-transparent bg-clip-padding px-2.5 py-1 text-sm transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

/**
 * Individual chip badge representing a selected value in a multi-select combobox.
 *
 * @remarks
 * Optionally renders a remove button (controlled via `showRemove`, default `true`)
 * that deselects the item when clicked. Must be used inside `ComboboxChips`.
 *
 * @public
 */
function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 rounded-sm bg-muted px-1.5 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
        className
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className="-ml-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

/**
 * Inline text input rendered inside `ComboboxChips` for filtering options.
 *
 * @remarks
 * Occupies remaining flex space (`flex-1`, `min-w-16`) and has no visible border,
 * blending into the chip container. Delegates to `ComboboxPrimitive.Input`.
 *
 * @public
 */
function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn("min-w-16 flex-1 outline-none", className)}
      {...props}
    />
  )
}

/**
 * Returns a stable ref to use as the positioning anchor for `ComboboxContent`
 * in chip-based multi-select layouts.
 *
 * @remarks
 * Pass the returned ref to the wrapping `div` around `ComboboxChips`, then supply
 * the same ref as the `anchor` prop of `ComboboxContent`. This ensures the popup
 * aligns to the chips container rather than the hidden underlying input element.
 *
 * @returns A `React.RefObject<HTMLDivElement | null>` suitable for use as a
 * Base UI positioner anchor.
 *
 * @example
 * ```tsx
 * function MyMultiCombobox() {
 *   const anchor = useComboboxAnchor()
 *   return (
 *     <Combobox>
 *       <div ref={anchor}>
 *         <ComboboxChips>
 *           <ComboboxChipsInput />
 *         </ComboboxChips>
 *       </div>
 *       <ComboboxContent anchor={anchor}>
 *         <ComboboxList>
 *           <ComboboxItem value="a">Option A</ComboboxItem>
 *         </ComboboxList>
 *       </ComboboxContent>
 *     </Combobox>
 *   )
 * }
 * ```
 *
 * @public
 */
function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
