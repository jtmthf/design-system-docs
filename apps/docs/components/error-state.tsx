"use client";

import { AlertTriangleIcon, RotateCcwIcon } from "lucide-react";

import { cn } from "@/lib/cn";

interface ErrorStateProps {
  title: string;
  description?: string;
  /** Error digest from a server-side failure, used to match server logs. */
  digest?: string;
  /** Recovery handler. When omitted, the "Try again" button is hidden. */
  onRetry?: () => void;
  className?: string;
}

/**
 * Shared visual for every error surface in the docs. Presentational only — the
 * route-level `error.tsx` files and the component-level `catchError` boundaries
 * each own their recovery callback (`retry`), so this stays reused verbatim.
 */
export function ErrorState({
  title,
  description,
  digest,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex w-full flex-col items-start gap-3 rounded-xl border border-dashed bg-fd-card p-6 text-fd-card-foreground",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <AlertTriangleIcon className="size-5 shrink-0 text-fd-muted-foreground" />
        <h2 className="text-base font-semibold">{title}</h2>
      </div>
      {description && (
        <p className="text-sm text-fd-muted-foreground">{description}</p>
      )}
      {digest && (
        <p className="font-mono text-xs text-fd-muted-foreground">
          Reference: {digest}
        </p>
      )}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 rounded-md border bg-fd-secondary px-3 py-1.5 text-sm font-medium text-fd-secondary-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
        >
          <RotateCcwIcon className="size-3.5" />
          Try again
        </button>
      )}
    </div>
  );
}
