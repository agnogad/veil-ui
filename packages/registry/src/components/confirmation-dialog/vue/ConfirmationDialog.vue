<script setup lang="ts">
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "reka-ui";
import { computed, useSlots } from "vue";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    destructive?: boolean;
    open?: boolean;
    defaultOpen?: boolean;
    class?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }>(),
  {
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    destructive: false,
  },
);

const emit = defineEmits<{
  "update:open": [value: boolean];
  confirm: [];
  cancel: [];
}>();

const slots = useSlots();

const contentClasses = computed(() =>
  cn(
    "fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border bg-background p-6 shadow-lg outline-none",
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    props.class,
  ),
);

const cancelClasses = computed(() =>
  cn(buttonVariants({ variant: "outline" })),
);

const confirmClasses = computed(() =>
  cn(
    buttonVariants({
      variant: props.destructive ? "destructive" : "default",
    }),
  ),
);

function handleConfirm() {
  emit("confirm");
  props.onConfirm?.();
}

function handleCancel() {
  emit("cancel");
  props.onCancel?.();
}
</script>

<template>
  <AlertDialogRoot
    :open="props.open"
    :default-open="props.defaultOpen"
    @update:open="emit('update:open', $event)"
  >
    <AlertDialogTrigger v-if="slots.trigger" as-child>
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogPortal>
      <AlertDialogOverlay
        class="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
      />
      <AlertDialogContent
        data-slot="confirmation-dialog"
        :class="contentClasses"
      >
        <div class="flex flex-col gap-2">
          <AlertDialogTitle class="text-lg font-semibold">
            {{ props.title }}
          </AlertDialogTitle>
          <AlertDialogDescription
            v-if="props.description"
            class="text-sm text-muted-foreground"
          >
            {{ props.description }}
          </AlertDialogDescription>
        </div>
        <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <AlertDialogCancel
            data-slot="confirmation-dialog-cancel"
            :class="cancelClasses"
            @click="handleCancel"
          >
            {{ props.cancelLabel }}
          </AlertDialogCancel>
          <AlertDialogAction
            data-slot="confirmation-dialog-confirm"
            :class="confirmClasses"
            @click="handleConfirm"
          >
            {{ props.confirmLabel }}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>
