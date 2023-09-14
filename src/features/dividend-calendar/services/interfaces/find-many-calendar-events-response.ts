export interface FindManyCalendarEventsResponse {
  events: CalendarEvent;
}

interface CalendarEvent {
  pastEvents: DayEvent[];
  upcomingEvents: DayEvent[];
}

export interface DayEvent {
  companyName: string;
  date: Date;
  exDividend?: Dividend;
  payDividend?: Dividend;
}

export interface Dividend {
  amount: number;
  amountTotal: number;
  exDate: Date;
  paymentDate: Date;
  symbol: string;
}
