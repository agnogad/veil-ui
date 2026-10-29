import { Table, TableBody, TableRow } from "../table/index";
import { TableCell } from "./index";

export function TableCellBasic() {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right">$750.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
