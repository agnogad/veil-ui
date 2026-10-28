"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./index";

const SRC =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop";

export function AvatarBasic() {
  return (
    <Avatar>
      <AvatarImage src={SRC} alt="Ada Lovelace" />
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
  );
}

export function AvatarSizes() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function AvatarFallbackOnly() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="/missing.png" alt="Grace Hopper" />
        <AvatarFallback>GH</AvatarFallback>
      </Avatar>
      <div className="text-sm">
        <p className="font-medium">Grace Hopper</p>
        <p className="text-muted-foreground">grace@veil.dev</p>
      </div>
    </div>
  );
}

export function AvatarGroup() {
  const people = ["AL", "GH", "AT", "KJ"];

  return (
    <div className="flex -space-x-2">
      {people.map((initials) => (
        <Avatar key={initials} className="ring-2 ring-background">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ))}
      <Avatar className="ring-2 ring-background">
        <AvatarFallback className="bg-foreground text-background">
          +4
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
