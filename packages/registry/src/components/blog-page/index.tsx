import { ArrowRight, Rss } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { ArticleCard } from "../article-card/index";
import { Button } from "../button/index";
import { Input } from "../input/index";
import { Logo } from "../logo/index";
import { MarketingFooter } from "../marketing-footer/index";
import { Navbar } from "../navbar/index";
import { Pagination } from "../pagination/index";

const posts = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
    category: "Design",
    title: "Designing calm interfaces for busy teams",
    excerpt:
      "Why reducing visual noise helps people focus, and the small defaults that make it happen.",
    author: "Mira Chen",
    date: "Oct 22, 2026",
    readTime: "6 min read",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60",
    category: "Engineering",
    title: "A registry approach to shared components",
    excerpt:
      "Copy-paste ownership beats hidden dependencies when teams need to move independently.",
    author: "Owen Park",
    date: "Oct 18, 2026",
    readTime: "8 min read",
  },
  {
    src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=800&q=60",
    category: "Product",
    title: "Shipping accessible defaults without slowing down",
    excerpt:
      "How we bake keyboard support and ARIA into every primitive without a heavy runtime.",
    author: "Lena Ortiz",
    date: "Oct 12, 2026",
    readTime: "5 min read",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=60",
    category: "Design",
    title: "A practical guide to design tokens",
    excerpt:
      "From color scales to spacing rhythm: structuring tokens that survive real products.",
    author: "Sam Rivera",
    date: "Oct 6, 2026",
    readTime: "9 min read",
  },
  {
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=60",
    category: "Engineering",
    title: "Server components at the edge of your design system",
    excerpt:
      "Where client boundaries belong, and how to keep your component library flexible.",
    author: "Aiko Tanaka",
    date: "Sep 29, 2026",
    readTime: "7 min read",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    category: "Product",
    title: "What we learned from 1,000 beta users",
    excerpt:
      "Patterns from real dashboards, the components people reach for, and what surprised us.",
    author: "Mira Chen",
    date: "Sep 21, 2026",
    readTime: "6 min read",
  },
];

const navLinks = ["Product", "Components", "Journal", "Pricing"];

function BlogPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="blog-page"
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
        <nav aria-label="Primary" className="ml-6 hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="RSS feed" asChild>
            <a href="#rss">
              <Rss />
            </a>
          </Button>
          <Button size="sm">Subscribe</Button>
        </div>
      </Navbar>

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            The Veil Journal
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Notes on design systems, craft and shipping calm software
          </h1>
          <p className="mt-3 text-muted-foreground">
            Practical writing from the team building Veil UI. No fluff, just what
            worked for us.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {["All posts", "Design", "Engineering", "Product", "Changelog"].map(
            (filter) => (
              <Button
                key={filter}
                variant={filter === "All posts" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {filter}
              </Button>
            ),
          )}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ArticleCard
            className="max-w-none"
            src={posts[0]?.src}
            alt="Mountain landscape"
            category={posts[0]?.category}
            title={posts[0]?.title}
            excerpt={posts[0]?.excerpt}
            author={posts[0]?.author ?? ""}
            date={posts[0]?.date ?? ""}
            readTime={posts[0]?.readTime}
          />
          <div className="flex flex-col justify-between gap-4 rounded-lg border bg-muted/30 p-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Editor&apos;s pick
              </p>
              <h2 className="mt-2 text-xl font-semibold leading-snug">
                The case against component libraries you can&apos;t read
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Ownership is a feature. Why the source you copy should stay small,
                legible and boring.
              </p>
            </div>
            <Button variant="link" className="w-fit px-0">
              Read the essay <ArrowRight />
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(1).map((post) => (
            <ArticleCard
              key={post.title}
              className="max-w-none"
              src={post.src}
              alt=""
              category={post.category}
              title={post.title}
              excerpt={post.excerpt}
              author={post.author}
              date={post.date}
              readTime={post.readTime}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Showing 6 of 42 posts
          </p>
          <Pagination page={1} totalPages={7} />
        </div>

        <div className="mt-12 rounded-xl border bg-muted/30 p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold">Get the monthly digest</h2>
              <p className="text-sm text-muted-foreground">
                One email a month with new components and practical guides.
              </p>
            </div>
            <form className="flex w-full max-w-sm gap-2">
              <Input
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>

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
          {
            title: "Company",
            links: [
              { label: "About", href: "#" },
              { label: "Careers", href: "#" },
              { label: "Contact", href: "#" },
            ],
          },
        ]}
        legal={<p>© 2026 Veil UI. All rights reserved.</p>}
      />
    </div>
  );
}

export { BlogPage };
