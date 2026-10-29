import { Button } from "../button/index";
import { Input } from "../input/index";
import { Label } from "../label/index";
import {
  MobileDialog,
  MobileDialogClose,
  MobileDialogContent,
  MobileDialogDescription,
  MobileDialogFooter,
  MobileDialogHeader,
  MobileDialogTitle,
  MobileDialogTrigger,
} from "./index";

export function MobileDialogBasic() {
  return (
    <MobileDialog>
      <MobileDialogTrigger asChild>
        <Button variant="outline">Rename project</Button>
      </MobileDialogTrigger>
      <MobileDialogContent className="max-w-sm">
        <MobileDialogHeader>
          <MobileDialogTitle>Rename project</MobileDialogTitle>
          <MobileDialogDescription>
            Pick a short, recognizable name.
          </MobileDialogDescription>
        </MobileDialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="mobile-dialog-name">Project name</Label>
          <Input id="mobile-dialog-name" defaultValue="Acme dashboard" />
        </div>
        <MobileDialogFooter>
          <MobileDialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </MobileDialogClose>
          <MobileDialogClose asChild>
            <Button>Save</Button>
          </MobileDialogClose>
        </MobileDialogFooter>
      </MobileDialogContent>
    </MobileDialog>
  );
}

export function MobileDialogConfirm() {
  return (
    <MobileDialog>
      <MobileDialogTrigger asChild>
        <Button variant="destructive">Delete account</Button>
      </MobileDialogTrigger>
      <MobileDialogContent className="max-w-sm">
        <MobileDialogHeader>
          <MobileDialogTitle>Delete account?</MobileDialogTitle>
          <MobileDialogDescription>
            This action is permanent and cannot be undone.
          </MobileDialogDescription>
        </MobileDialogHeader>
        <MobileDialogFooter>
          <MobileDialogClose asChild>
            <Button variant="outline">Keep account</Button>
          </MobileDialogClose>
          <MobileDialogClose asChild>
            <Button variant="destructive">Delete</Button>
          </MobileDialogClose>
        </MobileDialogFooter>
      </MobileDialogContent>
    </MobileDialog>
  );
}
