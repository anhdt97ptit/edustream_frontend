import CalendarBodyDayContent from '@/components/ui/shared/calendar/body/day/calendar-body-day-content'
import CalendarBodyDayCalendar from '@/components/ui/shared/calendar/body/day/calendar-body-day-calendar'
import CalendarBodyDayEvents from '@/components/ui/shared/calendar/body/day/calendar-body-day-events'
import CalendarBodyMarginDayMargin from "@/components/ui/shared/calendar/body/day/calendar-body-margin-day-margin"
import { useCalendarContext } from "@/components/ui/shared/calendar/calendar-context"

export default function CalendarBodyDay() {
  const { date } = useCalendarContext()
  return (
    <div className="flex flex-grow divide-x overflow-hidden">
      <div className="flex flex-grow flex-col divide-y overflow-hidden">
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="relative flex flex-1 divide-x">
            <CalendarBodyMarginDayMargin />
            <CalendarBodyDayContent date={date} />
          </div>
        </div>
      </div>
      <div className="hidden max-w-[276px] flex-grow flex-col divide-y lg:flex">
        <CalendarBodyDayCalendar />
        <CalendarBodyDayEvents />
      </div>
    </div>
  )
}
