<script setup lang="ts">
import { Eye, EyeOff } from "lucide-vue-next";
import { ref } from "vue";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import type { LoginFormProps, LoginFormValues } from "./types";

const props = withDefaults(defineProps<LoginFormProps>(), {
  title: "Welcome back",
  description: "Sign in to continue to your workspace.",
  loading: false,
  forgotHref: "#forgot-password",
  signupHref: "#signup",
});

const emit = defineEmits<{ submit: [values: LoginFormValues] }>();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

function handleSubmit() {
  emit("submit", { email: email.value, password: password.value });
}
</script>

<template>
  <form
    data-slot="login-form"
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
      <Label for="login-email">Email</Label>
      <Input
        id="login-email"
        v-model="email"
        type="email"
        autocomplete="email"
        placeholder="you@example.com"
        required
      />
    </div>

    <div class="grid gap-2">
      <div class="flex items-center justify-between gap-2">
        <Label for="login-password">Password</Label>
        <a
          :href="forgotHref"
          class="text-xs text-primary underline-offset-4 hover:underline"
        >
          Forgot password?
        </a>
      </div>
      <div class="relative">
        <Input
          id="login-password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="current-password"
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

    <Button type="submit" class="w-full" :disabled="loading">
      {{ loading ? "Signing in…" : "Sign in" }}
    </Button>

    <p class="text-center text-sm text-muted-foreground">
      New here?
      <a
        :href="signupHref"
        class="font-medium text-primary underline-offset-4 hover:underline"
      >
        Create an account
      </a>
    </p>
  </form>
</template>
