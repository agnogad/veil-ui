<script setup lang="ts">
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "./index";
</script>

<template>
  <div class="grid max-w-md gap-8">
    <DescriptionList class="max-w-sm">
      <div class="grid gap-1">
        <DescriptionTerm>License</DescriptionTerm>
        <DescriptionDetails>MIT, forever.</DescriptionDetails>
      </div>
      <div class="grid gap-1">
        <DescriptionTerm>Runtime wrappers</DescriptionTerm>
        <DescriptionDetails>
          None — components are copied as source.
        </DescriptionDetails>
      </div>
    </DescriptionList>
    <DescriptionList layout="inline">
      <DescriptionTerm>Components</DescriptionTerm>
      <DescriptionDetails>42 core primitives</DescriptionDetails>
      <DescriptionTerm>Blocks</DescriptionTerm>
      <DescriptionDetails>75 page sections planned</DescriptionDetails>
      <DescriptionTerm>Styling</DescriptionTerm>
      <DescriptionDetails>Tailwind CSS v4 tokens</DescriptionDetails>
    </DescriptionList>
  </div>
</template>
