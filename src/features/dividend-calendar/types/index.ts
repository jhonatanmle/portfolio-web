export interface CalendarEvent {
  companyName: string;
  date: Date;
  dividendType: DividendType;
  dividendAction: string;
  payment: number;
  symbol: string;
}

export enum DividendType {
  Payment = 1,
  ExDate = 2,
}
