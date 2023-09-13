export interface DividendIncomeCreatePayload {
  ticketId: number;
  amount: number;
  taxes: number;
  date: string;
  brokerPaymentDate: string;
  taxesAmount: number;
  netAmount: number;
}
