"use client";

import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";

export default function LabelDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="ada@example.com" />
    </div>
  );
}
