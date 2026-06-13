"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { Button } from "@workspace/ui/components/button";
import { ChevronsUpDown } from "lucide-react";

export default function CollapsibleDefaultOpen() {
  return (
    <Collapsible defaultOpen className="w-96 space-y-2">
      <div className="flex items-center justify-between rounded-md border px-4 py-3">
        <span className="text-sm font-medium">Team members</span>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon-sm">
              <ChevronsUpDown className="size-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          }
        />
      </div>
      <CollapsibleContent className="space-y-1">
        {["Alice Chen", "Bob Sharma", "Carol Davis"].map((name) => (
          <div
            key={name}
            className="rounded-md border px-4 py-2 font-mono text-sm"
          >
            {name}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
