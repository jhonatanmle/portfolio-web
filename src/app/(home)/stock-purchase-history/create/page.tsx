import { StockPurchaseForm } from '@/app/components/stock-purchase/stock-purchase-form';
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
        <StockPurchaseForm tickets={tickets!} />
      </div>
    );
  };
  
  export default Page;
  