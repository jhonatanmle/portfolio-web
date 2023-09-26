import { cookies } from 'next/headers';

import { walletDividendListAdapter, walletHoldingListAdapter } from '../adapters';
import { API_HOST } from '@/shared/api';

export const findWalletDividendInformation = async () => {
  const response = await fetch(`${API_HOST}/wallet-dividend`, {
    method: 'GET',
    headers: { Cookie: cookies().toString() },
  });

  if (!response.ok) {
    return;
  }

  const responseBody = await response.json();

  return walletDividendListAdapter(responseBody.data!);
};

export const findWalletHoldingInformation = async () => {
  const response = await fetch(`${API_HOST}/wallet`, {
    method: 'GET',
    headers: { Cookie: cookies().toString() },
  });

  if (!response.ok) {
    return;
  }

  const responseBody = await response.json();

  return walletHoldingListAdapter(responseBody.data!);
};

