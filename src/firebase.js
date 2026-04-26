// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0FLMiGCFgKJtxQRHqSObicWzMeXRSO0c",
  authDomain: "ngo-helper-c784a.firebaseapp.com",
  projectId: "ngo-helper-c784a",
  storageBucket: "ngo-helper-c784a.firebasestorage.app",
  messagingSenderId: "923054627985",
  appId: "1:923054627985:web:02101c034641fceee63330",
  measurementId: "G-T64G3ZLCZ0"
};
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);