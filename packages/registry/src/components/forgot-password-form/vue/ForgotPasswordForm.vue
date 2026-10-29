<script setup lang="ts">
import { ArrowLeft, MailCheck } from "lucide-vue-next";
import { ref } from "vue";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import type { ForgotPasswordFormProps } from "./types";

const props = withDefaults(defineProps<ForgotPasswordFormProps>(), {
  title: "Forgot your password?",
  description: "Enter your email and we will send a reset link.",
  successMessage:
    "If an account exists for that email, a reset link is on its way.",
  backHref: "#login",
  loading: false,
});

const emit = defineEmits<{ submit: [email: string] }>();

const email = ref("");
const sent = ref(false);

function handleSubmit() {
  emit("submit", email.value);
  sent.value = true;
}
</script>

<template>
  <form
    data-slot="forgot-password-form"
    :class="cn('grid w-full max-w-sm gap-5', props.class)"
    @submit.prevent="handleSubmit"
  >
    <div class="grid gap-1.5">
      <h1 class="text-xl font-semibold tracking-tight">{{ title }}</h1>
      <p v-if="description" class="text-sm text-muted-foreground">
        {{ description }}
      </p>
    </div>

    <div
      v-if="sent"
      role="status"
      class="flex items-start gap-3 rounded-md border border-primary/20 bg-primary/5 px-3 py-3 text-sm"
    >
      <MailCheck class="mt-0.5 size-4 text-primary" aria-hidden="true" />
      <p class="text-muted-foreground">{{ successMessage }}</p>
    </div>

    <template v-else>
      <div class="grid gap-2">
        <Label for="forgot-email">Email</Label>
        <Input
          id="forgot-email"
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="you@example.com"
          required
        />
      </div>
      <Button type="submit" class="w-full" :disabled="loading">
        {{ loading ? "Sending…" : "Send reset link" }}
      </Button>
    </template>

    <a
      :href="backHref"
      class="inline-flex items-center justify-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
    >
      <ArrowLeft class="size-3.5" aria-hidden="true" />
      Back to sign in
    </a>
  </form>
</template>
