<script setup lang="ts">
import { ProductCard } from "./index";
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <ProductCard
      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
      alt="Minimal wristwatch"
      name="Field watch"
      :price="129"
      :original-price="159"
      :rating="4.6"
      :review-count="128"
      badge="Sale"
    />
    <ProductCard
      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"
      alt="Studio headphones"
      name="Studio headphones"
      :price="249"
      :rating="4.8"
      :review-count="84"
    />
  </div>
</template>
