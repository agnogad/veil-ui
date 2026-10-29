import { Camera, FileText, ImageIcon, Link } from "lucide-react";

import { Button } from "../button/index";
import { Input } from "../input/index";
import { Label } from "../label/index";
import {
  BottomSheet,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "./index";

export function BottomSheetActions() {
  return (
    <BottomSheet>
      <BottomSheetTrigger asChild>
        <Button variant="outline">Add attachment</Button>
      </BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>Add attachment</BottomSheetTitle>
          <BottomSheetDescription>
            Choose a source for your attachment.
          </BottomSheetDescription>
        </BottomSheetHeader>
        <div className="grid gap-2">
          <BottomSheetClose asChild>
            <Button variant="secondary" className="justify-start">
              <Camera aria-hidden /> Take a photo
            </Button>
          </BottomSheetClose>
          <BottomSheetClose asChild>
            <Button variant="secondary" className="justify-start">
              <ImageIcon aria-hidden /> Photo library
            </Button>
          </BottomSheetClose>
          <BottomSheetClose asChild>
            <Button variant="secondary" className="justify-start">
              <FileText aria-hidden /> Choose a file
            </Button>
          </BottomSheetClose>
          <BottomSheetClose asChild>
            <Button variant="secondary" className="justify-start">
              <Link aria-hidden /> Paste a link
            </Button>
          </BottomSheetClose>
        </div>
      </BottomSheetContent>
    </BottomSheet>
  );
}

export function BottomSheetForm() {
  return (
    <BottomSheet>
      <BottomSheetTrigger asChild>
        <Button>Leave a note</Button>
      </BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>Leave a note</BottomSheetTitle>
          <BottomSheetDescription>
            Notes are visible to your whole team.
          </BottomSheetDescription>
        </BottomSheetHeader>
        <div className="grid gap-2">
          <Label htmlFor="note-title">Title</Label>
          <Input id="note-title" placeholder="Deployment notes" />
        </div>
        <BottomSheetFooter>
          <Button type="submit">Save note</Button>
          <BottomSheetClose asChild>
            <Button variant="ghost">Cancel</Button>
          </BottomSheetClose>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  );
}
