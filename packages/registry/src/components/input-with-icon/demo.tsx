import { Mail, Search } from "lucide-react";

import { InputWithIcon } from "./index";

export function InputWithIconBasic() {
  return (
    <div className="w-full max-w-xs">
      <InputWithIcon
        icon={Mail}
        type="email"
        aria-label="Email"
        placeholder="you@example.com"
      />
    </div>
  );
}

export function InputWithIconTrailing() {
  return (
    <div className="w-full max-w-xs">
      <InputWithIcon
        icon={Search}
        position="right"
        aria-label="Search"
        placeholder="Search…"
      />
    </div>
  );
}
