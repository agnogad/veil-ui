export interface TocItem {
  id: string;
  title: string;
  level?: 2 | 3 | 4;
}

export interface TableOfContentsProps {
  items: TocItem[];
  activeId?: string;
  label?: string;
  onNavigate?: (id: string) => void;
  class?: string;
}
