const express = require('express');
const { fetchStockData } = require('./modules/stockApi');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS
app.use(cors());

// Define route for fetching popular stocks
app.get('/stocks/popular', (req, res) => {
  // Sample static popular stocks
  const popularStocks = [
    { symbol: 'AAPL', name: 'Apple' },
    { symbol: 'GOOGL', name: 'Alphabet (Google)' },
    { symbol: 'AMZN', name: 'Amazon' },
    { symbol: 'MSFT', name: 'Microsoft' },
    { symbol: 'TSLA', name: 'Tesla' },
    { symbol: 'META', name: 'Meta (Facebook)' },
    { symbol: 'NVDA', name: 'NVIDIA' },
    { symbol: 'NFLX', name: 'Netflix' },
    { symbol: 'INTC', name: 'Intel' },
    { symbol: 'AMD', name: 'AMD' }
  ];

  res.json(popularStocks);
});

// Define a route to fetch stock data
app.get('/stocks/:symbol', async (req, res) => {
  const { symbol } = req.params;

  try {
    const stockData = await fetchStockData(symbol);
    if (stockData.error) {
      return res.status(500).json({ error: stockData.error });
    }
    res.json(stockData);
  } catch (error) {
    console.error('Unexpected error:', error.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
