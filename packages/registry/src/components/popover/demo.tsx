import { Button } from "../button/index";
import { Input } from "../input/index";
import { Label } from "../label/index";
import { Popover, PopoverContent, PopoverTrigger } from "./index";

export function PopoverBasic() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent aria-label="Dimensions">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Dimensions</p>
          <p className="text-sm text-muted-foreground">
            Set the width and height for the selected layer.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function PopoverForm() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Set username</Button>
      </PopoverTrigger>
      <PopoverContent aria-label="Username settings" className="w-72">
        <div className="grid gap-2">
          <Label htmlFor="popover-username">Username</Label>
          <Input id="popover-username" defaultValue="ada" />
          <p className="text-xs text-muted-foreground">
            Your username is visible to everyone.
          </p>
          <Button size="sm" className="mt-1">
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function PopoverAlign() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">Aligned to start</Button>
      </PopoverTrigger>
      <PopoverContent align="start" aria-label="Alignment example">
        <p className="text-sm">This panel opens aligned to the start edge.</p>
      </PopoverContent>
    </Popover>
  );
}
