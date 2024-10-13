import { Dispatch, SetStateAction } from 'react'

import { ColumnFiltersState } from '@tanstack/react-table'

import { Combobox } from '@/components/ui/combobox'

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
  const handleUpdateHostFilter = (host: string) => {
    setColumFilters([{ id: 'host', value: host === 'all' ? '' : host }])
  }

  const getValue = () => {
    const host = columnFilters.find((item) => item.id === 'host')?.value ?? ''
    return (host === '' ? 'all' : host) as string
  }

  return (
    <>
      <Combobox
        options={[
          ...hostListFilter,
          {
            label: 'All',
            value: 'all',
          },
        ]}
        value={getValue()}
        onChange={(value) => handleUpdateHostFilter(value)}
      />
    </>
  )
}

export default GuestFilter
