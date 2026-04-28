import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ngo-helper-c784a.firebaseapp.com",
  projectId: "ngo-helper-c784a",
  storageBucket: "ngo-helper-c784a.firebasestorage.app",
  messagingSenderId: "923054627985",
  appId: "1:923054627985:web:02101c034641fceee63330"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);