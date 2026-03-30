'use client'

import * as React from 'react'

import { AnimatePresence } from 'framer-motion'
import { Check, ChevronsUpDown, Loader, XIcon } from 'lucide-react'
import { Button } from '../button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../command'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { cn } from '@/lib/utils'
import { AnimateGenericFadeInOut } from '@/components/ui/shared/animate-generic-fade-in-out'

type OptionValue = string | number | boolean | null

type ComboBoxOption<T = OptionValue> = {
  label: string
  value: T
  disabled?: boolean
}

type MultiSelectComboboxProps<T = OptionValue> = {
  emptySelectionPlaceholder?: React.ReactNode | string
  enableClearAllButton?: boolean
  loading?: boolean
  loadingSearch?: boolean
  inputPlaceholder?: string
  onChange: (_values: T[]) => void
  onChangeSearch?: (_value: string) => void
  options: ComboBoxOption<T>[]
  selectedValues: T[]
}

/**
 * Multi select combo box component which supports:
 *
 * - Label/value pairs
 * - Loading state
 * - Clear all button
 */
export function MultiSelectCombobox<T = OptionValue>({
  emptySelectionPlaceholder = 'Select values...',
  enableClearAllButton,
  inputPlaceholder,
  onChange,
  onChangeSearch,
  loadingSearch,
  loading,
  options,
  selectedValues,
}: MultiSelectComboboxProps<T>) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (selectedOption: T) => {
    const values = selectedValues as T[]
    let newSelectedOptions = [...values, selectedOption]

    if (values.includes(selectedOption)) {
      newSelectedOptions = values.filter((v) => v !== selectedOption)
    }

    onChange(newSelectedOptions)

    setOpen(false)
  }

  const selectedOptions = React.useMemo(() => {
    return selectedValues.map((value): ComboBoxOption<T> => {
      const foundOption = options.find((option) => option.value === value)

      if (foundOption) {
        return foundOption
      }

      let label = ''

      if (typeof value === 'string' || typeof value === 'number') {
        label = value.toString()
      }

      return {
        label,
        value,
      }
    })
  }, [selectedValues, options])

  const buttonLabel = React.useMemo(() => {
    if (loading) {
      return ''
    }

    if (selectedOptions.length === 0) {
      return emptySelectionPlaceholder
    }

    return selectedOptions.map((option) => option.label).join(', ')
  }, [selectedOptions, emptySelectionPlaceholder, loading])

  const showClearButton = enableClearAllButton && selectedValues.length > 0

  return (
    <Popover open={open && !loading} onOpenChange={setOpen}>
      <div className="relative">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            disabled={loading}
            aria-expanded={open}
            className="w-full min-w-[200px] px-3"
          >
            <AnimatePresence>
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader className="h-5 w-5 animate-spin text-gray-500 dark:text-gray-100" />
                </div>
              ) : (
                <AnimateGenericFadeInOut className="flex w-full justify-between">
                  <span
                    className={cn('truncate', {
                      'text-muted-foreground': !selectedOptions.length,
                    })}
                  >
                    {buttonLabel}
                  </span>

                  <div
                    className={cn('ml-2 flex flex-row items-center', {
                      'ml-6': showClearButton,
                    })}
                  >
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                  </div>
                </AnimateGenericFadeInOut>
              )}
            </AnimatePresence>
          </Button>
        </PopoverTrigger>

        {/* This is placed outside the trigger since we can't have nested buttons. */}
        {showClearButton && !loading && (
          <div className="absolute bottom-0 right-8 top-0 flex items-center justify-center">
            <button
              className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300 dark:bg-neutral-700"
              onClick={() => {
                onChange([])
                onChangeSearch && onChangeSearch('')
              }}
            >
              <XIcon className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        )}
      </div>

      <PopoverContent className="scrollbar max-h-72 w-fit min-w-[200px] overflow-auto p-0">
        <Command shouldFilter={!onChangeSearch}>
          <CommandInput onValueChange={onChangeSearch} placeholder={inputPlaceholder} />
          {loadingSearch && (
            <div className="my-2 flex items-center justify-center">
              <Loader className={'mr-2 animate-spin'} />
            </div>
          )}
          <CommandList>
            <CommandEmpty>No value found.</CommandEmpty>
            <CommandGroup>
              {options.map((option, i) => (
                <CommandItem key={i} onSelect={() => handleSelect(option.value)}>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedValues.includes(option.value) ? 'opacity-100' : 'opacity-0'
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
