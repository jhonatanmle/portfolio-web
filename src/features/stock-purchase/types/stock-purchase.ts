export type StockPurchaseFormData = {
  ticketId: number;
  amount: number;
  stockQuantity: number;
  commission: number;
  stockPrice: number;
  date: string;
};

export type StockPurchaseItem = {
  id: string;
  ticketId: string;
  ticket: string;
  amount: number;
  stockPrice: number;
  commission: number;
  stockQuantity: number;
  date: string;
};
