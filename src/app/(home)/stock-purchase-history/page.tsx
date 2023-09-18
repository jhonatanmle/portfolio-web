import { APP_ROUTE_PATHS } from '@/app/app-routes';
import StockPurchaseList from '@/app/components/stock-purchase/stock-purchase-list';
import { stockPurchaseListAdapterResponse } from '@/features/stock-purchase/adapters';
import { StockPurchaseItemListResponse } from '@/features/stock-purchase/services/interfaces/stock-purchase-list';
import { createServerSupabaseClient } from '@/supabase';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import React from 'react';

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
      <section className='flex flex-wrap gap-4'>
        <h2>Invertido: {total} USD</h2>
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
