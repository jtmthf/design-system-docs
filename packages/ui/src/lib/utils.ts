import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges class names, resolving Tailwind conflicts via tailwind-merge.
 *
 * @param inputs - Any number of clsx-compatible class values: strings, arrays,
 * objects, falsy values, or nested combinations thereof.
 * @returns A single deduplicated and conflict-resolved className string.
 *
 * @example
 * ```tsx
 * cn("px-2 py-1", isActive && "bg-primary", className)
 * ```
 *
 * @public
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
