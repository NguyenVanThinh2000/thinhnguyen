import { useEffect } from 'react'

import { PageTitle } from '@/components'
import { columns } from '@/components/guest-management/table/columns'
import { DataTable } from '@/components/guest-management/table/data-table'
import { useGuestContext } from '@/hooks/context/useGuestContext'

const GuestManagement = () => {
  const {
    state: {
      data,
      filter: { host },
    },
    actions: { getGuests },
  } = useGuestContext()

  useEffect(() => {
    getGuests({ host })
  }, [host])

  return (
    <div className="px-4">
      <PageTitle title="Guest Management" />
      <DataTable columns={columns} data={data} />
    </div>
  )
}
export default GuestManagement
