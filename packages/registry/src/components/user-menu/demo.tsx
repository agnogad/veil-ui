"use client";

import { CreditCard, LifeBuoy } from "lucide-react";

import { UserMenu } from "./index";

export function UserMenuBasic() {
  return (
    <UserMenu
      name="Ada Lovelace"
      email="ada@example.com"
      onSignOut={() => {}}
    />
  );
}

export function UserMenuWithItems() {
  return (
    <UserMenu
      name="Mira Chen"
      email="mira@acme.dev"
      items={[
        { label: "Billing", href: "#billing", icon: <CreditCard /> },
        { label: "Support", href: "#support", icon: <LifeBuoy /> },
      ]}
      onSignOut={() => {}}
    />
  );
}
