"use client";

import { AtSignIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@workspace/ui/components/input-group";

export default function InputGroupInvalid() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>
            <AtSignIcon />
          </InputGroupText>
        </InputGroupAddon>
        <InputGroupInput aria-invalid placeholder="username" defaultValue="bad value!" />
      </InputGroup>
      <p className="text-sm text-destructive">Username contains invalid characters.</p>
    </div>
  );
}
