import {
  DayEvent,
  FindManyCalendarEventsResponse,
} from '../services/interfaces/find-many-calendar-events-response';
import { CalendarEvent, DividendType } from '../types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);
dayjs.extend(utc);

export const dividendCalendarEventsAdapter = (
  data: FindManyCalendarEventsResponse
): CalendarEvent[] => {
  const validPastEvents = data.events.pastEvents.filter(
    (item) =>
      item.companyName?.length > 0 &&
      (item.exDividend || item.payDividend) &&
      dayjs(item.date).utc().isBefore(dayjs().utc())
  );

  const validUpcomingEvents = data.events.upcomingEvents.filter(
    (item) =>
      item.companyName?.length > 0 && (item.exDividend || item.payDividend)
  );

  if (validPastEvents.length === 0 && validUpcomingEvents.length === 0) {
    return [];
  }

  const events = [...validPastEvents, ...validUpcomingEvents].map((item) =>
    mapperToDividend(item)
  );

  return events;
};

const mapperToDividend = (item: DayEvent): CalendarEvent => {
  if (item.payDividend) {
    return {
      companyName: item.companyName,
      date: dayjs(item.date).tz('America/Lima').toDate(),
      dividendAction: 'Dividendos',
      dividendType: DividendType.Payment,
      payment: item.payDividend.amountTotal,
      symbol: item.payDividend.symbol,
    };
  }

  return {
    companyName: item.companyName,
    date: dayjs(item.date).tz('America/Lima').toDate(),
    dividendAction: 'Exdividendo',
    dividendType: DividendType.ExDate,
    payment: item.exDividend!.amountTotal,
    symbol: item.exDividend!.symbol,
  };
};
