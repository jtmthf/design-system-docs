"use client";

import { AtSignIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@workspace/ui/components/input-group";

export default function InputGroupTextAddon() {
  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <AtSignIcon />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="username" />
    </InputGroup>
  );
}
