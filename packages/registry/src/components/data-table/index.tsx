"use client";

import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/index";

interface DataTableColumn<T> {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  cell?: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
}

interface DataTableProps<T> extends React.ComponentProps<"div"> {
  columns: DataTableColumn<T>[];
  data: T[];
  caption?: string;
  emptyMessage?: string;
  getRowKey?: (row: T, index: number) => React.Key;
}

type SortState = { key: string; direction: "asc" | "desc" } | null;

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function DataTable<T extends Record<string, unknown>>({
  className,
  columns,
  data,
  caption,
  emptyMessage = "No results.",
  getRowKey,
  ...props
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState>(null);

  const sorted = [...data];
  if (sort) {
    const column = columns.find((item) => item.key === sort.key);
    sorted.sort((a, b) => {
      const valueA = column?.sortValue ? column.sortValue(a) : a[sort.key];
      const valueB = column?.sortValue ? column.sortValue(b) : b[sort.key];
      const result = String(valueA).localeCompare(String(valueB), undefined, {
        numeric: true,
      });
      return sort.direction === "asc" ? result : -result;
    });
  }

  function toggleSort(key: string) {
    setSort((current) => {
      if (current?.key !== key) return { key, direction: "asc" };
      return current.direction === "asc" ? { key, direction: "desc" } : null;
    });
  }

  return (
    <div data-slot="data-table" className={cn("w-full", className)} {...props}>
      <Table>
        {caption ? <caption className="mb-3 text-left text-sm font-medium">{caption}</caption> : null}
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              const active = sort?.key === column.key;
              const SortIcon = !active
                ? ChevronsUpDown
                : sort?.direction === "asc"
                  ? ArrowUp
                  : ArrowDown;
              return (
                <TableHead
                  key={column.key}
                  aria-sort={
                    active
                      ? sort?.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : column.sortable
                        ? "none"
                        : undefined
                  }
                  className={alignClass[column.align ?? "left"]}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(column.key)}
                      className="inline-flex items-center gap-1 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {column.header}
                      <SortIcon className="size-3.5" aria-hidden />
                    </button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-8 text-center text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            sorted.map((row, index) => (
              <TableRow key={getRowKey ? getRowKey(row, index) : index}>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={alignClass[column.align ?? "left"]}
                  >
                    {column.cell ? column.cell(row) : String(row[column.key] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export { DataTable, type DataTableColumn, type DataTableProps };
