
import React from 'react';
import Table from './core/Table';
import { useNavigate } from 'react-router-dom';

const StockTable = ({ title, data, headers }) => {
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate(`/company/${row.ticker}`);
  };
  return (
    <div className="my-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <Table headers={headers} data={data} onRowClick={handleRowClick} />
    </div>
  );
};

export default StockTable;