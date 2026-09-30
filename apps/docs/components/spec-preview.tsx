"use client";

import type { Spec } from "@json-render/core";
import {
  ActionProvider,
  Renderer,
  StateProvider,
  VisibilityProvider,
} from "@json-render/react";
import { ViewTransition } from "react";

import { registry } from "@/lib/playground/registry";
import { PreviewErrorBoundary } from "@/components/preview-error";

/**
 * Renders a json-render spec with the standard provider stack used across the
 * docs (Ask AI answers and the playground preview).
 *
 * Seeding `StateProvider` with `spec.state` is essential: the assistant streams
 * `/state/*` patches that land on `spec.state`, and `repeat` (statePath) plus
 * `$state`/`$item` bindings read from the store. Without this, data-driven
 * examples render empty. `StateProvider` re-syncs as the `spec.state` reference
 * changes, so this also works mid-stream.
 */
export function SpecPreview({
  spec,
  loading,
}: {
  spec: Spec | null;
  loading?: boolean;
}) {
  return (
    // A malformed generated spec throws during render; contain it here so the
    // playground panel and the Ask AI answer keep their surroundings.
    <PreviewErrorBoundary label="Live preview" className="w-full">
      {/* Same-route content swap: a newly generated spec replaces the previous
          one in place, so crossfade the subtree instead of the whole page. */}
      <ViewTransition update="crossfade" default="none">
        <StateProvider initialState={spec?.state}>
          <VisibilityProvider>
            <ActionProvider handlers={{}}>
              <Renderer spec={spec} registry={registry} loading={loading} />
            </ActionProvider>
          </VisibilityProvider>
        </StateProvider>
      </ViewTransition>
    </PreviewErrorBoundary>
  );
}
