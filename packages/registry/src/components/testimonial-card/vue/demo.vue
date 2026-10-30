<script setup lang="ts">
import { TestimonialCard } from "./index";
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <TestimonialCard
      quote="The registry approach removed an entire dependency from our stack. We ship faster and own every line."
      name="Lena Ortiz"
      role="Design director"
      :rating="5"
    />
    <TestimonialCard
      quote="Accessible primitives with no runtime to upgrade. Exactly what our team needed."
      name="Owen Park"
      role="Engineering lead"
      :rating="4"
    />
  </div>
</template>
