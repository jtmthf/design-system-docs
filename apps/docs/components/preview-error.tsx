"use client";

import { catchError, type ErrorInfo } from "next/error";

import { cn } from "@/lib/cn";
import { ErrorState } from "./error-state";

interface PreviewErrorProps {
  /** Human label for what failed, e.g. "Live preview" or an example name. */
  label?: string;
  /** Compact padding/border for small surfaces like the Ask AI panel. */
  compact?: boolean;
  className?: string;
}

/**
 * A single malformed generated spec (or a crashing example) must never blank a
 * whole docs page or the Ask AI panel. `PreviewErrorBoundary` scopes the failure
 * to the live-preview surface and offers an in-place `retry()` that re-renders
 * just that subtree — no page reload, no navigation.
 */
function PreviewErrorFallback(
  { label, compact, className }: PreviewErrorProps,
  { error, retry }: ErrorInfo
) {
  const message = error instanceof Error ? error.message : String(error);

  return (
    <ErrorState
      title={label ? `${label} failed to render` : "Preview failed to render"}
      description={message}
      onRetry={retry}
      className={cn(
        compact && "gap-2 rounded-lg border-solid p-4",
        className
      )}
    />
  );
}

export const PreviewErrorBoundary = catchError(PreviewErrorFallback);
