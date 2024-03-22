import React, { Component } from 'react';
import RightClickDisable from './RightClickDisable';
import { ref, get } from 'firebase/database';
import { historyDatabase } from './firebase.js';
import './HistoryPage.css';
import EntriesList from './EntriesList'; // Import the Entrieslist component

class HistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modificari: [] // Initialize modificari state as an empty array
    };
  }

  fetchDataFromFirebase = async () => {
    const db = historyDatabase;
    const dataRef = ref(db, '/stockHistory'); // Empty string for root

    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const modificariArray = Object.values(data); // Convert object to array
        this.setState({ modificari: modificariArray });
        // Log the contents of the database
        console.log('Contents of the database:', data);
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
    }
  };

  componentDidMount() {
    this.fetchDataFromFirebase();
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };


  render() {
    const { modificari } = this.state;

    return (
      <div className="entries-list-container">
        <h1>Istoric Modificari</h1>
        {/* Render the EntriesList component passing the data */}
        <EntriesList entries={modificari} />
        <RightClickDisable />
      </div>
    );
  }
}

export default HistoryPage;
