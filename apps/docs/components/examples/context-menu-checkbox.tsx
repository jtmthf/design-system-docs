"use client";

import { useState } from "react";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "@workspace/ui/components/context-menu";

export default function ContextMenuCheckbox() {
  const [showGrid, setShowGrid] = useState(true);
  const [showHidden, setShowHidden] = useState(false);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>View</ContextMenuLabel>
          <ContextMenuCheckboxItem
            checked={showGrid}
            onCheckedChange={setShowGrid}
          >
            Show grid
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={showHidden}
            onCheckedChange={setShowHidden}
          >
            Show hidden files
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
