import { AtSign, Briefcase, GitBranch } from "lucide-react";

import { MarketingFooter } from "./index";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "#components" },
      { label: "Templates", href: "#templates" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "#docs" },
      { label: "Changelog", href: "#changelog" },
      { label: "Figma kit", href: "#figma" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export function MarketingFooterBasic() {
  return (
    <MarketingFooter
      className="w-full rounded-xl border"
      description="Accessible primitives and page sections for product teams."
      columns={columns}
      social={[
        { label: "GitHub", href: "#github", icon: <GitBranch /> },
        { label: "Twitter", href: "#twitter", icon: <AtSign /> },
        { label: "LinkedIn", href: "#linkedin", icon: <Briefcase /> },
      ]}
      legal={<p>© 2026 Veil UI. All rights reserved.</p>}
    />
  );
}

export function MarketingFooterMinimal() {
  return (
    <MarketingFooter
      className="w-full rounded-xl border"
      columns={[
        {
          title: "Legal",
          links: [
            { label: "Privacy", href: "#privacy" },
            { label: "Terms", href: "#terms" },
          ],
        },
      ]}
      legal={<p>Built with Veil UI.</p>}
    />
  );
}
