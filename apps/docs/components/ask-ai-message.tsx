"use client";

import { useJsonRenderMessage } from "@json-render/react";
import { Streamdown } from "streamdown";

import { AskAIPreview } from "./ask-ai-preview";

type MessagePart = { type: string; text?: string; data?: unknown };

/**
 * Renders an assistant message using json-render's inline pipeline: prose text
 * parts render as markdown, and the spec reassembled from the streamed JSONL
 * patch parts (`pipeJsonRender` on the server) renders as a live preview.
 */
export function AskAIMessage({ parts }: { parts: MessagePart[] }) {
  const { spec, text, hasSpec } = useJsonRenderMessage(parts);

  return (
    <div className="space-y-3">
      {text && (
        <Streamdown className="ask-ai-prose text-sm leading-relaxed">
          {text}
        </Streamdown>
      )}
      {hasSpec && spec && <AskAIPreview spec={spec} />}
    </div>
  );
}
