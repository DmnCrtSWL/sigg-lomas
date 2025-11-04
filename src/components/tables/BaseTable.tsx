"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface BaseTableProps {
  columns: Column[];
  data: any[];
}

export default function BaseTable({ columns, data }: BaseTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[900px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.05]">
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.accessor}
                    isHeader
                    className="px-5 py-3 font-semibold text-gray-600 text-start text-sm dark:text-gray-300"
                  >
                    {col.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                    {columns.map((col) => (
                      <TableCell
                        key={col.accessor}
                        className="px-5 py-4 text-gray-700 text-sm dark:text-gray-300"
                      >
                        {col.render
                          ? col.render(row[col.accessor], row)
                          : row[col.accessor]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="py-6 text-center text-gray-500 text-sm dark:text-gray-400"
                  >
                    No hay datos disponibles
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
