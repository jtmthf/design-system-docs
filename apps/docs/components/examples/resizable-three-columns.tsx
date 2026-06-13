"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";

export default function ResizableThreeColumns() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-64 w-full max-w-xl rounded-lg border"
    >
      <ResizablePanel defaultSize={20} minSize={12}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-xs font-medium text-muted-foreground">
            Files
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm font-medium text-muted-foreground">
            Editor
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={20} minSize={12}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-xs font-medium text-muted-foreground">
            Terminal
          </span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
