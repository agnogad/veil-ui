<script setup lang="ts">
import { Eye, EyeOff } from "lucide-vue-next";
import { ref, watch } from "vue";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import type { SignupFormProps, SignupFormValues } from "./types";

const props = withDefaults(defineProps<SignupFormProps>(), {
  title: "Create your account",
  description: "Start free. No credit card required.",
  loading: false,
  loginHref: "#login",
});

const emit = defineEmits<{ submit: [values: SignupFormValues] }>();

const name = ref("");
const email = ref("");
const password = ref("");
const accepted = ref(false);
const showPassword = ref(false);
const localError = ref<string | null>(null);

watch(accepted, (value) => {
  if (value) localError.value = null;
});

function handleSubmit() {
  if (!accepted.value) {
    localError.value = "Please accept the terms to continue.";
    return;
  }
  emit("submit", {
    name: name.value,
    email: email.value,
    password: password.value,
  });
}
</script>

<template>
  <form
    data-slot="signup-form"
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
      v-if="localError || error"
      role="alert"
      class="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
    >
      {{ localError ?? error }}
    </p>

    <div class="grid gap-2">
      <Label for="signup-name">Full name</Label>
      <Input
        id="signup-name"
        v-model="name"
        autocomplete="name"
        placeholder="Ada Lovelace"
        required
      />
    </div>

    <div class="grid gap-2">
      <Label for="signup-email">Email</Label>
      <Input
        id="signup-email"
        v-model="email"
        type="email"
        autocomplete="email"
        placeholder="you@example.com"
        required
      />
    </div>

    <div class="grid gap-2">
      <Label for="signup-password">Password</Label>
      <div class="relative">
        <Input
          id="signup-password"
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
      <p class="text-xs text-muted-foreground">
        At least 8 characters with one number.
      </p>
    </div>

    <div class="flex items-start gap-2">
      <Checkbox
        id="signup-terms"
        v-model="accepted"
        class="mt-0.5"
        aria-required="true"
      />
      <Label for="signup-terms" class="text-sm font-normal leading-snug">
        I agree to the terms of service and privacy policy.
      </Label>
    </div>

    <Button type="submit" class="w-full" :disabled="loading">
      {{ loading ? "Creating account…" : "Create account" }}
    </Button>

    <p class="text-center text-sm text-muted-foreground">
      Already have an account?
      <a
        :href="loginHref"
        class="font-medium text-primary underline-offset-4 hover:underline"
      >
        Sign in
      </a>
    </p>
  </form>
</template>
