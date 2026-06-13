"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

export default function CardDemo() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Project Lighthouse</CardTitle>
        <CardDescription>Quarterly status update</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        On track for the April release. All blocking issues resolved.
      </CardContent>
      <CardFooter>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  );
}
