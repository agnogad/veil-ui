import { Button } from "../button/index";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./index";

export function HoverCardBasic() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">Hover for details</Button>
      </HoverCardTrigger>
      <HoverCardContent aria-label="Deployment details">
        <p className="text-sm font-medium">Deployment v2.4.0</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Built 12 minutes ago from the main branch.
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}

export function HoverCardProfile() {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant="ghost">@ada</Button>
      </HoverCardTrigger>
      <HoverCardContent aria-label="Profile preview" className="w-72">
        <div className="flex gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
            AL
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Ada Lovelace</p>
            <p className="text-xs text-muted-foreground">@ada</p>
            <p className="text-sm">
              Writes about design systems and leaps of logic.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
