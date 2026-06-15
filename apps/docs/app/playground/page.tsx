"use client";

import { useState } from "react";
import type { Spec } from "@json-render/core";
import { useUIStream } from "@json-render/react";
import { toast } from "sonner";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@workspace/ui/components/resizable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@workspace/ui/components/tabs";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Button } from "@workspace/ui/components/button";
import { Alert, AlertTitle, AlertDescription } from "@workspace/ui/components/alert";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@workspace/ui/components/select";
import { SendIcon, Loader2Icon, Sparkles, AlertTriangleIcon } from "lucide-react";
import { generateJSX } from "@/lib/playground/codegen";
import { SpecPreview } from "@/components/spec-preview";
import { templates } from "@/lib/playground/templates";

/** Turn raw stream/HTTP errors into actionable, human copy. */
function friendlyError(message: string | undefined): string {
  const m = message ?? "";
  if (/504|timeout|timed out/i.test(m)) {
    return "Generation timed out — try a simpler prompt or a faster model (e.g. DeepSeek V4 Flash).";
  }
  if (/429|rate/i.test(m)) {
    return "Rate limited — wait a moment and try again.";
  }
  if (/network|fetch|failed to fetch/i.test(m)) {
    return "Couldn't reach the generator. Check your connection and retry.";
  }
  return m || "Something went wrong while generating. Please try again.";
}

const models = [
  { id: "glm-5.1", label: "GLM-5.1" },
  { id: "glm-5", label: "GLM-5" },
  { id: "kimi-k2.7", label: "Kimi K2.7" },
  { id: "kimi-k2.6", label: "Kimi K2.6" },
  { id: "deepseek-v4-pro", label: "DeepSeek V4 Pro" },
  { id: "deepseek-v4-flash", label: "DeepSeek V4 Flash" },
  { id: "mimo-v2.5", label: "MiMo-V2.5" },
  { id: "mimo-v2.5-pro", label: "MiMo-V2.5-Pro" },
  { id: "minimax-m3", label: "MiniMax M3" },
  { id: "minimax-m2.7", label: "MiniMax M2.7" },
  { id: "minimax-m2.5", label: "MiniMax M2.5" },
  { id: "qwen3.7-max", label: "Qwen3.7 Max" },
  { id: "qwen3.7-plus", label: "Qwen3.7 Plus" },
  { id: "qwen3.6-plus", label: "Qwen3.6 Plus" },
];

export default function PlaygroundPage() {
  const { spec, isStreaming, error, send, clear } = useUIStream({
    api: "/api/playground/generate",
  });
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("preview");
  const [model, setModel] = useState("deepseek-v4-flash");
  const [isEnhancing, setIsEnhancing] = useState(false);
  // A clicked template renders instantly from a committed spec (no API call).
  // It takes precedence until the user generates something new.
  const [templateSpec, setTemplateSpec] = useState<Spec | null>(null);

  const displaySpec = templateSpec ?? spec;
  const lastPrompt = history[history.length - 1];

  const handleSend = (text: string) => {
    if (!text.trim() || isStreaming) return;
    setTemplateSpec(null);
    setHistory((prev) => [...prev, text]);
    send(text, { model });
    setPrompt("");
  };

  const handleTemplate = (template: (typeof templates)[number]) => {
    if (isStreaming) return;
    clear();
    setTemplateSpec(template.spec);
    setHistory((prev) => [...prev, template.label]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(prompt);
    }
  };

  const handleEnhance = async () => {
    if (!prompt.trim() || isEnhancing || isStreaming) return;
    setIsEnhancing(true);
    try {
      const res = await fetch("/api/playground/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, context: { model } }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error ?? `HTTP error: ${res.status}`);
      }
      if (data?.enhanced) setPrompt(data.enhanced);
    } catch (err) {
      // Enhance is a side action: keep the typed prompt intact and surface the
      // failure as a non-blocking toast instead of swallowing it.
      const message = err instanceof Error ? err.message : undefined;
      toast.error("Couldn't enhance prompt", {
        description: friendlyError(message),
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="flex-1 overflow-hidden">
      <ResizablePanelGroup orientation="horizontal" className="h-full">
        {/* Left Panel */}
        <ResizablePanel defaultSize={35} minSize={20} className="flex flex-col">
          <div className="flex flex-col gap-4 p-5">
            {/* Quick chips */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                Start from a template
              </span>
              <div className="flex flex-wrap gap-2">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplate(template)}
                    disabled={isStreaming}
                    className="rounded-md border bg-muted px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                  >
                    {template.label}
                  </button>
                ))}
              </div>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="flex max-h-40 flex-col gap-1 overflow-y-auto text-xs text-muted-foreground">
                {history.map((h, i) => (
                  <div key={i} className="rounded bg-muted px-2 py-1">
                    {h}
                  </div>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex flex-col gap-2">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe the UI you want to generate..."
                className="min-h-[80px] resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Select value={model} onValueChange={(v) => v && setModel(v)}>
                    <SelectTrigger size="sm">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isStreaming && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Loader2Icon className="size-3 animate-spin" />
                      Generating...
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {displaySpec && (
                    <Button variant="outline" size="sm" onClick={() => { clear(); setTemplateSpec(null); setHistory([]); }}>
                      Clear
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEnhance}
                    disabled={isStreaming || isEnhancing || !prompt.trim()}
                    title="Enhance prompt"
                  >
                    {isEnhancing ? (
                      <Loader2Icon className="size-3 animate-spin" />
                    ) : (
                      <Sparkles className="size-3" />
                    )}
                    Enhance
                  </Button>
                  <Button size="sm" onClick={() => handleSend(prompt)} disabled={isStreaming || !prompt.trim()}>
                    <SendIcon className="size-3" />
                    Send
                  </Button>
                </div>
              </div>

              {error && !isStreaming && (
                <Alert variant="destructive">
                  <AlertTriangleIcon className="size-4" />
                  <AlertTitle>Generation failed</AlertTitle>
                  <AlertDescription>
                    {friendlyError(error.message)}
                    {lastPrompt && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 w-fit"
                        onClick={() => handleSend(lastPrompt)}
                      >
                        Retry
                      </Button>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel */}
        <ResizablePanel defaultSize={65} minSize={30}>
          <div className="flex h-full flex-col bg-fd-muted/20">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full flex-col">
              <TabsList className="mx-5 mt-3 w-fit">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="spec">Spec</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="flex-1 overflow-auto p-4">
                {!displaySpec && !isStreaming && (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Enter a prompt to generate a UI
                  </div>
                )}
                <SpecPreview spec={displaySpec} loading={isStreaming} />
              </TabsContent>

              <TabsContent value="spec" className="flex-1 overflow-auto p-4">
                <DynamicCodeBlock
                  lang="json"
                  code={displaySpec ? JSON.stringify(displaySpec, null, 2) : "// No spec generated yet"}
                />
              </TabsContent>

              <TabsContent value="code" className="flex-1 overflow-auto p-4">
                <DynamicCodeBlock
                  lang="tsx"
                  code={generateJSX(displaySpec)}
                />
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
