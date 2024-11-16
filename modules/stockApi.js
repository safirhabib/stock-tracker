require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'https://www.alphavantage.co/query';
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

/**
 * Fetch stock data for a given symbol.
 * @param {string} symbol - Stock ticker symbol (e.g., 'AAPL').
 * @param {string} functionType - Alpha Vantage function (default: TIME_SERIES_DAILY).
 * @returns {object} Stock data or error message.
 */
async function fetchStockData(symbol, functionType = 'TIME_SERIES_DAILY') {
    const params = {
        function: functionType,
        symbol: symbol,
        apikey: API_KEY,
    };

    try {
        const response = await axios.get(BASE_URL, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching stock data:', error.message);
        return { error: 'Failed to fetch stock data' };
    }
}

module.exports = { fetchStockData };
