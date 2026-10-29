import { Table, TableBody, TableCell, TableHeader, TableRow } from "../table/index";

export function TableRowBasic() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Plan</TableCell>
          <TableCell>Seats</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Team</TableCell>
          <TableCell>8</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
