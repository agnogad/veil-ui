import { Camera, FileText, ImageIcon, Link } from "lucide-react";

import { Button } from "../button/index";
import {
  MobileBottomSheet,
  MobileBottomSheetClose,
  MobileBottomSheetContent,
  MobileBottomSheetDescription,
  MobileBottomSheetHeader,
  MobileBottomSheetTitle,
  MobileBottomSheetTrigger,
} from "./index";

export function MobileBottomSheetBasic() {
  return (
    <MobileBottomSheet>
      <MobileBottomSheetTrigger asChild>
        <Button variant="outline">Add attachment</Button>
      </MobileBottomSheetTrigger>
      <MobileBottomSheetContent>
        <MobileBottomSheetHeader>
          <MobileBottomSheetTitle>Add attachment</MobileBottomSheetTitle>
          <MobileBottomSheetDescription>
            Choose a source for your attachment.
          </MobileBottomSheetDescription>
        </MobileBottomSheetHeader>
        <div className="grid gap-2">
          <MobileBottomSheetClose asChild>
            <Button variant="secondary" className="justify-start">
              <Camera aria-hidden /> Take a photo
            </Button>
          </MobileBottomSheetClose>
          <MobileBottomSheetClose asChild>
            <Button variant="secondary" className="justify-start">
              <ImageIcon aria-hidden /> Photo library
            </Button>
          </MobileBottomSheetClose>
          <MobileBottomSheetClose asChild>
            <Button variant="secondary" className="justify-start">
              <FileText aria-hidden /> Choose a file
            </Button>
          </MobileBottomSheetClose>
          <MobileBottomSheetClose asChild>
            <Button variant="secondary" className="justify-start">
              <Link aria-hidden /> Paste a link
            </Button>
          </MobileBottomSheetClose>
        </div>
      </MobileBottomSheetContent>
    </MobileBottomSheet>
  );
}

export function MobileBottomSheetConfirm() {
  return (
    <MobileBottomSheet>
      <MobileBottomSheetTrigger asChild>
        <Button variant="destructive">Leave workspace</Button>
      </MobileBottomSheetTrigger>
      <MobileBottomSheetContent>
        <MobileBottomSheetHeader>
          <MobileBottomSheetTitle>Leave workspace?</MobileBottomSheetTitle>
          <MobileBottomSheetDescription>
            You will lose access until you are invited again.
          </MobileBottomSheetDescription>
        </MobileBottomSheetHeader>
        <div className="grid grid-cols-2 gap-2">
          <MobileBottomSheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </MobileBottomSheetClose>
          <MobileBottomSheetClose asChild>
            <Button variant="destructive">Leave</Button>
          </MobileBottomSheetClose>
        </div>
      </MobileBottomSheetContent>
    </MobileBottomSheet>
  );
}
