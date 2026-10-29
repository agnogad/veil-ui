<script setup lang="ts">
import { DownloadButton } from "./index";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <DownloadButton href="/files/veil-ui.pdf">Download PDF</DownloadButton>
    <DownloadButton href="/files/export.csv" download="export.csv">
      Export CSV
    </DownloadButton>
    <DownloadButton href="/files/report.pdf" variant="outline">
      Report
    </DownloadButton>
  </div>
</template>
