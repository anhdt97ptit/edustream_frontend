import { useCalendarContext } from "@/components/ui/shared/calendar/calendar-context"

import CalendarBodyDay from "@/components/ui/shared/calendar/body/day/calendar-body-day"
import CalendarBodyWeek from "@/components/ui/shared/calendar/body/week/calendar-body-week"
import CalendarBodyMonth from "@/components/ui/shared/calendar/body/month/calendar-body-month"

export default function CalendarBody() {
  const { mode } = useCalendarContext()

  return (
    <>
      {mode === 'day' && <CalendarBodyDay />}
      {mode === 'week' && <CalendarBodyWeek />}
      {mode === 'month' && <CalendarBodyMonth />}
    </>
  )
}
