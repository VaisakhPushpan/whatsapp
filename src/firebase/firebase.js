// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZyLUBRAdlTXB2RVeF51k9D9cwRK6nHRA",
  authDomain: "whatsapp-673b3.firebaseapp.com",
  projectId: "whatsapp-673b3",
  storageBucket: "whatsapp-673b3.appspot.com",
  messagingSenderId: "482707157867",
  appId: "1:482707157867:web:c6139a3fe635328287122e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
