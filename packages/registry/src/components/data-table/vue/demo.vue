<script setup lang="ts">
import { Badge } from "@/components/ui/badge";

import { DataTable } from "./index";
import type { DataTableColumn } from "./types";

const columns: DataTableColumn[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "status", header: "Status" },
  { key: "role", header: "Role", sortable: true },
  { key: "lastActive", header: "Last active", align: "right", sortable: true },
];

const data = [
  { name: "Mira Chen", status: "Active", role: "Owner", lastActive: "2 min ago" },
  { name: "Owen Park", status: "Active", role: "Admin", lastActive: "1 hour ago" },
  { name: "Lena Ortiz", status: "Invited", role: "Editor", lastActive: "Yesterday" },
  { name: "Sam Rivera", status: "Active", role: "Viewer", lastActive: "3 days ago" },
];
</script>

<template>
  <DataTable :columns="columns" :data="data" caption="Team members" class="max-w-2xl">
    <template #cell-status="{ row }">
      <Badge :variant="row.status === 'Active' ? 'secondary' : 'outline'">
        {{ row.status }}
      </Badge>
    </template>
  </DataTable>
</template>
