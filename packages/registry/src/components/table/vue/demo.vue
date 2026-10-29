<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./index";

const invoices = [
  { invoice: "INV-001", status: "Paid", method: "Credit card", amount: "$250.00" },
  { invoice: "INV-002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV-003", status: "Paid", method: "Bank transfer", amount: "$350.00" },
];
</script>

<template>
  <Table>
    <TableCaption>Recent invoices</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead class="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="invoice in invoices" :key="invoice.invoice">
        <TableCell class="font-medium">{{ invoice.invoice }}</TableCell>
        <TableCell>{{ invoice.status }}</TableCell>
        <TableCell>{{ invoice.method }}</TableCell>
        <TableCell class="text-right">{{ invoice.amount }}</TableCell>
      </TableRow>
      <TableRow data-state="selected">
        <TableCell>INV-004</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Credit card</TableCell>
        <TableCell class="text-right">$100.00</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colspan="3">Total</TableCell>
        <TableCell class="text-right">$850.00</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</template>
