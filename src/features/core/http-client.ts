import { GraphQLClient, Variables } from 'graphql-request';

import { signInPortfolio } from '../auth-lib/services';

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
      // validateError(error as Error);
    }
  }

  static async regenerateToken() {
    const userData = await signInPortfolio(
      process.env.NEXT_PUBLIC_USER_ID!,
      process.env.NEXT_PUBLIC_USER_RECOVERY_CODE!
    );

    GraphqlService.setToken(userData.accessToken);
  }
}

export interface Query {
  query: string;
  variables?: (...params: any) => Variables;
}
