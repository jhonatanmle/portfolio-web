import { ClientError } from 'graphql-request';

export const validateError = (error: any) => {
  if (error instanceof ClientError && error.response.status === 401) {
    console.log('[validateError] 401');
    return true;
  }

  console.log('[validateError]', error);
  return false;
};
