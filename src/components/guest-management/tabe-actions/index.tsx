import { Link } from 'react-router-dom'

import { SquareArrowOutUpRight } from 'lucide-react'

import { Button } from '@/components/ui'
import { ENV } from '@/config'
import { TGuestResponse } from '@/types'

import DeleteGuest from '../delete-guest'
import EditGuest from '../edit-guest'

interface TableActionsProps {
  guest: TGuestResponse
}
const TableActions = ({ guest }: TableActionsProps) => {
  return (
    <div className="flex min-w-20 space-x-2">
      <Link target="_blank" to={`${ENV.INVITATION_URL}/?code=${guest.id}`}>
        <Button className="size-8" size="icon" variant="outline">
          <SquareArrowOutUpRight size={16} />
        </Button>
      </Link>
      <EditGuest guest={guest} />
      <DeleteGuest id={guest.id} />
    </div>
  )
}

export default TableActions
