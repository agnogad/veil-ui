import { Compass, HeartHandshake, Leaf, Users } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { AvatarGroup } from "../avatar-group/index";
import { Badge } from "../badge/index";
import { Button } from "../button/index";
import { FeatureGrid } from "../feature-grid/index";
import { FinalCta } from "../final-cta/index";
import { Logo } from "../logo/index";
import { MarketingFooter } from "../marketing-footer/index";
import { Navbar } from "../navbar/index";
import { ProfileCard } from "../profile-card/index";
import { StatsSection } from "../stats-section/index";
import { Timeline } from "../timeline/index";

const team = [
  { name: "Mira Chen", role: "Co-founder, product" },
  { name: "Owen Park", role: "Co-founder, engineering" },
  { name: "Lena Ortiz", role: "Design director" },
  { name: "Sam Rivera", role: "Developer advocate" },
];

const values = [
  {
    icon: <Leaf />,
    title: "Calm by default",
    description:
      "Every default should reduce noise before it adds personality.",
  },
  {
    icon: <Users />,
    title: "Built for teams",
    description:
      "Components are only useful when everyone can read and extend them.",
  },
  {
    icon: <HeartHandshake />,
    title: "Own your work",
    description:
      "You copy the source. No hidden runtimes, no forced upgrades.",
  },
  {
    icon: <Compass />,
    title: "Accessible always",
    description:
      "Keyboard support and semantics are the baseline, not an add-on.",
  },
];

function AboutPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="about-page"
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
          {["Product", "Components", "About", "Pricing"].map((link) => (
            <a
              key={link}
              href="#"
              className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </nav>
        <Button size="sm" className="ml-auto">
          Get started
        </Button>
      </Navbar>

      <section className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
        <Badge variant="secondary">Our story</Badge>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          We build tools that respect attention
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Veil UI started as an internal component kit at Acme. We kept rewriting
          the same accessible primitives, so we published the source instead.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <AvatarGroup
            users={team.map((member) => ({ name: member.name }))}
            max={4}
            label="The team"
          />
          <span className="text-sm text-muted-foreground">
            A small team in Lisbon
          </span>
        </div>
      </section>

      <div className="border-y bg-muted/20 px-6 py-12">
        <StatsSection
          className="mx-auto max-w-5xl"
          stats={[
            { value: "2021", label: "Founded" },
            { value: "12", label: "Team members" },
            { value: "480+", label: "Components" },
            { value: "38k", label: "Developers" },
          ]}
        />
      </div>

      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">How we got here</h2>
            <p className="mt-3 text-muted-foreground">
              What began as a shared folder of buttons became the foundation of
              every product we shipped. Along the way we learned that ownership
              and accessibility matter more than clever abstractions.
            </p>
            <p className="mt-3 text-muted-foreground">
              Today Veil UI is used by product teams who want a dependable base
              without giving up control of their code.
            </p>
          </div>
          <Timeline
            items={[
              {
                title: "A shared folder",
                time: "2021",
                description: "Three engineers, one component kit, and many Copy buttons.",
              },
              {
                title: "Open sourced",
                time: "2023",
                description: "The registry model let teams take only what they needed.",
                status: "success",
              },
              {
                title: "Veil UI 2.0",
                time: "2026",
                description: "New tokens, a CLI, and 480+ documented components.",
                status: "success",
              },
            ]}
          />
        </div>
      </section>

      <section className="border-y bg-muted/20 px-6 py-16">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight">
            What we believe
          </h2>
          <FeatureGrid
            className="mt-8"
            columns={2}
            features={values.map((value) => ({
              icon: value.icon,
              title: value.title,
              description: value.description,
            }))}
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">The team</h2>
        <p className="mt-2 text-muted-foreground">
          Small enough to move quickly, experienced enough to keep it calm.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <ProfileCard
              key={member.name}
              className="max-w-none"
              name={member.name}
              role={member.role}
              followers={undefined}
              action={
                <Button variant="outline" size="sm" className="w-full">
                  View profile
                </Button>
              }
            />
          ))}
        </div>
      </section>

      <div className="px-6 pb-16">
        <FinalCta
          className="mx-auto max-w-3xl"
          title="Build with us"
          description="Browse the registry, copy what you need, and keep your design language."
          actions={<Button size="lg">Explore components</Button>}
        />
      </div>

      <MarketingFooter
        className="border-x-0 border-b-0"
        description="Accessible primitives and page sections for product teams."
        columns={[
          {
            title: "Product",
            links: [
              { label: "Components", href: "#" },
              { label: "Templates", href: "#" },
              { label: "Pricing", href: "#" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "About", href: "#" },
              { label: "Journal", href: "#" },
              { label: "Contact", href: "#" },
            ],
          },
        ]}
        legal={<p>© 2026 Veil UI. All rights reserved.</p>}
      />
    </div>
  );
}

export { AboutPage };
