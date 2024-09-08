// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "ENTER KEY",
  authDomain: "stock-piece.firebaseapp.com",
  projectId: "stock-piece",
  storageBucket: "stock-piece.appspot.com",
  messagingSenderId: "472354999843",
  appId: "1:472354999843:web:13df9073262f985a976b96",
  measurementId: "G-WMCBV4QYZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
