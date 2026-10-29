export interface MegaMenuLink {
  label: string;
  description?: string;
  href: string;
}

export interface MegaMenuColumn {
  title: string;
  links: MegaMenuLink[];
}

export interface MegaMenuItem {
  label: string;
  columns: MegaMenuColumn[];
}

export interface MegaMenuProps {
  items: MegaMenuItem[];
  class?: string;
}
