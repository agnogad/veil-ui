<script setup lang="ts">
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Sparkles,
  Users,
} from "lucide-vue-next";
import { computed, ref } from "vue";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();

const steps = ["Account", "Workspace", "Team", "Done"];
const current = ref(2);
const workspace = ref("Acme Design");
const teamSize = ref("2-10");
const role = ref(0);

const roles = [
  {
    title: "Product designer",
    description: "Design systems, prototyping and UI craft.",
  },
  {
    title: "Engineer",
    description: "Front-end, full-stack and platform work.",
  },
  {
    title: "Product manager",
    description: "Roadmaps, research and go-to-market.",
  },
  {
    title: "Something else",
    description: "Pick this if none of the above fits.",
  },
];

const progress = computed(() => (current.value / steps.length) * 100);

function stateFor(index: number) {
  const number = index + 1;
  if (number < current.value) return "completed";
  if (number === current.value) return "current";
  return "upcoming";
}

function back() {
  if (current.value > 1) current.value -= 1;
}

function next() {
  if (current.value < steps.length) current.value += 1;
}
</script>

<template>
  <div
    data-slot="onboarding-page"
    :class="
      cn(
        'flex min-h-[560px] flex-col rounded-xl border bg-background',
        props.class,
      )
    "
  >
    <div class="flex items-center justify-between border-b px-6 py-4">
      <div data-slot="logo" class="inline-flex items-center gap-1.5">
        <span
          data-slot="logo-mark"
          class="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-md"
        >
          <span
            class="grid size-full place-items-center bg-primary text-[10px] font-bold text-primary-foreground"
          >
            V
          </span>
        </span>
        <span
          data-slot="logo-name"
          class="text-sm font-semibold tracking-tight"
        >
          Veil UI
        </span>
      </div>
      <Button variant="ghost" size="sm">Save &amp; exit</Button>
    </div>

    <div class="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-8">
      <div
        class="flex items-center justify-between text-xs text-muted-foreground"
      >
        <span>Step {{ current }} of {{ steps.length }}</span>
        <span>About 2 minutes left</span>
      </div>
      <Progress
        class="mt-2"
        :value="progress"
        aria-label="Onboarding progress"
      />

      <ol class="mt-5 flex w-full items-start gap-2">
        <li
          v-for="(step, index) in steps"
          :key="step"
          :aria-current="stateFor(index) === 'current' ? 'step' : undefined"
          :data-state="stateFor(index)"
          class="flex flex-1 items-start gap-3"
        >
          <span
            :class="
              cn(
                'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium',
                stateFor(index) === 'completed' &&
                  'border-primary bg-primary text-primary-foreground',
                stateFor(index) === 'current' &&
                  'border-foreground text-foreground',
                stateFor(index) === 'upcoming' && 'text-muted-foreground',
              )
            "
          >
            <Check
              v-if="stateFor(index) === 'completed'"
              class="size-3.5"
              aria-hidden="true"
            />
            <template v-else>{{ index + 1 }}</template>
          </span>
          <span class="grid gap-0.5">
            <span
              :class="
                cn(
                  'text-sm font-medium',
                  stateFor(index) === 'upcoming' && 'text-muted-foreground',
                )
              "
            >
              {{ step }}
            </span>
          </span>
          <span
            v-if="index < steps.length - 1"
            aria-hidden="true"
            class="mt-3.5 hidden h-px flex-1 bg-border sm:block"
          />
        </li>
      </ol>

      <Card class="mt-6">
        <CardHeader>
          <Badge variant="secondary" class="w-fit">
            <Sparkles aria-hidden="true" />
            Almost there
          </Badge>
          <CardTitle class="mt-2">Tell us about your team</CardTitle>
          <CardDescription>
            We use this to pick sensible defaults for your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-5">
          <div class="space-y-1.5">
            <Label for="onboarding-workspace">Workspace name</Label>
            <Input id="onboarding-workspace" v-model="workspace" />
            <p class="text-xs text-muted-foreground">
              This appears in invites and shared links.
            </p>
          </div>

          <div class="space-y-1.5">
            <Label for="onboarding-size">Team size</Label>
            <div class="relative">
              <select
                id="onboarding-size"
                v-model="teamSize"
                class="flex h-9 w-full appearance-none items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 pr-9 text-sm shadow-xs outline-none transition-[color,box-shadow,border-color] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30"
              >
                <option value="solo">Just me</option>
                <option value="2-10">2–10 people</option>
                <option value="11-50">11–50 people</option>
                <option value="51+">51+ people</option>
              </select>
              <ChevronDown
                class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 opacity-50"
                aria-hidden="true"
              />
            </div>
          </div>

          <fieldset class="space-y-2">
            <legend class="text-sm font-medium">
              What best describes you?
            </legend>
            <div class="grid gap-2 sm:grid-cols-2">
              <label
                v-for="(item, index) in roles"
                :key="item.title"
                :class="
                  cn(
                    'flex cursor-pointer gap-3 rounded-lg border p-3 transition-colors',
                    role === index && 'border-foreground bg-muted/30',
                  )
                "
              >
                <input
                  type="radio"
                  name="onboarding-role"
                  :checked="role === index"
                  class="mt-1 size-4 accent-foreground"
                  @change="role = index"
                />
                <span>
                  <span class="block text-sm font-medium">
                    {{ item.title }}
                  </span>
                  <span class="block text-xs text-muted-foreground">
                    {{ item.description }}
                  </span>
                </span>
              </label>
            </div>
          </fieldset>

          <div
            class="flex items-center gap-2 rounded-lg border bg-muted/20 p-3 text-sm"
          >
            <Users
              class="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            Invite teammates now or later from workspace settings.
          </div>
        </CardContent>
        <CardFooter class="justify-between border-t pt-4">
          <Button variant="ghost" :disabled="current === 1" @click="back">
            <ArrowLeft aria-hidden="true" />
            Back
          </Button>
          <Button :disabled="current === steps.length" @click="next">
            Continue
            <ArrowRight aria-hidden="true" />
          </Button>
        </CardFooter>
      </Card>

      <p
        class="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
      >
        <Check class="size-3.5" aria-hidden="true" />
        You can change all of this later in settings
      </p>
    </div>
  </div>
</template>
