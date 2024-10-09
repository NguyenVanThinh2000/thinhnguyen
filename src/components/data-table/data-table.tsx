import { Table as TableProps, flexRender } from '@tanstack/react-table'
import { X } from 'lucide-react'

import { DataTableGroupedCell, DataTablePagination } from '.'
import { Badge } from '../ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { IPaginationProps } from './date-table-pagination'

interface DataTableProps<TData> {
  table: TableProps<TData>

  /**
   * Table Pagination Props
   */
  pagination?: IPaginationProps | false
}

export function DataTable<TData>({
  table,
  pagination = {
    viewPageCount: true,
    viewPageNumber: true,
  },
}: DataTableProps<TData>) {
  const { grouping } = table.getState()
  return (
    <div className="space-y-4">
      {grouping.length > 0 && (
        <div className="flex items-center gap-2 rounded-md border bg-background px-4 py-2">
          <p className="text-sm">Grouped by </p>
          <div className="flex items-center gap-2">
            {grouping.map((column, index) => {
              return (
                <div key={column} className="flex gap-2">
                  {!!index && <p>, then by</p>}
                  <Badge className="capitalize">
                    {column}
                    <X
                      className="ml-2 h-4 w-4 cursor-pointer rounded-sm hover:bg-primary-foreground hover:text-primary"
                      onClick={() => {
                        const temp = grouping.filter((element) => element !== column)
                        table.setGrouping(temp)
                      }}
                    />
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <DataTableGroupedCell key={cell.id} cell={cell} row={row} />
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={table.getHeaderGroups()[0].headers.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && <DataTablePagination table={table} {...pagination} />}
    </div>
  )
}
