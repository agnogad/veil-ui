export interface ComparisonPlan {
  name: string;
  price?: string | number;
}

export interface ComparisonRow {
  feature: string;
  values: (boolean | string)[];
}
