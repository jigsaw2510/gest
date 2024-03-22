import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import { getDatabase, ref, get, set } from 'firebase/database';
import './App.css';
import Footer from './Footer';
import RightClickDisable from './RightClickDisable';
import StockHistory from './StockHistory';


class App extends Component {
  constructor() {
    super();
    this.state = {
      monumente: [],
      searchfield: '',
    };
  }

  fetchDataFromFirebase = async () => {
    const db = getDatabase();
    const dataRef = ref(db, '/'); // Empty string for root

    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const monumenteArray = Object.values(data); // Convert object to array
        this.setState({ monumente: monumenteArray });
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
    }
  };

  componentDidMount() {
    this.fetchDataFromFirebase();
    this.setState({ monumente: [] }); // Ensure it starts as an empty array
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  /*Stock management code*/
  updateStockInFirebase = async (productId, newStockValue) => {
    const db = getDatabase();
    const productRef = ref(db, `${productId - 1}/stock`);

    try {
      // Update stock in the database
      await set(productRef, newStockValue);

      // Fetch the updated data from Firebase
      const updatedSnapshot = await get(ref(db, `${productId - 1}`));
      const updatedData = updatedSnapshot.val();

      // Update local state with the latest data
      this.setState((prevState) => {
        const updatedMonumente = prevState.monumente.map((monument) => {
          if (monument.id === productId) {
            return { ...monument, stock: updatedData.stock };
          }
          return monument;
        });

        return { monumente: updatedMonumente };
      });
    } catch (error) {
      console.error('Error updating stock in Firebase:', error);
    }
  };
  /*Stock management code end*/

  render() {
    const filteredmonumente = this.state.monumente.filter((monument) => {
      const lowerCaseSearch = this.state.searchfield.toLowerCase();
      return (
        monument.name.toLowerCase().includes(lowerCaseSearch) ||
        monument.code.toLowerCase().includes(lowerCaseSearch) ||
        monument.dimensions.toLowerCase().includes(lowerCaseSearch)
      );
    });

    return (
      <div className="tc app-container">
        <h1>Monumente Funerare</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <CardList monumente={filteredmonumente} updateStock={this.updateStockInFirebase} />
        <Footer />
        <RightClickDisable />
        <StockHistory />
      </div>

    );
  }
}

export default App;
