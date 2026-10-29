<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TableCell } from "./index";
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead class="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell class="font-medium">INV-2041</TableCell>
        <TableCell>
          <Badge variant="secondary">Paid</Badge>
        </TableCell>
        <TableCell class="text-right tabular-nums">$240.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell class="font-medium">INV-2042</TableCell>
        <TableCell>
          <Badge variant="outline">Pending</Badge>
        </TableCell>
        <TableCell class="text-right tabular-nums">$1,120.00</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
