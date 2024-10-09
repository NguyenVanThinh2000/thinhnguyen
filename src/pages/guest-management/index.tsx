import { PageTitle } from '@/components'
import { columns } from '@/components/guest-management/table/columns'
import { DataTable } from '@/components/guest-management/table/data-table'

const GuestManagement = () => {
  return (
    <div className="px-4">
      <PageTitle title="Guest Management" />
      <DataTable columns={columns} data={[]} />
    </div>
  )
}
export default GuestManagement
