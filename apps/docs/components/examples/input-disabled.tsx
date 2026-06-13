"use client";

import { Input } from "@workspace/ui/components/input";

export default function InputDisabled() {
  return (
    <Input
      disabled
      value="Read only value"
      className="w-full max-w-sm"
    />
  );
}
