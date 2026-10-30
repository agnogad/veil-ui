<script setup lang="ts">
import { computed } from "vue";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const props = defineProps<{
  name: string;
  role: string;
  bio?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  followers?: number;
  following?: number;
  class?: string;
}>();

const fallback = computed(
  () =>
    props.avatarFallback ??
    props.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
);
</script>

<template>
  <Card data-slot="profile-card" :class="cn('max-w-sm', props.class)">
    <CardHeader class="items-center text-center">
      <Avatar size="lg" class="size-16 text-lg">
        <AvatarImage v-if="avatarSrc" :src="avatarSrc" alt="" />
        <AvatarFallback>{{ fallback }}</AvatarFallback>
      </Avatar>
      <div class="grid gap-1">
        <CardTitle>{{ name }}</CardTitle>
        <p class="text-sm text-muted-foreground">{{ role }}</p>
      </div>
    </CardHeader>
    <CardContent
      v-if="bio"
      class="text-center text-sm text-muted-foreground"
    >
      {{ bio }}
    </CardContent>
    <CardContent
      v-if="followers !== undefined || following !== undefined"
      class="flex justify-center gap-6 text-sm"
    >
      <span v-if="followers !== undefined">
        <strong class="font-semibold text-foreground">{{ followers }}</strong>
        <span class="text-muted-foreground"> followers</span>
      </span>
      <span v-if="following !== undefined">
        <strong class="font-semibold text-foreground">{{ following }}</strong>
        <span class="text-muted-foreground"> following</span>
      </span>
    </CardContent>
    <CardContent>
      <slot name="action">
        <Button type="button" class="w-full">Follow</Button>
      </slot>
    </CardContent>
  </Card>
</template>
