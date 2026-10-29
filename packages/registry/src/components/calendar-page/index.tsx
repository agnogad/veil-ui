import { CalendarDays, ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Avatar, AvatarFallback } from "../avatar/index";
import { Badge } from "../badge/index";
import { Button } from "../button/index";
import { Calendar } from "../calendar/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card/index";
import { SegmentedNavigation } from "../segmented-navigation/index";
import { Timeline } from "../timeline/index";

const events = [
  {
    title: "Design review",
    time: "09:30",
    people: ["MC", "OP"],
    accent: "bg-indigo-500",
    description: "Walk through the new dashboard layouts with the product team.",
  },
  {
    title: "Sprint planning",
    time: "11:00",
    people: ["LO", "SR", "AT"],
    accent: "bg-emerald-500",
    description: "Scope the next sprint and confirm the release checklist.",
  },
  {
    title: "Customer call — Globex",
    time: "14:00",
    people: ["MC"],
    accent: "bg-amber-500",
    description: "Collect feedback on the beta and answer integration questions.",
  },
  {
    title: "Focus time",
    time: "16:00",
    people: [],
    accent: "bg-muted-foreground",
    description: "No meetings. Heads down on the component registry.",
  },
];

function CalendarPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="calendar-page"
      className={cn("space-y-5 rounded-xl border bg-background p-5 sm:p-6", className)}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Calendar</h1>
          <p className="text-sm text-muted-foreground">
            Plan your week and keep the team in sync.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <SegmentedNavigation
            label="Calendar view"
            value="week"
            options={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
            ]}
          />
          <Button size="sm">
            <Plus /> New event
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[auto_1fr]">
        <Card className="w-fit">
          <CardContent>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">October 2026</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" aria-label="Previous month">
                  <ChevronLeft />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Next month">
                  <ChevronRight />
                </Button>
              </div>
            </div>
            <Calendar
              mode="single"
              selected={new Date(2026, 9, 27)}
              defaultMonth={new Date(2026, 9, 1)}
            />
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-indigo-500" aria-hidden />
                Meetings
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-amber-500" aria-hidden />
                External
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-muted-foreground" aria-hidden />
                Focus
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="size-4 text-muted-foreground" aria-hidden />
                Tuesday, October 27
              </CardTitle>
              <CardDescription>4 events scheduled</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.title}
                  className="flex gap-3 rounded-lg border p-3"
                >
                  <span
                    className={cn("w-1 shrink-0 rounded-full", event.accent)}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium">{event.title}</p>
                      <Badge variant="muted">{event.time}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                  {event.people.length > 0 ? (
                    <div className="hidden items-center -space-x-2 sm:flex">
                      {event.people.map((person) => (
                        <Avatar key={person} size="sm" className="ring-2 ring-background">
                          <AvatarFallback className="text-[10px]">
                            {person}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="text-base font-medium">Upcoming milestones</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline
                items={[
                  {
                    title: "Release 2.4 freeze",
                    time: "Oct 29",
                    description: "Final QA sign-off before the production rollout.",
                  },
                  {
                    title: "Quarterly review",
                    time: "Nov 3",
                    description: "Share progress against the Q4 roadmap.",
                    status: "warning",
                  },
                  {
                    title: "Design system audit",
                    time: "Nov 10",
                    description: "Review token coverage across all components.",
                  },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export { CalendarPage };
