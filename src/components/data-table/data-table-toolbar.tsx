import { ReactNode, useEffect } from 'react'

import { Table } from '@tanstack/react-table'

import { DataTableViewOptions } from '@/components/data-table'
import { Input } from '@/components/ui/input'
import useDebouncedState from '@/hooks/useDebouncedState'

import AddGuest from '../guest-management/add-guest'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  toolbarCustomActions?: ({ table }: { table: Table<TData> }) => ReactNode
  endActions?: ({ table }: { table: Table<TData> }) => ReactNode
  debounceTime?: number
  hideViewOption?: boolean
  isDisabledSearch?: boolean
}

export function DataTableToolbar<TData>({
  table,
  toolbarCustomActions,
  endActions,
  debounceTime,
  hideViewOption,
}: Readonly<DataTableToolbarProps<TData>>) {
  const [searchValue, setSearchValue] = useDebouncedState('', debounceTime ?? 0)

  useEffect(() => {
    table.setGlobalFilter(searchValue)
  }, [searchValue])

  return (
    <div className="mb-2 flex-wrap justify-between gap-4 flex-center-y">
      {toolbarCustomActions?.({ table }) ?? null}
      <div className="ml-auto gap-2 flex-center-y">
        <Input
          className="w-[150px] lg:w-[250px]"
          defaultValue={searchValue}
          placeholder="Search in table..."
          onChange={(event) => setSearchValue(event.currentTarget.value)}
        />

        {!hideViewOption && <DataTableViewOptions table={table} />}
        {endActions?.({ table })}

        <AddGuest />
      </div>
    </div>
  )
}
