import { graphqlClient } from '@/features/core/http-client';
import { NextRequest, NextResponse } from 'next/server';
import { regenerateWalletToken } from '../auth-token';
import { queryFindTicketInformation } from '@/features/ticket/services/graphql';
import { FindTicketInformation } from '@/features/ticket/services/interfaces/find-ticket-information';

const handleHttp = async ({
  token,
  symbol
}: {
  token: string | undefined,
  symbol: string;
}) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };

  return await graphqlClient.request<FindTicketInformation>(
    queryFindTicketInformation.query,
    queryFindTicketInformation.variables!(symbol),
    headers
  );
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get('token');

  const { ticket } = await request.json()

  try {
    const response = await handleHttp({
      token: token?.value,
      symbol: ticket
    });

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

    if(error?.response?.status === 401){
      const refreshToken = request.cookies.get('refreshToken');

      const { accessToken } = await regenerateWalletToken(refreshToken?.value!);

      const response = await handleHttp({
        token: accessToken,
        symbol: ticket
      });
  
      return NextResponse.json(
        {
          data: response,
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json({
      data: undefined,
    });
  }
}
