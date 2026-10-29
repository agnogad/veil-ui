<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import type { MegaMenuItem } from "./types";

const props = defineProps<{ items: MegaMenuItem[]; class?: string }>();
</script>

<template>
  <NavigationMenu :class="cn(props.class)">
    <NavigationMenuList>
      <NavigationMenuItem v-for="item in props.items" :key="item.label">
        <NavigationMenuTrigger>{{ item.label }}</NavigationMenuTrigger>
        <NavigationMenuContent class="w-[min(40rem,90vw)] p-4">
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="column in item.columns" :key="column.title">
              <p
                class="px-2 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
              >
                {{ column.title }}
              </p>
              <ul class="grid gap-0.5">
                <li v-for="link in column.links" :key="link.label">
                  <NavigationMenuLink :href="link.href">
                    <span class="block text-sm font-medium">{{ link.label }}</span>
                    <span
                      v-if="link.description"
                      class="mt-0.5 block text-xs text-muted-foreground"
                    >
                      {{ link.description }}
                    </span>
                  </NavigationMenuLink>
                </li>
              </ul>
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
