"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Column<T extends Record<string, unknown>> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface BaseTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
}

export default function BaseTable<T extends Record<string, unknown>>({
  columns,
  data,
}: BaseTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[900px]">
          <Table>
            {/* Encabezado */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.05]">
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={String(col.accessor)}
                    isHeader
                    className="px-5 py-3 font-semibold text-gray-600 text-start text-sm dark:text-gray-300"
                  >
                    {col.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Cuerpo */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  >
                    {columns.map((col) => {
                      const value = row[col.accessor];

                      return (
                        <TableCell
                          key={String(col.accessor)}
                          className="px-5 py-4 text-gray-700 text-sm dark:text-gray-300"
                        >
                          {typeof col.render === "function"
                            ? col.render(value, row)
                            : (value as React.ReactNode)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    {...({
                      colSpan: columns.length,
                      style: { textAlign: "center" },
                    } as React.TdHTMLAttributes<HTMLTableCellElement>)}
                    className="py-6 text-gray-500 text-sm dark:text-gray-400"
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
