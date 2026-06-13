"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

export default function CardSmall() {
  return (
    <Card size="sm" className="w-72">
      <CardHeader>
        <CardTitle>Compact card</CardTitle>
        <CardDescription>Tighter spacing for dense layouts</CardDescription>
      </CardHeader>
      <CardContent>Uses the smaller --card-spacing token.</CardContent>
    </Card>
  );
}
