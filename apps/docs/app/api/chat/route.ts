import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

import { source } from "@/lib/source";

export const maxDuration = 30;

const provider = createOpenAICompatible({
  name: "zen",
  baseURL: process.env.AI_BASE_URL ?? "https://opencode.ai/zen/v1",
  apiKey: process.env.AI_API_KEY ?? process.env.OPENCODE_API_KEY ?? "",
});

const MODEL = process.env.AI_MODEL ?? "deepseek-v4-flash";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const pages = source.getPages();
  const index = pages
    .map((p) => `- ${p.data.title} (${p.url}): ${p.data.description ?? ""}`)
    .join("\n");

  const system = `You are the assistant for the Design System documentation.
Answer questions about the components, theming, and usage using the documentation
below. Be concise, prefer code examples, and link to the relevant page path
(e.g. /docs/components/button). If something is not covered, say so plainly.

Available pages:
${index}`;

  const result = streamText({
    model: provider(MODEL),
    system,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
