import { forwardRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Table } from '@tanstack/react-table'
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight } from 'lucide-react'

import { randomId } from '@/hooks/randomId'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export interface IPaginationProps {
  /**
   * View the page count. Defaults to `true`.
   */
  viewPageCount?: boolean
  /**
   * View the page number pagination. Defaults to `false`.
   */
  viewPageNumber?: boolean
}
interface IProps<TData> extends React.HTMLAttributes<HTMLDivElement>, IPaginationProps {
  /**
   * The table instance to use for pagination.
   */
  table: Table<TData>
}

function DataTablePaginationBase<TData>(
  { table, viewPageCount = true, viewPageNumber = true, className, ...props }: IProps<TData>,
  ref: React.Ref<HTMLDivElement>,
) {
  const [, setSearchParams] = useSearchParams()

  const currentPage = table.getState().pagination.pageIndex + 1
  const limit = table.getState().pagination.pageSize
  const pages = table.getPageCount()

  const getVisiblePages = (
    currentPage: number,
    totalPages: number,
    maxVisiblePages = 5,
  ): (number | string)[] => {
    const visiblePages: (number | string)[] = []

    // Always add the first page
    visiblePages.push(1)

    if (totalPages <= 1) return visiblePages

    // If the current page is more than 2 steps away from the first page, add an ellipsis
    if (currentPage > 4 && totalPages > 5) {
      visiblePages.push('...')
    }

    // Calculate the start and end indices for the visible pages
    let start = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2))
    const end = Math.min(totalPages - 1, start + maxVisiblePages - 1)

    // Adjust the start index if we're at the end of the page range
    if (currentPage > totalPages - Math.floor(maxVisiblePages / 2)) {
      start = Math.max(2, totalPages - maxVisiblePages)
    }

    // Add the visible pages
    for (let i = start; i <= end; i++) {
      visiblePages.push(i)
    }

    // If the current page is more than 2 steps away from the last page, add an ellipsis
    if (currentPage < totalPages - 3 && totalPages > 5) {
      visiblePages.push('...')
    }

    // Always add the last page
    visiblePages.push(totalPages)

    return visiblePages
  }

  const changePage = (page: number) => () => {
    table.setPageIndex(page)
  }

  return (
    <div ref={ref} className={cn('flex-center mt-4 px-2', className)} {...props}>
      <div className="flex-center ml-auto flex-wrap-reverse gap-x-6 gap-y-2 lg:gap-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${limit}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
              setSearchParams((prev) => {
                prev.set('limit', value)
                return prev
              })
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent className="min-w-[--radix-select-trigger-width]">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {viewPageCount && (
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {currentPage} of {table.getPageCount() || 1}
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Button
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={!table.getCanPreviousPage()}
            variant="outline"
            onClick={() => table.setPageIndex(0)}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft size={20} />
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={!table.getCanPreviousPage()}
            variant="outline"
            onClick={() => table.previousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          {viewPageNumber &&
            getVisiblePages(currentPage, pages).map((page) => {
              const isActive = page === currentPage
              const buttonVariant = isActive ? 'default' : 'outline'
              const buttonState = isActive ? 'selected' : undefined

              if (typeof page === 'string')
                return (
                  <Button
                    key={randomId()}
                    className="pointer-events-none h-8 w-8 p-0"
                    variant="ghost"
                  >
                    ...
                  </Button>
                )

              return (
                <Button
                  key={randomId()}
                  className="h-8 w-8 p-0"
                  data-state={buttonState}
                  variant={buttonVariant}
                  onClick={changePage(page - 1)}
                >
                  {page}
                </Button>
              )
            })}

          <Button
            className="h-8 w-8 p-0"
            disabled={!table.getCanNextPage()}
            variant="outline"
            onClick={() => table.nextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={!table.getCanNextPage()}
            variant="outline"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * @requires `table` should use getPaginationRowModel() for the pagination to work.
 * @returns Pagination component for the table.
 */
export const DataTablePagination = forwardRef(DataTablePaginationBase) as <TData>(
  props: IProps<TData> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement
