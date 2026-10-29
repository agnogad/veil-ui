"use client";

import { useState } from "react";

import { PhoneInput } from "./index";

export function PhoneInputBasic() {
  const [phone, setPhone] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <PhoneInput
        value={phone}
        onValueChange={setPhone}
        defaultCountry="TR"
      />
      <p className="text-sm text-muted-foreground">
        {phone ? `Number: ${phone}` : "No number entered"}
      </p>
    </div>
  );
}

export function PhoneInputCountryChange() {
  const [country, setCountry] = useState("GB");

  return (
    <div className="flex flex-col gap-3">
      <PhoneInput country={country} onCountryChange={setCountry} />
      <p className="text-sm text-muted-foreground">Country: {country}</p>
    </div>
  );
}

export function PhoneInputDisabled() {
  return <PhoneInput disabled defaultValue="555 0100" />;
}
