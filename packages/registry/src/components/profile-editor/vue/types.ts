export interface ProfileEditorValues {
  name: string;
  handle: string;
  bio: string;
  website: string;
}

export interface ProfileEditorProps {
  class?: string;
  defaultName?: string;
  defaultHandle?: string;
  defaultBio?: string;
  defaultWebsite?: string;
  avatarSrc?: string;
}
