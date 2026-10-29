<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./index";
</script>

<template>
  <Tabs default-value="account" class="max-w-md">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
      <TabsTrigger value="notifications">Notifications</TabsTrigger>
    </TabsList>
    <TabsContent value="account" class="rounded-lg border p-4 text-sm">
      Update your display name and public profile.
    </TabsContent>
    <TabsContent value="password" class="rounded-lg border p-4 text-sm">
      Choose a strong password you have not used before.
    </TabsContent>
    <TabsContent value="notifications" class="rounded-lg border p-4 text-sm">
      Pick which events should send you an email.
    </TabsContent>
  </Tabs>
</template>
