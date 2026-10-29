import { Bell, Home, Settings, User } from "lucide-react";

import {
  MobileTabBar,
  MobileTabBarContent,
  MobileTabBarItem,
  MobileTabBarList,
} from "./index";

export function MobileTabBarBasic() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border">
      <MobileTabBar defaultValue="home">
        <MobileTabBarContent value="home" className="p-4 text-sm">
          Home feed
        </MobileTabBarContent>
        <MobileTabBarContent value="alerts" className="p-4 text-sm">
          Alerts
        </MobileTabBarContent>
        <MobileTabBarContent value="profile" className="p-4 text-sm">
          Profile
        </MobileTabBarContent>
        <MobileTabBarList className="grid h-14 grid-cols-3 rounded-none border-t bg-background">
          <MobileTabBarItem value="home" className="flex-col gap-1 text-[10px]">
            <Home className="size-4" aria-hidden /> Home
          </MobileTabBarItem>
          <MobileTabBarItem value="alerts" className="flex-col gap-1 text-[10px]">
            <Bell className="size-4" aria-hidden /> Alerts
          </MobileTabBarItem>
          <MobileTabBarItem value="profile" className="flex-col gap-1 text-[10px]">
            <User className="size-4" aria-hidden /> Profile
          </MobileTabBarItem>
        </MobileTabBarList>
      </MobileTabBar>
    </div>
  );
}

export function MobileTabBarSettings() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border">
      <MobileTabBar defaultValue="home">
        <MobileTabBarContent value="home" className="p-4 text-sm">
          Home feed
        </MobileTabBarContent>
        <MobileTabBarContent value="settings" className="p-4 text-sm">
          Settings
        </MobileTabBarContent>
        <MobileTabBarList className="grid h-14 grid-cols-2 rounded-none border-t bg-background">
          <MobileTabBarItem value="home" className="flex-col gap-1 text-[10px]">
            <Home className="size-4" aria-hidden /> Home
          </MobileTabBarItem>
          <MobileTabBarItem
            value="settings"
            className="flex-col gap-1 text-[10px]"
          >
            <Settings className="size-4" aria-hidden /> Settings
          </MobileTabBarItem>
        </MobileTabBarList>
      </MobileTabBar>
    </div>
  );
}
