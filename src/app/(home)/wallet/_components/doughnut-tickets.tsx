'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  Colors,
} from 'chart.js';
import { WalletHoldingTicket } from '@/features/wallet/types';
import ChartDataLabels from 'chartjs-plugin-datalabels';

type Props = {
  items: WalletHoldingTicket[];
};

ChartJS.register(ArcElement);

const MINIMUN_AMOUNT = 300;
const MINIMUN_PERCENT = 3;

export default function DoughnutTicket({ items }: Props) {

  const sortItems = (a: WalletHoldingTicket, b: WalletHoldingTicket) => b.amount - a.amount 

  const data: ChartData<'doughnut'> = {
    labels: items
      ?.sort(sortItems)
      .map((item) => item.ticket.split('.')[0]),
    datasets: [
      {
        label: 'Activos',
        data: items
          ?.sort(sortItems)
          .map((item) => item.amount),
        spacing: 1,
        borderWidth: 0,
      },
    ],
  };

  const doughtnutLabelsLine = {
    id: 'doughtnutLabelsLine',
    afterDraw(chart: any) {
      const { ctx, chartArea: { width, height } } = chart;

      chart.data.datasets.forEach((dataset: any, i: number) => {
        chart.getDatasetMeta(i).data.forEach((datapoint: any, index: number) => {
          if(dataset.data[index] < MINIMUN_AMOUNT) {
            return;
          }

          const { x, y } = datapoint.tooltipPosition();

          const halfwidth = width / 2;
          const halfheight = height / 2;

          const xLine = x >= halfwidth ? x + 20 : x - 20;
          const yLine = y >= halfheight ? y + 20 : y - 20;
          const extraLine = x >= halfwidth ? 20 : -20;

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(xLine, yLine);
          ctx.lineTo(xLine + extraLine, yLine);
          ctx.strokeStyle = '#fff';
          ctx.stroke();

          const textXPosition = x >= halfwidth ? 'left' : 'right'
          const plusFivePx = x >= halfwidth ? 3 : -3;
          ctx.font = '12px Arial';
          ctx.textAlign = textXPosition;
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#fff';
          ctx.fillText(chart.data.labels[index], xLine + extraLine + plusFivePx, yLine)
        });
      })
    }
  }

  return (
    <Doughnut
      plugins={[Tooltip, Legend, Colors, ChartDataLabels, doughtnutLabelsLine] as any}
      data={data}
      options={{
        cutout: 70,
        layout: {
          padding: 50
        },
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
          datalabels: {
            formatter(value, context) {
              const datapoints = context.chart.data.datasets[0].data;

              const totalPercentage = datapoints.reduce(
                (acc: any, cur: any) => acc + cur,
                0
              );
              const percentageValue = (value / totalPercentage) * 100;

              if (percentageValue < MINIMUN_PERCENT) {
                return '';
              }

              return `${percentageValue.toFixed(1)}%`;
            },
            color: '#fff',
          },
        },
      }}
    />
  );
}
