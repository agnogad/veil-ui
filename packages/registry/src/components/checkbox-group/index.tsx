"use client";

import { useId, useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Checkbox } from "../checkbox/index";
import { Label } from "../label/index";

interface CheckboxGroupOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

interface CheckboxGroupProps
  extends Omit<React.ComponentProps<"fieldset">, "onChange" | "defaultValue"> {
  options: CheckboxGroupOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  label?: React.ReactNode;
}

function CheckboxGroup({
  options,
  value,
  defaultValue = [],
  onValueChange,
  label,
  className,
  ...props
}: CheckboxGroupProps) {
  const id = useId();
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const selected = value ?? internal;
  const isControlled = value !== undefined;

  function toggle(optionValue: string, checked: boolean | "indeterminate") {
    const next = checked
      ? [...selected, optionValue]
      : selected.filter((item) => item !== optionValue);

    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  return (
    <fieldset
      data-slot="checkbox-group"
      className={cn("grid gap-3", className)}
      {...props}
    >
      {label ? (
        <legend className="mb-1 text-sm font-medium">{label}</legend>
      ) : null}
      {options.map((option) => {
        const optionId = `${id}-${option.value}`;
        return (
          <div key={option.value} className="flex items-start gap-2">
            <Checkbox
              id={optionId}
              checked={selected.includes(option.value)}
              disabled={option.disabled}
              onCheckedChange={(checked) => toggle(option.value, checked)}
              className="mt-0.5"
            />
            <div className="grid gap-0.5">
              <Label htmlFor={optionId}>{option.label}</Label>
              {option.description ? (
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
    </fieldset>
  );
}

export { CheckboxGroup };
export type { CheckboxGroupOption, CheckboxGroupProps };
