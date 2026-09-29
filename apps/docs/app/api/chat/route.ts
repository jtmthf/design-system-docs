import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { pipeJsonRender } from "@json-render/core";

import { catalog } from "@/lib/playground/catalog";
import { source } from "@/lib/source";

export const maxDuration = 30;

const provider = createOpenAICompatible({
  name: "zen",
  baseURL: process.env.AI_BASE_URL ?? "https://opencode.ai/zen/v1",
  apiKey: process.env.AI_API_KEY ?? process.env.OPENCODE_API_KEY ?? "",
});

const MODEL = process.env.AI_MODEL ?? "deepseek-v4-flash";

export async function POST(req: Request) {
  const { messages, page }: { messages: UIMessage[]; page?: string } =
    await req.json();

  const pages = source.getPages();
  const index = pages
    .map((p) => `- ${p.data.title} (${p.url}): ${p.data.description ?? ""}`)
    .join("\n");

  // Ground answers in the page the user is currently reading.
  let current = "";
  if (typeof page === "string" && page) {
    const match = pages.find((p) => p.url === page);
    current = match
      ? `The user is currently on "${match.data.title}" (${match.url}). ${match.data.description ?? ""} Prefer this page's component(s) when relevant and resolve "this component"/"it" to it.`
      : `The user is currently on ${page}.`;
  }

  // Inline mode: the catalog prompt instructs the model to answer
  // conversationally and interleave JSONL patch lines (no code fences) when a
  // live example helps. `pipeJsonRender` below turns those patch lines into
  // spec data parts; prose stays as text parts.
  const system = catalog.prompt({
    mode: "inline",
    system: `You are the assistant for the Design System documentation.
Answer questions about the components, theming, and usage using the documentation
below. Be concise, prefer code examples, and link to the relevant page path
(e.g. /docs/components/button). If something is not covered, say so plainly.

${current}

Available pages:
${index}`,
    customRules: [
      "Only include a live example when a visual would genuinely help; keep it small and self-contained.",
      "Every Button MUST have a non-empty `label` prop with its visible text (e.g. \"Sign in\"). Do not use size \"icon\" unless the button shows only an icon.",
    ],
  });

  const result = streamText({
    model: provider(MODEL),
    instructions: system,
    messages: await convertToModelMessages(messages),
  });

  const stream = createUIMessageStream({
    execute: ({ writer }) => {
      writer.merge(
        pipeJsonRender(toUIMessageStream({ stream: result.stream }))
      );
    },
  });

  return createUIMessageStreamResponse({ stream });
}
