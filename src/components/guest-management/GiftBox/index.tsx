import { FormEvent, useState } from 'react'

import { Check, Loader2, Pen } from 'lucide-react'

import { Button, Input } from '@/components/ui'
import { useGuestContext } from '@/hooks/context/useGuestContext'

const convertValue = (value: string) => {
  if (isNaN(Number(value)) || Number(value) < 1000) return value
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND'
}

const GiftBox = ({ value, id }: { value: string | null; id: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    actions: { updateGuest },
  } = useGuestContext()
  const [isViewMode, setIsViewMode] = useState(true)
  const [inputValue, setInputValue] = useState('')

  const handleOnInput = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleClick = () => {
    if (isViewMode) {
      setIsViewMode(false)
      value && setInputValue(value.toString())
    } else {
      if (!value && inputValue === '') {
        setIsViewMode(true)
        return
      }
      setIsLoading(true)
      updateGuest(
        {
          id,
          data: {
            gift: inputValue ?? null,
          },
        },
        {
          onSuccess: () => {
            setIsViewMode(true)
            setIsLoading(false)
          },
        },
      )
    }
  }
  return (
    <div className="flex min-w-[160px] gap-1">
      {isViewMode ? (
        <div className="flex flex-1 items-center">{value && convertValue(value)}</div>
      ) : (
        <Input className="h-8 flex-1" type="text" value={inputValue} onInput={handleOnInput} />
      )}
      <Button className="!size-8" size="icon" variant="outline" onClick={handleClick}>
        {isLoading ? (
          <Loader2 className="spin" size={14} />
        ) : isViewMode ? (
          <Pen size={14} />
        ) : (
          <Check size={14} />
        )}
      </Button>
    </div>
  )
}

export default GiftBox
