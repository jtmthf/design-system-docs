import { createMcpHandler, McpServer } from "@modelcontextprotocol/server";
import { registerSearchTool, registerSourceTools } from "fumadocs-core/mcp";
import { createFromSource } from "fumadocs-core/search/server";
import { llms } from "fumadocs-core/source";

import { source } from "@/lib/source";

/**
 * MCP server for the docs (Streamable HTTP).
 *
 * Shares its two data sources with the rest of the site: `list_pages` /
 * `get_page` render through the same `llms()` helper as `/llms.txt` and
 * `/llms-full.txt`, and `search` is backed by the same index as `/api/search`.
 *
 * MCP is a request/response runtime protocol, so this route must never be
 * prerendered, cached, or prefetched — `createMcpHandler` builds a fresh server
 * per request, which only works if every request actually reaches it.
 */
export const dynamic = "force-dynamic";

// The renderers are stateless, so build them once and share them across
// requests instead of re-indexing the docs on every call. `renderPage` is what
// gives `get_page` its Markdown, matching the /llms.mdx route.
const docsLlms = llms(source, {
  renderPage: (page) => page.data.getText("processed"),
});
const search = createFromSource(source, { language: "english" });

const handler = createMcpHandler(() => {
  const mcp = new McpServer({
    name: "design-system-docs",
    version: "1.0.0",
  });

  // Tools: `list_pages`, `get_page`.
  registerSourceTools(mcp, source, docsLlms);

  // Tool: `search`.
  registerSearchTool(mcp, search);

  return mcp;
});

export async function GET(request: Request) {
  return handler.fetch(request);
}

export async function POST(request: Request) {
  return handler.fetch(request);
}

export async function DELETE(request: Request) {
  return handler.fetch(request);
}
