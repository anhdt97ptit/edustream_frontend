import { format } from 'date-fns'
import { useCalendarContext } from '@/components/ui/shared/calendar/calendar-context'

export default function CalendarHeaderDateIcon() {
  const { calendarIconIsToday, date: calendarDate } = useCalendarContext()
  const date = calendarIconIsToday ? new Date() : calendarDate
  return (
    <div className="flex h-14 w-14 flex-col items-start overflow-hidden rounded-lg border">
      <p className="flex h-6 w-full items-center justify-center bg-primary text-center text-xs font-semibold uppercase text-background">
        {format(date, 'MMM')}
      </p>
      <p className="flex w-full items-center justify-center text-lg font-bold">
        {format(date, 'dd')}
      </p>
    </div>
  )
}
