"use client";

import { DataTable, type DataTableColumn } from "./index";

interface Member {
  name: string;
  role: string;
  commits: number;
  [key: string]: string | number;
}

const columns: DataTableColumn<Member>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "role", header: "Role", sortable: true },
  { key: "commits", header: "Commits", align: "right", sortable: true },
];

const members: Member[] = [
  { name: "Ada Lovelace", role: "Engineer", commits: 128 },
  { name: "Grace Hopper", role: "Admiral", commits: 96 },
  { name: "Alan Turing", role: "Researcher", commits: 74 },
];

export function DataTableBasic() {
  return <DataTable columns={columns} data={members} caption="Team activity" />;
}

export function DataTableEmpty() {
  return (
    <DataTable
      columns={columns}
      data={[]}
      caption="Team activity"
      emptyMessage="No members match this filter."
    />
  );
}
