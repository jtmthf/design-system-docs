"use client";

import { DollarSignIcon, EyeIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@workspace/ui/components/input-group";

export default function InputGroupWithButton() {
  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <DollarSignIcon />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput type="number" placeholder="0.00" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>
          <EyeIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
