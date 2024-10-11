import { ComboboxFilter } from '@/components/ui/combobox-filter'
import { THost } from '@/context/guest'
import { useGuestContext } from '@/hooks/context/useGuestContext'

const hostList = ['thoan', 'thinh']

const hostListFilter = hostList.map((item) => ({
  label: item,
  value: item,
}))

const GuestFilter = () => {
  const {
    state: {
      filter: { host },
    },
    actions: { updateHostFilter },
  } = useGuestContext()

  const handleUpdateHostFilter = (hosts: THost[]) => {
    updateHostFilter(hosts)
  }

  console.log('host', host)

  return (
    <>
      <ComboboxFilter
        options={hostListFilter}
        selectedValues={host}
        setSelectValues={handleUpdateHostFilter}
        title="Host"
      />
    </>
  )
}

export default GuestFilter
