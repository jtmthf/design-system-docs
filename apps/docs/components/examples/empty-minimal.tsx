"use client";

import { FileXIcon } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty";

export default function EmptyMinimal() {
  return (
    <Empty className="w-96">
      <EmptyHeader>
        <EmptyMedia>
          <FileXIcon className="size-10 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>No files uploaded</EmptyTitle>
        <EmptyDescription>
          Drag and drop files here, or click the button to browse.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
