import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export interface ChartData {
  date: Date;
  symbol: string;
  amount: number;
  payout?: number;
}

export const portfolioSymbols = {
  O: "O",
  SPY: "SPY",
  JEPQ: "JEPQ",
  MO: "MO",
  MPW: "MPW",
  IIPR: "IIPR",
};

export const taxesAmount = 0.03;

const defaultFormat = "DD/MM/YYYY";

const getDate = (value: string) => dayjs(value, defaultFormat).toDate();

export const chartData: ChartData[] = [
  {
    date: getDate("01/05/2023"),
    symbol: portfolioSymbols.O,
    amount: 3.2,
  },
  {
    date: getDate("01/05/2023"),
    symbol: portfolioSymbols.SPY,
    amount: 0.18,
  },
  {
    date: getDate("07/06/2023"),
    symbol: portfolioSymbols.JEPQ,
    amount: 3.92,
  },
  {
    date: getDate("16/06/2023"),
    symbol: portfolioSymbols.O,
    amount: 0.77,
  },
  {
    date: getDate("07/07/2023"),
    symbol: portfolioSymbols.JEPQ,
    amount: 42.18,
  },
  {
    date: getDate("10/07/2023"),
    symbol: portfolioSymbols.MO,
    amount: 5.64,
  },
  {
    date: getDate("13/07/2023"),
    symbol: portfolioSymbols.MPW,
    amount: 5.8,
  },
  {
    date: getDate("14/07/2023"),
    symbol: portfolioSymbols.O,
    amount: 0.77,
  },
  {
    date: getDate("14/07/2023"),
    symbol: portfolioSymbols.IIPR,
    amount: 9,
  },
];
