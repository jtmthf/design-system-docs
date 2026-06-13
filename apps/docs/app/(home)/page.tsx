import Link from "next/link";
import {
  BlocksIcon,
  PaletteIcon,
  SparklesIcon,
  TerminalIcon,
} from "lucide-react";

import { Button } from "@workspace/ui/components/button";

const features = [
  {
    icon: BlocksIcon,
    title: "55 components",
    description:
      "Accessible React components built on Base UI primitives, from buttons to data tables.",
  },
  {
    icon: PaletteIcon,
    title: "Tailwind v4 tokens",
    description:
      "Themed with oklch design tokens and dark mode, shared across every app in the monorepo.",
  },
  {
    icon: TerminalIcon,
    title: "Type-safe by default",
    description:
      "Prop tables and code samples are generated from the real component source and stay in sync.",
  },
  {
    icon: SparklesIcon,
    title: "Built for AI",
    description:
      "Ask AI search plus llms.txt and per-page Markdown so assistants can read the docs too.",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-24 text-center">
        <span className="mb-4 rounded-full border px-3 py-1 text-xs font-medium text-fd-muted-foreground">
          Base UI · Tailwind CSS v4 · React 19
        </span>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          The Design System
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-fd-muted-foreground">
          A monorepo component library with live examples, generated API
          references, and documentation that reads as well to humans as it does
          to AI agents.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button nativeButton={false} render={<Link href="/docs" />}>
            Get started
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/docs/components" />}
          >
            Browse components
          </Button>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 px-4 pb-24 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border bg-fd-card p-6 text-left"
          >
            <feature.icon className="mb-3 size-5 text-fd-muted-foreground" />
            <h2 className="mb-1 font-semibold">{feature.title}</h2>
            <p className="text-sm text-fd-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
