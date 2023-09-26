/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient, Variables } from 'graphql-request';
import { cookies } from 'next/headers';

// import { validateError } from './errors/validate-error';

const API_URL = `${process.env.API_WALLET_URL}/graphql`;

export const graphqlClient = new GraphQLClient(API_URL!);

export const getGraphqlClientHeaders = () => {
  const token = cookies().get('token');

  const headers = {
    authorization: `Bearer ${token}`,
  };

  return headers;
};

export interface Query {
  query: string;
  variables?: (...params: any) => Variables;
}
