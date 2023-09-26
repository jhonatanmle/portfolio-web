import { roundAmount } from '@/shared/functions';
import { FindTicketInformation } from '../services/interfaces/find-ticket-information';
import { TicketDetailInformation } from '../types';

export const ticketDetailAdapter = (data: FindTicketInformation, amount: number): TicketDetailInformation | undefined => {  

  if(data?.quotes?.length === 0) {
    return undefined;
  }

  const ticket = data.quotes[0];

  const quantity = amount/ticket.latestPrice;

  return {
    dividend: roundAmount(ticket.dividend),
    dividendYield: ticket.dividendYield,
    latestPrice: ticket.latestPrice,
    symbol: ticket.symbol,
    quantity: roundAmount(quantity),
    dividendMonthly: roundAmount((ticket.dividend * quantity / 12)),
    dividendYearly: roundAmount(ticket.dividend * quantity)
  }
}