"use client";

import { Textarea } from "@workspace/ui/components/textarea";

export default function TextareaDemo() {
  return (
    <Textarea
      className="w-full max-w-sm"
      placeholder="Write your message..."
    />
  );
}
