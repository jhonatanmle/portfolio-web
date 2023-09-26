'use client';

import { chartData } from '@/app/home/data/chart-data';
import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  PluginChartOptions,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  months: number[]
}

export default function WalletDividendMonthly({ months }: Props) {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    // plugins: {
    //   title: {
    //     display: true,
    //     text: 'Dividendos',
    //   },
    // },
    plugins: {
      title: {
        display: false
      },
      legend: {
        display: false
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        max: 200,
        min: 0,
        display: false,
      },
    }
  };

  const labels = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const data: ChartData<"bar"> = {
    labels: labels.map(item => item.substring(0, 3)),
    datasets: [
      {
        label: '2023',
        data: months,
        backgroundColor: '#F5A524',
        borderRadius: 8
      },
    ],
  };

  return (
    <Bar options={options} data={data} height={300} />
  );
}
