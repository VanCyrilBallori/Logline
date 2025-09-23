// Import the functions you need from the SDKs you need 
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx9-Ljrvy_8HOKn2og5d9wTocqa1SIwWw",
  authDomain: "logline-65842.firebaseapp.com",
  projectId: "logline-65842",
  storageBucket: "logline-65842.firebasestorage.app",
  messagingSenderId: "436969051230",
  appId: "1:436969051230:web:040962f8e9670d799a50cf"
};

// Initialize Firebase (prevent multiple initializations)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Firestore database
export const db = getFirestore(app);

// Firebase Authentication
export const auth = getAuth(app);
