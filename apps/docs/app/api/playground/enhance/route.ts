import { generateText } from "ai"
import { createOpenAICompatible } from "@ai-sdk/openai-compatible"
import { createAnthropic } from "@ai-sdk/anthropic"

export const maxDuration = 30

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

const ENHANCER_SYSTEM = `You are a UI/UX design assistant that helps users write better prompts for AI-generated UI components.

Your task is to take a user's brief or vague prompt and expand it into a detailed, structured prompt that will produce high-quality UI output.

When enhancing, always:
1. Clarify ambiguities (e.g., specify exact fields for forms, exact columns for tables)
2. Define layout preferences (grid vs stack, responsive behavior, spacing)
3. Specify content details (realistic placeholder text, labels, button text, headings)
4. Include styling preferences (colors, sizing, visual hierarchy, alignment)
5. Mention interactive elements and their behavior (validation, state changes, loading states)
6. Add accessibility considerations where relevant (ARIA labels, focus states, error messaging)

Return ONLY the enhanced prompt text. No markdown formatting, no explanations, no preamble. Just the enhanced prompt. Keep it concise but comprehensive. The enhanced prompt should be 3-8 sentences. Do not wrap in quotes.`

export async function POST(req: Request) {
  const {
    prompt,
    context,
  }: {
    prompt: string
    context?: { model?: string } | null
  } = await req.json()

  const model = context?.model ?? DEFAULT_MODEL
  const provider = ANTHROPIC_MODELS.has(model)
    ? anthropicProvider
    : openaiProvider

  try {
    const result = await generateText({
      model: provider(model),
      instructions: ENHANCER_SYSTEM,
      prompt: `Enhance the following UI generation prompt:\n\n"${prompt}"`,
      // The enhanced prompt is only 3–8 sentences; cap output and abort before
      // the function limit so a slow model returns a clean JSON error the client
      // can surface, rather than an opaque 504.
      maxOutputTokens: 500,
      abortSignal: AbortSignal.timeout(25_000),
    })

    return Response.json({ enhanced: result.text.trim() })
  } catch (error) {
    console.error("playground enhance error:", error)
    const timedOut = error instanceof Error && error.name === "TimeoutError"
    return Response.json(
      { error: timedOut ? "Enhancement timed out" : "Enhancement failed" },
      { status: timedOut ? 504 : 500 }
    )
  }
}
