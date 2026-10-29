import { SidebarLayout } from "./index";

const navItems = ["Introduction", "Installation", "Theming"];

export function SidebarLayoutBasic() {
  return (
    <div className="w-full rounded-md border p-2">
      <SidebarLayout
        sidebar={
          <nav aria-label="Docs" className="grid gap-1 text-sm">
            {navItems.map((item, index) => (
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
        }
      >
        <h2 className="text-lg font-semibold">Introduction</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The content column flows next to a sticky sidebar.
        </p>
      </SidebarLayout>
    </div>
  );
}

export function SidebarLayoutHeader() {
  return (
    <div className="w-full rounded-md border p-2">
      <SidebarLayout
        header={<h2 className="text-lg font-semibold">Theming</h2>}
        sidebar={
          <nav aria-label="Docs" className="grid gap-1 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <span key={item} className="rounded-md px-2 py-1.5">
                {item}
              </span>
            ))}
          </nav>
        }
      >
        <p className="text-sm text-muted-foreground">
          Use the header slot for the page title and actions.
        </p>
      </SidebarLayout>
    </div>
  );
}

export function SidebarLayoutSidebarEnd() {
  return (
    <div className="w-full rounded-md border p-2">
      <SidebarLayout
        sidebarPosition="end"
        sidebarSize="sm"
        sidebar={
          <div className="rounded-md border bg-muted/20 p-3 text-sm">
            On this page
          </div>
        }
      >
        <p className="text-sm text-muted-foreground">
          End-aligned asides work well for table-of-contents panes.
        </p>
      </SidebarLayout>
    </div>
  );
}
