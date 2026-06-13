"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@workspace/ui/components/hover-card";

export default function HoverCardOpenByDefault() {
  return (
    <HoverCard defaultOpen>
      <HoverCardTrigger
        render={
          <a
            href="#"
            className="text-sm font-medium underline underline-offset-4 hover:text-foreground"
            onClick={(e) => e.preventDefault()}
          />
        }
      >
        @design-system
      </HoverCardTrigger>
      <HoverCardContent side="bottom">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-full bg-muted" />
            <div>
              <p className="text-sm font-medium">Design System</p>
              <p className="text-xs text-muted-foreground">@design-system</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Official account for the component library.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
