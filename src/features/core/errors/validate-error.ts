import { ClientError } from 'graphql-request';

import { AuthError } from './auth-error';

export const validateError = (error: any) => {
  if (error instanceof ClientError && error.response.status === 401) {
    throw new AuthError('Auth GraphqlService error');
  }

  console.log('[validateError]', error?.response?.status);

  throw new Error('Generic Error');
};
