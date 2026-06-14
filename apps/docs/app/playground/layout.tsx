import Script from "next/script";

import { HomeLayout } from "fumadocs-ui/layouts/home";

import { baseOptions } from "@/lib/layout.shared";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HomeLayout {...baseOptions} className="h-screen">
      {children}
      <Script
        src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"
        strategy="lazyOnload"
      />
    </HomeLayout>
  );
}
