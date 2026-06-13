"use client";

import { FileTextIcon } from "lucide-react";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item";

export default function ItemVariants() {
  return (
    <div className="flex w-96 flex-col gap-2">
      <Item variant="default">
        <ItemMedia variant="icon">
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default variant</ItemTitle>
          <ItemDescription>Transparent border</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Outline variant</ItemTitle>
          <ItemDescription>Visible border</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemMedia variant="icon">
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Muted variant</ItemTitle>
          <ItemDescription>Muted background fill</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
}
