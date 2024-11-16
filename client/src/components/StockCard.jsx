import React from 'react';

const StockCard = ({ stock }) => {
  return (
    <div className="stock-card">
      <h2>{stock.companyName}</h2>
      <p>Current Price: ${stock.currentPrice}</p>
      <p>Market Cap: {stock.marketCap}</p>
      <p>Volume: {stock.volume}</p>
      <p>P/E Ratio: {stock.peRatio}</p>
    </div>
  );
};

export default StockCard;
