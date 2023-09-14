import Calendar from '@/app/components/calendar';
import { GraphqlService } from '@/features/core/http-client';
import { findManyGroupCalendarEvents } from '@/features/dividend-calendar/services';
import { Chip } from '@nextui-org/chip';
import React from 'react';

async function DividendCalendar() {
  let data = await findManyGroupCalendarEvents();

  if (data?.length === 0) {
    await GraphqlService.regenerateToken();

    data = await findManyGroupCalendarEvents();
  }

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
