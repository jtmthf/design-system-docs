"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Checkbox } from "@workspace/ui/components/checkbox";

export default function FieldFieldset() {
  return (
    <FieldSet className="w-80">
      <FieldLegend>Contact details</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="first">First name</FieldLabel>
          <Input id="first" placeholder="Ada" />
        </Field>
        <Field>
          <FieldLabel htmlFor="last">Last name</FieldLabel>
          <Input id="last" placeholder="Lovelace" />
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Subscribe to newsletter</FieldTitle>
            <FieldDescription>Receive weekly updates.</FieldDescription>
          </FieldContent>
          <Checkbox id="subscribe" />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
