"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";

interface Country {
  code: string;
  name: string;
  dial: string;
}

const countries: Country[] = [
  { code: "US", name: "United States", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "TR", name: "Turkey", dial: "+90" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "AT", name: "Austria", dial: "+43" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "NO", name: "Norway", dial: "+47" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "FI", name: "Finland", dial: "+358" },
  { code: "IE", name: "Ireland", dial: "+353" },
  { code: "PL", name: "Poland", dial: "+48" },
  { code: "CZ", name: "Czechia", dial: "+420" },
  { code: "GR", name: "Greece", dial: "+30" },
  { code: "RU", name: "Russia", dial: "+7" },
  { code: "UA", name: "Ukraine", dial: "+380" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "KR", name: "South Korea", dial: "+82" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "NZ", name: "New Zealand", dial: "+64" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "IL", name: "Israel", dial: "+972" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "VN", name: "Vietnam", dial: "+84" },
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "KE", name: "Kenya", dial: "+254" },
  { code: "GH", name: "Ghana", dial: "+233" },
  { code: "MA", name: "Morocco", dial: "+212" },
];

function flagEmoji(code: string) {
  return code.replace(
    /./g,
    (char) => String.fromCodePoint(127397 + char.charCodeAt(0)),
  );
}

interface CountrySelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (code: string) => void;
  /** Override the built-in country list. */
  countries?: Country[];
  placeholder?: string;
  /** Accessible name for the trigger. */
  label?: string;
  /** Show the full name or just the dial code on the trigger. */
  display?: "name" | "dial";
  disabled?: boolean;
  className?: string;
}

function CountrySelect({
  value,
  defaultValue,
  onValueChange,
  countries: options = countries,
  placeholder = "Select a country",
  label = "Country",
  display = "name",
  disabled = false,
  className,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<string | undefined>(defaultValue);
  const current = value ?? internal;
  const isControlled = value !== undefined;
  const selected = options.find((country) => country.code === current);

  function select(code: string) {
    if (!isControlled) setInternal(code);
    onValueChange?.(code);
    setOpen(false);
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-label={label}
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "justify-between gap-2 font-normal",
            display === "name" && "w-60",
            !selected && "text-muted-foreground",
            className,
          )}
        >
          <span className="flex min-w-0 items-center gap-2 truncate">
            {selected && (
              <span aria-hidden className="text-base leading-none">
                {flagEmoji(selected.code)}
              </span>
            )}
            {selected
              ? display === "name"
                ? selected.name
                : selected.dial
              : placeholder}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="country-select-content"
          aria-label={label}
          align="start"
          sideOffset={4}
          className="z-50 w-60 rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none"
        >
          <Command label="Search countries" className="flex flex-col">
            <Command.Input
              placeholder="Search countries..."
              className="h-9 w-full border-b bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <Command.List className="max-h-64 overflow-y-auto p-1">
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                No country found.
              </Command.Empty>
              {options.map((country) => (
                <Command.Item
                  key={country.code}
                  value={`${country.name} ${country.code}`}
                  onSelect={() => select(country.code)}
                  className="flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                >
                  <span aria-hidden className="text-base leading-none">
                    {flagEmoji(country.code)}
                  </span>
                  <span className="flex-1 truncate">{country.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {country.dial}
                  </span>
                  {current === country.code && (
                    <Check className="size-4" aria-hidden />
                  )}
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export { CountrySelect, countries, flagEmoji, type Country };
