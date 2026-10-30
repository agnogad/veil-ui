export interface DataTableColumn {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
}
