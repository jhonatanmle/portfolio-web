'use client';

import { DividendIncomeItem } from '@/features/dividend-income/types';
import { Chip } from '@nextui-org/chip';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import React, { Key, useCallback } from 'react';

type Props = {
  columns: any[];
  items: DividendIncomeItem[];
};

export default function DividendIncomeListTable({ columns, items }: Props) {
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
    <Table aria-label='Tabla de registro'>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items} emptyContent={'No se encontraron datos.'}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
