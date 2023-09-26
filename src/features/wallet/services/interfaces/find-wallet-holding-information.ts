export interface FindWalletHoldingInformation {
  holdingsView: HoldingView;
}

interface HoldingView {
  holdings: Holding[]
}

interface Holding {
  symbol: string;
  marketValue: number;
  plRealized: number;
  plSpent: number;
  avgBuyPrice: number;
  shares: number;
}