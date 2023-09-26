'use client';

import { Chip } from '@nextui-org/chip';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import { Key, useCallback } from 'react';

import { WalletTicket } from '@/features/wallet/types';
import { ColumnTable } from '@/interfaces/Table';

type Props = {
  items?: WalletTicket[];
};

export default function WalletList({ items = [] }: Props) {
  const columns: ColumnTable[] = [
    {
      key: 'ticket',
      label: 'Ticket',
    },
    {
      key: 'quantity',
      label: 'Cantidad',
    },
    
    {
      key: 'dividendMonthly',
      label: 'Dividendo/Mensual',
    },
    {
      key: 'dividendYear',
      label: 'Dividendo/Año',
    },
    {
      key: 'yield',
      label: 'Dividendo %',
    },
  ];

  const renderCell = useCallback((item: WalletTicket, columnKey: Key) => {
    const cellValue = item[columnKey as keyof WalletTicket];

    switch (columnKey) {
      case 'quantity':
        return (cellValue as number)?.toFixed(2);
      case 'dividendMonthly':
      case 'dividendYear':
        return (
          <Chip color={'success'} size='sm' variant='flat'>
            {(cellValue as number)?.toFixed(2) ?? 0} USD
          </Chip>
        );
      case 'yield':
        return (
          <Chip color={'warning'} size='sm' variant='flat'>
            {(cellValue as number)?.toFixed(2) ?? 0} %
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
          <TableRow key={item.ticket}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
