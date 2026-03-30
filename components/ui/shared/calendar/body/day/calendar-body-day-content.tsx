import { isSameDay } from 'date-fns'
import { useCalendarContext } from "@/components/ui/shared/calendar/calendar-context"
import CalendarBodyHeader from "@/components/ui/shared/calendar/body/calendar-body-header"
import { hours } from "@/components/ui/shared/calendar/body/day/calendar-body-margin-day-margin"
import CalendarEvent from "@/components/ui/shared/calendar/calendar-event"

export default function CalendarBodyDayContent({ date }: { date: Date }) {
  const { events } = useCalendarContext()

  const dayEvents = events.filter((event) => isSameDay(event.start, date))

  return (
    <div className="flex flex-grow flex-col">
      <CalendarBodyHeader date={date} />

      <div className="relative flex-1">
        {hours.map((hour) => (
          <div key={hour} className="group h-32 border-b border-border/50" />
        ))}

        {dayEvents.map((event) => (
          <CalendarEvent key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
