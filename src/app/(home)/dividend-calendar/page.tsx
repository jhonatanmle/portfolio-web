import { Chip } from '@nextui-org/chip';
import React from 'react';

import Calendar from '@/app/components/calendar';
import { findManyGroupCalendarEvents } from '@/features/dividend-calendar/services';

async function DividendCalendar() {
  const data = await findManyGroupCalendarEvents();

  return (
    <div className='my-10'>
      <div className='my-4 flex gap-x-4'>
        <Chip color='warning' size='sm' variant='dot'>
          Ex Dividendo
        </Chip>
        <Chip color='success' size='sm' variant='dot'>
          Dividendo
        </Chip>
      </div>
      <div>
        <Calendar events={data!} />
      </div>
    </div>
  );
}

export default DividendCalendar;
