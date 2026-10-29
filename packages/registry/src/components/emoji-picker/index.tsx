"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@veil-ui/utils";

import { Input } from "../input/index";

interface Emoji {
  emoji: string;
  name: string;
}

const emojis: Emoji[] = [
  { emoji: "😀", name: "grinning face" },
  { emoji: "😃", name: "smiling face" },
  { emoji: "😄", name: "smile" },
  { emoji: "😁", name: "beaming face" },
  { emoji: "😆", name: "laughing" },
  { emoji: "😅", name: "sweat smile" },
  { emoji: "😂", name: "joy" },
  { emoji: "🙂", name: "slight smile" },
  { emoji: "😉", name: "wink" },
  { emoji: "😊", name: "blush" },
  { emoji: "😍", name: "heart eyes" },
  { emoji: "😘", name: "kiss" },
  { emoji: "😎", name: "sunglasses" },
  { emoji: "🤔", name: "thinking" },
  { emoji: "😴", name: "sleeping" },
  { emoji: "😭", name: "crying" },
  { emoji: "😡", name: "angry" },
  { emoji: "🥳", name: "party" },
  { emoji: "👍", name: "thumbs up" },
  { emoji: "👎", name: "thumbs down" },
  { emoji: "👏", name: "clap" },
  { emoji: "🙌", name: "raised hands" },
  { emoji: "🙏", name: "pray" },
  { emoji: "💪", name: "flex" },
  { emoji: "👋", name: "wave" },
  { emoji: "🤝", name: "handshake" },
  { emoji: "❤️", name: "red heart" },
  { emoji: "🧡", name: "orange heart" },
  { emoji: "💛", name: "yellow heart" },
  { emoji: "💚", name: "green heart" },
  { emoji: "💙", name: "blue heart" },
  { emoji: "💜", name: "purple heart" },
  { emoji: "🖤", name: "black heart" },
  { emoji: "⭐", name: "star" },
  { emoji: "✨", name: "sparkles" },
  { emoji: "🔥", name: "fire" },
  { emoji: "🎉", name: "tada" },
  { emoji: "🚀", name: "rocket" },
  { emoji: "✅", name: "check mark" },
  { emoji: "❌", name: "cross mark" },
  { emoji: "⚠️", name: "warning" },
  { emoji: "💡", name: "idea" },
  { emoji: "📌", name: "pin" },
  { emoji: "📎", name: "paperclip" },
  { emoji: "📅", name: "calendar" },
  { emoji: "⏰", name: "alarm" },
  { emoji: "🔔", name: "bell" },
  { emoji: "💬", name: "speech" },
];

interface EmojiPickerProps {
  onSelect?: (emoji: string) => void;
  emojis?: Emoji[];
  label?: string;
  className?: string;
}

function EmojiPicker({
  onSelect,
  emojis: options = emojis,
  label = "Emoji picker",
  className,
}: EmojiPickerProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return options;
    return options.filter((item) => item.name.includes(term));
  }, [options, query]);

  return (
    <div
      data-slot="emoji-picker"
      className={cn(
        "w-full max-w-sm rounded-lg border bg-card p-3 shadow-xs",
        className,
      )}
    >
      <div className="relative mb-3">
        <Search
          className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search emoji"
          aria-label={`${label}, search`}
          className="pl-8"
        />
      </div>
      {filtered.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          No emoji found.
        </p>
      ) : (
        <ul
          aria-label={label}
          className="grid max-h-56 grid-cols-8 gap-1 overflow-y-auto"
        >
          {filtered.map((item) => (
            <li key={item.emoji}>
              <button
                type="button"
                aria-label={item.name}
                title={item.name}
                onClick={() => onSelect?.(item.emoji)}
                className="flex size-8 items-center justify-center rounded-md text-lg outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.emoji}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { EmojiPicker, type Emoji };
