"use client";

import { SearchXIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty";
import { Button } from "@workspace/ui/components/button";

export default function EmptyNoResults() {
  return (
    <Empty className="w-96">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try adjusting your search or filters to find what you&apos;re looking
          for.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Clear filters
        </Button>
      </EmptyContent>
    </Empty>
  );
}
