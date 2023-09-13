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
import { APP_ROUTE_PATHS } from '../app-routes';
import { dividendIncomeFormAdapter } from '@/features/dividend-income/adapters';
import { DividendIncomeFormData } from '@/features/dividend-income/types';

type Props = {
  tickets?: Ticket[];
};

export const DividendIncomeForm = ({ tickets = [] }: Props) => {
  const router = useRouter();
  const clientSupabase = createClientComponentClient();
  const { register, handleSubmit, formState } = useForm<DividendIncomeFormData>(
    {
      defaultValues: {
        date: NOW_DATE_FORMAT,
        brokerPaymentDate: NOW_DATE_FORMAT,
      },
    }
  );

  const onSubmit = handleSubmit(async (formData) => {
    const payload = dividendIncomeFormAdapter(formData);

    const { data: dividend } = await clientSupabase
      .from('Dividend')
      .insert([payload])
      .select();

    router.push('/income-dividend');
  });

  return (
    <div>
      <div className='mb-10'>
        <h3>Ingrese Dividendos</h3>
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
            {...register('taxes', {
              required: true,
              valueAsNumber: true,
            })}
            type='number'
            label='Impuesto'
            defaultValue={'30'}
          />
          <Input
            {...register('date')}
            type='date'
            label='Fecha de dividendo'
            placeholder='Fecha de dividendo'
            variant='faded'
          />
          <Input
            {...register('brokerPaymentDate')}
            type='date'
            label='Fecha de pago en broker'
            placeholder='Fecha de pago en broker'
            variant='faded'
          />
          <div className='flex flex-1 items-center md:justify-end gap-x-3 mt-2'>
            <Link href={APP_ROUTE_PATHS.dividendIncome}>
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
