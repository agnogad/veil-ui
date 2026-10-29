"use client";

import { useState } from "react";

import { cn } from "@veil-ui/utils";

import { CountrySelect } from "../country-select/index";
import { Input } from "../input/index";

interface PhoneInputProps {
  /** National phone number, without the dial code. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Selected country ISO code. */
  country?: string;
  defaultCountry?: string;
  onCountryChange?: (code: string) => void;
  placeholder?: string;
  /** Accessible name for the number input. */
  label?: string;
  disabled?: boolean;
  className?: string;
}

function PhoneInput({
  value,
  defaultValue = "",
  onValueChange,
  country,
  defaultCountry = "US",
  onCountryChange,
  placeholder = "555 123 4567",
  label = "Phone number",
  disabled = false,
  className,
}: PhoneInputProps) {
  const [internal, setInternal] = useState(defaultValue);
  const [internalCountry, setInternalCountry] = useState(defaultCountry);
  const current = value ?? internal;
  const currentCountry = country ?? internalCountry;

  return (
    <div
      data-slot="phone-input"
      className={cn("flex w-full max-w-sm items-center", className)}
    >
      <CountrySelect
        label="Country code"
        display="dial"
        value={currentCountry}
        onValueChange={(code) => {
          if (country === undefined) setInternalCountry(code);
          onCountryChange?.(code);
        }}
        disabled={disabled}
        className="w-28 shrink-0 rounded-r-none border-r-0"
      />
      <Input
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={current}
        disabled={disabled}
        aria-label={label}
        placeholder={placeholder}
        onChange={(event) => {
          const next = event.target.value.replace(/[^\d\s()-]/g, "");
          if (value === undefined) setInternal(next);
          onValueChange?.(next);
        }}
        className="rounded-l-none"
      />
    </div>
  );
}

export { PhoneInput };
