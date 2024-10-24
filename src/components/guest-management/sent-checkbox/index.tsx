import { useState } from 'react'

import { CheckedState } from '@radix-ui/react-checkbox'

import { Checkbox } from '@/components/ui/checkbox'
import { useGuestContext } from '@/hooks/context/useGuestContext'
import { TGuestResponse } from '@/types'

const SentCheckbox = ({ guest }: { guest: TGuestResponse }) => {
  const {
    actions: { updateGuest },
  } = useGuestContext()

  const [isChecked, setIsChecked] = useState<CheckedState>(guest.isSent ?? false)

  const handleOnChange = (checked: CheckedState) => {
    setIsChecked(checked)
    const data = {
      isSent: checked as boolean,
    }
    updateGuest({ id: guest.id, data }, {})
  }

  return (
    <div className="flex min-w-16 items-center justify-center">
      <Checkbox checked={isChecked} onCheckedChange={handleOnChange} />
    </div>
  )
}

export default SentCheckbox
