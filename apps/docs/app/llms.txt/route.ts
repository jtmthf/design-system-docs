import { source } from "@/lib/source";
import { llms } from "fumadocs-core/source";

export const revalidate = false;

export async function GET() {
  const index = await llms(source).index();

  // Advertise the MCP server alongside the plain-text index so agents that
  // discover this file can go on to query the docs over MCP.
  const mcp = [
    "## MCP Server",
    "",
    "This documentation is also served over the Model Context Protocol",
    "(Streamable HTTP) at `/api/mcp`.",
    "",
    "- `list_pages` — list every docs page with its URL",
    "- `get_page` — fetch a page's Markdown by URL",
    "- `search` — full-text search across the docs",
    "",
    "Client configuration:",
    "",
    "```json",
    JSON.stringify(
      {
        mcpServers: {
          "design-system-docs": {
            url: "/api/mcp",
          },
        },
      },
      null,
      2
    ),
    "```",
    "",
  ].join("\n");

  return new Response(`${index}\n\n${mcp}`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
