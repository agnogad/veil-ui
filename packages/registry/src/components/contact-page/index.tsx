import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card/index";
import { Checkbox } from "../checkbox/index";
import { FaqSection } from "../faq-section/index";
import { Input } from "../input/index";
import { Label } from "../label/index";
import { Logo } from "../logo/index";
import { MarketingFooter } from "../marketing-footer/index";
import { Navbar } from "../navbar/index";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select/index";
import { Textarea } from "../textarea/index";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@veil-ui.dev",
    description: "Best for general questions and partnerships.",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 014-2048",
    description: "Weekdays, 9:00–17:00 UTC.",
  },
  {
    icon: MessageSquare,
    label: "Live chat",
    value: "Available in the app",
    description: "Fastest way to reach support.",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Rua do Sol 12, Lisbon",
    description: "Visits by appointment.",
  },
];

function ContactPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="contact-page"
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
          {["Product", "Components", "Pricing", "Contact"].map((link) => (
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

      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Contact</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s talk about your project
          </h1>
          <p className="mt-3 text-muted-foreground">
            Questions about the registry, licensing or a custom engagement? Send
            a note and we will reply within one business day.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
              <CardDescription>
                Fields marked with an asterisk are required.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-name">Name *</Label>
                  <Input id="contact-name" placeholder="Ada Lovelace" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-email">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="ada@example.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-topic">Topic</Label>
                <Select defaultValue="support">
                  <SelectTrigger id="contact-topic" className="w-full">
                    <SelectValue placeholder="Choose a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Product support</SelectItem>
                    <SelectItem value="sales">Sales and licensing</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="other">Something else</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-message">Message *</Label>
                <Textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell us a bit about what you need…"
                  required
                />
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="contact-consent" />
                <Label htmlFor="contact-consent" className="text-sm font-normal leading-snug">
                  I agree to the privacy policy and to being contacted about my
                  request.
                </Label>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Send message</Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <div
                  key={channel.label}
                  className="flex gap-3 rounded-lg border bg-card p-4"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{channel.label}</p>
                    <p className="text-sm">{channel.value}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {channel.description}
                    </p>
                  </div>
                </div>
              );
            })}
            <div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
              <Clock className="size-4" aria-hidden />
              Average response time: under 4 hours
            </div>
          </div>
        </div>

        <div className="mt-16">
          <FaqSection
            title="Before you write"
            description="Answers to the questions we get most often."
            items={[
              {
                question: "Can I use Veil UI in a commercial product?",
                answer:
                  "Yes. Components are MIT licensed and can be used in commercial and closed-source projects.",
              },
              {
                question: "Do you offer implementation support?",
                answer:
                  "We offer short engagements for design system setup. Tell us about your stack and timeline and we will follow up.",
              },
              {
                question: "How do I report a bug?",
                answer:
                  "Open an issue with a minimal reproduction. Security reports should go to security@veil-ui.dev.",
              },
            ]}
          />
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

export { ContactPage };
