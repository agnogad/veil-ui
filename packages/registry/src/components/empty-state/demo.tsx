import { Inbox } from "lucide-react";

import { Button } from "../button/index";
import { EmptyState } from "./index";

export function EmptyStateBasic() {
  return (
    <EmptyState
      icon={Inbox}
      title="No messages"
      description="Messages you receive will show up here."
    />
  );
}

export function EmptyStateWithAction() {
  return (
    <EmptyState
      icon={Inbox}
      title="No projects yet"
      description="Create your first project to get started."
      action={<Button size="sm">New project</Button>}
    />
  );
}

export function EmptyStateCustom() {
  return (
    <EmptyState title="Nothing to show">
      <p className="text-xs text-muted-foreground">
        Try a different search term.
      </p>
    </EmptyState>
  );
}
