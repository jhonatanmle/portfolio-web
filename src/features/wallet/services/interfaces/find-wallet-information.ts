export interface FindWalletInformation {
  dividendsView: {
    currency: string;
    months: number[];
    positions: Position[];
    totalDaily: number;
    totalMonthly: number;
    totalYearly: number;
  };
}

interface Position {
  symbol: string;
  amount: number;
  shares: number;
  yield: number;
}
