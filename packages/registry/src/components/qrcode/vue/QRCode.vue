<script setup lang="ts">
import { computed } from "vue";

import qrcode from "qrcode-generator";

import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    value: string;
    size?: number;
    level?: "L" | "M" | "Q" | "H";
    label?: string;
    caption?: string;
    bgColor?: string;
    fgColor?: string;
    class?: string;
  }>(),
  { size: 160, level: "M", bgColor: "#ffffff", fgColor: "#000000" },
);

const matrix = computed(() => {
  const generator = qrcode(0, props.level);
  generator.addData(props.value);
  generator.make();
  const count = generator.getModuleCount();
  const cells: Array<[number, number]> = [];

  for (let row = 0; row < count; row += 1) {
    for (let column = 0; column < count; column += 1) {
      if (generator.isDark(row, column)) cells.push([column, row]);
    }
  }

  return { count, cells };
});
</script>

<template>
  <figure
    data-slot="qrcode"
    :class="cn('inline-flex flex-col items-center gap-2', props.class)"
  >
    <div class="rounded-lg p-2" :style="{ backgroundColor: bgColor }">
      <svg
        :width="size"
        :height="size"
        :viewBox="`0 0 ${matrix.count} ${matrix.count}`"
        shape-rendering="crispEdges"
        role="img"
        :aria-label="label ?? value"
      >
        <title>{{ label ?? value }}</title>
        <rect
          v-for="([x, y], index) in matrix.cells"
          :key="index"
          :x="x"
          :y="y"
          width="1"
          height="1"
          :fill="fgColor"
        />
      </svg>
    </div>
    <figcaption
      v-if="caption"
      class="max-w-[16rem] text-center text-xs text-muted-foreground"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>
