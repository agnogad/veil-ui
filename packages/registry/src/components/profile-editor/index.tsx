"use client";

import { Camera } from "lucide-react";
import { useState } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar/index";
import { Button } from "../button/index";
import { Input } from "../input/index";
import { Label } from "../label/index";
import { Textarea } from "../textarea/index";

interface ProfileEditorProps
  extends Omit<React.ComponentProps<"form">, "onSubmit" | "title"> {
  defaultName?: string;
  defaultHandle?: string;
  defaultBio?: string;
  defaultWebsite?: string;
  avatarSrc?: string;
  onSave?: (values: {
    name: string;
    handle: string;
    bio: string;
    website: string;
  }) => void;
  onCancel?: () => void;
}

function ProfileEditor({
  className,
  defaultName = "",
  defaultHandle = "",
  defaultBio = "",
  defaultWebsite = "",
  avatarSrc,
  onSave,
  onCancel,
  ...props
}: ProfileEditorProps) {
  const [name, setName] = useState(defaultName);
  const [handle, setHandle] = useState(defaultHandle);
  const [bio, setBio] = useState(defaultBio);
  const [website, setWebsite] = useState(defaultWebsite);

  const fallback = (name || "?").slice(0, 2).toUpperCase();

  return (
    <form
      data-slot="profile-editor"
      className={cn("grid w-full max-w-lg gap-5", className)}
      onSubmit={(event) => {
        event.preventDefault();
        onSave?.({ name, handle, bio, website });
      }}
      {...props}
    >
      <div className="flex items-center gap-4">
        <Avatar size="lg">
          {avatarSrc ? <AvatarImage src={avatarSrc} alt="" /> : null}
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <Button type="button" size="sm" variant="outline">
          <Camera aria-hidden /> Change photo
        </Button>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="profile-name">Name</Label>
        <Input
          id="profile-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="profile-handle">Handle</Label>
        <Input
          id="profile-handle"
          value={handle}
          onChange={(event) => setHandle(event.target.value)}
          placeholder="ada"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="profile-bio">Bio</Label>
        <Textarea
          id="profile-bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          rows={3}
          placeholder="A short introduction."
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="profile-website">Website</Label>
        <Input
          id="profile-website"
          type="url"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          placeholder="https://example.com"
        />
      </div>
      <div className="flex justify-end gap-2">
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}

export { ProfileEditor };
export type { ProfileEditorProps };
