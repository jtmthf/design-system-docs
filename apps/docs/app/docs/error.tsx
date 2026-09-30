"use client";

import { ErrorState } from "@/components/error-state";

/**
 * Docs-scoped error boundary. Because this lives at `app/docs/error.tsx`, it
 * renders *inside* `app/docs/layout.tsx` — a failing page swaps to this fallback
 * while the fumadocs sidebar, nav, search, and Ask AI stay interactive. Users
 * can navigate away or `retry()` to re-render just the page segment.
 */
export default function DocsError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16">
      <ErrorState
        title="This page couldn't be rendered"
        description={
          error.message ||
          "An unexpected error stopped this page from loading. Nothing else in the docs is affected."
        }
        digest={error.digest}
        onRetry={retry}
      />
    </div>
  );
}
