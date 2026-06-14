/**
 * Base URL the published registry is hosted at.
 *
 * Pass an explicit `origin` (e.g. `window.location.origin` from a client
 * component) to point at whatever deploy is actually serving the page — this is
 * what keeps "Open in v0" and install commands correct across production and
 * preview deploys. With no `origin`, falls back to a build-time override or
 * localhost; client components should resolve `window.location.origin` after
 * mount so server and first client render stay in sync.
 */
export function registryBaseUrl(origin?: string): string {
  if (origin) return origin.replace(/\/$/, "");
  return (process.env.NEXT_PUBLIC_REGISTRY_URL ?? "http://localhost:3001").replace(
    /\/$/,
    ""
  );
}

/** Absolute URL of a published registry item, e.g. `<base>/r/button.json`. */
export function registryItemUrl(name: string, origin?: string): string {
  return `${registryBaseUrl(origin)}/r/${name}.json`;
}

/** The `shadcn add` command a consumer runs to install an item by URL. */
export function installCommand(name: string, origin?: string): string {
  return `npx shadcn@latest add ${registryItemUrl(name, origin)}`;
}

/** v0.dev "Open in v0" deep link for a registry item. */
export function openInV0Url(name: string, origin?: string): string {
  return `https://v0.dev/chat/api/open?url=${encodeURIComponent(registryItemUrl(name, origin))}`;
}
