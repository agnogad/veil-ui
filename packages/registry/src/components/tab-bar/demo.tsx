import { CircleDot, LayoutGrid } from "lucide-react";

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

export function TabBarIcons() {
  return (
    <TabBar defaultValue="overview" className="w-full max-w-sm">
      <TabBarList className="w-full">
        <TabBarItem value="overview">
          <LayoutGrid aria-hidden />
          Overview
        </TabBarItem>
        <TabBarItem value="activity">
          <CircleDot aria-hidden />
          Activity
        </TabBarItem>
      </TabBarList>
      <TabBarContent value="overview" className="p-2 text-sm">
        Health, members and recent deploys.
      </TabBarContent>
      <TabBarContent value="activity" className="p-2 text-sm">
        Events from the last 24 hours.
      </TabBarContent>
    </TabBar>
  );
}
