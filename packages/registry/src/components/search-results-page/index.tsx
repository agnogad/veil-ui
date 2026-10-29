import { ChevronDown, FileText, Globe, Image, Search, SlidersHorizontal, Video } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { Card, CardContent, CardHeader, CardTitle } from "../card/index";
import { Input } from "../input/index";
import { Kbd } from "../kbd/index";
import { Logo } from "../logo/index";
import { Pagination } from "../pagination/index";
import { SearchResultCard } from "../search-result-card/index";
import { SegmentedNavigation } from "../segmented-navigation/index";

const results = [
  {
    title: "Getting started with Veil UI",
    url: "veil-ui.dev/docs/getting-started",
    breadcrumb: "Docs",
    snippet:
      "Install the CLI, scaffold your components directory, and add your first accessible primitive in under two minutes.",
    meta: "Updated 2 days ago · 8 min read",
  },
  {
    title: "Design tokens reference",
    url: "veil-ui.dev/docs/tokens",
    breadcrumb: "Docs",
    snippet:
      "Color, spacing, radius and typography tokens shipped with the registry. Learn how to override them without breaking components.",
    meta: "Updated last week · 12 min read",
  },
  {
    title: "Button component",
    url: "veil-ui.dev/components/button",
    breadcrumb: "Components",
    snippet:
      "A button triggers an action. Supports default, secondary, outline, ghost, destructive and link variants with four sizes.",
    meta: "Components · Updated yesterday",
  },
  {
    title: "Theming your product with CSS variables",
    url: "veil-ui.dev/journal/theming",
    breadcrumb: "Journal",
    snippet:
      "A practical walkthrough of building a theme layer on top of the registry using CSS variables and semantic tokens.",
    meta: "Journal · 6 min read",
  },
  {
    title: "Accessibility checklist for new components",
    url: "veil-ui.dev/docs/accessibility",
    breadcrumb: "Docs",
    snippet:
      "Keyboard support, focus management and labeling requirements every new component should meet before it ships.",
    meta: "Updated 3 weeks ago · 9 min read",
  },
];

const related = [
  "component registry",
  "design tokens",
  "radix primitives",
  "tailwind v4 setup",
  "dark mode",
  "form validation",
];

function SearchResultsPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="search-results-page"
      className={cn("w-full overflow-hidden rounded-xl border bg-background", className)}
      {...props}
    >
      <header className="border-b px-6 py-3">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-4">
          <Logo
            name="Veil UI"
            size="sm"
            mark={
              <span className="grid size-full place-items-center bg-primary text-[10px] font-bold text-primary-foreground">
                V
              </span>
            }
          />
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              defaultValue="design tokens"
              aria-label="Search"
              className="pl-8 pr-14"
            />
            <Kbd className="absolute right-2 top-1/2 -translate-y-1/2">⌘K</Kbd>
          </div>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-6 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SegmentedNavigation
            label="Result type"
            value="all"
            options={[
              { value: "all", label: "All" },
              { value: "docs", label: "Docs" },
              { value: "components", label: "Components" },
              { value: "journal", label: "Journal" },
            ]}
          />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <SlidersHorizontal /> Filters
            </Button>
            <Button variant="ghost" size="sm">
              Relevance <ChevronDown />
            </Button>
          </div>
        </div>

        <p className="mt-5 text-sm text-muted-foreground">
          About 1,240 results for <span className="font-medium text-foreground">“design tokens”</span>{" "}
          (0.24 seconds)
        </p>

        <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_240px]">
          <div>
            <div className="divide-y">
              {results.map((result) => (
                <div key={result.url} className="py-5 first:pt-0">
                  <SearchResultCard
                    className="max-w-none"
                    title={result.title}
                    url={result.url}
                    breadcrumb={result.breadcrumb}
                    snippet={result.snippet}
                    meta={result.meta}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-between gap-4 border-t pt-5 sm:flex-row">
              <p className="text-sm text-muted-foreground">Page 1 of 12</p>
              <Pagination page={1} totalPages={12} />
            </div>
          </div>

          <aside className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Related searches</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {related.map((term) => (
                  <a
                    key={term}
                    href={`#${term.replaceAll(" ", "-")}`}
                    className="flex items-center justify-between rounded-md px-1 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Search className="size-3.5" aria-hidden /> {term}
                    </span>
                  </a>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Search in</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                {[
                  { icon: FileText, label: "Documentation", count: 842 },
                  { icon: Globe, label: "Blog", count: 186 },
                  { icon: Video, label: "Videos", count: 94 },
                  { icon: Image, label: "Images", count: 118 },
                ].map((scope) => {
                  const Icon = scope.icon;
                  return (
                    <a
                      key={scope.label}
                      href="#"
                      className="flex items-center gap-2 rounded-md px-1 py-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <Icon className="size-4" aria-hidden />
                      {scope.label}
                      <span className="ml-auto text-xs">{scope.count}</span>
                    </a>
                  );
                })}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

export { SearchResultsPage };
