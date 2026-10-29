export type SectionId = "profile" | "security" | "notifications";

export interface AccountSettingsProps {
  class?: string;
  defaultSection?: SectionId;
  email?: string;
  name?: string;
}
