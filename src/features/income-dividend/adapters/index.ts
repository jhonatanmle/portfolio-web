import dayjs from "dayjs";
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_INPUT_FORMAT,
} from "@/shared/constants";
import { IncomeDividendItem, IncomeFormData } from "../types";
import { IncomeCreatePayload } from "../services/interfaces/income-create";
import { IncomeDividendItemListResponse } from "../services/interfaces/income-dividend-list";

export const incomeFormAdapter = (
  formData: IncomeFormData
): IncomeCreatePayload => {
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

const roundAmount = (value: number) => Math.round(value * 100) / 100;

export const incomeDividendListAdapterResponse = (
  data: IncomeDividendItemListResponse[]
): IncomeDividendItem[] => {
  if (!data) {
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    ticketId: item.ticketId,
    ticket: item.Ticket.name,
    amount: roundAmount(item.amount),
    netAmount: roundAmount(item.netAmount),
    date: dayjs(item.date).format(DEFAULT_DATE_FORMAT),
    month: dayjs(item.date).format("MMMM"),
    brokerPaymentDate: dayjs(item.brokerPaymentDate).format(
      DEFAULT_DATE_FORMAT
    ),
    taxes: item.taxes,
  }));
};
