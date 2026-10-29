<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

import { TableRow } from "./index";
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Member</TableHead>
        <TableHead>Role</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Mira Chen</TableCell>
        <TableCell>Owner</TableCell>
      </TableRow>
      <TableRow data-state="selected">
        <TableCell>Ada Lovelace</TableCell>
        <TableCell>Admin</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Grace Hopper</TableCell>
        <TableCell>Member</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
