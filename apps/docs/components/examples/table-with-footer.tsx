"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";

const invoices = [
  { id: "INV001", status: "Paid", amount: 250 },
  { id: "INV002", status: "Pending", amount: 150 },
  { id: "INV003", status: "Unpaid", amount: 350 },
];

export default function TableWithFooter() {
  const total = invoices.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <Table className="w-full max-w-lg">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell>{inv.id}</TableCell>
            <TableCell>{inv.status}</TableCell>
            <TableCell className="text-right">${inv.amount}.00</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">${total}.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
