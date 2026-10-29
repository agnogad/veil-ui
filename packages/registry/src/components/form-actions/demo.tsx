"use client";

import { Button } from "../button/index";
import { FormActions } from "./index";

export function FormActionsBasic() {
  return (
    <div className="w-full max-w-md">
      <FormActions>
        <Button variant="outline">Cancel</Button>
        <Button>Save changes</Button>
      </FormActions>
    </div>
  );
}

export function FormActionsSplit() {
  return (
    <div className="w-full max-w-md">
      <FormActions align="between">
        <Button variant="ghost">Delete draft</Button>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Publish</Button>
        </div>
      </FormActions>
    </div>
  );
}

export function FormActionsWithHint() {
  return (
    <div className="w-full max-w-md">
      <FormActions align="between">
        <p className="text-sm text-muted-foreground">
          Changes apply to every environment.
        </p>
        <Button>Update</Button>
      </FormActions>
    </div>
  );
}
