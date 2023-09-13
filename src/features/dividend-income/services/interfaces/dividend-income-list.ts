import { Ticket } from '@/interfaces/Ticket';

export interface DividendIncomeItemListResponse {
  id: string;
  ticketId: string;
  amount: number;
  taxes: number;
  date: Date;
  brokerPaymentDate: Date;
  taxesAmount: number;
  netAmount: number;
  ticket: Ticket;
}
