import { ColumnDef } from '@tanstack/react-table'

// import { DataTableColumnHeader } from '@/components/data-table/'
import { TGuestListData } from '@/types'

export const columns: ColumnDef<TGuestListData>[] = [
  {
    accessorKey: 'id',
    id: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'nameInInvitation',
    id: 'nameInInvitation',
    header: 'Name in Invitation',
  },
  {
    accessorKey: 'isAttending',
    id: 'isAttending',
    header: 'Is Attending',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => {
      return <div>Actions</div>
    },
  },
]
