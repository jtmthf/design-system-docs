"use client";

import { Button } from "@workspace/ui/components/button";

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
