"use client";

import { FileTextIcon, MoreHorizontalIcon } from "lucide-react";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item";

export default function ItemWithHeaderFooter() {
  return (
    <Item variant="outline" className="w-96 flex-wrap">
      <ItemHeader>
        <span className="text-xs text-muted-foreground">Pinned</span>
        <Badge variant="outline">Active</Badge>
      </ItemHeader>
      <ItemMedia variant="icon">
        <FileTextIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Project roadmap</ItemTitle>
        <ItemDescription>Updated yesterday</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontalIcon />
        </Button>
      </ItemActions>
      <ItemFooter>
        <span className="text-xs text-muted-foreground">Created by Ada Lovelace</span>
        <span className="text-xs text-muted-foreground">Jan 2025</span>
      </ItemFooter>
    </Item>
  );
}
