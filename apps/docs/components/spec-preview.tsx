"use client";

import type { Spec } from "@json-render/core";
import {
  ActionProvider,
  Renderer,
  StateProvider,
  VisibilityProvider,
} from "@json-render/react";

import { registry } from "@/lib/playground/registry";

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
    <StateProvider initialState={spec?.state}>
      <VisibilityProvider>
        <ActionProvider handlers={{}}>
          <Renderer spec={spec} registry={registry} loading={loading} />
        </ActionProvider>
      </VisibilityProvider>
    </StateProvider>
  );
}
