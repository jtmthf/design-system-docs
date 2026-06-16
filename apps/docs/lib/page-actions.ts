import { registryBaseUrl } from "./registry-url";

/** Repo the docs content lives in; used to build "Open in GitHub" links. */
const GITHUB_REPO = "https://github.com/jtmthf/design-system-docs";

/** Path, within the repo, of the fumadocs content root. */
const DOCS_CONTENT_DIR = "apps/docs/content/docs";

/**
 * Absolute URL that serves a docs page as processed Markdown — the
 * `/llms.mdx/docs/<slug>` route. Pass `origin` (e.g. `window.location.origin`)
 * to point at the deploy actually serving the page; see {@link registryBaseUrl}.
 */
export function markdownUrl(slug: string[] | undefined, origin?: string): string {
  const path = slug && slug.length > 0 ? `/${slug.join("/")}` : "";
  return `${registryBaseUrl(origin)}/llms.mdx/docs${path}`;
}

/**
 * GitHub source URL for a docs page, built from its fumadocs file-info path
 * (e.g. `components/button.mdx`).
 */
export function githubSourceUrl(infoPath: string): string {
  return `${GITHUB_REPO}/blob/main/${DOCS_CONTENT_DIR}/${infoPath}`;
}

/** Prompt handed to an assistant so it loads the page before answering. */
function aiPrompt(url: string): string {
  return `Read ${url}, I want to ask questions about it.`;
}

/** claude.ai deep link that opens a new chat primed to read the page. */
export function openInClaudeUrl(url: string): string {
  return `https://claude.ai/new?${new URLSearchParams({ q: aiPrompt(url) })}`;
}

/** ChatGPT deep link that opens a new chat primed to read the page. */
export function openInChatGptUrl(url: string): string {
  return `https://chatgpt.com/?${new URLSearchParams({ hints: "search", q: aiPrompt(url) })}`;
}

/** Cursor deep link that opens the editor with a prompt primed to read the page. */
export function openInCursorUrl(url: string): string {
  return `https://cursor.com/link/prompt?${new URLSearchParams({ text: aiPrompt(url) })}`;
}
