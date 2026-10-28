interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export function PropsTable({ data }: { data: PropRow[] }) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-left">
            <th className="px-3 py-2 font-medium">Prop</th>
            <th className="px-3 py-2 font-medium">Type</th>
            <th className="px-3 py-2 font-medium">Default</th>
            <th className="px-3 py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.name} className="border-b last:border-b-0">
              <td className="whitespace-nowrap px-3 py-2 align-top font-mono text-xs">
                {row.name}
              </td>
              <td className="px-3 py-2 align-top font-mono text-xs text-muted-foreground">
                {row.type}
              </td>
              <td className="whitespace-nowrap px-3 py-2 align-top font-mono text-xs text-muted-foreground">
                {row.default ?? "—"}
              </td>
              <td className="px-3 py-2 align-top text-muted-foreground">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
