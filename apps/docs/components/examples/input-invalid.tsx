"use client";

import { Input } from "@workspace/ui/components/input";

export default function InputInvalid() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Input
        aria-invalid
        defaultValue="not-an-email"
        placeholder="Email"
      />
      <p className="text-sm text-destructive">Enter a valid email address.</p>
    </div>
  );
}
