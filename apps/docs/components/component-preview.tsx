import { readFileSync } from "node:fs";
import { join } from "node:path";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

import { cn } from "@/lib/cn";
import { exampleRegistry } from "./examples/registry";
import { PreviewErrorBoundary } from "./preview-error";
import { ViewTransition } from "react";

interface ComponentPreviewProps {
  /** Example file name, e.g. `button-variants` (without extension). */
  name: string;
  /** Tailwind classes applied to the live-preview surface. */
  className?: string;
  /** Render the preview area only, without the Code tab. */
  previewOnly?: boolean;
}

function readExampleSource(name: string): string {
  const path = join(process.cwd(), "components", "examples", `${name}.tsx`);
  return readFileSync(path, "utf-8")
    .replace(/^"use client";\r?\n\r?\n?/, "")
    .trimEnd()
    .concat("\n");
}

export function ComponentPreview({
  name,
  className,
  previewOnly = false,
}: ComponentPreviewProps) {
  const Example = exampleRegistry[name];

  if (!Example) {
    return (
      <div className="my-6 rounded-xl border border-dashed p-6 text-sm text-fd-muted-foreground">
        No example registered for <code>{name}</code>.
      </div>
    );
  }

  if (previewOnly) {
    // Gallery thumbnail: render the bare example fitted to its slot. No
    // detail-page chrome (min-height, large padding, nested border/margin) and
    // non-interactive so portaled popups can't escape the card.
    return (
      <div
        className={cn(
          "preview-surface not-prose pointer-events-none flex h-full w-full items-center justify-center overflow-hidden p-4",
          className
        )}
      >
        <PreviewErrorBoundary label={`Example "${name}"`}>
          <Example />
        </PreviewErrorBoundary>
      </div>
    );
  }

  const preview = (
    // In-place swap only: the route-level `docs-content` transition already
    // crossfades the page, so the preview animates on content changes (tabs,
    // regenerated examples) rather than re-animating on every navigation.
    <ViewTransition update="crossfade" default="none">
      <div
        className={cn(
          "preview-surface not-prose flex min-h-[320px] w-full items-center justify-center p-10",
          className
        )}
      >
        <PreviewErrorBoundary label={`Example "${name}"`}>
          <Example />
        </PreviewErrorBoundary>
      </div>
    </ViewTransition>
  );

  const code = readExampleSource(name);

  return (
    <Tabs items={["Preview", "Code"]} className="my-6">
      <Tab value="Preview" className="bg-fd-background p-0">
        {preview}
      </Tab>
      <Tab
        value="Code"
        className="p-0 [&_figure]:!m-0 [&_figure]:rounded-none [&_figure]:border-none"
      >
        <DynamicCodeBlock
          lang="tsx"
          code={code}
          options={{
            themes: { light: "github-light", dark: "github-dark" },
          }}
        />
      </Tab>
    </Tabs>
  );
}
