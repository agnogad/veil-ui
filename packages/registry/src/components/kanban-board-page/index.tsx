import {
  Calendar,
  CircleDot,
  Filter,
  GripVertical,
  MessageSquare,
  Paperclip,
  Plus,
  Search,
} from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Avatar, AvatarFallback } from "../avatar/index";
import { AvatarGroup } from "../avatar-group/index";
import { Badge } from "../badge/index";
import { Button } from "../button/index";
import { Input } from "../input/index";
import { Logo } from "../logo/index";

const columns = [
  {
    title: "Backlog",
    tone: "bg-muted-foreground",
    cards: [
      {
        title: "Audit focus rings across form controls",
        tag: "a11y",
        tagVariant: "secondary" as const,
        priority: "Low",
        assignees: ["AT"],
        due: "Nov 8",
        comments: 2,
        attachments: 0,
      },
      {
        title: "Add dark mode screenshots to the docs",
        tag: "docs",
        tagVariant: "outline" as const,
        priority: "Low",
        assignees: ["LO"],
        due: "Nov 12",
        comments: 1,
        attachments: 4,
      },
      {
        title: "Investigate bundle size of chart wrappers",
        tag: "performance",
        tagVariant: "muted" as const,
        priority: "Medium",
        assignees: ["OP", "SR"],
        due: "Nov 5",
        comments: 5,
        attachments: 0,
      },
    ],
  },
  {
    title: "In progress",
    tone: "bg-indigo-500",
    cards: [
      {
        title: "Registry CLI: support bun lockfiles",
        tag: "feature",
        tagVariant: "default" as const,
        priority: "High",
        assignees: ["OP"],
        due: "Oct 30",
        comments: 8,
        attachments: 1,
      },
      {
        title: "Polish mobile filter sheet gestures",
        tag: "mobile",
        tagVariant: "secondary" as const,
        priority: "Medium",
        assignees: ["MC", "LO"],
        due: "Oct 31",
        comments: 3,
        attachments: 2,
      },
    ],
  },
  {
    title: "Review",
    tone: "bg-amber-500",
    cards: [
      {
        title: "New comparison table demo",
        tag: "docs",
        tagVariant: "outline" as const,
        priority: "Medium",
        assignees: ["SR"],
        due: "Oct 29",
        comments: 4,
        attachments: 0,
      },
      {
        title: "Token naming cleanup",
        tag: "design system",
        tagVariant: "secondary" as const,
        priority: "High",
        assignees: ["LO", "MC"],
        due: "Oct 28",
        comments: 12,
        attachments: 3,
      },
    ],
  },
  {
    title: "Done",
    tone: "bg-emerald-500",
    cards: [
      {
        title: "Fix chart demos missing client boundary",
        tag: "bug",
        tagVariant: "destructive" as const,
        priority: "High",
        assignees: ["OP"],
        due: "Oct 26",
        comments: 6,
        attachments: 0,
      },
      {
        title: "Publish 40 mobile & marketing components",
        tag: "release",
        tagVariant: "default" as const,
        priority: "High",
        assignees: ["MC", "OP", "LO"],
        due: "Oct 24",
        comments: 9,
        attachments: 1,
      },
    ],
  },
];

function KanbanBoardPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kanban-board-page"
      className={cn(
        "flex min-h-[600px] flex-col overflow-hidden rounded-xl border bg-background",
        className,
      )}
      {...props}
    >
      <header className="flex flex-wrap items-center gap-3 border-b px-5 py-3">
        <Logo
          name="Sprint 24"
          size="sm"
          mark={
            <span className="grid size-full place-items-center bg-primary text-[10px] font-bold text-primary-foreground">
              S
            </span>
          }
        />
        <Badge variant="secondary">Oct 21 – Nov 3</Badge>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="relative hidden sm:block">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              placeholder="Search tasks…"
              aria-label="Search tasks"
              className="h-8 w-40 pl-8 text-sm"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter /> Filter
          </Button>
          <Button size="sm">
            <Plus /> New task
          </Button>
        </div>
      </header>

      <div className="flex items-center gap-3 border-b px-5 py-2.5">
        <AvatarGroup
          users={[
            { name: "Mira Chen" },
            { name: "Owen Park" },
            { name: "Lena Ortiz" },
            { name: "Sam Rivera" },
            { name: "Aiko Tanaka" },
          ]}
          max={4}
          size="sm"
          label="Board members"
        />
        <span className="text-xs text-muted-foreground">5 members · 12 tasks</span>
        <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
          <CircleDot className="size-3.5" aria-hidden />
          Updated 2 minutes ago
        </div>
      </div>

      <div className="flex-1 overflow-x-auto p-4">
        <div className="grid min-w-[900px] grid-cols-4 gap-4">
          {columns.map((column) => (
            <section
              key={column.title}
              aria-label={column.title}
              className="flex flex-col gap-3 rounded-lg bg-muted/30 p-2.5"
            >
              <header className="flex items-center gap-2 px-1">
                <span
                  className={cn("size-2 rounded-full", column.tone)}
                  aria-hidden
                />
                <h2 className="text-sm font-medium">{column.title}</h2>
                <Badge variant="muted" className="ml-auto">
                  {column.cards.length}
                </Badge>
                <Button variant="ghost" size="icon" aria-label={`Add to ${column.title}`}>
                  <Plus />
                </Button>
              </header>

              <ul className="space-y-2.5">
                {column.cards.map((card) => (
                  <li
                    key={card.title}
                    className="rounded-lg border bg-card p-3 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant={card.tagVariant}>{card.tag}</Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6 text-muted-foreground"
                        aria-label="Reorder task"
                      >
                        <GripVertical />
                      </Button>
                    </div>
                    <p className="mt-2 text-sm font-medium leading-snug">
                      {card.title}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3.5" aria-hidden />
                        {card.due}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageSquare className="size-3.5" aria-hidden />
                        {card.comments}
                      </span>
                      {card.attachments > 0 ? (
                        <span className="inline-flex items-center gap-1">
                          <Paperclip className="size-3.5" aria-hidden />
                          {card.attachments}
                        </span>
                      ) : null}
                      <div className="ml-auto flex items-center -space-x-1.5">
                        {card.assignees.map((initials) => (
                          <Avatar
                            key={initials}
                            size="sm"
                            className="size-6 ring-2 ring-card"
                          >
                            <AvatarFallback className="text-[9px]">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-muted-foreground"
              >
                <Plus /> Add card
              </Button>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export { KanbanBoardPage };
