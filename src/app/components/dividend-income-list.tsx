'use client';

import React, { Key, useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import { DividendIncomeItem } from '@/features/income-dividend/types';
import { Chip } from '@nextui-org/chip';

type Props = {
  items: DividendIncomeItem[];
};

export const DividendIncomeList = ({ items }: Props) => {
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

  const renderCell = useCallback((item: DividendIncomeItem, columnKey: Key) => {
    const cellValue = item[columnKey as keyof DividendIncomeItem];

    switch (columnKey) {
      case 'amount':
        return (
          <Chip
            className='capitalize w-[100px]'
            color={'warning'}
            size='sm'
            variant='flat'
          >
            {cellValue ?? 0} USD
          </Chip>
        );
      case 'netAmount':
        return (
          <Chip
            className='capitalize w-[100px]'
            color={'success'}
            size='sm'
            variant='flat'
          >
            {cellValue ?? 0} USD
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div>
      <Table aria-label='Example table with dynamic content'>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
