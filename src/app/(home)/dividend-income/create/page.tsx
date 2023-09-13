import React from 'react';
import { Ticket } from '@/interfaces/Ticket';
import { createServerSupabaseClient } from '@/supabase';
import { DividendIncomeForm } from '@/app/components/dividend-income-form';

const Page = async () => {
  const supabase = createServerSupabaseClient();

  const { data: tickets } = await supabase
    .from('ticket')
    .select('*')
    .returns<Ticket[]>();

  return (
    <div>
      <DividendIncomeForm tickets={tickets!} />
    </div>
  );
};

export default Page;
