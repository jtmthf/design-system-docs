"use client";

import { FileTextIcon, MoreHorizontalIcon } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item";

export default function ItemDemo() {
  return (
    <Item className="w-96">
      <ItemMedia variant="icon">
        <FileTextIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Q3 Financial Report.pdf</ItemTitle>
        <ItemDescription>Last modified 2 days ago by Ada Lovelace</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontalIcon />
        </Button>
      </ItemActions>
    </Item>
  );
}
