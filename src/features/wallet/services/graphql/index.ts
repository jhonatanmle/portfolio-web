import { gql } from 'graphql-request';

import { Query } from '@/features/core/http-client';

export const queryFindWalletDividendInformation: Query = {
  query: gql`
    query ($watchlistId: String, $year: Int, $lang: String) {
      dividendsView(watchlistId: $watchlistId, year: $year, lang: $lang) {
        totalYearly
        totalMonthly
        totalDaily
        yield
        yieldOnCost
        months
        currency
        positions {
          symbol
          companyName
          amount
          yield
          yieldOnCost
          shares
          quarters
        }
      }
    }
  `,
  variables: () => ({
    watchlistId: 'c71fc320-097c-4e69-a469-b567c765fe1a',
    year: 2024,
    lang: 'es',
  }),
};

export const queryFindWalletHoldingInformation: Query = {
  query: gql`
    query (
      $withChart: Boolean
      $withMarketValue: Boolean
      $useDetailedWeekAndMonth: Boolean
      $currency: String
      $dateFrom: DateTime
      $timezone: String
      $userId: String
      $watchlistId: String
      $lang: String
    ) {
      holdingsView(
        withChart: $withChart
        withMarketValue: $withMarketValue
        useDetailedWeekAndMonth: $useDetailedWeekAndMonth
        currency: $currency
        dateFrom: $dateFrom
        timezone: $timezone
        userId: $userId
        watchlistId: $watchlistId
        lang: $lang
      ) {
        plRealized
        plUnrealized
        plSpent
        plSpentRemaining
        marketValue
        marketValueWithoutRealized
        previousMarketValue
        previousMarketValueWithCurrentShares
        previousDayMarketValue
        previousDayMarketValueWithCurrentShares
        cash
        currency
        holdings {
          symbol
          companyName
          companyCurrency
          sector
          industry
          country
          issueType
          marketValue
          change
          shares
          avgBuyPrice
          plRealized
          plUnrealized
          plSpent
          fees
          isClosed
        }
      }
    }
  `,
  variables: () => ({
    dateFrom: null,
    withChart: true,
    withMarketValue: true,
    timezone: 'America/Lima',
    useDetailedWeekAndMonth: true,
    userId: '7062ae46-bcb0-41a2-be61-c84fea0fa88c',
    watchlistId: 'c71fc320-097c-4e69-a469-b567c765fe1a',
    lang: 'es',
  }),
};
