"use client";

import { useState } from "react";

import { ProfileEditor } from "./index";

export function ProfileEditorBasic() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="grid w-full max-w-lg gap-3">
      <ProfileEditor
        className="rounded-xl border bg-background p-5"
        defaultName="Ada Lovelace"
        defaultHandle="ada"
        defaultBio="Mathematician and writer."
        defaultWebsite="https://ada.dev"
        onSave={() => setSaved(true)}
        onCancel={() => setSaved(false)}
      />
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {saved ? "Profile saved." : "Changes are local until you save."}
      </p>
    </div>
  );
}

export function ProfileEditorEmpty() {
  return (
    <ProfileEditor
      className="w-full max-w-lg rounded-xl border bg-background p-5"
      onSave={() => {}}
    />
  );
}
