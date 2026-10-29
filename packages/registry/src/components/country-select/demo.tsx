"use client";

import { useState } from "react";

import { CountrySelect } from "./index";

export function CountrySelectBasic() {
  const [country, setCountry] = useState("TR");

  return (
    <div className="flex flex-col gap-3">
      <CountrySelect value={country} onValueChange={setCountry} />
      <p className="text-sm text-muted-foreground">Selected code: {country}</p>
    </div>
  );
}

export function CountrySelectControlled() {
  return (
    <CountrySelect
      label="Shipping country"
      defaultValue="DE"
      onValueChange={() => {}}
    />
  );
}

export function CountrySelectDialCode() {
  return (
    <CountrySelect
      label="Calling code"
      display="dial"
      defaultValue="US"
      className="w-28"
    />
  );
}
