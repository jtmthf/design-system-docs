"use client";

import { Field, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";

export default function FieldHorizontal() {
  return (
    <Field orientation="horizontal" className="w-96">
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" placeholder="@handle" />
    </Field>
  );
}
