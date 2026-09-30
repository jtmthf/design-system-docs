"use client";

import { useJsonRenderMessage } from "@json-render/react";
import { Streamdown } from "streamdown";

import { AskAIPreview } from "./ask-ai-preview";

type MessagePart = { type: string; text?: string; data?: unknown };

type Usage = {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
};

/** Reads the `data-usage` part the server forwards from `result.totalUsage`. */
function usageFrom(parts: MessagePart[]): Usage | undefined {
  const part = parts.find((p) => p.type === "data-usage");
  if (!part || typeof part.data !== "object" || part.data === null) {
    return undefined;
  }
  return part.data as Usage;
}

function UsageNote({ usage }: { usage: Usage }) {
  const tokens: string[] = [];
  if (typeof usage.totalTokens === "number") {
    tokens.push(`${usage.totalTokens.toLocaleString()} tokens`);
  }
  if (typeof usage.inputTokens === "number") {
    tokens.push(`${usage.inputTokens.toLocaleString()} in`);
  }
  if (typeof usage.outputTokens === "number") {
    tokens.push(`${usage.outputTokens.toLocaleString()} out`);
  }
  if (tokens.length === 0) return null;

  return (
    <p className="text-xs text-fd-muted-foreground">{tokens.join(" · ")}</p>
  );
}

/**
 * Renders an assistant message using json-render's inline pipeline: prose text
 * parts render as markdown, and the spec reassembled from the streamed JSONL
 * patch parts (`pipeJsonRender` on the server) renders as a live preview.
 */
export function AskAIMessage({ parts }: { parts: MessagePart[] }) {
  const { spec, text, hasSpec } = useJsonRenderMessage(parts);
  const usage = usageFrom(parts);

  return (
    <div className="space-y-3">
      {text && (
        <Streamdown className="ask-ai-prose text-sm leading-relaxed">
          {text}
        </Streamdown>
      )}
      {hasSpec && spec && <AskAIPreview spec={spec} />}
      {usage && <UsageNote usage={usage} />}
    </div>
  );
}
