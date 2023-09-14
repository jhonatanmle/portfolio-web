import { Query } from '@/features/core/http-client';
import { gql } from 'graphql-request';

export const queryFindManyCalendarEvents: Query = {
  query: gql`
    query (
      $watchlistId: String
      $dateStart: DateTime
      $wUE: Boolean
      $srd: [String]
    ) {
      events(
        watchlistId: $watchlistId
        dateStart: $dateStart
        wUE: $wUE
        srd: $srd
      ) {
        upcomingEvents {
          date
          companyName
          exDividend {
            id
            symbol
            exDate
            paymentDate
            amount
            amountTotal
            currency
            isEstimated
          }
          payDividend {
            id
            symbol
            exDate
            paymentDate
            amount
            amountTotal
            currency
            isEstimated
          }
        }
        pastEvents {
          date
          companyName
          exDividend {
            id
            symbol
            exDate
            paymentDate
            amount
            amountTotal
            currency
            isEstimated
          }
          payDividend {
            id
            symbol
            exDate
            paymentDate
            amount
            amountTotal
            currency
            isEstimated
          }
          price {
            id
            symbol
            change
            changePercent
          }
          dip {
            id
            symbol
            date
          }
        }
      }
    }
  `,
  variables: () => ({
    watchlistId: 'c71fc320-097c-4e69-a469-b567c765fe1a',
    dateStart: new Date().toISOString(),
    wUE: true,
    srd: [],
  }),
};
