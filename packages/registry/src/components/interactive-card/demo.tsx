import { ArrowRight } from "lucide-react";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card/index";
import { InteractiveCard } from "./index";

export function InteractiveCardBasic() {
  return (
    <InteractiveCard className="max-w-sm">
      <CardHeader>
        <CardTitle>Team settings</CardTitle>
        <CardDescription>Manage members, roles and billing.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
        Open settings
        <ArrowRight className="size-4" aria-hidden />
      </CardContent>
    </InteractiveCard>
  );
}

export function InteractiveCardDisabled() {
  return (
    <InteractiveCard className="max-w-sm" disabled>
      <CardHeader>
        <CardTitle>Archived workspace</CardTitle>
        <CardDescription>This workspace is read-only.</CardDescription>
      </CardHeader>
    </InteractiveCard>
  );
}
