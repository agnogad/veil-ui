<script setup lang="ts">
import { ref } from "vue";

import { FormRepeater, type RepeaterRow } from "./index";

const rows = ref<RepeaterRow[]>([{ name: "", email: "" }]);

const contactFields = [
  { name: "name", label: "Name", placeholder: "Ada Lovelace" },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "ada@example.com",
  },
];
</script>

<template>
  <div class="flex max-w-xl flex-col gap-3">
    <FormRepeater
      :fields="contactFields"
      :default-value="rows"
      @update:items="rows = $event"
    />
    <p class="text-sm text-muted-foreground">{{ rows.length }} contact(s)</p>
  </div>

  <FormRepeater
    class="mt-8 max-w-xl"
    :fields="contactFields"
    :min="1"
    :max="3"
    add-label="Add contact"
  />
</template>
