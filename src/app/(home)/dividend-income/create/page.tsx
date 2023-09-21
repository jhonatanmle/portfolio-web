import React from 'react';

import { DividendIncomeForm } from '@/app/components/dividend-income-form';
import { Ticket } from '@/interfaces/Ticket';
import { createServerSupabaseClient } from '@/supabase';

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
