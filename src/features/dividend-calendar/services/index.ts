import { GraphqlService } from '@/features/core/http-client';

import { dividendCalendarEventsAdapter } from '../adapters';
import { queryFindManyCalendarEvents } from './graphql';
import { FindManyCalendarEventsResponse } from './interfaces/find-many-calendar-events-response';

export const findManyGroupCalendarEvents = async () => {
  const response = await GraphqlService.request<FindManyCalendarEventsResponse>(
    queryFindManyCalendarEvents.query,
    queryFindManyCalendarEvents.variables!()
  );

  return dividendCalendarEventsAdapter(response!);
};
