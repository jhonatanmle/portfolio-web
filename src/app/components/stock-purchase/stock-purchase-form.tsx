'use client';

import { Ticket } from '@/interfaces/Ticket';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { NOW_DATE_FORMAT } from '@/shared/constants';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { APP_ROUTE_PATHS } from '../../app-routes';
import { StockPurchaseFormData } from '@/features/stock-purchase/types/stock-purchase';
import { stockPurchaseFormAdapter } from '@/features/stock-purchase/adapters';

type Props = {
  tickets?: Ticket[];
};

export const StockPurchaseForm = ({ tickets = [] }: Props) => {
  const router = useRouter();
  const clientSupabase = createClientComponentClient();
  const { register, handleSubmit, formState } = useForm<StockPurchaseFormData>({
    defaultValues: {
      date: NOW_DATE_FORMAT,
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    const payload = stockPurchaseFormAdapter(formData);

    await clientSupabase.from('stockPurchaseHistory').insert([payload]);

    router.push(APP_ROUTE_PATHS.stockPurchaseHistory);
  });

  return (
    <div>
      <div className='mb-10'>
        <h3>Ingrese Compra</h3>
      </div>
      <form onSubmit={onSubmit}>
        <div className='flex flex-wrap gap-6'>
          <Select
            {...register('ticketId', {
              required: true,
            })}
            items={tickets}
            label='Seleccione el ticket'
          >
            {(ticket) => <SelectItem key={ticket.id}>{ticket.name}</SelectItem>}
          </Select>
          <Input
            {...register('amount', {
              required: true,
              valueAsNumber: true,
            })}
            label='Monto'
          />
          <Input
            {...register('commission', {
              required: true,
              valueAsNumber: true,
            })}
            label='Comisión'
          />
          <Input
            {...register('stockQuantity', {
              required: true,
              valueAsNumber: true,
            })}
            label='Cantidad'
          />
          <Input
            {...register('stockPrice', {
              required: true,
              valueAsNumber: true,
            })}
            label='Precio de la Acción'
          />
          <Input
            {...register('date')}
            type='date'
            label='Fecha de dividendo'
            placeholder='Fecha de dividendo'
            variant='faded'
          />
          <div className='flex flex-1 items-center md:justify-end gap-x-3 mt-2'>
            <Link href={APP_ROUTE_PATHS.stockPurchaseHistory}>
              <Button color='default'>Regresar</Button>
            </Link>
            <Button
              color='primary'
              type='submit'
              isDisabled={!formState.isValid}
            >
              Registrar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
