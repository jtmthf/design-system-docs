"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/cn";

/** A monospace install command with a click-to-copy button. */
export function CopyCommand({
  command,
  className,
}: {
  command: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border bg-fd-secondary/50 py-1.5 pl-3 pr-1.5",
        className
      )}
    >
      <code className="flex-1 overflow-x-auto whitespace-nowrap text-xs text-fd-muted-foreground">
        {command}
      </code>
      <button
        type="button"
        aria-label="Copy install command"
        onClick={() => {
          void navigator.clipboard.writeText(command);
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
