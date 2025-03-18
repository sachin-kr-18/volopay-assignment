// src/components/core/Table.jsx
import React from 'react';

const Table = ({ headers, data, onRowClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="py-2 px-4 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className="border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => onRowClick && onRowClick(row)}
            >
              {Object.keys(row).filter(key => key !== 'volume').map((key, cellIndex) => (
                <td key={cellIndex} className="py-2 px-4">
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;