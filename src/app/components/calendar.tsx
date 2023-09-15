'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import React, { useEffect, useMemo, useState } from 'react';
import esLocale from '@fullcalendar/core/locales/es';
import {
  CalendarEvent,
  DividendType,
} from '@/features/dividend-calendar/types';
import { Chip } from '@nextui-org/chip';

interface ItemEventCalendar {
  title: string;
  start: Date;
  backgroundColor: string;
}

type Props = {
  events: CalendarEvent[];
};

export default function Calendar({ events = [] }: Props) {
  const [calendarType, setCalendarType] = useState<string>('');

  const items = useMemo<ItemEventCalendar[]>(() => {
    return events.map((item) => {
      return {
        title: `${item.symbol} - ${item.payment.toFixed(2)} USD`,
        start: item.date,
        backgroundColor:
          item.dividendType === DividendType.Payment ? 'success' : 'warning',
      };
    });
  }, [events]);

  function renderEventContent(eventInfo: any) {
    return (
      <div>
        <Chip color={eventInfo.event.backgroundColor} size='sm' variant='dot'>
          {eventInfo.event.title}
        </Chip>
      </div>
    );
  }

  useEffect(() => {
    console.log(window.innerWidth);

    if (window.innerWidth < 560) {
      setCalendarType('dayGridDay');
    } else {
      setCalendarType('dayGridMonth');
    }
  }, []);

  return (
    <>
      {calendarType ? (
        <FullCalendar
          plugins={[dayGridPlugin]}
          weekends={true}
          events={items}
          eventContent={renderEventContent}
          locale={esLocale}
          timeZone='America/Lima'
          initialView={calendarType}
        />
      ) : null}
    </>
  );
}
