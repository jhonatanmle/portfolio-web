export type IncomeFormData = {
  ticketId: number;
  amount: number;
  taxes: number;
  date: string;
  brokerPaymentDate: string;
};

export type IncomeDividendItem = {
  id: string;
  ticketId: string;
  ticket: string;
  amount: number;
  netAmount: number;
  taxes: number;
  date: string;
  month: string;
  brokerPaymentDate: string;
};
