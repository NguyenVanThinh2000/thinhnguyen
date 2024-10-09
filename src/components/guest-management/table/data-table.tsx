import * as React from 'react'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { DataTableToolbar } from '@/components/data-table/'
import { DataTable as DataTableBase } from '@/components/data-table/data-table'
import { TGuestListData } from '@/types'

interface DataTableProps {
  columns: ColumnDef<TGuestListData>[]
  data: TGuestListData[]
}

export function DataTable({ columns, data }: Readonly<DataTableProps>) {
  const [globalFilter, setGlobalFilter] = React.useState<string>('')
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      pagination: {
        pageSize: 1000,
        pageIndex: 0,
      },
    },
    initialState: {
      columnVisibility: {
        emailUserCreate: false,
      },
    },

    enableHiding: true,
    enableGrouping: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,

    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })
  return (
    <div className="space-y-4 bg-background">
      <DataTableToolbar isDisabledSearch debounceTime={700} table={table} />
      <DataTableBase pagination={false} table={table} />
    </div>
  )
}
