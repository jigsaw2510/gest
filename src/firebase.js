// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZr1NUxm-ei8y3ao_2mMYCviLLhgZzmGs",
  authDomain: "gest-33df1.firebaseapp.com",
  projectId: "gest-33df1",
  storageBucket: "gest-33df1.appspot.com",
  messagingSenderId: "997823842198",
  appId: "1:997823842198:web:95265723a4027ee4c17fb7",
  measurementId: "G-2SQ4941T9Q",
  databaseURL: 'https://gest-33df1-default-rtdb.europe-west1.firebasedatabase.app',
};

const historyDatabaseConfig = {
  apiKey: "AIzaSyDpjq14O3UIum_BnVei7GtZcwbLAHkEwHg",
  authDomain: "gesthistorydatabase.firebaseapp.com",
  projectId: "gesthistorydatabase",
  storageBucket: "gesthistorydatabase.appspot.com",
  messagingSenderId: "640805037881",
  appId: "1:640805037881:web:24112b04503a72ce49eae8",
  measurementId: "G-BL79Q6QH1J",
  databaseURL: 'https://gesthistorydatabase-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize first database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Initialize second database
const historyApp = initializeApp(historyDatabaseConfig, 'historyDatabase');
const historyDatabase = getDatabase(historyApp);



export { database, historyDatabase };  // Exporting the database object