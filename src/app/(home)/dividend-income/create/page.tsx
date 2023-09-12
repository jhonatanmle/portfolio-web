import React from 'react';
import { Ticket } from '@/interfaces/Ticket';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { IconArrowLeft } from '@tabler/icons-react';
import { createServerSupabaseClient } from '@/supabase';
import { DividendIncomeForm } from '@/app/components/dividend-income-form';
import { APP_ROUTE_PATHS } from '@/app/app-routes';

const Page = async () => {
  const supabase = createServerSupabaseClient();

  const { data: tickets } = await supabase
    .from('Ticket')
    .select('*')
    .returns<Ticket[]>();

  return (
    <div>
      <DividendIncomeForm tickets={tickets!} />
    </div>
  );
};

export default Page;
