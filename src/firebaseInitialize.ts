import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA5Q-P-DQBVTANuJzd1eLwxbsXNPzU1HsQ",
  authDomain: "eokorea-6e603.firebaseapp.com",
  databaseURL: "https://eokorea-6e603-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "eokorea-6e603",
  storageBucket: "eokorea-6e603.appspot.com",
  messagingSenderId: "236139709683",
  appId: "1:236139709683:web:bb9f9390fe3556c1d46386",
  measurementId: "G-9HF9MERSCJ"
};
class MyFirebase {
  static init() {
    const info = initializeApp(firebaseConfig);
  }
}

export default MyFirebase
