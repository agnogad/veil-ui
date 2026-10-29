<script setup lang="ts">
import { CreditCard, LifeBuoy } from "lucide-vue-next";

import { UserMenu } from "./index";

const items = [
  { label: "Billing", href: "#billing", icon: CreditCard },
  { label: "Support", href: "#support", icon: LifeBuoy },
];

function onSignOut() {
  // Wire this up to your auth provider.
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <UserMenu
      name="Ada Lovelace"
      email="ada@example.com"
      :on-sign-out="onSignOut"
    />
    <UserMenu
      name="Mira Chen"
      email="mira@acme.dev"
      :items="items"
      :on-sign-out="onSignOut"
    />
  </div>
</template>
