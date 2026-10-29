import {
  Bookmark,
  CalendarDays,
  Clock3,
  Link as LinkIcon,
  MessageCircle,
  Share2,
} from "lucide-react";

import { cn } from "@veil-ui/utils";

import { ArticleCard } from "../article-card/index";
import { Avatar, AvatarFallback } from "../avatar/index";
import { Badge } from "../badge/index";
import { Blockquote } from "../blockquote/index";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../breadcrumb/index";
import { Button } from "../button/index";
import { CodeBlock } from "../code-block/index";
import { Logo } from "../logo/index";
import { MarketingFooter } from "../marketing-footer/index";
import { Navbar } from "../navbar/index";

const code = `const tokens = {
  color: {
    primary: "oklch(0.62 0.19 264)",
    surface: "oklch(0.98 0.005 264)",
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
  },
};`;

const related = [
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60",
    category: "Engineering",
    title: "A registry approach to shared components",
    author: "Owen Park",
    date: "Oct 18, 2026",
  },
  {
    src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=800&q=60",
    category: "Product",
    title: "Shipping accessible defaults without slowing down",
    author: "Lena Ortiz",
    date: "Oct 12, 2026",
  },
];

function BlogPostPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="blog-post-page"
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
        <Button variant="link" className="ml-auto">
          Back to journal
        </Button>
      </Navbar>

      <article className="mx-auto w-full max-w-3xl px-6 py-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Journal</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Design</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Designing calm interfaces</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mt-6">
          <Badge variant="secondary">Design</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Designing calm interfaces for busy teams
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Why reducing visual noise helps people focus, and the small defaults
            that make it happen.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y py-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">Mira Chen</p>
                <p className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="size-3.5" aria-hidden /> Oct 22, 2026
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="size-3.5" aria-hidden /> 6 min read
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" aria-label="Copy link">
                <LinkIcon />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Share">
                <Share2 />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Bookmark">
                <Bookmark />
              </Button>
            </div>
          </div>
        </header>

        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=70"
          alt="A calm mountain landscape at sunrise"
          className="mt-8 aspect-[2/1] w-full rounded-xl object-cover"
        />

        <div className="mt-8 space-y-5 text-base leading-relaxed">
          <p>
            Calm software does not mean empty software. It means every element
            earns its place. When a dashboard is noisy, people scan instead of
            read, and important signals get buried under decoration.
          </p>
          <p>
            The fix is rarely a redesign. It is a set of defaults: fewer borders,
            a consistent spacing rhythm, one accent color doing real work, and
            typography that establishes hierarchy before color does.
          </p>
          <h2 className="pt-2 text-xl font-semibold tracking-tight">
            Start with the tokens
          </h2>
          <p>
            Most visual noise comes from inconsistent values. Once spacing and
            color live in tokens, components stop inventing their own scales and
            the interface starts to feel intentional.
          </p>
          <CodeBlock code={code} language="ts" filename="tokens.ts" />
          <Blockquote cite="Mira Chen, Product lead">
            Calm is a technical decision, not a mood. It comes from constraints
            applied consistently.
          </Blockquote>
          <h2 className="pt-2 text-xl font-semibold tracking-tight">
            Remove before you add
          </h2>
          <p>
            Audit one screen and list every border, shadow and divider. In our
            experience half of them can go without losing meaning. What remains
            becomes a stronger signal.
          </p>
          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
            <li>Use spacing to group content before reaching for a card.</li>
            <li>Reserve color for state and action, not decoration.</li>
            <li>Keep type scales small; three sizes are often enough.</li>
          </ul>
          <p>
            None of this requires a new library. It requires defaults that make
            the calm choice the easy one — which is exactly what a good component
            registry is for.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 border-t pt-6">
          {["design systems", "accessibility", "product"].map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="ml-auto">
            <MessageCircle /> 12 comments
          </Button>
        </div>

        <div className="mt-8 flex items-center gap-4 rounded-xl border bg-muted/30 p-5">
          <Avatar size="lg">
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="font-medium">Mira Chen</p>
            <p className="text-sm text-muted-foreground">
              Product lead at Acme. Writes about design systems and calm tools
              for busy teams.
            </p>
          </div>
          <Button variant="outline" size="sm">
            Follow
          </Button>
        </div>
      </article>

      <section className="mx-auto w-full max-w-5xl px-6 pb-12">
        <h2 className="text-xl font-semibold tracking-tight">Keep reading</h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          {related.map((post) => (
            <ArticleCard
              key={post.title}
              className="max-w-none"
              src={post.src}
              alt=""
              category={post.category}
              title={post.title}
              author={post.author}
              date={post.date}
            />
          ))}
        </div>
      </section>

      <MarketingFooter
        className="border-x-0 border-b-0"
        description="Accessible primitives and page sections for product teams."
        columns={[
          {
            title: "Product",
            links: [
              { label: "Components", href: "#" },
              { label: "Journal", href: "#" },
              { label: "Pricing", href: "#" },
            ],
          },
        ]}
        legal={<p>© 2026 Veil UI. All rights reserved.</p>}
      />
    </div>
  );
}

export { BlogPostPage };
