'use client';

import { Pagination } from '@nextui-org/pagination';
import { Chip } from '@nextui-org/react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import { Key, useCallback, useMemo, useState } from 'react';

import { StockPurchaseItem } from '@/features/stock-purchase/types/stock-purchase';

const columns = [
  {
    key: 'ticket',
    label: 'Ticket',
  },
  {
    key: 'amount',
    label: 'Monto',
  },
  {
    key: 'stockPrice',
    label: 'Precio',
  },
  {
    key: 'stockQuantity',
    label: 'Cantidad',
  },
  {
    key: 'commission',
    label: 'Comisión',
  },
  {
    key: 'date',
    label: 'Fecha de registro',
  },
];

type Props = {
  items: StockPurchaseItem[];
};

export default function StockPurchaseList({ items }: Props) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const renderCell = useCallback((item: StockPurchaseItem, columnKey: Key) => {
    const cellValue = item[columnKey as keyof StockPurchaseItem];

    switch (columnKey) {
      case 'amount':
        return (
          <Chip
            className='capitalize w-auto'
            color='success'
            size='sm'
            variant='flat'
          >
            {cellValue ?? 0} USD
          </Chip>
        );
      case 'stockPrice':
        return (
          <Chip
            className='capitalize w-auto'
            color='warning'
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

  const pages = Math.ceil(items.length / rowsPerPage);

  const tableItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return items.slice(start, end);
  }, [page, items]);

  return (
    <Table
      aria-label='Tabla de registro'
      bottomContent={
        <div className='flex w-full justify-center'>
          <Pagination
            isCompact
            showControls
            showShadow
            color='secondary'
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={tableItems} emptyContent={'No se encontraron datos.'}>
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
