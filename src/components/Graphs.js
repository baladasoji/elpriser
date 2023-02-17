import React from 'react';
import {Alert } from '@mui/material'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

export const PriceCardGraph = ({prices}) => {
      if (prices.length >0) 
      {
        return ( <PriceChart rows={prices}/>  );
      }
      else
      {
        return (
        <Alert severity="warning" onClose={() => {}}>Next day prices are only available after 13:00 !</Alert>
        );
      }
}


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio:0.55,
  indexAxis: 'y',
   scales: {
            x: {
                stacked: false
            },
            y: {
                stacked: true
            }
        },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Øre/KWH',
    },
  }
};

function PriceChart({rows}) {
  const labels = rows.map(r => r.label) 

  const data = {
    labels,
    datasets: [
      {
        label: 'Raw',
        data: rows.map( r => r.SpotPriceOre ),
        backgroundColor: 'rgba(250, 250, 1, 0.6)',
        borderRadius : 20
      },
      {
        label: 'Total',
        data: rows.map( r => r.TotalPrice ),
        backgroundColor: 'rgba(250, 100, 1, 0.5)',
        borderRadius : 20
      },
    ],
  };
  return <Bar options={options} data={data}/>;
}
