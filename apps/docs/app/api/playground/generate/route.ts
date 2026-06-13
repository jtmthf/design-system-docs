import { streamText } from "ai"
import { createOpenAICompatible } from "@ai-sdk/openai-compatible"
import { createAnthropic } from "@ai-sdk/anthropic"
import { buildUserPrompt, type Spec } from "@json-render/core"
import { catalog } from "@/lib/playground/catalog"

export const maxDuration = 60

const baseURL = process.env.AI_BASE_URL ?? "https://opencode.ai/zen/go/v1"
const apiKey = process.env.AI_API_KEY ?? process.env.OPENCODE_API_KEY ?? ""

const openaiProvider = createOpenAICompatible({
  name: "zen",
  baseURL,
  apiKey,
})

const anthropicProvider = createAnthropic({
  baseURL,
  apiKey,
})

const DEFAULT_MODEL = process.env.AI_MODEL ?? "deepseek-v4-flash"

const ANTHROPIC_MODELS = new Set([
  "minimax-m3",
  "minimax-m2.7",
  "minimax-m2.5",
  "qwen3.7-max",
  "qwen3.7-plus",
  "qwen3.6-plus",
])

export async function POST(req: Request) {
  const {
    prompt,
    currentTree,
    context,
  }: {
    prompt: string
    currentTree?: unknown
    context?: { model?: string } | null
  } = await req.json()

  const model = context?.model ?? DEFAULT_MODEL
  const provider = ANTHROPIC_MODELS.has(model)
    ? anthropicProvider
    : openaiProvider

  const system = catalog.prompt({
    mode: "standalone",
    customRules: [
      "OUTPUT ONLY valid JSONL lines (RFC 6902 JSON Patch). No markdown, no prose.",
    ],
  })

  const userPrompt = buildUserPrompt({
    prompt,
    currentSpec: (currentTree ?? null) as Spec | null,
  })

  const result = streamText({
    model: provider(model),
    system,
    prompt: userPrompt,
  })

  return result.toTextStreamResponse()
}
