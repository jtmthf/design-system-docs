import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-semibold">Playground</h1>
        </div>
        <Link
          href="/docs"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-3" />
          Back to Docs
        </Link>
      </header>
      {children}
      <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" strategy="lazyOnload" />
    </div>
  );
}
