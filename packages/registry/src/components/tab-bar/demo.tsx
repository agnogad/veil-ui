import { TabBar, TabBarContent, TabBarItem, TabBarList } from "./index";

export function TabBarBasic() {
  return (
    <TabBar defaultValue="overview" className="w-full max-w-sm">
      <TabBarList className="w-full">
        <TabBarItem value="overview">Overview</TabBarItem>
        <TabBarItem value="activity">Activity</TabBarItem>
        <TabBarItem value="settings">Settings</TabBarItem>
      </TabBarList>
      <TabBarContent value="overview" className="p-2 text-sm">
        Project overview.
      </TabBarContent>
      <TabBarContent value="activity" className="p-2 text-sm">
        Recent activity.
      </TabBarContent>
      <TabBarContent value="settings" className="p-2 text-sm">
        Project settings.
      </TabBarContent>
    </TabBar>
  );
}
