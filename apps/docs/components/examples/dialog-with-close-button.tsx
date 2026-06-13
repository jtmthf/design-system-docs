"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";

export default function DialogWithCloseButton() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome back</DialogTitle>
          <DialogDescription>
            You have new notifications since your last visit.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
