"use client";

import { useState } from "react";

import { FormRepeater, type RepeaterRow } from "./index";

const contactFields = [
  { name: "name", label: "Name", placeholder: "Ada Lovelace" },
  { name: "email", label: "Email", type: "email" as const, placeholder: "ada@example.com" },
];

export function FormRepeaterBasic() {
  const [rows, setRows] = useState<RepeaterRow[]>([{ name: "", email: "" }]);

  return (
    <div className="flex max-w-xl flex-col gap-3">
      <FormRepeater fields={contactFields} defaultValue={rows} onChange={setRows} />
      <p className="text-sm text-muted-foreground">{rows.length} contact(s)</p>
    </div>
  );
}

export function FormRepeaterLimited() {
  return (
    <FormRepeater
      className="max-w-xl"
      fields={contactFields}
      min={1}
      max={3}
      addLabel="Add contact"
      onChange={() => {}}
    />
  );
}

export function FormRepeaterDisabled() {
  return (
    <FormRepeater
      className="max-w-xl"
      fields={contactFields}
      defaultValue={[{ name: "Ada Lovelace", email: "ada@example.com" }]}
      disabled
    />
  );
}
