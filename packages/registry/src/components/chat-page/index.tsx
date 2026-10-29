import { Archive, ImagePlus, Info, Phone, Plus, Search, Send, Smile, Video } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Avatar, AvatarFallback } from "../avatar/index";
import { Badge } from "../badge/index";
import { Button } from "../button/index";
import { Input } from "../input/index";
import { Logo } from "../logo/index";
import { ScrollArea } from "../scroll-area/index";
import { StatusIndicator } from "../status-indicator/index";

const conversations = [
  {
    name: "Owen Park",
    preview: "The registry build is green again.",
    time: "2m",
    unread: 2,
    active: true,
    status: "online" as const,
  },
  {
    name: "Design guild",
    preview: "Lena: Added the new token page.",
    time: "18m",
    unread: 0,
    active: false,
    status: "away" as const,
  },
  {
    name: "Lena Ortiz",
    preview: "Can you review the empty states?",
    time: "1h",
    unread: 1,
    active: false,
    status: "online" as const,
  },
  {
    name: "Sam Rivera",
    preview: "Triage notes are in the doc.",
    time: "3h",
    unread: 0,
    active: false,
    status: "offline" as const,
  },
  {
    name: "Release crew",
    preview: "Ship checklist for 2.4.0",
    time: "Yesterday",
    unread: 0,
    active: false,
    status: "online" as const,
  },
];

const messages = [
  {
    author: "Owen Park",
    initials: "OP",
    time: "10:42",
    own: false,
    body: "Pushed the fix for the demo source drift. Registry build is green again.",
  },
  {
    author: "Mira Chen",
    initials: "MC",
    time: "10:44",
    own: true,
    body: "Nice. Did the token page make it into this batch?",
  },
  {
    author: "Owen Park",
    initials: "OP",
    time: "10:45",
    own: false,
    body: "Yes — plus the new comparison table demo. Can you take a look at the spacing on the pricing section?",
  },
  {
    author: "Mira Chen",
    initials: "MC",
    time: "10:47",
    own: true,
    body: "On it. I will review before lunch and drop notes in the PR.",
  },
];

function ChatPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-page"
      className={cn(
        "grid min-h-[600px] overflow-hidden rounded-xl border bg-background lg:grid-cols-[280px_1fr]",
        className,
      )}
      {...props}
    >
      <aside className="hidden flex-col border-r lg:flex">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <Logo
            name="Messages"
            size="sm"
            mark={
              <span className="grid size-full place-items-center bg-primary text-[10px] font-bold text-primary-foreground">
                V
              </span>
            }
          />
          <Button variant="ghost" size="icon" aria-label="New conversation">
            <Plus />
          </Button>
        </div>
        <div className="px-3 py-2">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input placeholder="Search messages" aria-label="Search messages" className="h-8 pl-8 text-sm" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <ul className="space-y-0.5 px-2 pb-2">
            {conversations.map((conversation) => (
              <li key={conversation.name}>
                <a
                  href="#thread"
                  aria-current={conversation.active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-accent",
                    conversation.active && "bg-accent",
                  )}
                >
                  <div className="relative">
                    <Avatar size="sm">
                      <AvatarFallback>{conversation.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <StatusIndicator
                      status={conversation.status}
                      label=""
                      className="absolute -bottom-0.5 -right-0.5"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate text-sm font-medium">{conversation.name}</p>
                      <span className="text-[10px] text-muted-foreground">
                        {conversation.time}
                      </span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {conversation.preview}
                    </p>
                  </div>
                  {conversation.unread > 0 ? (
                    <Badge className="size-5 justify-center rounded-full px-0 text-[10px]">
                      {conversation.unread}
                    </Badge>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </ScrollArea>
        <div className="border-t p-3">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Mira Chen</p>
              <p className="text-xs text-muted-foreground">Available</p>
            </div>
            <Button variant="ghost" size="icon" aria-label="Archive">
              <Archive />
            </Button>
          </div>
        </div>
      </aside>

      <section className="flex min-w-0 flex-col">
        <header className="flex items-center gap-3 border-b px-4 py-2.5">
          <Avatar size="sm">
            <AvatarFallback>OP</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Owen Park</p>
            <p className="text-xs text-muted-foreground">
              <StatusIndicator status="online" label="Online" />
            </p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Voice call">
            <Phone />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Video call">
            <Video />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Conversation info">
            <Info />
          </Button>
        </header>

        <ScrollArea className="flex-1">
          <div className="space-y-4 p-4">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" aria-hidden />
              Today
              <span className="h-px flex-1 bg-border" aria-hidden />
            </div>
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-end gap-2",
                  message.own && "flex-row-reverse",
                )}
              >
                <Avatar size="sm">
                  <AvatarFallback>{message.initials}</AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "max-w-[75%] space-y-1",
                    message.own && "items-end text-right",
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-3.5 py-2 text-sm",
                      message.own
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-muted",
                    )}
                  >
                    {message.body}
                  </div>
                  <p className="text-[10px] text-muted-foreground">{message.time}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-1.5 pl-10 text-xs text-muted-foreground">
              <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground" aria-hidden />
              Owen is typing…
            </div>
          </div>
        </ScrollArea>

        <div className="border-t p-3">
          <div className="flex items-end gap-2 rounded-lg border p-1.5">
            <Button variant="ghost" size="icon" aria-label="Add image">
              <ImagePlus />
            </Button>
            <Input
              placeholder="Write a message…"
              aria-label="Message"
              className="h-8 border-0 shadow-none focus-visible:ring-0"
            />
            <Button variant="ghost" size="icon" aria-label="Add emoji">
              <Smile />
            </Button>
            <Button size="icon" aria-label="Send message">
              <Send />
            </Button>
          </div>
          <p className="mt-1.5 text-[10px] text-muted-foreground">
            Enter to send · Shift + Enter for a new line
          </p>
        </div>
      </section>
    </div>
  );
}

export { ChatPage };
