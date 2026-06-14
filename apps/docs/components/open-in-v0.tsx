"use client";

import { useEffect, useState } from "react";

import { Button } from "@workspace/ui/components/button";

import { openInV0Url } from "@/lib/registry-url";

/**
 * "Open in v0" button for a registry item. Opens v0.dev with the item's JSON
 * URL prefilled, so the component loads directly into a v0 chat.
 *
 * The URL is resolved from the live page origin after mount so it points at the
 * deploy actually serving the registry — avoiding stale/incorrect base domains.
 */
export function OpenInV0({
  name,
  size = "sm",
}: {
  /** Registry item name, e.g. `button`. */
  name: string;
  size?: "sm" | "default";
}) {
  const [href, setHref] = useState(() => openInV0Url(name));

  useEffect(() => {
    setHref(openInV0Url(name, window.location.origin));
  }, [name]);

  return (
    <Button
      variant="outline"
      size={size}
      nativeButton={false}
      render={
        <a href={href} target="_blank" rel="noreferrer noopener" />
      }
    >
      Open in
      <svg
        viewBox="0 0 40 20"
        aria-hidden
        className="h-4 w-auto fill-current"
      >
        <path d="M23.3 0c-4.6 0-7.9 3-7.9 7.5v.2h3.6v-.2c0-2.6 1.7-4.2 4.3-4.2s4.3 1.6 4.3 4.2v5c0 2.6-1.7 4.2-4.3 4.2-2.1 0-3.6-1-4.1-2.8h-3.7c.6 3.7 3.6 6.1 7.8 6.1 4.6 0 7.9-3 7.9-7.5v-5C31.2 3 27.9 0 23.3 0ZM0 .4l7.4 18.9h4L18.8.4h-3.9l-5.4 14.5L4.1.4H0Z" />
      </svg>
      <span className="sr-only">v0</span>
    </Button>
  );
}
