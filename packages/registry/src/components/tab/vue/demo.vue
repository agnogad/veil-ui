<script setup lang="ts">
import { CreditCard, User } from "lucide-vue-next";

import { Tab, TabContent, TabList, TabTrigger } from "./index";
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <Tab default-value="account">
      <TabList>
        <TabTrigger value="account">Account</TabTrigger>
        <TabTrigger value="password">Password</TabTrigger>
      </TabList>
      <TabContent value="account" class="p-2 text-sm">
        Update your account details.
      </TabContent>
      <TabContent value="password" class="p-2 text-sm">
        Change your password.
      </TabContent>
    </Tab>

    <Tab default-value="account">
      <TabList class="w-full">
        <TabTrigger value="account">
          <User aria-hidden="true" />
          Account
        </TabTrigger>
        <TabTrigger value="billing">
          <CreditCard aria-hidden="true" />
          Billing
        </TabTrigger>
      </TabList>
      <TabContent value="account" class="p-2 text-sm">
        Update your profile and email address.
      </TabContent>
      <TabContent value="billing" class="p-2 text-sm">
        Manage payment methods and invoices.
      </TabContent>
    </Tab>
  </div>
</template>
