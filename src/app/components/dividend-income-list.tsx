'use client';

import { Key, useState, useMemo, useEffect } from 'react';

import { Tabs, Tab } from '@nextui-org/tabs';
import dayjs from 'dayjs';
import { DEFAULT_DATE_FORMAT, MONTH_LIST } from '@/shared/constants';
import DividendIncomeListTable from './dividend-income-list-table';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DividendIncomeItem } from '@/features/dividend-income/types';

dayjs.extend(customParseFormat);

const keyCurrentMonth = (dayjs().month() + 1).toString();
const currentYear = dayjs().year();

const columns = [
  {
    key: 'ticket',
    label: 'Ticket',
  },
  {
    key: 'amount',
    label: 'Monto Bruto',
  },
  {
    key: 'netAmount',
    label: 'Monto Neto',
  },
  {
    key: 'month',
    label: 'Mes',
  },
  {
    key: 'date',
    label: 'Fecha Dividendo',
  },
  {
    key: 'brokerPaymentDate',
    label: 'Fecha Broker',
  },
];

type Props = {
  items: DividendIncomeItem[];
};

export const DividendIncomeList = ({ items }: Props) => {
  const [currentMonth, setCurrentMonth] = useState<Key>(keyCurrentMonth);

  const tabs = useMemo(() => {
    return MONTH_LIST.map((month, index) => ({
      id: (index + 1).toString(),
      label: month,
      data: items.filter(
        (item) =>
          dayjs(item.date, DEFAULT_DATE_FORMAT).month() + 1 ===
          Number(currentMonth)
      ),
    }));
  }, [currentMonth, items]);

  return (
    <div>
      <Tabs
        aria-label='Dividend Monthly Tabs'
        items={tabs}
        selectedKey={currentMonth}
        onSelectionChange={(key) => setCurrentMonth(key)}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <DividendIncomeListTable columns={columns} items={item.data} />
          </Tab>
        )}
      </Tabs>
    </div>
  );
};
