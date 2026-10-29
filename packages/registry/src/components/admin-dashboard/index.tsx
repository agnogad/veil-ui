import {
  Activity,
  ArrowUpRight,
  Database,
  Globe,
  Server,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";

import { cn } from "@veil-ui/utils";

import { AppShell } from "../app-shell/index";
import { Avatar, AvatarFallback } from "../avatar/index";
import { BarChart } from "../bar-chart/index";
import { Badge } from "../badge/index";
import { Button } from "../button/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card/index";
import { Logo } from "../logo/index";
import { MetricCard } from "../metric-card/index";
import { Progress } from "../progress/index";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
} from "../sidebar/index";
import { StatusIndicator } from "../status-indicator/index";
import { Timeline } from "../timeline/index";

const trafficData = [
  { day: "Mon", web: 3200, api: 2400 },
  { day: "Tue", web: 3800, api: 2600 },
  { day: "Wed", web: 3500, api: 3100 },
  { day: "Thu", web: 4200, api: 2900 },
  { day: "Fri", web: 4600, api: 3400 },
  { day: "Sat", web: 3100, api: 2100 },
  { day: "Sun", web: 2800, api: 1900 },
];

const trafficConfig = {
  web: { label: "Web", color: "#6366f1" },
  api: { label: "API", color: "#22c55e" },
};

const users = [
  { name: "Mira Chen", email: "mira@acme.dev", role: "Admin", status: "online" },
  { name: "Owen Park", email: "owen@acme.dev", role: "Editor", status: "online" },
  { name: "Lena Ortiz", email: "lena@acme.dev", role: "Viewer", status: "away" },
  { name: "Sam Rivera", email: "sam@acme.dev", role: "Editor", status: "offline" },
];

function AdminDashboard({ className }: React.ComponentProps<"div">) {
  return (
    <AppShell
      data-slot="admin-dashboard"
      className={cn("rounded-xl border", className)}
      header={
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Logo
            name="Admin"
            size="sm"
            mark={
              <span className="grid size-full place-items-center bg-foreground text-[10px] font-bold text-background">
                V
              </span>
            }
          />
          <Badge variant="muted" className="ml-2">
            Internal
          </Badge>
          <div className="ml-auto flex items-center gap-3">
            <StatusIndicator status="online" label="All systems operational" />
            <Avatar size="sm">
              <AvatarFallback>OP</AvatarFallback>
            </Avatar>
          </div>
        </div>
      }
      sidebar={
        <nav aria-label="Administration" className="p-2">
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarItem href="#overview" active>
              <Activity /> Overview
            </SidebarItem>
            <SidebarItem href="#users">
              <Users /> Users
            </SidebarItem>
            <SidebarItem href="#infrastructure">
              <Server /> Infrastructure
            </SidebarItem>
            <SidebarItem href="#database">
              <Database /> Database
            </SidebarItem>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Operations</SidebarGroupLabel>
            <SidebarItem href="#security">
              <ShieldCheck /> Security
            </SidebarItem>
            <SidebarItem href="#domains">
              <Globe /> Domains
            </SidebarItem>
            <SidebarItem href="#maintenance">
              <Wrench /> Maintenance
            </SidebarItem>
          </SidebarGroup>
        </nav>
      }
    >
      <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Platform overview
            </h1>
            <p className="text-sm text-muted-foreground">
              Service health and resource usage in real time.
            </p>
          </div>
          <Button variant="outline" size="sm">
            <ArrowUpRight /> Open status page
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            className="max-w-none"
            label="API latency p95"
            value="142"
            unit="ms"
            current={142}
            target={200}
            description="Within the 200 ms budget"
          />
          <MetricCard
            className="max-w-none"
            label="Storage used"
            value="72"
            unit="%"
            current={72}
            target={100}
            description="1.4 TB of 2 TB allocated"
          />
          <MetricCard
            className="max-w-none"
            label="Monthly cost"
            value="$4,820"
            current={4820}
            target={6000}
            description="$1,180 remaining in budget"
          />
          <MetricCard
            className="max-w-none"
            label="Uptime (30 days)"
            value="99.98"
            unit="%"
            current={99.98}
            target={100}
            description="7 minutes of downtime"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Requests per day</CardTitle>
              <CardDescription>Web and API traffic over the last week</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={trafficData}
                config={trafficConfig}
                xKey="day"
                stacked
                height={250}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="text-base font-medium">Deploy timeline</h2>
              </CardTitle>
              <CardDescription>Recent releases</CardDescription>
            </CardHeader>
            <CardContent>
              <Timeline
                items={[
                  {
                    title: "Release 2.4.0",
                    time: "Today",
                    status: "success",
                    description: "Shipped to production at 09:12 UTC.",
                  },
                  {
                    title: "Database migration",
                    time: "Yesterday",
                    status: "success",
                    description: "Added billing indexes without downtime.",
                  },
                  {
                    title: "CDN rollout",
                    time: "3 days ago",
                    status: "warning",
                    description: "Rolled back to previous edge config.",
                  },
                ]}
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Team members</CardTitle>
              <CardDescription>People with access to the admin console</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.email}
                  className="flex items-center gap-3 rounded-md border p-2.5"
                >
                  <Avatar size="sm">
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <Badge variant="outline">{user.role}</Badge>
                  <StatusIndicator status={user.status as "online" | "offline" | "busy" | "away"} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Resource usage</CardTitle>
              <CardDescription>Current capacity by service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Database connections", value: 64 },
                { label: "Cache hit rate", value: 92 },
                { label: "Queue depth", value: 38 },
                { label: "Worker utilization", value: 71 },
              ].map((resource) => (
                <div key={resource.label} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span>{resource.label}</span>
                    <span className="text-muted-foreground">{resource.value}%</span>
                  </div>
                  <Progress value={resource.value} aria-label={resource.label} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

export { AdminDashboard };
