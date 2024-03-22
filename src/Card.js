import React, { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import { ref, get, push, set } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import { database, historyDatabase } from './firebase'; // Import the Firebase database instance
import './Card.css';

const Card = ({ id, fontColor, updateStock }) => {
  const [isFlipped, setFlipped] = useState(false);
  const [cardData, setCardData] = useState(null);

  /* Fetching data from database */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use getDatabase to get the database instance
        const db = getDatabase();

        // Fetch data from Firebase based on the card's ID
        const dataRef = ref(db, `${id - 1}`);
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setCardData(data);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();
  }, [id, isFlipped]);
  /* Fetching data end */

  const handleFlip = (event) => {
    // Check if the click target is one of the buttons
    if (!event.target.classList.contains('add-button') && !event.target.classList.contains('subtract-button')) {
      setFlipped(!isFlipped);
    }
  };

  /*Stock management code*/
  const handleAddStock = () => {
    // Update stock in the database
    updateStock(id, cardData.stock + 1);

    // Add changes to history
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const formattedDate = `${currentDate.getHours()}:${currentDate.getMinutes()}, ${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

    // Push the new entry to Firebase
    // eslint-disable-next-line no-undef
    const newEntryRef = push(ref(historyDatabase, 'stockHistory'));
    // eslint-disable-next-line no-undef
    set(newEntryRef, {
      operation: 'Adaugare',
      type: "Monument",
      hour: currentHour,
      minutes: currentMinutes,
      dayOfMonth: currentDayOfMonth,
      month: currentMonth,
      date: formattedDate,
      code: code,
      stock: stock+1,
    });
  }

  const handleSubtractStock = () => {
    // Update stock in the database
    updateStock(id, cardData.stock - 1);

    // Add changes to history
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const formattedDate = `${currentDate.getHours()}:${currentDate.getMinutes()}, ${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

    // Push the new entry to Firebase
    // eslint-disable-next-line no-undef
    const newEntryRef = push(ref(historyDatabase, 'stockHistory'));
    // eslint-disable-next-line no-undef
    set(newEntryRef, {
      operation: 'Scadere',
      type: "Monument",
      hour: currentHour,
      minutes: currentMinutes,
      dayOfMonth: currentDayOfMonth,
      month: currentMonth,
      date: formattedDate,
      code: code,
      stock: stock-1,
    });
  };

  /*Stock management code end*/

  if (!cardData) {
    return null; // Handle the case where data is still being fetched
  }

  const { name, code, dimensions, retailPrice, partnersPrice, image, stock } = cardData;

  const cardClassName = `${fontColor}`;

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      {/* Front Side */}
      <div
        key="front"
        className="tc bg-light-gray dib br3 bw2 shadow-5 card-container"
        onClick={handleFlip}
      >
        <div className="img-container">
          <img src={process.env.PUBLIC_URL + `/images/${image}`} alt="CT1" />
        </div>
        <h2>{code}</h2>
        <span>{name}</span><br />
        <span>Dimensiuni: {dimensions}</span><br />
        <span id="pret">Pret: {retailPrice}</span><br />
        <p className={cardClassName} style={{ fontSize: "1.3em" }}>Stoc: {stock}</p>
        <button onClick={handleAddStock}>ADAUGA</button>
        <button onClick={handleSubtractStock}>SCADE</button>
      </div>

      {/* Back Side */}
      <div
        key="back"
        className="tc bg-light-gray dib br3 bw2 shadow-5 card-container"
        onClick={handleFlip}
      >
        <div className="img-container">
          <img src={process.env.PUBLIC_URL + `/images/${image}`} alt="CT1" />
        </div>
        <h2>{code}</h2>
        <span>{name}</span><br />
        <span>Dimensiuni: {dimensions}</span><br />
        <span style={{ color: "red" }}>Pret: {partnersPrice}</span><br />
        <p className={cardClassName} style={{ fontSize: "1.3em" }}>Stoc: {stock}</p>
        <button onClick={handleAddStock}>ADAUGA</button>
        <button onClick={handleSubtractStock}>SCADE</button>
      </div>
    </ReactCardFlip>
  );
};

export default Card;
