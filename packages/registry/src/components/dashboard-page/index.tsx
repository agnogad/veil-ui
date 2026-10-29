import {
  BarChart3,
  Bell,
  CreditCard,
  FileText,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

import { cn } from "@veil-ui/utils";

import { ActivityFeed } from "../activity-feed/index";
import { AppShell } from "../app-shell/index";
import { AreaChart } from "../area-chart/index";
import { Avatar, AvatarFallback } from "../avatar/index";
import { Badge } from "../badge/index";
import { Button } from "../button/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card/index";
import { Input } from "../input/index";
import { Kbd } from "../kbd/index";
import { Logo } from "../logo/index";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
} from "../sidebar/index";
import { StatisticCard } from "../statistic-card/index";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/index";

const revenueData = [
  { month: "Jan", revenue: 4200, expenses: 2400 },
  { month: "Feb", revenue: 5100, expenses: 2800 },
  { month: "Mar", revenue: 4700, expenses: 2600 },
  { month: "Apr", revenue: 6300, expenses: 3100 },
  { month: "May", revenue: 7200, expenses: 3400 },
  { month: "Jun", revenue: 8100, expenses: 3900 },
];

const revenueConfig = {
  revenue: { label: "Revenue", color: "#6366f1" },
  expenses: { label: "Expenses", color: "#f59e0b" },
};

const orders = [
  { id: "#3210", customer: "Mira Chen", status: "Paid", total: "$240.00" },
  { id: "#3209", customer: "Owen Park", status: "Pending", total: "$118.00" },
  { id: "#3208", customer: "Lena Ortiz", status: "Paid", total: "$560.00" },
  { id: "#3207", customer: "Sam Rivera", status: "Refunded", total: "$92.00" },
  { id: "#3206", customer: "Aiko Tanaka", status: "Paid", total: "$310.00" },
];

const statusVariant = {
  Paid: "default",
  Pending: "secondary",
  Refunded: "outline",
} as const;

function DashboardPage({ className }: React.ComponentProps<"div">) {
  return (
    <AppShell
      data-slot="dashboard-page"
      className={cn("rounded-xl border", className)}
      header={
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Logo
            name="Acme"
            size="sm"
            mark={
              <span className="grid size-full place-items-center bg-primary text-[10px] font-bold text-primary-foreground">
                A
              </span>
            }
          />
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 md:flex">
              <Input
                type="search"
                placeholder="Search…"
                aria-label="Search"
                className="h-8 w-48"
              />
              <Kbd>⌘K</Kbd>
            </div>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell />
            </Button>
            <Avatar size="sm">
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      }
      sidebar={
        <nav aria-label="Dashboard" className="p-2">
          <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarItem href="#overview" active>
              <LayoutDashboard /> Dashboard
            </SidebarItem>
            <SidebarItem href="#analytics">
              <BarChart3 /> Analytics
            </SidebarItem>
            <SidebarItem href="#reports">
              <FileText /> Reports
            </SidebarItem>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Commerce</SidebarGroupLabel>
            <SidebarItem href="#orders">
              <ShoppingCart /> Orders
            </SidebarItem>
            <SidebarItem href="#products">
              <Package /> Products
            </SidebarItem>
            <SidebarItem href="#customers">
              <Users /> Customers
            </SidebarItem>
            <SidebarItem href="#billing">
              <CreditCard /> Billing
            </SidebarItem>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarItem href="#settings">
              <Settings /> Settings
            </SidebarItem>
          </SidebarGroup>
        </nav>
      }
    >
      <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, Mira. Here is what changed this week.
            </p>
          </div>
          <Button size="sm">Download report</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatisticCard
            className="max-w-none"
            label="Revenue"
            value="$24,780"
            delta={12.4}
            trend="up"
          />
          <StatisticCard
            className="max-w-none"
            label="Orders"
            value="1,284"
            delta={4.1}
            trend="up"
          />
          <StatisticCard
            className="max-w-none"
            label="Refunds"
            value="23"
            delta={-2.8}
            trend="down"
          />
          <StatisticCard
            className="max-w-none"
            label="Active customers"
            value="8,942"
            delta={1.2}
            trend="up"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
              <CardDescription>Monthly revenue vs. expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={revenueData}
                config={revenueConfig}
                xKey="month"
                height={260}
              />
            </CardContent>
          </Card>
          <Card className="py-0">
            <CardHeader className="border-b py-4">
              <CardTitle>Recent activity</CardTitle>
            </CardHeader>
            <div className="-mt-4">
              <ActivityFeed
                className="rounded-none border-0"
                items={[
                  {
                    id: "1",
                    actor: "Lena Ortiz",
                    action: "approved",
                    target: "invoice #1042",
                    time: "2 minutes ago",
                  },
                  {
                    id: "2",
                    actor: "Owen Park",
                    action: "published",
                    target: "Release 2.4",
                    time: "1 hour ago",
                  },
                  {
                    id: "3",
                    actor: "Sam Rivera",
                    action: "commented on",
                    target: "Q3 roadmap",
                    time: "3 hours ago",
                  },
                  {
                    id: "4",
                    actor: "Aiko Tanaka",
                    action: "invited",
                    target: "3 teammates",
                    time: "Yesterday",
                  },
                ]}
              />
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent orders</CardTitle>
            <CardDescription>Latest transactions across all channels</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[order.status as keyof typeof statusVariant]}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{order.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

export { DashboardPage };
