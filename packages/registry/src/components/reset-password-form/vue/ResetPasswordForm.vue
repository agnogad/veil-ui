<script setup lang="ts">
import { Eye, EyeOff } from "lucide-vue-next";
import { ref, watch } from "vue";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import type { ResetPasswordFormProps } from "./types";

const props = withDefaults(defineProps<ResetPasswordFormProps>(), {
  title: "Choose a new password",
  description: "Your new password must be at least 8 characters.",
  loading: false,
  loginHref: "#login",
});

const emit = defineEmits<{ submit: [password: string] }>();

const password = ref("");
const confirm = ref("");
const error = ref<string | null>(null);
const showPassword = ref(false);
const showConfirm = ref(false);

watch([password, confirm], () => {
  error.value = null;
});

function handleSubmit() {
  if (password.value.length < 8) {
    error.value = "Use at least 8 characters.";
    return;
  }
  if (password.value !== confirm.value) {
    error.value = "Passwords do not match.";
    return;
  }
  error.value = null;
  emit("submit", password.value);
}
</script>

<template>
  <form
    data-slot="reset-password-form"
    :class="cn('grid w-full max-w-sm gap-5', props.class)"
    @submit.prevent="handleSubmit"
  >
    <div class="grid gap-1.5">
      <h1 class="text-xl font-semibold tracking-tight">{{ title }}</h1>
      <p v-if="description" class="text-sm text-muted-foreground">
        {{ description }}
      </p>
    </div>

    <p
      v-if="error"
      role="alert"
      class="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
    >
      {{ error }}
    </p>

    <div class="grid gap-2">
      <Label for="reset-password">New password</Label>
      <div class="relative">
        <Input
          id="reset-password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="new-password"
          class="pr-9"
          required
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          class="absolute right-1 top-1/2 size-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
          :aria-pressed="showPassword"
          @click="showPassword = !showPassword"
        >
          <EyeOff v-if="showPassword" aria-hidden="true" />
          <Eye v-else aria-hidden="true" />
        </Button>
      </div>
    </div>

    <div class="grid gap-2">
      <Label for="reset-confirm">Confirm password</Label>
      <div class="relative">
        <Input
          id="reset-confirm"
          v-model="confirm"
          :type="showConfirm ? 'text' : 'password'"
          autocomplete="new-password"
          class="pr-9"
          required
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          class="absolute right-1 top-1/2 size-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          :aria-label="showConfirm ? 'Hide password' : 'Show password'"
          :aria-pressed="showConfirm"
          @click="showConfirm = !showConfirm"
        >
          <EyeOff v-if="showConfirm" aria-hidden="true" />
          <Eye v-else aria-hidden="true" />
        </Button>
      </div>
    </div>

    <Button type="submit" class="w-full" :disabled="loading">
      {{ loading ? "Updating…" : "Update password" }}
    </Button>

    <a
      :href="loginHref"
      class="text-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
    >
      Back to sign in
    </a>
  </form>
</template>
