import { readFileSync } from "node:fs";
import { join } from "node:path";

import Link from "next/link";
import type { Metadata } from "next";

import { ComponentPreview } from "@/components/component-preview";
import { CopyCommand } from "@/components/copy-command";
import { exampleRegistry } from "@/components/examples/registry";
import { OpenInV0 } from "@/components/open-in-v0";

export const metadata: Metadata = {
  title: "Component Registry",
  description:
    "Every component in the design system, installable via the shadcn CLI, MCP, or v0.",
};

interface IndexItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
}

function loadIndex(): IndexItem[] {
  try {
    const raw = readFileSync(
      join(process.cwd(), "public", "r", "registry.json"),
      "utf-8"
    );
    return (JSON.parse(raw).items ?? []) as IndexItem[];
  } catch {
    return [];
  }
}

/** Doc page path for a registry item, if it has one (components only). */
function docHref(item: IndexItem): string | undefined {
  return item.type === "registry:ui"
    ? `/docs/components/${item.name}`
    : undefined;
}

export default function ComponentsGalleryPage() {
  const items = loadIndex();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          Component Registry
        </h1>
        <p className="max-w-2xl text-fd-muted-foreground">
          {items.length} items, distributed as a shadcn registry. Install any of
          them with the shadcn CLI, open them in v0, or pull them
          conversationally through the shadcn MCP server.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed p-6 text-sm text-fd-muted-foreground">
          Registry index not found. Run <code>pnpm registry:build</code> first.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const exampleName = `${item.name}-demo`;
            const hasPreview =
              item.type === "registry:ui" && exampleName in exampleRegistry;
            const href = docHref(item);

            return (
              <div
                key={item.name}
                className="flex flex-col overflow-hidden rounded-xl border bg-fd-card"
              >
                {hasPreview ? (
                  <div className="flex h-40 items-center justify-center border-b bg-fd-background p-4 [&_.my-6]:my-0 [&>div]:min-h-0">
                    <ComponentPreview name={exampleName} previewOnly />
                  </div>
                ) : (
                  <div className="flex h-40 items-center justify-center border-b bg-fd-background text-xs uppercase tracking-wide text-fd-muted-foreground">
                    {item.type.replace("registry:", "")}
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div>
                    <h2 className="font-semibold">
                      {href ? (
                        <Link href={href} className="hover:underline">
                          {item.title ?? item.name}
                        </Link>
                      ) : (
                        (item.title ?? item.name)
                      )}
                    </h2>
                    {item.description ? (
                      <p className="mt-1 line-clamp-2 text-sm text-fd-muted-foreground">
                        {item.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-auto flex flex-col gap-2">
                    <CopyCommand name={item.name} />
                    <OpenInV0 name={item.name} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
