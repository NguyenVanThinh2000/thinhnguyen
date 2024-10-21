import { ColumnDef } from '@tanstack/react-table'

import { ENV } from '@/config'
import { TGuestResponse } from '@/types'

import AttendStatus from '../attend-status'
import LinkCopy from '../link-copy'
import SentCheckbox from '../sent-checkbox'
import TableActions from '../tabe-actions'

export const columns: ColumnDef<TGuestResponse>[] = [
  {
    accessorKey: 'stt',
    id: 'stt',
    header: 'STT',
    accessorFn: (_originalRow, index) => index + 1,
    cell: (cell) => <div className="min-w-8">{cell.getValue() as number}</div>,
  },
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Name',
    cell: (cell) => <div className="min-w-32">{cell.getValue() as string}</div>,
  },
  {
    accessorKey: 'nameInInvitation',
    id: 'nameInInvitation',
    header: 'Name in Invitation',
    cell: (cell) => <div className="min-w-32">{cell.getValue() as string}</div>,
  },
  {
    accessorKey: 'isAttending',
    id: 'isAttending',
    header: 'Is Attend',
    cell: (cell) => <AttendStatus isAttend={cell.getValue() as boolean} />,
  },
  {
    accessorKey: 'host',
    id: 'host',
    header: 'Host Name',
    cell: (cell) => <div className="min-w-20">{cell.getValue() as string}</div>,
  },
  {
    accessorKey: 'wishes',
    id: 'wishes',
    header: 'Wishes',
    cell: (cell) => <div className="min-w-[200px]">{cell.getValue() as string}</div>,
  },
  {
    accessorKey: 'check',
    id: 'check',
    header: 'Check',
    accessorFn: (originalRow) => originalRow,
    cell: (cell) => <SentCheckbox guest={cell.getValue() as TGuestResponse} />,
  },
  {
    accessorKey: 'url',
    id: 'url',
    header: 'Link',
    accessorFn: (originalRow) => `${ENV.INVITATION_URL}/?code=${originalRow.id}`,
    cell: (cell) => <LinkCopy text={String(cell.getValue())} />,
  },
  {
    id: 'actions',
    header: 'Actions',
    accessorFn: (originalRow) => originalRow,
    cell: (cell) => {
      const cellValue = cell.getValue() as TGuestResponse
      return <TableActions guest={cellValue} />
    },
  },
]
