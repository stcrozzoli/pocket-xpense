import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ data, mesActual }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '$',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const gastos = data[mesActual] || [];
    const labels = gastos.map(gasto => gasto.split(' - ')[1]);
    const gastosData = gastos.map(gasto => parseFloat(gasto.split(' - ')[0].substring(1)));

    setChartData(prevChartData => ({
      ...prevChartData,
      labels,
      datasets: [
        {
          ...prevChartData.datasets[0],
          data: gastosData,
        },
      ],
    }));
  }, [data, mesActual]);

  return (
    <div>
      <Pie data={chartData} />
    </div>
  );
}
