"use client";

import { DirectionProvider } from "@workspace/ui/components/direction";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";

export default function DirectionRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex w-80 flex-col gap-3">
        <p className="text-sm text-muted-foreground">Direction: rtl</p>
        <Input placeholder="اكتب هنا…" />
        <Button>إرسال</Button>
      </div>
    </DirectionProvider>
  );
}
