<script setup lang="ts">
import { Button } from "@/components/ui/button";

import {
  Section,
  SectionActions,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "./index";
</script>

<template>
  <Section class="w-full">
    <SectionHeader>
      <div class="grid gap-1">
        <SectionTitle>Usage</SectionTitle>
        <SectionDescription>
          Track requests, errors and latency across every project.
        </SectionDescription>
      </div>
    </SectionHeader>
    <SectionContent class="rounded-md border bg-muted/20 p-4 text-sm text-muted-foreground">
      Charts and tables go here.
    </SectionContent>
  </Section>

  <Section class="mt-8 w-full">
    <SectionHeader>
      <div class="grid gap-1">
        <SectionTitle>Team members</SectionTitle>
        <SectionDescription>People with access to this workspace.</SectionDescription>
      </div>
      <SectionActions>
        <Button variant="outline" size="sm">Manage</Button>
        <Button size="sm">Invite</Button>
      </SectionActions>
    </SectionHeader>
    <SectionContent class="rounded-md border p-4 text-sm text-muted-foreground">
      3 members · 1 pending invitation
    </SectionContent>
  </Section>

  <Section class="mt-8 w-full border-t pt-8">
    <SectionHeader>
      <SectionTitle>Danger zone</SectionTitle>
    </SectionHeader>
    <SectionContent class="text-sm text-muted-foreground">
      Deleting a workspace cannot be undone.
    </SectionContent>
  </Section>
</template>
