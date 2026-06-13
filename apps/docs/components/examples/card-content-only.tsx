"use client";

import { Card, CardContent } from "@workspace/ui/components/card";

export default function CardContentOnly() {
  return (
    <Card className="w-72">
      <CardContent>A bare card with only content.</CardContent>
    </Card>
  );
}
