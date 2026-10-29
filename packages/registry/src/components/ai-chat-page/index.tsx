import { Bot, Copy, MoreHorizontal, Paperclip, RefreshCw, Send, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Avatar, AvatarFallback } from "../avatar/index";
import { Badge } from "../badge/index";
import { Button } from "../button/index";
import { Input } from "../input/index";
import { Logo } from "../logo/index";
import { ScrollArea } from "../scroll-area/index";

const suggestions = [
  "Draft a release note for 2.4",
  "Explain our token naming rules",
  "Find components with a11y gaps",
];

function AiChatPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="ai-chat-page"
      className={cn(
        "flex min-h-[600px] flex-col overflow-hidden rounded-xl border bg-background",
        className,
      )}
      {...props}
    >
      <header className="flex items-center gap-3 border-b px-4 py-2.5">
        <Logo
          name="Veil Assistant"
          size="sm"
          mark={
            <span className="grid size-full place-items-center bg-primary text-primary-foreground">
              <Sparkles className="size-3.5" aria-hidden />
            </span>
          }
        />
        <Badge variant="secondary" className="hidden sm:inline-flex">
          GPT-5 · fast
        </Badge>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            New chat
          </Button>
          <Button variant="ghost" size="icon" aria-label="Chat options">
            <MoreHorizontal />
          </Button>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6">
          <div className="flex items-start justify-end gap-2">
            <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
              Can you summarize what changed in the registry build this week?
            </div>
            <Avatar size="sm">
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex items-start gap-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Bot className="size-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1 space-y-3">
              <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm leading-relaxed">
                <p>Here is a summary of this week&apos;s registry changes:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>
                    <strong>40 new components</strong> landed across mobile,
                    marketing and auth groups.
                  </li>
                  <li>
                    Demo source generation now validates every exported example
                    before the build succeeds.
                  </li>
                  <li>
                    Fixed a server-rendering crash caused by chart demos missing
                    a client boundary.
                  </li>
                  <li>
                    Documentation grew to 254 static pages, with navigation
                    grouped by category.
                  </li>
                </ul>
                <p className="mt-2">
                  Want me to draft the release notes or open a changelog entry?
                </p>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Button variant="ghost" size="icon" aria-label="Copy response">
                  <Copy />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Good response">
                  <ThumbsUp />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Bad response">
                  <ThumbsDown />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Regenerate">
                  <RefreshCw />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="border-t px-4 py-3">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex items-end gap-2 rounded-xl border p-2 shadow-xs">
            <Button variant="ghost" size="icon" aria-label="Attach file">
              <Paperclip />
            </Button>
            <Input
              placeholder="Ask anything about your components…"
              aria-label="Message"
              className="h-9 border-0 shadow-none focus-visible:ring-0"
            />
            <Button size="icon" aria-label="Send message">
              <Send />
            </Button>
          </div>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            The assistant can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}

export { AiChatPage };
