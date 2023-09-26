export interface FindTicketInformation {
  quotes: Ticket[];
}

interface Ticket {
  symbol: string;
  dividendYield: number;
  dividend: number;
  latestPrice: number;
}
