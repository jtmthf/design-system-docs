"use client";

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";

export default function FieldDemo() {
  return (
    <Field className="w-80">
      <FieldLabel htmlFor="email">Email address</FieldLabel>
      <Input id="email" type="email" placeholder="ada@example.com" />
      <FieldDescription>We&apos;ll never share your email.</FieldDescription>
    </Field>
  );
}
