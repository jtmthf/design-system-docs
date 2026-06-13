"use client";

import { Textarea } from "@workspace/ui/components/textarea";

export default function TextareaInvalid() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Textarea
        aria-invalid
        defaultValue="This field has an error."
        aria-describedby="textarea-error"
      />
      <p id="textarea-error" className="text-sm text-destructive">
        This field is required.
      </p>
    </div>
  );
}
