import { PageShell } from "./index";

export function PageShellBasic() {
  return (
    <div className="h-72 w-full overflow-hidden rounded-md border">
      <PageShell
        header={<div className="py-3 text-sm font-medium">Site header</div>}
        footer={
          <div className="text-xs text-muted-foreground">© 2026 Veil UI</div>
        }
      >
        <h1 className="text-lg font-semibold">Page title</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Content is centered and constrained by the shell.
        </p>
      </PageShell>
    </div>
  );
}

export function PageShellNarrow() {
  return (
    <div className="h-64 w-full overflow-hidden rounded-md border">
      <PageShell size="sm" header={<div className="py-3 text-sm">Docs</div>}>
        <p className="text-sm text-muted-foreground">
          A narrow reading measure for documentation.
        </p>
      </PageShell>
    </div>
  );
}

export function PageShellFullWidth() {
  return (
    <div className="h-64 w-full overflow-hidden rounded-md border">
      <PageShell size="full" header={<div className="py-3 text-sm">App</div>}>
        <p className="text-sm text-muted-foreground">
          A full-width shell for dashboards and data tables.
        </p>
      </PageShell>
    </div>
  );
}
