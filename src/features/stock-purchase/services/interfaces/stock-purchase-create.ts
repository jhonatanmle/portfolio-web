export interface StockPurchaseCreatePayload {
  ticketId: number;
  amount: number;
  stockQuantity: number;
  commission: number;
  stockPrice: number;
  date: string;
}
