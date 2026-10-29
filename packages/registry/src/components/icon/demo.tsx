import { ArrowRight, Heart, Mail } from "lucide-react";

import { Icon } from "./index";

export function IconBasic() {
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      Continue <Icon icon={ArrowRight} />
    </span>
  );
}

export function IconLabeled() {
  return <Icon icon={Heart} label="Favorite" className="text-destructive" />;
}

export function IconSizes() {
  return (
    <div className="flex items-end gap-3">
      <Icon icon={Mail} size="xs" />
      <Icon icon={Mail} size="sm" />
      <Icon icon={Mail} size="md" />
      <Icon icon={Mail} size="lg" />
      <Icon icon={Mail} size="xl" />
    </div>
  );
}
