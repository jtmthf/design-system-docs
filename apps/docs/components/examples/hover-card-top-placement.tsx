"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@workspace/ui/components/hover-card";

export default function HoverCardTopPlacement() {
  return (
    <HoverCard>
      <HoverCardTrigger
        render={
          <a
            href="#"
            className="text-sm font-medium underline underline-offset-4 hover:text-foreground"
            onClick={(e) => e.preventDefault()}
          />
        }
      >
        Hover for details
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <p className="text-sm">
          This card opens above the trigger. Useful when the trigger is near the
          bottom of the viewport.
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}
