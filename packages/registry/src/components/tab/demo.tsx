import { CreditCard, User } from "lucide-react";

import { Tab, TabContent, TabList, TabTrigger } from "./index";

export function TabBasic() {
  return (
    <Tab defaultValue="account" className="w-full max-w-sm">
      <TabList>
        <TabTrigger value="account">Account</TabTrigger>
        <TabTrigger value="password">Password</TabTrigger>
      </TabList>
      <TabContent value="account" className="p-2 text-sm">
        Update your account details.
      </TabContent>
      <TabContent value="password" className="p-2 text-sm">
        Change your password.
      </TabContent>
    </Tab>
  );
}

export function TabIcons() {
  return (
    <Tab defaultValue="account" className="w-full max-w-sm">
      <TabList>
        <TabTrigger value="account">
          <User aria-hidden />
          Account
        </TabTrigger>
        <TabTrigger value="billing">
          <CreditCard aria-hidden />
          Billing
        </TabTrigger>
      </TabList>
      <TabContent value="account" className="p-2 text-sm">
        Update your profile and email address.
      </TabContent>
      <TabContent value="billing" className="p-2 text-sm">
        Manage payment methods and invoices.
      </TabContent>
    </Tab>
  );
}
