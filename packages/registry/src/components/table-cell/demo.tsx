import { Badge } from "../badge/index";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/index";
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

export function TableCellStatus() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV-2041</TableCell>
          <TableCell>
            <Badge variant="secondary">Paid</Badge>
          </TableCell>
          <TableCell className="text-right tabular-nums">$240.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV-2042</TableCell>
          <TableCell>
            <Badge variant="outline">Pending</Badge>
          </TableCell>
          <TableCell className="text-right tabular-nums">$1,120.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
