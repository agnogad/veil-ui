<script setup lang="ts">
import { ref } from "vue";

import { Lightbox } from "@/components/ui/lightbox";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
}

const props = withDefaults(
  defineProps<{
    images: GalleryImage[];
    columns?: 2 | 3 | 4;
    class?: string;
    label?: string;
  }>(),
  { columns: 3, label: "Image gallery" },
);

const columnsClass = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

const open = ref(false);
const index = ref(0);

function select(imageIndex: number) {
  index.value = imageIndex;
  open.value = true;
}
</script>

<template>
  <div data-slot="image-gallery" :class="cn('w-full', props.class)">
    <ul
      :aria-label="label"
      :class="cn('grid grid-cols-2 gap-2', columnsClass[columns])"
    >
      <li v-for="(image, imageIndex) in images" :key="image.src">
        <button
          type="button"
          :aria-label="`Open ${image.alt}`"
          class="group block w-full overflow-hidden rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
          @click="select(imageIndex)"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            loading="lazy"
            class="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </button>
      </li>
    </ul>
    <Lightbox
      :images="images"
      :index="index"
      :open="open"
      :label="label"
      @update:open="open = $event"
      @update:index="index = $event"
    />
  </div>
</template>
