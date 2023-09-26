import { NextRequest, NextResponse } from 'next/server';

import { graphqlClient } from '@/features/core/http-client';
import { queryFindWalletHoldingInformation } from '@/features/wallet/services/graphql';
import { regenerateWalletToken } from '../auth-token';
import { FindWalletHoldingInformation } from '@/features/wallet/services/interfaces/find-wallet-holding-information';

export const dynamic = 'force-dynamic';

const handleHttp = async ({
  token
}: {
  token: string | undefined
}) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };

  return await graphqlClient.request<FindWalletHoldingInformation>(
    queryFindWalletHoldingInformation.query,
    queryFindWalletHoldingInformation.variables!(),
    headers
  );
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token');

  try {
    const response = await handleHttp({
      token: token?.value
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
    // console.log(error?.response?.status);

    // if(error?.response?.status === 401){
    //   const refreshToken = request.cookies.get('refreshToken');

    //   const { accessToken } = await regenerateWalletToken(refreshToken?.value!);

    //   const response = await handleHttp({
    //     token: accessToken
    //   });
  
    //   return NextResponse.json(
    //     {
    //       data: response,
    //     },
    //     {
    //       status: 200,
    //     }
    //   );
    // }

    return NextResponse.json({
      data: undefined,
    });
  }
}
