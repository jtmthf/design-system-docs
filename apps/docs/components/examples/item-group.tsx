"use client";

import { FileTextIcon, StarIcon } from "lucide-react";

import { Badge } from "@workspace/ui/components/badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@workspace/ui/components/item";

export default function ItemGroupDemo() {
  return (
    <ItemGroup className="w-96">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Annual Report 2024</ItemTitle>
          <ItemDescription>PDF · 4.2 MB</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge variant="secondary">New</Badge>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item variant="outline">
        <ItemMedia variant="icon">
          <StarIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Starred items</ItemTitle>
          <ItemDescription>12 files marked as favourite</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
}
