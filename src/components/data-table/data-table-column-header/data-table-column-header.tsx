import { Column } from '@tanstack/react-table'

import { cn } from '@/lib/utils'

import { ActionsMenu } from './actions'
import { SortButton } from './sort-button'

export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: Readonly<DataTableColumnHeaderProps<TData, TValue>>) {
  if (!column.getCanSort() && !column.getCanGroup()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn('flex-center-y justify-between gap-2', className)}>
      <div className="flex-center-y gap-1">
        <span className="whitespace-nowrap">{title}</span>
        {/* SORT ICONS */}
        {column.getCanSort() && (
          <SortButton
            direction={column.getIsSorted()}
            title={title}
            onClick={() => column.toggleSorting()}
          />
        )}
      </div>
      <div className="flex-center-y gap-1">
        {/* {column.getCanGroup() ? (
          // If the header can be grouped, let's add a toggle
          <Button
            size={'icon'}
            variant={'ghost'}
            {...{
              onClick: column.getToggleGroupingHandler(),
            }}
          >
            {!column.getIsGrouped() ? <Group /> : <Ungroup />}
          </Button>
        ) : // <ButtonWithTooltip
        //   label={!column.getIsGrouped() ? 'Group' : 'Un-group'}
        //   size={'icon'}
        //   variant={'ghost'}
        //   {...{
        //     onClick: column.getToggleGroupingHandler(),
        //   }}
        // >
        //   {!column.getIsGrouped() ? <Group /> : <Ungroup />}
        // </ButtonWithTooltip>
        null} */}
        {/* ACTION MENU */}
        <ActionsMenu column={column} title="" />
      </div>
    </div>
  )
}
