import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { mdxComponents } from "@/components/mdx";
import { PageActions } from "@/components/page-actions";
import { githubSourceUrl } from "@/lib/page-actions";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  // Component doc pages map 1:1 to registry items (slug `components/<name>`),
  // so surface "Open in v0" inside the page actions menu.
  const componentName =
    slug?.[0] === "components" && slug[1] ? slug[1] : undefined;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <PageActions
          slug={slug}
          githubUrl={githubSourceUrl(page.data.info.path)}
          componentName={componentName}
        />
      </div>
      <DocsBody>
        {/*
         * Route content crossfade. The inner div gives the named transition a
         * single DOM node to capture, and everything outside it — the fumadocs
         * sidebar, nav, and theme controls — stays out of the transition.
         */}
        <ViewTransition name="docs-content" share="crossfade" default="none">
          <div>
            <MDX components={mdxComponents} />
          </div>
        </ViewTransition>
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
