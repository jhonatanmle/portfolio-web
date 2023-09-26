import { cookies } from 'next/headers';

import { dividendCalendarEventsAdapter } from '../adapters';
import { API_HOST } from '@/shared/api';

export const findManyGroupCalendarEvents = async () => {
  const response = await fetch(`${API_HOST}/dividend-calendar`, {
    method: 'GET',
    headers: { Cookie: cookies().toString() },
  });

  if (!response.ok) {
    return;
  }

  const reponseBody = await response.json();

  return dividendCalendarEventsAdapter(reponseBody.data!);
};
