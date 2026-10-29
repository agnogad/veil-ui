import { Check, Minus } from "lucide-react";
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

interface ComparisonPlan {
  name: string;
  price?: React.ReactNode;
}

interface ComparisonRow {
  feature: string;
  values: (boolean | string)[];
}

interface ComparisonTableProps extends React.ComponentProps<"table"> {
  plans: ComparisonPlan[];
  rows: ComparisonRow[];
  caption?: string;
}

function ComparisonTable({
  className,
  plans,
  rows,
  caption,
  ...props
}: ComparisonTableProps) {
  return (
    <Table data-slot="comparison-table" className={cn(className)} {...props}>
      {caption ? (
        <caption className="mb-3 text-left text-sm font-medium">{caption}</caption>
      ) : null}
      <TableHeader>
        <TableRow>
          <TableHead>Feature</TableHead>
          {plans.map((plan) => (
            <TableHead key={plan.name} className="text-center">
              <span className="block font-medium text-foreground">{plan.name}</span>
              {plan.price ? (
                <span className="block text-xs font-normal text-muted-foreground">
                  {plan.price}
                </span>
              ) : null}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.feature}>
            <TableCell className="font-medium">{row.feature}</TableCell>
            {plans.map((plan, index) => {
              const value = row.values[index];
              return (
                <TableCell key={plan.name} className="text-center">
                  {typeof value === "boolean" ? (
                    value ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <Check className="size-4" aria-hidden />
                        <span className="sr-only">Included</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Minus className="size-4" aria-hidden />
                        <span className="sr-only">Not included</span>
                      </span>
                    )
                  ) : (
                    value
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { ComparisonTable, type ComparisonPlan, type ComparisonRow };
