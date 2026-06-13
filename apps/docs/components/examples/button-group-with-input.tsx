"use client";

import { SearchIcon } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import {
  ButtonGroup,
  ButtonGroupText,
} from "@workspace/ui/components/button-group";
import { Input } from "@workspace/ui/components/input";

export default function ButtonGroupWithInput() {
  return (
    <ButtonGroup>
      <ButtonGroupText>
        <SearchIcon />
      </ButtonGroupText>
      <Input placeholder="Search…" className="w-48" />
      <Button variant="outline">Go</Button>
    </ButtonGroup>
  );
}
