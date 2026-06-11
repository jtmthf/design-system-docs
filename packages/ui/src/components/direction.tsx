"use client"

/**
 * Provides a reading-direction context (`"ltr"` | `"rtl"`) to all Base UI
 * primitives rendered beneath it in the tree.
 *
 * @remarks
 * Re-exported from `@base-ui/react/direction-provider`. Wrap your application
 * root (or a subtree) with this provider when supporting right-to-left layouts.
 * Retrieve the current direction value in child components with `useDirection`.
 *
 * @example
 * ```tsx
 * <DirectionProvider direction="rtl">
 *   <App />
 * </DirectionProvider>
 * ```
 *
 * @public
 */
export { DirectionProvider } from "@base-ui/react/direction-provider"

/**
 * Returns the current reading direction (`"ltr"` | `"rtl"`) from the nearest
 * `DirectionProvider` ancestor.
 *
 * @remarks
 * Re-exported from `@base-ui/react/direction-provider`. Must be called inside a
 * component that is a descendant of `DirectionProvider`.
 *
 * @returns The active direction string, defaulting to `"ltr"` when no provider
 * is present.
 *
 * @public
 */
export { useDirection } from "@base-ui/react/direction-provider"
