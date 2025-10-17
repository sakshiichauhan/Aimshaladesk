'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar';


import type { DateRange } from 'react-day-picker'

export function DateRangePicker() {
    
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(), 
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="border"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-[var(--text)]'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'PPP')} - {format(date.to, 'PPP')}
              </>
            ) : (
              format(date.from, 'PPP')
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-auto scale-80 max-w-[100vw]  p-0" align="end">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={1}
          className='text-[var(--text)]'
        />
      </PopoverContent>
    </Popover>
  )
}
