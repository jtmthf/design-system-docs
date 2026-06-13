"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { Button } from "@workspace/ui/components/button";
import { ChevronsUpDown } from "lucide-react";

export default function CollapsibleDemo() {
  return (
    <Collapsible className="w-96 space-y-2">
      <div className="flex items-center justify-between rounded-md border px-4 py-3">
        <span className="text-sm font-medium">What is a design system?</span>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon-sm">
              <ChevronsUpDown className="size-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          }
        />
      </div>
      <CollapsibleContent className="rounded-md border px-4 py-3 text-sm text-muted-foreground">
        A design system is a collection of reusable components, guided by clear
        standards, that can be assembled to build any number of applications.
      </CollapsibleContent>
    </Collapsible>
  );
}
