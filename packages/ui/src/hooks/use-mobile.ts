import * as React from "react"

const MOBILE_BREAKPOINT = 768
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}

/**
 * Returns whether the viewport is currently below the mobile breakpoint.
 *
 * @returns `true` when `window.innerWidth` is less than 768 px, otherwise `false`.
 *
 * @remarks
 * Uses `window.matchMedia` with a `(max-width: 767px)` media query and listens
 * for `change` events so the value updates reactively on resize. The breakpoint
 * constant is 768 px (matching Tailwind's `md` breakpoint). Returns `false`
 * during server-side rendering and hydration.
 *
 * @example
 * ```tsx
 * function Layout() {
 *   const isMobile = useIsMobile()
 *   return isMobile ? <MobileNav /> : <DesktopNav />
 * }
 * ```
 *
 * @public
 */
export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.innerWidth < MOBILE_BREAKPOINT,
    () => false
  )
}
