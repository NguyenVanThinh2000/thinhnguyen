import { ReactNode, useEffect, useState } from 'react'

import { Table } from '@tanstack/react-table'
import { Search, SearchX } from 'lucide-react'

import { DataTableViewOptions } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import useDebouncedState from '@/hooks/useDebouncedState'

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
  isDisabledSearch = false,
}: Readonly<DataTableToolbarProps<TData>>) {
  const [isSearch, setIsSearch] = useState(window.screen.width > 768)
  const [searchValue, setSearchValue] = useDebouncedState('', debounceTime ?? 0)

  useEffect(() => {
    table.setGlobalFilter(searchValue)
  }, [searchValue])

  return (
    <div className="flex-center-y mb-2 flex-wrap justify-between gap-4">
      {toolbarCustomActions?.({ table }) ?? null}
      <div className="flex-center-y ml-auto gap-2">
        {!isDisabledSearch ? (
          !isSearch ? (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" onClick={() => setIsSearch(true)}>
                    <Search size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Show Search</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <>
              <Input
                className="h-8 w-[150px] lg:w-[250px]"
                defaultValue={searchValue}
                placeholder="Search in table..."
                onChange={(event) => setSearchValue(event.currentTarget.value)}
              />
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" onClick={() => setIsSearch(false)}>
                      <SearchX size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Hide Search</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )
        ) : null}
        {!hideViewOption && <DataTableViewOptions table={table} />}
        {endActions?.({ table })}
      </div>
    </div>
  )
}
