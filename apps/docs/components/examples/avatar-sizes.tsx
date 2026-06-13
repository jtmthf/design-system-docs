"use client";

import {
  Avatar,
  AvatarFallback,
} from "@workspace/ui/components/avatar";

export default function AvatarSizes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  );
}
