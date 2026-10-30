export interface CalendarRange {
  from?: Date;
  to?: Date;
}

export type CalendarDisabledMatcher =
  | Date[]
  | ((date: Date) => boolean)
  | { before?: Date; after?: Date; dayOfWeek?: number[] };
