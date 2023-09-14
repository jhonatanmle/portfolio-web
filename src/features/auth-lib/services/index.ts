import { AuthPortfolio } from '@/interfaces/AuthPortfolio';

const API_URL_LOGIN = `${process.env.NEXT_PUBLIC_API_WALLET_URL}/auth/login`;

export const signInPortfolio = async (
  userId: string,
  recoveryCode: string
): Promise<AuthPortfolio> => {
  const fetchResponse = await fetch(API_URL_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      recoveryCode,
    }),
  });

  if (!fetchResponse.ok) {
    throw new Error('SignIn Error');
  }

  const data = await fetchResponse.json();

  return {
    name: 'Jhonatan',
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
};
