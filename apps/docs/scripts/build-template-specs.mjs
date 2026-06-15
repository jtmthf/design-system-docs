#!/usr/bin/env node
/**
 * On-demand regenerator for the playground "Start from a template" specs.
 *
 * The four template chips load committed JSON fixtures
 * (lib/playground/templates/*.json) so they never hit the generation timeout.
 * This script regenerates those fixtures by calling the live generate endpoint
 * (which owns the shared system prompt) and compiling the streamed JSONL patches
 * into a spec. It is intentionally NOT part of `pnpm build` — run it manually,
 * eyeball each result in the playground, then commit.
 *
 * Usage:
 *   pnpm --filter docs dev   # in another terminal (serves :3001)
 *   PLAYGROUND_URL=http://localhost:3001 node scripts/build-template-specs.mjs
 */
import { writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { compileSpecStream } from "@json-render/core"

const BASE = process.env.PLAYGROUND_URL ?? "http://localhost:3001"
const MODEL = process.env.PLAYGROUND_MODEL ?? "deepseek-v4-flash"
const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "lib", "playground", "templates")

const TEMPLATES = [
  { id: "login-form", prompt: "Login form" },
  { id: "pricing-page", prompt: "Pricing page" },
  { id: "profile-card", prompt: "Profile card" },
  { id: "contact-form", prompt: "Contact form" },
]

for (const { id, prompt } of TEMPLATES) {
  process.stdout.write(`Generating ${id}... `)
  const res = await fetch(`${BASE}/api/playground/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, context: { model: MODEL } }),
  })
  if (!res.ok) throw new Error(`${id}: HTTP ${res.status}`)
  const text = await res.text()
  const spec = compileSpecStream(text)
  if (!spec || !spec.root || !spec.elements) {
    throw new Error(`${id}: stream did not compile to a valid spec`)
  }
  await writeFile(join(outDir, `${id}.json`), JSON.stringify(spec, null, 2) + "\n")
  console.log("ok")
}

console.log("\nDone. Verify each template in the playground before committing.")
