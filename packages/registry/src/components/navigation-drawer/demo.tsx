import { NavigationDrawer } from "./index";

function Links() {
  return (
    <nav aria-label="Drawer" className="grid gap-1 text-sm">
      <a href="#overview" className="rounded-md px-2 py-1.5 hover:bg-accent">
        Overview
      </a>
      <a href="#components" className="rounded-md px-2 py-1.5 hover:bg-accent">
        Components
      </a>
      <a href="#settings" className="rounded-md px-2 py-1.5 hover:bg-accent">
        Settings
      </a>
    </nav>
  );
}

export function NavigationDrawerBasic() {
  return (
    <NavigationDrawer
      title="Navigation"
      trigger={
        <button
          type="button"
          className="rounded-md border px-3 py-1.5 text-sm font-medium"
        >
          Open drawer
        </button>
      }
    >
      <Links />
    </NavigationDrawer>
  );
}

export function NavigationDrawerRight() {
  return (
    <NavigationDrawer
      side="right"
      title="Filters"
      description="Narrow the list by status and owner."
      trigger={
        <button
          type="button"
          className="rounded-md border px-3 py-1.5 text-sm font-medium"
        >
          Open filters
        </button>
      }
    >
      <Links />
    </NavigationDrawer>
  );
}
