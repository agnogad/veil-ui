import { Navbar } from "./index";

export function NavbarBasic() {
  return (
    <Navbar className="rounded-md border">
      <span className="text-sm font-semibold">Veil UI</span>
      <nav aria-label="Main" className="ml-auto flex items-center gap-4 text-sm">
        <a href="/docs" className="text-muted-foreground hover:text-foreground">
          Docs
        </a>
        <a href="/components" className="text-muted-foreground hover:text-foreground">
          Components
        </a>
      </nav>
    </Navbar>
  );
}

export function NavbarSticky() {
  return (
    <div className="relative h-40 overflow-hidden rounded-md border">
      <Navbar sticky className="border-x-0 border-t-0">
        <span className="text-sm font-semibold">Sticky bar</span>
        <span className="ml-auto text-xs text-muted-foreground">
          Stays at the top while the page scrolls
        </span>
      </Navbar>
      <div className="h-64 bg-muted/30 p-4 text-xs text-muted-foreground">
        Scrollable content area
      </div>
    </div>
  );
}
