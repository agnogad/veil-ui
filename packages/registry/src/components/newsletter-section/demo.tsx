"use client";

import { NewsletterSection } from "./index";

export function NewsletterSectionBasic() {
  return (
    <NewsletterSection
      className="w-full max-w-3xl"
      onSubmit={() => {}}
    />
  );
}

export function NewsletterSectionCustom() {
  return (
    <NewsletterSection
      className="w-full max-w-3xl"
      title="Get the changelog"
      description="Every release, summarized in one email."
      placeholder="team@company.com"
      buttonLabel="Join list"
      successMessage="You are on the list."
      onSubmit={() => {}}
    />
  );
}
