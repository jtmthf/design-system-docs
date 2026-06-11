import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Returns whether the viewport is currently below the mobile breakpoint.
 *
 * @returns `true` when `window.innerWidth` is less than 768 px, otherwise `false`.
 *
 * @remarks
 * Uses `window.matchMedia` with a `(max-width: 767px)` media query and listens
 * for `change` events so the value updates reactively on resize. The breakpoint
 * constant is 768 px (matching Tailwind's `md` breakpoint). Returns `false`
 * during server-side rendering (initial state is `undefined`, coerced to
 * `false` via `!!`).
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
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
