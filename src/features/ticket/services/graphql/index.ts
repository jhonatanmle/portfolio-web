import { Query } from '@/features/core/http-client';
import { gql } from 'graphql-request';

export const queryFindTicketInformation: Query = {
  query: gql`
    query (
      $symbols: [String]
      $timezone: String
      $useSimple: Boolean
      $currency: String
    ) {
      quotes(
        symbols: $symbols
        timezone: $timezone
        useSimple: $useSimple
        currency: $currency
      ) {
        symbol
        latestPrice
        latestUpdate
        dividendYield
        dividend
      }
    }
  `,
  variables: (symbol: string) => ({
    symbols: [symbol],
    timezone: 'America/Lima',
    userSimple: true,
    currency: 'USD',
  }),
};
