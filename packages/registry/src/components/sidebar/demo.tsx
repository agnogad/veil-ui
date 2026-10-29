import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
} from "./index";

export function SidebarBasic() {
  return (
    <Sidebar className="h-80 rounded-md border">
      <SidebarHeader className="text-sm font-semibold">Veil UI</SidebarHeader>
      <SidebarContent>
        <SidebarItem href="#overview" active>
          Overview
        </SidebarItem>
        <SidebarItem href="#components">Components</SidebarItem>
      </SidebarContent>
    </Sidebar>
  );
}

export function SidebarGroups() {
  return (
    <Sidebar className="h-80 rounded-md border">
      <SidebarHeader className="text-sm font-semibold">Acme</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarItem href="#projects" active>
            Projects
          </SidebarItem>
          <SidebarItem href="#members">Members</SidebarItem>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarItem href="#settings">Settings</SidebarItem>
          <SidebarItem href="#billing">Billing</SidebarItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-xs text-muted-foreground">
        v0.1.0
      </SidebarFooter>
    </Sidebar>
  );
}
