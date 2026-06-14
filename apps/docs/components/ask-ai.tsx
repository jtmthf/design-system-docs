"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircleIcon, SendIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { AskAIMessage } from "./ask-ai-message";

function messageText(parts: { type: string; text?: string }[]): string {
  return parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("");
}

export function AskAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }) as any,
  });
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const busy = status === "submitted" || status === "streaming";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    // Ground the answer in whatever page the user is reading.
    void sendMessage(
      { text },
      { body: { page: window.location.pathname } }
    );
    setInput("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full border bg-fd-secondary px-4 py-2 text-sm font-medium text-fd-secondary-foreground shadow-lg transition-colors hover:bg-fd-accent",
          open && "hidden"
        )}
      >
        <MessageCircleIcon className="size-4" />
        Ask AI
      </button>

      {open && (
        <>
          {/* Click-away catcher; no dimming so the docs stay readable. */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-label="Ask AI"
            className="fixed bottom-4 right-4 z-50 flex h-[min(34rem,calc(100dvh-2rem))] w-[min(28rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border bg-fd-popover text-fd-popover-foreground shadow-2xl"
          >
            <header className="flex items-center justify-between border-b px-4 py-3">
              <span className="text-sm font-semibold">Ask AI</span>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-fd-muted-foreground hover:bg-fd-accent"
              >
                <XIcon className="size-4" />
              </button>
            </header>

            <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.length === 0 && (
                <p className="text-sm text-fd-muted-foreground">
                  Ask about any component, theming, or usage. Answers are grounded
                  in this documentation and the page you’re on, and can include
                  live, copyable examples.
                </p>
              )}
              {messages.map((message) =>
                message.role === "user" ? (
                  <div key={message.id} className="text-right text-sm">
                    <div className="inline-block max-w-[85%] whitespace-pre-wrap rounded-lg bg-fd-primary px-3 py-2 text-left text-fd-primary-foreground">
                      {messageText(message.parts)}
                    </div>
                  </div>
                ) : (
                  <div
                    key={message.id}
                    className="rounded-lg bg-fd-muted px-3 py-2"
                  >
                    <AskAIMessage parts={message.parts} />
                  </div>
                )
              )}
              {error && (
                <p className="text-sm text-fd-muted-foreground">
                  Something went wrong reaching the assistant. Check that the AI
                  endpoint and key are configured.
                </p>
              )}
            </div>

            <form onSubmit={submit} className="flex gap-2 border-t p-3">
              <input
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 rounded-lg border bg-fd-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
              />
              <button
                type="submit"
                disabled={busy || input.trim().length === 0}
                aria-label="Send"
                className="inline-flex items-center justify-center rounded-lg bg-fd-primary px-3 text-fd-primary-foreground disabled:opacity-50"
              >
                <SendIcon className="size-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
