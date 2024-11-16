import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [symbol, setSymbol] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(symbol);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter Stock Symbol"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
