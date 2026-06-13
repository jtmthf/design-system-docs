"use client";

import { Textarea } from "@workspace/ui/components/textarea";

export default function TextareaDisabled() {
  return (
    <Textarea
      className="w-full max-w-sm"
      disabled
      defaultValue="Read-only content that cannot be edited."
    />
  );
}
