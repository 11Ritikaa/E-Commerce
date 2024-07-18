// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4pkZeSgq6Nwc0EqdfvnXKwU_woWjMQxs",
  authDomain: "e-commerce-19a87.firebaseapp.com",
  projectId: "e-commerce-19a87",
  storageBucket: "e-commerce-19a87.appspot.com",
  messagingSenderId: "276090035610",
  appId: "1:276090035610:web:891fd20ca5f57086806e23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireDB = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, fireDB, googleProvider };