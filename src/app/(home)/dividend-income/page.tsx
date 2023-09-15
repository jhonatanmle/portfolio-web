import React from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { CircularProgress } from '@nextui-org/progress';
import { Chip } from '@nextui-org/chip';
import dayjs from 'dayjs';
import { DEFAULT_DATE_FORMAT } from '@/shared/constants';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { createServerSupabaseClient } from '@/supabase';
import { DividendIncomeList } from '../../components/dividend-income-list';
import { APP_ROUTE_PATHS } from '@/app/app-routes';
import { DividendIncomeItemListResponse } from '@/features/dividend-income/services/interfaces/dividend-income-list';
import { dividendIncomeListAdapterResponse } from '@/features/dividend-income/adapters';

dayjs.extend(customParseFormat);

interface TotalData {
  id: number;
  title: string;
  value: number;
  strokeClass: string;
}

const Page = async () => {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase
    .from('dividend')
    .select('*, ticket ( * )')
    .order('date', { ascending: false })
    .returns<DividendIncomeItemListResponse[]>();

  const items = dividendIncomeListAdapterResponse(data!);

  const total = items.reduce((acc, item) => acc + item.amount, 0);
  const netTotal = items.reduce((acc, item) => acc + item.netAmount, 0);

  const monthlyTotal = items
    .filter((item) =>
      dayjs()
        .startOf('M')
        .isSame(dayjs(item.date, DEFAULT_DATE_FORMAT).startOf('M'))
    )
    .reduce((acc, item) => acc + item.netAmount, 0);

  const reports: TotalData[] = [
    {
      id: 1,
      title: 'Total Bruto',
      value: total,
      strokeClass: 'stroke-yellow-500',
    },
    {
      id: 2,
      title: 'Total Neto',
      value: netTotal,
      strokeClass: 'stroke-green-500',
    },
    {
      id: 3,
      title: 'Total Mensual',
      value: monthlyTotal,
      strokeClass: 'stroke-green-500',
    },
  ];

  const CircularReport = ({
    title,
    value,
    strokeClass,
  }: Partial<TotalData>) => (
    <Card className='w-[120px] h-[130px] md:w-[200px] md:h-[220px] border-none'>
      <CardBody className='justify-center items-center p-0 md:p-5 md:pb-0 '>
        <CircularProgress
          classNames={{
            svg: 'w-[80px] h-[80px] md:w-36 md:h-36 drop-shadow-md',
            indicator: `${strokeClass}`,
            track: 'stroke-white/10',
            value: 'text-[14px] md:text-2xl font-semibold text-white',
          }}
          size='lg'
          value={value}
          maxValue={1000}
          color='success'
          formatOptions={{ style: 'currency', currency: 'USD' }}
          showValueLabel={true}
          aria-label={title}
        />
      </CardBody>
      <CardFooter className='justify-center items-center pt-0 p-2 md:p-3'>
        <Chip
          classNames={{
            base: 'border-1 border-white/30',
            content: 'text-white/90 text-[9px] md:text-small font-semibold',
          }}
          variant='bordered'
        >
          {title}
        </Chip>
      </CardFooter>
    </Card>
  );

  return (
    <div>
      <section className='flex flex-wrap gap-4'>
        {reports.map((item) => (
          <CircularReport
            key={item.id}
            title={item.title}
            value={item.value}
            strokeClass={item.strokeClass}
          />
        ))}
      </section>
      <section className='mt-10 text-right'>
        <Link href={APP_ROUTE_PATHS.dividendIncomeCreate}>
          <Button color='primary'>Crear ingreso</Button>
        </Link>
      </section>
      <section className='mt-4'>
        <DividendIncomeList items={items} />
      </section>
    </div>
  );
};

export default Page;
