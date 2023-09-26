import { AuthPortfolio } from '@/interfaces/AuthPortfolio';

const API_URL_LOGIN = `${process.env.API_WALLET_URL}`;

export const signInPortfolio = async (
  userId: string,
  recoveryCode: string
): Promise<AuthPortfolio> => {
  const fetchResponse = await fetch(`${API_URL_LOGIN}/auth/login`, {
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

export const refreshAuthPortfolio = async (refreshToken: string): Promise<AuthPortfolio> => {
  const fetchResponse = await fetch(`${API_URL_LOGIN}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
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
