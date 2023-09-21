'use client';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import { chartData } from './data/chart-data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Page() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Dividendos',
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        max: 100,
        min: 0, // the data minimum used for determining the ticks is Math.min(dataMin, suggestedMin)
      },
    },
    spanGaps: true,
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

  const data = {
    labels,
    datasets: [
      {
        label: '2023',
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: chartData.map((item) => item.amount),
        options: {
          parsing: {
            key: 'nested.value',
          },
        },
        backgroundColor: 'rgb(59, 130, 246, .5)',
      },
    ],
  };

  return (
    <div>
      {/* <div>
        <pre>{JSON.stringify(chartData, undefined, 2)}</pre>
      </div> */}
      <section>
        <Bar options={options} data={data} height={400} />
      </section>
    </div>
  );
}
