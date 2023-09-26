import { roundAmount } from '@/shared/functions';
import { FindWalletInformation } from '../services/interfaces/find-wallet-information';
import { WalletHoldingInformation, WalletInformation } from '../types';
import { FindWalletHoldingInformation } from '../services/interfaces/find-wallet-holding-information';

export const walletDividendListAdapter = (
  data: FindWalletInformation
): WalletInformation => {
  return {
    totalDaily: data?.dividendsView?.totalDaily,
    totalMonthly: data?.dividendsView?.totalMonthly,
    totalYearly: data?.dividendsView?.totalYearly,
    months: data?.dividendsView?.months,
    tickets: data?.dividendsView?.positions
      ?.map((item) => ({
        ticket: item.symbol,
        quantity: item.shares,
        yield: item.yield * 100,
        dividendYear: item.amount,
        dividendMonthly: roundAmount(item.amount / 12)
      }))
      .sort((a, b) => a.ticket.localeCompare(b.ticket)),
  };
};

export const walletHoldingListAdapter = (data: FindWalletHoldingInformation): WalletHoldingInformation => {
  return {
    tickets: data?.holdingsView?.holdings?.map(item => ({
      amount: item.marketValue,
      quantity: item.shares,
      ticket: item.symbol
    }))
  }
}