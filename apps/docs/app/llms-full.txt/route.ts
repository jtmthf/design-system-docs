import { source } from "@/lib/source";

export const revalidate = false;

export async function GET() {
  const pages = source.getPages();
  const scanned = await Promise.all(
    pages.map(async (page) => {
      const processed = await page.data.getText("processed");
      return `# ${page.data.title} (${page.url})\n\n${processed}`;
    })
  );

  return new Response(scanned.join("\n\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
