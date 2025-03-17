import React from 'react';

const CompanyDetails = ({ company }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{company.Name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Symbol: {company.Symbol}</p>
          <p className="text-gray-600">Sector: {company.Sector}</p>
          <p className="text-gray-600">Industry: {company.Industry}</p>
          <p className="text-gray-600">Market Cap: ${(Number(company.MarketCapitalization) / 1000000000).toFixed(2)} Billion</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700">{company.Description}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;