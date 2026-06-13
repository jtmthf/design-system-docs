"use client";

import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@workspace/ui/components/input-group";

export default function InputGroupDemo() {
  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <SearchIcon />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search…" />
    </InputGroup>
  );
}
