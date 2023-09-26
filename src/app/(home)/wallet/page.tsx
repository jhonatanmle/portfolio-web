import WalletDividendMonthly from '@/app/components/wallet/wallet-dividend-monthly';
import WalletList from '@/app/components/wallet/wallet-list';
import {
  findWalletDividendInformation,
  findWalletHoldingInformation,
} from '@/features/wallet/services';
import WalletCreateButtonModal from './_components/create-button-modal';
import { Option } from '@/interfaces/Option';
import { nanoid } from 'nanoid';
import CardTotal from '@/app/components/card-total';
import DoughnutTicket from './_components/doughnut-tickets';

export default async function Page() {
  const data = await findWalletDividendInformation();
  const dataHolding = await findWalletHoldingInformation();

  if (!data || !dataHolding) {
    return;
  }

  const totals: Option[] = [
    {
      id: nanoid(),
      title: 'Total Mensual',
      subtitle: 'Dividendos mensuales',
      value: data.totalMonthly,
    },
    {
      id: nanoid(),
      title: 'Total Anual',
      subtitle: 'Dividendos durante el año',
      value: data.totalYearly,
    },
    {
      id: nanoid(),
      title: 'Total Diario',
      subtitle: 'Dividendos diarios',
      value: data.totalDaily,
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-y-[40px] lg:grid-cols-3 lg:gap-x-[80px] pb-10'>
      <section className='col-span-2 flex flex-col gap-y-10'>
        <div className='flex flex-wrap lg:flex-row gap-y-4 gap-x-4 lg:justify-start lg:items-start'>
          {totals.map((item) => (
            <CardTotal
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              value={item.value as number}
            />
          ))}
        </div>
        <div>
          <div className='flex justify-between  mb-4'>
            <h3 className='text-2xl'>Portafolio</h3>
            <WalletCreateButtonModal />
          </div>

          <WalletList items={data.tickets} />
        </div>
      </section>
      <section className='col-span-1 flex flex-col gap-y-6'>
        <div>
          <h3 className='text-2xl mb-4'>Dividendos Mensuales</h3>
          <div className='bg-zinc-900 p-4 rounded-xl'>
            <div className='h-[250px]'>
              <WalletDividendMonthly months={data.months} />
            </div>
          </div>
        </div>
        <div>
          <h3 className='text-2xl mb-4'>Acciones</h3>
          <div className='bg-zinc-900 py-4 rounded-xl'>
            <div className='h-[350px] flex justify-center'>
              <DoughnutTicket items={dataHolding.tickets} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
