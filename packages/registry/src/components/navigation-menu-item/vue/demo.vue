<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { NavigationMenuItem } from "./index";
</script>

<template>
  <NavigationMenu aria-label="Resources">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink href="#docs" class="w-56">
          <span class="block text-sm font-medium">Documentation</span>
          <span class="mt-0.5 block text-xs text-muted-foreground">
            Guides, components and API reference.
          </span>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="#changelog" class="w-56">
          <span class="block text-sm font-medium">Changelog</span>
          <span class="mt-0.5 block text-xs text-muted-foreground">
            What shipped in the latest release.
          </span>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
