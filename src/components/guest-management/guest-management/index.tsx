import { useEffect } from 'react'

import { PageTitle } from '@/components'
import { columns } from '@/components/guest-management/table/columns'
import { DataTable } from '@/components/guest-management/table/data-table'
import { useGuestContext } from '@/hooks/context/useGuestContext'
import { TLocation } from '@/types'

interface GuestManagementProps {
  location?: TLocation
}

const titleMapping = {
  saigon: 'Guest Management - Saigon',
}
const GuestManagement = ({ location }: GuestManagementProps) => {
  const {
    state: {
      data,
      isLoading: isFetching,
      filter: { host },
    },
    actions: { getGuests },
  } = useGuestContext()

  useEffect(() => {
    getGuests({ host, location })
  }, [host])

  return (
    <div className="px-4">
      <PageTitle title={location ? titleMapping[location] : 'Guest Management'} />
      {!isFetching && <DataTable columns={columns} data={data} location={location} />}
    </div>
  )
}
export default GuestManagement
