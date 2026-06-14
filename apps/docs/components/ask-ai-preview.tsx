"use client";

import { useState } from "react";

import type { Spec } from "@json-render/core";
import {
  ActionProvider,
  Renderer,
  StateProvider,
  VisibilityProvider,
} from "@json-render/react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { generateJSX } from "@/lib/playground/codegen";
import { registry } from "@/lib/playground/registry";

/**
 * Renders a json-render spec live inside an Ask AI answer, with a button to copy
 * the equivalent `@workspace/ui` React code. The spec is produced from a
 * `jsonrender` fenced block the assistant emits (see `ask-ai-message.tsx`).
 */
export function AskAIPreview({ spec }: { spec: Spec }) {
  const [copied, setCopied] = useState(false);

  let code = "";
  try {
    code = generateJSX(spec);
  } catch {
    code = "";
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between border-b bg-fd-muted/40 px-3 py-1.5">
        <span className="text-xs font-medium text-fd-muted-foreground">
          Live preview
        </span>
        {code && (
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            {copied ? (
              <CheckIcon className="size-3.5" />
            ) : (
              <CopyIcon className="size-3.5" />
            )}
            Copy code
          </button>
        )}
      </div>
      <div className="preview-surface not-prose flex flex-wrap items-start gap-3 p-4">
        <StateProvider>
          <VisibilityProvider>
            <ActionProvider handlers={{}}>
              <Renderer spec={spec} registry={registry} />
            </ActionProvider>
          </VisibilityProvider>
        </StateProvider>
      </div>
    </div>
  );
}
