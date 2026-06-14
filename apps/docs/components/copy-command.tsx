"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { installCommand } from "@/lib/registry-url";

/**
 * A monospace install command with a click-to-copy button.
 *
 * Pass `command` for a literal string, or `name` to build a registry install
 * command that resolves to the live page origin after mount (so the copied
 * `shadcn add` URL points at the deploy actually serving the registry).
 */
export function CopyCommand({
  command,
  name,
  className,
}: {
  command?: string;
  name?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [resolved, setResolved] = useState(
    () => command ?? (name ? installCommand(name) : "")
  );

  useEffect(() => {
    if (name) setResolved(installCommand(name, window.location.origin));
  }, [name]);

  const text = command ?? resolved;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border bg-fd-secondary/50 py-1.5 pl-3 pr-1.5",
        className
      )}
    >
      <code className="flex-1 overflow-x-auto whitespace-nowrap text-xs text-fd-muted-foreground">
        {text}
      </code>
      <button
        type="button"
        aria-label="Copy install command"
        onClick={() => {
          void navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="shrink-0 rounded-md p-1.5 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
      >
        {copied ? (
          <CheckIcon className="size-3.5" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
      </button>
    </div>
  );
}
