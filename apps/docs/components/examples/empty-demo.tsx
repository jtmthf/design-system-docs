"use client";

import { InboxIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty";
import { Button } from "@workspace/ui/components/button";

export default function EmptyDemo() {
  return (
    <Empty className="w-96">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No messages yet</EmptyTitle>
        <EmptyDescription>
          When you receive messages they will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Compose message</Button>
      </EmptyContent>
    </Empty>
  );
}
