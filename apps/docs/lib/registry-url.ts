/** Base URL the published registry is hosted at (env-driven, set at deploy). */
export function registryBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_REGISTRY_URL ?? "http://localhost:3001").replace(
    /\/$/,
    ""
  );
}

/** Absolute URL of a published registry item, e.g. `<base>/r/button.json`. */
export function registryItemUrl(name: string): string {
  return `${registryBaseUrl()}/r/${name}.json`;
}

/** The `shadcn add` command a consumer runs to install an item by URL. */
export function installCommand(name: string): string {
  return `npx shadcn@latest add ${registryItemUrl(name)}`;
}

/** v0.dev "Open in v0" deep link for a registry item. */
export function openInV0Url(name: string): string {
  return `https://v0.dev/chat/api/open?url=${encodeURIComponent(registryItemUrl(name))}`;
}
