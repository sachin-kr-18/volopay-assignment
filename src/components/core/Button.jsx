import React from 'react';

const Button = ({ children, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md mr-2 mb-2 
        ${active 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
    >
      {children}
    </button>
  );
};

export default Button;