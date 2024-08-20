// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxcoXkh20LnCt2IBrJV909yVpCwq-C3LA",
  authDomain: "react-chatapp-72fdc.firebaseapp.com",
  projectId: "react-chatapp-72fdc",
  storageBucket: "react-chatapp-72fdc.appspot.com",
  messagingSenderId: "126240719735",
  appId: "1:126240719735:web:0eebe8de7d61174b0fd772",
  measurementId: "G-GRL95SCG44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const provider = new GoogleAuthProvider();

export {app, db}