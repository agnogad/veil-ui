export interface MobileNavbarLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface MobileNavbarProps {
  title?: string;
  links: MobileNavbarLink[];
  class?: string;
}
