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
