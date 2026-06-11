"use client"

import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { cn } from "#lib/utils"

/**
 * A progress indicator that displays a filled bar representing task completion.
 *
 * @remarks
 * Built on Base UI's Progress primitive. Automatically renders a `ProgressTrack` containing
 * a `ProgressIndicator` as siblings to any children. Use `ProgressLabel` and `ProgressValue`
 * alongside for accessible labeling. The `value` prop controls the filled proportion (0-100).
 *
 * @example
 * ```tsx
 * <Progress value={60}>
 *   <ProgressLabel>Uploading</ProgressLabel>
 *   <ProgressValue />
 * </Progress>
 * ```
 *
 * @public
 */
function Progress({
  className,
  children,
  value,
  ...props
}: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  )
}

/**
 * The background track bar of a Progress component that contains the ProgressIndicator.
 *
 * @public
 */
function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

/**
 * The filled portion of a ProgressTrack that grows with the progress value.
 *
 * @public
 */
function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("h-full bg-primary transition-all", className)}
      {...props}
    />
  )
}

/**
 * An accessible text label associated with a Progress component via Base UI's Label primitive.
 *
 * @public
 */
function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

/**
 * A numeric readout of the current progress value, aligned to the trailing edge of the component.
 *
 * @public
 */
function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-sm text-muted-foreground tabular-nums",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
