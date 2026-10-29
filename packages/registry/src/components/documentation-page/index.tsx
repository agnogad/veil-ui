import { AlertTriangle, ArrowRight, BookOpen, ChevronRight, FileText, Info, Settings, Terminal } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Alert, AlertDescription, AlertTitle } from "../alert/index";
import { Badge } from "../badge/index";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../breadcrumb/index";
import { Button } from "../button/index";
import { CodeBlock } from "../code-block/index";
import { Input } from "../input/index";
import { Kbd } from "../kbd/index";
import { Logo } from "../logo/index";
import { Navbar } from "../navbar/index";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
} from "../sidebar/index";
import { TableOfContents } from "../table-of-contents/index";

const installCode = `pnpm dlx veil-ui add button card dialog

# or with npm
npx veil-ui add button card dialog`;

const usageCode = `import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <Button variant="outline" size="sm">
      Save changes
    </Button>
  );
}`;

function DocumentationPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="documentation-page"
      className={cn("w-full overflow-hidden rounded-xl border bg-background", className)}
      {...props}
    >
      <Navbar>
        <Logo
          name="Veil UI"
          size="sm"
          mark={
            <span className="grid size-full place-items-center bg-primary text-[10px] font-bold text-primary-foreground">
              V
            </span>
          }
        />
        <Badge variant="muted" className="ml-2">
          v2.0
        </Badge>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <Input
              type="search"
              placeholder="Search documentation…"
              aria-label="Search documentation"
              className="h-8 w-56"
            />
            <Kbd>⌘K</Kbd>
          </div>
          <Button variant="ghost" size="sm">
            GitHub
          </Button>
        </div>
      </Navbar>

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[220px_1fr_200px]">
        <nav aria-label="Documentation" className="hidden lg:block">
          <SidebarGroup>
            <SidebarGroupLabel>Getting started</SidebarGroupLabel>
            <SidebarItem href="#introduction">
              <BookOpen /> Introduction
            </SidebarItem>
            <SidebarItem href="#installation" active>
              <Terminal /> Installation
            </SidebarItem>
            <SidebarItem href="#configuration">
              <Settings /> Configuration
            </SidebarItem>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Components</SidebarGroupLabel>
            <SidebarItem href="#button">
              Button <ChevronRight className="ml-auto size-3.5" aria-hidden />
            </SidebarItem>
            <SidebarItem href="#card">Card</SidebarItem>
            <SidebarItem href="#dialog">Dialog</SidebarItem>
            <SidebarItem href="#data-table">Data table</SidebarItem>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Guides</SidebarGroupLabel>
            <SidebarItem href="#theming">
              <FileText /> Theming
            </SidebarItem>
            <SidebarItem href="#accessibility">Accessibility</SidebarItem>
          </SidebarGroup>
        </nav>

        <article className="min-w-0">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Docs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Getting started</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Installation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 id="introduction" className="mt-4 text-3xl font-semibold tracking-tight">
            Installation
          </h1>
          <p className="mt-3 text-muted-foreground">
            Veil UI is a copy-paste registry. Components are added to your
            project as source files, so you can change anything without waiting
            for an upstream release.
          </p>

          <Alert className="mt-5">
            <Info />
            <AlertTitle>Requirements</AlertTitle>
            <AlertDescription>
              React 19, Tailwind CSS v4 and a package manager. The CLI works with
              pnpm, npm, yarn and bun.
            </AlertDescription>
          </Alert>

          <h2 id="installation" className="mt-8 text-xl font-semibold tracking-tight">
            Add components
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Run the CLI from your project root. It detects your components
            directory and writes files with the correct imports.
          </p>
          <CodeBlock
            className="mt-4"
            code={installCode}
            language="bash"
            filename="Terminal"
          />

          <h2 id="usage" className="mt-8 text-xl font-semibold tracking-tight">
            Use a component
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Import from your local UI folder. There is no runtime package to
            install.
          </p>
          <CodeBlock
            className="mt-4"
            code={usageCode}
            language="tsx"
            filename="app/page.tsx"
          />

          <h2 id="configuration" className="mt-8 text-xl font-semibold tracking-tight">
            Configuration
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The generated <code className="rounded bg-muted px-1 py-0.5 text-xs">components.json</code>{" "}
            file tells the CLI where to place components, utilities and hooks.
          </p>
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle />
            <AlertTitle>Do not edit generated files by hand</AlertTitle>
            <AlertDescription>
              Changes will be overwritten the next time you add a component.
              Extend components in your own wrapper instead.
            </AlertDescription>
          </Alert>

          <div className="mt-8 flex items-center justify-between border-t pt-5 text-sm">
            <Button variant="ghost" size="sm">
              ← Introduction
            </Button>
            <Button variant="ghost" size="sm">
              Configuration <ArrowRight />
            </Button>
          </div>
        </article>

        <aside className="hidden lg:block">
          <TableOfContents
            items={[
              { id: "introduction", title: "Installation" },
              { id: "installation", title: "Add components" },
              { id: "usage", title: "Use a component" },
              { id: "configuration", title: "Configuration" },
            ]}
          />
        </aside>
      </div>
    </div>
  );
}

export { DocumentationPage };
