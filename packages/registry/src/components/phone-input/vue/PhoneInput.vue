<script setup lang="ts">
import { Check, ChevronDown } from "lucide-vue-next";
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "reka-ui";
import { computed, ref } from "vue";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Country {
  code: string;
  name: string;
  dial: string;
}

const countries: Country[] = [
  { code: "US", name: "United States", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "TR", name: "Turkey", dial: "+90" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "AT", name: "Austria", dial: "+43" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "NO", name: "Norway", dial: "+47" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "FI", name: "Finland", dial: "+358" },
  { code: "IE", name: "Ireland", dial: "+353" },
  { code: "PL", name: "Poland", dial: "+48" },
  { code: "CZ", name: "Czechia", dial: "+420" },
  { code: "GR", name: "Greece", dial: "+30" },
  { code: "RU", name: "Russia", dial: "+7" },
  { code: "UA", name: "Ukraine", dial: "+380" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "KR", name: "South Korea", dial: "+82" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "NZ", name: "New Zealand", dial: "+64" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "IL", name: "Israel", dial: "+972" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "VN", name: "Vietnam", dial: "+84" },
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "KE", name: "Kenya", dial: "+254" },
  { code: "GH", name: "Ghana", dial: "+233" },
  { code: "MA", name: "Morocco", dial: "+212" },
];

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    defaultValue?: string;
    country?: string;
    defaultCountry?: string;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    class?: string;
  }>(),
  {
    defaultValue: "",
    defaultCountry: "US",
    placeholder: "555 123 4567",
    label: "Phone number",
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  "update:country": [code: string];
}>();

const internal = ref(props.defaultValue);
const internalCountry = ref(props.defaultCountry);
const current = computed(() => props.modelValue ?? internal.value);
const currentCountry = computed(
  () => props.country ?? internalCountry.value,
);
const selected = computed(() =>
  countries.find((country) => country.code === currentCountry.value),
);

function flagEmoji(code: string) {
  return code.replace(/./g, (char) =>
    String.fromCodePoint(127397 + char.charCodeAt(0)),
  );
}

function handleCountry(code: string) {
  if (props.country === undefined) internalCountry.value = code;
  emit("update:country", code);
}

function handleInput(value: string) {
  const next = value.replace(/[^\d\s()-]/g, "");
  if (props.modelValue === undefined) internal.value = next;
  emit("update:modelValue", next);
}
</script>

<template>
  <div
    data-slot="phone-input"
    :class="cn('flex w-full max-w-sm items-center', props.class)"
  >
    <SelectRoot
      :model-value="currentCountry"
      :disabled="disabled"
      @update:model-value="handleCountry($event as string)"
    >
      <SelectTrigger
        aria-label="Country code"
        class="flex h-9 w-28 shrink-0 items-center justify-between gap-1 rounded-md rounded-r-none border border-r-0 border-input bg-transparent px-2 text-sm shadow-xs outline-none transition-[color,box-shadow,border-color] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate [&_svg]:pointer-events-none [&_svg]:shrink-0"
      >
        <SelectValue :placeholder="selected?.dial ?? '+1'">
          {{ selected?.dial ?? "+1" }}
        </SelectValue>
        <SelectIcon as-child>
          <ChevronDown class="size-4 opacity-50" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent
          position="popper"
          align="center"
          :side-offset="4"
          class="z-50 max-h-72 w-60 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          <SelectViewport class="p-1">
            <SelectItem
              v-for="country in countries"
              :key="country.code"
              :value="country.code"
              :text-value="country.name"
              class="relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <span
                class="absolute right-2 flex size-3.5 items-center justify-center"
              >
                <SelectItemIndicator>
                  <Check class="size-4" />
                </SelectItemIndicator>
              </span>
              <span aria-hidden="true" class="text-base leading-none">
                {{ flagEmoji(country.code) }}
              </span>
              <span class="flex-1 truncate">{{ country.name }}</span>
              <span class="text-xs text-muted-foreground">
                {{ country.dial }}
              </span>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>

    <Input
      type="tel"
      inputmode="tel"
      autocomplete="tel-national"
      :model-value="current"
      :disabled="disabled"
      :aria-label="label"
      :placeholder="placeholder"
      class="rounded-l-none"
      @update:model-value="handleInput"
    />
  </div>
</template>
