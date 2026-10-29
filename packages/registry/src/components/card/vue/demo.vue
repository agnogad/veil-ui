<script setup lang="ts">
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./index";
</script>

<template>
  <Card class="max-w-sm">
    <CardHeader>
      <CardTitle>Project settings</CardTitle>
      <CardDescription>
        Manage how your workspace behaves for every member.
      </CardDescription>
    </CardHeader>
    <CardContent>
      Changes are applied immediately and visible to everyone on the team.
    </CardContent>
    <CardFooter class="gap-2">
      <Button>Save changes</Button>
      <Button variant="outline">Cancel</Button>
    </CardFooter>
  </Card>
</template>
