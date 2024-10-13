import { Dispatch, SetStateAction } from 'react'

import { ColumnFiltersState } from '@tanstack/react-table'

import { ComboboxFilter } from '@/components/ui/combobox-filter'
import { THost } from '@/context/guest'

const hostList = ['thoan', 'thinh']

const hostListFilter = hostList.map((item) => ({
  label: item,
  value: item,
}))
interface GuestFilterProps {
  columnFilters: ColumnFiltersState
  setColumFilters: Dispatch<SetStateAction<ColumnFiltersState>>
}
const GuestFilter = ({ columnFilters, setColumFilters }: GuestFilterProps) => {
  const handleUpdateHostFilter = (hosts: THost[]) => {
    setColumFilters(hosts.map((item) => ({ id: 'host', value: item })))
  }

  return (
    <>
      <ComboboxFilter
        options={hostListFilter}
        selectedValues={columnFilters.map((item) => item.value as THost)}
        setSelectValues={handleUpdateHostFilter}
        title="Host"
      />
    </>
  )
}

export default GuestFilter
