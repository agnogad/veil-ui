<script setup lang="ts">
import { AlertTriangle, Sparkles } from "lucide-vue-next";
import { ref } from "vue";

import { Button } from "@/components/ui/button";

import {
  Banner,
  BannerActions,
  BannerClose,
  BannerContent,
  BannerDescription,
  BannerIcon,
  BannerTitle,
} from "./index";

const visible = ref(true);
</script>

<template>
  <div class="grid w-full max-w-lg gap-3">
    <Button
      v-if="!visible"
      variant="outline"
      size="sm"
      class="w-fit"
      @click="visible = true"
    >
      Show banner
    </Button>
    <Banner v-else class="w-full">
      <BannerIcon>
        <Sparkles />
      </BannerIcon>
      <BannerContent>
        <BannerTitle>New registry build</BannerTitle>
        <BannerDescription>
          Components are now generated from a single source of truth.
        </BannerDescription>
        <BannerActions>
          <Button size="sm">Add payment method</Button>
          <Button size="sm" variant="ghost">Compare plans</Button>
        </BannerActions>
      </BannerContent>
      <BannerClose @click="visible = false" />
    </Banner>
    <Banner variant="destructive" role="alert" class="w-full">
      <BannerIcon>
        <AlertTriangle />
      </BannerIcon>
      <BannerContent>
        <BannerTitle>Deployment failed</BannerTitle>
        <BannerDescription>
          The build exited with code 1. Check the logs for details.
        </BannerDescription>
      </BannerContent>
    </Banner>
  </div>
</template>
