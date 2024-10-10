import { TGuestResponse } from '@/types'

import DeleteGuest from '../delete-guest'
import EditGuest from '../edit-guest'

interface TableActionsProps {
  guest: TGuestResponse
}
const TableActions = ({ guest }: TableActionsProps) => {
  return (
    <div className="flex min-w-20 space-x-2">
      <EditGuest guest={guest} />
      <DeleteGuest id={guest.id} />
    </div>
  )
}

export default TableActions
