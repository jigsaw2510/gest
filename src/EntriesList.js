import React from 'react';

const Entry = ({ code, color, date, operation, stock, type }) => {
  return (
    <div className="entry-item">
      <p>Code: {code}</p>
      <p>Color: {color}</p>
      <p>Date: {date}</p>
      <p>Operation: {operation}</p>
      <p>Stock: {stock}</p>
      <p>Type: {type}</p>
      {/* Add other properties as needed */}
    </div>
  );
};

export default Entry;
