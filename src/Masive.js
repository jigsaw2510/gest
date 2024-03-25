// Masive.js
// import React from 'react';

// const Masive = () => {
//   return (
//     <div>
//       <h2>Masive</h2>
//       {/* Add your About page content here */}
//     </div>
//   );
// };

// export default Masive;

// import React, { useState, useEffect } from 'react';
// import { historyDatabase } from './firebase'; // Importing the historyDatabase from firebase.js
// import { ref, get } from 'firebase/database';

// const StockHistory = () => {
//   const [firstItem, setFirstItem] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//     const db = historyDatabase;
//     const dataRef = ref(db, '/stockHistory'); // Empty string for root
//       try {
//         const snapshot = await get(dataRef);
//         const data = snapshot.val();
//         if (data) {
//           const firstItemId = Object.keys(data)[20]; // Get the ID of the first item
//           const firstItemData = data[firstItemId]; // Get the data of the first item
//           setFirstItem(firstItemData);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="tc">
//       <h1>Istoric Modificari</h1>
//       {firstItem && (
//         <p>
//           {Object.entries(firstItem).map(([key, value]) => (
//             <span key={key}>
//               {key}: {value}&nbsp;&nbsp;
//             </span>
//           ))}
//         </p>
//       )}
//     </div>
//   );
// };

// export default StockHistory;

import React, { useState, useEffect } from 'react';
import { historyDatabase } from './firebase'; // Importing the historyDatabase from firebase.js
import { ref, get } from 'firebase/database';
import './HistoryPage.css'

const StockHistory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = historyDatabase;
      const dataRef = ref(db, '/stockHistory'); // Empty string for root
      try {
        const snapshot = await get(dataRef);
        const fetchedData = snapshot.val();
        setData(fetchedData ? Object.values(fetchedData) : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="tc">
      <h1 className="h1">Istoric modificari</h1>
      <ul>
        {data.map((item, index) => (
          <p key={index} className="entry-item">
            {Object.entries(item).map(([key, value]) => (
              <span key={key}>
                {key}: {value}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </p>
        ))}
      </ul>
    </div>
  );
};

export default StockHistory;

