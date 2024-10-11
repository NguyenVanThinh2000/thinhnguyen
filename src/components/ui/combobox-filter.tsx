import { CheckIcon, PlusCircleIcon, X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

import { OptionsProps } from './combobox'

export type ComboboxFilterProps<T> = {
  title: string
  options: OptionsProps[]
  selectedValues: T[]
  setSelectValues: (values: T[]) => void
  disabled?: boolean
}

export function ComboboxFilter<T>({
  title,
  options,
  selectedValues,
  setSelectValues,
  disabled = false,
}: ComboboxFilterProps<T>) {
  return (
    <div
      className={cn({
        'cursor-not-allowed': disabled,
      })}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="h-10 border-dashed disabled:cursor-not-allowed"
            disabled={disabled}
            size="sm"
            variant="outline"
          >
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            {title}
            {selectedValues?.length > 0 && (
              <>
                <Separator className="mx-2 h-4" orientation="vertical" />
                <Badge className="rounded-sm px-1 font-normal md:hidden" variant="secondary">
                  {selectedValues.length}
                </Badge>
                <div className="hidden space-x-1 md:flex">
                  {selectedValues.length > 2 ? (
                    <Badge className="rounded-sm px-1 font-normal" variant="secondary">
                      {selectedValues.length} selected
                    </Badge>
                  ) : (
                    options
                      .filter((option) => selectedValues.includes(option.value as T))
                      .map((option) => (
                        <Badge
                          key={option.value}
                          className="rounded-sm px-1 font-normal capitalize"
                          variant="secondary"
                        >
                          {option.label}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[250px] p-0">
          <Command>
            <CommandInput placeholder={title} />
            {/* OPTIONS LIST */}
            <CommandList className="max-h-max">
              <ScrollArea className={cn(options.length > 8 && 'h-64')}>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selectedValues.includes(option.value as T)
                    return (
                      <CommandItem
                        key={option.value}
                        className="cursor-pointer"
                        onSelect={() => {
                          if (isSelected) {
                            setSelectValues(
                              [...selectedValues].filter((v) => v !== (option.value as T)),
                            )
                          } else {
                            setSelectValues([...selectedValues, option.value] as T[])
                          }
                        }}
                      >
                        {/* CHECK BOX */}
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible',
                          )}
                        >
                          <CheckIcon className={cn('h-4 w-4')} />
                        </div>

                        <span className="capitalize">{option.label}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </ScrollArea>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  className={cn(
                    'cursor-pointer justify-center text-center',
                    selectedValues.length === 0 && 'cursor-auto opacity-40',
                  )}
                  disabled={selectedValues.length === 0}
                  onSelect={() => setSelectValues([])}
                >
                  <X className="mr-2 h-6 w-6" />
                  Clear filters
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
