"use client";

import { TrashIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog";
import { Button } from "@workspace/ui/components/button";

export default function AlertDialogWithMedia() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Remove file
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <TrashIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete file?</AlertDialogTitle>
          <AlertDialogDescription>
            &ldquo;report.pdf&rdquo; will be moved to the trash.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
