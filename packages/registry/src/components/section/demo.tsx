"use client";

import { Button } from "../button/index";
import {
  Section,
  SectionActions,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "./index";

export function SectionBasic() {
  return (
    <Section className="w-full">
      <SectionHeader>
        <div className="grid gap-1">
          <SectionTitle>Usage</SectionTitle>
          <SectionDescription>
            Track requests, errors and latency across every project.
          </SectionDescription>
        </div>
      </SectionHeader>
      <SectionContent className="rounded-md border bg-muted/20 p-4 text-sm text-muted-foreground">
        Charts and tables go here.
      </SectionContent>
    </Section>
  );
}

export function SectionWithActions() {
  return (
    <Section className="w-full">
      <SectionHeader>
        <div className="grid gap-1">
          <SectionTitle>Team members</SectionTitle>
          <SectionDescription>
            People with access to this workspace.
          </SectionDescription>
        </div>
        <SectionActions>
          <Button variant="outline" size="sm">
            Manage
          </Button>
          <Button size="sm">Invite</Button>
        </SectionActions>
      </SectionHeader>
      <SectionContent className="rounded-md border p-4 text-sm text-muted-foreground">
        3 members · 1 pending invitation
      </SectionContent>
    </Section>
  );
}

export function SectionSeparated() {
  return (
    <div className="grid w-full gap-8">
      <Section>
        <SectionHeader>
          <SectionTitle>General</SectionTitle>
        </SectionHeader>
        <SectionContent className="text-sm text-muted-foreground">
          Workspace name, slug and region.
        </SectionContent>
      </Section>
      <Section className="border-t pt-8">
        <SectionHeader>
          <SectionTitle>Danger zone</SectionTitle>
        </SectionHeader>
        <SectionContent className="text-sm text-muted-foreground">
          Deleting a workspace cannot be undone.
        </SectionContent>
      </Section>
    </div>
  );
}
