import { ArrowDownIcon, ArrowUpIcon, EyeOff, MoreVertical } from 'lucide-react'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui'

import { DataTableColumnHeaderProps } from './data-table-column-header'

type ActionsMenuProps<TData, TValue> = DataTableColumnHeaderProps<TData, TValue>

export const ActionsMenu = <TData, TValue>({ column }: ActionsMenuProps<TData, TValue>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreVertical size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {column.getCanSort() && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                <ArrowUpIcon size={16} />
                ASC
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                <ArrowDownIcon size={16} />
                DESC
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}

        {column.getCanHide() && (
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff size={16} />
            Hide
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
