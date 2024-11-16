import React, { useState, useEffect } from 'react';
import StockCard from './components/StockCard';
import StockChart from './components/StockChart';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  const [stock, setStock] = useState(null);
  const [stockChartData, setStockChartData] = useState(null);
  const [popularStocks, setPopularStocks] = useState([]);
  const [error, setError] = useState(null);

  // Fetch popular stocks (mock data)
  useEffect(() => {
    const mockPopularStocks = [
      { symbol: 'AAPL', name: 'Apple' },
      { symbol: 'GOOGL', name: 'Alphabet (Google)' },
      { symbol: 'AMZN', name: 'Amazon' },
      { symbol: 'MSFT', name: 'Microsoft' },
      { symbol: 'TSLA', name: 'Tesla' },
      { symbol: 'META', name: 'Meta (Facebook)' },
      { symbol: 'NVDA', name: 'NVIDIA' },
      { symbol: 'NFLX', name: 'Netflix' },
      { symbol: 'INTC', name: 'Intel' },
      { symbol: 'AMD', name: 'AMD' },
    ];
    setPopularStocks(mockPopularStocks);
  }, []);

  // Handle stock search with error handling
  const handleSearch = (symbol) => {
    if (!symbol) {
      alert('Please enter a stock symbol!');
      return;
    }

    // If the symbol is "TEST", use mock data
    if (symbol === 'TEST') {
      console.log("Using mock data for 'TEST' symbol");
      
      const mockData = {
        companyName: 'Test Company',
        currentPrice: '150.00',
        marketCap: '500B',
        volume: '10M',
        peRatio: '20.5',
      };

      // Mock Time Series Data for the chart
      const mockChartData = {
        labels: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'],
        datasets: [
          {
            label: 'Stock Price',
            data: [150, 152, 148, 153, 155],
            fill: false,
            borderColor: 'blue',
            tension: 0.1,
          },
        ],
      };

      setStock(mockData);
      setStockChartData(mockChartData);
      setError(null);
      return;
    }

    // API call to fetch real stock data
    console.log(`Fetching data for stock symbol: ${symbol}`);
    fetch(`http://localhost:5001/stocks/${symbol}`)
      .then(response => {
        if (!response.ok) {
          console.error('Error fetching stock data:', response.statusText);
          throw new Error('Stock not found or server error');
        }
        return response.json();
      })
      .then(data => {
        console.log('Stock data fetched:', data);

        const timeSeries = data['Time Series (Daily)'];
        const lastRefreshed = data['Meta Data']['3. Last Refreshed'];
        const latestDay = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestDay];

        setStock({
          companyName: data['Meta Data']['2. Symbol'],
          currentPrice: latestData['4. close'],
          marketCap: lastRefreshed, // Example placeholder
          volume: latestData['5. volume'],
          peRatio: 'N/A', // Example placeholder
        });

        // Prepare data for StockChart
        const labels = Object.keys(timeSeries).reverse();
        const prices = Object.values(timeSeries).map(day => day['4. close']).reverse();

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Stock Price',
              data: prices,
              fill: false,
              borderColor: 'blue',
              tension: 0.1,
            },
          ],
        };

        setStockChartData(chartData);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching stock data:', error);
        setError('Stock not found or error fetching data!');
      });
  };

  return (
    <div className="App">
      <h1>Stock Tracker</h1>
      <SearchBar onSearch={handleSearch} />
      
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {/* Display popular stocks */}
          <div>
            <h2>Popular Stocks</h2>
            <ul>
              {popularStocks.map(stock => (
                <li key={stock.symbol} onClick={() => handleSearch(stock.symbol)}>
                  {stock.name} ({stock.symbol})
                </li>
              ))}
            </ul>
          </div>

          {/* Display stock data */}
          {stock && (
            <>
              <StockCard stock={stock} />
              <StockChart symbol={stock.companyName} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
