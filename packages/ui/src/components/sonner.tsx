"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

/**
 * Global toast notification container powered by the Sonner library.
 *
 * @remarks
 * Mount once at the root of the application (e.g. in the root layout).
 * Automatically inherits the active color scheme from `next-themes` and
 * applies design-system CSS custom properties for colors and border-radius.
 * Custom icons are provided for `success`, `info`, `warning`, `error`, and
 * `loading` variants. Use the `toast()` function from `"sonner"` to trigger
 * notifications from anywhere in the component tree.
 *
 * @example
 * ```tsx
 * // In your root layout:
 * <Toaster />
 *
 * // Anywhere in the app:
 * import { toast } from "sonner"
 * toast.success("Saved!")
 * ```
 *
 * @public
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
