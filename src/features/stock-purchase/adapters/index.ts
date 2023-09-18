import {
  StockPurchaseFormData,
  StockPurchaseItem,
} from '@/features/stock-purchase/types/stock-purchase';
import { StockPurchaseCreatePayload } from '../services/interfaces/stock-purchase-create';
import dayjs from 'dayjs';
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_INPUT_FORMAT,
} from '@/shared/constants';
import { StockPurchaseItemListResponse } from '../services/interfaces/stock-purchase-list';
import { roundAmount } from '@/shared/functions';

export const stockPurchaseFormAdapter = (
  formData: StockPurchaseFormData
): StockPurchaseCreatePayload => {
  const { ticketId, amount, date, stockQuantity, commission, stockPrice } =
    formData;

  return {
    ticketId,
    amount,
    stockQuantity,
    commission,
    stockPrice,
    date: dayjs(date, DEFAULT_DATE_INPUT_FORMAT).toISOString(),
  };
};

export const stockPurchaseListAdapterResponse = (
  data: StockPurchaseItemListResponse[]
): StockPurchaseItem[] => {
  if (!data) {
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    ticketId: item.ticketId,
    ticket: item.ticket.name,
    amount: roundAmount(item.amount),
    stockPrice: item.stockPrice,
    commission: item.commission,
    stockQuantity: item.stockQuantity,
    date: dayjs(item.date).format(DEFAULT_DATE_FORMAT),
  }));
};
