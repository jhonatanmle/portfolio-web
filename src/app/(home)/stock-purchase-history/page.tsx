import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import Link from 'next/link';
import React from 'react';

import { APP_ROUTE_PATHS } from '@/app/app-routes';
import StockPurchaseList from '@/app/components/stock-purchase/stock-purchase-list';
import { stockPurchaseListAdapterResponse } from '@/features/stock-purchase/adapters';
import { StockPurchaseItemListResponse } from '@/features/stock-purchase/services/interfaces/stock-purchase-list';
import { createServerSupabaseClient } from '@/supabase';

export default async function Page() {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase
    .from('stockPurchaseHistory')
    .select('*, ticket ( * )')
    .order('date', { ascending: false })
    .returns<StockPurchaseItemListResponse[]>();

  const items = stockPurchaseListAdapterResponse(data!);

  const total = items.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div>
      <section>
        <Card className='w-[250px] bg-zinc-800'>
          <CardBody>
            <p className='text-tiny uppercase font-bold'>Invertido</p>
            <small>Dinero invertido en compras</small>
            <div className='flex items-center mt-2'>
              <span className='text-lg'>${total?.toFixed(2)}</span>
            </div>
          </CardBody>
        </Card>
      </section>
      <section className='mt-10 text-right'>
        <Link href={APP_ROUTE_PATHS.stockPurchaseHistoryCreate}>
          <Button color='primary'>Nuevo</Button>
        </Link>
      </section>
      <div className='mt-6'>
        <StockPurchaseList items={items} />
      </div>
    </div>
  );
}
