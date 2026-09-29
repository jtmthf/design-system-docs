"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * The live page origin (e.g. `https://design-system-docs-docs.vercel.app`), or
 * `undefined` during SSR and hydration. Registry/markdown URL helpers fall back
 * to their build-time base when given `undefined`, then re-render with the real
 * origin on the client — so links point at the deploy actually serving the page.
 */
export function useOrigin(): string | undefined {
  return useSyncExternalStore(
    subscribe,
    () => window.location.origin,
    () => undefined
  );
}
