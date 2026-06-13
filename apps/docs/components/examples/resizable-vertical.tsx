"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";

export default function ResizableVertical() {
  return (
    <ResizablePanelGroup
      orientation="vertical"
      className="h-72 w-full max-w-xl rounded-lg border"
    >
      <ResizablePanel defaultSize={60}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium text-muted-foreground">
            Top panel
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-sm font-medium text-muted-foreground">
            Bottom panel
          </span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
