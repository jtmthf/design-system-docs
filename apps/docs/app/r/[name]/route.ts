import { buildRegistryItem } from "@/lib/registry";

export const revalidate = false;

/**
 * Serves a shadcn registry item, e.g. `/r/button.json`. Consumers add it with:
 *
 *   pnpm dlx shadcn@latest add https://<host>/r/button.json
 *
 * or, with the `@workspace-ui` registry configured in their components.json:
 *
 *   pnpm dlx shadcn@latest add @workspace-ui/button
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const componentName = name.replace(/\.json$/, "");
  const item = buildRegistryItem(componentName);

  if (!item) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(item, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
