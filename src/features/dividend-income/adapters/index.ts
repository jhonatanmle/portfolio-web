import dayjs from 'dayjs';
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_INPUT_FORMAT,
} from '@/shared/constants';
import { DividendIncomeCreatePayload } from '../services/interfaces/dividend-income-create';
import { DividendIncomeItemListResponse } from '../services/interfaces/dividend-income-list';
import { DividendIncomeFormData, DividendIncomeItem } from '../types';
import { roundAmount } from '@/shared/functions';

export const dividendIncomeFormAdapter = (
  formData: DividendIncomeFormData
): DividendIncomeCreatePayload => {
  const { ticketId, amount, brokerPaymentDate, date, taxes } = formData;

  const calculateTaxes = Number(taxes) > 0 ? Number(taxes) / 100 : 0;
  const amountNumber = Number(amount);

  return {
    ticketId,
    amount: amountNumber,
    date: dayjs(date, DEFAULT_DATE_INPUT_FORMAT).toISOString(),
    brokerPaymentDate: dayjs(
      brokerPaymentDate,
      DEFAULT_DATE_INPUT_FORMAT
    ).toISOString(),
    taxes: calculateTaxes,
    taxesAmount: amountNumber * calculateTaxes,
    netAmount: amountNumber - amountNumber * calculateTaxes,
  };
};

export const dividendIncomeListAdapterResponse = (
  data: DividendIncomeItemListResponse[]
): DividendIncomeItem[] => {
  if (!data) {
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    ticketId: item.ticketId,
    ticket: item.ticket.name,
    amount: roundAmount(item.amount),
    netAmount: roundAmount(item.netAmount),
    date: dayjs(item.date).format(DEFAULT_DATE_FORMAT),
    month: dayjs(item.date).format('MMMM'),
    brokerPaymentDate: dayjs(item.brokerPaymentDate).format(
      DEFAULT_DATE_FORMAT
    ),
    taxes: item.taxes,
  }));
};
