import { source } from "@/lib/source";

export const revalidate = false;

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: Promise<{ slug?: string[] }>;
  }
) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    return new Response("Page not found", { status: 404 });
  }

  const processed = await page.data.getText("processed");

  return new Response(processed, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
