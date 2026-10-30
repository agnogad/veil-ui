<script setup lang="ts">
import { QRCode } from "./index";
</script>

<template>
  <div class="flex flex-wrap items-start gap-6">
    <QRCode value="https://veil-ui.dev" />
    <QRCode
      value="https://veil-ui.dev/docs/components/qrcode"
      label="Documentation link"
      caption="Scan to open the QR code documentation."
      level="H"
      :size="128"
    />
  </div>
</template>
