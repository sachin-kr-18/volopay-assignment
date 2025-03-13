// src/pages/CompanyPage.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CompanyDetails from '../components/CompanyDetails';

const CompanyPage = () => {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const { companyDetails, incomeStatement } = useSelector((state) => state.company);

  useEffect(() => {
    // In a real app, we would fetch company data based on ticker
    // For now, we're using the static IBM data
  }, [ticker]);

  // Get the last 10 years of income data for the chart
  const chartData = incomeStatement.slice(0, 10).reverse();

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={() => navigate('/')}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        ← Back to Home
      </button>
      
      <h1 className="text-2xl font-bold mb-6">Company Overview: {ticker}</h1>
      
      <CompanyDetails company={companyDetails} />
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Income Statement</h2>
        <div className="h-64 bg-gray-900 rounded-lg p-4">
          <div className="flex h-full items-end">
            {chartData.map((item, index) => {
              const revenue = parseInt(item.totalRevenue);
              const maxRevenue = Math.max(...chartData.map(d => parseInt(d.totalRevenue)));
              const height = `${(revenue / maxRevenue) * 100}%`;
              
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    style={{ height }} 
                    className="w-4/5 bg-blue-500"
                  ></div>
                  <span className="text-xs text-gray-300 mt-2">
                    {item.fiscalDateEnding.substring(0, 4)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-2 text-center text-sm text-gray-500">
          Total Revenue (USD)
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;