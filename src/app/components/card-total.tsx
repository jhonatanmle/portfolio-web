import { Card, CardBody } from '@nextui-org/card';

type Props = {
  value: number;
  symbol?: string;
  title: string;
  subtitle?: string;
};

export default function CardTotal({ value, symbol = '$', title, subtitle }: Props) {
  return (
    <Card className='w-[160px] lg:w-[250px] bg-zinc-800'>
      <CardBody>
        <p className='text-tiny uppercase font-bold'>{title}</p>
        <small>{subtitle}</small>
        <div className='flex items-center mt-2'>
          <span className='text-lg'>
            {symbol}
            {value?.toFixed(2)}
          </span>
        </div>
      </CardBody>
    </Card>
  );
}
