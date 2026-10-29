const alignments = {
  start: "justify-start",
  end: "justify-end",
  between: "justify-between",
  center: "justify-center",
} as const;

export type FormActionsAlign = keyof typeof alignments;
