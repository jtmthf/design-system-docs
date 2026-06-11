"use client"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

/**
 * Collapsible root component that toggles the visibility of its content panel.
 *
 * @remarks
 * Composed of `CollapsibleTrigger` (to open/close) and `CollapsibleContent` (the
 * panel whose visibility is controlled). Delegates all state management to the
 * Base UI `Collapsible.Root` primitive and forwards a `data-slot="collapsible"`
 * attribute for CSS targeting.
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>Hidden content revealed on open.</CollapsibleContent>
 * </Collapsible>
 * ```
 *
 * @public
 */
function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

/**
 * Button-like trigger that opens or closes the parent `Collapsible`.
 *
 * @remarks
 * Must be placed inside a `Collapsible` root. Clicking it toggles the
 * `CollapsibleContent` panel. Renders via the Base UI `Collapsible.Trigger`
 * primitive.
 *
 * @public
 */
function CollapsibleTrigger({ ...props }: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  )
}

/**
 * Animated panel that is shown or hidden by the parent `Collapsible`.
 *
 * @remarks
 * Must be placed inside a `Collapsible` root. Renders via the Base UI
 * `Collapsible.Panel` primitive which manages the open/closed transition.
 *
 * @public
 */
function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
