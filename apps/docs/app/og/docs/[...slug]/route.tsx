import { source } from "@/lib/source";
import { ImageResponse } from "next/og";

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

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: "60px",
        }}
      >
        <h1 style={{ fontSize: "64px", fontWeight: "bold" }}>
          {page.data.title}
        </h1>
        <p style={{ fontSize: "24px", color: "#a1a1aa" }}>
          {page.data.description}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
