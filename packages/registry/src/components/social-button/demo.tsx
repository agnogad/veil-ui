"use client";

import { Mail } from "lucide-react";

import { SocialButton, SocialButtonGroup } from "./index";

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.98-4.33 2.98-7.35Z" />
      <path d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.24-2.5c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.58A10 10 0 0 0 12 22Z" />
      <path d="M6.41 13.92a6 6 0 0 1 0-3.84V7.5H3.07a10 10 0 0 0 0 9l3.34-2.58Z" />
      <path d="M12 5.96c1.47 0 2.79.5 3.82 1.49l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.5l3.34 2.58C7.2 7.72 9.4 5.96 12 5.96Z" />
    </svg>
  );
}

export function SocialButtonBasic() {
  return (
    <SocialButton icon={<GitHubMark />} className="max-w-sm">
      Continue with GitHub
    </SocialButton>
  );
}

export function SocialButtonProviders() {
  return (
    <SocialButtonGroup className="max-w-sm">
      <SocialButton icon={<GitHubMark />}>Continue with GitHub</SocialButton>
      <SocialButton icon={<GoogleMark />}>Continue with Google</SocialButton>
      <SocialButton icon={<Mail />}>Continue with email</SocialButton>
    </SocialButtonGroup>
  );
}

export function SocialButtonSizes() {
  return (
    <SocialButtonGroup className="max-w-sm">
      <SocialButton size="sm" icon={<GitHubMark />}>
        Continue with GitHub
      </SocialButton>
      <SocialButton size="default" icon={<GitHubMark />}>
        Continue with GitHub
      </SocialButton>
      <SocialButton size="lg" icon={<GitHubMark />}>
        Continue with GitHub
      </SocialButton>
    </SocialButtonGroup>
  );
}
