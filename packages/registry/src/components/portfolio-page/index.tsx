import { ArrowUpRight, AtSign, Briefcase, GitBranch, Mail } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Badge } from "../badge/index";
import { Button } from "../button/index";
import { FinalCta } from "../final-cta/index";
import { ImageCard } from "../image-card/index";
import { Logo } from "../logo/index";
import { MarketingFooter } from "../marketing-footer/index";
import { Navbar } from "../navbar/index";
import { Timeline } from "../timeline/index";

const projects = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
    alt: "Mountain landscape",
    title: "Atlas — travel planning",
    description: "A collaborative trip planner with offline maps and shared budgets.",
    tags: ["Product design", "React"],
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60",
    alt: "Circuit board detail",
    title: "Signal — observability",
    description: "A monitoring dashboard that turns noisy metrics into clear stories.",
    tags: ["Design systems", "Data viz"],
  },
  {
    src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=800&q=60",
    alt: "Field of flowers",
    title: "Bloom — plant care",
    description: "An approachable plant companion with reminders and a care journal.",
    tags: ["Mobile", "Branding"],
  },
  {
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=60",
    alt: "Headphones on a desk",
    title: "Resonance — audio library",
    description: "A listening room for teams to collect references and share notes.",
    tags: ["Web app", "Motion"],
  },
];

const skills = [
  "Design systems",
  "Product design",
  "React",
  "TypeScript",
  "Prototyping",
  "Accessibility",
  "Brand identity",
  "Motion",
];

function PortfolioPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="portfolio-page"
      className={cn("w-full overflow-hidden rounded-xl border bg-background", className)}
      {...props}
    >
      <Navbar>
        <Logo
          name="Mira Chen"
          size="sm"
          mark={
            <span className="grid size-full place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              MC
            </span>
          }
        />
        <nav aria-label="Primary" className="ml-6 hidden items-center gap-1 md:flex">
          {["Work", "About", "Writing", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </nav>
        <Button size="sm" className="ml-auto">
          Hire me
        </Button>
      </Navbar>

      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <p className="text-sm font-medium text-primary">Designer & front-end engineer</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          I design and build calm interfaces for complex products.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Ten years turning dense workflows into clear, accessible experiences.
          Currently helping teams ship design systems that people actually use.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild>
            <a href="#work">View selected work</a>
          </Button>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <GitBranch />
            </Button>
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <Briefcase />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <AtSign />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Email">
              <Mail />
            </Button>
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Selected work</h2>
          <Button variant="link" className="px-0">
            All projects <ArrowUpRight />
          </Button>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ImageCard
              key={project.title}
              src={project.src}
              alt={project.alt}
              title={project.title}
              description={project.description}
              footer={
                <div className="flex w-full flex-wrap items-center gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                  <ArrowUpRight className="ml-auto size-4" aria-hidden />
                </div>
              }
            />
          ))}
        </div>
      </section>

      <section id="about" className="border-y bg-muted/20">
        <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-16 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">About me</h2>
            <p className="mt-3 text-muted-foreground">
              I care about the overlap between how a product looks and how it
              behaves. My work usually starts with a messy workflow and ends with
              a system that is easy to extend.
            </p>
            <p className="mt-3 text-muted-foreground">
              When I am not designing, I write about design systems and maintain
              open-source components.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Experience
            </h3>
            <Timeline
              className="mt-4"
              items={[
                {
                  title: "Product lead — Acme",
                  time: "2022 — now",
                  description: "Leading the design system and core product surfaces.",
                  status: "success",
                },
                {
                  title: "Senior designer — Globex",
                  time: "2018 — 2022",
                  description: "Shipped dashboards used by 40k operations teams.",
                },
                {
                  title: "Front-end engineer — Initech",
                  time: "2015 — 2018",
                  description: "Built the first version of the component library.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <div className="px-6 py-16">
        <FinalCta
          className="mx-auto max-w-3xl"
          title="Have a project in mind?"
          description="I take on a small number of engagements each quarter."
          actions={
            <Button size="lg" asChild>
              <a href="mailto:hello@mirachen.dev">
                <Mail /> Get in touch
              </a>
            </Button>
          }
          note="Typical reply time: one business day."
        />
      </div>

      <MarketingFooter
        className="border-x-0 border-b-0"
        brand="Mira Chen"
        description="Designer and front-end engineer based in Lisbon."
        social={[
          { label: "GitHub", href: "#", icon: <GitBranch /> },
          { label: "LinkedIn", href: "#", icon: <Briefcase /> },
          { label: "Twitter", href: "#", icon: <AtSign /> },
        ]}
        legal={<p>© 2026 Mira Chen. All rights reserved.</p>}
      />
    </div>
  );
}

export { PortfolioPage };
