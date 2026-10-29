import { Download, Filter, TrendingUp } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { AreaChart } from "../area-chart/index";
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
import { DonutChart } from "../donut-chart/index";
import { Progress } from "../progress/index";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select/index";
import { StatisticCard } from "../statistic-card/index";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/index";

const sessionsData = [
  { week: "W1", sessions: 12400, conversions: 820 },
  { week: "W2", sessions: 13800, conversions: 940 },
  { week: "W3", sessions: 12900, conversions: 880 },
  { week: "W4", sessions: 15600, conversions: 1120 },
  { week: "W5", sessions: 17200, conversions: 1260 },
  { week: "W6", sessions: 18900, conversions: 1510 },
];

const sessionsConfig = {
  sessions: { label: "Sessions", color: "#6366f1" },
  conversions: { label: "Conversions", color: "#22c55e" },
};

const channels = [
  { name: "Organic search", value: 4820 },
  { name: "Direct", value: 3140 },
  { name: "Referral", value: 1860 },
  { name: "Social", value: 1240 },
  { name: "Email", value: 760 },
];

const topPages = [
  { path: "/pricing", views: "12,480", change: "+8.2%" },
  { path: "/docs/getting-started", views: "9,320", change: "+3.4%" },
  { path: "/blog/design-tokens", views: "7,860", change: "+14.1%" },
  { path: "/components", views: "6,140", change: "-1.2%" },
  { path: "/changelog", views: "4,980", change: "+2.7%" },
];

function AnalyticsPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="analytics-page"
      className={cn("space-y-6 rounded-xl border bg-background p-5 sm:p-6", className)}
      {...props}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Audience growth and engagement for the last 30 days.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="h-8 w-32" aria-label="Date range">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter /> Filter
          </Button>
          <Button size="sm">
            <Download /> Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatisticCard
          className="max-w-none"
          label="Visitors"
          value="48,210"
          delta={12.5}
          trend="up"
          icon={TrendingUp}
        />
        <StatisticCard
          className="max-w-none"
          label="Sessions"
          value="86,940"
          delta={9.8}
          trend="up"
        />
        <StatisticCard
          className="max-w-none"
          label="Bounce rate"
          value="32.4%"
          delta={-4.2}
          trend="down"
        />
        <StatisticCard
          className="max-w-none"
          label="Avg. session"
          value="4m 12s"
          delta={2.6}
          trend="up"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Sessions and conversions</CardTitle>
            <CardDescription>Weekly totals across all channels</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={sessionsData}
              config={sessionsConfig}
              xKey="week"
              height={280}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Traffic sources</CardTitle>
            <CardDescription>Where visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart data={channels} height={280} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <Card>
          <CardHeader>
            <CardTitle>Goal completion</CardTitle>
            <CardDescription>Monthly acquisition targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "New signups", value: 78, target: "7,800 / 10,000" },
              { label: "Activated accounts", value: 64, target: "3,200 / 5,000" },
              { label: "Upgraded plans", value: 42, target: "210 / 500" },
              { label: "Newsletter", value: 91, target: "9,100 / 10,000" },
            ].map((goal) => (
              <div key={goal.label} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>{goal.label}</span>
                  <span className="text-muted-foreground">{goal.target}</span>
                </div>
                <Progress value={goal.value} aria-label={goal.label} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top pages</CardTitle>
            <CardDescription>Most visited content</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPages.map((page) => (
                  <TableRow key={page.path}>
                    <TableCell className="font-mono text-xs">{page.path}</TableCell>
                    <TableCell className="text-right">{page.views}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={page.change.startsWith("+") ? "default" : "muted"}
                      >
                        {page.change}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Engagement by day</CardTitle>
          <CardDescription>Sessions and conversions compared</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            data={sessionsData}
            config={sessionsConfig}
            xKey="week"
            height={220}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export { AnalyticsPage };
