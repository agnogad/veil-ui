import { AppShell } from "./index";

function Sidebar() {
  return (
    <nav aria-label="Main" className="grid gap-1 p-3 text-sm">
      {["Overview", "Projects", "Settings"].map((item, index) => (
        <span
          key={item}
          className={
            index === 0
              ? "rounded-md bg-muted px-2 py-1.5 font-medium"
              : "rounded-md px-2 py-1.5 text-muted-foreground"
          }
        >
          {item}
        </span>
      ))}
    </nav>
  );
}

function Header() {
  return (
    <div className="flex h-12 items-center px-4 text-sm font-medium">
      Workspace
    </div>
  );
}

export function AppShellBasic() {
  return (
    <div className="h-72 w-full overflow-hidden rounded-md border">
      <AppShell sidebar={<Sidebar />} header={<Header />}>
        <div className="p-4 text-sm text-muted-foreground">
          Main content area.
        </div>
      </AppShell>
    </div>
  );
}

export function AppShellHeader() {
  return (
    <div className="h-64 w-full overflow-hidden rounded-md border">
      <AppShell
        header={
          <div className="flex h-12 items-center justify-between px-4">
            <span className="text-sm font-medium">Dashboard</span>
            <span className="text-xs text-muted-foreground">3 updates</span>
          </div>
        }
      >
        <div className="grid gap-2 p-4 text-sm text-muted-foreground">
          <p>No sidebar in this variant.</p>
        </div>
      </AppShell>
    </div>
  );
}

export function AppShellSidebarWidth() {
  return (
    <div className="h-64 w-full overflow-hidden rounded-md border">
      <AppShell
        sidebar={<Sidebar />}
        sidebarWidth="lg"
        header={<Header />}
      >
        <div className="p-4 text-sm text-muted-foreground">
          A wider sidebar for dense navigation.
        </div>
      </AppShell>
    </div>
  );
}
