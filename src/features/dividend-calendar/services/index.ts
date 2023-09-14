import { GraphqlService } from '@/features/core/http-client';
import { queryFindManyCalendarEvents } from './graphql';
import { FindManyCalendarEventsResponse } from './interfaces/find-many-calendar-events-response';
import { dividendCalendarEventsAdapter } from '../adapters';

export const findManyGroupCalendarEvents = async () => {
  const response = await GraphqlService.request<FindManyCalendarEventsResponse>(
    queryFindManyCalendarEvents.query,
    queryFindManyCalendarEvents.variables!()
  );

  return dividendCalendarEventsAdapter(response!);
};
