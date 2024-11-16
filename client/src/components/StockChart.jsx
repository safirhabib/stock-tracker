import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockChart = ({ symbol }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/stocks/${symbol}`)
      .then(response => {
        const data = response.data['Time Series (Daily)'];
        const labels = Object.keys(data).reverse();
        const prices = Object.values(data).map(day => day['4. close']).reverse();

        setChartData({
          labels,
          datasets: [
            {
              label: 'Stock Price',
              data: prices,
              fill: false,
              borderColor: 'blue',
              tension: 0.1,
            },
          ],
        });
      })
      .catch(error => console.error("Error fetching data: ", error));
  }, [symbol]);

  return (
    <div>
      {chartData ? (
        <Line data={chartData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StockChart;
