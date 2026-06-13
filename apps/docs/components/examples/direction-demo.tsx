"use client";

import { DirectionProvider } from "@workspace/ui/components/direction";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";

export default function DirectionDemo() {
  return (
    <div className="flex gap-8">
      <DirectionProvider direction="ltr">
        <div
          dir="ltr"
          className="flex w-56 flex-col gap-3 rounded-lg border p-4"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            LTR
          </p>
          <Input placeholder="Type here…" />
          <Button size="sm">Submit</Button>
        </div>
      </DirectionProvider>
      <DirectionProvider direction="rtl">
        <div
          dir="rtl"
          className="flex w-56 flex-col gap-3 rounded-lg border p-4"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            RTL
          </p>
          <Input placeholder="اكتب هنا…" />
          <Button size="sm">إرسال</Button>
        </div>
      </DirectionProvider>
    </div>
  );
}
