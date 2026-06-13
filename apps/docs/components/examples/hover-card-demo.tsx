"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@workspace/ui/components/hover-card";

export default function HoverCardDemo() {
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
        @jackmoore
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-full bg-muted" />
            <div>
              <p className="text-sm font-medium">Jack Moore</p>
              <p className="text-xs text-muted-foreground">@jackmoore</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Building design systems and developer tools.
          </p>
          <p className="text-xs text-muted-foreground">Joined January 2020</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
