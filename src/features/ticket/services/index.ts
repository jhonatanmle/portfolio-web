"use server";

import { API_HOST } from '@/shared/api';
import { cookies } from 'next/headers';
import { ticketDetailAdapter } from '../adapters';

export const findTicketInformation = async (ticket: string, amount: number) => {
  const response = await fetch(`${API_HOST}/ticket?${ticket}`, {
    method: 'POST',
    body: JSON.stringify({
      ticket
    }),
    headers: { Cookie: cookies().toString() },
  });

  if (!response.ok) {
    return;
  }

  const responseBody = await response.json();

  return ticketDetailAdapter(responseBody.data, amount);
}