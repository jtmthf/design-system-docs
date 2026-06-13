"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { Button } from "@workspace/ui/components/button";
import { ChevronsUpDown } from "lucide-react";

export default function CollapsibleDisabled() {
  return (
    <Collapsible disabled className="w-96 space-y-2">
      <div className="flex items-center justify-between rounded-md border px-4 py-3 opacity-60">
        <span className="text-sm font-medium">Locked section</span>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon-sm" disabled>
              <ChevronsUpDown className="size-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          }
        />
      </div>
      <CollapsibleContent className="rounded-md border px-4 py-3 text-sm text-muted-foreground">
        This content is unreachable while disabled.
      </CollapsibleContent>
    </Collapsible>
  );
}
