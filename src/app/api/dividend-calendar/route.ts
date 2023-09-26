import { NextRequest, NextResponse } from 'next/server';

import { graphqlClient } from '@/features/core/http-client';
import { queryFindManyCalendarEvents } from '@/features/dividend-calendar/services/graphql';
import { FindManyCalendarEventsResponse } from '@/features/dividend-calendar/services/interfaces/find-many-calendar-events-response';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token');

  const headers = {
    authorization: `Bearer ${token?.value}`,
  };

  console.log(token?.value);

  try {
    const response =
      await graphqlClient.request<FindManyCalendarEventsResponse>(
        queryFindManyCalendarEvents.query,
        queryFindManyCalendarEvents.variables!(),
        headers
      );

    return NextResponse.json(
      {
        data: response,
      },
      {
        status: 200,
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error?.response?.status);

    return NextResponse.json({
      data: undefined,
    });
  }
}
