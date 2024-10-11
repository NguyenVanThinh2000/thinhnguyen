import { useState } from 'react'

import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export type OptionsProps = {
  value: string
  label: string
}

export type ComboboxProps = {
  options: OptionsProps[]
  value: string
  onChange: (value: string) => void
  open?: boolean
  placeholderInput?: string
  placeholderSelect?: string
  disabled?: boolean
  className?: string
}

export const Combobox = ({
  open = false,
  options,
  value,
  onChange,
  placeholderInput = 'Place holder',
  placeholderSelect = 'Select an option',
  disabled,
  className,
}: ComboboxProps) => {
  const [openState, setOpenState] = useState(open)
  return (
    <Popover open={openState} onOpenChange={setOpenState}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={openState}
          className={cn('min-w-48 justify-between', className)}
          disabled={disabled}
          role="combobox"
          variant="outline"
        >
          {value ? options.find((option) => option.value === value)?.label : placeholderSelect}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[--radix-popover-trigger-width] min-w-48 p-0">
        <Command>
          <CommandInput placeholder={placeholderInput} />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue)
                    setOpenState(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
