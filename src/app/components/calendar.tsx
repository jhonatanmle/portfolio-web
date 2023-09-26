'use client';

import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Chip } from '@nextui-org/chip';
import React, { useEffect, useMemo, useState } from 'react';

import {
  CalendarEvent,
  DividendType,
} from '@/features/dividend-calendar/types';

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
        title: `${item.symbol} - $${item.payment.toFixed(2)}`,
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
    if (window.innerWidth <= 560) {
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
