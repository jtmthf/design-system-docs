"use client";

import { Input } from "@workspace/ui/components/input";

export default function InputTypes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input type="text" placeholder="Text" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="number" placeholder="Number" />
      <Input type="search" placeholder="Search" />
    </div>
  );
}
