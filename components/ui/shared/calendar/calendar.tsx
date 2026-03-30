import CalendarProvider from '@/components/ui/shared/calendar/calendar-provider'
import { type CalendarProps } from '@/components/ui/shared/calendar/calendar-types'
import CalendarHeader from '@/components/ui/shared/calendar/header/calendar-header'
import CalendarHeaderDate from '@/components/ui/shared/calendar/header/date/calendar-header-date'
import CalendarHeaderActions from '@/components/ui/shared/calendar/header/actions/calendar-header-actions'
import CalendarHeaderActionsMode from '@/components/ui/shared/calendar/header/actions/calendar-header-actions-mode'
import CalendarBody from '@/components/ui/shared/calendar/body/calendar-body'

export default function Calendar({
  events,
  setEvents,
  mode,
  setMode,
  date,
  setDate,
  calendarIconIsToday = true,
}: CalendarProps) {
  return (
    <CalendarProvider
      events={events}
      setEvents={setEvents}
      mode={mode}
      setMode={setMode}
      date={date}
      setDate={setDate}
      calendarIconIsToday={calendarIconIsToday}
    >
      <CalendarHeader>
        <CalendarHeaderDate />
        <CalendarHeaderActions>
          <CalendarHeaderActionsMode />
          {/*<CalendarHeaderActionsAdd />*/}
        </CalendarHeaderActions>
      </CalendarHeader>
      <CalendarBody />
    </CalendarProvider>
  )
}
