"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { HTMLInputTypeAttribute } from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { Input } from "../input/index";

interface RepeaterField {
  name: string;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

type RepeaterRow = Record<string, string>;

interface FormRepeaterProps {
  fields: RepeaterField[];
  defaultValue?: RepeaterRow[];
  onChange?: (rows: RepeaterRow[]) => void;
  addLabel?: string;
  /** Minimum number of rows that must remain. */
  min?: number;
  /** Maximum number of rows allowed. */
  max?: number;
  disabled?: boolean;
  className?: string;
}

function emptyRow(fields: RepeaterField[]): RepeaterRow {
  return Object.fromEntries(fields.map((field) => [field.name, ""]));
}

function FormRepeater({
  fields,
  defaultValue,
  onChange,
  addLabel = "Add row",
  min = 1,
  max,
  disabled = false,
  className,
}: FormRepeaterProps) {
  const [rows, setRows] = useState<RepeaterRow[]>(
    defaultValue && defaultValue.length > 0
      ? defaultValue
      : [emptyRow(fields)],
  );

  function update(next: RepeaterRow[]) {
    setRows(next);
    onChange?.(next);
  }

  function setValue(index: number, name: string, value: string) {
    update(
      rows.map((row, position) =>
        position === index ? { ...row, [name]: value } : row,
      ),
    );
  }

  const canRemove = rows.length > min;
  const canAdd = max === undefined || rows.length < max;

  return (
    <div
      data-slot="form-repeater"
      className={cn("flex flex-col gap-3", className)}
    >
      {rows.map((row, index) => (
        <div
          key={index}
          className="rounded-lg border bg-card p-3 text-card-foreground"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Row {index + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-7"
              aria-label={`Remove row ${index + 1}`}
              disabled={disabled || !canRemove}
              onClick={() => update(rows.filter((_, position) => position !== index))}
            >
              <Trash2 aria-hidden />
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map((field) => (
              <label
                key={field.name}
                className="flex flex-col gap-1 text-xs font-medium text-muted-foreground"
              >
                <span>{field.label}</span>
                <Input
                  type={field.type ?? "text"}
                  value={row[field.name] ?? ""}
                  placeholder={field.placeholder}
                  aria-label={`${field.label} row ${index + 1}`}
                  disabled={disabled}
                  onChange={(event) =>
                    setValue(index, field.name, event.target.value)
                  }
                />
              </label>
            ))}
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="w-fit"
        disabled={disabled || !canAdd}
        onClick={() => update([...rows, emptyRow(fields)])}
      >
        <Plus aria-hidden />
        {addLabel}
      </Button>
    </div>
  );
}

export { FormRepeater, type RepeaterField, type RepeaterRow };
