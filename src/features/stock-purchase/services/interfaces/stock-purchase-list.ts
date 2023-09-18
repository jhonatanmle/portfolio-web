import { Ticket } from '@/interfaces/Ticket';

export interface StockPurchaseItemListResponse {
  id: string;
  ticketId: string;
  amount: number;
  stockPrice: number;
  date: Date;
  ticket: Ticket;
  commission: number;
  stockQuantity: number;
}