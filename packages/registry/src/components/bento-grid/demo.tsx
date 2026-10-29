import { Blocks, Keyboard, Palette, Rocket } from "lucide-react";

import { BentoGrid } from "./index";

export function BentoGridBasic() {
  return (
    <BentoGrid
      className="w-full max-w-5xl"
      items={[
        {
          icon: <Blocks />,
          title: "Everything composes",
          description:
            "Primitives, patterns and page sections share the same tokens and spacing scale.",
          media: (
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="h-10 rounded-md border bg-muted/40" />
              ))}
            </div>
          ),
        },
        {
          icon: <Palette />,
          title: "Themeable",
          description: "Swap brand colors in one place.",
        },
        {
          icon: <Keyboard />,
          title: "Keyboard first",
          description: "Focus rings and shortcuts included.",
        },
        {
          icon: <Rocket />,
          title: "Fast setup",
          description: "One CLI command per component.",
        },
      ]}
    />
  );
}

export function BentoGridCompact() {
  return (
    <BentoGrid
      className="w-full max-w-3xl"
      items={[
        {
          title: "Copy-paste registry",
          description: "Own the source from day one.",
        },
        {
          title: "Accessible defaults",
          description: "Tested with axe in CI.",
        },
        {
          title: "Docs included",
          description: "Every component ships with examples.",
        },
      ]}
    />
  );
}
