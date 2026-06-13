"use client";

import { CopyIcon, FolderIcon, ShareIcon, Trash2Icon } from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@workspace/ui/components/context-menu";

export default function ContextMenuSubmenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            <CopyIcon />
            Copy
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <ShareIcon />
              Share
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Via email</ContextMenuItem>
              <ContextMenuItem>Via link</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>More options…</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuItem>
            <FolderIcon />
            Move to folder
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2Icon />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
