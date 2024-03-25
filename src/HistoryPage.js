import React, { useState, useEffect } from 'react';
import { historyDatabase } from './firebase'; // Importing the historyDatabase from firebase.js
import { ref, get } from 'firebase/database';
import './HistoryPage.css';

const StockHistory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = historyDatabase;
      const dataRef = ref(db, '/stockHistory');
      try {
        const snapshot = await get(dataRef);
        const fetchedData = snapshot.val();
        setData(fetchedData ? Object.values(fetchedData).reverse() : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="tc history-container">
      <h1 className="h1">Istoric modificari</h1>
      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockHistory;
