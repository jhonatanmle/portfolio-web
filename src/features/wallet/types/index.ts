export interface WalletInformation {
  tickets: WalletTicket[];
  months: number[];
  totalDaily: number;
  totalMonthly: number;
  totalYearly: number;
}

export interface WalletTicket {
  ticket: string;
  quantity: number;
  yield: number;
  dividendYear: number;
  dividendMonthly: number;
}

export interface WalletCreateItemForm {
  ticket: string;
  amount: number;
}

export interface WalletHoldingInformation {
  tickets: WalletHoldingTicket[]
}

export interface WalletHoldingTicket {
  amount: number;
  quantity: number;
  ticket: string;
}