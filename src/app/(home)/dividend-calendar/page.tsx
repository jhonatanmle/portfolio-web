import Calendar from '@/app/components/calendar';
import { findManyGroupCalendarEvents } from '@/features/dividend-calendar/services';
import React from 'react';

async function DividendCalendar() {
  const data = await findManyGroupCalendarEvents();

  return (
    <div>
      <Calendar events={data} />
      {/* <br />
      <pre>{JSON.stringify(data, null, 4)}</pre> */}
    </div>
  );
}

export default DividendCalendar;
