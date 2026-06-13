"use client";

import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";

export default function FieldWithError() {
  return (
    <Field data-invalid="true" className="w-80">
      <FieldLabel htmlFor="email-err">Email address</FieldLabel>
      <Input
        id="email-err"
        type="email"
        defaultValue="not-valid"
        aria-invalid
      />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  );
}
