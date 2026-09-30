"use client";

import { ErrorState } from "@/components/error-state";

/**
 * Root error boundary. Catches failures on routes outside the docs layout
 * (`/`, `/playground`, `/components`) while the root layout — fonts, theme,
 * `RootProvider` — stays mounted. The docs routes have their own boundary at
 * `app/docs/error.tsx` so the fumadocs sidebar survives there.
 */
export default function AppError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        <ErrorState
          title="Something went wrong"
          description={
            error.message ||
            "This page could not be rendered. Try again, or head back to the documentation home."
          }
          digest={error.digest}
          onRetry={retry}
        />
      </div>
    </div>
  );
}
