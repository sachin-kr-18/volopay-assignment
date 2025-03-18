import React from 'react';
import { useSelector } from 'react-redux';
import StockTable from '../components/StockTable';

const HomePage = () => {
  const { topGainers, topLosers } = useSelector((state) => state.stocks);
  const headers = ['Ticker', 'Price', 'Change Amount', 'Change Percentage'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Stocks Table Page</h1>
      <div className="flex justify-end mb-4">
        <a href="/products" className="text-blue-500 hover:underline">Go to Products page →</a>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <StockTable title="Top Gainers" data={topGainers} headers={headers} />
        <StockTable title="Top Losers" data={topLosers} headers={headers} />
      </div>
    </div>
  );
};

export default HomePage;