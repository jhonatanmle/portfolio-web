import { GraphQLClient, Variables } from 'graphql-request';
import { validateError } from './errors/validate-error';

const API_URL = `${process.env.NEXT_PUBLIC_API_WALLET_URL}/graphql`;

export class GraphqlService {
  private static client = new GraphQLClient(API_URL!);

  constructor() {}

  static setToken(token: string) {
    GraphqlService.client.setHeader('authorization', `Bearer ${token}`);
  }

  static async request<T>(query: string, variables?: Variables) {
    try {
      return await this.client.request<T>(query, variables);
    } catch (error) {
      validateError(error as Error);
    }
  }
}

export interface Query {
  query: string;
  variables?: (...params: any) => Variables;
}
