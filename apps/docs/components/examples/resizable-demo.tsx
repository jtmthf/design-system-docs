"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-64 w-full max-w-xl rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium text-muted-foreground">
            Left panel
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium text-muted-foreground">
            Right panel
          </span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
